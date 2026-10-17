@subject dlco | Digital Logic & Computer Organization | 🔌
@order 1
@desc Boolean algebra, combinational & sequential logic, instructions, addressing, pipelining, memory, I/O, RAID

# boolean | Boolean Functions & K-Map Simplification
N: n variables → **2ⁿ minterms** (and 2ⁿ maxterms). 2 vars → 4, 3 vars → 8, 4 vars → 16.
N: **Minterm** = AND term containing every variable once (true for exactly one input row). **Maxterm** = OR term (false for exactly one row).
N: **SOP** = sum of minterms Σm(...). **POS** = product of maxterms ΠM(...). Σm and ΠM of a function use complementary index lists.
N: K-map cells are labelled in **Gray code** (00, 01, 11, 10) so adjacent cells differ in one bit.
N: K-map groups must be powers of 2 (1, 2, 4, 8…), rectangular, and may wrap around edges. Bigger groups = simpler terms.
N: **Quine–McCluskey (tabulation) method**: function is given as a list of minterm numbers (decimal integers); group by number of 1s, combine terms differing in one bit → prime implicants.
N: **Absorption**: X + XY = X, X(X + Y) = X. So X + XY' + XY'Z = X (needs zero gates).
N: **De Morgan**: (A·B)' = A' + B', (A + B)' = A'·B'.
N: NAND and NOR are **universal gates** — any function can be built from only NAND or only NOR.
N: A **don't-care (X)** can be treated as 1 or 0, whichever gives a bigger group.

Q: How many minterms can be formed with two variable inputs
- Eight minterms ~~ 8 = 2³, that is for three variables.
- Six minterms ~~ Not a power of 2 — impossible.
- Five minterms ~~ Not a power of 2 — impossible.
* Four minterms ~~ 2 variables → 2² = 4 minterms (A'B', A'B, AB', AB).
H: Minterms = 2ⁿ. Two variables → 4.
P: PYQ

Q: How many minterms can be formed with three input variables?
- 3 ~~ That is the number of variables, not combinations.
- 6 ~~ Not a power of 2.
* 8 ~~ 2³ = 8 minterms (m0 to m7).
- 9 ~~ 3² is wrong — it is 2ⁿ, not n².
H: 2ⁿ: 3 vars → 8.

Q: A 4-variable K-map contains how many cells?
- 4 ~~ That is the number of variables.
- 8 ~~ That is a 3-variable map.
* 16 ~~ 2⁴ = 16 cells, one per minterm.
- 32 ~~ That would be a 5-variable map.
H: Cells = minterms = 2ⁿ.

Q: How many maxterms are possible for a Boolean function of 4 variables?
- 4 ~~ Number of variables, not terms.
- 8 ~~ That is for 3 variables.
* 16 ~~ Maxterms = minterms = 2ⁿ = 16.
- 64 ~~ Too many; 2⁶ would need 6 variables.
H: Maxterm count = minterm count = 2ⁿ.

Q: The minterm m5 of a 3-variable function F(A,B,C) is:
- A'BC' ~~ That is 010 = m2.
* AB'C ~~ 5 = 101 → A=1, B=0, C=1 → AB'C.
- A'B'C ~~ That is 001 = m1.
- ABC' ~~ That is 110 = m6.
H: Write the index in binary: 1 → plain variable, 0 → complemented.

Q: In tabulation method how the procedures is started to specify the function in terms of
- List of minterms ~~ Close, but the bank key wants "integers" — minterms are listed as their decimal numbers.
- List of maxterms ~~ Tabulation works on minterms, not maxterms.
* List of integers ~~ The Quine–McCluskey method starts from the minterm numbers written as decimal integers, e.g. Σm(0,1,3,7).
- List of terms ~~ Too vague.
H: Quine–McCluskey starts from the minterm NUMBERS (integers) → binary → group by count of 1s.
F: Textbooks say the function is given as a "list of minterms". The question bank marks "List of integers" because those minterms are written as decimal numbers. Pick "List of integers" if this exact question comes up.
P: PYQ

Q: In the Quine–McCluskey method, minterms are first grouped according to:
- Their decimal value ~~ Decimal value is not the grouping rule.
* The number of 1s in their binary representation ~~ Terms can only combine if their 1-counts differ by exactly one.
- The number of 0s in the variables ~~ Grouping is by the count of 1s.
- Their position in the K-map ~~ Tabulation does not use a map at all.
H: QM grouping = "count the 1s".

Q: The Quine–McCluskey method is preferred over K-maps mainly because it:
- Always gives fewer gates ~~ Both give a minimal SOP; the result is not guaranteed smaller.
* Is systematic and works well for many variables (computer friendly) ~~ K-maps get impractical beyond 5–6 variables; tabulation is algorithmic.
- Uses maxterms only ~~ It normally works with minterms.
- Does not need prime implicants ~~ Its whole aim is finding prime implicants.
H: QM = tabular + algorithmic → good for many variables.

Q: What labelling code is carried in the K-map
- 8-4-2-1 binary ~~ Plain binary order (00,01,10,11) breaks adjacency.
- Hexadecimal ~~ Not used for map labels.
* Gray ~~ K-map rows and columns use Gray code (00,01,11,10) so neighbouring cells differ in exactly one bit.
- Octal ~~ Not used for map labels.
H: K-map = Gray code labels → adjacent cells differ by 1 bit.
P: PYQ

Q: The column order of a 2-variable side of a K-map is:
- 00, 01, 10, 11 ~~ That is binary order; 01 and 10 differ in two bits.
* 00, 01, 11, 10 ~~ Gray-code order — each step changes only one bit.
- 00, 10, 01, 11 ~~ Not a valid one-bit-change sequence.
- 11, 10, 01, 00 ~~ Descending binary — not Gray order.
H: K-map order: 00-01-11-10 ("zero-one-eleven-ten").

Q: In a K-map, a group (loop) of adjacent 1s must contain:
- Any number of cells ~~ Groups must be powers of 2.
* 1, 2, 4, 8 … cells (a power of 2) ~~ Only power-of-2 rectangles eliminate whole variables.
- Only even numbers of cells ~~ 6 is even but not allowed.
- Exactly 4 cells ~~ Pairs, octets and singles are also allowed.
H: Groups = 1, 2, 4, 8, 16 — powers of 2 only.

Q: Grouping 4 adjacent 1s (a quad) in a K-map eliminates how many variables?
- 1 ~~ A pair eliminates 1 variable.
* 2 ~~ 4 = 2² → 2 variables drop out.
- 3 ~~ An octet (8 = 2³) eliminates 3.
- 4 ~~ That would need a 16-cell group.
H: Group of 2ᵏ cells eliminates k variables.

Q: The minimum number of NAND gates required to implement the Boolean function X+XY’+XY’Z is
- one ~~ No gate is needed at all.
- Two ~~ No gate is needed at all.
- Three ~~ No gate is needed at all.
* None of the options ~~ By absorption X + XY' + XY'Z = X, so the output is just wire X — zero gates.
H: Absorption: X + X(anything) = X → 0 gates.
P: PYQ

Q: The Boolean expression A + AB simplifies to:
* A ~~ Absorption law: A(1 + B) = A.
- B ~~ B alone is not equivalent (A=1, B=0 gives 1).
- AB ~~ AB is 0 when B=0, but the original is 1 if A=1.
- A + B ~~ That is A + A'B, not A + AB.
H: A + AB = A (absorption).

Q: The expression A(A + B) simplifies to:
- B ~~ Not equivalent.
- A + B ~~ Not equivalent.
* A ~~ AA + AB = A + AB = A (absorption).
- AB ~~ Not equivalent.
H: A(A + B) = A — the dual of A + AB = A.

Q: The expression A + A'B simplifies to:
- A ~~ Loses the case A=0, B=1.
- B ~~ Loses the case A=1, B=0.
* A + B ~~ Redundancy theorem: A + A'B = A + B.
- AB ~~ Too restrictive.
H: A + A'B = A + B.

Q: Which law gives (A + B)' = A'·B'?
- Distributive law ~~ That is A(B + C) = AB + AC.
* De Morgan's theorem ~~ Break the bar, change the sign: (A+B)' = A'B'.
- Absorption law ~~ That is A + AB = A.
- Commutative law ~~ That is A + B = B + A.
H: De Morgan: "break the bar, change the sign".

Q: Which gates are called universal gates?
- AND and OR ~~ Cannot make NOT on their own.
* NAND and NOR ~~ Each one alone can build NOT, AND and OR — so any circuit.
- XOR and XNOR ~~ Cannot build every function alone.
- NOT and AND ~~ Together they are complete, but they are not called "universal gates".
H: NAND/NOR = universal.

Q: A "don't care" condition in a K-map can be treated as:
- Always 1 ~~ It is only used as 1 when that helps.
- Always 0 ~~ It is only used as 0 when that helps.
* Either 0 or 1, whichever gives a simpler expression ~~ Don't-cares can be included in groups only if they make groups bigger.
- An error condition ~~ They are input combinations that never occur or don't matter.
H: Don't care = "wildcard" — use it only if it helps.

# comb | Combinational Logic: Adders, Encoders, Decoders, MUX
N: **Combinational circuit**: output depends only on present inputs (no memory). Examples: adder, subtractor, MUX, DEMUX, encoder, decoder, comparator.
N: **Half adder**: Sum = A ⊕ B, Carry = A·B. **Full adder**: Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B). A full adder = 2 half adders + 1 OR gate.
N: **Half subtractor**: Diff = A ⊕ B, Borrow = A'B. **Full subtractor**: Diff = A ⊕ B ⊕ Bin.
N: **Decoder**: n inputs → 2ⁿ outputs (one output active per binary code). A 1-of-32 decoder can be built from four 3-to-8 decoders (plus a 2-to-4 to enable them).
N: **Encoder**: 2ⁿ inputs → n outputs (reverse of decoder). **Priority encoder** encodes the highest-priority active input.
N: **MUX** (data selector): 2ⁿ data inputs, n select lines, 1 output. **DEMUX**: 1 input → one of 2ⁿ outputs.
N: **Parity** is generated/checked with **XOR/XNOR** gates (XOR of all bits = 1 when an odd number of 1s).
N: **Magnitude comparator** outputs A>B, A=B, A<B — exactly one of them is 1 at a time.
N: To choose 1 of N items you need ⌈log₂N⌉ bits/switches. 8 doors → 3 switches.

Q: Which statement below best describes the function of a decoder?
- A decoder will convert a decimal number into the proper binary equivalent ~~ That is an encoder (decimal-to-BCD encoder).
* A decoder will convert a binary number into a specific output representing a particular character or digit. ~~ A decoder activates one specific output line for each binary input code.
- Decoders are used to prevent improper operation of digital systems. ~~ Not their function.
- Decoders are special ICs that are used to make it possible for one brand of computer to talk to another. ~~ That describes an interface/protocol converter.
H: DEcoder = binary code IN → one specific line OUT.
P: PYQ

