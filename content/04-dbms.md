@subject dbms | Database Management Systems | 🗄️
@order 4
@desc Schema, catalog, users, ER model, relational algebra, SQL, FDs, normalization, indexing, transactions, concurrency, recovery

# basics | DBMS Concepts, Schema, Catalog & Users
N: **Schema** = description/structure of the database (changes rarely, defined at design time). **Database state (instance/snapshot)** = the data stored at a particular moment.
N: **Catalog / data dictionary** stores **metadata** (data about data: table definitions, types, constraints, users). Self-describing nature of a DBMS.
N: **Three-schema architecture**: internal (physical) level, conceptual (logical) level, external (view) level. A user sees an **external view** (e.g. a net-banking screen).
N: **Logical data independence**: change the conceptual schema without changing external schemas/apps. **Physical data independence**: change the internal schema (storage, indexes) without changing the conceptual schema. Logical is **harder** to achieve.
N: **Pre-compiler** extracts embedded DML (SQL) statements from a host-language program (e.g. C) and sends them to the DML compiler.
N: **DBMS users**: **Naive (parametric) end users** use canned transactions/forms (bank clerk, ATM users). **Casual users** occasionally query using a query language. **Sophisticated users** (engineers, analysts) write complex queries using tools. **Standalone users** use ready-made packages. Plus the **DBA**, database designers and application programmers.
N: **Architectures**: single-tier (standalone, everything on one machine), two-tier (client ↔ DB server), three-tier (client ↔ application server ↔ DB server — web apps).
N: Database types: **textual/document databases** (research documents), multimedia, GIS, data warehouses (analytics).

Q: A bank operation accommodates several operations in a day. A snapshot taken at 4 p.m to know the transactions currently happening is referred to as------------
- Database Schema ~~ The schema is the structure, which doesn't change hour to hour.
* Database state ~~ The data at a particular moment = state/instance/snapshot.
- Abstraction ~~ A concept, not data at a moment.
- Catalogue ~~ Stores metadata.
H: Snapshot at a time = state (instance).
P: PYQ

Q: The overall design (structure) of a database, which changes rarely, is called the:
* Schema ~~ Defined during design; the "intension".
- Instance ~~ That's the data at a moment.
- State ~~ Same as instance.
- Tuple ~~ One row.
H: Schema = blueprint. Instance = current contents.

Q: In a Bank scenario, the window visible to a customer while doing transactions via net banking is referred to as -----
- The database state ~~ The data at a moment.
- The Schema ~~ The overall design.
* The View ~~ An external view tailored to that user.
- Data dictionary ~~ Metadata store.
H: What a user sees = view (external level).
P: PYQ

Q: The DBMS component that stores metadata such as table definitions, data types and constraints is the:
- Buffer manager ~~ Manages memory pages.
* System catalog (data dictionary) ~~ Holds "data about data".
- Query optimizer ~~ Chooses execution plans.
- Log file ~~ For recovery.
H: Catalog = metadata.

Q: Metadata means:
* Data about data ~~ e.g. column names, types, constraints.
- Very large data ~~ That's big data.
- Deleted data ~~ No.
- Encrypted data ~~ No.
H: Meta = about.

Q: The ability to change the physical storage structure without changing the conceptual schema is:
- Logical data independence ~~ That's about the conceptual level.
* Physical data independence ~~ e.g. adding an index or changing the file organisation.
- Data integrity ~~ Correctness constraints.
- Data redundancy ~~ Duplication.
H: Physical independence = storage changes are hidden.

Q: Logical data independence is the ability to:
* Change the conceptual schema without changing external schemas or application programs ~~ e.g. adding a new column.
- Change storage devices without affecting the schema ~~ That's physical.
- Change the DBMS vendor ~~ Not this.
- Remove all redundancy ~~ Normalisation.
H: Logical independence is harder than physical.

Q: Which data independence is harder to achieve?
- Physical ~~ Easier — apps never see storage.
* Logical ~~ Applications depend heavily on the logical structure.
- Both equally ~~ Logical is harder.
- Neither exists ~~ Both exist.
H: Logical = harder.

Q: In embedded SQL, the module that extracts DML statements from the host-language program is the:
* Pre-compiler ~~ Sends the SQL to the DML compiler and the rest to the host compiler.
- Interpreter ~~ Not this.
- Linker ~~ Not this.
- Query optimizer ~~ Runs later.
H: Pre-compiler = separates embedded SQL.

Q: Bank tellers who repeatedly use pre-written (canned) transactions are which type of user?
* Naive (parametric) end users ~~ They use fixed menus/forms.
- Sophisticated users ~~ They write complex queries.
- Casual users ~~ They write occasional ad-hoc queries.
- DBA ~~ Administers the database.
H: Naive = canned transactions.

Q: A manager who occasionally writes ad-hoc queries in a query language to get different information each time is a:
- Naive user ~~ Uses canned transactions.
* Casual end user ~~ Occasional access with a query language.
- Sophisticated user ~~ Writes complex applications.
- Application programmer ~~ Writes programs.
H: Casual = occasional, ad-hoc.

Q: Engineers and scientists who thoroughly know the DBMS and write complex queries/analysis are:
- Naive users ~~ No.
- Casual users ~~ No.
* Sophisticated users ~~ They use the DBMS's full power.
- Parametric users ~~ Same as naive.
H: Sophisticated = experts.

Q: Suppose you are assigned to do a standalone database application, what type of DBMS architecture is required?
* Single tier architecture ~~ DB and app on one machine.
- Two tier ~~ Client-server.
- Three tier ~~ Client, app server, DB server.
- None of the mentioned ~~ Single tier fits.
H: Standalone = 1-tier.
P: PYQ

Q: A typical web application (browser → application server → database server) uses:
- Single-tier architecture ~~ No.
- Two-tier architecture ~~ No app server there.
* Three-tier architecture ~~ The middle tier holds business logic.
- Peer-to-peer ~~ No.
H: Web apps = 3-tier.

Q: Identify the type of database system required to store a research document.
- Multimedia Database ~~ Images, audio, video.
- Geographical Information System ~~ Maps and spatial data.
- Data Warehouse ~~ Analytical data.
* Textual Database ~~ Designed for documents and text.
H: Documents → textual DB.
P: PYQ

Q: Which of the following is a possible schema construct in a supermarket mini world?
- Products ~~ One construct.
- inventory ~~ One construct.
- sales ~~ One construct.
* All the options ~~ All are valid tables/entities.
H: Mini world → many schema constructs.
P: PYQ

# er | Entity–Relationship Model
N: **Entity** (rectangle), **attribute** (oval), **relationship** (diamond). "Student registers Course" → "registers" goes **inside a diamond** between the two rectangles.
N: Attribute types: **Simple/atomic**, **Composite** (address → door no, street, city, zip; phone → country code + number), **Multivalued** (double oval — phone numbers), **Derived** (dashed oval — age from DOB, experience from date of joining), **Key** (underlined).
N: **Weak entity** (double rectangle): has no key of its own, depends on an **identifying owner** through an **identifying relationship** (double diamond), with **total participation** and **existence dependency**. Identified by a partial key + the owner's key.
N: **Cardinality ratios**: 1:1, 1:N, M:N. "Student registers for many courses" (and courses have many students) → **M:N**.
N: **Participation**: total (double line, every entity must participate) or partial.
N: **Role** = the function an entity plays in a relationship (Instructor "teaches"). **Recursive relationship**: the same entity set appears twice (Employee supervises Employee).
N: **Specialization** (top-down): divide an entity into subclasses (MovieZone → Hollywood, Bollywood). **Generalization** (bottom-up): combine common entities into a superclass (SENSE, SELECT, SCOPE → DEPARTMENTS). Subclasses **inherit** all superclass attributes.
N: A **relationship set** is the verb ("Customer **buys** Products" → Buys). Attributes like ProductName are not entity sets.

Q: While drawing the ER diagram for a relation “student registers a course”, “registers” should be mentioned _________ 2 rectangles.
* inside a diamond between ~~ Relationships are diamonds connecting entity rectangles.
- over the line connecting ~~ Not the ER notation.
- inside an oval between ~~ Ovals are attributes.
- inside a rectangle between ~~ Rectangles are entities.
H: Rectangle = entity, oval = attribute, diamond = relationship.
P: PYQ

Q: In an ER diagram, a multivalued attribute is shown as a:
- Dashed oval ~~ That's derived.
* Double oval ~~ e.g. phone numbers.
- Double rectangle ~~ That's a weak entity.
- Double diamond ~~ Identifying relationship.
H: Double oval = many values.

Q: In an ER diagram, a weak entity set is represented by a:
* Double rectangle ~~ Its identifying relationship is a double diamond.
- Dashed rectangle ~~ Not standard.
- Double oval ~~ Multivalued attribute.
- Diamond ~~ Relationship.
H: Weak = double rectangle.

