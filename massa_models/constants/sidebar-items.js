initSidebarItems({"constant":[["ADDRESS_SIZE_BYTES","address size"],["AMOUNT_DECIMAL_FACTOR","Safe to import, amount decimal factor"],["BLOCK_ID_SIZE_BYTES","block id size"],["BLOCK_REWARD","Block reward is given for each block creation"],["BOOTSTRAP_RANDOMNESS_SIZE_BYTES","Size of the random bytes array used for the bootstrap, safe to import"],["CHANNEL_SIZE","Consensus static parameters (defined by protocol used) Changing one of the following values is considered as a breaking change Values differ in `test` flavor building for faster CI and simpler scenarios"],["DELTA_F0","Threshold for fitness."],["ENDORSEMENT_COUNT","Number of endorsement"],["ENDORSEMENT_ID_SIZE_BYTES","endorsement id size"],["EVENT_ID_SIZE_BYTES","Size of the event id hash used in execution module, safe to import"],["HANDSHAKE_RANDOMNESS_SIZE_BYTES","Length of the handshake random signature"],["INITIAL_DRAW_SEED","Proof of stake seed for the initial draw"],["IP_LIST_MAX_SIZE","Max size of the IP list"],["LEDGER_PART_SIZE_MESSAGE_BYTES","Maximum size batch of data in a part of the ledger"],["MAX_ADVERTISE_LENGTH","Limit on the number of peers we advertise to others."],["MAX_ASK_BLOCKS_PER_MESSAGE","Max number of hash in the message `AskForBlocks`"],["MAX_ASYNC_GAS","Maximum of GAS allowed for asynchronous messages execution on one slot"],["MAX_ASYNC_POOL_LENGTH","Maximum capacity of the asynchronous messages pool"],["MAX_BLOCK_SIZE","Maximum block size in bytes"],["MAX_BOOTSTRAP_BLOCKS","Max number of blocks we provide/ take into account while bootstrapping"],["MAX_BOOTSTRAP_CHILDREN","Max number of child nodes"],["MAX_BOOTSTRAP_CLIQUES","max bootstrapped cliques"],["MAX_BOOTSTRAP_DEPS","max bootstrapped dependencies"],["MAX_BOOTSTRAP_MESSAGE_SIZE","Max message size for bootstrap"],["MAX_BOOTSTRAP_POS_CYCLES","Max number of cycles in PoS bootstrap"],["MAX_BOOTSTRAP_POS_ENTRIES","Max number of address and random entries for PoS bootstrap"],["MAX_DUPLEX_BUFFER_SIZE","max duplex buffer size"],["MAX_ENDORSEMENTS_PER_MESSAGE","Max number of endorsements per message"],["MAX_GAS_PER_BLOCK","Maximum of GAS allowed for a block"],["MAX_MESSAGE_SIZE","Maximum message length in bytes"],["MAX_OPERATIONS_PER_BLOCK","Maximum number of operations per block"],["MAX_OPERATIONS_PER_MESSAGE","Max number of operations per message"],["NODE_SEND_CHANNEL_SIZE","node send channel size"],["OPERATION_ID_SIZE_BYTES","operation id size"],["OPERATION_VALIDITY_PERIODS","Maximum operation validity period count"],["PERIODS_PER_CYCLE","cycle duration in periods"],["POS_LOCK_CYCLES","PoS lock cycles: when some rolls are released, we only credit the coins back to their owner after waiting `pos_lock_cycles`"],["POS_LOOKBACK_CYCLES","PoS look back cycles: when drawing for cycle N, we use the rolls from cycle N - `pos_look` `back_cycles` - 1"],["ROLL_PRICE","Price of a roll in the network"],["SLOT_KEY_SIZE","slot as a key size"],["T0","Time between the periods in the same thread."],["THREAD_COUNT","Number of threads"]],"fn":[["build_massa_settings","Merge the settings"]],"mod":[["default","DEFAULT VALUES USED TO INITIALIZE DIVERS CONFIGURATIONS STRUCTURES"],["default_testing","DEFAULT VALUES USED TO INITIALIZE DIVERS CONFIGURATIONS STRUCTURES Same as default constants but in testing mode. You can access to them with the `testing` feature activated."]],"struct":[["CompactConfig","Compact representation of key values of consensus algorithm used in API"],["END_TIMESTAMP","TESTNET: time when the blockclique is ended."],["GENESIS_KEY","`PrivateKey` to sign genesis blocks."],["GENESIS_TIMESTAMP","Time in milliseconds when the blockclique started."],["POS_MISS_RATE_DEACTIVATION_THRESHOLD","number of cycle misses (strictly) above which stakers are deactivated"],["VERSION","node version"]]});