@subject dlco

# boolean
S: 🔌 The big idea
> Computers only understand **1 (ON)** and **0 (OFF)**. Boolean algebra is the maths of these two values.
> We use it to describe what a circuit should do, and then make the circuit as **small and cheap** as possible.
> 💡 Think of a light switch: it is either ON or OFF — nothing in between.
S: The three basic operations
> - **AND (·)** → output is 1 only if **all** inputs are 1 (like two locks on one door).
> - **OR (+)** → output is 1 if **any** input is 1 (like two doors into a room).
> - **NOT (')** → flips the value: 1 becomes 0, 0 becomes 1.
> **NAND** and **NOR** are "universal" — you can build *any* circuit using only one of them.
S: Minterms — one row of the truth table
> With **n** inputs there are **2ⁿ** rows in the truth table, so 2ⁿ minterms.
> - 2 inputs → 4 rows, 3 inputs → 8, 4 inputs → 16.
> A **minterm** is an AND term that is 1 for exactly one row. Example: for A=1, B=0, C=1 the minterm is **AB'C** (m5).
> Write the function as a **sum of minterms**: F = Σm(1, 3, 5).
S: Simplifying with rules
> A few rules shrink expressions:
> - **A + AB = A** (absorption — the AB part adds nothing new)
> - **A + A'B = A + B**
> - **De Morgan**: (AB)' = A' + B' — "break the bar, change the sign".
> Example: X + XY' + XY'Z = **X**. So it needs **zero gates** — just a wire!
S: K-maps — simplifying with pictures
> A **Karnaugh map** puts truth-table rows into a grid labelled in **Gray code** (00, 01, 11, 10), so neighbours differ by one bit.
> - Circle groups of 1s in sizes **1, 2, 4, 8…** (powers of 2).
> - A group of 4 removes 2 variables; a group of 2 removes 1.
> 💡 Bigger groups = simpler answer. For many variables, the **Quine–McCluskey (tabulation)** method does the same thing step by step.

# comb
S: 🧩 What is a combinational circuit?
> Its output depends **only on the current inputs** — it has **no memory**.
> 💡 Like a calculator key press: same input, same output, every time.
> Examples: adders, subtractors, encoders, decoders, multiplexers, comparators.
S: Adders — how computers add
> **Half adder** adds 2 bits:
> - Sum = A **XOR** B
> - Carry = A **AND** B
> **Full adder** adds 3 bits (A, B and a carry-in). It is built from **2 half adders + 1 OR gate**.
> Chain full adders together to add bigger numbers.
S: Decoder & Encoder
> - **Decoder**: n input bits → turns ON exactly one of **2ⁿ** outputs. 3 bits → 8 outputs (3-to-8 decoder).
> - **Encoder**: the reverse — which line is ON? → give its binary code.
> 💡 Choosing 1 of 8 doors needs log₂8 = **3 switches** feeding a 3-to-8 decoder.
> To make a 1-of-32 decoder from 3-to-8 decoders: 32 ÷ 8 = **4 chips**.
S: Multiplexer & Demultiplexer
> - **MUX (data selector)**: many inputs → **one** output. Select lines choose which input passes. 2ⁿ inputs need **n** select lines.
> - **DEMUX (distributor)**: one input → sent to one of many outputs.
> 💡 MUX = a TV remote picking one channel; DEMUX = a postman delivering to one house.
S: Parity & comparators
> - **XOR** is 1 when inputs are different → perfect for **parity** (odd/even count of 1s) checking.
> - A **comparator** tells whether A > B, A = B or A < B — exactly **one** output is 1.
> For 2-bit numbers: 16 pairs, 4 are equal, and A > B in **6** of them.

# seq
S: 🧠 Circuits with memory
> **Sequential circuits** remember the past. Their output depends on the current input **and** what was stored before.
> The memory cell is a **latch** or **flip-flop** (stores 1 bit).
> 💡 Like a light that stays ON after you let go of the button.
S: SR latch — Set and Reset
> - **S = 1** → store 1 (SET)
> - **R = 1** → store 0 (RESET)
> - **S = R = 0** → keep the old value (hold)
> - **S = R = 1** → not allowed (invalid)
> So if R was 1 (reset) and then goes back to 0, the latch **stays reset**.
S: JK, D and T flip-flops
> - **JK**: 00 hold, 10 set, 01 reset, **11 toggle** (flip).
> - **D**: output simply **copies D** when clocked ("Data/Delay").
> - **T**: T = 1 → toggle. Join J and K together to get a T flip-flop.
> Toggling **halves the frequency**: a 20 kHz clock gives a 10 kHz output.
S: Master–slave & timing problems
> A master–slave flip-flop has two halves: the **master listens when the clock is HIGH**, the **slave copies when it is LOW**.
> This stops **race-around** (a JK with J=K=1 flipping many times during one long pulse).
> 💡 "Ones catching": a glitch on J/K while the clock is HIGH can be wrongly caught.
S: Counters
> A counter is a chain of flip-flops. **n flip-flops count 2ⁿ states**.
> - MOD-32 → 5 flip-flops; divide-by-128 → 7; MOD-10 → 4.
> - **Ripple (asynchronous)**: clock goes to the first stage only → delays add up (slow).
> - **Synchronous**: the clock reaches **all stages at the same time** → no ripple delay.

# datarep
S: 🔢 How numbers are stored
> Everything is stored in binary. For negative numbers we need a sign trick.
> - **Sign-magnitude**: first bit is the sign.
> - **1's complement**: flip all bits.
> - **2's complement**: flip all bits **and add 1** ← what real computers use.
S: 2's complement made easy
> Example: −5 in 8 bits
> - +5 = 0000 0101
> - flip → 1111 1010
> - add 1 → **1111 1011 = FB (hex)**
> 💡 −1 is always all 1s (FF). 2's complement has only **one zero**.
S: Ranges you must remember (8 bits)
> - Unsigned: 0 to 255
> - 1's complement / sign-magnitude: **−127 to +127** (two zeros!)
> - 2's complement: **−128 to +127**
> General n bits, 2's complement: −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1.
S: Special codes
> - **Gray code**: next number changes only **one bit** (the "reflected" code). Binary → Gray: copy the first bit, then XOR each neighbouring pair. 101011 → 111110.
> - **BCD**: each decimal digit gets 4 bits. 126 = 0001 0010 0110. Codes above 1001 are invalid.
> - **Excess-3**: BCD + 3.
S: Floating point & multiplying
> **IEEE 754 single precision** = 32 bits: 1 sign + 8 exponent (bias 127) + 23 fraction. Double = 64 bits (1 + 11 + 52).
> **Booth's algorithm** multiplies **signed** 2's-complement numbers: pair 10 → subtract, 01 → add, 00/11 → just shift.

# cpu
S: 🖥️ Inside the CPU
> The CPU has small storage boxes called **registers**:
> - **PC** (program counter) → address of the **next** instruction
> - **IR** → the current instruction
> - **MAR** → the memory **address** to use
> - **MDR/DR** → the **data** going to/from memory
S: Reading and writing memory
> - **Read**: put the address in **MAR** → memory sends the data into MDR.
> - **Write**: put the address in MAR **and** the data in MDR → then write.
> The CPU drives the **address bus** (one way); data travels on the **data bus** (both ways).
> 💡 A 16-bit address bus can reach 2¹⁶ = 64 KB.
S: The instruction cycle
> For every instruction the CPU repeats: **Fetch → Decode → Execute**.
> - Fetch: MAR ← PC, read the instruction, PC moves to the next one.
> - Decode: work out what it means.
> - Execute: do it (and check for interrupts).
> This whole loop is the **instruction cycle**.
S: The control unit
> Two ways to generate control signals:
> - **Hardwired**: built from logic gates — **fast** but hard to change (RISC).
> - **Microprogrammed**: control "program" (microcode) stored in **control memory (ROM)** — flexible but slower (CISC).
> CPU modes: **executive (supervisor)** mode handles interrupts; **task (user)** mode runs programs.
S: Memory chip words to know
> - **SDRAM** = Synchronous DRAM (in step with the clock).
> - **DDR2** = Double Data Rate 2 (data on both clock edges).
> - **DRAM** needs refreshing (capacitors leak); **SRAM** uses flip-flops (no refresh, faster).
> - **IRET** = Interrupt RETurn.

# instr
S: 📜 What is an instruction?
> An instruction has two parts:
> - **Opcode** → *what* to do (ADD, LOAD, JUMP)
> - **Operand/address** → *where* the data is
> An n-bit opcode allows **2ⁿ** different instructions (7 bits → 128).
S: Types of instructions
> - **Data transfer**: MOV, LOAD, STORE
> - **Arithmetic/logic**: ADD, SUB, AND
> - **Program control (branch)**: JMP, CALL, RET
> - **Input/output**: IN, OUT
S: How many addresses?
> - **3-address**: ADD R1, R2, R3
> - **2-address**: ADD R1, R2
> - **1-address**: ADD X (uses a hidden **accumulator**)
> - **0-address**: ADD (operands on a **stack**)
> 💡 Fewer addresses → shorter instructions, but more of them.
S: RISC vs CISC
> - **RISC**: few simple, fixed-length instructions, load/store design, many registers, easy to pipeline.
> - **CISC**: many complex, variable-length instructions, microprogrammed.
> 💡 RISC = "do simple things very fast".

# addr
S: 📍 Addressing modes — where is the data?
> The **addressing mode** tells the CPU how to find the operand.
> The final memory address used is called the **effective address (EA)**.
> 💡 Like directions: "here it is", "go to house 5", or "house 5 has a note telling you where to go".
S: The simple ones
> - **Immediate**: data is **inside the instruction** (MOV A, #5) — fastest.
> - **Direct**: instruction holds the **address** of the data — simplest mode that goes to memory.
> - **Register**: data is in a **register** (like direct, but for registers).
> - **Implied**: the opcode itself implies the operand (CMA = complement accumulator).
S: The indirect ones
> - **Indirect**: the instruction points to memory that holds the **address** → 2 memory trips.
> - **Register indirect**: a register holds the address (MOV A, @R0).
> - **Auto-increment**: register indirect + the register moves on → great for arrays.
S: Displacement — the powerful one
> **EA = A + (R)** (address field + a register).
> - Register = **PC** → **relative** addressing (used for branches)
> - Register = base register → **base** addressing
> - Register = index register → **indexed** addressing (arrays)
> 💡 That's why displacement is called very powerful/influential.

# pipe
S: 🏭 Pipelining = assembly line
> Instead of finishing one instruction before starting the next, the CPU **overlaps** them in stages: Fetch, Decode, Execute, Memory, Write-back.
> 💡 Like a laundry: while one load dries, the next one washes.
> It increases **throughput** (more instructions per second), not the speed of a single instruction.
S: The timing formula
> For **k** stages and **n** instructions:
> - Pipelined time = **(k + n − 1)** cycles
> - Non-pipelined = **n × k** cycles
> - Speed-up = nk / (k + n − 1) → close to **k** for large n
> Example: 5 stages, 100 instructions → 104 cycles.
S: Hazards — things that stall the pipeline
> - **Structural**: two instructions need the same hardware at once.
> - **Data**: an instruction needs a result that isn't ready yet (**RAW** = true dependency).
> - **Control**: a branch — we don't know the next instruction yet.
S: Fixing hazards
> - Data → **forwarding (bypassing)** or stalls.
> - Control → **branch prediction**, delayed branch.
> - Structural → duplicate resources (separate instruction/data caches).
> Cycle time = slowest stage + latch delay.

# memory
S: 🏔️ The memory pyramid
> Fast memory is small and costly; big memory is slow and cheap:
> **Registers → Cache → Main memory (RAM) → Disk**
> Going down: bigger, slower, cheaper per bit.
> 💡 Keep what you use most closest to you — like books on your desk vs in the library.
S: Why caches work — locality
> - **Temporal locality**: you'll use the same thing again soon (a loop variable).
> - **Spatial locality**: you'll use nearby things soon (array elements in order).
> **Hit** = found in cache. **Miss** = go to main memory. Hit ratio = hits / total.
S: Cache mapping — where does a block go?
> - **Direct**: each block has exactly **one** place: line = block mod (number of lines). No replacement choice needed.
> - **Fully associative**: a block can go **anywhere**.
> - **Set-associative**: anywhere inside **one set** (sets = lines ÷ ways).
> 💡 Example: 64 lines, block 200 → line 200 mod 64 = **8**.
S: Average access time & writing
> Average time = h·Tcache + (1 − h)·(Tcache + Tmemory) (hierarchical).
> Example: h = 0.9, cache 10 ns, memory 100 ns → **20 ns**.
> - **Write-through**: update cache and memory together.
> - **Write-back**: update memory only when the block is replaced (dirty bit).

# vm
S: 🪄 Virtual memory — the illusion of more RAM
> Programs can be **bigger than the real RAM**. Only the parts in use are kept in RAM; the rest wait on disk.
> 💡 Like a small desk with a big cupboard: keep only today's books on the desk.
S: Pages and frames
> Memory is cut into equal pieces:
> - Program side: **pages**
> - RAM side: **frames**
> The **page table** says which page is in which frame. The **MMU** does this translation in hardware.
> 32-bit address with 4 KB pages → 2²⁰ pages.
S: TLB and page faults
> - **TLB**: a tiny fast cache of recent page-table entries → fast translation.
> - **Page fault**: the page isn't in RAM → the OS loads it from disk (slow!).
> - **Thrashing**: so many page faults that the CPU does little real work.

# io
S: 🖨️ Talking to devices
> The CPU must move data to/from keyboards, disks and printers. Three ways:
> - **Programmed I/O**: CPU keeps checking ("Are you ready?") — wastes time.
> - **Interrupt-driven I/O**: device taps the CPU on the shoulder when ready.
> - **DMA**: a helper moves whole blocks without the CPU.
S: DMA — Direct Memory Access
> The CPU only **sets up** the transfer (address, count, direction). The **DMA controller** then uses the bus to copy data directly between device and memory, and **interrupts** the CPU when done.
> - **Cycle stealing**: one word at a time
> - **Burst mode**: the whole block at once
S: Interrupts
> On an interrupt the CPU **finishes the current instruction**, saves the PC and status, runs the **service routine (ISR)**, then returns with **IRET**.
> - **Vectored**: the device tells the CPU where its ISR is.
> - **NMI**: non-maskable — can't be ignored (power failure).
S: Who goes first? Priority
> A **priority interrupt** system decides which request to serve first.
> - **Polling** (software): check devices one by one in priority order.
> - **Daisy chaining** (hardware): devices in a line; the one **closest to the CPU** wins.

# raid
S: 💽 RAID — many disks acting as one
> **RAID = Redundant Array of Independent Disks.** Combine disks for **speed** (striping), **safety** (mirroring/parity), or both.
> 💡 Striping = split a file across disks; mirroring = keep a copy; parity = a clever checksum to rebuild a lost disk.
S: The levels in one line each
> - **RAID 0**: striping, **no redundancy** (fast, risky)
> - **RAID 1**: **mirroring** (copy on 2 disks)
> - **RAID 2**: Hamming code (old)
> - **RAID 3**: byte striping + 1 parity disk
> - **RAID 4**: block striping + **1 dedicated parity disk** (bottleneck)
> - **RAID 5**: block striping + **distributed parity** (survives 1 failure)
> - **RAID 6**: **double** parity (survives 2 failures)
> - **RAID 10**: mirror + stripe
S: Capacity quick maths
> - RAID 5 with n disks → usable **(n − 1)** disks
> - RAID 6 → **(n − 2)** disks
> - RAID 1 → half the total
> Example: 5 × 2 TB in RAID 5 → **8 TB** usable.