Q: A decoder with n input lines has at most how many output lines?
- n ~~ That is the input count.
- 2n ~~ Linear growth is wrong.
* 2ⁿ ~~ Each of the 2ⁿ input codes selects its own output line.
- n² ~~ Not the decoder rule.
H: Decoder: n → 2ⁿ.

Q: To design 1-of-32 decoder how many 3-to-8-line decoders are required?
- 1 ~~ One gives only 8 outputs.
- 2 ~~ Two give only 16 outputs.
* 4 ~~ 32 ÷ 8 = 4 decoders (their enables are driven by a 2-to-4 decoder from the top 2 bits).
- 8 ~~ That would give 64 outputs.
H: Outputs needed ÷ outputs per chip = 32/8 = 4.
P: PYQ

Q: How many 2-to-4 line decoders are needed to build a 4-to-16 decoder (using only 2-to-4 decoders)?
- 2 ~~ Gives only 8 outputs.
- 4 ~~ Four provide the 16 outputs but you still need one to enable them.
* 5 ~~ Four 2-to-4 decoders give 16 outputs + one more 2-to-4 decoder selects which one is enabled.
- 8 ~~ Too many.
H: 16/4 = 4 output decoders + 1 selector decoder = 5.

Q: How many 3-to-8 decoders are needed to make a 4-to-16 decoder (with enable inputs)?
- 1 ~~ Only 8 outputs.
* 2 ~~ 16/8 = 2; the 4th input bit enables one or the other.
- 4 ~~ Would give 32 outputs.
- 3 ~~ Not needed.
H: 16 outputs ÷ 8 per decoder = 2.

Q: Which device converts 2ⁿ input lines into an n-bit binary code?
- Decoder ~~ Decoder does the opposite (n → 2ⁿ).
* Encoder ~~ An encoder produces the binary code of the active input line.
- Demultiplexer ~~ DEMUX routes one input to many outputs.
- Comparator ~~ Compares two numbers.
H: ENcoder ENcodes many lines → few bits.

Q: In a priority encoder, if two inputs are active at the same time:
- Output is invalid ~~ That is the problem priority encoders solve.
* The input with the higher priority is encoded ~~ The priority logic ignores lower-priority inputs.
- Both are encoded ~~ The output can show only one code.
- Output becomes zero ~~ Not the defined behaviour.
H: Priority encoder = "highest wins".

Q: Consider, there are 8 doors in an automated cinema theatre. Minimum, How many number of On/Off switches are required to open any doors using digital circuit?
- 1 ~~ One switch selects only 2 doors.
- 2 ~~ Two switches select only 4 doors.
* 3 ~~ 3 switches give 2³ = 8 combinations — feed them to a 3-to-8 decoder.
- 4 ~~ 4 switches would handle 16 doors.
H: Switches = log₂(doors) = log₂8 = 3.
P: PYQ

Q: A building has 16 lifts to be selected using a binary code. Minimum number of select lines needed?
- 2 ~~ Gives only 4 combinations.
- 3 ~~ Gives only 8 combinations.
* 4 ~~ 2⁴ = 16.
- 16 ~~ That would be one line per lift (not binary coded).
H: log₂16 = 4.

Q: A multiplexer with 4 select lines can have how many data inputs?
- 4 ~~ That is the select-line count.
- 8 ~~ That needs 3 select lines.
* 16 ~~ 2⁴ = 16 data inputs.
- 32 ~~ That needs 5 select lines.
H: MUX inputs = 2^(select lines).

Q: A 32:1 multiplexer needs how many select lines?
- 4 ~~ Selects only 16 inputs.
* 5 ~~ 2⁵ = 32.
- 6 ~~ Selects 64 inputs.
- 32 ~~ That is the input count.
H: Select lines = log₂(inputs).

Q: A multiplexer is also called a:
* Data selector ~~ It selects one of many inputs to send to a single output.
- Data distributor ~~ That is a demultiplexer.
- Encoder ~~ Different function.
- Comparator ~~ Different function.
H: MUX = many → 1 (selector). DEMUX = 1 → many (distributor).

Q: A demultiplexer:
- Has many inputs and one output ~~ That is a MUX.
* Has one input and routes it to one of many outputs ~~ Select lines decide which output gets the data.
- Converts binary to decimal ~~ That is a decoder.
- Adds two bits ~~ That is an adder.
H: DEMUX = distributor (1 → many).

Q: Which one of the following set of gates are best suited for 'parity' checking and 'parity' generation.
- AND, OR, NOT gates ~~ Possible but clumsy; not the standard choice.
* EX-NOR or EX-OR gates ~~ XOR output is 1 when the number of 1s is odd — exactly what parity needs.
- NAND gates ~~ Universal, but XOR is the natural parity gate.
- NOR gates ~~ Universal, but XOR is the natural parity gate.
H: Parity = XOR chain (odd number of 1s → 1).
P: PYQ

Q: The output of an XOR gate is 1 when:
- Both inputs are 1 ~~ 1 ⊕ 1 = 0.
- Both inputs are 0 ~~ 0 ⊕ 0 = 0.
* The inputs are different ~~ XOR = "exclusive": 1 only for 01 or 10.
- At least one input is 1 ~~ That is OR.
H: XOR = "different → 1".

Q: The even-parity bit for the data 1011001 is:
* 0 ~~ 1+0+1+1+0+0+1 = four 1s, already even → parity bit 0.
- 1 ~~ That would make five 1s (odd) — that's the odd-parity bit.
- Depends on the word length ~~ Parity depends only on the count of 1s.
- Cannot be found ~~ Just count the 1s.
H: Even parity: total count of 1s (data + parity) must be even.

Q: The Sum output of a half adder is given by:
- A·B ~~ That is the Carry.
* A ⊕ B ~~ Sum is 1 when exactly one input is 1.
- A + B ~~ OR gives 1 for 1+1 too, but the sum bit should be 0 there.
- (A·B)' ~~ That is NAND.
H: Half adder: Sum = XOR, Carry = AND.

Q: The Carry output of a half adder is:
* A·B ~~ Carry is 1 only when both bits are 1.
- A ⊕ B ~~ That is the Sum.
- A + B ~~ OR gives carry for 0+1 — wrong.
- A'B ~~ That is the half-subtractor Borrow.
H: Carry = AND.

Q: A full adder can be built using:
- One half adder ~~ Cannot handle the carry-in.
* Two half adders and one OR gate ~~ First HA adds A+B, second adds Cin; OR combines the two carries.
- Two OR gates ~~ No sum logic.
- Three XOR gates only ~~ No carry logic.
H: FA = 2 HA + 1 OR.

Q: The Sum of a full adder is:
- A ⊕ B ~~ Ignores carry-in.
* A ⊕ B ⊕ Cin ~~ Odd number of 1s among the three inputs → Sum = 1.
- AB + BCin + ACin ~~ That is the Carry-out (majority function).
- A + B + Cin ~~ OR is not sum.
H: FA Sum = XOR of all three; Carry = majority.

Q: In a half subtractor (A − B), the Borrow output is:
- A·B ~~ That is half-adder carry.
* A'·B ~~ Borrow is needed only when A = 0 and B = 1.
- A ⊕ B ~~ That is the Difference.
- A + B' ~~ Not the borrow.
H: Borrow = A'B ("0 minus 1 needs a borrow").

Q: The output Y of a Two-bit comparator is logic “1” whenever the two-bit input “A” is greater than the two-bit input “B”. The number of combination for which the output is logic “1” is
- 2 ~~ Too few.
- 4 ~~ Too few.
* 6 ~~ 16 pairs total, 4 have A = B, the remaining 12 split evenly: A > B in 6.
- 8 ~~ Too many.
H: n-bit A>B count = (4ⁿ − 2ⁿ)/2 → for n=2: (16−4)/2 = 6.
P: PYQ

Q: For a 2-bit magnitude comparator, how many input combinations give A = B?
- 2 ~~ Too few.
* 4 ~~ A=B for 00/00, 01/01, 10/10, 11/11.
- 6 ~~ That is the count for A > B.
- 8 ~~ Too many.
H: Equal pairs = 2ⁿ (here 4).

Q: For a 3-bit comparator, the number of input combinations for which A > B is:
- 8 ~~ That is the equal count.
- 24 ~~ Too few.
* 28 ~~ 64 total − 8 equal = 56; half of 56 = 28.
- 32 ~~ Too many.
H: (4ⁿ − 2ⁿ)/2 → (64 − 8)/2 = 28.

Q: What are the output values of the 4-bit comparator when the two input binary numbers are given as A = 1011 and B = 1010.
- A > B = 1, A < B = 0, A < B = 1 ~~ Lists A<B twice with contradicting values.
- A > B = 0, A < B = 1, A = B = 0 ~~ A (11) is bigger than B (10).
* A > B = 1, A < B = 0, A = B = 0 ~~ 1011 = 11 > 1010 = 10, so only the A>B output is 1.
- A > B = 0, A < B = 1, A = B = 1 ~~ Two outputs can never be 1 together.
H: Comparator: exactly ONE of >, =, < is high.
P: PYQ

Q: A 4-bit comparator receives A = 0110 and B = 0111. The outputs are:
- A>B = 1, A=B = 0, A<B = 0 ~~ 6 is not greater than 7.
- A>B = 0, A=B = 1, A<B = 0 ~~ They are not equal.
* A>B = 0, A=B = 0, A<B = 1 ~~ 0110 = 6 < 0111 = 7.
- A>B = 1, A=B = 0, A<B = 1 ~~ Only one output can be 1.
H: Convert to decimal and compare: 6 < 7.

Q: Which of the following is a combinational circuit?
- Flip-flop ~~ Has memory (sequential).
- Counter ~~ Built from flip-flops (sequential).
* Multiplexer ~~ Output depends only on current inputs.
- Shift register ~~ Sequential.
H: Combinational = no memory: adder, MUX, decoder, comparator.

# seq | Sequential Logic: Latches, Flip-Flops & Counters
N: **Sequential circuit**: output depends on present inputs **and** past state (has memory). Built from latches/flip-flops.
N: **SR latch** (active-HIGH): S=1,R=0 → SET (Q=1); S=0,R=1 → RESET (Q=0); S=0,R=0 → **no change (hold)**; S=1,R=1 → invalid.
N: **JK flip-flop**: J=K=0 hold, J=1,K=0 set, J=0,K=1 reset, **J=K=1 toggle**. Toggling halves the frequency (20 kHz clock → 10 kHz output).
N: **D flip-flop**: Q follows D when enabled/clocked (Q⁺ = D). **T flip-flop**: T=1 toggles.
N: **Master–slave**: master is enabled when the clock is **HIGH**, slave when the clock is LOW. Fixes the race-around problem.
N: **Ones catching**: a master–slave JK can wrongly "catch" a glitch (unwanted 1) on J or K while the clock is HIGH.
N: **Race-around**: in a level-triggered JK with J=K=1, the output toggles many times while the clock is HIGH. Fixed by master–slave or edge triggering.
N: A **MOD-N counter** needs **⌈log₂N⌉ flip-flops**. MOD-32 → 5, divide-by-128 → 7. n flip-flops divide the frequency by up to 2ⁿ.
N: **Asynchronous (ripple) counter**: clock goes only to the first flip-flop, so delays add up. **Synchronous counter**: clock goes to **all stages at the same time** → no ripple delay.

