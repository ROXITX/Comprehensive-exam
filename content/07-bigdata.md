@subject bd | Big Data Computing & Business Analytics | 🐘
@order 8
@desc Analytical architecture, Hadoop, MapReduce, SparkContext, RDDs, analytics lifecycle, association & sequence rules, graph analytics, social network metrics

# arch | Big Data & Typical Analytical Architecture
N: **Big Data Vs**: **Volume, Velocity, Variety** (+ Veracity, Value). Data types: structured, semi-structured (JSON, XML), unstructured (text, images, video).
N: **Typical analytical architecture**: data sources → ingestion (Kafka, Flume, Sqoop) → storage (**HDFS / data lake**, data warehouse) → **processing & analytics (Hadoop MapReduce, Spark)** → serving (OLAP, NoSQL) → **BI tools for dashboards and reports** (Tableau, Power BI).
N: **Data lake** = raw data in native format (schema-on-read). **Data warehouse** = cleaned, structured, integrated data for analysis (schema-on-write).
N: **OLAP = Online Analytical Processing** (complex analytical queries on historical, multidimensional data; operations: roll-up, drill-down, slice, dice, pivot). **OLTP** = day-to-day transactions.
N: **Columnar databases** store data column by column → **faster analytical queries** (read only the needed columns) and better compression.
N: Traditional EDW limits: data silos, slow ETL, expensive scaling → leads to analytic sandboxes and Hadoop-based platforms.

Q: What role does Apache Spark typically play in Big Data analytical architectures?
- Data storage ~~ Storage is HDFS, S3 or a data lake.
- Data ingestion ~~ Kafka, Flume or Sqoop.
* Data processing and analytics ~~ Spark is a fast, in-memory distributed processing engine.
- Data visualization ~~ BI tools.
H: Spark = processing engine.
P: PYQ (no key)

Q: Which of the following is NOT a typical data processing framework used in Big Data analytics?
- Apache Hadoop ~~ Distributed storage + processing.
- Apache Kafka ~~ Streaming platform used in pipelines.
- Apache Hive ~~ SQL on Hadoop.
* Apache Picasso ~~ Not a real Apache big-data project.
H: Picasso is a painter, not a framework.
P: PYQ (no key)

Q: What is the primary benefit of using a columnar database in a Big Data analytical architecture?
* Faster query performance ~~ Analytical queries read only the columns they need; columns compress well.
- Lower storage costs ~~ A side benefit (compression), not the primary one.
- Real-time data ingestion ~~ Row stores are better for heavy writes.
- Streamlined ETL processes ~~ Not the main benefit.
H: Columnar = fast analytics (scan few columns).
P: PYQ (no key)

Q: Which component creates interactive dashboards and reports in a Big Data analytical architecture?
- Data lake ~~ Raw storage.
* Business Intelligence (BI) tools ~~ e.g. Tableau, Power BI, Qlik.
- Data warehouse ~~ Stores curated data.
- Hadoop cluster ~~ Stores and processes data.
H: Dashboards → BI tools.
P: PYQ (no key)

Q: What does OLAP stand for in the context of Big Data analytics?
- Online Learning and Processing ~~ No.
* Online Analytical Processing ~~ Multidimensional analysis of historical data.
- On-Demand Load Analysis Platform ~~ No.
- Offline Large-scale Analytics Protocol ~~ No.
H: OLAP = analytical; OLTP = transactional.
P: PYQ (no key)

Q: Which technology is commonly used for distributed storage and processing of Big Data in open-source Big Data ecosystems?
- Oracle Database ~~ Commercial RDBMS.
- MongoDB ~~ NoSQL database, not the classic distributed processing framework.
* Hadoop ~~ HDFS for storage + MapReduce/YARN for processing.
- Tableau ~~ Visualisation tool.
H: Open-source storage + processing = Hadoop.
P: PYQ (no key)

Q: The "3 Vs" of Big Data are:
* Volume, Velocity, Variety ~~ Size, speed of arrival, and diversity of formats (+ Veracity, Value).
- Value, Vision, Validity ~~ No.
- Volume, Visualisation, Virtualisation ~~ No.
- Velocity, Version, Volatility ~~ No.
H: Volume, Velocity, Variety.

Q: Which repository stores raw data in its native format, applying a schema only when the data is read?
* Data lake ~~ Schema-on-read.
- Data warehouse ~~ Schema-on-write, cleaned data.
- Data mart ~~ Subset of a warehouse.
- OLTP database ~~ Transactional.
H: Lake = raw; warehouse = refined.

Q: The OLAP operation that moves from detailed data to summarised data (e.g. city → country) is:
- Drill-down ~~ Summary → detail.
* Roll-up ~~ Aggregates up a hierarchy.
- Slice ~~ Fixes one dimension.
- Pivot ~~ Rotates the view.
H: Roll-up = zoom out; drill-down = zoom in.

Q: Selecting a sub-cube by fixing a single dimension value (e.g. Year = 2023) is the OLAP operation:
* Slice ~~ One dimension fixed.
- Dice ~~ Conditions on two or more dimensions.
- Roll-up ~~ Aggregation.
- Drill-down ~~ More detail.
H: Slice = 1 dimension; dice = several.

Q: JSON and XML data are examples of:
- Structured data ~~ Tables with fixed schemas.
* Semi-structured data ~~ Self-describing tags/keys but flexible schema.
- Unstructured data ~~ Images, free text.
- Metadata only ~~ No.
H: JSON/XML = semi-structured.

# hadoop | Hadoop Framework, HDFS & YARN
N: **Hadoop** = open-source framework for distributed storage (**HDFS**) and processing (**MapReduce**, on **YARN**) on commodity hardware. Key strengths: **high fault tolerance and scalability** (batch-oriented, not low-latency).
N: **HDFS = Hadoop Distributed File System**: files split into large **blocks (default 128 MB in Hadoop 2/3; 64 MB in Hadoop 1)**, each **replicated 3 times** by default across DataNodes (rack-aware).
N: **NameNode** (master) stores **metadata** (namespace, file → block → DataNode mapping). **DataNodes** store the actual blocks and send heartbeats. **Secondary NameNode** checkpoints metadata (fsimage + edit log) — it is NOT a hot backup.
N: **YARN (Yet Another Resource Negotiator)** manages and schedules cluster resources: **ResourceManager** (global), **NodeManager** (per node), **ApplicationMaster** (per job), containers.
N: Ecosystem: **Hive** (SQL-like HiveQL), **Pig** (Pig Latin dataflow scripts), **HBase** (column-oriented NoSQL, random real-time access), **Sqoop** (RDBMS ↔ HDFS), **Flume** (log ingestion), **Oozie** (workflow scheduling), **ZooKeeper** (coordination), Mahout (ML).
N: Data locality: move computation to where the data is.