Q: A database designed to store global information contains a field “contact number”. If contact number is to be saved in multiple parts like country code and the actual number, what kind of attribute should be used?
- Atomic attribute ~~ Can't be divided.
* Composite attribute ~~ Made of sub-parts (country code + number).
- Multi-valued attribute ~~ That's several numbers per person.
- Derived attribute ~~ Computed from other attributes.
H: Split into parts → composite.
P: PYQ

Q: The attribute Address could be structured as door no, street_name, City and Zipcode. This type of attribute is called ---------
- Simple attribute ~~ Can't be subdivided.
- Multivalued attribute ~~ That's many addresses.
* Composite attribute ~~ Made of component attributes.
- Derived attribute ~~ Not computed.
H: Address = composite.
P: PYQ

Q: Which of the following can be a multivalued attribute?
* Phone_number ~~ A person may have several phone numbers.
- Name ~~ One name (possibly composite).
- Date_of_birth ~~ Single value.
- All the options ~~ Only phone number.
H: Many values per entity → multivalued.
P: PYQ

Q: The attribute experience is calculated from the attribute dateOfJoining. What is the type of the attribute?
* Derived attribute ~~ Computed from a stored attribute.
- Descriptive attribute ~~ Attribute of a relationship.
- Simple attribute ~~ Not computed.
- Multivalued attribute ~~ One value.
H: Computed → derived (dashed oval).
P: PYQ

Q: Age, when the database stores Date_of_Birth, is a:
- Composite attribute ~~ Not made of parts.
- Multivalued attribute ~~ One value.
* Derived attribute ~~ Calculated from DOB and today's date.
- Key attribute ~~ Not unique.
H: Age from DOB → derived.

Q: Identify the simple attribute.
* name ~~ The bank treats name as simple (atomic).
- grade ~~ The bank key is name.
- Color ~~ The bank key is name.
- VehicleRegistrationNumber ~~ Can be split into state/district/number (composite).
H: Bank key: name.
F: Name is often modelled as composite (first and last name), and grade and colour are also simple. The bank key is "name".
P: PYQ

Q: Identify the key attribute of the entity PROJECT( ProjectId, Projectname, ProjLocation)
- ProjectId, ProjectName ~~ Not minimal.
- ProjectName ~~ Names can repeat.
- ProjLocation ~~ Many projects can share a location.
* ProjectId ~~ Unique identifier.
H: Id → key.
P: PYQ

Q: An entity set SHIPPING has the attributes (shippingId, ShipLocations). Which of the following is true?
- ShippingId is the primary key ~~ Bank expects the composite key.
- ShipLocations is the primary key ~~ Not unique.
* ShippingId, ShipLocations is a composite key ~~ The bank's answer: ShipLocations is multivalued, so each (shippingId, location) row is identified by both.
- None of the options ~~ Bank key is the composite key.
H: Multivalued attribute in a table → key = (id, value).
P: PYQ

Q: What kind of a relation is “a student registers for more than one course for a semester”?
- one-to-many ~~ Courses also have many students.
* many-to-many ~~ Many students ↔ many courses.
- one-to-one ~~ No.
- None ~~ M:N is correct.
H: Student–Course = M:N.
P: PYQ

Q: If an athlete can participate in a maximum of 3 activities, what is cardinality ratio of ATHLETE:ACTIVITY in PARTICIPATE?
- 1:n ~~ The limit is specifically 3.
- 2:1 ~~ No.
* 1:3 ~~ One athlete to at most 3 activities.
- n:1 ~~ Reversed.
H: Max 3 per athlete → 1:3.
P: PYQ

Q: Each department has exactly one manager and each manager manages exactly one department. The relationship is:
* 1:1 ~~ One on each side.
- 1:N ~~ No.
- M:N ~~ No.
- N:1 ~~ No.
H: Exactly one each → 1:1.

Q: One department has many employees, but each employee works in one department. DEPARTMENT:EMPLOYEE is:
- 1:1 ~~ Many employees.
* 1:N ~~ One department, many employees.
- M:N ~~ Employees have one department.
- N:1 ~~ Reversed.
H: Dept–Emp = 1:N.

Q: An entity set DOCTOR has a total participation on the relationship DIAGNOSES that connects it to the entity set PATIENTS. What would be the cardinality constraint on the relationship?
- 1:1 ~~ Doctors diagnose many patients.
* M:N ~~ A doctor diagnoses many patients; a patient may be diagnosed by many doctors.
- 1:N ~~ Patients can have many doctors.
- N:1 ~~ No.
H: Doctor–Patient diagnoses = M:N.
P: PYQ

Q: The function that an entity Instructor plays in a relationship teaches refers to the -------
- Participation ~~ Total/partial involvement.
* Role ~~ The part the entity plays in the relationship.
- Instance ~~ One occurrence.
- Position ~~ Not the ER term.
H: Function in a relationship = role.
P: PYQ

Q: “Customer buys Products”. Identify the relationship set.
- Customer ~~ Entity.
- Products ~~ Entity.
* Buys ~~ The verb is the relationship.
- Customer and Products ~~ Entities.
H: Verb = relationship, nouns = entities.
P: PYQ

Q: Which of the following is not an entity set in a SHOPPING mini world?
- Customers ~~ Entity set.
- Stock ~~ Entity set.
- Products ~~ Entity set.
* ProductName ~~ An attribute of Product, not an entity set.
H: Names/values are attributes.
P: PYQ

Q: Identify the possible entity sets of a Cafeteria Data base.
- Customers, menu manager, meal Delivery ~~ Incomplete.
* Customers, menuManager, itemsProcurement, mealDelivery, billGeneration ~~ The most complete set.
- Customers, menu manager, Bill generation ~~ Incomplete.
- FoodMenu ~~ Just one.
H: Pick the most complete list.
P: PYQ

Q: In a share market application, an entity set INVESTOR can buy or sell SHARES. This refers to --------
- Relationship ~~ Too general for the bank.
- Role definition ~~ Not this.
* Recursive relationship ~~ The bank's answer: investors trade with other investors (the same entity set in two roles, buyer and seller).
- Participation ~~ Not this.
H: Same entity in two roles (buyer/seller) → recursive.
P: PYQ

Q: An EMPLOYEE supervises other EMPLOYEEs. This is an example of a:
* Recursive (unary) relationship ~~ The same entity set plays supervisor and supervisee roles.
- Ternary relationship ~~ Three entity sets.
- Weak relationship ~~ Not a term.
- Generalization ~~ Not this.
H: Same entity on both sides → recursive.

Q: SLOT is a weak entity of the University schema. Which of the statements is not true?
- It requires an identifying relationship TAKES ~~ True for weak entities.
- It has an identifying owner entity TIMETABLE ~~ True.
- It should have total participation with respect to TAKES ~~ True.
* There is no existence dependency of the entity SLOT with respect to the entity TIMETABLE ~~ False — a weak entity is existence-dependent on its owner.
H: Weak entity ⇒ owner + identifying relationship + total participation + existence dependency.
P: PYQ

Q: A weak entity set is identified by:
- Its own primary key ~~ It has none.
* Its partial key (discriminator) together with the owner entity's primary key ~~ e.g. (LoanNo, PaymentNo).
- Any attribute ~~ No.
- A foreign key only ~~ Needs the discriminator too.
H: Weak key = owner key + partial key.

Q: ORDERS has attributes (orderId, items, price). SHIPPING is a specialized version of ORDERS. Which is the attribute set of SHIPPING?
- (OrderId, items, price) ~~ Missing its own attributes.
- (Orderid, Shippingid) ~~ Missing inherited attributes.
* (OrderId, items, price, ShippingId, FromLocation, ToLocation) ~~ Subclass = all inherited + its own attributes.
- (OrderId, Items, ShippingId, FromLocation, ToLocation) ~~ Missing price.
H: Subclass inherits EVERYTHING + adds its own.
P: PYQ

Q: The entity set MovieZone is classified as Hollywood and Bollywood. This process is called ------
- Generalization ~~ That's bottom-up.
* Specialization ~~ Top-down: one entity → subclasses.
- Inheritance ~~ A consequence, not the process.
- Constraint generalization ~~ Not a term.
H: Splitting down = specialization.
P: PYQ

Q: SENSE, SELECT, SCOPE are the entity sets with common characteristics. Which process can define an entity set called DEPARTMENTS?
- Specialization ~~ Top-down.
* Generalization ~~ Bottom-up: common entities → superclass.
- Top down approach ~~ That's specialization.
- Inheritance ~~ A consequence.
H: Combining up = generalization.
P: PYQ