Q: What was the JK levels to toggle the switch?
- J = 0, K = 0 ~~ That is the hold (no change) state.
- J = 1, K = 0 ~~ That sets Q = 1.
- J = 0, K = 1 ~~ That resets Q = 0.
* J = 1, K = 1 ~~ J = K = 1 makes Q flip on every clock edge (toggle).
H: JK: 00 hold, 10 set, 01 reset, 11 toggle.
P: PYQ

Q: In a JK flip-flop, J = 0 and K = 0 on a clock edge results in:
* No change in output ~~ 00 = hold/memory state.
- Output set to 1 ~~ That needs J=1, K=0.
- Output reset to 0 ~~ That needs J=0, K=1.
- Output toggles ~~ That needs J=K=1.
H: JK 00 = "do nothing".

Q: With J = 1 and K = 0, a JK flip-flop on the clock edge will:
- Toggle ~~ Toggle needs J = K = 1.
* Set (Q = 1) ~~ J is the "set" input.
- Reset (Q = 0) ~~ That needs K = 1, J = 0.
- Stay unchanged ~~ That needs J = K = 0.
H: J = Jump to 1, K = Kill to 0.

Q: Which flip-flop is obtained by connecting the J and K inputs of a JK flip-flop together?
- D flip-flop ~~ D needs K = J'.
* T flip-flop ~~ J = K = T: T=0 holds, T=1 toggles.
- SR flip-flop ~~ JK is already an improved SR.
- Master–slave flip-flop ~~ That is a construction, not this connection.
H: Tie J and K → T (toggle) flip-flop.

Q: A D flip-flop can be made from a JK flip-flop by:
- Connecting J and K together ~~ That gives a T flip-flop.
* Connecting D to J and D' (through a NOT gate) to K ~~ Then J and K are always opposite → Q follows D.
- Grounding K ~~ Then it can only set, never reset.
- Connecting J to Q ~~ Not a D conversion.
H: D from JK: J = D, K = D'.

Q: In a J-K flip-flop if the clock input frequency is 20kHz what is the output at Q
- constantly LOW ~~ In toggle mode Q keeps changing.
- constantly HIGH ~~ In toggle mode Q keeps changing.
- a 20 kHz square wave ~~ Q changes once per clock cycle, so a full Q cycle takes two clock cycles.
* a 10 kHz square wave ~~ With J = K = 1 (toggle mode), Q flips once per clock, which halves the frequency: 20/2 = 10 kHz.
H: Toggle flip-flop = divide by 2.
F: The question assumes the JK is in toggle mode (J = K = 1), as the bank key expects.
P: PYQ

Q: A clock of 64 kHz is applied to three toggle flip-flops connected in series (ripple). The output frequency of the last flip-flop is:
- 32 kHz ~~ That is after one flip-flop.
- 16 kHz ~~ That is after two.
* 8 kHz ~~ Each flip-flop divides by 2: 64/2³ = 8 kHz.
- 21.3 kHz ~~ It divides by 2 each stage, not 3 overall.
H: n toggle stages → f / 2ⁿ.

Q: Four T flip-flops in a ripple chain divide the input frequency by:
- 4 ~~ That would be two stages.
- 8 ~~ That would be three stages.
* 16 ~~ 2⁴ = 16.
- 32 ~~ That would be five stages.
H: Divide ratio = 2ⁿ.

Q: The phenomenon of interpreting unwanted signals on J and K while Cp (clock pulse) is HIGH is called ________.
- parity error checking ~~ Unrelated to flip-flop timing.
* ones catching ~~ A pulse-triggered master–slave JK "catches" a glitch (an unwanted 1) on J/K during the HIGH clock.
- digital discrimination ~~ Not a standard term.
- digital filtering ~~ Not this effect.
H: Glitch caught while clock HIGH = "ones catching".
P: PYQ

Q: The race-around condition occurs in a level-triggered JK flip-flop when:
- J = 0, K = 0 ~~ Output holds; nothing races.
- J = 1, K = 0 ~~ Output simply sets.
* J = 1, K = 1 and the clock pulse is wider than the propagation delay ~~ The output keeps toggling many times while the clock stays HIGH.
- The clock is LOW ~~ A level-triggered flip-flop is idle when the clock is LOW.
H: Race-around = JK=11 + long HIGH clock → many toggles.

Q: The race-around problem is eliminated by using:
- An SR latch ~~ Still level-sensitive.
* A master–slave or edge-triggered flip-flop ~~ Output can change only once per clock pulse.
- A faster clock with wider pulses ~~ Wider pulses make it worse.
- A D latch ~~ A D latch has no toggle mode, but it isn't the fix for JK.
H: Fix race-around → master–slave / edge triggering.

Q: How the master is enabled in master-slave flip-flop?
- when the gate is LOW ~~ That enables the slave.
* when the gate is HIGH ~~ Master accepts inputs while the clock is HIGH; the slave copies it when the clock goes LOW.
- both LOW and HIGH ~~ Then master and slave would be transparent together.
- None of the options ~~ A correct option is given.
H: Master = HIGH, Slave = LOW.
P: PYQ

Q: In a master–slave flip-flop, the slave is enabled when the clock is:
* LOW ~~ The slave copies the master's state on the LOW phase (inverted clock).
- HIGH ~~ That phase enables the master.
- Both LOW and HIGH ~~ Then it would be transparent.
- Never ~~ It must be enabled to pass data out.
H: Master listens on HIGH, slave speaks on LOW.

Q: If an active-HIGH S-R latch has a 0 on the S input and a 1 on the R input and then the R input goes to 0, the latch will be ________.
- SET ~~ Nothing set it; S stayed 0.
* RESET ~~ S=0,R=1 resets Q=0; then S=0,R=0 is the hold state, so it stays RESET.
- Clear ~~ Not the standard latch-state term here.
- Invalid ~~ Invalid is S = R = 1.
H: SR 00 = hold whatever was last → stays RESET.
P: PYQ

Q: An active-HIGH S-R latch has S = 1, R = 0. Then S returns to 0 (R stays 0). The latch is:
* SET ~~ S=1 set Q=1; S=R=0 then holds it.
- RESET ~~ Nothing reset it.
- Invalid ~~ Invalid needs S = R = 1.
- Toggling ~~ SR latches do not toggle.
H: 00 holds the last state.

Q: For an active-HIGH S-R latch, the invalid (forbidden) input condition is:
- S = 0, R = 0 ~~ That is hold.
- S = 1, R = 0 ~~ That is set.
- S = 0, R = 1 ~~ That is reset.
* S = 1, R = 1 ~~ Both Q and Q' would be forced to 0 — not complementary, so invalid.
H: Active-HIGH SR: 11 forbidden. (Active-LOW NAND latch: 00 forbidden.)

Q: For an active-LOW (NAND-based) S'-R' latch, the invalid condition is:
* S' = 0, R' = 0 ~~ Both active at once forces Q = Q' = 1.
- S' = 1, R' = 1 ~~ That is the hold state for an active-LOW latch.
- S' = 0, R' = 1 ~~ That sets it.
- S' = 1, R' = 0 ~~ That resets it.
H: Active-LOW: 00 is forbidden.