Q: In a Hadoop-based analytical architecture, what does HDFS stand for?
- High-Density File System ~~ No.
* Hadoop Distributed File System ~~ The storage layer of Hadoop.
- Hierarchical Data File Storage ~~ No.
- Hyper Data Flow Storage ~~ No.
H: HDFS = Hadoop Distributed File System.
P: PYQ (no key)

Q: Hadoop is often used to process and analyse large datasets. Which characteristics of Hadoop make it suitable for this task?
- Real-time data processing and low latency ~~ Hadoop MapReduce is batch-oriented, high latency.
* High fault tolerance and scalability ~~ Replication + adding commodity nodes.
- Strong consistency and ACID transactions ~~ RDBMS traits.
- Small storage footprint ~~ Replication triples storage.
H: Hadoop = fault tolerant + scalable (batch).
P: PYQ (no key)

Q: Which Hadoop ecosystem component manages and schedules resources in a Hadoop cluster?
- HDFS (Hadoop Distributed File System) ~~ Storage.
* YARN (Yet Another Resource Negotiator) ~~ ResourceManager + NodeManagers schedule containers.
- MapReduce ~~ A processing model that runs on YARN.
- Hive ~~ SQL layer.
H: Resources → YARN.
P: PYQ (no key)

Q: In Hadoop, what is the purpose of the NameNode?
- Storing data blocks ~~ DataNodes do that.
- Managing job scheduling ~~ YARN ResourceManager.
* Storing metadata about files and directories ~~ The namespace and block locations.
- Running MapReduce tasks ~~ NodeManagers/containers.
H: NameNode = metadata; DataNode = data.
P: PYQ (no key)

Q: Which Hadoop ecosystem tool is used for SQL-like querying of data stored in HDFS?
- HBase ~~ NoSQL store with key-based access.
- Pig ~~ Dataflow scripting (Pig Latin).
* Hive ~~ HiveQL — SQL on Hadoop.
- Sqoop ~~ Imports/exports between RDBMS and HDFS.
H: SQL on Hadoop → Hive.
P: PYQ (no key)

Q: Which programming languages can be used to write MapReduce jobs in Hadoop?
* Java and Python ~~ Java natively; Python (and others) via Hadoop Streaming.
- C++ and Ruby ~~ Possible via Pipes/Streaming, but not the expected answer.
- Scala and PHP ~~ Not the typical answer.
- HTML and CSS ~~ Markup, not programming.
H: MapReduce: Java (native) + Python (Streaming).
P: PYQ (no key)

Q: The default HDFS block size in Hadoop 2.x/3.x is:
- 4 KB ~~ OS file systems.
- 64 MB ~~ Hadoop 1.x.
* 128 MB ~~ Large blocks reduce metadata and seek overhead.
- 1 GB ~~ No.
H: HDFS block = 128 MB (Hadoop 1: 64 MB).

Q: The default replication factor in HDFS is:
- 1 ~~ No fault tolerance.
- 2 ~~ No.
* 3 ~~ Typically 1 on the local rack, 2 on a remote rack.
- 5 ~~ No.
H: Replication = 3.

Q: A 500 MB file stored in HDFS with 128 MB blocks occupies how many blocks (before replication)?
- 3 ~~ 3 × 128 = 384 < 500.
* 4 ~~ 128 + 128 + 128 + 116 MB.
- 5 ~~ Too many.
- 1 ~~ No.
H: ⌈size / block size⌉.

Q: With replication factor 3, a 300 MB file uses how much raw HDFS storage?
- 300 MB ~~ Ignores replication.
* 900 MB ~~ Each block is stored 3 times (the last block uses only its actual size).
- 384 MB ~~ No.
- 1152 MB ~~ That assumes full blocks.
H: Storage ≈ size × replication.

Q: The Secondary NameNode in Hadoop:
* Periodically merges the edit log with the fsimage (checkpointing) ~~ It is NOT a failover standby.
- Takes over immediately when the NameNode fails ~~ That's a Standby NameNode in HA setups.
- Stores data blocks ~~ DataNodes.
- Runs reducers ~~ No.
H: Secondary NN = checkpoint helper, not a backup.

Q: Which Hadoop tool transfers bulk data between relational databases and HDFS?
- Flume ~~ Streams logs/events.
* Sqoop ~~ "SQL-to-Hadoop".
- Oozie ~~ Workflow scheduler.
- ZooKeeper ~~ Coordination service.
H: Sqoop = SQL ↔ Hadoop.

Q: HBase is best described as:
* A distributed, column-oriented NoSQL database on HDFS with random real-time read/write ~~ Modelled on Google Bigtable.
- A SQL query engine ~~ Hive.
- A workflow scheduler ~~ Oozie.
- A machine-learning library ~~ Mahout.
H: HBase = Bigtable on Hadoop.

Q: In YARN, the component that negotiates resources for a single application and monitors its tasks is the:
- ResourceManager ~~ Cluster-wide.
- NodeManager ~~ Per machine.
* ApplicationMaster ~~ One per application/job.
- NameNode ~~ HDFS.
H: RM (cluster) → AM (per app) → NM (per node).

Q: DataNodes inform the NameNode that they are alive by sending:
* Heartbeats (and block reports) ~~ Missing heartbeats mark a node dead and trigger re-replication.
- Checkpoints ~~ Secondary NameNode.
- MapReduce jobs ~~ No.
- SQL queries ~~ No.
H: Heartbeat = I'm alive.

# mapreduce | Batch Analysis with Hadoop MapReduce
N: **MapReduce** = batch programming model: **Map** → (Combine) → **Shuffle & Sort** → **Reduce**.
N: **Mapper** maps input key/value pairs to a set of **intermediate key/value pairs** (transforms data into key-value form). **Map task** processes one input split (chunk). Number of map tasks = number of input splits.
N: **Reduce** consolidates/aggregates the results of all map tasks for each key. **Shuffle** moves map output to the right reducer (by the **partitioner**, usually hash of the key) and sorts it by key.
N: **Combiner** = a "mini-reducer" run on map output locally to reduce network traffic.
N: Word count: map emits (word, 1); reduce sums the counts per word.
N: MapReduce writes intermediate data to disk → good for large batch jobs, slower for iterative work (Spark keeps data in memory).

Q: In Hadoop's MapReduce programming model, what is the role of the Map phase?
- Aggregating data ~~ That's Reduce.
- Sorting data ~~ Shuffle & sort happens between the phases.
- Filtering data ~~ Can be done in map, but not its defining role.
* Transforming data into key-value pairs ~~ The mapper emits intermediate (key, value) pairs.
H: Map = transform to (k, v); Reduce = aggregate.
P: PYQ (no key)