Q: If an attribute is added to the superclass entity, the condition for propagating this change in subclass entity is
- Attribute defined membership ~~ Only part.
- Predicate defined membership ~~ Only part.
* Both Attribute defined and Predicate defined membership ~~ Subclasses inherit superclass attributes under both membership types.
- Overlapping participation ~~ Not this.
H: Inheritance applies to all subclasses.
P: PYQ

# relational | Relational Model, Keys & Constraints
N: **Relation** = table; **tuple** = row; **attribute** = column; **domain** = set of allowed values; **degree** = number of attributes; **cardinality** = number of tuples.
N: **Super key**: any set of attributes that uniquely identifies tuples. **Candidate key**: minimal super key. **Primary key**: the chosen candidate key. **Alternate keys**: the other candidate keys. **Foreign key**: refers to the primary key of another relation.
N: Number of super keys of R with n attributes and a single-attribute key: **2^(n−1)**. With 8 attributes → 2⁷ = 128.
N: **Constraints**: **Domain**, **Key** (uniqueness), **Entity integrity** (primary key can't be NULL), **Referential integrity** (a foreign key must match an existing primary key or be NULL).
N: **Prime attribute** = part of some candidate key. **Non-prime** = not part of any candidate key.

Q: The maximum number of superkeys for the relation schema R(A, B, C, D, E, F, G, H) with H as the key is
- 64 ~~ That's 2⁶.
* 128 ~~ H plus any subset of the other 7 attributes: 2⁷ = 128.
- 7 ~~ Too few.
- 256 ~~ That's 2⁸ (includes sets without H).
H: Super keys with one key attribute = 2^(n−1).
P: PYQ

Q: R(A, B, C, D) has only A as a candidate key. How many super keys does R have?
- 4 ~~ Too few.
* 8 ~~ A plus any subset of {B, C, D}: 2³ = 8.
- 16 ~~ Includes sets without A.
- 15 ~~ That's non-empty subsets.
H: 2^(n−1).

Q: For a relation R(A,B,C,D,E,F,G), the candidate keys are AB, AC, and DE. Which of the following is not a proper subset of the candidate key?
- BC ~~ Not a subset of any key either — the question is ambiguous.
* DE ~~ DE is a full candidate key, so it is not a PROPER subset of one.
- C ~~ C is a proper subset of AC.
- AD ~~ Also not a subset of any key.
H: A candidate key is never a proper subset of itself.
F: This question is flawed: BC and AD are not proper subsets of any candidate key either. The bank key is DE, because it is itself a whole candidate key.
P: PYQ

Q: A minimal super key is called a:
* Candidate key ~~ No proper subset is a super key.
- Foreign key ~~ References another table.
- Composite key ~~ Just multi-attribute.
- Alternate key ~~ A candidate key not chosen as primary.
H: Candidate = minimal super key.

Q: Which constraint states that a primary key value cannot be NULL?
- Referential integrity ~~ About foreign keys.
* Entity integrity ~~ Every tuple must be identifiable.
- Domain constraint ~~ About allowed values.
- Key constraint ~~ About uniqueness.
H: Entity integrity: PK ≠ NULL.

Q: A foreign key value must either be NULL or match an existing primary key value in the referenced table. This is:
- Entity integrity ~~ About PK nulls.
* Referential integrity ~~ Keeps references valid.
- Domain constraint ~~ About value types.
- Semantic constraint ~~ Business rule.
H: FK → referential integrity.

Q: The number of attributes in a relation is called its:
* Degree ~~ Columns = degree (arity).
- Cardinality ~~ That's the number of rows.
- Domain ~~ Allowed values.
- Schema ~~ The definition.
H: Degree = columns, cardinality = rows.

# ra | Relational Algebra
N: **σ (select/sigma)** picks **rows** satisfying a condition: σ country='India' (store). **π (project/pi)** picks **columns**: π city (store) ≈ SELECT city FROM store (but π removes duplicates).
N: **∪, −, ∩** need **union-compatible** relations (same degree and domains). **×** Cartesian product: degree adds, cardinality multiplies.
N: **⋈ natural join** = × + equality on common attributes + remove the duplicate columns. **θ-join** uses any condition. Outer joins keep unmatched tuples.
N: **÷ division** answers "for all" queries (students who took ALL courses).
N: **ρ (rename)**. Fundamental operations: σ, π, ∪, −, ×, ρ (∩ and ⋈ can be derived).

Q: What is the relational algebra expression corresponding to the SQL query “SELECT city FROM store”?
- σcity(store) ~~ σ filters rows, it doesn't pick columns.
* πcity(store) ~~ Projection picks the city column.
- σstore(city) ~~ Wrong operator and arguments.
- πstore(city) ~~ Arguments reversed.
H: SELECT columns → π. WHERE condition → σ.
P: PYQ

Q: Which of the following expressions is used to fetch the details of all stores located in India?
* σcountry=’India’(store) ~~ Selection keeps rows that satisfy the condition (all columns).
- πcountry=’India’(store) ~~ π takes attribute names, not conditions.
- σstore(country=’India’) ~~ Arguments reversed.
- πstore(country=’India’) ~~ Wrong operator.
H: Row filter = σ (sigma).
P: PYQ

Q: The SQL query SELECT name FROM emp WHERE salary > 5000 is equivalent to:
* π name (σ salary>5000 (emp)) ~~ Filter rows first, then project the column.
- σ name (π salary>5000 (emp)) ~~ Operators swapped.
- π salary>5000 (σ name (emp)) ~~ Operators swapped.
- σ salary>5000 (emp) ~~ Missing the projection.
H: WHERE → σ inside, SELECT list → π outside.

Q: Relation R has 3 attributes and 10 tuples; S has 4 attributes and 5 tuples. R × S has:
- 7 attributes, 15 tuples ~~ Tuples multiply.
* 7 attributes, 50 tuples ~~ Degrees add, cardinalities multiply.
- 12 attributes, 50 tuples ~~ Degrees add, not multiply.
- 7 attributes, 10 tuples ~~ No.
H: × : degree +, cardinality ×.

Q: Which relational algebra operation requires union-compatible relations?
- Cartesian product ~~ Works on any relations.
* Set difference ~~ Like ∪ and ∩, it needs the same schema.
- Selection ~~ One relation.
- Projection ~~ One relation.
H: ∪, ∩, − need union compatibility.

Q: "Find students who have enrolled in ALL courses" is best expressed using:
- Union ~~ No.
- Selection ~~ No.
* Division ~~ ÷ answers "for all" queries.
- Projection ~~ Not alone.
H: "ALL" → division.

Q: The natural join of R(A, B) and S(B, C) produces a relation with attributes:
- A, B, B, C ~~ The common attribute appears once.
* A, B, C ~~ Join on B, keep B once.
- A, C ~~ B is kept.
- B only ~~ No.
H: Natural join removes the duplicate common column.

Q: Which is NOT a fundamental relational algebra operation?
- Select ~~ Fundamental.
- Project ~~ Fundamental.
* Natural join ~~ Derived from × and σ (and π).
- Set difference ~~ Fundamental.
H: Fundamental: σ, π, ∪, −, ×, ρ.

# sql | SQL: DDL, DML, DCL, TCL & Queries
N: **DDL** (structure): CREATE, ALTER, DROP, TRUNCATE, RENAME. **DML** (data): SELECT, INSERT, UPDATE, DELETE. **DCL** (permissions): GRANT, REVOKE. **TCL** (transactions): COMMIT, ROLLBACK, SAVEPOINT.
N: `SELECT DISTINCT col` removes duplicate values. `SELECT *` returns all columns. `UPDATE t SET col = 'new' WHERE col = 'old'` changes values.
N: **WHERE** filters rows before grouping; **HAVING** filters groups after **GROUP BY**. Aggregates: COUNT, SUM, AVG, MIN, MAX.
N: **DELETE** removes rows (can have WHERE, can be rolled back, DML). **TRUNCATE** removes all rows fast (DDL). **DROP** removes the whole table.
N: Pattern matching: `LIKE 'A%'` (% = any string, _ = one character). NULL checks use `IS NULL`, never `= NULL`.
N: Joins: INNER, LEFT/RIGHT/FULL OUTER. Subqueries can be used in WHERE/HAVING (e.g. avg salary greater than the company average).

Q: SELECT ________ destination FROM flight; Fill the blank to display each value of the column “destination” only once.
- DIFFERENT ~~ Not an SQL keyword.
* DISTINCT ~~ Removes duplicate rows from the result.
- ALL ~~ Keeps duplicates (the default).
- UNIQUE ~~ A constraint, not a SELECT keyword (standard SQL).
H: No repeats → DISTINCT.
P: PYQ

Q: SELECT * FROM player WHERE num_of_matches>100 AND country=’India’; What fields will be outputted by the above SQL query?
- player ~~ That's the table name.
- num_of_matches ~~ Only one column.
- num_of_matches, country ~~ Only the filtered columns.
* All fields of player relation ~~ * means every column.
H: * = all columns. WHERE only filters rows.
P: PYQ

Q: Which of the following SQL queries can be used to change “Mishra” to “Singh” in the “LastName” column in the People relation?
- UPDATE People SET LastName=’Mishra’ INTO LastName=’Singh’ ~~ Invalid syntax.
* UPDATE People SET LastName=’Singh’ WHERE LastName=’Mishra’ ~~ UPDATE … SET new value … WHERE old condition.
- MODIFY People SET LastName=’Mishra’ INTO LastName=’Singh’ ~~ MODIFY isn't the DML command.
- MODIFY People SET LastName=’Singh’ WHERE LastName=’Mishra’ ~~ MODIFY isn't the DML command.
H: UPDATE table SET col = new WHERE col = old.
P: PYQ

Q: Consider Emp(Empcode, Name, Sex, Salary, Deptt) and the query: SELECT Deptt FROM Emp WHERE sex = 'M' GROUP BY Deptt HAVING avg(Salary) > (SELECT avg(Salary) FROM Emp). The output will be the departments where:
* Average salary of male employees is more than the average salary of the organization ~~ WHERE keeps males, GROUP BY department, HAVING compares with the overall average.
- Average salary of male employees is equal to the average salary of the organization ~~ The condition is >.
- Average salary of male employees is the average salary of the organization ~~ No.
- Average salary of male employees is less than the average salary of the organization ~~ The condition is >.
H: WHERE → rows, GROUP BY → groups, HAVING → filter groups.
P: PYQ

Q: Which clause filters groups created by GROUP BY?
- WHERE ~~ Filters rows before grouping.
* HAVING ~~ Filters after aggregation.
- ORDER BY ~~ Sorts.
- DISTINCT ~~ Removes duplicates.
H: WHERE = rows, HAVING = groups.

Q: CREATE, ALTER and DROP are which type of SQL commands?
* DDL (Data Definition Language) ~~ They define or change structure.
- DML ~~ Manipulates data.
- DCL ~~ Permissions.
- TCL ~~ Transactions.
H: DDL = structure.

Q: INSERT, UPDATE and DELETE belong to:
- DDL ~~ Structure.
* DML (Data Manipulation Language) ~~ They change the data.
- DCL ~~ Permissions.
- TCL ~~ Transactions.
H: DML = data.

Q: GRANT and REVOKE are:
- DDL commands ~~ No.
- DML commands ~~ No.
* DCL (Data Control Language) commands ~~ They control access rights.
- TCL commands ~~ No.
H: DCL = permissions.

Q: COMMIT, ROLLBACK and SAVEPOINT are:
- DDL ~~ No.
- DML ~~ No.
- DCL ~~ No.
* TCL (Transaction Control Language) ~~ They manage transactions.
H: TCL = transactions.

Q: Which command removes all rows of a table quickly, keeps the structure, and is a DDL command?
- DELETE ~~ DML, row by row, can use WHERE.
* TRUNCATE ~~ Deallocates data pages; structure stays.
- DROP ~~ Removes the table itself.
- REMOVE ~~ Not SQL.
H: DELETE (DML) vs TRUNCATE (DDL) vs DROP (table gone).

Q: To find employees whose name starts with 'A', use:
* WHERE name LIKE 'A%' ~~ % matches any sequence of characters.
- WHERE name = 'A*' ~~ * is not an SQL wildcard.
- WHERE name LIKE '_A' ~~ That means the second character is A.
- WHERE name IN ('A') ~~ Exact match only.
H: % = many characters, _ = one.

Q: The correct way to check for missing values in SQL is:
- WHERE col = NULL ~~ Comparisons with NULL are never true.
* WHERE col IS NULL ~~ NULL needs IS / IS NOT.
- WHERE col == NULL ~~ Not SQL.
- WHERE col EMPTY ~~ Not SQL.
H: NULL → IS NULL.

Q: SELECT COUNT(*) FROM emp counts:
* All rows, including rows with NULLs ~~ * counts rows.
- Only non-NULL values of the first column ~~ That's COUNT(col).
- Distinct rows only ~~ That needs DISTINCT.
- Columns ~~ No.
H: COUNT(*) = rows; COUNT(col) skips NULLs.

# fd | Functional Dependencies, Closure & Candidate Keys
N: **X → Y**: equal X values imply equal Y values. **Armstrong's axioms**: reflexivity, augmentation, transitivity (+ derived: union, decomposition, pseudo-transitivity).
N: **Attribute closure X⁺**: start with X, repeatedly add the right side of any FD whose left side is inside the set. X is a super key if X⁺ = all attributes.
N: **Finding candidate keys**: attributes that never appear on any RHS **must be in every key**. Then try adding attributes until the closure covers everything; keep only minimal sets.
N: **Extraneous attribute**: in AB → C, A is extraneous if B⁺ already contains C.
N: **Lossless join** decomposition of R into R1, R2: **R1 ∩ R2 → R1 or R1 ∩ R2 → R2** (the common attributes form a key of one part).
N: **Dependency preservation**: (F1 ∪ F2)⁺ = F⁺.

Q: What is the number of candidate keys for a relation R(A,B,C,D) having functional dependencies {AB->CD, D->B, C->A}?
- 2 ~~ There are more.
- 3 ~~ There are more.
* 4 ~~ AB, AD (D→B), BC (C→A) and CD (C→A, D→B) all determine everything.
- 5 ~~ Too many.
H: Swap attributes using FDs: B↔D (D→B), A↔C (C→A).
P: PYQ

Q: In a relation R(A,B,C,D) having functional dependencies {AB->CD, D->B}, the extraneous attribute in AB->CD is
- A ~~ B⁺ = {B} doesn't give CD.
- B ~~ A⁺ = {A} doesn't give CD.
- C ~~ C is on the right side; removing it would lose information.
* None ~~ Neither A nor B alone determines CD.
H: Extraneous: check the closure of the remaining LHS.
P: PYQ

Q: In the relation R(A,B,C,D,E,F) with functional dependencies {AB->C, C->DE, E->F, D->A, C->B}, AB+ is
- {C} ~~ Keep going.
- {C,D,E} ~~ Keep going.
- {C,D,E,F} ~~ Include A and B themselves.
* {A,B,C,D,E,F} ~~ AB → C → DE → F; closure includes A, B.
H: Closure always includes the starting attributes.
P: PYQ

Q: R(A, B, C, D, E) with F = {A → B, B → C, C → D}. What is A⁺?
- {A, B} ~~ Continue transitively.
* {A, B, C, D} ~~ A → B → C → D; E is never reached.
- {A, B, C, D, E} ~~ E isn't determined.
- {A} ~~ Too small.
H: Follow the chain.

Q: Consider R = {A, B, C, D, E, F, G} with FDs {AB → C, B → EF, AD → G}. What is the key for R?
- {A, B, C, D, G} ~~ Not minimal.
- {A, D} ~~ AD⁺ = ADG — missing B, C, E, F.
- {A, B} ~~ AB⁺ = ABCEF — missing D, G.
* {A, B, D} ~~ ABD⁺ = ABCDEFG.
H: A, B, D never appear on the RHS → they must be in the key.
P: PYQ

Q: R(A, B, C, D, E, F) with F = {A → BC, B → CF, E → A, F → E} (H in an FD is outside R and ignored). How many candidate keys?
- 5 ~~ Too many.
- 6 ~~ Too many.
- 3 ~~ Too few.
* 4 ~~ D is never on the RHS. AD, BD, ED and FD each have closure = all attributes.
H: Never-on-RHS attribute (D) is in every key; A, B, E, F are mutually reachable.
P: PYQ

Q: For the same relation R(A,B,C,D,E,F) with F = {A → BC, B → CF, E → A, F → E}, the relation is in:
- 2NF, but not in 3NF. ~~ It fails 2NF.
- 3NF, but not in BCNF. ~~ It fails 2NF.
* 1NF, but not in 2NF. ~~ C is non-prime and depends on A, which is only PART of the key AD → partial dependency.
- BCNF. ~~ No.
H: Non-prime depends on part of a key → violates 2NF.
P: PYQ

Q: The non-prime attributes of the relation R(A,B,C,D,E) with functional dependencies {AE->BC, AC->D, CD->BE, D->E} is/are:
- A,C,D,E ~~ These are prime.
* B ~~ Candidate keys AE, AC, AD use A, C, D, E; only B is in no key.
- A,C ~~ D and E are also prime.
- B,D,E ~~ D and E are prime.
H: Prime = in some candidate key.
P: PYQ

Q: Consider the table R with attributes A, B and C, with FDs A → B, C → AB. Which are true? I. Decomposing R into R1(C, A) and R2(A, B) is lossless. II. Decomposing R into R1(A, B) and R2(B, C) is lossy.
- Only I ~~ II is also true.
- Only II ~~ I is also true.
* Both I and II ~~ I: common A → B, so A is a key of R2 (lossless). II: common B determines nothing (lossy).
- Neither I nor II ~~ Both hold.
H: Lossless if the common attributes are a key of one side.
P: PYQ

Q: R(A, B, C) with A → B is decomposed into R1(A, B) and R2(A, C). The decomposition is:
* Lossless ~~ R1 ∩ R2 = A, and A → B makes A a key of R1.
- Lossy ~~ The test passes.
- Not in 1NF ~~ Irrelevant.
- Not dependency-preserving ~~ A → B is kept in R1.
H: Common attribute = key of one part → lossless.

Q: Which Armstrong axiom states: if X → Y and Y → Z then X → Z?
- Reflexivity ~~ Y ⊆ X ⇒ X → Y.
- Augmentation ~~ X → Y ⇒ XZ → YZ.
* Transitivity ~~ Chain the dependencies.
- Union ~~ X → Y, X → Z ⇒ X → YZ.
H: Transitivity = chaining.

# normal | Normalization: 1NF, 2NF, 3NF, BCNF
N: **1NF**: all values atomic (no repeating groups or multivalued cells).
N: **2NF**: 1NF + **no partial dependency** (no non-prime attribute depends on part of a candidate key). Any relation with single-attribute keys only is automatically 2NF.
N: **3NF**: 2NF + **no transitive dependency** of non-prime attributes. Test for every X → A: X is a super key **or** A is prime.
N: **BCNF**: for every non-trivial X → A, **X is a super key**. BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF (BCNF is stronger). **Every 2-attribute relation is in BCNF**.
N: Decomposition: **3NF lossless + dependency-preserving is always possible**. **BCNF lossless is always possible but may NOT preserve dependencies** ("lossless BCNF that preserves dependencies isn't always possible").
N: Normalisation reduces **redundancy** and **update, insert and delete anomalies**.
N: **4NF** removes multivalued dependencies; BCNF does not guarantee 4NF.

Q: If a relational schema "R" is in BCNF, which of the following statements is true?
- R is in 4NF ~~ BCNF doesn't guarantee 4NF.
- R is in 2NF but not in 3NF ~~ BCNF implies 3NF.
- R is not in 1NF ~~ BCNF implies 1NF.
* R is in 2NF and 3NF ~~ BCNF is stricter than 3NF and 2NF.
H: BCNF ⇒ 3NF ⇒ 2NF ⇒ 1NF.
P: PYQ

Q: The highest normal form of a relation R(A,B,C,D) with functional dependencies {A->BCD, BC->AD, D->B} is
- 1NF ~~ It is higher.
- 2NF ~~ It is higher.
* 3NF ~~ Keys A, BC, CD → all attributes are prime; D → B violates BCNF (D isn't a super key) but B is prime, so 3NF holds.
- BCNF ~~ D → B has a non-super-key LHS.
H: Violation with prime RHS → 3NF but not BCNF.
P: PYQ

Q: Select the 'False' statement from the following statements about Normal Forms:
- Lossless preserving decomposition into 3NF is always possible ~~ True (3NF synthesis).
- Any Relation with two attributes is in BCNF ~~ True.
* Lossless preserving decomposition into BCNF is always possible ~~ False — lossless + dependency-preserving BCNF isn't always possible.
- BCNF is stronger than 3NF ~~ True.
H: 3NF: lossless + preserving ✓. BCNF: lossless ✓, preserving ✗ (not always).
P: PYQ

Q: A relation is in 2NF if it is in 1NF and:
* No non-prime attribute is partially dependent on any candidate key ~~ Remove partial dependencies.
- No transitive dependencies exist ~~ That's 3NF.
- Every determinant is a candidate key ~~ That's BCNF.
- There are no multivalued dependencies ~~ That's 4NF.
H: 2NF kills partial dependency.

Q: A relation is in 3NF if for every FD X → A:
- X is a candidate key only ~~ Too strict (that's close to BCNF).
* X is a super key OR A is a prime attribute ~~ The 3NF condition.
- A is non-prime ~~ No.
- X is non-prime ~~ No.
H: 3NF: super key LHS or prime RHS.

Q: R(StudentID, CourseID, StudentName, Grade) with key (StudentID, CourseID) and StudentID → StudentName. The highest normal form is:
* 1NF ~~ StudentName depends on part of the key → partial dependency → not 2NF.
- 2NF ~~ The partial dependency violates it.
- 3NF ~~ No.
- BCNF ~~ No.
H: Part of the key → non-prime = not 2NF.

Q: R(EmpID, DeptID, DeptName) with EmpID → DeptID and DeptID → DeptName (key EmpID). The highest normal form is:
- 1NF ~~ No partial dependency (single-attribute key).
* 2NF ~~ EmpID → DeptID → DeptName is transitive → not 3NF.
- 3NF ~~ Transitive dependency.
- BCNF ~~ No.
H: Transitive dependency → stuck at 2NF.

Q: Which normal form ensures that every determinant is a candidate key?
- 2NF ~~ No.
- 3NF ~~ Allows a prime RHS.
* BCNF ~~ Every determinant must be a super key.
- 1NF ~~ No.
H: BCNF = "every determinant is a key".

Q: Normalization mainly aims to reduce:
* Data redundancy and update/insert/delete anomalies ~~ Splitting tables removes repetition.
- Number of tables ~~ Usually increases them.
- Query writing effort ~~ Joins may increase.
- Indexes ~~ Unrelated.
H: Normalise → less redundancy, fewer anomalies.

Q: A table where one cell holds several phone numbers ("98xx, 97xx") violates:
* 1NF ~~ Values must be atomic.
- 2NF ~~ It fails earlier.
- 3NF ~~ It fails earlier.
- BCNF ~~ It fails earlier.
H: Non-atomic = not 1NF.

# index | Indexing, B-Trees, B+ Trees & Hashing
N: **Primary index**: on the ordering key field of a sorted file. **Clustering index**: data records are ordered (or nearly) the same way as the index entries. **Secondary index**: on a non-ordering field (always dense).
N: **Dense index**: an entry for every search-key value. **Sparse index**: entries for only some values (one per block).
N: **Multilevel index**: the first level is the index on the data file; an index built on the first level is the **second level**, and so on.
N: **B-tree of order m**: max m children, **max m − 1 keys**; non-root internal nodes have at least ⌈m/2⌉ children → **min ⌈m/2⌉ − 1 keys**. Order 4 → keys 1..3.
N: **B+ tree**: all data pointers in the **leaves**; internal nodes hold only keys for navigation; leaves are **linked** → fast **range queries**. Height-balanced (all leaves at the same depth). Height ≈ ⌈log_{⌈n/2⌉} N⌉ in the worst case (4 KB nodes, 40-byte entries, 1 million keys → 4).
N: **Hash index**: O(1) average for **equality** search (=), useless for range queries. **B+ tree index**: supports equality **and range**/ordered queries. A **hashed file** computes the record's position from its key.
N: Indexes speed up reads but slow down inserts/updates/deletes (indexes must be maintained), especially with large keys.

Q: Which of the following are true about indexes?
- Indexes will improve the performance of the database table, even it is updated frequently ~~ Frequent updates make index maintenance costly.
* Indexes makes sql server engine’s task even tougher, especially with large keys ~~ Large keys mean bigger index trees and more maintenance.
- Both ~~ The first is false.
- None of the options ~~ The second is true.
H: Index = faster reads, slower writes.
P: PYQ

Q: A file is structured in such a way that the ordering of data records in certain indexes is the same as or similar to the ordering of data entries. That index is then called
* Clustered ~~ Data is physically ordered like the index.
- Sparse ~~ About how many entries.
- Dense ~~ About how many entries.
- Unclustered ~~ Data order differs.
H: Same order as data = clustered.
P: PYQ

Q: An index with an entry for EVERY search-key value is:
* Dense index ~~ One entry per value.
- Sparse index ~~ Only some values.
- Clustered index ~~ About ordering.
- Hash index ~~ Different structure.
H: Dense = every value; sparse = some.

Q: Primary indexes of multilevel indexes are created usually based on its first level and it is normally referred as
- zero level of multilevel index ~~ Not a term.
- third level of multilevel index ~~ That's an index on the second level.
* second level of multilevel index ~~ The index built on the first-level index is the second level.
- first level of multilevel index ~~ That's the base index itself.
H: Index on the index = second level.
P: PYQ

Q: The physical position of a record is calculated by a formula that translates a file key into a position for the record. This is
- B-Tree file ~~ Uses a tree search.
* Hashed file ~~ A hash function computes the address.
- Indexed file ~~ Uses an index lookup.
- Sequential file ~~ Ordered scan.
H: Formula → hashing.
P: PYQ

Q: Which index type is best for range queries like salary BETWEEN 10000 AND 20000?
- Hash index ~~ Only good for equality.
* B+ tree index ~~ Sorted, linked leaves give efficient range scans.
- Bitmap only ~~ Not the standard answer.
- No index ~~ Slow.
H: Range → B+ tree. Equality → hash.

Q: A hash index is most suitable for:
* Equality search (WHERE id = 105) ~~ O(1) average lookup.
- Range queries ~~ Hashing destroys order.
- ORDER BY queries ~~ No ordering.
- Prefix (LIKE 'A%') searches ~~ Needs ordering.
H: Hash = exact match only.

Q: Which of the following is/are correct?
- B-trees are for storing data on disk and B+ trees are for main memory. ~~ Both are disk structures.
* Range queries are faster on B+ trees. ~~ Leaves are linked in key order.
- B-trees are for primary indexes and B+ trees are for secondary indexes. ~~ No such rule.
- The height of a B+ tree is independent of the number of records. ~~ It grows logarithmically.
H: B+ tree leaves linked → range queries.
P: PYQ

Q: Which of the following statement(s) is/are not TRUE about the B+ tree, which is used for creating an index of a database table?
- B+ Tree is a height-balanced tree ~~ True.
* Non-leaf nodes have pointers to data records ~~ False — only leaf nodes point to data records.
- Key values in each node are kept in sorted order ~~ True.
- Each leaf node has a pointer to the next leaf node ~~ True.
H: B+ tree: data pointers ONLY in leaves.
P: PYQ

Q: B+ Trees are normally considered as BALANCED, since
* Lengths of the paths from the root to all leaf nodes are all equal. ~~ All leaves are at the same depth.
- Lengths of the paths from the root to all leaf nodes differ from each other by at most 1 ~~ That's AVL-style.
- Number of children of any two non-leaf sibling nodes differ by at most 1. ~~ Not the definition.
- Number of records in any two leaf nodes differ by at most 1 ~~ Not the definition.
H: B+ tree: every leaf at the same level.
P: PYQ

Q: Find the maximum and minimum number of keys in the internal nodes of a B-Tree if the order of the node is four.
- 4,2 ~~ Max keys = order − 1.
* 3,1 ~~ Max = m − 1 = 3; min (non-root) = ⌈m/2⌉ − 1 = 1.
- 4,0 ~~ No.
- 4,3 ~~ No.
H: Order m: keys between ⌈m/2⌉−1 and m−1.
P: PYQ

Q: In a B-tree of order 5, the maximum and minimum number of keys in a non-root node are:
- 5 and 2 ~~ Max keys = m − 1.
* 4 and 2 ~~ Max 5 − 1 = 4; min ⌈5/2⌉ − 1 = 2.
- 4 and 1 ~~ Min is ⌈m/2⌉ − 1 = 2.
- 5 and 3 ~~ No.
H: Order 5 → 2..4 keys.

Q: Consider a B+-tree in which the maximum number of keys in a node is 7. What is the minimum number of keys in any non-root node?
* 3 ~~ Order = 8, so min = ⌈8/2⌉ − 1 = 3.
- 1 ~~ Too low.
- 2 ~~ Too low.
- 4 ~~ That's the minimum number of children.
H: Max keys 7 → order 8 → min keys 3.
P: PYQ

Q: Consider a B+ tree where the block and node size is 4 kilobytes and each index entry is 40 bytes long. What is the height of the tree for a file with one million search key values?
- 5 ~~ Too high.
* 4 ~~ Fan-out n ≈ 100; worst case ⌈log₅₀(1,000,000)⌉ = 4 (nodes at least half full).
- 6 ~~ Too high.
- 3 ~~ That would assume completely full nodes (log₁₀₀).
H: Korth's example: ⌈log_{⌈n/2⌉} N⌉ = ⌈log₅₀ 10⁶⌉ = 4.
P: PYQ

Q: A B-tree of order 4 is constructed by 8 successive insertions from scratch. What is the maximum number of operations for node splitting that can take place?
* 3 ~~ Splits can happen at the 4th, 6th and 8th insertions; the root doesn't overflow within 8 keys.
- 4 ~~ Too many.
- 5 ~~ Too many.
- 6 ~~ Too many.
H: Order 4: a node splits on its 4th key; after the first split, each leaf needs 2 more keys to split again.
P: PYQ

Q: Consider the query SELECT E.eno, COUNT(*) FROM Employees E GROUP BY E.eno. If an index on eno is available, the query can be answered by scanning only the index if
* index can be hash or B+ tree and clustered or non-clustered ~~ The index alone has every eno value with its entries — any index type works.
- the index is only hash and clustered ~~ Too restrictive.
- the index is only B+tree and clustered ~~ Too restrictive.
- index can be hash or B+ tree and clustered ~~ Clustering is not needed.
H: Index-only scan: any index on eno works.
P: PYQ

# txn | Transactions, ACID & Serializability
N: **ACID**: **Atomicity** (all or nothing — recovery manager), **Consistency** (valid state to valid state — programmer/constraints), **Isolation** (concurrent ≈ serial — concurrency-control manager), **Durability** (committed changes survive any failure — recovery manager).
N: Goals of concurrent execution: better **resource utilisation**, higher **throughput**, lower **waiting/response time**. (NOT a reduced chance of deadlock — concurrency makes deadlocks possible.)
N: **Conflicting operations**: different transactions, same data item, and **at least one is a write** (R-W, W-R, W-W).
N: **Conflict serializable** ⇔ the **precedence graph** (edge Ti → Tj for each conflict where Ti's op comes first) is **acyclic**. Every conflict-serializable schedule is view serializable, not vice versa (blind writes).
N: **Recoverable schedule**: if Tj reads from Ti, then Ti commits before Tj. Reading uncommitted data (dirty read) and committing first can make a schedule **irrecoverable**. **Cascadeless**: read only committed data. **Strict**: no read/write of an item until the last writer commits/aborts.
N: A schedule must keep the order of operations **within** each transaction.

Q: The 'Durability' property among the ACID properties of a transaction requires that the modifications made by a successful transaction to the database survive.
- Except in case of an Operating System crash ~~ Must survive that too.
* Always, even if there is a failure of any kind ~~ Committed = permanent.
- Except in case of a power failure ~~ Must survive that too.
- Except in case of a Disk crash ~~ Survived via logs/backups.
H: Durability = permanent after commit.
P: PYQ

Q: Which ACID property ensures that a transaction is executed completely or not at all?
* Atomicity ~~ All or nothing.
- Consistency ~~ Valid states.
- Isolation ~~ No interference.
- Durability ~~ Survives failures.
H: Atomic = indivisible.

Q: Which ACID property is the responsibility of the concurrency-control component?
- Atomicity ~~ Recovery manager.
- Durability ~~ Recovery manager.
* Isolation ~~ Concurrency control makes concurrent runs look serial.
- Consistency ~~ The application programmer.
H: Isolation ↔ concurrency control; A & D ↔ recovery.

Q: Which of the following is false? (A) Ensuring durability is the responsibility of the recovery management component (B) Ensuring isolation is the responsibility of concurrency management (C) Ensuring atomicity or consistency is the responsibility of the recovery management component
- Statement A ~~ True.
- Statement B ~~ True.
- Statement C ~~ The bank treats it as true.
* None of the options ~~ The bank key: all three statements are considered true.
H: Recovery → A & D; concurrency → I.
F: Strictly, consistency is the application programmer's job (Korth), which would make C debatable. The bank key is "None of the options".
P: PYQ

Q: Which of the following is not a goal of concurrent execution of a transaction?
- Improved Resource Utilization ~~ A goal.
- Improved Throughput ~~ A goal.
* Reduced probability of deadlock ~~ Concurrency INTRODUCES the possibility of deadlocks.
- Reduced waiting time ~~ A goal.
H: Concurrency: + utilisation, + throughput, − waiting; but deadlocks become possible.
P: PYQ

Q: Which one of the following is true about the concurrency?
* It ensures that no interference between simultaneous operations on the database ~~ Concurrency control keeps transactions isolated.
- It ensures that a transaction allows either all of its operations are executed or none ~~ That's atomicity.
- It make sure that database transactions allows any integrity violation in the database. ~~ Opposite.
- None of the options ~~ The first option is correct.
H: Concurrency control = no interference.
P: PYQ

Q: Which of the following is not a valid schedule of 2 transactions, T1: {R(X), W(X)} and T2: {R(Y), W(Y)}?
- R(X), W(X), R(Y), W(Y) ~~ Serial T1, T2.
- R(Y), W(Y), R(X), W(X) ~~ Serial T2, T1.
* W(X), W(Y), R(X), R(Y) ~~ Writes come before reads — the order inside each transaction is broken.
- R(X), R(Y), W(X), W(Y) ~~ Valid interleaving.
H: A schedule must keep each transaction's own order.
P: PYQ

Q: Which of the following pairs of operations conflict in the transactions T1: {R1(X), W1(X)} and T2: {R2(X), W2(Y)}?
- R1(X), W1(X) ~~ Same transaction — not a conflict.
- R1(X), R2(X) ~~ Two reads never conflict.
* W1(X), R2(X) ~~ Different transactions, same item, one is a write.
- R1(X), W2(Y) ~~ Different items.
H: Conflict = different Tx + same item + ≥ 1 write.
P: PYQ

Q: Which of the following is a conflict serializable schedule of T1: {R1(X), W1(X), R1(Y)} and T2: {R2(Y), R2(X), W2(X)}?
- R1(X), R2(Y), R2(X), W1(X), W2(X), R1(Y) ~~ R2(X) before W1(X): T2→T1; R1(X) before W2(X): T1→T2 → cycle.
- R2(Y), R2(X), R1(X), W1(X), W2(X), R1(Y) ~~ R2(X)→W1(X) and W1(X)→W2(X) → cycle.
* R1(X), W1(X), R2(Y), R2(X), W2(X), R1(Y) ~~ All conflicts point T1 → T2 → acyclic.
- R2(Y), R2(X), R1(X), W2(X), W1(X), R1(Y) ~~ R2(X)→W1(X) and R1(X)→W2(X) → cycle.
H: Draw the precedence graph; no cycle = conflict serializable.
P: PYQ

Q: The schedule S: r1(X), w3(X), w3(Y), w2(Y), r1(Z), w3(Z), w2(Z) is
* Both view serializable and conflict serializable schedule ~~ Edges T1→T3, T3→T2, T1→T2 → acyclic (order T1, T3, T2).
- View serializable but not conflict serializable schedule ~~ It is conflict serializable.
- Only View serializable ~~ It is both.
- Only conflict serializable ~~ Conflict serializable implies view serializable.
H: Conflict serializable ⇒ view serializable.
P: PYQ

Q: For the given schedule S : r1(y), r2(x), r2(y), r3(y), w2(x), w1(y), w3(x), r1(x), which is true?
- S is the conflict serializable but not view serializable ~~ Impossible combination.
- S is neither conflict serializable nor view serializable ~~ The graph is acyclic.
* S is both conflict serializable as well as view serializable ~~ Edges T2→T1, T3→T1, T2→T3 → order T2, T3, T1.
- S is view serializable but not conflict serializable ~~ It is conflict serializable too.
H: Acyclic precedence graph → serializable (both kinds).
P: PYQ

Q: Schedule: R1(A), R2(A), W1(A), W2(A). Is it conflict serializable?
- Yes, equivalent to T1, T2 ~~ R2(A) before W1(A) gives T2 → T1.
- Yes, equivalent to T2, T1 ~~ R1(A) before W2(A) gives T1 → T2.
* No — the precedence graph has a cycle T1 ⇄ T2 ~~ This is the lost-update pattern.
- Cannot be determined ~~ It can.
H: Lost update = cycle.

Q: Which of the following statement is not correct for serializable of transactions?
- In a serial schedule, each transaction is independent of others. ~~ True.
* Every schedule is serializable ~~ False — many interleavings are not.
- In non-serial schedule may not always result in an incorrect outcome ~~ True.
- In non-serial schedule, may result with overlapping of two transaction’s executions ~~ True.
H: Not every schedule is serializable.
P: PYQ

Q: Consider S : r1(x), w1(x), r2(x), r1(y), w1(y), w2(x), r2(y), c1, c2. I: S is recoverable. II: If the order of w1(x) and w2(x) is interchanged, S will be non-recoverable. Which is true?
* Only I ~~ T2 reads from T1 and T1 commits first → recoverable. Swapping the writes keeps T1 committing first, so it stays recoverable → II is false.
- Only II ~~ II is false.
- Both I and II ~~ II is false.
- None of the options ~~ I is true.
H: Recoverable: the writer commits before the reader commits.
P: PYQ

Q: Which one of the following events in a database system can lead to an irrecoverable mistake?
* A transaction reads a data item after it is written by an uncommitted transaction ~~ Dirty read: if the reader commits and the writer aborts, it can't be undone.
- A transaction reads a data item after it is written by a committed transaction ~~ Safe.
- A transaction reads a data item after it is read by an uncommitted transaction ~~ Reads don't conflict.
- A transaction writes a data item after it is read by an uncommitted transaction ~~ Not irrecoverable.
H: Dirty read → irrecoverable risk.
P: PYQ

Q: A cascading rollback happens when:
* The failure of one transaction forces others that read its uncommitted data to roll back ~~ Avoided by cascadeless schedules.
- Two transactions deadlock ~~ Different problem.
- A transaction commits twice ~~ Impossible.
- A log record is lost ~~ No.
H: Cascadeless = read only committed data.

# cc | Concurrency Control: Locking, Timestamps & Isolation Levels
N: **Lock-based**: shared (S, read) and exclusive (X, write) locks. **Two-phase locking (2PL)**: growing phase (acquire only) then shrinking phase (release only) → guarantees **conflict serializability** (but not deadlock freedom).
N: **Strict 2PL**: hold all **exclusive** locks until commit/abort → schedules are serializable **and strict (hence recoverable, cascadeless)**. **Rigorous 2PL**: hold all locks until commit.
N: **Timestamp ordering**: older transactions get priority; operations out of timestamp order are rejected (rollback). **Thomas' write rule**: ignore obsolete writes → allows some **view-serializable but not conflict-serializable** schedules. **Multiversion timestamp** allows everything basic TO allows, and more.
N: Other techniques: **validation (optimistic)**, **multiversion**, **multiple granularity** locking. Deadlock handling: wait-die, wound-wait, timeouts, wait-for graphs.
N: **Lock granularity**: **row-level** locking gives the highest concurrency (more overhead); table-level gives the least.
N: **Isolation levels** (weakest → strongest): **Read uncommitted** (dirty reads allowed), **Read committed** (no dirty reads), **Repeatable read** (no dirty or non-repeatable reads, **phantoms still possible**), **Serializable** (none).
N: **Two-phase COMMIT (2PC)** coordinates atomic commit across distributed sites (prepare/vote, then commit/abort). It is a commit protocol, not a recovery technique like deferred/immediate update.

Q: Which of the following will not allow both dirty reads and non-repeatable reads, but allows phantom reads?
- Read committed ~~ Still allows non-repeatable reads.
- Read uncommitted ~~ Allows dirty reads.
* Repeatable read ~~ Prevents dirty and non-repeatable reads; phantoms may still appear.
- Serializable ~~ Prevents phantoms too.
H: RU → RC (no dirty) → RR (no non-repeatable) → S (no phantoms).
P: PYQ

Q: The isolation level that prevents dirty reads but still allows non-repeatable reads is:
- Read uncommitted ~~ Allows dirty reads.
* Read committed ~~ Reads only committed data, but a value can change between two reads.
- Repeatable read ~~ Prevents non-repeatable reads.
- Serializable ~~ Prevents everything.
H: Read committed = no dirty reads only.

Q: Which isolation level allows dirty reads?
* Read uncommitted ~~ The weakest level.
- Read committed ~~ No dirty reads.
- Repeatable read ~~ No dirty reads.
- Serializable ~~ No anomalies.
H: Uncommitted = dirty reads OK.

Q: Which level of locking provides the highest degree of concurrency in a relational database?
- Table ~~ Locks everything — least concurrency.
* Row ~~ The finest granularity → most transactions can run in parallel.
- Page ~~ In between.
- Page, table and row level locking allow the same degree of concurrency ~~ No.
H: Finer lock = more concurrency.
P: PYQ

Q: The two-phase locking protocol guarantees:
* Conflict serializability ~~ The lock point gives a serial order.
- Freedom from deadlock ~~ 2PL can deadlock.
- Freedom from cascading rollback ~~ Needs strict 2PL.
- Faster execution ~~ Not guaranteed.
H: 2PL → serializable, NOT deadlock-free.

Q: In two-phase locking, the growing phase is when a transaction:
* May obtain locks but not release any ~~ Then the shrinking phase releases locks only.
- May release locks but not obtain any ~~ That's the shrinking phase.
- Must commit ~~ No.
- Holds no locks ~~ No.
H: Grow (acquire) → Shrink (release).

Q: Which of the following statements is/are TRUE? I. Strict two-phase locking produces conflict serializable schedules which are not recoverable. II. Timestamp ordering with Thomas’ Write Rule can produce view serializable schedules that are not conflict serializable.
- I only ~~ I is false: strict 2PL schedules are recoverable (strict).
* II only ~~ Thomas' write rule ignores obsolete blind writes → view but not conflict serializable.
- Both I and II ~~ I is false.
- Neither I nor II ~~ II is true.
H: Strict 2PL ⇒ recoverable. Thomas ⇒ view-serializable extras.
P: PYQ

Q: Which of the following is true?
- All the schedules which are allowed under Thomas write rule are also allowed under basic timestamp protocol ~~ Thomas allows MORE.
* All the schedules which are allowed under basic timestamp rule are also allowed under multi-version timestamp protocol ~~ MVTO is more permissive than basic TO.
- All the schedules which are allowed under multi-version timestamp protocol are also allowed under Thomas write rule ~~ Not guaranteed.
- All are true ~~ Only the second.
H: Basic TO ⊆ MVTO; Basic TO ⊆ Thomas.
P: PYQ

Q: Which of the following is correct with respect to Two phase commit protocol?
* Ensures serializability ~~ The bank's answer (it treats the two-phase protocol as guaranteeing correct, serializable outcomes).
- Prevents Deadlock ~~ No.
- Detects Deadlock ~~ No.
- Recover from Deadlock ~~ No.
H: Bank key: "ensures serializability".
F: Strictly, 2-phase COMMIT ensures atomic commit across distributed sites; 2-phase LOCKING is what ensures serializability. Pick the bank key here, because none of the deadlock options apply.
P: PYQ

Q: Two-phase commit (2PC) is primarily used for:
- Single-user databases ~~ No coordination needed.
* Ensuring atomic commit of a distributed transaction across multiple sites ~~ Coordinator: prepare/vote, then commit/abort.
- Index creation ~~ No.
- Query optimisation ~~ No.
H: 2PC = all sites commit or all abort.

Q: In the wait-die deadlock prevention scheme, if an older transaction requests a lock held by a younger one:
* The older transaction waits ~~ Older waits, younger dies.
- The older transaction is rolled back ~~ That happens to the younger one in the reverse case.
- The younger transaction is killed immediately ~~ That's wound-wait.
- Both abort ~~ No.
H: Wait-die: old waits, young dies. Wound-wait: old wounds young.

Q: Optimistic (validation-based) concurrency control is best when:
- Conflicts are very frequent ~~ Many rollbacks.
* Conflicts are rare ~~ Transactions run freely and are validated at commit.
- All transactions are writes ~~ Not ideal.
- There is only one user ~~ No control needed.
H: Optimistic = assume few conflicts.

# recovery | Recovery Methods
N: **Transaction failure** is handled by **rollback (undo)** using the log. System crash → redo committed and undo uncommitted transactions. Disk failure → restore a backup + the log.
N: **Log-based recovery**: write-ahead logging (**WAL**) — log records go to stable storage **before** the data page is written.
N: **Deferred update** (NO-UNDO/REDO): changes are written to the DB only after commit → only REDO is needed. **Immediate update** (UNDO/REDO): the DB may be updated before commit → both UNDO and REDO.
N: **Checkpoints** limit how much of the log must be scanned after a crash.
N: **Shadow paging**: keep a shadow page table; on commit switch to the new one — no log needed for undo.
N: **ARIES**: industrial algorithm with analysis, redo and undo passes.
N: **Two-phase commit is NOT a recovery technique** (it's a distributed commit protocol).

Q: Which of the following is not a recovery technique?
- Deferred update ~~ Recovery technique (NO-UNDO/REDO).
- Immediate update ~~ Recovery technique (UNDO/REDO).
* Two-phase commit ~~ A distributed commit protocol, not a recovery method.
- Recovery management ~~ The bank treats it as recovery.
H: 2PC ≠ recovery technique.
P: PYQ

Q: Rollback of transactions is normally used to :
* Recover from transaction failure ~~ Undo the failed transaction's changes.
- Update the transaction ~~ No.
- Retrieve old records ~~ Not its purpose.
- Repeat a transaction ~~ That's redo.
H: Rollback = undo after failure.
P: PYQ

Q: In the deferred update recovery technique, after a crash the system needs:
* Only REDO of committed transactions ~~ Uncommitted changes never reached the database.
- Only UNDO ~~ Nothing to undo.
- Both UNDO and REDO ~~ That's immediate update.
- Neither ~~ Committed changes may be missing.
H: Deferred = NO-UNDO/REDO.

Q: In the immediate update technique, recovery may need:
- Only REDO ~~ Uncommitted changes may be on disk.
- Only UNDO ~~ Committed changes may not be on disk yet.
* Both UNDO and REDO ~~ Undo uncommitted, redo committed.
- Nothing ~~ No.
H: Immediate = UNDO/REDO.

Q: The write-ahead logging (WAL) rule says:
* The log record must be written to stable storage before the corresponding data page is written ~~ So changes can always be undone or redone.
- Data pages are written before the log ~~ Opposite.
- Logs are optional ~~ No.
- The log is written only at shutdown ~~ No.
H: Log first, data later.

Q: The purpose of a checkpoint in log-based recovery is to:
- Encrypt the log ~~ No.
* Reduce the amount of log that must be scanned after a crash ~~ Everything before the checkpoint is already safe on disk.
- Lock the database ~~ No.
- Delete transactions ~~ No.
H: Checkpoint = shortcut for recovery.

Q: Which recovery technique maintains two page tables and does not need undo logs?
* Shadow paging ~~ The current table is updated; the shadow table is kept unchanged until commit.
- Deferred update ~~ Uses a log.
- ARIES ~~ Uses a log.
- Immediate update ~~ Uses a log.
H: Shadow paging = copy-on-write pages.

# nosql | NoSQL & Modern Databases
N: **NoSQL** (non-relational) databases handle huge volumes of **unstructured/semi-structured** data, scale **horizontally**, and are **schema-less** (insert data without a predefined schema).
N: **NoSQL types**: **Key-value** (Redis, DynamoDB), **Document** (MongoDB, CouchDB), **Wide-column / column-family** (Cassandra, HBase), **Graph** (Neo4j).
N: **NewSQL**: relational/SQL with NoSQL-like scalability (e.g. Google Spanner, CockroachDB) — still needs a schema.
N: **CAP theorem**: a distributed system can guarantee at most two of **Consistency, Availability, Partition tolerance**. Many NoSQL systems favour availability (BASE: Basically Available, Soft state, Eventually consistent).

Q: Which of the following are the NoSQL databases?
- Key-value ~~ One type, but not the only one.
- Wide-column ~~ Also NoSQL.
- Document ~~ Also NoSQL.
* All the options ~~ Key-value, wide-column and document stores are all NoSQL types (and graph databases).
H: NoSQL family: key-value, document, wide-column, graph.
F: Correction: the bank key says "Key-value", but all three listed types are NoSQL databases. In the real exam, the key may say "Key-value".
P: PYQ

Q: NoSQL databases is used mainly for handling large volumes of ______________ data.
* Unstructured ~~ The bank's answer: NoSQL suits unstructured data that doesn't fit tables.
- Structured ~~ Relational databases fit structured data.
- Semi-structured ~~ Also handled, but the bank key is unstructured.
- All the options ~~ Bank key is unstructured.
H: NoSQL ↔ unstructured big data.
P: PYQ

Q: Which of the following statement(s) are incorrect
* In non-relational databases, schemas are need to be defined before adding data ~~ False — NoSQL is schema-less.
- NoSQL databases allows the insertion of data without a predefined schema ~~ True.
- NewSQL databases allows the insertion of data without a predefined schema ~~ The bank treats this as correct.
- All the statements ~~ Only the first is incorrect.
H: NoSQL = no predefined schema.
P: PYQ

Q: MongoDB is an example of which type of NoSQL database?
- Key-value ~~ e.g. Redis.
* Document store ~~ Stores JSON-like (BSON) documents.
- Graph ~~ e.g. Neo4j.
- Wide-column ~~ e.g. Cassandra.
H: MongoDB = documents.

Q: Cassandra and HBase are examples of:
- Graph databases ~~ No.
* Wide-column (column-family) stores ~~ Rows with flexible column families.
- Document stores ~~ No.
- Relational databases ~~ No.
H: Cassandra/HBase = wide-column.

Q: Neo4j is best suited for:
* Graph data such as social networks and relationships ~~ Nodes and edges are first-class.
- Simple key lookups ~~ Key-value store.
- Time-series logs only ~~ Not its focus.
- Spreadsheets ~~ No.
H: Neo4j = graph.

Q: The CAP theorem states a distributed system cannot simultaneously guarantee:
* Consistency, Availability and Partition tolerance ~~ At most two of the three.
- Concurrency, Atomicity and Persistence ~~ Not CAP.
- Capacity, Availability and Performance ~~ Not CAP.
- Consistency, Accuracy and Privacy ~~ Not CAP.
H: CAP: pick 2.
