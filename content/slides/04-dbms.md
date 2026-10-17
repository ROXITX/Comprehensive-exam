@subject dbms

# basics
S: 🗄️ What is a DBMS?
> A **Database Management System** stores data in an organised way and lets many users read and update it safely (MySQL, Oracle, PostgreSQL).
> 💡 A library catalogue instead of a pile of books.
S: Schema vs state
> - **Schema** = the design/structure (changes rarely).
> - **State / instance** = the actual data right now (a snapshot at 4 pm).
> - **Catalog / data dictionary** = stores **metadata** ("data about data").
S: Three levels & data independence
> Internal (storage) → Conceptual (tables) → External (what each user sees — a **view**).
> - **Physical independence**: change storage without touching the tables.
> - **Logical independence**: change tables without breaking apps (harder).
S: Users & architecture
> - **Naive users**: use ready-made screens (ATM, bank clerk).
> - **Casual users**: occasional queries.
> - **Sophisticated users**: experts writing complex queries.
> The **pre-compiler** pulls SQL out of C/Java programs. Architectures: 1-tier (standalone), 2-tier, 3-tier (web apps).

# er
S: 🧩 The ER model — drawing the database
> - **Entity** (rectangle): a thing — Student, Course
> - **Attribute** (oval): a property — name, age
> - **Relationship** (diamond): an action linking entities — "registers"
S: Kinds of attributes
> - **Composite**: has parts (address → street, city, zip)
> - **Multivalued** (double oval): many values (phone numbers)
> - **Derived** (dashed oval): calculated (age from date of birth)
> - **Key** (underlined): unique (ProjectId)
S: Cardinality & weak entities
> - 1:1, 1:N, **M:N** (students ↔ courses)
> - **Weak entity** (double rectangle): can't be identified on its own; depends on an **owner** through an identifying relationship (total participation + existence dependency).
S: Specialization & generalization
> - **Specialization** (top-down): MovieZone → Hollywood, Bollywood
> - **Generalization** (bottom-up): SENSE, SELECT, SCOPE → DEPARTMENTS
> Subclasses **inherit all** attributes of the superclass.

# relational
S: 📋 Tables, rows, columns
> Relation = **table**, tuple = **row**, attribute = **column**.
> **Degree** = number of columns; **cardinality** = number of rows.
S: Keys
> - **Super key**: any set of columns that identifies a row
> - **Candidate key**: a **minimal** super key
> - **Primary key**: the chosen candidate key
> - **Foreign key**: points to another table's primary key
> With n attributes and a 1-attribute key → **2ⁿ⁻¹** super keys (8 attributes → 128).
S: Integrity rules
> - **Entity integrity**: primary key can't be NULL
> - **Referential integrity**: a foreign key must match an existing key (or be NULL)

# ra
S: 🔣 Relational algebra
> The maths behind SQL.
> - **σ (select)** picks **rows**: σ country='India'(store)
> - **π (project)** picks **columns**: π city(store) = SELECT city FROM store
S: Combining tables
> - **∪, −, ∩**: need tables with the same columns
> - **× (Cartesian product)**: columns add, rows multiply
> - **⋈ (join)**: match rows on common columns
> - **÷ (division)**: "for ALL" questions (students who took every course)

# sql
S: 💬 SQL command families
> - **DDL** (structure): CREATE, ALTER, DROP, TRUNCATE
> - **DML** (data): SELECT, INSERT, UPDATE, DELETE
> - **DCL** (permissions): GRANT, REVOKE
> - **TCL** (transactions): COMMIT, ROLLBACK, SAVEPOINT
S: Everyday queries
> - `SELECT DISTINCT city FROM t` → no duplicates
> - `SELECT * …` → all columns
> - `UPDATE People SET LastName='Singh' WHERE LastName='Mishra'`
> - `WHERE name LIKE 'A%'`; `WHERE x IS NULL`
S: Grouping
> - **WHERE** filters rows (before grouping)
> - **GROUP BY** makes groups
> - **HAVING** filters groups (after grouping)
> Departments where the average salary of male employees beats the company average: WHERE sex='M' GROUP BY dept HAVING AVG(salary) > (subquery).