Q: _________ function is responsible for consolidating the results produced by each of the Map() functions/tasks.
* Reduce ~~ Reduce aggregates all values for each key.
- Map ~~ Produces the intermediate results.
- Reducer ~~ The class that runs Reduce; the question asks for the function, "Reduce".
- All of the mentioned ~~ Only Reduce.
H: Consolidate → Reduce.
P: PYQ (no key)

Q: ___________ part of the MapReduce is responsible for processing one or more chunks of data and producing the output results.
* Maptask ~~ Each map task processes an input split (chunk).
- Mapper ~~ The user's map logic; the unit that processes a chunk is the map task.
- Task execution ~~ Generic.
- All of the mentioned ~~ Only the map task fits.
H: Chunk processing → map task.
P: PYQ (no key)

Q: __________ maps input key/value pairs to a set of intermediate key/value pairs.
* Mapper ~~ Map: (k1, v1) → list(k2, v2).
- Reducer ~~ Reduce: (k2, list(v2)) → list(k3, v3).
- Both Mapper and Reducer ~~ Only the Mapper.
- None of the mentioned ~~ Mapper is correct.
H: Mapper → intermediate pairs.
P: PYQ (no key)

Q: For word count on the input "big data big", what does the mapper emit?
* (big, 1), (data, 1), (big, 1) ~~ One pair per word occurrence.
- (big, 2), (data, 1) ~~ That's after reduce.
- (big, data, big) ~~ Not key-value pairs.
- (3) ~~ No.
H: Map emits (word, 1).

Q: For word count on "big data big", the reducer output is:
- (big, 1), (data, 1), (big, 1) ~~ That's map output.
* (big, 2), (data, 1) ~~ Values for each key are summed.
- (big data, 3) ~~ No.
- (data, 2) ~~ No.
H: Reduce sums per key.

Q: The phase that transfers map outputs to reducers and groups them by key is:
- Map ~~ Earlier.
* Shuffle and sort ~~ The partitioner routes each key to one reducer, sorted by key.
- Combine ~~ Local pre-aggregation.
- Input split ~~ Before map.
H: Shuffle = map → reduce data movement.

Q: A combiner in MapReduce:
* Performs local aggregation on mapper output to reduce data sent over the network ~~ A "mini-reducer".
- Replaces the reducer always ~~ Optional optimisation.
- Splits the input file ~~ InputFormat does that.
- Schedules tasks ~~ YARN.
H: Combiner = local reduce.

Q: In MapReduce, the partitioner decides:
* Which reducer receives each intermediate key ~~ Default: hash(key) mod #reducers.
- How the input file is split ~~ InputFormat.
- The block size ~~ HDFS.
- The number of mappers ~~ Number of splits.
H: Partitioner = key → reducer.

Q: The number of map tasks in a MapReduce job is usually determined by:
* The number of input splits (≈ HDFS blocks) ~~ One map task per split.
- The number of reducers ~~ Independent.
- The number of keys ~~ No.
- The user only ~~ Mostly the splits.
H: #maps = #splits.

Q: MapReduce is less suitable than Spark for iterative machine-learning algorithms because:
* It writes intermediate results to disk between jobs ~~ Spark keeps data in memory across iterations.
- It cannot process large data ~~ It can.
- It has no fault tolerance ~~ It has.
- It doesn't support Java ~~ It does.
H: Iterative → Spark (in-memory).

# spark | Apache Spark & SparkContext
N: **Spark** = fast, general, **in-memory** cluster computing engine (often 10–100× faster than MapReduce for iterative work). Components: Spark Core (RDDs), Spark SQL/DataFrames, Streaming, MLlib, GraphX.
N: **SparkContext** = the entry point of a Spark application (created in the **driver program**); it connects to the **cluster manager** (Standalone, YARN, Mesos, Kubernetes), which allocates **executors** — resources are allocated at the **executor level**. In Spark 2+, **SparkSession** wraps the SparkContext.
N: Key configuration: **spark.master** (cluster URL), spark.driver.memory, spark.executor.memory/cores, **spark.default.parallelism** (default number of partitions/parallelism for RDD operations).
N: **sc.setCheckpointDir(dir)** sets the directory where **checkpoint data** is stored (checkpointing truncates long lineages).
N: Execution: action → **DAG** of stages (split at shuffle boundaries) → tasks per partition. The DAG scheduler and Catalyst optimizer (SQL) **optimise the plan** (pipelining narrow transformations, choosing a physical plan).
N: **Data locality**: schedule tasks on nodes holding the data → less network overhead.

Q: Which of the following is true regarding SparkContext's role in managing cluster resources?
- SparkContext allocates resources at the task level. ~~ Tasks run inside executors that already have resources.
* SparkContext allocates resources at the executor level. ~~ Through the cluster manager, it acquires executors (CPU cores + memory).
- SparkContext allocates resources at the node level. ~~ Executors, not whole nodes.
- SparkContext allocates resources at the driver program level. ~~ The driver hosts the SparkContext.
H: SparkContext → cluster manager → executors.
P: PYQ (no key)

Q: Which SparkContext configuration parameter is used to control the level of parallelism in RDD operations?
- spark.master ~~ Cluster manager URL.
- spark.driver.memory ~~ Driver RAM.
- spark.executor.cores ~~ Cores per executor.
* spark.default.parallelism ~~ Default number of partitions for shuffles/parallelize.
H: Parallelism → spark.default.parallelism.
P: PYQ (no key)

Q: In the context of SparkContext, what is the purpose of the setCheckpointDir method?
- To specify the location of Spark's event log. ~~ spark.eventLog.dir.
- To configure the level of log output. ~~ setLogLevel.
* To define a directory where checkpoint data will be stored. ~~ Used before rdd.checkpoint().
- To set the number of retries for failed tasks. ~~ spark.task.maxFailures.
H: setCheckpointDir → where checkpoints go.
P: PYQ (no key)

Q: During which phase of a Spark job lifecycle does Spark perform optimisations like pipelining narrow transformations and selecting the best physical execution plan?
- Data Ingestion ~~ Reading data.
- Data Exploration ~~ Not a Spark phase.
* Query Optimization ~~ The DAG scheduler / Catalyst optimiser plan execution.
- Data Presentation ~~ Output.
H: Plan optimisation = query optimisation (DAG/Catalyst).
P: PYQ (no key)

