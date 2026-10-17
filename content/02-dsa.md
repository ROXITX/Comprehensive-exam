@subject dsa | Programming, Data Structures & Algorithms | 🧮
@order 2
@desc C programming, algorithm analysis, stacks, queues, arrays, linked lists, sorting, searching, BST, AVL, graphs, Dijkstra

# cprog | Programming in C: Pointers, Arrays & Strings
N: An **array name is a constant pointer** to its first element — `arr++`, `++arr` and `arr = other` are **compile errors**. `arr + 1` is legal (just an expression).
N: For `int s[5]` at 1000 (4-byte int): `s + 1` = 1004 (next int), `&s + 1` = 1000 + 20 = **1020** (next whole array).
N: `*((int*)(&arr + 1) - 1)` gives the **last element** of arr.
N: Partial initialisation fills the rest with zero: `int s[5] = {1};` → 1 0 0 0 0. Only the **first** dimension can be omitted: `int a[][2]` is fine, `int a[2][]` is invalid.
N: `const int *p` / `int const *p` = pointer to a **constant int** → `*p = …` or `++(*p)` is a compile error. `int *const p` = constant pointer (p itself can't change).
N: `int (*p)[5]` = pointer to an array of 5 ints. `int *p[5]` = array of 5 pointers to int.
N: Storage: **globals & statics → static/data area**, locals → **stack**, `malloc` memory → **heap**. A static local must be initialised with a **constant** (`static int x = num;` → compile error in C).
N: Strings: `strlen` stops at the first `'\0'` ("function\0" → 8; "VIT\0Chennai" prints "VIT"). Arrays can't be assigned (`str2 = str1` → error; use `strcpy`). `strcat(d, s)` appends s to d and returns d.
N: Structures hold members of **different types**; keyword is `struct` (not `structure`), and the definition ends with `;` → `struct a_struct {int a;};`.
N: C passes arguments **by value** — `malloc` into a parameter pointer does not change the caller's pointer.

Q: Consider the following code snippet
```c
char c[]="VITEEE2022";
char *p=c;
printf("%s",p+p[1]-p[3]);
```
* EE2022 ~~ p[1]='I' (73) and p[3]='E' (69): p + 73 − 69 = p + 4 → prints from index 4: "EE2022".
- EEE2022 ~~ That starts at index 3 (p + 3).
- E2022 ~~ That starts at index 5.
- Error ~~ Character arithmetic on pointers is legal.
H: Characters are numbers: 'I' − 'E' = 4 → p + 4.
P: PYQ

Q: What does this print?
```c
char c[]="COMPUTER";
char *p=c;
printf("%s",p+p[3]-p[1]);
```
- MPUTER ~~ That is p + 2.
* OMPUTER ~~ p[3]='P' (80) and p[1]='O' (79): 80 − 79 = 1, so it prints from p + 1.
- COMPUTER ~~ That is p + 0.
- UTER ~~ That is p + 4.
H: Compute the character difference first: 'P' − 'O' = 1.

Q: For `int s[5];` stored at address 1000 with 4-byte integers, what is printed?
```c
printf("%d %d", s+1, &s+1);
```
* 1004 1020 ~~ s+1 skips one int (4 bytes); &s+1 skips the whole array (5×4 = 20 bytes).
- 1004 1004 ~~ &s has type "pointer to array of 5 ints", so it jumps 20 bytes.
- 1020 garbage value ~~ s+1 moves by one element only.
- Not even pass compilation ~~ Both are legal expressions.
H: s+1 → next element. &s+1 → next whole array.
P: PYQ

Q: For `double d[10];` at address 2000 (8-byte double), what is `&d + 1`?
- 2008 ~~ That is d + 1.
- 2010 ~~ Pointer arithmetic scales by object size.
* 2080 ~~ &d points to the whole array (10 × 8 = 80 bytes).
- 2001 ~~ Pointers don't step by 1 byte here.
H: &array + 1 = base + sizeof(array).

Q: What will happen?
```c
int main() {
  int s[5]; // s at 1000, int = 4 bytes
  s++;
  printf("the array is at memory location %d", s);
  return 0;
}
```
- 1002 ~~ Wrong step and illegal anyway.
- 1004 ~~ Would be true for a pointer variable, but s is an array name.
- 1020 ~~ Not how ++ would work either.
* Error ~~ An array name is not a modifiable lvalue, so s++ fails to compile.
H: Array names can't be incremented or assigned.
P: PYQ

Q: Let x be an array. Which of the following operations is illegal? (I) ++x (II) x+1 (III) x++ (IV) x*2
- I and II ~~ x+1 is a legal pointer expression.
- I, II and III ~~ x+1 is legal.
* I, III and IV ~~ ++x and x++ modify an array name (illegal); multiplying a pointer (x*2) is also illegal.
- III and IV ~~ ++x is illegal too.
H: Array name: can add (x+1), can't change (++/--), can't multiply.
P: PYQ

Q: Given `int a[5], *p = a;` which statement is ILLEGAL?
- p++; ~~ p is an ordinary pointer variable.
- p = a + 2; ~~ Legal.
* a = p; ~~ You cannot assign to an array name.
- *(a + 1) = 5; ~~ Legal — same as a[1] = 5.
H: Pointer variable = movable. Array name = fixed.

Q: Output of the code?
```c
int arrayVal[]={5,8,12,14,18,19};
int *pointerVal=(int*)(&arrayVal + 1);
printf("%d", *(pointerVal - 1));
```
- 12 ~~ Not the middle element.
- 5 ~~ That would be *(int*)&arrayVal.
* 19 ~~ &arrayVal+1 points just past the array; stepping back one int gives the last element.
- 18 ~~ That is the second-last element.
H: (&arr + 1) − 1 element = last element.
P: PYQ

Q: What is printed?
```c
int a[] = {10, 20, 30, 40};
int *p = (int*)(&a + 1);
printf("%d", *(p - 2));
```
- 10 ~~ That is the first element.
- 20 ~~ That is p − 3.
* 30 ~~ p is just past the end (after 40); p − 1 → 40, p − 2 → 30.
- 40 ~~ That is p − 1.
H: Count back from the end.

Q: What will be the output of the following code snippet
```c
int i;
int s[5]={1};
for(i=0;i<5;i++)
  printf("%d", s[i]);
```
- 1 followed by four garbage value ~~ Partially initialised arrays are zero-filled.
* 1 0 0 0 0 ~~ Remaining elements of a partially initialised array become 0.
- 1 1 1 1 1 ~~ {1} sets only the first element.
- 0 0 0 0 0 ~~ The first element is 1.
H: Partial init → rest are zeros.
F: The original paper prints arr[i] (a typo for s[i]). The intended answer is 1 0 0 0 0.
P: PYQ

Q: What is printed by `int a[4] = {7, 3}; printf("%d %d", a[1], a[3]);`?
- 3 garbage ~~ Missing elements are zero, not garbage.
* 3 0 ~~ a = {7, 3, 0, 0}.
- 7 0 ~~ a[1] is 3.
- Compile error ~~ Valid initialisation.
H: Unlisted elements → 0.

Q: Consider the following statement: `int (*p)[5];` What the above statement represents?
- Compilation error ~~ It is a valid declaration.
- p is a pointer to 5 integers ~~ Vague; it points to ONE array of 5.
- p is an array of 5 pointers to integers ~~ That is int *p[5].
* p is a pointer to an array of 5 integer ~~ Parentheses bind * to p first → pointer to int[5].
H: (*p)[5] = pointer to array. *p[5] = array of pointers.
P: PYQ

Q: The declaration `int *p[5];` declares:
* An array of 5 pointers to int ~~ [] binds tighter than *, so p is an array whose elements are int*.
- A pointer to an array of 5 ints ~~ That is int (*p)[5].
- A pointer to a function ~~ That needs ().
- A 2-D array ~~ Not a 2-D array.
H: Read right-left: p is array[5] of pointer to int.

Q: Consider the following code snippet and identify the true statement among the given options
```c
int i;
int main() {
  int j;
  int *k = (int *)malloc(sizeof(int));
}
```
- i,j and *k are stored in stack segment ~~ Globals and heap blocks aren't on the stack.
- i and j are stored in stack segment. *k is stored on heap ~~ i is a global → static area.
* i is stored in static area, j is stored in stack area and *k is stored in heap area. ~~ Global → static/data (BSS); local → stack; malloc → heap.
- j is stored in static area, i is stored in stack area and *k is stored in heap area. ~~ i and j are swapped.
H: Global/static → static area. Local → stack. malloc → heap.
P: PYQ

Q: In C, a local variable declared with the `static` keyword is stored in:
- Stack ~~ Ordinary locals live there.
- Heap ~~ Heap is for malloc.
* Static (data) segment ~~ It keeps its value between calls, so it can't be on the stack.
- CPU registers ~~ That's a hint for `register` variables.
H: static → data segment, lives for the whole program.

Q: Memory allocated with malloc() is released by:
- delete ~~ That is C++.
* free() ~~ free returns heap memory to the allocator.
- Automatically at function exit ~~ Only stack memory is automatic.
- realloc(0) ~~ Not the standard way to release.
H: malloc ↔ free.

Q: Consider the following code snippet
```c
int num=5;
int const * p=&num;
++(*p);
printf("%d",num);
```
* Compile time error ~~ p points to a const int, so *p is read-only and can't be incremented.
- Run time error ~~ It fails at compile time.
- 6 ~~ The increment is not allowed.
- 5 ~~ It never compiles.
H: const before * → the VALUE is constant.
P: PYQ

Q: Consider the following code snippet
```c
int num=10;
const int * p=&num;
*p=100;
printf("i=%d",num);
```
- i=100 ~~ Assignment through a pointer-to-const is not allowed.
- i=10 ~~ It does not compile.
* compile time error ~~ *p is read-only (pointer to const int).
- Runtime error ~~ It is caught by the compiler.
H: const int *p → can't write *p.
P: PYQ

Q: For `int x = 5, y = 6; int * const p = &x;` which statement is a compile error?
- *p = 10; ~~ The pointed-to value is not const.
* p = &y; ~~ p itself is a constant pointer and can't be re-pointed.
- printf("%d", *p); ~~ Reading is fine.
- x = 7; ~~ x is an ordinary variable.
H: const AFTER * → the POINTER is constant.

Q: Consider the following code snippet
```c
int num=5;
static int num1=num;
if(num== num1) printf("equal");
if(num> num1) printf("greater");
else printf("less");
```
* Compile time error ~~ In C, a static variable must be initialised with a compile-time constant.
- Equal ~~ It never compiles.
- Greater ~~ It never compiles.
- Less ~~ It never compiles.
H: static init needs a constant (in C).
P: PYQ

Q: Consider the following code snippet. What will be the value of test(1)?
```c
int test(int val) {
  static int number=1;
  if(val >=5) return val;
  val = val + number;
  number++;
  return test(val);
}
```
- 5 ~~ Trace it: the static value grows each call.
- 6 ~~ Trace it.
* 7 ~~ test(1): val=2, number=2 → test(2): val=4, number=3 → test(4): val=7, number=4 → test(7) returns 7.
- 8 ~~ Too high.
H: static keeps its value across calls → 1+1, +2, +3 = 7.
P: PYQ

Q: What does f() print when called three times: f(); f(); f();?
```c
void f() { static int c = 0; c++; printf("%d ", c); }
```
- 1 1 1 ~~ That would be a normal (auto) local.
* 1 2 3 ~~ A static local is initialised once and keeps its value.
- 0 1 2 ~~ It increments before printing.
- 3 3 3 ~~ Values are printed as they change.
H: static local remembers.

Q: What will be the output of the following code snippet?
```c
void test(int *ptr) {
  ptr=(int*)malloc(sizeof(int));
}
int main() {
  int *ptr;
  test(ptr);
  *ptr=6;
  printf("%d\n",*ptr);
}
```
* May not work ~~ ptr is passed by value; main's ptr stays uninitialised, so *ptr = 6 is undefined behaviour (may crash).
- Works and 6 will be printed ~~ The malloc'd address never reaches main.
H: Pass by value → to change a pointer, pass its address (int **).
P: PYQ

Q: To let a function allocate memory and give the caller the new address, the parameter should be:
- int *p ~~ Only a copy of the pointer is changed.
* int **p ~~ Pass the address of the caller's pointer and assign *p = malloc(...).
- int p ~~ Not a pointer.
- void p ~~ Invalid.
H: Change a pointer → pass a pointer to it.

Q: What will be the output of the following code?
```c
char str1[] = "VIT", str2[] = " Chennai";
strcat(str1,str2);
puts(str1);
puts(str2);
```
* VIT Chennai Chennai ~~ str1 becomes "VIT Chennai" (puts prints a newline), then str2 " Chennai" is printed.
- VIT ~~ strcat changed str1.
- VIT Chennai ~~ str2 is printed too.
- Compilation Error ~~ It compiles.
H: strcat appends source to destination; puts prints each on its own line.
F: str1 holds only 4 bytes, so writing past it is undefined behaviour. The bank's expected answer is "VIT Chennai Chennai".
P: PYQ

Q: what will be the output of the program
```c
char str1[20]="VIT";
char str2[20]=" Chennai";
printf("%s",strcpy(str2,strcat(str1,str2)));
```
- ChennaiVIT ~~ Wrong order.
- Chennai ~~ strcpy returns the destination after copying.
* VIT Chennai ~~ strcat makes str1 "VIT Chennai"; strcpy copies it into str2 and returns str2.
- VIT ~~ strcat already appended.
H: strcat/strcpy return the destination string.
P: PYQ

Q: What will be the output of the C Program?
```c
char arr[]="function\0";
int num=strlen(arr);
printf("Length of function is %d",num);
```
- 9 ~~ That counts the '\0'.
- 7 ~~ Too few.
- 10 ~~ That is sizeof(arr) (8 chars + explicit \0 + implicit \0).
* 8 ~~ strlen counts characters up to the first '\0': f-u-n-c-t-i-o-n.
H: strlen stops at the first \0.
P: PYQ

Q: For `char s[] = "hello";`, what are sizeof(s) and strlen(s)?
- 5 and 5 ~~ sizeof includes the terminator.
* 6 and 5 ~~ sizeof counts the '\0'; strlen does not.
- 6 and 6 ~~ strlen excludes '\0'.
- 5 and 6 ~~ Reversed.
H: sizeof = chars + 1; strlen = chars.

Q: What will be the output?
```c
char str[]="VIT\0Chennai";
printf("%s",str);
```
- VIT Chennai ~~ %s stops at the first \0.
- Chennai ~~ Printing starts at the beginning.
- VIT\0Chennai ~~ \0 is a single null character, not printed text.
* VIT ~~ printf %s stops at the embedded null.
H: \0 ends the string for every string function.
P: PYQ

Q: What is the output of C program with string
```c
char str[]={'V','I','T'};
printf("%s",str);
```
* VIT ~~ The bank's answer: the three characters are printed.
- V ~~ %s prints until a null.
- VIT\0 ~~ \0 is never printed as text.
- None of the options ~~ Bank expects VIT.
H: No '\0' terminator → %s may print extra garbage after VIT.
F: Strictly this is undefined behaviour: there is no '\0', so printf may print garbage after VIT. The expected answer is VIT.
P: PYQ

Q: What is the output of following C program
```c
char str1[]="VIT";
char str2[20];
str2=str1;
printf("%s",str2);
```
- VIT ~~ Arrays can't be assigned.
- VIT\0 ~~ Arrays can't be assigned.
* Compile Error ~~ An array is not assignable; use strcpy(str2, str1).
- V ~~ Arrays can't be assigned.
H: Copy strings with strcpy, never with =.
P: PYQ

Q: Which function compares at most n characters of two strings?
- strncat ~~ Appends at most n characters.
* strncmp ~~ Compares up to n characters.
- strcpy ~~ Copies the whole string.
- strlen ~~ Returns the length.
H: strNcmp = compare N chars; strNcat = append N chars.

Q: The function of strncat and strncmp in string.h library is
* Appends not more than n characters from source to the end of destination plus a terminating Null-character, and Comparison is limited to the number of characters specified — respectively. ~~ strncat appends ≤ n chars (+ '\0'); strncmp compares ≤ n chars.
- Comparison is limited to n characters, and appends not more than n characters — respectively. ~~ Order is swapped.
- None of the options ~~ The first option is correct.
H: strncat → append; strncmp → compare.
P: PYQ

Q: Consider the following 2-D array initialization. Which of the options is correct? `int abc[2][] = {1, 2, 3 ,4 };`
- Valid Initalization ~~ The column size can't be omitted.
* Invalid Initialization ~~ Only the first dimension may be left out: int abc[][2] is valid, int abc[2][] is not.
H: Only the FIRST dimension can be blank.
P: PYQ

Q: Which 2-D declaration is valid?
* int a[][3] = {1,2,3,4,5,6}; ~~ Rows are inferred (2 rows of 3).
- int a[2][] = {1,2,3,4}; ~~ The column size is required.
- int a[][] = {1,2,3,4}; ~~ The column size is required.
- int a[ ](2) = {1,2}; ~~ Invalid syntax.
H: a[][N] ✔, a[N][] ✘.

Q: What is the right way to Initialize array?
* int num[6] = { 2, 4, 12, 5, 45, 5 }; ~~ Correct syntax: type name[size] = {values};
- int n{} = { 2, 4, 12, 5, 45, 5 }; ~~ Braces can't replace [].
- int n{6} = { 2, 4, 12 }; ~~ Invalid syntax.
- int n(6) = { 2, 4, 12, 5, 45, 5 }; ~~ Parentheses are not array syntax.
H: Arrays use square brackets.
P: PYQ

Q: What will be the output of the program in C?
```c
int arr[5], i=0;
while(i<5)
  arr[i]=++i;
for(i=0;i<5;i++)
  printf("%d,",arr[i]);
```
- 1,2,3,4,5 ~~ Assumes arr[i] is evaluated before ++i — the bank assumes the opposite.
* Garbage value, 1, 2, 3, 4, ~~ The bank assumes ++i runs first, so arr[1]=1 … arr[4]=4 (and arr[5]=5 out of bounds); arr[0] is never set.
- 0, 1, 2, 3, 4, ~~ arr[0] is uninitialised, not 0.
- 2, 3, 4, 5, 6, ~~ Values come from ++i.
H: Bank logic: ++i happens first → arr[0] left as garbage.
F: arr[i] = ++i is technically undefined behaviour (unsequenced). The paper also has a typo, "ant arr[5]". The expected answer is "Garbage value, 1, 2, 3, 4,".
P: PYQ

Q: What is the output of this program?
```c
int arr[10];
printf("%d %d",arr[-2],arr[11]);
```
- 0 0 ~~ Out-of-bounds memory isn't guaranteed to be 0.
- Garbage value 0 ~~ Both are out of bounds.
* Garbage value Garbage value ~~ C does no bounds checking; both reads hit unknown memory.
- Compilation Error ~~ C compiles out-of-bounds indexing.
H: C has no bounds checking → garbage.
P: PYQ

Q: Structure in C language is
- a collection of elements that can be of same data type ~~ True, but not the whole story.
- a collection of elements that can be of different data type ~~ True, but not the whole story.
- Elements of a structure are called members ~~ True, but not the whole story.
* All the options ~~ All three statements are true.
H: struct = mixed types, items are "members".
P: PYQ

Q: Consider the following statements about array and structure and choose the correct statements
- Array holds variables of the same type, whereas a structure can hold variables of different types ~~ True, but not alone.
- Array internally implements a pointer which always points to the first element ~~ True (array name decays to a pointer to the first element).
- Structure is a user defined datatype ~~ True.
* All the statements are true ~~ The bank accepts all three.
H: Array = same type; struct = different types, user-defined.
P: PYQ

Q: Which of the following is a properly defined struct?
- struct {int a;} ~~ Missing the semicolon.
- struct a_struct {int a;} ~~ Missing the semicolon.
- struct a_struct int a; ~~ Missing braces.
* struct a_struct {int a;}; ~~ Tag, braces and the terminating semicolon.
H: struct name { members }; ← don't forget the semicolon.
P: PYQ

Q: What is the output of C program with structures?
```c
structure hotel {
  int items;
  char name[10];
} a;
strcpy(a.name, "TAJ");
printf("%s", a.name);
```
- TAJ ~~ It never compiles.
- Empty string ~~ It never compiles.
* Compiler error ~~ The keyword is struct, not structure.
- None of the options ~~ Compiler error is listed.
H: Keyword = struct.
P: PYQ

Q: The size of `struct s { char c; int i; };` on a typical 32/64-bit system (4-byte int, 4-byte alignment) is:
- 5 ~~ Ignores padding.
* 8 ~~ 1 byte char + 3 bytes padding + 4 bytes int.
- 4 ~~ Too small.
- 6 ~~ Padding aligns int to 4 bytes.
H: Structure padding aligns members.

Q: Consider the following 2-D string array code. What will it print?
```c
char arr[5][50] = {"Getting into the Data Structure", "is interesting ", ...};
for (int i = 0; i < 5; i++)
  printf("'%s' has length %d\n", arr[i], strlen(arr[i]));
```
- It will print the length of the string ~~ It prints the strings too.
* It will print all strings in a string array with their lengths ~~ Each row is printed along with its strlen.
- It will print all the string in a string array ~~ It prints lengths too.
H: printf prints both %s and %d.
P: PYQ

# analysis | Algorithm Analysis & Recursion
N: Growth order (slow → fast): **1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n! < nⁿ**.
N: **Big-O** = upper bound, **Ω** = lower bound, **Θ** = tight bound. n² + 3n + 4 = O(n³) (true) but not Θ(n³).
N: If T1 = O(F) and T2 = O(F) then **T1 + T2 = O(F)** (sum rule). Product gives O(F²), not O(F).
N: **Master theorem**: T(n) = aT(n/b) + f(n), a ≥ 1, b > 1, f(n) asymptotically **positive**. Compare f(n) with n^(log_b a): smaller → Θ(n^log_b a); equal (×logᵏn) → Θ(n^log_b a · log^(k+1) n); bigger (+ regularity) → Θ(f(n)).
N: Master theorem **cannot** be used when f(n) is negative (e.g. −n² log n), a < 1, or the gap is not polynomial (e.g. n/log n with n^log_b a = n).
N: Common recurrences: T(n)=T(n/2)+1 → log n (binary search); T(n)=2T(n/2)+n → n log n (merge sort); T(n)=T(n−1)+n → n²; T(n)=2T(n−1)+1 → 2ⁿ (Tower of Hanoi).
N: **Recursion** = less code, easier to write, but uses **more memory** (call stack). Iteration = usually faster/leaner.
N: **Tail recursion**: the recursive call is the last action. **Non-tail recursion**: there is a pending operation after the call. **Indirect recursion**: A calls B, B calls A.
N: Backtracking: a node is **promising** if it can still lead to a complete solution; non-promising nodes are pruned.

Q: Which of the given options provides the decreasing order of asymptotic complexity of functions f1, f2, f3 and f4? f1=O(n), f2=O(log n), f3=O(n^2), f4=O(2n)
- f1, f2, f3, f4 ~~ n² must come first.
* f3, f1, f4, f2 ~~ n² > n = 2n (both linear) > log n.
- f1, f2, f4, f3 ~~ Increasing-ish and wrong.
- f1, f3, f2, f4 ~~ Wrong.
H: Constants don't matter: 2n is just O(n).
F: f4 is read as 2n (linear). If it meant 2ⁿ (exponential), it would come first and none of the options would fit.
P: PYQ

Q: Which is the correct increasing order of growth?
- n log n < n < n² < 2ⁿ ~~ n grows slower than n log n.
* log n < n < n log n < n² < 2ⁿ ~~ Standard hierarchy.
- 2ⁿ < n² < n < log n ~~ Reversed.
- n < log n < n² < n! ~~ log n is slower than n.
H: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!.

Q: Which function grows fastest?
- n¹⁰ ~~ Polynomial.
- 2ⁿ ~~ Exponential but slower than n!.
* n! ~~ Factorial beats exponential.
- n log n ~~ Slow.
H: n! > 2ⁿ > any polynomial.

Q: If you consider the following as number of operations that different algorithms take to complete a particular task on n elements, which one is linear ?
- 3n^3+3n + 7 ~~ Cubic.
- 3n^2 + 3n + 2 ~~ Quadratic.
* 3n + 1 ~~ Highest power of n is 1 → linear.
- 8 ~~ Constant.
H: Keep the highest power, drop constants.
P: PYQ

Q: For the two functions f(n)=n^2+3n+4 and g(n)=n^3 we can conclude that,
* f(n) = O(g(n)) ~~ n² + 3n + 4 ≤ c·n³ for large n.
- f(n) = Θ(g(n)) ~~ Not tight: n² ≠ Θ(n³).
- g(n)=O(f(n)) ~~ n³ grows faster than n².
- g(n)= Θ(f(n)) ~~ Different growth rates.
H: Smaller function = O(bigger function).
P: PYQ

Q: f(n) = 5n² + 2n and g(n) = n². Which is true?
- f(n) = O(n) ~~ n² can't be bounded by n.
* f(n) = Θ(g(n)) ~~ Same highest-order term n² (constants ignored).
- g(n) = o(f(n)) ~~ Little-o needs strictly slower growth.
- f(n) = Ω(n³) ~~ f grows slower than n³.
H: Same leading power → Θ.

Q: Suppose T1(n) = O(F (n)) and T2(n) = O(F (n)). Which of the following are true?
* T1(n) + T2(n) = O(F (n)) ~~ Sum of two O(F) functions is still O(F).
- T1(n) *T2(n) = O(F (n)) ~~ Product is O(F²).
- T1(n)=T2(n) = O(1) ~~ Not implied.
- T1(n) = O(T2(n)) ~~ T2 could be much smaller (e.g. constant).
H: O(F) + O(F) = O(F).
P: PYQ

Q: The time complexity of the following loop is:
```c
for (i = 1; i < n; i = i * 2)
    sum++;
```
- O(n) ~~ i doubles; it does not step by 1.
* O(log n) ~~ i takes values 1, 2, 4, … < n → log₂n iterations.
- O(n log n) ~~ There is only one loop.
- O(n²) ~~ Not nested.
H: Doubling/halving loop → log n.

Q: The time complexity of the nested loop is:
```c
for (i = 0; i < n; i++)
  for (j = 0; j < n; j++)
    x++;
```
- O(n) ~~ It is nested.
- O(n log n) ~~ The inner loop is linear.
* O(n²) ~~ n × n iterations.
- O(2ⁿ) ~~ Too high.
H: Nested n-loops → n².

Q: Run time of the recurrence T(n) = 7T(n/3)+n^2 log n.
* Theta(n^2 log n) ~~ n^(log₃7) ≈ n^1.77 < n² log n → case 3, regularity holds → Θ(f(n)).
- Theta (n^2) ~~ Drops the log factor of f(n).
- Theta(n^2 Log^2 n) ~~ That would be case 2.
- Theta(n log^2 n) ~~ Too small.
H: f(n) dominates → answer = f(n).
P: PYQ

Q: Solve T(n) = 2T(n/2) + n.
- Θ(n) ~~ Misses the log factor.
* Θ(n log n) ~~ n^(log₂2) = n = f(n) → case 2 → n log n (merge sort).
- Θ(n²) ~~ Too large.
- Θ(log n) ~~ Too small.
H: Merge sort recurrence → n log n.

Q: Solve T(n) = 4T(n/2) + n.
- Θ(n log n) ~~ n^(log₂4) = n² dominates f(n) = n.
* Θ(n²) ~~ Case 1: n² is polynomially bigger than n.
- Θ(n) ~~ Too small.
- Θ(n² log n) ~~ That's case 2.
H: a/bᵏ > 1 → leaves dominate → n^log_b a.

Q: Solve T(n) = T(n/2) + 1.
* Θ(log n) ~~ Case 2 with n⁰ = 1 → log n (binary search).
- Θ(n) ~~ Only one subproblem of half size.
- Θ(1) ~~ It still recurses log n times.
- Θ(n log n) ~~ Too large.
H: Binary search: T(n/2) + 1 → log n.

Q: Solve T(n) = 3T(n/4) + n².
- Θ(n^(log₄3)) ~~ f(n) = n² is bigger.
* Θ(n²) ~~ n^(log₄3) ≈ n^0.79 < n² → case 3.
- Θ(n² log n) ~~ That's case 2.
- Θ(n log n) ~~ Too small.
H: f(n) wins → Θ(f(n)).

Q: Which of the following recurrence cannot be solved using a master method?
- T (n) = 2T (n/4) + n ^0.51 ~~ Valid: case 3 → Θ(n^0.51).
* T (n) = 64T (n/8) – n^2 log n ~~ f(n) is negative — the master theorem needs f(n) positive.
- T (n) = √ 2T (n/2) + log n ~~ a = √2 ≥ 1 is allowed → case 1.
- T (n) = 16T (n/4) + n! ~~ Valid: case 3 → Θ(n!).
H: Master theorem needs a ≥ 1 and f(n) > 0.
P: PYQ

Q: The master theorem does NOT apply to:
- T(n) = 2T(n/2) + n ~~ Case 2.
- T(n) = 9T(n/3) + n ~~ Case 1.
* T(n) = 0.5T(n/2) + n ~~ a must be ≥ 1.
- T(n) = T(2n/3) + 1 ~~ Case 2 (b = 3/2).
H: a < 1 → not allowed.

Q: Solve T(n) = T(n−1) + n, T(1) = 1.
- Θ(n) ~~ It adds n at every level.
* Θ(n²) ~~ 1 + 2 + … + n = n(n+1)/2.
- Θ(log n) ~~ Too small.
- Θ(2ⁿ) ~~ Only one recursive call.
H: Sum 1..n → n².

Q: The recurrence of Tower of Hanoi T(n) = 2T(n−1) + 1 gives:
- Θ(n²) ~~ Too small.
* Θ(2ⁿ) ~~ Exactly 2ⁿ − 1 moves.
- Θ(n log n) ~~ Too small.
- Θ(n) ~~ Too small.
H: Two calls of n−1 → exponential.

Q: What is the potential advantage of recursive approach than an iterative approach?
- Consumes less memory ~~ Recursion uses more stack memory.
* Less code and easy to implement ~~ Recursion expresses divide-and-conquer/tree problems compactly.
- Consumes more memory ~~ True, but that is a disadvantage.
- All the options ~~ Only one is an advantage.
H: Recursion: + short code, − more memory.
P: PYQ

Q: A disadvantage of recursion compared with iteration is:
- Code is longer ~~ Recursion is usually shorter.
* Extra memory for the call stack (risk of stack overflow) ~~ Each call adds a stack frame.
- It cannot solve tree problems ~~ It suits trees very well.
- It is always slower to write ~~ Usually it is quicker to write.
H: Recursion cost = stack frames.

Q: Whenever there is a pending operation to be performed, the function becomes ________ recursive.
- Direct recursive ~~ Means it calls itself, nothing about pending work.
- Indirect recursive ~~ Means A calls B calls A.
- Tail recursive ~~ No pending work after the call.
* Non-tail recursive ~~ Work remains after the recursive call returns (e.g. n * fact(n−1)).
H: Pending work after the call → NON-tail.
P: PYQ

Q: `int fact(int n){ return n==0 ? 1 : n * fact(n-1); }` is:
- Tail recursive ~~ Multiplication happens after the call returns.
* Non-tail recursive ~~ n * … is pending after fact(n−1).
- Indirect recursive ~~ It calls itself directly.
- Not recursive ~~ It calls itself.
H: Anything done after the call → non-tail.

Q: Function A calls function B, and B calls A. This is:
- Tail recursion ~~ About the position of the call.
* Indirect recursion ~~ The recursion goes through another function.
- Direct recursion ~~ That's when a function calls itself.
- Iteration ~~ Not a loop.
H: Through someone else → indirect.

Q: A node is said to be ____________ if it has a possibility of reaching a complete solution.
- Non-promising ~~ Those are pruned.
* Promising ~~ Backtracking explores only promising nodes.
- Succeeding ~~ Not the term.
- Preceding ~~ Not the term.
H: Backtracking: promising → explore, non-promising → prune.
P: PYQ

Q: Part1 and Part2 call each other. What is printed by part1(5)?
```c
void part1(int i) {
  if (i == 0) return;
  printf("%d", i);
  part2(i - 2);
  printf("%d", i);
}
void part2(int i) {
  if (i == 0) return;
  printf("%d", i);
  part1(++i);
  printf("%d", i);
}
```
* 53423122233445 ~~ Calls go 5,3,4,2,3,1,2 then part2(0) returns; unwinding prints 2,2,3,3,4,4,5 (part2's i was incremented).
- 53423120112233 ~~ Wrong unwinding values.
- 53423122132435 ~~ Wrong unwinding values.
- 53423120213243 ~~ Wrong unwinding values.
H: ++i changes part2's own i, so it prints the incremented value on the way back.
P: PYQ

Q: Consider the following code snippet. What would be the output for fun(5)?
```c
int fun(int n) {
  int x = 1, k;
  if (n == 1) return x;
  for (k = 1; k < n; ++k)
    x = x + fun(k) * fun(n - k);
  return x;
}
```
- 49 ~~ Recheck f(4).
- 50 ~~ Off by one.
* 51 ~~ f1=1, f2=2, f3=5, f4=15, f5 = 1 + 15 + 10 + 10 + 15 = 51.
- 52 ~~ Off by one.
H: Build up: 1, 2, 5, 15, 51.
P: PYQ

Q: For the same function (x = 1 + Σ fun(k)·fun(n−k)), what is fun(4)?
- 5 ~~ That is fun(3).
* 15 ~~ 1 + f1·f3 + f2·f2 + f3·f1 = 1 + 5 + 4 + 5 = 15.
- 14 ~~ Forgot the initial 1.
- 51 ~~ That is fun(5).
H: 1, 2, 5, 15, 51.

Q: What is returned by f(4)?
```c
int f(int n) { if (n <= 1) return 1; return n * f(n - 1); }
```
- 10 ~~ That's a sum.
* 24 ~~ 4 × 3 × 2 × 1.
- 12 ~~ Missing a factor.
- 4 ~~ Too small.
H: Factorial.

# stack | Stack & its Applications
N: **Stack = LIFO** (Last In First Out). Operations: push, pop, peek/top. Pop on empty → **underflow**; push on full → **overflow**.
N: Stack applications: **function calls/recursion**, **reversing**, **infix → postfix conversion**, **postfix evaluation**, parenthesis matching, undo, DFS, backtracking. NOT for sorting or printing in the original order.
N: **Infix → postfix uses a stack of operators**; postfix evaluation uses a stack of operands.
N: **Prefix evaluation**: scan right → left. **Postfix evaluation**: scan left → right; on an operator pop 2 (second popped is the left operand).
N: Valid pop sequences: once a number is popped, any **earlier-pushed** numbers still in the stack must come out in **reverse push order**.
N: Stack using queues: **2 queues** is the efficient standard way; the **minimum is 1 queue** (rotate after each push). Queue using stacks: **2 stacks**.
N: Number of valid stack permutations of n distinct items = **Catalan number** C(2n,n)/(n+1).

Q: In a stack 'S' the elements 4, 8, 12, 16 are pushed in the same order. Two times pop operation is executed, sum of the returned values is pushed again in stack S. Again two times pop operation is executed and sum of the returned values are pushed in stack S. The current top of the stack S is
- 4 ~~ 4 stays at the bottom.
- 16 ~~ 16 was popped.
* 36 ~~ Pop 16, 12 → push 28 → [4, 8, 28]; pop 28, 8 → push 36 → [4, 36].
- 28 ~~ 28 was popped in round two.
H: Track the stack after each step.
P: PYQ

Q: Push 3, 6, 9, 12 onto an empty stack. Pop twice and push the product of the popped values. What is on top?
- 12 ~~ Popped.
- 9 ~~ Popped.
* 108 ~~ Pop 12 and 9 → 108 is pushed on top of [3, 6].
- 72 ~~ 6 × 12 — wrong pair.
H: Top two out, result back in.

Q: Which of the following will occur after the following set of operations on an empty stack of size 4. Push( 2 ), Push ( 3 ), Pop( ), Push ( 3 ), Pop ( ), Pop( ), Push( 2 ), Pop ( ), Pop ( ) ?
* Stack underflow ~~ After the 8th operation the stack is empty; the final Pop() underflows.
- Stack overflow ~~ Never more than 2 elements.
- Operations will not lead to any error. ~~ The last pop fails.
- None of the options ~~ Underflow occurs.
H: Count: +1 +1 −1 +1 −1 −1 +1 −1 −1 → goes to −1 → underflow.
P: PYQ

Q: On an empty stack of size 3: Push(1), Push(2), Push(3), Pop(), Push(4), Push(5). What happens?
- Underflow ~~ Never empty when popping.
* Overflow ~~ After Push(4) the stack is full (3 items); Push(5) overflows.
- No error ~~ Capacity is 3.
- Stack is empty ~~ It has items.
H: Count the size against capacity.

Q: We have two stacks A and B. Pop(&A) pops from A and pushes the element onto B; Pop(&B) pops from B and prints it. What is printed after: Push(&A,8), Push(&B,9), Push(&A,4), Push(&B,7), Push(&A,3), Pop(&A), Push(&B,5), Pop(&A), Pop(&A), then Pop(&B) six times?
- 9 7 3 5 4 8 ~~ That is B in bottom-to-top order.
* 8 4 5 3 7 9 ~~ B ends as [9,7,3,5,4,8] (bottom→top); popping prints from the top: 8 4 5 3 7 9.
- 3 4 8 5 7 9 ~~ Wrong order.
- None of the options ~~ The second option is correct.
H: Simulate both stacks carefully; print from the top.
P: PYQ

Q: We are given a stack on which two operations are possible, Push( ) and Pop( ). Further, we are given an input sequence 7, 5, 2, 1, 3, 6, where 7 is the first element and 6 is the last element. Which sequence of elements cannot be printed using the given stack?
- 6 3 1 2 5 7 ~~ Push all, then pop all — possible.
* 2 1 3 6 7 5 ~~ After 2 1 3 6, the stack holds 7 (bottom) and 5 (top), so 5 must come before 7.
- 5 2 7 1 3 6 ~~ Push 7,5 pop 5; push 2 pop 2; pop 7; push/pop 1, 3, 6 — possible.
- None of the options ~~ The second sequence is impossible.
H: Items still inside must come out in reverse push order.
P: PYQ

Q: Suppose that an intermixed sequence of push and pop operations are performed. The pushes push the integers 0 through 9 in order; the pops print out the return value. Which of the following sequences could not occur?
- 4 3 2 1 0 9 8 7 6 5 ~~ Push 0-4, pop all; push 5-9, pop all — possible.
* 4 6 8 7 5 3 2 9 0 1 ~~ At the end, 0 and 1 are both in the stack with 1 on top, so 1 must be popped before 0.
- 2 5 6 7 4 8 9 3 1 0 ~~ Possible.
- 4 3 2 1 0 5 6 7 8 9 ~~ Possible.
H: Look at the tail: "0 1" with both still stacked → impossible.
P: PYQ

Q: Pushes are 1, 2, 3, 4 in that order (pops may be interleaved). Which output is IMPOSSIBLE?
- 1 2 3 4 ~~ Push-pop each.
- 4 3 2 1 ~~ Push all, pop all.
* 3 1 2 4 ~~ After 3 is popped, 1 and 2 are stacked with 2 on top — 1 can't come before 2.
- 2 1 4 3 ~~ Possible.
H: After popping k, smaller pending items come out in decreasing order.

Q: How many different output (pop) sequences are possible for 3 distinct items pushed in a fixed order?
- 3 ~~ Too few.
* 5 ~~ Catalan number C₃ = 5 (all permutations except 3 1 2).
- 6 ~~ 3! counts all permutations; one is impossible.
- 4 ~~ Too few.
H: Stack permutations = Catalan(n): 1, 2, 5, 14…

Q: ______ is used to convert an infix expression into a postfix expression.
- Linked list ~~ Not the standard tool.
* Stack ~~ Operators wait on a stack until operators of lower precedence arrive.
- Queue ~~ FIFO doesn't handle precedence.
- Tree ~~ An expression tree can do it, but the standard algorithm uses a stack.
H: Infix→postfix = operator STACK.
P: PYQ

Q: What is the infix version of the following postfix expression? x 12 + z 17 y + 42 * / +
* x + 12 + z / ((17 + y) * 42) ~~ (x+12) + (z / ((17+y)*42)).
- x + 12 + z / 17 + y * 42 ~~ Loses the grouping.
- x + 12 + z / (17 + y) * 42 ~~ Divides before multiplying — wrong grouping.
- x + (12 + z) / (17 + y * 42) ~~ Wrong operands.
H: Postfix: an operator applies to the two most recent results.
P: PYQ

Q: Convert the infix expression A + B * C to postfix.
- A B + C * ~~ That's (A + B) * C.
* A B C * + ~~ * has higher precedence, so B C * comes first.
- + A * B C ~~ That's prefix.
- A + B C * ~~ Still mixed.
H: Higher precedence goes first in postfix.

Q: The postfix form of (A + B) * (C − D) is:
* A B + C D − * ~~ Each bracket becomes postfix, then *.
- A B C D + − * ~~ Wrong operand pairing.
- * + A B − C D ~~ That is prefix.
- A + B C D − * ~~ Mixed.
H: Brackets first, then the outer operator.

Q: Evaluate the postfix expression: 6 2 3 + − 3 8 2 / + *
- 49 ~~ Recheck the division.
* 7 ~~ 2+3=5; 6−5=1; 8/2=4; 3+4=7; 1×7=7.
- 1 ~~ That's only the left part.
- 23 ~~ Wrong order.
H: Operator pops two: second-popped OP first-popped.

Q: Evaluate the postfix expression 5 3 2 * + 4 −.
- 12 ~~ Forgot to subtract.
* 7 ~~ 3×2=6; 5+6=11; 11−4=7.
- 15 ~~ Wrong.
- 3 ~~ Wrong.
H: Left to right with an operand stack.

Q: If the values of A, B, C, and D are 2, 3, 4, and 5, respectively, what is the value of the following prefix expression: + – * A B C D
* 7 ~~ Prefix → ((A*B) − C) + D = (6 − 4) + 5 = 7.
- -3 ~~ Wrong grouping.
- 5 ~~ Wrong.
- 3 ~~ Wrong.
H: Prefix: evaluate right-to-left, or rebuild the brackets.
P: PYQ

Q: Evaluate the prefix expression * + 2 3 − 7 4.
- 5 ~~ That's only 2+3.
* 15 ~~ (2+3) × (7−4) = 5 × 3 = 15.
- 3 ~~ That's only 7−4.
- 21 ~~ Wrong.
H: Prefix: operator before its two operands.

Q: To implement Stacks using Queues, what are the minimum number of queues required?
- 2 ~~ Two is the common efficient method, not the minimum.
- 3 ~~ Too many.
* 1 ~~ After each enqueue, rotate the older elements behind the new one — one queue is enough.
- Atleast 3 ~~ Too many.
H: Minimum 1 queue (rotation); efficient 2 queues.
P: PYQ

Q: If you are asked to implement stack using queue how many queues are required to represent stack efficiently.
- 1 ~~ Possible but needs a rotation on every push.
- 3 ~~ Unnecessary.
- 4 ~~ Unnecessary.
* 2 ~~ The standard efficient method uses two queues.
H: "Efficient" stack-from-queues → 2.
P: PYQ

Q: How many stacks are required to implement a queue
- 1 ~~ Not enough for FIFO without recursion.
* 2 ~~ One stack for input, one for output (reverse when the output stack is empty).
- 3 ~~ Unnecessary.
- 4 ~~ Unnecessary.
H: Queue from stacks = 2 (in-stack + out-stack).
P: PYQ

Q: Which is something you would NOT use a stack for? (i) Printing a name in reverse order (ii) A function call within another function call (iii) Arranging the elements of an array in increasing or decreasing order (iv) Printing the elements of an array in the order they appear
- only (i) ~~ Reversing is a classic stack use.
- only (ii) and (iii) are correct ~~ Function calls use the call stack.
* only (iii) and (iv) are correct ~~ Sorting and in-order printing don't need LIFO.
- None of the options are correct ~~ (iii) and (iv) are correct.
H: Stack = reverse & nesting; not sorting, not original order.
P: PYQ

Q: Which application does NOT use a stack?
- Balancing parentheses ~~ Classic stack use.
- Undo in a text editor ~~ Classic stack use.
* Round-robin CPU scheduling ~~ Uses a (circular) queue.
- Recursion ~~ Uses the call stack.
H: Round robin → queue.

Q: Checking whether an expression has balanced parentheses is done using a:
* Stack ~~ Push on '(', pop on ')'; the stack must end empty.
- Queue ~~ FIFO can't match nesting.
- Heap ~~ Not related.
- Graph ~~ Not related.
H: Nesting → stack.

# queue | Queue, Circular Queue & Deque
N: **Queue = FIFO**. Insert at **rear** (enqueue), delete from **front** (dequeue).
N: **Circular queue** reuses space: `rear = (rear + 1) % SIZE` on insertion, `front = (front + 1) % SIZE` on deletion.
N: Circular queue (keeping one slot free) is **full when (rear + 1) % SIZE == front** (i.e. front = rear + 1, or front = 0 and rear = MAX − 1); **empty when front == rear** (or front = −1 in the count-based version).
N: **Deque** = insert/delete at both ends. **Input-restricted deque**: insert at one end only, delete at both. **Output-restricted deque**: delete at one end only, insert at both.
N: **Priority queue**: served by priority (usually a heap). Used in Dijkstra, Prim, scheduling.
N: Queues are used directly for **scheduling and resource allocation** (CPU/printer queues), BFS, buffering. Circular queues suit round-robin turns (e.g. players in a multiplayer game).
N: Deque using a **singly** linked list: deleting from the rear is **O(n)** (you must find the previous node). A doubly linked list makes it O(1).
N: Reversing a queue recursively: dequeue x, reverse the rest, enqueue x.

Q: Which of the following data structure can be applied directly on scheduling and resource allocation problems?
- stack ~~ LIFO is unfair for scheduling.
* queue ~~ FIFO ordering is how jobs/requests wait for a resource (CPU, printer).
- tree ~~ Not used directly.
- linked list ~~ Implementation detail, not the ADT.
H: Waiting line for a resource → queue.
P: PYQ

Q: Which data structure is used in Breadth First Search?
- Stack ~~ DFS uses a stack.
* Queue ~~ BFS visits vertices level by level in FIFO order.
- Heap ~~ Used in Dijkstra/Prim.
- Tree ~~ The result may be a tree, but the tool is a queue.
H: BFS = Queue, DFS = Stack.

Q: Which of the following type of queue is useful in building online multiplayer games.
- Simple queue ~~ Doesn't wrap around to give turns repeatedly.
* Circular Queue ~~ Players take turns in a cycle; the queue wraps around.
- Priority Queue ~~ Turns aren't based on priority.
- Single Ended Queue ~~ Not a standard queue type.
H: Turn-taking in a cycle → circular queue.
P: PYQ

Q: Which of the following statement is more suitable while inserting in a circular queue
- rear= rear +1 ~~ Doesn't wrap around.
- rear= rear-1 ~~ Wrong direction.
* rear= (rear+1) mod SIZE ~~ Wraps back to 0 after the last index.
- rear=rear mod SIZE +1 ~~ Skips index 0.
H: Circular increment = (x + 1) % SIZE.
P: PYQ

Q: In a circular queue implementation using an array of size 5, the array index starts with 0 where front and rear values are 3 and 4 respectively. Determine the array index at which the insertion of the next element will take place.
- 5 ~~ Index 5 doesn't exist.
* 0 ~~ (4 + 1) mod 5 = 0.
- 1 ~~ Too far.
- 2 ~~ Too far.
H: Wrap around: (rear + 1) % size.
P: PYQ

Q: In a circular queue of size 8 (indices 0–7), rear = 7 and front = 2. After inserting one element, rear becomes:
- 8 ~~ No index 8.
* 0 ~~ (7 + 1) % 8 = 0.
- 3 ~~ That is front + 1.
- 1 ~~ Off by one.
H: (rear + 1) % SIZE.

Q: The circular queue will be full only when
- FRONT = MAX –1 and REAR = MAX –1 ~~ That is a one-element queue.
* FRONT = 0 and REAR = MAX –1 ~~ The whole array from 0 to MAX−1 is used.
- FRONT = MAX –1 and REAR = 0 ~~ Not full.
- FRONT = 0 and REAR = 0 ~~ One element (or empty).
H: Full: front = 0 & rear = MAX−1 (or front = rear + 1).
P: PYQ

Q: In a circular queue with the capacity of n elements, insertion and deletion are performed using rear and front respectively. Initially rear and front are set to 1. Which of the following condition must be true for the queue to be full.
- front = rear ~~ That is the empty condition.
* front = (rear + 1) mod n ~~ One slot is kept empty; full when rear is just behind front.
- rear = front + 1 ~~ That means one element.
- front = rear − 1 ~~ Not the full condition.
H: Full: next(rear) == front. Empty: front == rear.
F: The bank's options A–C are printed as "front=rear", "front=rear+1", "front=rear+1". The answer is front = rear + 1 (mod n).
P: PYQ

Q: In a circular queue (one slot kept empty), the queue is EMPTY when:
* front == rear ~~ No elements between them.
- (rear + 1) % SIZE == front ~~ That is the full condition.
- rear == SIZE − 1 ~~ Not the condition.
- front == 0 ~~ Not the condition.
H: Empty: front == rear.

Q: If you keep track of front, rear and count (no. of items in array), in a circular array when front = 0 and rear = maxsize − 1, what will be the count value?
- 0 ~~ That would be an empty queue.
- 3 ~~ Too few.
* 4 ~~ front = 0 and rear = maxsize−1 means every slot is used → count = maxsize (4 in the bank's example).
- 2 ~~ Too few.
H: front = 0, rear = max−1 → full → count = maxsize.
F: The question assumes maxsize = 4. In general count = maxsize (the queue is full).
P: PYQ

Q: Consider the following code. Which operation does it perform?
```c
int fun() {
  if(isEmpty()) return -10;
  else {
    int n;
    n = q[front];
    front++;
    return n;
  }
}
```
- Enqueue ~~ Enqueue adds at rear.
- Dequeue ~~ It also returns the element.
- Return the front element ~~ It also removes it (front++).
* Dequeue and return the front element ~~ Reads q[front], advances front, returns the value.
H: Read front + move front = dequeue.
P: PYQ

Q: Consider the following pseudocode for the queue Q. What will be the change in the queue?
```
Function(Q)
  If (Q != empty)
     x = delete(Q)
     Function(Q)
     Insert(Q, x)
```
* Q element order is reversed ~~ The first element removed is inserted last, after the rest are re-inserted (recursion acts like a stack).
- Q is unchanged ~~ The order changes.
- Q's Front element is removed and inserted at the rear, other elements are unchanged. ~~ That would be a single rotation without recursion.
- Q is emptied ~~ All elements are re-inserted.
H: Recursion = hidden stack → reverses the queue.
P: PYQ

Q: In ______, insertions can be done only at one end, while deletions can be done from both the ends.
- Double-ended queue ~~ A general deque allows both at both ends.
* Input restricted deque ~~ Input (insertion) is restricted to one end.
- Output restricted deque ~~ Output (deletion) is restricted there.
- Circular queue ~~ One end for each.
H: Restricted word = the operation done at only one end.
P: PYQ

Q: A deque that allows deletion at only one end but insertion at both ends is:
- Input-restricted deque ~~ That restricts insertion.
* Output-restricted deque ~~ Output (deletion) happens at one end only.
- Priority queue ~~ Different structure.
- Circular queue ~~ Different structure.
H: Output-restricted → delete at one end.

Q: In the Deque implementation using singly linked list, what would be the time complexity of deleting an element from the rear end?
- O(1) ~~ Needs the second-last node, which takes a traversal.
- O(n^2) ~~ Too slow.
* O(n) ~~ Traverse to the node before the tail to unlink it.
- O(nlogn) ~~ No sorting involved.
H: Singly linked → no back pointer → O(n) to delete the tail.
P: PYQ

Q: Which data structure is generally used to implement a priority queue efficiently?
- Stack ~~ LIFO, no priorities.
* Binary heap ~~ Insert and delete-min/max in O(log n).
- Simple queue ~~ FIFO, no priorities.
- Linked stack ~~ No priorities.
H: Priority queue ↔ heap.

# arrays | Arrays: Storage & Address Calculation
N: Number of elements in A(L : U) = **U − L + 1**. AAA(5:50) → 46; BBB(−5:10) → 16.
N: **Row-major** (C): Addr(A[i][j]) = Base + [(i − L₁)·N + (j − L₂)]·w, where N = number of columns.
N: **Column-major** (Fortran): Addr(A[i][j]) = Base + [(j − L₂)·M + (i − L₁)]·w, where M = number of rows.
N: Array access by index is **O(1)**; insertion/deletion in the middle is **O(n)** (shifting).
N: **Sparse array/matrix** stores only non-zero (non-null) entries — {1, null, null, null, null, 10} has normal size 6, sparse size 2.
N: Arrays give excellent **spatial locality** (contiguous memory), which caches exploit.
N: A **polynomial** is conveniently stored as a linked list of (coefficient, exponent) nodes.

Q: An array A of integers is given as A: array [1 … 5] [1 … 10]; The array is stored in column-major order and the first element of the array is stored at location 50. Calculate the address of the element A[i][j] where each integer takes one memory location.
- 5i + j + 44 ~~ That's the row-major-style pattern.
* i + 5j + 44 ~~ 50 + (j−1)·5 + (i−1) = 5j + i + 44.
- 5i + j + 39 ~~ Wrong constant and order.
- 5j + i + 39 ~~ Constant should be 44.
H: Column-major: skip (j−1) whole columns of M rows, then (i−1).
P: PYQ

Q: A[1..5][1..10] is stored in ROW-major order starting at address 50 (1 cell per element). Address of A[i][j] is:
* 10i + j + 39 ~~ 50 + (i−1)·10 + (j−1) = 10i + j + 39.
- i + 5j + 44 ~~ That is column-major.
- 10j + i + 39 ~~ i and j swapped.
- 5i + j + 44 ~~ Uses the wrong row length.
H: Row-major: skip (i−1) whole rows of N columns.

Q: int A[10][20] stored in row-major order at base address 1000, 4 bytes per int, 0-indexed. Address of A[2][5]?
- 1100 ~~ Forgot the column offset.
* 1180 ~~ 1000 + (2×20 + 5)×4 = 1000 + 180.
- 1045 ~~ Forgot ×4.
- 1220 ~~ Wrong row length.
H: Base + (i·cols + j)·size.

Q: Consider the linear arrays AAA(5:50) and BBB(-5:10). The number of elements in each array
- 50, 18 ~~ Forgot the formula.
- 46, 18 ~~ BBB is wrong.
* 46, 16 ~~ 50 − 5 + 1 = 46; 10 − (−5) + 1 = 16.
- 50, 16 ~~ AAA is wrong.
H: Count = U − L + 1.
P: PYQ

Q: An array is declared as X(−3 : 7). How many elements does it hold?
- 10 ~~ Off by one.
* 11 ~~ 7 − (−3) + 1 = 11.
- 4 ~~ Wrong.
- 7 ~~ Wrong.
H: U − L + 1.

Q: Suppose the contents of an array A are, A = {1, null, null, null, null, 10}. What would be the size of the array considering it as a normal array and a sparse array?
- 6 and 6 ~~ A sparse array skips nulls.
* 6 and 2 ~~ The normal array keeps all 6 slots; the sparse version stores only the 2 non-null values.
- 2 and 6 ~~ Reversed.
- 2 and 2 ~~ The normal array keeps all slots.
H: Sparse = store only the meaningful entries.
P: PYQ

Q: Which of the following concepts make extensive use of arrays?
- Binary trees ~~ Can use arrays, but not the intended answer.
- Scheduling of processes ~~ Uses queues.
- Caching ~~ Not the intended answer.
* Spatial locality ~~ Array elements are contiguous, so neighbours get accessed together.
H: Contiguous array → spatial locality.
P: PYQ

Q: A polynomial can be represented in a _____ by just storing the coefficient and exponent of each term.
- Array ~~ Wastes space for missing powers.
* Linked list ~~ Each node stores (coefficient, exponent, next) — only non-zero terms are kept.
- Queue ~~ Not the standard representation.
- Stack ~~ Not the standard representation.
H: Polynomial → linked list of (coef, exp).
P: PYQ

Q: Accessing the k-th element of an array takes:
* O(1) ~~ Address = base + k × size.
- O(k) ~~ That is a linked list.
- O(log n) ~~ No search needed.
- O(n) ~~ No traversal needed.
H: Arrays = random access.

Q: Inserting an element at the beginning of an array of n elements takes:
- O(1) ~~ Elements must shift.
- O(log n) ~~ Not a search.
* O(n) ~~ All n elements shift one position right.
- O(n²) ~~ One shift pass only.
H: Array insert in front = shift everything.

# linkedlist | Linked Lists
N: **Singly linked list**: node → next. Last node's next = NULL.
N: **Doubly linked list**: node has **prev and next** pointers — O(1) deletion when you have the node.
N: **Circular linked list**: last node points back to the **first** node — no NULL in any next field. Singly circular: next only. Doubly circular: head→prev = tail, tail→next = head.
N: Linked list access is **O(n)** (sequential), insertion/deletion at a known position is **O(1)**.
N: In a 2-node circular doubly list: head→next = tail, head→prev = tail, tail→next = head, tail→prev = head.
N: **Cursor implementation** simulates linked lists with an array; free cells are kept in a free list at CURSOR_SPACE[0]. Putting node p back at the front of that free list = **releasing (freeing)** it.
N: Detecting a cycle: **Floyd's tortoise and hare** (slow and fast pointers).

Q: In a linked list, there is a pointer to the first node, each node has pointer to the next node and last node has pointer to the first node, the name of the linkedlist is,
- Singly linkedlist ~~ Its last node points to NULL.
- Doubly linkedlist ~~ Doubly lists have prev pointers too.
* Singly Circular linkedlist ~~ One next pointer per node, and the last wraps to the first.
- Doubly Circular linkedlist ~~ Would need prev pointers.
H: Only next + last→first = singly circular.
P: PYQ

Q: Which type of linked list does not store NULL in next field?
- Singly linked list ~~ Last node's next is NULL.
* Circular linked list ~~ The last node points back to the first.
- Doubly linked list ~~ Last next is NULL.
- Linear List ~~ Ends with NULL.
H: Circular = no NULL ends.
P: PYQ

Q: Which type of linked list contains a pointer to the next as well as the previous node in the sequence?
- Singly linked list ~~ Next only.
- Circular linked list ~~ Can be singly.
* Doubly linked list ~~ Each node has prev and next.
- All the options ~~ Only doubly.
H: Doubly = two pointers.
P: PYQ

Q: A circular doubly linked list has exactly two nodes, whose addresses are in head and tail. Which statement is NOT true?
- Head->next=tail ~~ True.
* Head->prev->next=tail ~~ head→prev is tail, and tail→next is head — not tail.
- Tail->prev->next=tail ~~ tail→prev = head, head→next = tail → true.
- Tail->next->prev=tail ~~ tail→next = head, head→prev = tail → true.
H: With 2 nodes, each node's next AND prev is the other node.
P: PYQ

Q: In a circular doubly linked list with nodes A ⇄ B ⇄ C (and C ⇄ A), what is A->prev->prev?
- A ~~ Too short.
* B ~~ A→prev = C, C→prev = B.
- C ~~ That's A→prev.
- NULL ~~ Circular lists have no NULL.
H: Walk the pointers one at a time.

Q: What does the following lines of C code does?
```c
CURSOR_SPACE[p].next = CURSOR_SPACE[0].next;
CURSOR_SPACE[0].next = p;
```
- Allocates cursor space ~~ Allocation removes a node from the free list.
* Releases cursor space ~~ Node p is put back at the head of the free list (cursor "free").
- Initialization of cursor space ~~ Initialisation links all cells in a loop.
- Declaration for cursor ~~ Not a declaration.
H: Insert into free list = free/release.
P: PYQ

Q: The time to search for an element in a singly linked list of n nodes is:
- O(1) ~~ No random access.
- O(log n) ~~ Binary search needs random access.
* O(n) ~~ Must traverse node by node.
- O(n log n) ~~ Too slow.
H: Linked list = sequential access.

Q: Inserting a node at the beginning of a singly linked list takes:
* O(1) ~~ New node → next = head; head = new node.
- O(n) ~~ No traversal needed.
- O(log n) ~~ No search needed.
- O(n²) ~~ No.
H: Insert at head = O(1).

Q: Which algorithm detects a cycle in a linked list using two pointers moving at different speeds?
- Dijkstra's algorithm ~~ Shortest paths.
* Floyd's tortoise and hare ~~ If the fast pointer meets the slow one, there is a cycle.
- Kruskal's algorithm ~~ Spanning trees.
- Binary search ~~ Needs sorted random access.
H: Slow + fast pointer = cycle check.

Q: The main advantage of a linked list over an array is:
- Random access in O(1) ~~ That's an array advantage.
* Dynamic size and cheap insertion/deletion ~~ No shifting and no fixed capacity.
- Better cache locality ~~ Arrays are better.
- Less memory per element ~~ Linked lists need extra pointer space.
H: List = flexible size; Array = fast indexing.

# sorting | Sorting Algorithms
N: **Bubble sort**: swap adjacent out-of-order pairs; **number of swaps = number of inversions**. With an early-exit flag, best case O(n) (already sorted). Worst/avg O(n²). Stable.
N: **Insertion sort**: insert each element into the sorted left part. Best O(n), worst O(n²). Even with **binary search** to find the position, worst stays **O(n²)** (shifting).
N: **Selection sort**: always O(n²) comparisons, at most n−1 swaps; not stable.
N: **Quick sort**: partition around a pivot; avg O(n log n), **worst O(n²)** (bad pivot, e.g. already sorted with first/last pivot). After partition, the pivot is in its final place: all left smaller, all right larger.
N: **Merge sort**: always O(n log n), needs O(n) extra space, stable. **Heap sort**: O(n log n), in place, not stable.
N: **Counting/Radix sort**: non-comparison, O(n + k) / O(d(n + k)).
N: Insertion sort inner loop: `while (j > 0 && arr[j-1] > value) { arr[j] = arr[j-1]; j--; }`.

Q: The number of swapping needed to sort the numbers 5,1,4,3,2 in ascending order, using bubble sort is:
- 10 ~~ That's the max for 5 elements (reverse order).
- 9 ~~ Too many.
- 8 ~~ Too many.
* 7 ~~ Inversions: (5,1),(5,4),(5,3),(5,2),(4,3),(4,2),(3,2) = 7.
H: Bubble swaps = inversion count.
P: PYQ

Q: How many swaps does bubble sort make to sort 3, 1, 2 in ascending order?
- 1 ~~ Too few.
* 2 ~~ Inversions: (3,1), (3,2).
- 3 ~~ That would be fully reversed (3 2 1).
- 0 ~~ It is not sorted.
H: Count pairs that are out of order.

Q: Bubble sort swaps needed to sort 4, 3, 2, 1 in ascending order:
- 4 ~~ Too few.
* 6 ~~ Reverse order of n items has n(n−1)/2 = 6 inversions.
- 3 ~~ Too few.
- 8 ~~ Too many.
H: Reverse order → n(n−1)/2 swaps.

Q: Consider the array LA = {1, 2, 4, 3} is sorted using bubble sort. How many iterations is required in order to sort the array?
- 4 ~~ Too many with an early-exit check.
* 2 ~~ Pass 1 swaps 4 and 3; pass 2 makes no swaps, so the algorithm stops.
- 1 ~~ One pass sorts it, but a second pass is needed to confirm no swaps.
- 0 ~~ It is not sorted.
H: Optimised bubble sort stops after a pass with no swaps.
P: PYQ

Q: The best-case time complexity of optimised bubble sort (with a swap flag) is:
* O(n) ~~ One pass with no swaps on sorted input.
- O(n²) ~~ That's without the flag.
- O(log n) ~~ It must at least look at every element.
- O(1) ~~ Impossible.
H: Sorted input + flag → one pass.

Q: The following is the result after first partition of quicksort algorithm: 10, 8, 6, 9, 11, 14, 16, 15. Which of the following is true?
- 11 could be the pivot, 14 could not be pivot. ~~ 14 also has all smaller on the left and larger on the right.
- 14 could be the pivot, 11 could not be pivot. ~~ 11 also qualifies.
* Either 11 or 14 could be pivot element ~~ Both have only smaller elements before and only larger elements after them.
- 11 and 14 both are pivot elements. ~~ One partition has one pivot.
H: Pivot check: everything left smaller, everything right larger.
P: PYQ

Q: After the first partition of quick sort the array is 2, 1, 3, 7, 5, 8, 9. Which element(s) could have been the pivot?
- 7 only ~~ 5 is to the right of 7 but smaller.
* 3, 8 or 9 ~~ Each has only smaller values on its left and larger on its right.
- 2 only ~~ 1 is on the right of 2 but smaller.
- 5 only ~~ 7 is on the left of 5 but larger.
H: Check every position with the pivot rule.

Q: Worst-case time complexity of quick sort is:
- O(n log n) ~~ That's average/best.
* O(n²) ~~ Happens with very unbalanced partitions (e.g. sorted input with first-element pivot).
- O(n) ~~ Too fast.
- O(log n) ~~ Too fast.
H: Quick sort worst = n².

Q: Which sorting algorithm guarantees O(n log n) in the worst case and is stable?
- Quick sort ~~ Worst O(n²), not stable.
* Merge sort ~~ Always n log n and stable (needs O(n) extra space).
- Heap sort ~~ n log n but not stable.
- Selection sort ~~ O(n²).
H: Merge = guaranteed + stable.

Q: The worst case time complexity of insertion sort is O(n^2). What will be the worst case time complexity of insertion sort if the correct position for inserting element is calculated using binary search?
- O(n log n) ~~ Comparisons drop to n log n, but shifting is still O(n²).
- O(n) ~~ Too fast.
* O(n^2) ~~ Elements must still be shifted one by one.
- O(1) ~~ Impossible.
H: Binary insertion sort: fewer comparisons, same shifts → still n².
P: PYQ

Q: In the insertion sort below, what condition is required in the while statement?
```c
for(i=1;i<size;i++) {
  value=arr[i];
  j=i;
  while( ... ) {
    arr[j]=arr[j-1];
    j=j-1;
  }
  arr[j]=value;
}
```
- (j>0)||(arr[j-1]>value) ~~ OR would run off the array start.
* (j>0)&&(arr[j-1]>value) ~~ Shift while there is a left element bigger than value.
- (j>0)&&(arr[j+1]>value) ~~ Should look left (j−1).
- (j>0)&&(arr[j+1]<value) ~~ Wrong direction and comparison.
H: Shift right while left neighbour > value.
P: PYQ

Q: Consider an array arr[5] = {9, 7, 4, 2, 1}. What are the steps of insertions done while running insertion sort on the array?
* 7 9 4 2 1 → 4 7 9 2 1 → 2 4 7 9 1 → 1 2 4 7 9 ~~ Each pass inserts the next element into the sorted prefix.
- 9 7 4 1 2 → 9 7 1 2 4 → 9 1 2 4 7 → 1 2 4 7 9 ~~ Works from the wrong end.
- 7 4 2 1 9 → 4 2 1 9 7 → 2 1 9 7 4 → 1 9 7 4 2 ~~ That's rotation, not sorting.
- 7 9 4 2 1 → 2 4 7 9 1 → 4 7 9 2 1 → 1 2 4 7 9 ~~ Steps 2 and 3 are swapped.
H: Sorted prefix grows by one each pass.
P: PYQ

Q: Insertion sort on 5, 2, 4, 6, 1, 3: what is the array after the 2nd pass (i = 2)?
- 2 5 4 6 1 3 ~~ That's after pass 1.
* 2 4 5 6 1 3 ~~ Insert 4 into [2, 5] → [2, 4, 5].
- 2 4 5 1 6 3 ~~ 1 hasn't been processed yet.
- 1 2 4 5 6 3 ~~ Too far.
H: After pass k, the first k+1 elements are sorted.

Q: Which sorting algorithm performs best on an almost-sorted array?
- Selection sort ~~ Always n².
* Insertion sort ~~ Close to O(n) when few elements are out of place.
- Quick sort (first-element pivot) ~~ Near worst case on sorted input.
- Heap sort ~~ Always n log n.
H: Nearly sorted → insertion sort.

Q: Selection sort makes at most how many swaps for n elements?
* n − 1 ~~ One swap per pass.
- n² ~~ Comparisons are O(n²), swaps are not.
- n log n ~~ Not selection sort.
- n(n−1)/2 ~~ That's the comparison count.
H: Selection sort = few swaps, many comparisons.

# searching | Searching & Hashing
N: **Linear search**: O(n), works on unsorted data. **Binary search**: O(log n), needs **sorted** data with random access.
N: Binary search mid = ⌊(low + high)/2⌋. If key > a[mid] → low = mid + 1, else high = mid − 1.
N: Max comparisons for binary search on n items ≈ **⌊log₂n⌋ + 1** (e.g. 1000 items → 10).
N: **Hashing**: average O(1) search. Collisions handled by **chaining** (linked lists) or **open addressing** (linear probing, quadratic probing, double hashing).
N: **Load factor** α = n / table size. Linear probing suffers from **primary clustering**.
N: For a sorted array in descending order: max = first element O(1), min = last element O(1).

Q: Given an array arr = {45,77,89,90,94,99,100} and key = 99; what are the mid values (corresponding array elements) in the first and second levels of recursion?
* 90 and 99 ~~ low=0, high=6 → mid=3 (90); 99 > 90 → low=4, high=6 → mid=5 (99).
- 90 and 94 ~~ Second mid is index 5, not 4.
- 89 and 99 ~~ First mid is index 3.
- 89 and 94 ~~ Wrong indices.
H: mid = (low + high) / 2 with integer division.
P: PYQ

Q: Binary search for key 23 in {2, 5, 8, 12, 16, 23, 38, 56, 72, 91}. The first two mid elements checked are:
- 23 and 56 ~~ The first mid is index 4.
* 16 and 56 ~~ mid = (0+9)/2 = 4 → 16; 23 > 16 → low = 5, mid = (5+9)/2 = 7 → 56.
- 16 and 23 ~~ The second mid is index 7.
- 12 and 23 ~~ Index 4 is 16.
H: Compute indices first, then read the values.

Q: Maximum number of comparisons for binary search in a sorted array of 1000 elements is about:
- 1000 ~~ That's linear search.
- 500 ~~ Too many.
* 10 ~~ ⌈log₂1000⌉ ≈ 10.
- 100 ~~ Too many.
H: Binary search ≈ log₂n.

Q: Binary search requires the data to be:
- In a linked list ~~ Needs random access.
* Sorted (and randomly accessible, like an array) ~~ Halving needs order and O(1) indexing.
- Unsorted ~~ Halving needs order.
- Stored in a stack ~~ No random access.
H: Binary search = sorted array.

Q: Which methods have time complexity O(n) for a sorted array in descending order with distinct elements? (i) Finding the maximum (ii) Finding the minimum (iii) Finding the mode (iv) Finding any element
- (i) ~~ Max is the first element: O(1).
- (ii),(iii),(iv) ~~ Min is the last element: O(1).
* (iii),(iv) ~~ Max and min are O(1) because the array is sorted; the bank counts mode and finding an arbitrary element as linear scans.
- (i),(iii) ~~ Max is O(1).
H: Sorted → max/min at the ends in O(1).
F: The paper also prints an unrelated loop ("Algorithm XY"), which you can ignore. Strictly, searching a sorted array can use binary search (O(log n)). The bank's answer is (iii),(iv).
P: PYQ

Q: Average-case search time in a well-designed hash table is:
* O(1) ~~ The hash function jumps directly to the bucket.
- O(log n) ~~ That's a balanced BST.
- O(n) ~~ Worst case with many collisions.
- O(n log n) ~~ Too slow.
H: Hashing → O(1) average.

Q: Linear probing in hashing suffers from:
- Secondary clustering only ~~ That's quadratic probing.
* Primary clustering ~~ Occupied slots form long runs that keep growing.
- No collisions ~~ Probing is a collision method.
- Infinite chains ~~ That's not a probing problem.
H: Linear probing → primary clustering.

Q: Keys 15, 11, 27, 8 are inserted into a hash table of size 7 using h(k) = k mod 7 and linear probing. Where does 8 go?
- Slot 1 ~~ Slot 1 is taken by 15.
* Slot 2 ~~ 15→1, 11→4, 27→6, 8→1 (taken) → probe 2.
- Slot 4 ~~ Taken by 11.
- Slot 0 ~~ Probing goes forward from 1.
H: On collision, try the next slot.

Q: A collision resolution technique that stores colliding keys in a linked list at each slot is:
* Separate chaining ~~ Each bucket holds a list.
- Linear probing ~~ Open addressing.
- Double hashing ~~ Open addressing.
- Rehashing ~~ Resizing the table.
H: Chaining = linked lists in buckets.

# trees | Binary Trees & Binary Search Trees
N: Height h (in edges): **max nodes = 2^(h+1) − 1**; max **internal** nodes = 2^h − 1; max leaves = 2^h. Level i has at most 2^i nodes.
N: **Full binary tree** (every node has 0 or 2 children): n = 2·(leaves) − 1 → always **odd**. A **perfect** tree has 2^k − 1 nodes (1, 3, 7, 15, 31 …).
N: In any binary tree: **leaves = (nodes with 2 children) + 1**.
N: A binary tree **can be empty** (zero nodes), so "it must have at least one node" is NOT valid.
N: Traversals: **Inorder** L-N-R (gives sorted order in a BST), **Preorder** N-L-R, **Postorder** L-R-N, **Level order** uses a queue.
N: **BST**: left < node < right. Search/insert/delete O(h): O(log n) balanced, **O(n) skewed**. Checking whether a tree is a BST: inorder traversal must be increasing → **O(n)**.
N: Number of distinct binary trees with n unlabelled nodes = Catalan number C(2n, n)/(n + 1) (n = 3 → 5).
N: Delete a node with 2 children in a BST → replace it with its **inorder successor** (min of the right subtree) or inorder predecessor.

Q: If the height of the binary tree is 7 edges, maximum number of internal nodes the tree can have is,
- 128 ~~ That's the max number of leaves (2⁷).
* 127 ~~ Internal nodes are levels 0–6: 2⁷ − 1 = 127.
- 64 ~~ That's the number of nodes on level 6.
- 63 ~~ That is for height 6.
H: Height h → internal max = 2^h − 1, leaves max = 2^h.
P: PYQ

Q: The maximum number of nodes in a binary tree of height 3 (height counted in edges, root at level 0) is:
- 8 ~~ That's leaves on level 3.
* 15 ~~ 2^(3+1) − 1 = 15.
- 7 ~~ That is height 2.
- 16 ~~ Off by one.
H: Max nodes = 2^(h+1) − 1.

Q: The maximum number of nodes at level 5 of a binary tree (root at level 0) is:
- 5 ~~ Not linear.
- 31 ~~ That's the total up to level 4.
* 32 ~~ 2⁵ = 32.
- 63 ~~ That's the total up to level 5.
H: Level i holds ≤ 2^i nodes.

Q: A binary tree has 20 nodes with two children. How many leaf nodes does it have?
- 20 ~~ Off by one.
* 21 ~~ Leaves = (nodes with 2 children) + 1.
- 19 ~~ Off by one.
- 40 ~~ Not doubled.
H: n₀ = n₂ + 1.

Q: In a binary tree, which of the following in terms of nodes, is not a valid argument?
* It should have at least one node. ~~ An empty binary tree (0 nodes) is a valid binary tree.
- 2 ~~ A binary tree can have 2 nodes.
- 3 ~~ A binary tree can have 3 nodes.
- 0 ~~ Zero nodes is valid (empty tree).
H: A binary tree may be EMPTY.
P: PYQ

Q: There are 8, 15, 13, 14 nodes in 4 different trees. Which of them could have formed a full binary tree?
- 8 ~~ Even counts are impossible.
* 15 ~~ 15 = 2⁴ − 1, a perfect (completely filled) binary tree.
- 13 ~~ The bank treats "full" as completely filled (2^k − 1).
- 14 ~~ Even counts are impossible.
H: Full (filled) tree sizes: 1, 3, 7, 15, 31 …
F: If "full" means every node has 0 or 2 children, 13 would also work (any odd number). The bank uses the "all levels filled" definition, so the answer is 15.
P: PYQ

Q: How many different trees are possible with 10 nodes?
- 512 ~~ Not the bank's formula.
- 1024 ~~ That's 2¹⁰.
* 1014 ~~ The bank's formula is 2ⁿ − n = 1024 − 10.
- 90 ~~ Not the bank's formula.
H: Bank formula: 2ⁿ − n → 1014.
F: This uses the bank's 2ⁿ − n rule. The true count of distinct binary-tree shapes is the Catalan number (16,796 for n = 10). Pick 1014 if this exact question appears.
P: PYQ

Q: How many structurally different binary trees can be formed with 3 unlabelled nodes?
- 3 ~~ Too few.
* 5 ~~ Catalan number C₃ = 6!/(4!·3!) = 5.
- 6 ~~ That's 3!.
- 8 ~~ That's 2³.
H: Binary tree shapes = Catalan numbers 1, 2, 5, 14, 42…

Q: When the entries 7, 4, 6, 1, 2, 3, 8, 5 are successively inserted into an initially empty binary search tree, what is the height of the resulting tree?
* 4 ~~ Longest path: 7 → 4 → 1 → 2 → 3 has 4 edges.
- 3 ~~ 7 → 4 → 6 → 5 is only 3, but the other branch is longer.
- 7 ~~ Too high.
- 2 ~~ Too low.
H: Draw the BST, then count edges on the longest root-to-leaf path.
P: PYQ

Q: Keys 50, 30, 70, 20, 40, 60, 80 are inserted into an empty BST. What is the height (in edges)?
- 3 ~~ The tree is perfectly balanced.
* 2 ~~ Root 50; level 1: 30, 70; level 2: 20, 40, 60, 80.
- 1 ~~ Too low.
- 6 ~~ That would be a skewed tree.
H: Balanced 7 nodes → height 2.

Q: Inserting 1, 2, 3, 4, 5 (in that order) into an empty BST gives a tree of height:
- 2 ~~ It is not balanced.
* 4 ~~ Each key becomes a right child: a skewed chain of 5 nodes.
- 3 ~~ Too low.
- 5 ~~ 5 nodes → 4 edges.
H: Sorted input → skewed BST → O(n) height.

Q: Minimum (Asymptotic) time required to check whether a given binary tree is a binary search tree or not.
- O(1) ~~ Every node must be checked.
* O(n) ~~ An inorder traversal (or min/max range check) visits each node once.
- O(log n) ~~ You can't skip nodes.
- O(n log n) ~~ Not needed.
H: Validate BST = one traversal = O(n).
P: PYQ

Q: Which traversal of a BST gives keys in sorted (ascending) order?
- Preorder ~~ Root first.
* Inorder ~~ Left, root, right → ascending.
- Postorder ~~ Root last.
- Level order ~~ Level by level.
H: BST + inorder = sorted.

Q: The preorder traversal of a BST is 30, 20, 10, 25, 40, 35, 50. Its postorder traversal is:
* 10, 25, 20, 35, 50, 40, 30 ~~ Left subtree (20: 10, 25), right subtree (40: 35, 50), then root 30.
- 10, 20, 25, 30, 35, 40, 50 ~~ That's inorder.
- 25, 10, 20, 50, 35, 40, 30 ~~ Children in the wrong order.
- 30, 40, 50, 35, 20, 25, 10 ~~ Not a valid traversal.
H: Postorder = Left, Right, Root.

Q: Worst-case time to search a BST of n nodes is:
- O(log n) ~~ That's for a balanced BST.
* O(n) ~~ A skewed BST degenerates into a linked list.
- O(1) ~~ No.
- O(n log n) ~~ No.
H: BST worst = skewed = O(n). Use AVL for guaranteed log n.

Q: When deleting a node with two children from a BST, it is replaced by its:
- Parent ~~ Breaks the BST order.
* Inorder successor (or inorder predecessor) ~~ The successor is the smallest key in the right subtree.
- Left child always ~~ May break the ordering.
- Root ~~ No.
H: Two children → inorder successor.

Q: Level-order traversal of a binary tree uses a:
- Stack ~~ That gives DFS-like orders.
* Queue ~~ Nodes are processed level by level, FIFO.
- Heap ~~ Not needed.
- Hash table ~~ Not needed.
H: Level order = BFS = queue.

# avl | AVL Trees
N: **AVL tree** = self-balancing BST where every node's **balance factor** = height(left) − height(right) ∈ {−1, 0, +1}.
N: Search, insert, delete in AVL = **O(log n)** in the worst case.
N: Rotations: **LL case → single right rotation**, **RR case → single left rotation**, **LR case → left-right double rotation**, **RL case → right-left double rotation**.
N: Minimum nodes in an AVL tree of height h: N(h) = N(h−1) + N(h−2) + 1, with N(0) = 1, N(1) = 2 → 1, 2, 4, 7, 12, 20…
N: Insertion needs at most **one (single or double) rotation** to rebalance; deletion may need O(log n) rotations.

Q: In an AVL tree, the balance factor of every node must be:
- 0 only ~~ Too strict — that would be a perfect tree.
* −1, 0 or +1 ~~ Heights of the left and right subtrees differ by at most 1.
- Between −2 and +2 ~~ ±2 means unbalanced.
- Any value ~~ Then it's just a BST.
H: AVL: |BF| ≤ 1.

Q: Worst-case time to search an AVL tree with n nodes is:
* O(log n) ~~ AVL height is always O(log n).
- O(n) ~~ That's a skewed BST.
- O(1) ~~ No.
- O(n log n) ~~ No.
H: AVL guarantees log n.

Q: Inserting 30, 20, 10 into an empty AVL tree causes which rotation?
* Single right rotation (LL case) ~~ 10 goes to the left of the left child → rotate right at 30.
- Single left rotation (RR case) ~~ That's for right-right growth.
- Left-right double rotation ~~ That's when the left child's right subtree grows.
- No rotation ~~ 30 has balance factor +2.
H: Left-Left → rotate Right.

Q: Inserting 10, 20, 30 into an empty AVL tree requires:
- Single right rotation ~~ That's LL.
* Single left rotation (RR case) ~~ 30 goes to the right of the right child.
- Right-left double rotation ~~ That's RL.
- No rotation ~~ The tree is unbalanced at 10.
H: Right-Right → rotate Left.

Q: Inserting 30, 10, 20 into an empty AVL tree requires:
- Single right rotation ~~ The imbalance is a zig-zag.
- Single left rotation ~~ Wrong side.
* Left-Right double rotation (LR case) ~~ 20 is the right child of 30's left child → rotate left at 10, then right at 30.
- No rotation ~~ Unbalanced.
H: Zig-zag → double rotation.

Q: After inserting 30, 10, 20 into an AVL tree and rebalancing, the root is:
- 30 ~~ It becomes the right child.
- 10 ~~ It becomes the left child.
* 20 ~~ The LR double rotation makes the middle value the root.
- The tree has no root ~~ No.
H: After any 3-node rotation, the median becomes the root.

Q: The minimum number of nodes in an AVL tree of height 3 (height in edges, single node = 0) is:
- 4 ~~ That is height 2.
* 7 ~~ N(3) = N(2) + N(1) + 1 = 4 + 2 + 1 = 7.
- 8 ~~ Not the minimum.
- 15 ~~ That's the maximum.
H: N(h) = N(h−1) + N(h−2) + 1 → 1, 2, 4, 7, 12…

Q: The main advantage of an AVL tree over a plain BST is:
- Uses less memory ~~ It stores balance info.
* Guaranteed O(log n) height, so operations never degrade to O(n) ~~ It rebalances with rotations.
- Faster insertions always ~~ Rotations add work.
- No need for comparisons ~~ It is still comparison-based.
H: AVL = BST + guaranteed balance.

# graphs | Graphs: Representation, BFS & DFS
N: Complete graph Kₙ has **n(n−1)/2 edges**. Number of spanning trees of Kₙ = **n^(n−2)** (Cayley): K₄ → 16.
N: Connected simple graph: **v − 1 ≤ e ≤ v(v−1)/2**. A tree has exactly v − 1 edges.
N: **Euler's formula** for connected planar graphs: **v − e + r = 2** (6 vertices, 7 edges → 3 regions).
N: **Adjacency matrix**: O(V²) space, O(1) edge check. **Adjacency list**: O(V + E) space — better for sparse graphs.
N: **BFS** (queue): level by level — shortest path in unweighted graphs, P2P networks, web crawlers, social "friends of friends". **DFS** (stack/recursion): topological sort, strongly connected components, cycle detection, maze solving.
N: BFS/DFS time = **O(V + E)** with adjacency lists, O(V²) with a matrix.
N: Graph traversal is harder than tree traversal: graphs can have **cycles** (need a visited array), **no fixed root**, disconnected parts, and multiple paths.
N: A **spanning tree** includes every vertex, is a subgraph, and is **always acyclic** with V − 1 edges. A DAG always has at least one vertex with in-degree 0.

Q: How many edges are there in a complete graph with 'n' vertices?
* n*(n-1)/2 ~~ Every pair of vertices is connected exactly once.
- n*(n+1)/2 ~~ That's 1 + 2 + … + n.
- 2n ~~ Linear — too few.
- n/2 ~~ Far too few.
H: Kₙ edges = nC2 = n(n−1)/2.
P: PYQ

Q: A complete graph with 10 vertices has how many edges?
- 90 ~~ That's n(n−1) (directed).
* 45 ~~ 10 × 9 / 2.
- 100 ~~ That's n².
- 55 ~~ That's n(n+1)/2.
H: 10C2 = 45.

Q: Consider a complete graph G with 4 vertices. The graph G has ____ spanning trees
- 15 ~~ Off by one.
- 8 ~~ Too few.
* 16 ~~ Cayley's formula: n^(n−2) = 4² = 16.
- 13 ~~ Wrong.
H: Spanning trees of Kₙ = n^(n−2).
P: PYQ

Q: How many spanning trees does the complete graph K₅ have?
- 25 ~~ That's 5².
* 125 ~~ 5^(5−2) = 125.
- 60 ~~ Wrong.
- 10 ~~ That's the edge count.
H: Cayley: n^(n−2).

Q: Which of the following is false in the case of a spanning tree of a graph G?
- It is tree that spans G ~~ True by definition.
- It is a subgraph of the G ~~ True.
- It includes every vertex of the G ~~ True.
* It can be either cyclic or acyclic ~~ A tree is always acyclic.
H: Spanning TREE → no cycles, V − 1 edges.
P: PYQ

Q: A spanning tree of a connected graph with 12 vertices has how many edges?
- 12 ~~ That would create a cycle.
* 11 ~~ A tree with V vertices has V − 1 edges.
- 66 ~~ That's K₁₂.
- 6 ~~ Too few to connect.
H: Tree edges = V − 1.

Q: In a connected graph with no loops or multiple edges, which of the following inequalities is not correct? (v = vertices, e = edges)
- e ≤ v^2 ~~ Always true (e ≤ v(v−1)/2).
- e ≥ v − 1 ~~ True for connected graphs.
* v ≥ e/2 ~~ Fails for dense graphs: K₆ has e = 15, and 6 < 7.5.
- All the options ~~ Only one is incorrect.
H: Dense graphs can have e ≫ 2v.
P: PYQ

Q: A connected planar graph having 6 vertices, 7 edges contains _____________ regions.
- 11 ~~ Wrong formula.
- 15 ~~ Wrong formula.
- 1 ~~ That's a tree (e = v − 1).
* 3 ~~ Euler: v − e + r = 2 → 6 − 7 + r = 2 → r = 3.
H: v − e + r = 2.
P: PYQ

Q: A connected planar graph has 10 vertices and 15 edges. How many regions (faces) does it have?
- 5 ~~ Recompute.
* 7 ~~ r = 2 − v + e = 2 − 10 + 15 = 7.
- 25 ~~ Wrong.
- 3 ~~ Wrong.
H: r = e − v + 2.

Q: The memory use of an adjacency matrix is
- O(n) ~~ Too small.
* O(n^2) ~~ An n × n matrix regardless of the number of edges.
- O(n^3) ~~ Too big.
- O(logn) ~~ Too small.
H: Matrix = V², list = V + E.
P: PYQ

Q: For a sparse graph, the more space-efficient representation is:
- Adjacency matrix ~~ Wastes O(V²) on zeros.
* Adjacency list ~~ O(V + E) space.
- Incidence matrix ~~ O(V × E).
- 2-D array of size V × V ~~ That's the matrix.
H: Sparse → list. Dense → matrix.

Q: What is the value of the sum of the minimum in-degree and maximum out-degree of a Directed Acyclic Graph?
- Will always be zero ~~ Max out-degree can be positive.
* Depends on a graph ~~ Min in-degree is always 0 (a DAG has a source), but max out-degree varies.
- Will always be greater than zero ~~ A DAG with no edges gives 0.
- None of the options ~~ "Depends on a graph" is correct.
H: DAG → min in-degree = 0; total depends on max out-degree.
P: PYQ

Q: Traversal of a graph is different than tree because
* There can be a loop in the graph ~~ Cycles mean we must track visited vertices.
- DFS on a graph uses stack, while inorder traversal is recursive ~~ Both effectively use a stack.
- Both the given properties ~~ Only the first is the real difference.
- None of the options ~~ The first is correct.
H: Graphs have cycles → need a visited[] array.
P: PYQ

Q: Why is graph traversal generally more complex and difficult to implement than tree traversal?
- Graphs can contain cycles and disconnected components, requiring visited tracking ~~ True, but not the only reason.
- Graphs lack a single mandatory root node ~~ True, but not the only reason.
- Graphs can have multiple paths between the same two nodes ~~ True, but not the only reason.
* All of the above ~~ Every listed reason applies.
H: Cycles + no root + multiple paths → harder.
P: PYQ

Q: A person wants to visit some places. He starts from a vertex and then wants to visit every place connected to this vertex and so on. What algorithm he should use?
- Depth First Search ~~ DFS goes deep along one path first.
* Breadth First Search ~~ BFS visits all neighbours first, then their neighbours.
- Prim’s algorithm ~~ Builds an MST.
- Kruskal’s algorithm ~~ Builds an MST.
H: "All neighbours first" = BFS.
P: PYQ

Q: Which of the following is not an application of Depth First Search?
- For generating topological sort of a graph ~~ DFS finishing order.
- For generating Strongly Connected Components of a directed graph ~~ Kosaraju/Tarjan use DFS.
- Detecting cycles in the graph ~~ Back edges in DFS.
* Peer to Peer Networks ~~ Finding neighbouring peers is a BFS application.
H: P2P, shortest unweighted path, web crawling → BFS.
P: PYQ

Q: Which is an application of BFS rather than DFS?
* Shortest path in an unweighted graph ~~ BFS reaches vertices in order of distance.
- Topological sorting ~~ DFS.
- Finding strongly connected components ~~ DFS.
- Solving a maze by backtracking ~~ DFS.
H: Unweighted shortest path → BFS.

Q: Time complexity of BFS/DFS on a graph stored as an adjacency list is:
- O(V²) ~~ That's with a matrix.
* O(V + E) ~~ Each vertex and edge is processed once.
- O(E log V) ~~ That's Dijkstra with a heap.
- O(V·E) ~~ That's Bellman-Ford.
H: Traversal = O(V + E).

Q: DFS uses which data structure (explicitly or via recursion)?
* Stack ~~ It goes deep and backtracks LIFO.
- Queue ~~ That's BFS.
- Priority queue ~~ Dijkstra/Prim.
- Hash table ~~ Not the traversal structure.
H: DFS = stack.

Q: Topological sorting is possible only for:
- Undirected graphs ~~ Needs directed edges.
* Directed acyclic graphs (DAGs) ~~ A cycle makes a linear order impossible.
- Complete graphs ~~ Not required.
- Weighted graphs ~~ Weights are irrelevant.
H: Topo sort ⇔ DAG.

# dijkstra | Shortest Paths: Dijkstra's Algorithm
N: **Dijkstra** finds single-source shortest paths in graphs with **non-negative edge weights**. Greedy: repeatedly pick the unvisited vertex with the smallest tentative distance, then **relax** its edges.
N: **Relaxation**: if d[u] + w(u,v) < d[v] then d[v] = d[u] + w(u,v).
N: Complexity: **O(V²)** with an array/matrix; **O((V + E) log V)** with a binary-heap priority queue.
N: Dijkstra **fails with negative weights** → use **Bellman–Ford** (O(VE), also detects negative cycles). All-pairs → **Floyd–Warshall** O(V³).
N: For unweighted graphs, BFS already gives shortest paths. Dijkstra works on directed or undirected graphs.
N: **MST algorithms** (not shortest paths): **Prim** (grow from a vertex, priority queue), **Kruskal** (sort edges, union-find).

Q: Dijkstra’s Algorithm cannot be applied on ______________
- Directed and weighted graphs ~~ Its main use case.
* Graphs having negative weight function ~~ A negative edge can make an already "finalised" distance wrong.
- Unweighted graphs ~~ Works (weights treated as 1), though BFS is simpler.
- Undirected and unweighted graphs ~~ Works.
H: Dijkstra ✘ negative weights → use Bellman-Ford.
P: PYQ

Q: Which algorithm should be used for single-source shortest paths when some edge weights are negative (but there is no negative cycle)?
- Dijkstra ~~ Fails with negative edges.
* Bellman–Ford ~~ Relaxes all edges V − 1 times; also detects negative cycles.
- Prim ~~ Builds an MST.
- BFS ~~ Only for unweighted graphs.
H: Negative edges → Bellman–Ford.

Q: The strategy used by Dijkstra's algorithm is:
* Greedy ~~ It always settles the closest unvisited vertex next.
- Divide and conquer ~~ Not this.
- Backtracking ~~ Not this.
- Brute force ~~ Not this.
H: Dijkstra = greedy.

Q: Time complexity of Dijkstra's algorithm with a binary heap and an adjacency list is:
- O(V²) ~~ That's the simple array version.
* O((V + E) log V) ~~ Each extract-min and decrease-key costs log V.
- O(V·E) ~~ That's Bellman–Ford.
- O(V³) ~~ That's Floyd–Warshall.
H: Heap Dijkstra = (V+E) log V.

Q: Graph: A–B (4), A–C (1), C–B (2), B–D (5), C–D (8). Shortest distance from A to D using Dijkstra is:
- 9 ~~ That's A→B→D (4 + 5) or A→C→D (1 + 8) — both longer.
* 8 ~~ A→C (1) → B (1 + 2 = 3) → D (3 + 5 = 8).
- 11 ~~ Not the shortest.
- 5 ~~ Not reachable that cheaply.
H: Always relax via the currently closest vertex.

Q: In Dijkstra's algorithm, relaxation of edge (u, v) with weight w updates:
* d[v] = min(d[v], d[u] + w) ~~ Take the shorter path through u if it's better.
- d[u] = d[v] + w ~~ Wrong direction.
- d[v] = d[u] − w ~~ Wrong sign.
- d[v] = max(d[v], d[u] + w) ~~ Should be min.
H: Relax = "can I do better via u?"

Q: Which algorithm finds shortest paths between ALL pairs of vertices?
- Dijkstra ~~ Single source.
- Prim ~~ MST.
* Floyd–Warshall ~~ Dynamic programming, O(V³).
- Kruskal ~~ MST.
H: All-pairs → Floyd–Warshall.

Q: Prim's and Kruskal's algorithms find:
- Shortest paths from one source ~~ That's Dijkstra.
* A minimum spanning tree ~~ They connect all vertices with minimum total weight.
- Strongly connected components ~~ That's DFS (Kosaraju/Tarjan).
- A topological order ~~ That's DFS/Kahn.
H: Prim/Kruskal = MST, Dijkstra = shortest path.