# fd
S: ➡️ Functional dependency
> **X → Y**: if two rows have the same X, they must have the same Y.
> Example: RollNo → Name.
S: Closure — what can X decide?
> Start with X, keep adding anything an FD lets you reach.
> If X⁺ contains every attribute → X is a **super key**.
> Example: AB → C, C → DE, E → F gives AB⁺ = ABCDEF.
S: Finding candidate keys
> Attributes that **never appear on the right side** must be in every key. Then grow the set until its closure covers everything, and keep only minimal sets.
> AB→CD, D→B, C→A → keys AB, AD, BC, CD (**4**).
S: Lossless decomposition
> Splitting R into R1 and R2 is **lossless** if the common columns are a **key of one side**.

# normal
S: 🧼 Normalisation — removing repetition
> Goal: less duplicate data and fewer **update/insert/delete anomalies**.
S: The normal forms
> - **1NF**: every cell holds one value (atomic)
> - **2NF**: no non-key column depends on **part** of a key
> - **3NF**: no non-key column depends on another non-key column (transitive)
> - **BCNF**: for every FD X → A, **X is a super key**
> BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF.
S: Exam favourites
> - Any table with **2 attributes** is in BCNF.
> - **3NF**: lossless + dependency-preserving decomposition always possible.
> - **BCNF**: lossless always possible, but may **lose dependencies**.
> - D → B where B is part of a key → 3NF but not BCNF.

# index
S: 📑 Indexes = book index
> An index helps find rows fast without scanning the whole table. Faster reads, but slower inserts/updates.
> - **Dense**: an entry for every value; **sparse**: only some.
> - **Clustered**: data stored in the same order as the index.
S: B-tree & B+ tree
> Balanced trees designed for disks.
> - Order m: up to **m − 1 keys**, at least ⌈m/2⌉ − 1 (order 4 → 1 to 3 keys).
> - **B+ tree**: data pointers only in **leaves**, and leaves are **linked** → great for **range queries**. All leaves are at the same depth.
S: Hash vs B+ tree index
> - **Hash**: super fast for **equality** (id = 5), useless for ranges.
> - **B+ tree**: equality **and** ranges (BETWEEN, <, ORDER BY).

# txn
S: 💳 Transactions & ACID
> A transaction = a group of operations treated as one unit (e.g. a bank transfer).
> - **Atomicity**: all or nothing
> - **Consistency**: valid → valid
> - **Isolation**: transactions don't interfere
> - **Durability**: once committed, it survives any crash
S: Schedules & conflicts
> Two operations **conflict** if they come from different transactions, touch the same item, and at least one is a **write**.
> **Conflict serializable** = the precedence graph has **no cycle**.
S: Recoverability
> Reading uncommitted data (**dirty read**) is dangerous.
> **Recoverable**: if T2 reads from T1, T1 must commit first. A cascadeless schedule reads only committed data.

# cc
S: 🔐 Concurrency control
> Lets many transactions run at once while keeping results correct.
> **Two-phase locking (2PL)**: growing phase (only take locks), then shrinking phase (only release) → **serializable**, but deadlocks are still possible.
> **Strict 2PL**: hold write locks until commit → also recoverable.
S: Timestamps
> Older transactions get priority; out-of-order operations are rolled back.
> **Thomas' write rule** ignores outdated writes → allows some view-serializable schedules.
S: Isolation levels (weak → strong)
> - Read uncommitted (dirty reads OK)
> - Read committed (no dirty reads)
> - **Repeatable read** (no dirty or non-repeatable reads, but phantoms are possible)
> - Serializable (nothing)
> **Row-level** locks give the most concurrency.

# recovery
S: 🩹 Recovering from failures
> - Transaction failure → **rollback (undo)**.
> - Crash → **redo** committed work, **undo** unfinished work, using the **log**.
> - **Write-ahead logging**: write the log before the data.
S: Recovery methods
> - **Deferred update**: write to the DB only after commit → redo only
> - **Immediate update**: may write early → undo + redo
> - **Checkpoints**: less log to scan
> - **Shadow paging**: keep an old copy of the page table
> ❌ Two-phase **commit** is not a recovery technique.

# nosql
S: 🍃 NoSQL
> Databases without fixed tables, built for huge, flexible (often **unstructured**) data and easy scaling. **No predefined schema** needed.
S: Four types
> - **Key-value**: Redis
> - **Document**: MongoDB
> - **Wide-column**: Cassandra, HBase
> - **Graph**: Neo4j
> **CAP theorem**: you can only fully have two of Consistency, Availability, Partition tolerance.