Q: How does data locality optimisation in Spark RDDs contribute to better performance, and in which phase is it most relevant?
* It reduces network overhead by placing tasks close to the data they need, improving performance during Data Deployment. ~~ The only option with the correct mechanism (move compute to data).
- It speeds up data loading from external sources during Data Preparation. ~~ Locality is about task placement, not loading speed.
- It enables real-time processing, resulting in faster Data Exploration. ~~ Not the mechanism.
- It enhances data compression techniques, benefiting Query Optimization. ~~ Not related to compression.
H: Data locality = run the task where the data lives.
F: No official key. Only this option describes the mechanism correctly (less network traffic). The phase label in the option is loose.
P: PYQ (no key)

Q: The entry point of a Spark application through which RDDs are created and the cluster is accessed is:
* SparkContext (sc) ~~ Created in the driver; SparkSession wraps it in Spark 2+.
- HDFS ~~ Storage.
- NameNode ~~ HDFS metadata.
- Executor ~~ Worker process.
H: sc = gateway to Spark.

Q: The Spark component that runs the main() function and creates the SparkContext is the:
* Driver program ~~ Builds the DAG and schedules tasks.
- Executor ~~ Runs tasks.
- Worker node ~~ Hosts executors.
- Cluster manager ~~ Allocates resources.
H: Driver = brain; executors = muscle.

Q: Which of the following is NOT a cluster manager Spark can run on?
- Standalone ~~ Built-in.
- YARN ~~ Hadoop.
- Kubernetes ~~ Supported.
* HBase ~~ A database, not a cluster manager.
H: Spark masters: Standalone, YARN, Mesos, Kubernetes.

Q: Spark is generally faster than Hadoop MapReduce mainly because it:
* Keeps intermediate data in memory and optimises a DAG of operations ~~ Avoids repeated disk I/O.
- Doesn't use a cluster ~~ It does.
- Uses smaller datasets ~~ No.
- Avoids parallelism ~~ No.
H: Spark = in-memory DAG.

Q: In Spark, a job is divided into stages at:
* Shuffle boundaries (wide transformations) ~~ Narrow transformations are pipelined within a stage.
- Every transformation ~~ Narrow ones are combined.
- Every action only ~~ Actions create jobs.
- Random points ~~ No.
H: New stage at each shuffle.

Q: In Spark 2.x and later, the unified entry point for DataFrames and SQL that wraps SparkContext is:
* SparkSession ~~ spark = SparkSession.builder…getOrCreate().
- HiveContext only ~~ Older API.
- JobTracker ~~ Hadoop 1.
- NameNode ~~ HDFS.
H: SparkSession ⊃ SparkContext.

# rdd | Resilient Distributed Datasets (RDDs) & Creating RDDs
N: **RDD** = immutable, partitioned, fault-tolerant collection processed in parallel. **Resilient** = rebuilt from **lineage** (the recorded chain of transformations) if a partition is lost — immutability makes lineage-based recovery possible.
N: **Creating RDDs**: (1) **sc.parallelize(collection)**, (2) from external storage — **sc.textFile("hdfs://…")**, (3) by **transforming an existing RDD**.
N: **Transformations** (lazy, return a new RDD): map, filter, flatMap, **reduceByKey**, groupByKey, join, union, distinct, sortByKey. **Actions** (trigger computation, return a result or write output): **count, collect**, take, first, reduce, **saveAsTextFile**, foreach.
N: **Lazy evaluation**: nothing runs until an **action** is called → Spark can optimise the whole chain.
N: **Narrow** transformations (map, filter) need no data movement. **Wide** transformations (reduceByKey, groupByKey, join) **shuffle** data across the cluster. reduceByKey is preferred over groupByKey (combines locally first).
N: **cache()/persist()** keep an RDD in memory — useful when the **RDD is reused/computed multiple times** (iterative algorithms). cache() = persist(MEMORY_ONLY).
N: Key advantage over HDFS-based processing: **in-memory data processing**.

Q: RDDs in Apache Spark are immutable. What is the primary benefit of immutability in distributed data processing?
- It allows for real-time data updates. ~~ Immutable data can't be updated in place.
- It simplifies data manipulation. ~~ Not the primary benefit.
* It ensures fault tolerance and data lineage. ~~ Lost partitions can be recomputed deterministically from the lineage.
- It enables parallel processing. ~~ Partitioning enables parallelism.
H: Immutable + lineage = resilient.
P: PYQ (no key)

Q: When is data lineage information in RDDs valuable, and how does it assist in fault tolerance?
- During data loading from external sources ~~ Lineage is about transformations.
* During data transformation operations ~~ Lineage records the chain of transformations, so lost partitions can be recomputed.
- During data storage in HDFS ~~ HDFS uses replication instead.
- During data visualization ~~ No.
H: Lineage = recipe of transformations → recompute on failure.
P: PYQ (no key)

Q: In Apache Spark, what is the key advantage of using RDDs over traditional distributed storage systems like HDFS?
- RDDs offer higher data compression. ~~ Not the key advantage.
- RDDs allow random access to data. ~~ RDDs aren't random-access stores.
* RDDs provide in-memory data processing. ~~ Data stays in RAM across operations.
- RDDs support complex query languages. ~~ That's Spark SQL/Hive.
H: RDD advantage = in-memory.
P: PYQ (no key)

Q: Which of the following RDD operations is considered a transformation?
- count() ~~ Action.
* reduceByKey() ~~ Returns a new RDD (lazy).
- saveAsTextFile() ~~ Action (writes output).
- collect() ~~ Action (returns data to the driver).
H: Transformation returns an RDD; action returns a value or writes.
P: PYQ (no key)

Q: RDDs in Apache Spark can be cached or persisted in memory. When might it be beneficial to use caching?
- When dealing with small datasets ~~ Size alone isn't the reason.
- When there is ample storage space available ~~ Not the reason.
* When an RDD is computed multiple times ~~ Caching avoids recomputing its lineage on each reuse.
- When performing real-time data processing ~~ Not the reason.
H: Reused RDD → cache it.
P: PYQ (no key)

Q: Which of the following RDD operations triggers a full shuffle of data across the cluster?
- map() ~~ Narrow.
- filter() ~~ Narrow.
* reduceByKey() ~~ Wide — values with the same key must meet on one partition.
- collect() ~~ An action that brings results to the driver; it doesn't shuffle between partitions.
H: ByKey / join → shuffle.
P: PYQ (no key)

Q: In the context of Spark RDDs, what does it mean when an RDD is considered "lazy"?
- Lazy RDDs are not processed at all. ~~ They are processed when needed.
* Lazy RDDs are only computed when an action is called. ~~ Transformations just build the plan.
- Lazy RDDs are automatically cached in memory. ~~ Caching is explicit.
- Lazy RDDs are not fault-tolerant. ~~ They are.
H: Lazy = wait for an action.
P: PYQ (no key)