Q: Which of the following is correct for a gated D flip-flop?
- The output toggles if one of the inputs is held HIGH. ~~ D flip-flops do not toggle.
- Only one of the inputs can be HIGH at a time. ~~ That describes an SR restriction.
- The output complement follows the input when enabled. ~~ Q (not Q') follows D.
* Q output follows the input D when the enable is HIGH. ~~ A gated D latch is transparent: Q = D while enable is HIGH.
H: D = "Data/Delay" → Q copies D.
P: PYQ

Q: Which of the following is correct for a gated D-type flip-flop?
* The Q output is either SET or RESET as soon as the input goes HIGH or LOW ~~ When enabled, D = 1 sets Q and D = 0 resets Q immediately (Q follows D).
- The output complement follows the input when enabled ~~ Q, not Q', follows D.
- Only one of the inputs can be HIGH at a time ~~ D has one data input — this is an SR idea.
- The output toggles if one of the inputs is held HIGH ~~ That is T/JK behaviour.
H: Gated D: D=1 → SET, D=0 → RESET.
P: PYQ

Q: The characteristic equation of a D flip-flop is:
* Q(next) = D ~~ The next state equals the D input.
- Q(next) = D ⊕ Q ~~ That is the T flip-flop equation with T=D.
- Q(next) = JQ' + K'Q ~~ That is the JK equation.
- Q(next) = S + R'Q ~~ That is the SR equation.
H: D: Q⁺ = D. T: Q⁺ = T ⊕ Q. JK: Q⁺ = JQ' + K'Q.

Q: The characteristic equation of a T flip-flop is:
- Q(next) = T ~~ That is D.
* Q(next) = T ⊕ Q ~~ T=1 inverts Q, T=0 keeps it.
- Q(next) = T·Q ~~ Not correct.
- Q(next) = T + Q ~~ Not correct.
H: T flip-flop = XOR with the current state.

Q: To made MOD-32 binary counter how many flip-flops are required?
- 3 ~~ 3 FFs count only up to 8.
- 45 ~~ Far too many.
* 5 ~~ 2⁵ = 32 states.
- 6 ~~ 6 FFs give 64 states — more than needed.
H: MOD-N needs ⌈log₂N⌉ FFs → log₂32 = 5.
P: PYQ

Q: How many flip-flops are required to produce a divide-by-128 device?
- 1 ~~ Divides by 2 only.
- 4 ~~ Divides by 16.
- 6 ~~ Divides by 64.
* 7 ~~ 2⁷ = 128.
H: Divide-by-2ⁿ → n flip-flops. 128 = 2⁷.
P: PYQ

Q: A MOD-10 (decade) counter needs a minimum of how many flip-flops?
- 3 ~~ 3 FFs give only 8 states.
* 4 ~~ 2⁴ = 16 ≥ 10; three would give only 8.
- 5 ~~ More than needed.
- 10 ~~ Only a ring counter would use 10.
H: ⌈log₂10⌉ = 4.

Q: The maximum count of a 6-bit binary counter (starting at 0) is:
- 6 ~~ That is the bit count.
- 32 ~~ That is 2⁵.
* 63 ~~ 2⁶ − 1 = 63.
- 64 ~~ 64 is the number of states (0–63), not the maximum count.
H: Max count = 2ⁿ − 1.

Q: How many flip-flops are needed for a counter that divides the clock frequency by 64?
- 4 ~~ Divides by 16.
- 5 ~~ Divides by 32.
* 6 ~~ 2⁶ = 64.
- 8 ~~ Divides by 256.
H: 64 = 2⁶ → 6 FFs.

Q: The reason behind that the delay problems faced in asynchronous counters is eliminated by Synchronous counters :
- input clock pulses are applied only to the first and last stages ~~ That is still partly ripple.
- input clock pulses are applied only to the last stage ~~ Wrong — that's not how either works.
- input clock pulses are not used to activate any of the counter stages ~~ Every counter needs a clock.
* input clock pulses are applied simultaneously to each stage ~~ All flip-flops share one clock, so they change together — no ripple delay.
H: Synchronous = common clock to ALL stages at once.
P: PYQ

Q: In an asynchronous (ripple) counter, the clock pulse is applied to:
* Only the first flip-flop; each later stage is clocked by the previous stage's output ~~ The change "ripples" through, adding delays.
- All flip-flops simultaneously ~~ That is a synchronous counter.
- Only the last flip-flop ~~ Wrong end.
- No flip-flop ~~ A counter needs clocking.
H: Ripple = clock only the first stage; delays add up.

Q: The main disadvantage of a ripple counter is:
- It needs more flip-flops ~~ Same number of flip-flops as synchronous.
* Propagation delays accumulate, limiting the maximum speed ~~ Each stage waits for the previous one.
- It cannot count up ~~ It can count up or down.
- It needs a separate clock for each stage ~~ It uses only one clock input.
H: Ripple counter = cumulative delay → slow.

Q: A circuit whose output depends on present inputs AND past outputs is called:
- Combinational ~~ No memory.
* Sequential ~~ Has memory elements (flip-flops).
- Arithmetic ~~ Not this classification.
- Decoder ~~ That is combinational.
H: Sequential = memory.

# datarep | Data Representation & Number Codes
N: **Signed n-bit ranges**: sign-magnitude and **1's complement → −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1)** (two zeros). **2's complement → −2ⁿ⁻¹ to +(2ⁿ⁻¹−1)**. 8-bit: 1's = −127..127, 2's = −128..127.
N: **2's complement** = invert all bits + 1. −5 in 8 bits: 00000101 → 11111010 → **11111011 = FB₁₆**.
N: **Gray code** (reflected binary code): MSB is the same; each next Gray bit = XOR of adjacent binary bits. 101011 → 111110. Only one bit changes between successive values.
N: **Gray → binary**: binary bit = previous binary bit XOR current Gray bit.
N: **BCD** (8421): each decimal digit in 4 bits. 0001 0010 0110 = 126 = 1111110₂. Valid BCD digits are 0000–1001.
N: **Excess-3** = BCD + 3 (self-complementing code). Gray code and Excess-3 are **unweighted** codes.
N: **IEEE 754 single precision**: 1 sign + 8 exponent (bias 127) + 23 mantissa = 32 bits. Double: 1 + 11 (bias 1023) + 52 = 64 bits.
N: **Booth's algorithm** multiplies two signed binary numbers in 2's complement form.
N: **Overflow** in 2's complement addition happens when two numbers of the same sign give a result of the opposite sign.

Q: How '-5' is represented in hex format in 2’s complement in 8-bits?
* (FB)16 ~~ +5 = 0000 0101 → invert 1111 1010 → +1 = 1111 1011 = FB.
- (7F)16 ~~ 7F = +127.
- (FF)16 ~~ FF = −1 in 2's complement.
- (FA)16 ~~ FA = 1's complement of 5 (missing the +1).
H: 2's complement = invert + 1. −5 → FB.
P: PYQ

Q: The 8-bit 2's complement representation of −1 in hexadecimal is:
- 81 ~~ That is −1 in sign-magnitude.
- FE ~~ That is −1 in 1's complement.
* FF ~~ 0000 0001 → 1111 1110 + 1 = 1111 1111.
- 7F ~~ That is +127.
H: −1 is always all 1s in 2's complement.

Q: The 8-bit 2's complement of −12 is:
- 1000 1100 ~~ That is sign-magnitude.
- 1111 0011 ~~ That is 1's complement (missing +1).
* 1111 0100 ~~ 12 = 0000 1100 → invert 1111 0011 → +1 = 1111 0100 (F4).
- 0000 1100 ~~ That is +12.
H: Invert then add 1.

Q: The 1's complement of the 8-bit number 0101 1010 is:
* 1010 0101 ~~ Simply invert every bit.
- 1010 0110 ~~ That is the 2's complement.
- 0101 1010 ~~ That is the original.
- 1111 1111 ~~ Not related.
H: 1's complement = just flip bits.

Q: A computer has a word length of 8 bits (including sign). It is required to determine the range of integers that can be stored in the computer. If 1’s complement is used to represent the numbers, then the range will be
- -256 to 256 ~~ Needs 9+ bits.
- -256 to 255 ~~ That is a 9-bit 2's complement range.
* -127 to 127 ~~ 1's complement: −(2⁷−1) to +(2⁷−1); it has two zeros (+0 and −0).
- -128 to 127 ~~ That is 2's complement.
H: 1's comp: ±(2ⁿ⁻¹−1). 2's comp: −2ⁿ⁻¹ to 2ⁿ⁻¹−1.
P: PYQ

Q: The range of an 8-bit 2's complement number is:
- −127 to +127 ~~ That is 1's complement / sign-magnitude.
* −128 to +127 ~~ 2's complement has a single zero, so one extra negative value.
- −255 to +255 ~~ Needs 9 bits.
- 0 to 255 ~~ That is unsigned.
H: 2's comp n bits: −2ⁿ⁻¹ … +2ⁿ⁻¹−1.

Q: The range of a 16-bit sign-magnitude integer is:
* −32767 to +32767 ~~ ±(2¹⁵ − 1); it has +0 and −0.
- −32768 to +32767 ~~ That is 2's complement.
- 0 to 65535 ~~ That is unsigned.
- −65535 to +65535 ~~ Too wide.
H: Sign-magnitude = same range as 1's complement.

Q: Which representation has two representations for zero?
- 2's complement ~~ Only one zero.
* 1's complement ~~ +0 = 0000…0 and −0 = 1111…1.
- Unsigned binary ~~ Only one zero.
- Excess-127 ~~ Only one zero.
H: 1's complement (and sign-magnitude) → two zeros.

Q: Which of the following code is also known as rereflected code
- Excess-3 codes ~~ BCD + 3, self-complementing.
* Gray code ~~ Gray code is the "reflected binary code" — the list mirrors itself.
- BCD code ~~ Weighted 8421 code.
- Error code ~~ Not a standard code name.
H: Gray = Reflected binary.
P: PYQ

Q: Which property defines the Gray code?
- It is a weighted code ~~ Gray code is unweighted.
* Successive values differ in exactly one bit ~~ This is why it is used in K-maps and rotary encoders.
- It adds 3 to every BCD digit ~~ That is Excess-3.
- It has a parity bit ~~ Not part of Gray code.
H: Gray = unit-distance code.

Q: Choose the gray code form for the binary value 101011?
- 101011 ~~ That is the binary itself.
- 110101 ~~ Wrong XORs.
- 011111 ~~ MSB must stay 1.
* 111110 ~~ Keep MSB 1; then 1⊕0=1, 0⊕1=1, 1⊕0=1, 0⊕1=1, 1⊕1=0 → 111110.
H: Binary→Gray: copy MSB, then XOR each neighbouring pair.
P: PYQ

Q: The Gray code of binary 1011 is:
* 1110 ~~ 1, 1⊕0=1, 0⊕1=1, 1⊕1=0 → 1110.
- 1101 ~~ Wrong XOR sequence.
- 1011 ~~ That is the binary.
- 0111 ~~ MSB must be copied as 1.
H: Copy MSB, XOR neighbours.

Q: The Gray code 1101 converts to binary as:
- 1101 ~~ That is the Gray input.
* 1001 ~~ b3=1; b2=1⊕1=0; b1=0⊕0=0; b0=0⊕1=1 → 1001.
- 1011 ~~ Wrong.
- 0110 ~~ MSB must be 1.
H: Gray→Binary: each binary bit = previous binary bit ⊕ current Gray bit.

Q: Consider Binary coded decimal value 0001 0010 0110 . Convert the given value to binary form.
* 1111110 ~~ BCD 0001|0010|0110 = 1|2|6 = 126 = 64+32+16+8+4+2 = 1111110.
- 1111101 ~~ That is 125.
- 1111000 ~~ That is 120.
- 1111111 ~~ That is 127.
H: BCD → read each nibble as a digit → decimal → binary.
P: PYQ

Q: The BCD representation of decimal 59 is:
- 0011 1011 ~~ That is binary 59.
* 0101 1001 ~~ 5 → 0101, 9 → 1001.
- 0101 1010 ~~ 1010 is not a valid BCD digit.
- 1001 0101 ~~ Digits reversed (95).
H: BCD = one nibble per decimal digit.

Q: Which of these is an INVALID BCD code?
- 0101 ~~ Valid digit 5.
- 1001 ~~ Valid digit 9.
* 1100 ~~ 1100 = 12; BCD digits only go up to 1001 (9).
- 0000 ~~ Valid digit 0.
H: BCD valid: 0000–1001. 1010–1111 are invalid.

Q: The Excess-3 code of decimal 4 is:
- 0100 ~~ That is BCD 4.
* 0111 ~~ 4 + 3 = 7 = 0111.
- 0011 ~~ That is 3 only.
- 1000 ~~ That is 8.
H: XS-3 = BCD + 0011.

Q: In IEEE 754 single precision format, the exponent field is:
- 7 bits with bias 63 ~~ Not IEEE 754.
* 8 bits with bias 127 ~~ 1 sign + 8 exponent + 23 fraction = 32 bits.
- 11 bits with bias 1023 ~~ That is double precision.
- 23 bits ~~ That is the mantissa (fraction).
H: Single: 1-8-23, bias 127. Double: 1-11-52, bias 1023.

Q: Which algorithm is a multiplication algorithm which multiplies two signed binary numbers in 2’s complement notation
- Usual multiplication ~~ Shift-and-add works on unsigned magnitudes.
* Booth’s multiplication ~~ Booth's algorithm handles signed 2's-complement operands directly.
- Both ~~ Only Booth's is designed for signed 2's complement.
- None of these ~~ Booth's is correct.
H: Booth = signed 2's-complement multiplication.
P: PYQ

Q: In Booth's algorithm, when the current bit pair (Qᵢ, Qᵢ₋₁) is (1, 0), the multiplicand is:
- Added to the partial product ~~ That is for pair (0,1).
* Subtracted from the partial product ~~ 10 = start of a run of 1s → subtract M.
- Ignored with no shift ~~ A shift always happens.
- Doubled ~~ Not a Booth step.
H: Booth: 10 → subtract, 01 → add, 00/11 → just shift.

Q: In Booth's algorithm, bit pairs 00 and 11 cause:
- Addition of the multiplicand ~~ That is 01.
- Subtraction of the multiplicand ~~ That is 10.
* Only an arithmetic shift right ~~ Inside a run of 0s or 1s nothing is added.
- Termination ~~ The loop runs for n bits.
H: Same bits → just shift.

Q: Overflow in 2's complement addition occurs when:
- Two numbers of opposite signs are added ~~ That can never overflow.
* Two numbers of the same sign produce a result of the opposite sign ~~ E.g. +100 + +100 in 8 bits gives a negative number.
- There is a carry out of the MSB ~~ A carry out alone is not overflow in 2's complement.
- The result is zero ~~ Zero is valid.
H: Overflow = (+)+(+)=(−) or (−)+(−)=(+).

# cpu | Basic Computer Organization & Control Unit
N: **MAR** (Memory Address Register) holds the address being accessed; **MDR/DR** (Memory Data Register) holds the data being read or written. **PC** holds the address of the next instruction. **IR** holds the current instruction.
N: **Memory read**: CPU puts the address into MAR → data comes into MDR. **Memory write**: address into MAR (AR) **and** data into MDR (DR), then write.
N: The CPU supplies the location address and puts it on the **address bus**. Data moves over the **data bus**. (In this question bank the memory bus is equated with the data bus.)
N: **Instruction cycle** = full sequence the CPU performs per instruction: fetch → decode → (fetch operands) → execute → (interrupt check).
N: **Control memory** stores microinstructions (microprograms) and is usually a **ROM** inside the micro-programmed control unit.
N: **Hardwired control** = fast, built from gates (RISC). **Microprogrammed control** = flexible, microcode in control memory (CISC).
N: CPU modes: **Executive (supervisor) mode** is used while servicing interrupts / running the OS; **Task (user) mode** runs programs. Control memory addresses are divided into these 2 modes.
N: **SDRAM** = Synchronous Dynamic RAM. **DDR2** = Double Data Rate 2 (transfers data on both clock edges). **IRET** = Interrupt Return.

Q: In memory transfer location address is supplied by____ that puts this on address bus
- ALU ~~ The ALU does arithmetic, it does not drive addresses.
* CPU ~~ The CPU (via its MAR) supplies the address and places it on the address bus.
- MAR ~~ MAR is the register inside the CPU; the bank's answer is the CPU as a whole.
- MDR ~~ MDR holds data, not addresses.
H: CPU drives the address bus (from its MAR).
F: Technically the address sits in the MAR, which is part of the CPU. The bank key is "CPU"; choose CPU if this exact question appears.
P: PYQ

Q: Operation of memory transfer are
- Read ~~ Only half.
- Write ~~ Only half.
* Both Read and Write ~~ Memory transfers are reads (memory→CPU) and writes (CPU→memory).
- None ~~ Both exist.
H: Memory transfer = Read + Write.
P: PYQ

Q: In memory, the read operation puts memory address on to a register known as
- PC ~~ PC holds the next instruction's address, not every memory address.
- ALU ~~ ALU is not a register.
* MAR ~~ The Memory Address Register holds the address to be read.
- All of these ~~ Only MAR is correct.
H: MAR = Address. MDR = Data.
P: PYQ

Q: Which operation puts memory address in memory address register and data in DR
- Memory read ~~ In a read, data comes OUT of memory into DR afterwards; you don't put data in first.
* Memory write ~~ For a write, the CPU loads the address into AR/MAR and the data to be stored into DR, then writes.
- Both ~~ Only write loads data into DR beforehand.
- None ~~ Write is correct.
H: Write = address + data both loaded first.
P: PYQ

Q: Which register holds the data that has just been read from memory or is about to be written?
- MAR ~~ Holds the address.
* MDR (memory data register) ~~ The data register is the buffer between memory and CPU.
- PC ~~ Holds the next instruction's address.
- IR ~~ Holds the current instruction.
H: MDR = Data buffer.

Q: The program counter (PC) holds:
- The current instruction ~~ That is the IR.
* The address of the next instruction to be fetched ~~ PC is incremented after each fetch.
- The result of the ALU ~~ That goes to the accumulator.
- The data from memory ~~ That is MDR.
H: PC = "pointer to next instruction".

Q: The memory bus is also referred as______
* Data bus ~~ The bank treats the memory bus as the data bus that carries data between CPU and memory.
- Address bus ~~ Carries addresses only.
- Memory bus ~~ Repeats the question.
- All of these ~~ The bank expects one answer.
H: Memory bus ↔ data bus (per this question bank).
F: Strictly, a memory bus has both address and data lines. This bank's key is "Data bus".
P: PYQ

Q: Which bus is unidirectional (from CPU to memory/devices)?
* Address bus ~~ Only the CPU sends addresses.
- Data bus ~~ Data moves both ways.
- Control bus ~~ Has signals in both directions.
- All buses ~~ The data bus is bidirectional.
H: Address bus = one way. Data bus = two way.

Q: A CPU with a 16-bit address bus can directly address how much memory (byte-addressable)?
- 16 KB ~~ That is 2¹⁴.
- 32 KB ~~ That is 2¹⁵.
* 64 KB ~~ 2¹⁶ = 65,536 bytes.
- 1 MB ~~ That needs 20 address lines.
H: Addressable = 2^(address lines).

Q: ______is the sequence of operations performed by CPU in processing an instruction
- Execute cycle ~~ Just one phase.
- Fetch cycle ~~ Just one phase.
- Decode ~~ Just one phase.
* Instruction cycle ~~ The instruction cycle covers fetch, decode, execute (and interrupt check).
H: Instruction cycle = Fetch + Decode + Execute.
P: PYQ

Q: The correct order of phases in a basic instruction cycle is:
* Fetch → Decode → Execute ~~ Get the instruction, work out what it means, then do it.
- Decode → Fetch → Execute ~~ You can't decode before fetching.
- Execute → Fetch → Decode ~~ Wrong order.
- Fetch → Execute → Decode ~~ Wrong order.
H: F-D-E.

Q: During the fetch cycle, which happens first?
* Contents of PC are transferred to MAR ~~ The address of the instruction must go out first.
- Instruction is decoded ~~ Decode comes after fetch.
- ALU executes the instruction ~~ That is the execute cycle.
- Operand is stored to memory ~~ That is part of execution.
H: Fetch step 1: MAR ← PC.

Q: Control memory is part of ______ that has addressable storage registers and used as temporary storage for data
* ROM ~~ The bank expects ROM: control memory is a ROM holding microinstructions.
- RAM ~~ Control memory is normally read-only.
- CPU ~~ The bank expects the memory type, ROM.
- Memory ~~ Too generic.
H: Control memory = ROM inside the control unit.
F: The question wording is garbled. Control memory is typically a ROM inside the CPU's microprogrammed control unit. Pick ROM, as the bank does.
P: PYQ

Q: Microprograms are usually stored in
* ROM ~~ Microcode is fixed, so it is kept in ROM (control memory).
- RAM ~~ Volatile, and microcode doesn't need to change.
- SAM ~~ Sequential access memory is too slow.
- SAN ~~ Storage Area Network — unrelated.
H: Microprogram → control memory → ROM.
P: PYQ

Q: A control unit that uses microinstructions stored in control memory is called:
- Hardwired control unit ~~ Uses fixed gates, not stored microcode.
* Microprogrammed control unit ~~ Control signals come from microinstructions in control memory.
- Arithmetic unit ~~ Not a control unit.
- Pipelined unit ~~ Not a control-unit type.
H: Microprogrammed = control "program" in ROM.

Q: Compared with microprogrammed control, hardwired control is:
* Faster but less flexible ~~ Gates are fast, but any change needs redesign.
- Slower but more flexible ~~ That describes microprogrammed control.
- Slower and less flexible ~~ Hardwired is faster.
- Faster and easier to modify ~~ It is hard to modify.
H: Hardwired = fast & rigid (RISC). Microprogrammed = slower & flexible (CISC).

Q: How many modes the address in control memory are divided into?
* 2 ~~ Two modes: executive mode and task mode.
- 3 ~~ Only two modes.
- 5 ~~ Only two modes.
- 7 ~~ Only two modes.
H: 2 modes: Executive + Task.
P: PYQ

Q: Mode of addresses in control memory are:
- Executive mode ~~ Only one of the two.
- Task mode ~~ Only one of the two.
* Both Executive mode & Task Mode ~~ The two modes are executive and task.
- None of these ~~ Both exist.
H: Executive + Task.
P: PYQ

Q: which of the following is interrupt mode
- Task mode ~~ Task mode runs normal programs.
* Executive mode ~~ Interrupts are handled in executive (supervisor) mode.
- Both a & b ~~ Only executive mode services interrupts.
- None of these ~~ Executive mode is correct.
H: Interrupt → Executive/supervisor mode.
P: PYQ

Q: User application programs normally run in which mode?
- Executive mode ~~ Reserved for the OS and interrupt handling.
* Task (user) mode ~~ Normal programs run in task/user mode.
- Kernel mode ~~ Kernel = executive/supervisor mode.
- Interrupt mode ~~ That is executive mode.
H: Task = user programs, Executive = OS/interrupts.

Q: IRET stand for
- Interrupt enter ~~ Not an instruction.
* Interrupt return ~~ IRET returns from an interrupt service routine, restoring flags and PC.
- Interrupt delete ~~ Not an instruction.
- None of these ~~ Interrupt return is correct.
H: IRET = Interrupt RETurn.
P: PYQ

Q: SDRAM stand for
- System dynamic random access memory ~~ "S" is for Synchronous.
* Synchronous dynamic random access memory ~~ SDRAM is synchronised with the system clock.
- Both ~~ Only synchronous is right.
- None ~~ Synchronous DRAM is correct.
H: SDRAM = Synchronous DRAM.
P: PYQ

Q: DDR2 stands for
* Double data rate 2 ~~ Transfers data on both rising and falling clock edges.
- Data double rate 2 ~~ Words swapped.
- Dynamic data rate 2 ~~ Not the expansion.
- Dynamic double rate 2 ~~ Not the expansion.
H: DDR = Double Data Rate (both clock edges).
P: PYQ

Q: DDR memory achieves higher bandwidth because it:
- Uses a larger capacitor ~~ Not the reason.
* Transfers data on both the rising and falling edges of the clock ~~ Two transfers per clock cycle.
- Uses static cells ~~ DDR is dynamic RAM.
- Uses no clock ~~ It is synchronous.
H: Double Data Rate = 2 transfers per clock.

Q: DRAM needs periodic refreshing because:
* Data is stored as charge on capacitors that leaks away ~~ Refresh restores the charge.
- It uses flip-flops ~~ That is SRAM, which needs no refresh.
- It is non-volatile ~~ DRAM is volatile.
- It is read-only ~~ DRAM is read-write.
H: DRAM = capacitor (leaks) → refresh. SRAM = flip-flop (no refresh).

# instr | Instructions, Types & Formats
N: An instruction = **opcode** (operation) + **operand/address field(s)**. An instruction code must specify the operation and the **address of the operand**.
N: **Instruction types**: data transfer (MOV, LOAD, STORE), arithmetic/logical (ADD, AND), program control/branch (JMP, CALL, RET), I/O.
N: **Formats by number of addresses**: 3-address (ADD R1,A,B), 2-address (ADD R1,A), 1-address (accumulator: ADD A), 0-address (stack: ADD).
N: Fewer addresses → shorter instructions but more instructions per program.
N: **Zero-address instructions** use a **stack** (operands are on top of the stack): PUSH A, PUSH B, ADD.
N: **One-address** instructions use an implied **accumulator** (AC).
N: **RISC**: few simple fixed-length instructions, load/store, many registers, hardwired control, easy pipelining. **CISC**: many complex variable-length instructions, microprogrammed.

Q: An instruction code must specify the address of the____
- Opcode ~~ The opcode is the operation itself — it has no address.
* Operand ~~ The address field tells where the operand (data) is.
- Both ~~ Only operands have addresses.
- None ~~ Operand is correct.
H: Instruction = opcode + operand ADDRESS.
P: PYQ

Q: The part of an instruction that specifies the operation to be performed is the:
* Opcode ~~ Operation code, e.g. ADD, LOAD.
- Operand ~~ The data or its address.
- Mode field ~~ Tells how to interpret the address.
- Address field ~~ Locates the operand.
H: OPcode = OPeration.

Q: An opcode field of 7 bits can specify at most how many distinct operations?
- 7 ~~ That is the bit count.
- 64 ~~ That is 2⁶.
* 128 ~~ 2⁷ = 128.
- 256 ~~ That needs 8 bits.
H: Operations = 2^(opcode bits).

Q: A computer has 32 instructions and 8 registers. The minimum bits for the opcode is:
- 3 ~~ Enough for 8 opcodes.
- 4 ~~ Enough for 16.
* 5 ~~ 2⁵ = 32 instructions.
- 6 ~~ More than needed.
H: ⌈log₂32⌉ = 5.

Q: Zero-address instructions are used in which type of organisation?
- Accumulator ~~ Uses 1-address instructions.
- General register ~~ Uses 2/3-address instructions.
* Stack ~~ Operands are implicitly on the top of the stack (e.g. ADD pops two, pushes the sum).
- Memory-to-memory ~~ Uses explicit addresses.
H: 0-address = Stack machine.

Q: One-address instructions use an implied register called the:
* Accumulator ~~ e.g. ADD X means AC ← AC + M[X].
- Stack pointer ~~ That is 0-address.
- Index register ~~ Used for indexed addressing.
- Program counter ~~ Not an operand register.
H: 1-address = Accumulator.

Q: The instruction ADD R1, R2, R3 is an example of:
- Zero-address instruction ~~ That has no explicit operands.
- One-address instruction ~~ That has one operand.
- Two-address instruction ~~ That has two.
* Three-address instruction ~~ Destination plus two sources are listed.
H: Count the operands.

Q: Which is a characteristic of RISC processors?
- Many complex variable-length instructions ~~ That is CISC.
* Simple fixed-length instructions and load/store architecture ~~ This makes pipelining easy.
- Microprogrammed control as a rule ~~ RISC usually uses hardwired control.
- Few registers ~~ RISC has many registers.
H: RISC = Reduced, simple, fixed-length, load/store.

Q: JMP, CALL and RET belong to which type of instruction?
- Data transfer ~~ Those are MOV/LOAD/STORE.
- Arithmetic ~~ Those are ADD/SUB.
* Program control (branch) ~~ They change the flow of execution.
- Input/output ~~ Those are IN/OUT.
H: JMP/CALL/RET = program control.

# addr | Addressing Modes
N: **Immediate**: operand is **in the instruction** itself (MOV A, #5). Fastest — no memory access for the data.
N: **Direct (absolute)**: address field = **effective address** of the operand in memory. Simplest mode that fetches the operand from memory (1 memory reference).
N: **Indirect**: address field points to a memory word that holds the **effective address** (2 memory references).
N: **Register**: operand is in a CPU register. It works like direct addressing, but the address field names a register.
N: **Register indirect**: register holds the effective address (e.g. MOV A, @R0).
N: **Displacement** (EA = A + (R)): very powerful mode — covers **relative** (R = PC), **base-register** and **indexed** addressing.
N: **Implied**: operand is implied by the opcode (e.g. CMA complements the accumulator; zero-address stack instructions).
N: **Auto-increment/decrement**: register indirect + automatic update of the register — good for arrays.

Q: In which addressing the operand is actually present in instruction
* Immediate addressing ~~ The operand value is part of the instruction itself (e.g. #5).
- Direct addressing ~~ The instruction holds the operand's address, not the operand.
- Register addressing ~~ The operand is in a register.
- None of these ~~ Immediate is correct.
H: Immediate = data IN the instruction.
P: PYQ

Q: In which addressing the simplest addressing mode where an operand is fetched from memory is_____
- Immediate addressing ~~ No memory fetch is needed — the operand is in the instruction.
* Direct addressing ~~ The address field gives the effective address directly → one memory access.
- Register addressing ~~ Operand comes from a register, not memory.
- None of these ~~ Direct is correct.
H: Direct = simplest mode that goes to memory for data.
P: PYQ

Q: which addressing is a way of direct addressing
- Immediate addressing ~~ The operand is in the instruction.
- Direct addressing ~~ It cannot be "a way of" itself.
* Register addressing ~~ Register addressing is like direct addressing, except the address field names a register instead of a memory location.
- None of these ~~ Register addressing is correct.
H: Register addressing = direct addressing on registers.
P: PYQ

Q: In which mode the main memory location holds the Effective Address of the operand
- Immediate addressing ~~ The operand is in the instruction.
- Direct addressing ~~ The instruction holds the EA itself.
- Register addressing ~~ The operand is in a register.
* Indirect addressing ~~ The instruction points to a memory word whose content is the EA.
H: Indirect = address of the address.
P: PYQ

Q: Which addressing is an extremely influential way of addressing
* Displacement addressing ~~ EA = A + (R) — very powerful; covers relative, base-register and indexed modes.
- Immediate addressing ~~ Simple, limited range.
- Direct addressing ~~ Simple, limited address space.
- Register addressing ~~ Limited to registers.
H: Displacement = powerful (combines direct + register indirect).
P: PYQ

Q: In displacement addressing, the effective address is computed as:
- EA = A ~~ That is direct addressing.
- EA = (A) ~~ That is indirect addressing.
* EA = A + (R) ~~ Address field plus the contents of a register.
- EA = (R) ~~ That is register indirect.
H: Displacement: EA = A + (R).

Q: Relative addressing is a form of displacement addressing in which the register used is the:
- Accumulator ~~ Not used for relative addressing.
- Index register ~~ That gives indexed addressing.
* Program counter ~~ EA = PC + offset — used for branches.
- Stack pointer ~~ Used for stack operations.
H: Relative = PC + offset.

Q: Which addressing mode needs TWO memory accesses to get the operand (after the instruction fetch)?
- Immediate ~~ Needs none.
- Direct ~~ Needs one.
* Indirect ~~ One access to fetch the EA, a second to fetch the operand.
- Register ~~ Needs none.
H: Indirect = 2 memory trips.

Q: The instruction `MOV A, @R0` (operand address is inside R0) uses:
- Register addressing ~~ That would use R0's value as the operand.
* Register indirect addressing ~~ R0 holds the address of the operand.
- Immediate addressing ~~ No # constant here.
- Direct addressing ~~ No memory address is written in the instruction.
H: @R = register indirect.

Q: Which addressing mode is most suitable for accessing array elements in a loop?
- Immediate ~~ Constant values only.
* Indexed (or auto-increment) addressing ~~ EA = base + index, and the index changes each iteration.
- Implied ~~ No explicit operand.
- Direct ~~ The address is fixed.
H: Arrays → Indexed / auto-increment.

Q: The instruction CMA (complement accumulator) uses which addressing mode?
- Direct ~~ No address field.
- Immediate ~~ No constant.
* Implied ~~ The operand (accumulator) is implied by the opcode.
- Indirect ~~ No address field.
H: Implied = opcode tells the operand.

Q: Which addressing mode is the fastest for getting the operand?
* Immediate addressing ~~ The operand comes with the instruction, so no extra access is needed.
- Indirect addressing ~~ Two memory accesses.
- Direct addressing ~~ One memory access.
- Displacement addressing ~~ Needs an address calculation plus a memory access.
H: Immediate = no extra trips = fastest.

# pipe | Pipelining
N: **Pipelining** overlaps execution of instructions in stages (e.g. IF, ID, EX, MEM, WB). It improves **throughput**, not the latency of one instruction.
N: Time for n instructions on a k-stage pipeline = **(k + n − 1) × cycle time**. Non-pipelined = n × k cycles.
N: **Speed-up** = n·k / (k + n − 1) → approaches **k** (the number of stages) for large n.
N: **Hazards**: **Structural** (resource conflict), **Data** (instruction needs a result not ready yet: RAW, WAR, WAW), **Control/branch** (branch target unknown).
N: Fixes: **forwarding/bypassing** and stalls (bubbles) for data hazards; **branch prediction**, delayed branch for control hazards; duplicating resources for structural hazards.
N: **RAW (read after write)** = true dependency — the most common data hazard.
N: Pipeline cycle time = slowest stage delay + latch/register delay.

Q: The main benefit of instruction pipelining is:
- Reducing the execution time of each individual instruction ~~ Latency per instruction does not drop (it may even rise slightly).
* Increasing instruction throughput ~~ Several instructions are in different stages at once.
- Reducing the number of instructions ~~ The program stays the same.
- Removing the need for a cache ~~ Unrelated.
H: Pipelining = throughput, not latency.

Q: A 5-stage pipeline with a 1 ns clock executes 100 instructions (no stalls). Total time is:
- 100 ns ~~ Ignores pipeline fill time.
* 104 ns ~~ (k + n − 1) = 5 + 100 − 1 = 104 cycles × 1 ns.
- 500 ns ~~ That is non-pipelined (n × k).
- 105 ns ~~ Off by one: it is k + n − 1.
H: Pipelined cycles = k + n − 1.

Q: The ideal maximum speed-up of a k-stage pipeline is approximately:
- 1 ~~ That means no improvement.
- k/2 ~~ Too low.
* k ~~ For a very large number of instructions, n·k/(k+n−1) → k.
- 2k ~~ Cannot exceed k.
H: Max speed-up ≈ number of stages.

Q: A 4-stage pipeline runs 20 instructions. Speed-up over a non-pipelined machine with the same stage time is:
- 4 ~~ That is the ideal limit for infinite n.
* 80/23 ≈ 3.48 ~~ Non-pipelined = 20×4 = 80 cycles; pipelined = 4+20−1 = 23 cycles.
- 20/4 = 5 ~~ Wrong formula.
- 2 ~~ Too low.
H: Speed-up = nk / (k + n − 1).

Q: When an instruction needs the result of a previous instruction that is not yet available, it is a:
- Structural hazard ~~ That is a hardware resource conflict.
* Data hazard ~~ Operand dependency between instructions (e.g. RAW).
- Control hazard ~~ That is caused by branches.
- Cache miss ~~ A memory event, not a pipeline hazard class.
H: Data hazard = waiting for data.

Q: Hazards caused by branch instructions are called:
- Data hazards ~~ Those are operand dependencies.
- Structural hazards ~~ Those are resource conflicts.
* Control hazards ~~ The next instruction address is unknown until the branch is resolved.
- WAW hazards ~~ That is a data hazard type.
H: Branch → control hazard.

Q: Two instructions need the same memory unit in the same clock cycle. This is a:
* Structural hazard ~~ A resource conflict — fixed by duplicating resources (e.g. split I/D caches).
- Data hazard ~~ Not about data dependency.
- Control hazard ~~ Not about branches.
- RAW hazard ~~ That is a data hazard.
H: Structural = fighting over hardware.

Q: Operand forwarding (bypassing) is used to reduce:
- Control hazards ~~ Those use branch prediction.
* Data hazards ~~ The result is passed straight from a later stage to the ALU input without waiting for write-back.
- Structural hazards ~~ Those need extra hardware.
- Page faults ~~ Unrelated.
H: Forwarding fixes data hazards.

Q: Which data hazard is a true dependency?
* RAW (Read After Write) ~~ The instruction really needs the value produced earlier.
- WAR (Write After Read) ~~ A name (anti) dependency.
- WAW (Write After Write) ~~ An output dependency.
- RAR (Read After Read) ~~ Not a hazard.
H: RAW = real dependency.

Q: Branch prediction is a technique to reduce:
- Structural hazards ~~ Those are resource conflicts.
* Control hazards ~~ It guesses the branch outcome so the pipeline keeps fetching.
- Data hazards ~~ Those use forwarding.
- Memory latency ~~ That is the cache's job.
H: Prediction → control hazards.

Q: The stages of a pipeline have delays 150, 120, 160 and 140 ps; latch delay is 10 ps. The pipeline clock period is:
- 150 ps ~~ Not the slowest stage.
- 160 ps ~~ Forgot the latch delay.
* 170 ps ~~ Slowest stage (160) + latch (10).
- 580 ps ~~ That is the sum (non-pipelined latency).
H: Cycle = max stage + latch delay.

# memory | Memory Hierarchy & Cache Memory
N: **Hierarchy** (fast/small/costly → slow/large/cheap): Registers → Cache (L1, L2, L3) → Main memory (RAM) → Secondary storage (SSD/HDD) → Tertiary (tape).
N: **Locality of reference** makes caches work: **temporal** (reuse soon) and **spatial** (nearby addresses soon).
N: **Cache mapping** decides where a block goes / how the cache is searched: **Direct** (block → exactly one line: line = block mod lines), **Associative** (any line), **Set-associative** (any line within one set).
N: **Hit ratio** h = hits / total accesses. **Avg access time** = h·Tc + (1 − h)·(Tc + Tm) (or h·Tc + (1−h)·Tm, depending on the model).
N: **Write-through**: write to cache and memory together. **Write-back**: write to memory only when the block is replaced (dirty bit).
N: Misses — the 3 Cs: **Compulsory** (first access), **Capacity** (cache too small), **Conflict** (mapping collision).
N: Replacement: **LRU**, FIFO, random (not needed for direct mapping).
N: Direct-mapped address = **Tag | Line (index) | Word (offset)**.

Q: On what method search in cache memory used by the system
- Cache directing ~~ Not a real term.
* Cache mapping ~~ The mapping function (direct/associative/set-associative) decides where to look in the cache.
- Cache controlling ~~ Not the search method.
- Cache invalidation ~~ That marks stale lines; it is not a search method.
H: Where is the block? → Cache MAPPING.
P: PYQ

Q: In direct-mapped cache, a memory block can be placed in:
* Exactly one specific cache line ~~ Line = block number mod number of lines.
- Any cache line ~~ That is fully associative.
- Any line within one set ~~ That is set-associative.
- Two lines ~~ That is 2-way set-associative.
H: Direct = one fixed place.

Q: In fully associative mapping, a block can be placed:
- Only in line (block mod lines) ~~ That is direct mapping.
* In any cache line ~~ Most flexible; needs parallel tag comparison.
- Only in the first set ~~ Wrong.
- In main memory only ~~ That is not caching.
H: Associative = anywhere.

Q: A cache has 64 lines. Using direct mapping, main memory block 200 maps to line:
- 0 ~~ 200 mod 64 is not 0.
* 8 ~~ 200 mod 64 = 200 − 192 = 8.
- 3 ~~ 200 ÷ 64 = 3 is the tag, not the line.
- 64 ~~ Lines are numbered 0–63.
H: Line = block mod lines.

Q: A cache with 128 blocks is 4-way set associative. The number of sets is:
- 4 ~~ That is the ways (blocks per set).
* 32 ~~ 128 / 4 = 32 sets.
- 128 ~~ That is the total number of lines.
- 512 ~~ Too many.
H: Sets = lines / ways.

Q: Which cache mapping technique needs no replacement algorithm?
* Direct mapping ~~ Each block has only one possible line, so there is no choice to make.
- Fully associative ~~ Needs LRU/FIFO etc.
- 2-way set associative ~~ Must choose between 2 lines.
- 4-way set associative ~~ Must choose among 4 lines.
H: Direct mapping: no choice → no replacement policy.

Q: A program repeatedly accessing the same variable within a short time shows:
* Temporal locality ~~ Same location reused soon.
- Spatial locality ~~ That is nearby locations.
- Sequential access ~~ Not the locality term here.
- Thrashing ~~ That is excessive paging.
H: Temporal = time (same item again). Spatial = space (neighbours).

Q: Accessing array elements a[0], a[1], a[2]… one after another shows:
- Temporal locality ~~ Not the same element each time.
* Spatial locality ~~ Consecutive addresses are accessed.
- No locality ~~ It has strong locality.
- Belady's anomaly ~~ Paging concept.
H: Neighbours → spatial.

Q: Cache hit ratio is 0.9, cache access time is 10 ns, main memory access time is 100 ns. Average access time (hierarchical: on a miss you check cache then memory) is:
- 19 ns ~~ That is 0.9×10 + 0.1×100 (simultaneous access model).
* 20 ns ~~ 0.9×10 + 0.1×(10 + 100) = 9 + 11 = 20 ns.
- 55 ns ~~ Simple average — wrong.
- 110 ns ~~ That is the miss time only.
H: Hierarchical: Tavg = h·Tc + (1−h)(Tc + Tm).

Q: Cache hit ratio 0.8, cache 20 ns, memory 120 ns, simultaneous (parallel) access. Average access time is:
* 40 ns ~~ 0.8×20 + 0.2×120 = 16 + 24 = 40 ns.
- 44 ns ~~ That is the hierarchical model: 16 + 0.2×140.
- 70 ns ~~ Simple average.
- 120 ns ~~ Memory time only.
H: Simultaneous: Tavg = h·Tc + (1−h)·Tm.

Q: In the write-back policy, main memory is updated:
- On every write to the cache ~~ That is write-through.
* Only when a modified (dirty) block is replaced ~~ Saves memory traffic.
- Never ~~ It must be updated eventually.
- Before every read ~~ Not the policy.
H: Write-back = lazy (dirty bit). Write-through = immediate.

Q: Which memory is the fastest in the memory hierarchy?
* CPU registers ~~ Inside the CPU, accessed in a single cycle.
- L1 cache ~~ Very fast, but registers are faster.
- Main memory ~~ Much slower.
- Magnetic disk ~~ Slowest of these.
H: Registers > cache > RAM > disk.

Q: As we move down the memory hierarchy (away from the CPU):
- Cost per bit increases ~~ It decreases.
* Capacity increases and access time increases ~~ Bigger, slower, cheaper.
- Access time decreases ~~ It increases.
- Capacity decreases ~~ It increases.
H: Down the pyramid: bigger, slower, cheaper.

Q: A cache miss that occurs on the very first access to a block is called a:
* Compulsory (cold) miss ~~ The block has never been loaded before.
- Capacity miss ~~ Caused by the cache being too small.
- Conflict miss ~~ Caused by mapping collisions.
- Coherence miss ~~ Multiprocessor invalidation.
H: 3 Cs: Compulsory, Capacity, Conflict.

Q: In a direct-mapped cache, the memory address is divided into:
- Tag and word only ~~ That is fully associative.
* Tag, line (index) and word (offset) ~~ The line field picks the cache line, the tag confirms the block.
- Set and tag only ~~ Missing offset.
- Page and offset ~~ That is virtual memory paging.
H: Direct: TAG | LINE | WORD.

# vm | Virtual Memory
N: **Virtual memory** lets programs use an address space larger than physical memory by keeping parts on disk and loading them on demand.
N: Implemented by **paging** (fixed-size pages/frames) or **segmentation** (variable-size logical segments).
N: **MMU** translates virtual → physical addresses using the **page table**. The **TLB** is a small fast cache of recent translations.
N: **Page fault**: the page is not in memory → OS loads it from disk (swap).
N: Number of pages = virtual address space / page size. Offset bits = log₂(page size).
N: **Effective memory access time with TLB** = h(t + m) + (1−h)(t + 2m) for a single-level page table.
N: **Thrashing**: too many page faults → CPU busy swapping, little useful work.

Q: Virtual memory allows:
- Programs to run without any main memory ~~ Main memory is still needed for the active parts.
* A program's address space to be larger than physical main memory ~~ Unused parts stay on disk.
- Faster disk access ~~ Not its purpose.
- The cache to be removed ~~ Unrelated.
H: Virtual memory = illusion of a big memory.

Q: The hardware unit that translates virtual addresses to physical addresses is the:
- ALU ~~ Does arithmetic.
* MMU (Memory Management Unit) ~~ Uses page tables / TLB to translate.
- DMA controller ~~ Handles I/O transfers.
- Program counter ~~ Holds the next instruction address.
H: MMU = address translator.

Q: The TLB (Translation Lookaside Buffer) is:
* A small fast cache of recent page-table entries ~~ It avoids a page-table memory access on a hit.
- A type of secondary storage ~~ It is on-chip hardware.
- The page table itself ~~ It caches part of the page table.
- An I/O buffer ~~ Unrelated.
H: TLB = cache for address translations.

Q: A virtual address is 32 bits and the page size is 4 KB. The number of virtual pages is:
- 2¹² ~~ That is the page size in bytes.
* 2²⁰ ~~ Offset = 12 bits (4 KB), so page-number bits = 32 − 12 = 20.
- 2³² ~~ That is the number of bytes.
- 2¹⁶ ~~ Wrong split.
H: Pages = 2^(address bits − offset bits).

Q: When a referenced page is not present in main memory, it is called a:
- Cache miss ~~ That is about cache.
* Page fault ~~ The OS must bring the page from disk.
- Segmentation fault ~~ That is an illegal access.
- TLB hit ~~ Opposite situation.
H: Page not in RAM → page fault.

Q: With a TLB hit ratio of 80%, TLB access 20 ns and memory access 100 ns, the effective memory access time (single-level paging) is:
- 120 ns ~~ That is the hit time only.
* 140 ns ~~ 0.8×(20+100) + 0.2×(20+200) = 96 + 44 = 140 ns.
- 220 ns ~~ That is the miss time only.
- 100 ns ~~ Ignores translation.
H: EMAT = h(t+m) + (1−h)(t+2m).

# io | I/O Techniques, DMA & Interrupts
N: **Three I/O techniques**: **Programmed I/O** (CPU busy-waits/polls), **Interrupt-driven I/O** (device interrupts the CPU when ready), **DMA** (controller moves blocks directly between device and memory).
N: **DMA**: the CPU only sets up the transfer (address, count, direction), then is free; the DMA controller takes over the system bus (**cycle stealing** or **burst mode**) and interrupts the CPU at the end.
N: **Priority interrupt** establishes a priority among sources to decide which request to serve first. Implemented by **polling** (software) or **daisy chaining** (hardware, serial priority).
N: **Daisy chaining**: devices are connected in series; the device nearest to the CPU has the highest priority.
N: **Vectored interrupt**: the device supplies the address (vector) of its service routine. **Non-maskable interrupt (NMI)** cannot be disabled.
N: On an interrupt: finish the current instruction → save PC & status → jump to the ISR → **IRET** restores the state.
N: **I/O interface** handles differences in speed, data format and signals between CPU and peripherals. **Memory-mapped I/O** uses the same address space as memory; **isolated I/O** uses separate IN/OUT instructions.

Q: . ________interrupt establishes a priority over the various sources to determine which request should be entertained first
* Priority interrupt ~~ A priority interrupt system decides which simultaneous request to serve first.
- Polling ~~ Polling is one software way to implement priority, not the general term.
- Daisy chaining ~~ A hardware way to implement priority, not the general term.
- None of these ~~ Priority interrupt is correct.
H: Who goes first? → PRIORITY interrupt (done by polling or daisy chain).
P: PYQ

Q: In daisy-chain priority, the device with the highest priority is:
* The one electrically closest to the CPU ~~ The acknowledge signal reaches it first.
- The one farthest from the CPU ~~ That has the lowest priority.
- The one with the largest buffer ~~ Unrelated.
- Chosen randomly ~~ It is fixed by position.
H: Daisy chain: nearest = highest.

Q: Polling as a method of priority interrupt is implemented in:
- Hardware only ~~ That is daisy chaining / parallel priority.
* Software — the CPU checks devices one by one in priority order ~~ Simple but slow.
- DMA controller ~~ Not related.
- Cache controller ~~ Not related.
H: Polling = software asks each device.

Q: In which I/O technique does the CPU keep checking the device status in a loop?
* Programmed I/O ~~ Busy-waiting wastes CPU time.
- Interrupt-driven I/O ~~ The device signals the CPU instead.
- DMA ~~ The controller does the transfer.
- Memory-mapped I/O ~~ That is an addressing scheme, not a transfer technique.
H: Programmed I/O = busy waiting.

Q: Direct Memory Access (DMA) is used to:
- Let the CPU access cache faster ~~ Not its purpose.
* Transfer blocks of data between I/O and memory without the CPU moving each word ~~ The DMA controller takes over the bus.
- Translate virtual addresses ~~ That is the MMU.
- Handle arithmetic operations ~~ That is the ALU.
H: DMA = bulk transfer without CPU.

Q: In DMA, the CPU is involved:
- In transferring every byte ~~ That is programmed I/O.
* Only at the start (set-up) and at the end (completion interrupt) ~~ The controller does the transfer.
- Never ~~ It must set up the transfer.
- Only for read operations ~~ Both directions need set-up.
H: DMA: CPU sets up, controller transfers, interrupt says done.

Q: In cycle-stealing DMA mode, the DMA controller:
* Takes the bus for one cycle at a time, interleaving with the CPU ~~ CPU slows slightly but keeps running.
- Holds the bus until the entire block is transferred ~~ That is burst mode.
- Never uses the bus ~~ It must use the bus.
- Uses the CPU's registers ~~ It has its own registers.
H: Cycle stealing = one word at a time. Burst = whole block.

Q: Which DMA controller registers are set up by the CPU before a transfer?
- Program counter and instruction register ~~ Those are CPU registers.
* Address register and word-count register (plus control/direction) ~~ They tell where and how much to transfer.
- Accumulator only ~~ Not a DMA register.
- TLB ~~ Not related.
H: DMA set-up: address + count + direction.

Q: Which interrupt cannot be disabled by software?
- Maskable interrupt ~~ Can be masked/disabled.
* Non-maskable interrupt (NMI) ~~ Used for critical events like power failure.
- Software interrupt ~~ Triggered by an instruction.
- Vectored interrupt ~~ About how the ISR address is found, not masking.
H: NMI = can't be ignored.

Q: In a vectored interrupt:
* The interrupting device supplies the address of its service routine ~~ The CPU jumps directly to that vector.
- The CPU polls each device ~~ That is non-vectored polling.
- Interrupts cannot be masked ~~ Unrelated.
- The ISR address is always 0000 ~~ That is a fixed-location interrupt.
H: Vector = the device says where to go.

Q: When an interrupt occurs, the CPU first:
- Abandons the current instruction ~~ It finishes the current instruction.
* Completes the current instruction, then saves the PC and status ~~ So it can return with IRET.
- Clears memory ~~ Never.
- Restarts the program ~~ No.
H: Finish → save context → ISR → IRET.

Q: I/O devices that share the same address space as memory and are accessed with normal load/store instructions use:
* Memory-mapped I/O ~~ No special I/O instructions are needed.
- Isolated I/O ~~ Uses separate IN/OUT instructions.
- DMA ~~ A transfer technique.
- Programmed I/O ~~ A transfer technique.
H: Memory-mapped = I/O looks like memory.

# raid | RAID Architecture
N: **RAID** = Redundant Array of Independent (Inexpensive) Disks — several disks act as one for performance and/or reliability.
N: **RAID 0**: striping, **no redundancy** — fastest, no fault tolerance.
N: **RAID 1**: mirroring — data duplicated on 2 disks; 50% capacity overhead.
N: **RAID 2**: bit-level striping with Hamming-code ECC (obsolete). **RAID 3**: byte-level striping + one dedicated parity disk.
N: **RAID 4**: block-level striping + one **dedicated** parity disk (the parity disk is a bottleneck).
N: **RAID 5**: block-level striping with **distributed** parity — survives 1 disk failure. Usable capacity = (n−1) disks.
N: **RAID 6**: like RAID 5 with **double distributed parity** — survives 2 disk failures. Usable = (n−2) disks.
N: **RAID 10 (1+0)**: a stripe of mirrors — fast and fault tolerant.

Q: RAID stands for:
* Redundant Array of Independent (Inexpensive) Disks ~~ Multiple disks combined for speed and/or reliability.
- Random Access Integrated Disk ~~ Not the expansion.
- Rapid Array of Integrated Drives ~~ Not the expansion.
- Redundant Allocation of Indexed Data ~~ Not the expansion.
H: RAID = Redundant Array of Independent Disks.

Q: Which RAID level provides striping with NO redundancy?
* RAID 0 ~~ Best performance but any single disk failure loses data.
- RAID 1 ~~ Mirroring.
- RAID 5 ~~ Distributed parity.
- RAID 6 ~~ Double parity.
H: RAID 0 = zero redundancy.

Q: Which RAID level uses mirroring?
- RAID 0 ~~ Striping only.
* RAID 1 ~~ Each disk has an identical copy.
- RAID 4 ~~ Dedicated parity.
- RAID 5 ~~ Distributed parity.
H: RAID 1 = 1 copy (mirror).

Q: Which RAID level uses block-level striping with parity distributed across all disks?
- RAID 3 ~~ Byte-level with a dedicated parity disk.
- RAID 4 ~~ Dedicated parity disk.
* RAID 5 ~~ Parity blocks rotate across disks, removing the parity-disk bottleneck.
- RAID 1 ~~ Mirroring.
H: RAID 5 = distributed parity.

Q: Which RAID level can survive the failure of any TWO disks?
- RAID 0 ~~ Survives none.
- RAID 5 ~~ Survives one.
* RAID 6 ~~ Two independent parity blocks per stripe.
- RAID 4 ~~ Survives one.
H: RAID 6 = 2 parities → 2 failures.

Q: The bottleneck of RAID 4 is:
* The single dedicated parity disk, which every write must update ~~ RAID 5 fixes this by distributing parity.
- Lack of striping ~~ RAID 4 does stripe blocks.
- Mirroring overhead ~~ RAID 4 does not mirror.
- It cannot read ~~ Reads are fine.
H: RAID 4 parity disk = hot spot.

Q: In a RAID 5 array with 5 disks of 2 TB each, the usable capacity is:
- 10 TB ~~ Ignores parity.
* 8 TB ~~ One disk's worth goes to parity: (5−1) × 2 TB.
- 6 TB ~~ That would be RAID 6.
- 5 TB ~~ That would be mirroring.
H: RAID 5 usable = (n−1) disks; RAID 6 = (n−2).

Q: In RAID 1 with two 4 TB disks, the usable capacity is:
- 8 TB ~~ Ignores mirroring.
* 4 TB ~~ The second disk is a full copy.
- 2 TB ~~ Too low.
- 6 TB ~~ Wrong.
H: Mirroring halves capacity.

Q: RAID 10 (1+0) combines:
- Parity and mirroring ~~ That is not RAID 10.
* Mirroring and striping ~~ Stripe across mirrored pairs for speed + redundancy.
- Double parity and striping ~~ That is RAID 6.
- Hamming code and striping ~~ That is RAID 2.
H: RAID 10 = 1 (mirror) + 0 (stripe).

Q: Which RAID level uses Hamming code for error correction?
- RAID 1 ~~ Mirroring.
* RAID 2 ~~ Bit-level striping with Hamming ECC disks.
- RAID 3 ~~ Uses a single parity disk.
- RAID 5 ~~ Uses distributed parity.
H: RAID 2 = Hamming.
