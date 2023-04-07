// Copyright (c) 2022 MASSA LABS <info@massa.net>

use crate::client_binder::BootstrapClientBinder;
use crate::settings::BootstrapClientConfig;
use crate::{
    establisher::MockBSListener, start_bootstrap_server, tests::tools::get_bootstrap_config,
};
use crate::{BootstrapConfig, BootstrapServerMessage};
use massa_consensus_exports::test_exports::MockConsensusControllerImpl;

#[double]
use massa_final_state::FinalState;

use massa_models::node::NodeId;
use massa_models::version::Version;
use massa_network_exports::MockNetworkCommandSender;
use massa_signature::{KeyPair, PublicKey};
use mockall_double::double;
use parking_lot::RwLock;
use std::net::{SocketAddr, TcpListener};
use std::str::FromStr;
use std::sync::Arc;

lazy_static::lazy_static! {
    pub static ref BOOTSTRAP_CONFIG_KEYPAIR: (BootstrapConfig, KeyPair) = {
        let keypair = KeyPair::generate();
        (get_bootstrap_config(NodeId::new(keypair.get_public_key())), keypair)
    };
}

#[test]
fn test_server_mock_flood() {
    let (bootstrap_config, keypair): &(BootstrapConfig, KeyPair) = &BOOTSTRAP_CONFIG_KEYPAIR;

    // let (consensus_controller, mut consensus_event_receiver) =
    //     MockConsensusController::new_with_receiver();
    // let (network_cmd_tx, mut network_cmd_rx) = mpsc::channel::<NetworkCommand>(5);

    // setup final state local config

    // Setup network command mock-story: hard-code the result of getting bootstrap peers
    let mocked1 = MockNetworkCommandSender::new();
    let stream_mock1 = Box::new(MockConsensusControllerImpl::new());
    let mut listener_mock = flood_story(
        bootstrap_config.listen_addr.unwrap(),
        &keypair.get_public_key(),
        &bootstrap_config.into(),
    );

    let bootstrap_manager_thread = std::thread::Builder::new()
        .name("bootstrap_thread".to_string())
        .spawn(move || {
            start_bootstrap_server::<MockNetworkCommandSender>(
                stream_mock1,
                mocked1,
                Arc::new(RwLock::new(MockFinalState::default())),
                bootstrap_config.clone(),
                listener_mock,
                *keypair,
                Version::from_str("TEST.1.10").unwrap(),
                MockMipStore::default(),
            )
            .unwrap()
            .unwrap()
        })
        .unwrap();

    // stop bootstrap server
    bootstrap_manager_thread
        .join()
        .unwrap()
        .stop()
        .expect("could not stop bootstrap server");
}

fn flood_story(
    addr: SocketAddr,
    pubkey: &PublicKey,
    client_config: &BootstrapClientConfig,
) -> MockBSListener {
    let listener = TcpListener::bind(addr).unwrap();
    let (conn_tx, conn_rx) = std::sync::mpsc::channel();
    std::thread::Builder::new()
        .name("flood_thread_listener".to_string())
        .spawn(move || {
            let mut stream = listener.accept().unwrap();
            conn_tx.send(stream).unwrap();
        })
        .unwrap();
    let mut listener_mock = MockBSListener::new();
    listener_mock.expect_accept().times(1).returning(move || {
        let out = std::net::TcpStream::connect(addr);
        let res = Ok(conn_rx.recv().unwrap());
        std::mem::forget(out);
        res
    });
    listener_mock.expect_accept().times(1).returning(move || {
        let out = std::net::TcpStream::connect(addr);
        let res = Ok(conn_rx.recv().unwrap());
        std::thread::Builder::new()
            .name("client-err-recv-thread".to_string())
            .spawn(move || {
                let client = BootstrapClientBinder::new(out.unwrap(), *pubkey, *client_config);
                let next = client.next_timeout(None).unwrap();
                match next {
                    BootstrapServerMessage::BootstrapError { .. } => (),
                    _ => panic!("server should returned ??? back to the client"),
                }
            })
            .unwrap();
        res
    });
    listener_mock
}