Q: Which of the following is an RDD ACTION?
- map() ~~ Transformation.
- filter() ~~ Transformation.
- flatMap() ~~ Transformation.
* count() ~~ Returns the number of elements → triggers execution.
H: Actions: count, collect, take, first, reduce, save….

Q: Which method creates an RDD from an in-memory Python/Scala collection?
* sc.parallelize(data) ~~ Distributes a local collection.
- sc.textFile(path) ~~ Reads from a file.
- rdd.collect() ~~ Action — the opposite direction.
- sc.stop() ~~ Stops the context.
H: parallelize = local list → RDD.

Q: Which method creates an RDD from a file stored in HDFS?
- sc.parallelize ~~ For local collections.
* sc.textFile("hdfs://path") ~~ Each line becomes an element.
- rdd.saveAsTextFile ~~ Writes output.
- sc.broadcast ~~ Broadcast variables.
H: textFile = file → RDD.

Q: The three ways to create an RDD are:
* Parallelising a collection, loading an external dataset, and transforming an existing RDD ~~ Every RDD comes from one of these.
- Only from HDFS ~~ No.
- Only via SQL ~~ No.
- Copying from a NameNode ~~ No.
H: parallelize · textFile · transform.

Q: What does flatMap do differently from map?
* It can return zero or more output elements per input and flattens the results ~~ e.g. split lines into words.
- It returns exactly one element per input ~~ That's map.
- It is an action ~~ It's a transformation.
- It sorts the data ~~ No.
H: flatMap = map + flatten.

Q: Why is reduceByKey usually preferred over groupByKey for aggregation?
* It combines values locally on each partition before shuffling ~~ Much less data moves across the network.
- It never shuffles ~~ It shuffles, but less data.
- It returns results to the driver ~~ No.
- It works only on numbers ~~ No.
H: reduceByKey = map-side combine.

Q: A transformation where each output partition depends on a single input partition (e.g. map, filter) is called:
* Narrow ~~ No shuffle; pipelined in one stage.
- Wide ~~ Requires a shuffle.
- Global ~~ Not a term.
- Action ~~ No.
H: Narrow = no shuffle; wide = shuffle.

Q: cache() on an RDD is equivalent to:
* persist(StorageLevel.MEMORY_ONLY) ~~ Default in-memory storage.
- persist(DISK_ONLY) ~~ No.
- checkpoint() ~~ Writes to reliable storage, cuts lineage.
- unpersist() ~~ Removes it.
H: cache = persist(MEMORY_ONLY).

# lifecycle | Data Analytics Lifecycle
N: **Data Analytics Lifecycle** (EMC): **1. Discovery** (learn the domain, frame the problem, define **objectives, success criteria/KPIs**, form hypotheses) → **2. Data Preparation** (analytic sandbox, ETL/ELT, data conditioning — often the longest phase) → **3. Model Planning** (choose methods and variables) → **4. Model Building** (build and test models) → **5. Communicate Results** → **6. Operationalize** (deploy, pilot, monitor, **validate against real-world data and adjust**).
N: The process is **iterative** — you can move back to earlier phases.
N: Key roles: business user, project sponsor, project manager, BI analyst, DBA, data engineer, **data scientist**.
N: **KDD = Knowledge Discovery in Databases**: selection → preprocessing → transformation → **data mining** → interpretation/evaluation.
N: Unstructured-data challenges: **data integration and data quality** → address with **data governance and ETL processes** (+ appropriate storage like data lakes/NoSQL).
N: Mining tasks: **time series analysis** (attribute value as it varies over time), regression, classification, clustering, association rules, sequence discovery.

Q: During which phase of the Data Analytics Lifecycle is it crucial to define the project's objectives and key performance indicators (KPIs)?
- Data Preparation ~~ That's about getting the data ready.
* Data Exploration ~~ The earliest listed phase — it corresponds to Discovery, where the problem, objectives and KPIs are framed.
- Data Modeling ~~ Too late.
- Data Deployment ~~ Too late.
H: Objectives & KPIs → first phase (Discovery).
F: No official key. In the standard lifecycle this happens in the Discovery phase, which isn't listed. "Data Exploration" is the earliest phase offered, so it is the best match.
P: PYQ (no key)

Q: Which phase of the Data Analytics Lifecycle involves validating the performance of analytics models against real-world data and making necessary adjustments?
- Data Exploration ~~ Too early.
- Data Preparation ~~ Too early.
- Data Modeling ~~ Models are tested on held-out data here, but not on live real-world data.
* Data Deployment ~~ Operationalise: run a pilot, monitor in production, and tune the model.
H: Real-world validation → deployment (operationalise).
F: No official key. "Real-world data" points to the Operationalize/Deployment phase.
P: PYQ (no key)

Q: In the Big Data analytics lifecycle, what challenges might organisations encounter when handling unstructured data, and how can they address them?
- Data scalability and storage costs; use cloud-based solutions ~~ Partly relevant, but not the core unstructured-data issue.
* Data integration and data quality; address with data governance and ETL processes ~~ Unstructured data is hard to integrate and clean.
- Data security and privacy; use open-source tools ~~ Open source doesn't solve security.
- Access speed and network latency; optimise the network ~~ Not the main issue.
H: Unstructured → integration + quality → governance + ETL.
P: PYQ (no key)

Q: What is KDD in data mining?
* Knowledge Discovery Database ~~ i.e. Knowledge Discovery in Databases — the overall process, with data mining as one step.
- Knowledge Discovery Data ~~ Incomplete.
- Knowledge Data definition ~~ No.
- Knowledge data house ~~ No.
H: KDD = Knowledge Discovery in Databases.
P: PYQ (no key)

Q: In ____________, the value of an attribute is examined as it varies over time
- Regression. ~~ Relationship between variables.
* Time series analysis. ~~ Values tracked over time (trends, seasonality).
- Sequence discovery. ~~ Order of events/items.
- Prediction ~~ Generic.
H: Over time → time series.
P: PYQ (no key)

Q: The correct order of the six phases of the Data Analytics Lifecycle is:
* Discovery → Data Preparation → Model Planning → Model Building → Communicate Results → Operationalize ~~ EMC's lifecycle.
- Data Preparation → Discovery → Model Building → Model Planning → Operationalize → Communicate ~~ Wrong order.
- Model Building → Discovery → Data Preparation → Communicate → Model Planning → Operationalize ~~ No.
- Operationalize → Discovery → … ~~ No.
H: D-P-Plan-Build-Communicate-Operationalize.

