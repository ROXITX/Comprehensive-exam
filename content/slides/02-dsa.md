@subject dsa

# cprog
S: 🧑‍💻 C basics you'll be tested on
> C gives you direct control of memory through **pointers** (variables that hold addresses).
> - `int *p = &x;` → p holds x's address; `*p` reads x.
> - Arrays and pointers are closely related: `a[i]` is the same as `*(a + i)`.
> 💡 Most exam questions are "predict the output" — trace slowly, line by line.
S: Arrays are not normal variables
> The array name is a **fixed address**:
> - `a + 1` ✅ (just an expression)
> - `a++`, `++a`, `a = b` ❌ compile errors
> - `int s[5]` at 1000: `s + 1` = 1004 (next int), `&s + 1` = 1020 (next whole array)
> - `int s[5] = {1};` → 1 0 0 0 0 (rest become zero)
S: Strings
> A string is a char array ending with **'\0'**.
> - `strlen("function")` = 8 (doesn't count '\0'); `sizeof` does count it.
> - printf %s stops at the first '\0': "VIT\0Chennai" prints **VIT**.
> - Copy with `strcpy`, join with `strcat` — never `str2 = str1` (error).
S: const and pointers
> - `const int *p` → the **value** is read-only (`*p = 5` ❌)
> - `int *const p` → the **pointer** is fixed (`p = &y` ❌)
> - `int (*p)[5]` → pointer to an array of 5 ints; `int *p[5]` → array of 5 pointers.
S: Where variables live
> - Global & `static` → **static/data area** (live for the whole program; a static keeps its value between calls)
> - Local variables → **stack**
> - `malloc` → **heap** (free it with `free`)
> 💡 C passes arguments **by value** — to change a caller's pointer, pass its address (`int **`).

# analysis
S: ⏱️ Why analyse algorithms?
> We measure how the running time **grows** as input size **n** grows, ignoring constants.
> Growth order: **1 < log n < n < n log n < n² < n³ < 2ⁿ < n!**
> 💡 3n + 1 is "linear" = O(n); 5n² + 2n is O(n²).
S: Big-O, Ω, Θ
> - **O** = upper bound ("at most")
> - **Ω** = lower bound ("at least")
> - **Θ** = tight bound ("exactly this order")
> n² + 3n + 4 = O(n³) is true (but loose); it is Θ(n²).
S: Counting loops
> - One loop to n → O(n)
> - Loop that **doubles/halves** i → O(log n)
> - Two nested loops to n → O(n²)
S: Recurrences & the Master theorem
> T(n) = aT(n/b) + f(n). Compare f(n) with **n^(log_b a)**:
> - f smaller → answer n^(log_b a)
> - equal → multiply by log n
> - f bigger → answer f(n)
> Merge sort 2T(n/2)+n → **n log n**; binary search T(n/2)+1 → **log n**. It can't be used if f(n) is negative.
S: Recursion
> Recursion = a function calling itself. ✅ short, easy code. ❌ uses more memory (stack).
> - **Tail recursion**: the call is the last step.
> - **Non-tail**: work is pending after the call (n × fact(n−1)).
> - **Indirect**: A calls B, B calls A.

# stack
S: 🥞 Stack = LIFO
> **Last In, First Out** — like a stack of plates.
> - **push**: add on top; **pop**: remove from top
> - pop on empty → **underflow**; push on full → **overflow**
S: Where stacks are used
> - Function calls & recursion
> - Reversing things
> - **Infix → postfix** conversion, and evaluating postfix
> - Matching brackets, undo, DFS
> ❌ Not for sorting or printing items in their original order.
S: Postfix & prefix
> - **Postfix** (A B +): scan left → right; on an operator pop two, compute, push the result.
> - **Prefix** (+ A B): operator first.
> A + B * C → postfix **A B C * +** (higher precedence goes first).
S: Which pop orders are possible?
> Push order is fixed (e.g. 1, 2, 3, 4). Once you pop a number, anything pushed **before it** still in the stack must come out in **reverse order**.
> 3 1 2 4 is impossible (after 3, the stack holds 1 and 2 with 2 on top).
S: Stacks ↔ Queues
> - Queue from stacks → **2 stacks**
> - Stack from queues → **2 queues** (efficient), minimum **1 queue** (by rotating)

# queue
S: 🚶 Queue = FIFO
> **First In, First Out** — like a ticket line.
> Insert at the **rear** (enqueue), remove from the **front** (dequeue).
> Used in **scheduling & resource allocation**, BFS, buffers.
S: Circular queue
> A normal array queue wastes space at the front. A circular queue **wraps around**:
> rear = **(rear + 1) mod SIZE**
> - Full: (rear + 1) mod SIZE == front (e.g. front = 0, rear = MAX − 1)
> - Empty: front == rear
> 💡 Size 5, rear = 4 → next insert at index 0. Great for taking turns (multiplayer games).
S: Deque & priority queue
> - **Deque**: insert/delete at **both** ends.
> - **Input-restricted**: insert at one end only. **Output-restricted**: delete at one end only.
> - **Priority queue**: highest priority leaves first (built with a **heap**).
> With a singly linked list, deleting the rear of a deque costs O(n).

# arrays
S: 📦 Arrays
> Elements sit **side by side** in memory → access any element in **O(1)** using its index.
> Inserting/deleting in the middle is **O(n)** (everything shifts).
> Contiguous storage gives great **spatial locality**.
S: Counting elements
> Array A(L : U) has **U − L + 1** elements.
> - A(5:50) → 46
> - B(−5:10) → 16
S: 2-D address formulas
> - **Row-major** (C): Base + [(i − L1)·cols + (j − L2)]·size
> - **Column-major**: Base + [(j − L2)·rows + (i − L1)]·size
> 💡 Row-major = finish a row first; column-major = finish a column first.
S: Sparse arrays & polynomials
> - **Sparse** = mostly empty → store only the non-empty values ({1, null, null, null, null, 10} → 2 stored).
> - A polynomial is easily stored as a **linked list** of (coefficient, exponent).

# linkedlist
S: 🔗 Linked list
> Nodes scattered in memory, each pointing to the **next** one.
> - ✅ Easy insert/delete (no shifting), grows as needed
> - ❌ No random access — searching is **O(n)**
S: The kinds
> - **Singly**: next pointer only; last → NULL.
> - **Doubly**: **next and prev** pointers.
> - **Circular**: last node points back to the **first** (no NULL anywhere).
> - 2-node circular doubly list: each node's next AND prev is the other node.
S: Handy facts
> - Insert at the head → O(1).
> - Detect a loop → **Floyd's tortoise and hare** (slow + fast pointer).
> - Cursor implementation: putting node p back at the front of the free list = **releasing** it.

# sorting
S: 🔀 Sorting at a glance
> - **Bubble**: swap neighbours. Swaps = number of out-of-order pairs (inversions). Best O(n) with a flag, worst O(n²).
> - **Insertion**: insert each item into the sorted left part. Great for nearly-sorted data.
> - **Selection**: pick the minimum each pass; at most n − 1 swaps.
S: Fast sorts
> - **Quick sort**: partition around a pivot; avg **n log n**, worst **n²**.
> - **Merge sort**: split, sort, merge — always **n log n**, stable, needs extra space.
> - **Heap sort**: n log n, in place, not stable.
S: Pivot check
> After partitioning, the pivot is in its **final position**: everything on its left is smaller, everything on its right is bigger.
> In 10 8 6 9 11 14 16 15, **11 or 14** could have been the pivot.
S: Insertion sort tricks
> Inner loop: `while (j > 0 && arr[j-1] > value)` shift right.
> Using binary search to find the spot still leaves **O(n²)** worst case (shifting).
> Counting bubble swaps: 5 1 4 3 2 has 7 inversions → **7 swaps**.

# searching
S: 🔍 Linear vs binary search
> - **Linear**: check one by one → O(n), works on unsorted data.
> - **Binary**: data must be **sorted** → look at the middle, throw away half → **O(log n)**.
> 1000 items → about **10** comparisons.
S: Binary search step by step
> mid = (low + high) / 2.
> Key bigger than a[mid] → low = mid + 1; smaller → high = mid − 1.
> {45, 77, 89, 90, 94, 99, 100}, key 99 → mids **90**, then **99**.
S: Hashing
> A hash function jumps straight to a slot → **O(1)** on average.
> Collisions: **chaining** (lists in each slot) or **open addressing** (linear probing → primary clustering, quadratic, double hashing).

# trees
S: 🌳 Binary trees
> Each node has at most **2 children**. A binary tree can even be **empty**.
> Height h (edges): max nodes **2^(h+1) − 1**, max leaves 2^h, max internal nodes **2^h − 1**.
> Leaves = (nodes with 2 children) + 1.
S: Traversals
> - **Inorder**: Left, Node, Right → gives a BST in **sorted order**
> - **Preorder**: Node, Left, Right
> - **Postorder**: Left, Right, Node
> - **Level order**: uses a **queue**
S: Binary Search Tree (BST)
> Left < node < right. Search, insert, delete take O(height):
> - balanced → O(log n)
> - skewed (insert 1, 2, 3, 4, 5) → O(n)
> Checking whether a tree is a BST takes **O(n)**. Deleting a node with 2 children → use its **inorder successor**.
S: Counting trees
> - "Full" tree sizes (all levels filled): 1, 3, 7, 15…
> - Distinct shapes with n nodes = Catalan numbers (3 nodes → 5).
> 💡 The bank uses 2ⁿ − n for "trees with 10 nodes" → 1014.

# avl
S: ⚖️ AVL = self-balancing BST
> A BST can become a long chain. An **AVL tree** keeps itself balanced:
> **Balance factor** = height(left) − height(right) must be **−1, 0 or +1** at every node.
> So search, insert and delete are always **O(log n)**.
S: Rotations fix imbalance
> - **LL** (left-left heavy) → single **right** rotation
> - **RR** → single **left** rotation
> - **LR** → left then right (double)
> - **RL** → right then left (double)
> 💡 After fixing 3 nodes, the **middle value** becomes the root.
S: Smallest AVL trees
> Minimum nodes for height h: N(h) = N(h−1) + N(h−2) + 1 → **1, 2, 4, 7, 12…**

# graphs
S: 🕸️ Graphs
> Vertices (dots) joined by edges (lines). They can have **cycles** and no single root — that's why graph traversal needs a **visited** list.
> - Complete graph Kₙ: **n(n−1)/2 edges**
> - Spanning trees of Kₙ: **n^(n−2)** (K₄ → 16)
S: Storing a graph
> - **Adjacency matrix**: O(V²) space — good for dense graphs.
> - **Adjacency list**: O(V + E) — good for sparse graphs.
S: BFS vs DFS
> - **BFS** (queue): visit all neighbours first, level by level → shortest path in unweighted graphs, P2P networks.
> - **DFS** (stack/recursion): go deep then backtrack → topological sort, cycle detection, strongly connected components.
> Both are **O(V + E)**.
S: Handy facts
> - A spanning tree uses every vertex, has **V − 1 edges**, and **no cycles**.
> - Planar graph: **V − E + R = 2** (6 vertices, 7 edges → 3 regions).
> - A DAG always has a vertex with in-degree 0.

# dijkstra
S: 🗺️ Dijkstra's shortest path
> Finds the shortest distance from one source to every vertex when **all edge weights are non-negative**.
> Greedy: always settle the closest unvisited vertex next.
> 💡 Like Google Maps finding the quickest route.
S: Relaxation
> For each edge u → v with weight w:
> if d[u] + w < d[v] then **d[v] = d[u] + w**
> Repeat until every vertex is settled.
S: Speed & limits
> - Array version: O(V²); with a heap: **O((V + E) log V)**
> - ❌ Fails with **negative weights** → use **Bellman–Ford**
> - All pairs → **Floyd–Warshall**
> - Don't confuse with Prim/Kruskal — those build a **minimum spanning tree**.