Q: Which phase of the analytics lifecycle typically consumes the most time?
- Discovery ~~ Important but shorter.
* Data Preparation ~~ Cleaning, integrating and conditioning data takes the bulk of the effort.
- Communicate Results ~~ Shorter.
- Operationalize ~~ Shorter.
H: Most time = data prep.

Q: Framing the business problem and forming initial hypotheses happens in which lifecycle phase?
* Discovery ~~ Also identify data sources and success criteria.
- Model Building ~~ Later.
- Operationalize ~~ Last.
- Communicate Results ~~ Near the end.
H: Phase 1 = Discovery.

Q: An "analytic sandbox" is set up mainly during:
- Discovery ~~ Too early.
* Data Preparation ~~ A workspace where data can be explored and conditioned without affecting production.
- Communicate Results ~~ No.
- Operationalize ~~ Production.
H: Sandbox = data prep playground.

Q: In the KDD process, data mining is:
* One step — applying algorithms to extract patterns — after selection, preprocessing and transformation ~~ Followed by interpretation/evaluation.
- The entire KDD process ~~ It's only one step.
- Only data cleaning ~~ No.
- Only visualisation ~~ No.
H: KDD ⊃ data mining.

# assoc | Association Rules & Apriori
N: **Support count** = frequency of occurrence of an itemset (number of transactions containing it). **Support** = support count / total transactions.
N: **Confidence(A → B)** = Support(A ∪ B) / Support(A) — i.e. P(B | A), where A ∪ B means the itemset containing both A and B.
N: **Lift(A → B)** = Confidence(A → B) / Support(B). Lift > 1 → positive association; = 1 → independent; < 1 → negative.
N: **Frequent itemset**: support ≥ minimum support threshold. **Strong rule**: meets min support AND min confidence.
N: **Apriori property (anti-monotone)**: every subset of a frequent itemset is frequent → if an itemset is infrequent, all its supersets are pruned. Apriori = generate candidates level by level (k-itemsets from frequent (k−1)-itemsets), prune, count.
N: Improving Apriori: **hash-based techniques**, **transaction reduction**, **partitioning**, **sampling**, dynamic itemset counting. **FP-Growth** avoids candidate generation using an FP-tree.
N: Classic market-basket example: {Diapers} → {Beer}.

Q: Frequency of occurrence of an item (itemset) is called _____
- Support ~~ Support is usually the FRACTION of transactions.
- Confidence ~~ Conditional probability of a rule.
* Support Count ~~ The raw count of transactions containing the itemset (Han & Kamber).
- Rules ~~ No.
H: Count = support count; fraction = support.
P: PYQ (no key)

Q: What techniques can be used to improve the efficiency of the Apriori algorithm?
* Hash-based techniques ~~ Hash buckets prune candidate 2-itemsets early (listed first in Han & Kamber).
- Transaction Increases ~~ The technique is transaction REDUCTION.
- Sampling ~~ Also a valid technique, but hash-based is the standard single answer.
- Cleaning ~~ Not an Apriori optimisation.
H: Apriori boosters: hashing, transaction reduction, partitioning, sampling, DIC.
F: No official key. Sampling is also a valid improvement. Hash-based is the best-known answer, and "Transaction Increases" is a deliberate distractor.
P: PYQ (no key)

Q: How do you calculate Confidence (A -> B)?
* Support(A∩B) / Support (A) ~~ Of the transactions with A, the fraction that also contain B (here A∩B means "both A and B present").
- Support(A ∩ B) / Support (B) ~~ That's confidence of B → A.
- Support(A U B) / Support (A) ~~ In probability notation A∪B means "A or B", which is wrong. (Han & Kamber's itemset notation writes the same formula as sup(A∪B)/sup(A), where A∪B is the itemset containing both.)
- Support(A U B) / Support (B) ~~ Wrong denominator.
H: Confidence = P(B | A) = sup(A and B) / sup(A).
F: No official key. MCQ keys use the ∩ (probability) form. Textbooks that use itemset notation write sup(A ∪ B)/sup(A) for the same thing. Either way, the denominator is the support of A.
P: PYQ (no key)

Q: An itemset whose support is greater than or equal to a minimum support threshold is ______
- Itemset ~~ Any set of items.
* Frequent Itemset ~~ Meets min support.
- Infrequent items ~~ Opposite.
- Threshold values ~~ No.
H: ≥ min_sup → frequent.
P: PYQ (no key)

Q: Transactions: T1 {Bread, Milk}, T2 {Bread, Diaper, Beer, Eggs}, T3 {Milk, Diaper, Beer, Coke}, T4 {Bread, Milk, Diaper, Beer}, T5 {Bread, Milk, Diaper, Coke}. What is the support of {Milk, Diaper, Beer}?
- 0.6 ~~ That's {Diaper, Beer}.
* 0.4 ~~ It appears in T3 and T4 → 2/5.
- 0.2 ~~ Recount.
- 0.8 ~~ That's Diaper alone.
H: Support = transactions containing ALL items / N.

Q: Using the same 5 transactions, what is the confidence of {Milk, Diaper} → {Beer}?
- 0.4 ~~ That's the support.
* 0.67 ~~ sup{Milk, Diaper, Beer} = 2; sup{Milk, Diaper} = 3 (T3, T4, T5) → 2/3.
- 0.5 ~~ Recount.
- 1.0 ~~ T5 has no beer.
H: Confidence = count(A and B) / count(A).

Q: Using the same transactions, what is the confidence of {Diaper} → {Beer}?
* 0.75 ~~ Diaper in 4 transactions; Diaper and Beer in 3 → 3/4.
- 0.6 ~~ That's support of {Diaper, Beer}.
- 1.0 ~~ T5 has diaper but no beer.
- 0.8 ~~ That's support of Diaper.
H: 3 of 4 diaper baskets have beer.

Q: Using the same transactions, the lift of {Diaper} → {Beer} is:
- 0.75 ~~ That's the confidence.
* 1.25 ~~ Confidence 0.75 / support(Beer) 0.6.
- 0.6 ~~ Support of beer.
- 1.0 ~~ Would mean independence.
H: Lift = confidence / support(consequent).

Q: A rule with lift = 1 means:
* The antecedent and consequent are independent ~~ Buying A doesn't change the chance of B.
- A strong positive association ~~ That's lift > 1.
- A negative association ~~ That's lift < 1.
- 100% confidence ~~ Different measure.
H: Lift 1 = no relationship.

Q: The Apriori property states that:
* All non-empty subsets of a frequent itemset must also be frequent ~~ So any superset of an infrequent itemset can be pruned.
- All supersets of a frequent itemset are frequent ~~ Not true.
- Frequent itemsets have exactly 2 items ~~ No.
- Confidence is always ≥ support ~~ Not the Apriori property.
H: Infrequent subset ⇒ prune the superset.

Q: FP-Growth improves on Apriori by:
* Mining frequent itemsets without candidate generation, using a compact FP-tree ~~ Usually only two database scans.
- Generating more candidates ~~ Opposite.
- Ignoring support ~~ No.
- Using neural networks ~~ No.
H: FP-Growth = no candidates.

Q: An association rule is called "strong" if it satisfies:
* Both minimum support and minimum confidence thresholds ~~ User-defined.
- Only minimum support ~~ Not enough.
- Only lift > 0 ~~ No.
- Maximum confidence ~~ No.
H: Strong = min_sup + min_conf.

Q: In 10 transactions, item A appears in 6 and {A, B} appears in 3. Confidence(A → B) is:
- 0.3 ~~ That's support of {A, B}.
* 0.5 ~~ 3/6.
- 0.6 ~~ That's support of A.
- 2.0 ~~ Inverted.
H: count(A,B) / count(A).

# sequence | Sequence Rules & Sequential Pattern Mining
N: **Sequential pattern mining** finds frequently occurring **ordered** sequences of events/itemsets (e.g. customers buy a laptop → then a laptop bag → then a mouse). **Order matters**, unlike plain association rules.
N: A **sequence** is an ordered list of itemsets (elements) ⟨{a}, {b, c}, {d}⟩. A sequence is contained in another if its elements appear in the same order (gaps allowed).
N: **Sequence support** = fraction of customer/data sequences that contain the pattern. A **sequence rule** X ⇒ Y means "Y tends to follow X".
N: Algorithms: **GSP** (Generalized Sequential Patterns — Apriori-based, level-wise), **SPADE** (vertical id-lists), **PrefixSpan** (pattern growth, projected databases).
N: Applications: web clickstreams, purchase histories, DNA, medical event sequences.
N: **Sequence discovery** is the data-mining task of finding such sequential patterns.

Q: Sequential pattern mining differs from association rule mining because it:
* Considers the ORDER in which items/events occur ~~ "A then B", not just "A with B".
- Ignores time completely ~~ That's market-basket analysis.
- Needs no support threshold ~~ It uses support.
- Works only on images ~~ No.
H: Sequence = order matters.

Q: "Customers who buy a smartphone often buy a phone cover within a week" is an example of:
- A clustering result ~~ No.
* A sequential pattern / sequence rule ~~ Time-ordered purchases.
- Linear regression ~~ No.
- Classification ~~ No.
H: "X then Y" → sequence rule.

Q: GSP (Generalized Sequential Patterns) is based on the principle of:
* Apriori — level-wise candidate generation with pruning ~~ Frequent k-sequences generate (k+1)-candidates.
- Backpropagation ~~ No.
- K-means ~~ No.
- PageRank ~~ No.
H: GSP = Apriori for sequences.

Q: PrefixSpan mines sequential patterns by:
* Pattern growth using projected (prefix-based) databases, without candidate generation ~~ Efficient for long sequences.
- Generating all candidates level-wise ~~ That's GSP.
- Building decision trees ~~ No.
- Random sampling only ~~ No.
H: PrefixSpan = prefix projection.

Q: The sequence ⟨{a}, {c}⟩ is contained in which data sequence?
* ⟨{a, b}, {d}, {c, e}⟩ ~~ a appears in an earlier element and c in a later one — order is preserved (gaps allowed).
- ⟨{c}, {a}⟩ ~~ Wrong order.
- ⟨{b}, {d}⟩ ~~ Missing items.
- ⟨{c, e}⟩ ~~ a is missing.
H: Same order, gaps allowed.

Q: In 4 customer sequences, the pattern ⟨{bread}, {milk}⟩ (bread, later milk) appears in 3. Its sequence support is:
- 0.25 ~~ Recount.
* 0.75 ~~ 3/4.
- 3 ~~ That's the count.
- 1 ~~ Not all.
H: Support = sequences containing the pattern / total.

Q: Which is a typical application of sequential pattern mining?
* Analysing web clickstreams to predict the next page visited ~~ Ordered page views.
- Image classification ~~ CNNs.
- Computing correlation coefficients ~~ No.
- Sorting arrays ~~ No.
H: Clickstreams, purchase histories, DNA → sequences.

Q: The data-mining task of finding patterns where events occur in a particular order is called:
- Regression ~~ Numeric prediction.
* Sequence discovery ~~ Also called sequential pattern mining.
- Time series analysis ~~ Values of one attribute over time.
- Clustering ~~ Grouping.
H: Order of events → sequence discovery.

# graph | Graph Analytics Techniques
N: **Graph analytics** studies entities (vertices/nodes) and relationships (edges): social networks, fraud rings, recommendation, logistics, the web.
N: Techniques: **path analysis** (shortest paths — Dijkstra/BFS), **connectivity** (connected components, bridges), **centrality** (degree, betweenness, closeness, eigenvector, **PageRank**), **community detection** (Louvain, label propagation, modularity), **triangle counting**, link prediction, similarity.
N: **PageRank**: a page is important if important pages link to it; uses a damping factor (≈ 0.85) and iterates until convergence.
N: Tools: **Spark GraphX**, Pregel model (Google — vertex-centric **Bulk Synchronous Parallel** supersteps), Apache Giraph, **Neo4j** (graph DB, Cypher query language).
N: Representations: adjacency matrix (dense), adjacency list (sparse), edge list.

Q: PageRank measures the importance of a web page based on:
* The number and importance of pages linking to it ~~ Links from important pages count more.
- The number of words on the page ~~ No.
- The page's loading speed ~~ No.
- The page's age ~~ No.
H: PageRank = votes weighted by voter importance.

Q: The typical damping factor used in PageRank is:
- 0.15 ~~ That's 1 − d (random jump probability).
* 0.85 ~~ The probability that the random surfer follows a link.
- 0.5 ~~ No.
- 1.0 ~~ No teleportation → problems with sinks.
H: d ≈ 0.85.

Q: Grouping nodes into densely connected sub-groups (e.g. friend circles) is called:
* Community detection ~~ e.g. Louvain (modularity), label propagation.
- Shortest path ~~ Routes.
- PageRank ~~ Importance.
- Triangle counting ~~ A building block.
H: Clusters in graphs = communities.

Q: Spark's library for graph-parallel computation is:
- MLlib ~~ Machine learning.
* GraphX ~~ Graphs + Pregel API.
- Spark SQL ~~ Structured data.
- Spark Streaming ~~ Streams.
H: Spark graphs → GraphX.

Q: Google's Pregel model for large-scale graph processing is based on:
* Vertex-centric computation in Bulk Synchronous Parallel (BSP) supersteps ~~ Vertices send messages each superstep.
- MapReduce only ~~ Pregel was designed to avoid MapReduce's limits for graphs.
- SQL joins ~~ No.
- Random sampling ~~ No.
H: Pregel = "think like a vertex" + BSP.

Q: Which graph database uses the Cypher query language?
* Neo4j ~~ Property-graph database.
- MySQL ~~ Relational.
- HBase ~~ Wide-column.
- Redis ~~ Key-value.
H: Neo4j + Cypher.

Q: Finding all nodes reachable from each other in an undirected graph is the task of finding:
* Connected components ~~ e.g. via BFS/DFS or union-find.
- Shortest paths ~~ Distances.
- PageRank ~~ Importance.
- Cliques only ~~ Too strict.
H: Reachability groups = components.

Q: Counting triangles in a graph is useful for:
* Measuring clustering (how tightly knit neighbourhoods are) and detecting communities/spam ~~ Basis of the clustering coefficient.
- Sorting nodes alphabetically ~~ No.
- Compressing images ~~ No.
- Encrypting edges ~~ No.
H: Triangles → clustering coefficient.

Q: Fraud detection using graph analytics typically looks for:
* Unusual connection patterns, such as rings of accounts sharing devices or addresses ~~ Relationships reveal hidden networks.
- Only individual transaction amounts ~~ That's not graph-based.
- Font sizes ~~ No.
- Sorting order ~~ No.
H: Graphs expose hidden rings.

# sna | Social Network Metrics
N: **Degree centrality** = number of direct connections (normalised: degree / (n − 1)). High degree = popular/hub.
N: **Betweenness centrality** = how often a node lies on **shortest paths between other nodes** → brokers/bridges controlling information flow (the centre of a star has maximum betweenness).
N: **Closeness centrality** = 1 / (sum of shortest distances to all other nodes) (or (n − 1) / Σd) → how quickly a node can reach everyone.
N: **Eigenvector centrality** = connected to other well-connected nodes (PageRank is a variant).
N: **Network density** = actual edges / possible edges; undirected possible = n(n − 1)/2.
N: **Clustering coefficient** = fraction of a node's neighbour pairs that are connected (triangles) → "my friends are friends".
N: Other: **diameter** (longest shortest path), average path length, **homophily** (similar people connect), **bridges/structural holes**, reciprocity (directed), in-degree (popularity) vs out-degree (activity).

Q: Which centrality measure identifies nodes that act as bridges on the shortest paths between other nodes?
- Degree centrality ~~ Counts direct ties.
* Betweenness centrality ~~ Counts how often a node lies on shortest paths between others.
- Closeness centrality ~~ Measures nearness to all others.
- Eigenvector centrality ~~ Connections to influential nodes.
H: Broker / gatekeeper → betweenness.

Q: Degree centrality of a node measures:
* The number of direct connections it has ~~ Simple popularity measure.
- How often it lies on shortest paths ~~ Betweenness.
- Its distance to all others ~~ Closeness.
- The importance of its neighbours ~~ Eigenvector.
H: Degree = number of friends.

Q: In a network of 5 nodes, a node is connected to 3 others. Its normalised degree centrality is:
- 3 ~~ That's raw degree.
* 0.75 ~~ 3 / (5 − 1).
- 0.6 ~~ 3/5 — wrong denominator.
- 0.25 ~~ No.
H: Normalised degree = degree / (n − 1).

Q: An undirected network has 5 nodes and 4 edges. Its density is:
- 0.8 ~~ 4/5 is wrong.
* 0.4 ~~ 4 / (5 × 4 / 2) = 4/10.
- 0.2 ~~ No.
- 1.0 ~~ That's a complete graph.
H: Density = edges / [n(n − 1)/2].

Q: An undirected network with 10 nodes and 15 edges has density:
* 0.33 ~~ 15 / 45.
- 0.15 ~~ No.
- 1.5 ~~ Density ≤ 1.
- 0.5 ~~ No.
H: Possible edges = 10 × 9 / 2 = 45.

Q: Closeness centrality is highest for a node that:
* Has the smallest total shortest-path distance to all other nodes ~~ It can reach everyone quickly.
- Has the most direct connections ~~ That's degree.
- Lies on the most shortest paths ~~ That's betweenness.
- Has no connections ~~ Undefined/zero.
H: Close to everyone → closeness.

Q: Eigenvector centrality gives a high score to a node that:
* Is connected to other highly connected (important) nodes ~~ Quality of connections matters.
- Has the longest path ~~ No.
- Is isolated ~~ No.
- Has the most triangles only ~~ That's clustering.
H: Friends with influencers → eigenvector.

Q: In a star network, which node has the highest betweenness centrality?
* The central hub ~~ Every shortest path between two leaves passes through it.
- Any leaf ~~ Leaves have zero betweenness.
- All nodes are equal ~~ No.
- None ~~ The hub.
H: Star centre = maximum betweenness.

Q: The local clustering coefficient of a node measures:
* The fraction of pairs of its neighbours that are connected to each other ~~ "Are my friends friends?"
- The number of its neighbours ~~ Degree.
- Its distance to the farthest node ~~ Eccentricity.
- The total number of edges in the graph ~~ No.
H: Clustering coefficient = triangles / possible triangles.

Q: A node has 4 neighbours, and 3 pairs among those neighbours are connected. Its local clustering coefficient is:
- 0.75 ~~ Wrong denominator.
* 0.5 ~~ Possible pairs = 4 × 3 / 2 = 6; 3/6.
- 3 ~~ That's the count.
- 0.25 ~~ No.
H: C = links among neighbours / [k(k − 1)/2].

Q: The tendency of people to connect with others similar to themselves is called:
* Homophily ~~ "Birds of a feather flock together".
- Reciprocity ~~ Mutual ties in directed networks.
- Density ~~ Overall connectedness.
- Betweenness ~~ Centrality.
H: Similar → connect = homophily.

Q: The diameter of a network is:
* The longest shortest path between any pair of nodes ~~ Maximum eccentricity.
- The number of nodes ~~ No.
- The average degree ~~ No.
- The number of communities ~~ No.
H: Diameter = longest shortest path.

Q: In a directed social network (e.g. Twitter followers), a high in-degree indicates:
* Popularity — many others point to (follow) the node ~~ Prestige.
- High activity in following others ~~ That's out-degree.
- A bridge position ~~ Betweenness.
- An isolated node ~~ No.
H: In-degree = popularity; out-degree = activity.
