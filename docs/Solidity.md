This is a summary of [Solidity In Depth](https://solidity.readthedocs.io/en/develop/solidity-in-depth.html).

# Layout of source files

## Versions

```
pragma solidity ^0.4.0;
```
`^` means "only works with compilers 0.4.x"

We will use at least version *0.4.20* for our contracts.


## Import

```
import "filename"; // import from 'global' or same directory
import * as symbolName from "filename";
import "filename" as symbolName; // same as above
import {symbol1 as alias, symbol2} from "filename";

import "./x" as x; // strictly import from same directory
```

## Path prefix remapping
If we clone github.com/ethereum/dapp-bin/ locally to /usr/local/dapp-bin, we can use:
```
import "github.com/ethereum/dapp-bin/library/iterable_mapping.sol" as it_mapping;
```
And run the compiler with:
```
solc github.com/ethereum/dapp-bin/=/usr/local/dapp-bin/ source.sol
```


## Comments
```
// single line

/*
    Multiline
*/
```


## Natspec comments
```
/// single line
/** multiline */
```

Example:
```
/** @title Shape calculator. */
contract shapeCalculator {
    /** @dev Calculates a rectangle's surface and perimeter.
    * @param w Width of the rectangle.
    * @param h Height of the rectangle.
    * @return s The calculated surface.
    * @return p The calculated perimeter.
    */
    function rectangle(uint w, uint h) returns (uint s, uint p) {
        s = w * h;
        p = 2 * (w + h);
    }
}
```


# Structure of a contract

## State Variables
Permanently stored in contract storage.
```
unit storedData;
```

## Functions
```
function bid() {...}
```

## Function modifiers
Amend the semantics of a function, mostly used for require.

Declaration:
```
modifier onlySeller() { ... }
```

Usage:
```
function abort() onlySeller { ... }
```

## Events
Interfaces for EVM logging

Declaration:
```
event HighestBidIncreased(address bidder, uint amount);
```

Trigger:
```
emit HighestBidIncreased(msg.sender, msg.value);
```

## Struct Types
Group several variables
```
struct Voter {
    uint weight;
    bool voted;
    address delegate;
    uint vote;
}
```

## Enum Types
```
enum State { Created, Locked, Inactive }
```

# Types

## Value Types

### Booleans
```
bool t = true;
bool f = false;
```

Operators: !, &&, ||, ==, !=

### Integers
Aliases for int256 and uint256:
```
int i = -1;
uint j = 1;
```

Declare size from `(u)int8` to `(u)int256`, e.g.:
```
int24 max = 8388608;
```

Comparisons: <=, <, ==, !=, >=, >
Bit operators: &, |, ^, ~
Arithmetic: +, -, *, /, %, **, <<, >>

### Fixed point numbers
They are not fully supported in Solidity yet, they can only be declared.

### Address
20 byte value.
Operators: <=, <, ==, !=, >=, >

#### Members:
Query the **balance** of an address:
```
uint b = a.balance;
```

**Send ether** in units of wei to an address:
```
a.transfer(10); // transfers 10 wei to address a
```
If the execution fails, the contract will stop with an exception
If a is a contract address, its code will be executed with the transfer call.

Low level counterpart of transfer (returns 'false' on fail):
```
bool success = a.send(10);
```
*NOTE*: send is dangerous, use transfer or the withdraw pattern.


**call, callcode, delegatecall**: interface with contracts that do not adhere with the ABI.<br>
*NOTE*: Only use as last resort, they break the type-safety of Solidity.
Arguments of call are padded to bytes32 type.
Returns bool that indicates if the function terminated (true) or threw an exception (false).
```
address nameReg = 0x72ba7d8e73fe8eb666ea66babc8116a41bfb10e2;
nameReg.call("register", "MyName");
nameReg.call(bytes4(keccak256("fun(uint256)")), a); // function signature
```

Adjust the supplied gas with .gas():
```
namReg.call.gas(1000000)("register", "MyName");
```

Control the supplied ether value:
```
nameReg.call.value(1 ether)("register", "MyName");
```

Combine both:
```
nameReg.call.gas(1000000).value(1 ether)("register", "MyName");
```

Query the **balance of the current contract**:
```
this.balance;
```

### Fixed-size byte arrays
`bytes1`, `bytes2`, `bytes3`, up to `bytes32`<br>
`bytes` is an alias for `bytes1`.

Comparisons and bit operators can be used like on ints.

**Index access**:
```
bytes2 b2 = "hi";
byte b1 = b2[0]; // access first byte, read only!
```

**Length**:
```
b1.length; // returns the fixed length of the byte array 
```

`bytes` and `string` are not value types!

### Rational and integer literals
**Decimal fraction literals**:<br>
```
1.
.1
1.3
```

**Scientific notation** is supported:
```
2e10
-2e10
2e-10
2.5e1
```

Division on integers converts to a rational number, but it cannot be stored in any way yet.
```
int i = 5 / 2; // this throws a compiler error
int j = 6 / 2; // this works
```

### String literals
```
"use double quotes"
'or single quotes'
```

They are implicitly convertible to `bytes1` ... `bytes32` **if they fit**.

**Escape characters** are possible:
```
\n // and the like
\xNN // hex
\uNNNN // unicode
```

### Hexadecimal literals
```
hex"001122FF"
```
The content must be a hexadecimal string.
The value will be the binary representation..
They behave like string literals.

### Enums
```
enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
ActionChoices choice = ActionChoices.GoStraight;
```

### Function types
**internal functions**<br>
Can only be called inside the current contract. This is the *default* for functions.

Use internal functions in **libraries**:
```
library SomeLibrary {
    // declare internal functions
}

contract SomeContract {
    using SomeLibrary for *;
    // use internal functions
}
```

**external functions**<br>
Consist of an address and a function signature.

Use external functions between **contracts**:
```
contract Oracle {
    // define external functions
}

contract OracleUser {
    Oracle constant oracle = Oracle(0x1234567); // known contract
    oracle.query(...);
}
```


**Notation**:
```
function (<parameter types>) {internal|external} [pure|constant|view|payable] [returns (<return types>)]
```

Access the function type:
```
f // call by name -> internal function
this.f // -> external function
```

Return the ABI function selector:
```
this.f.selector; // type: bytes4
```

## Reference Types
Reference types have to be handled more carefully, because storing them in **storage** is expensive.

### Data location
Complex types (arrays & structs) have a data location (`storage` or `memory`).
* Default for function parameters is `memory`
* Default for local variables is `storage`
* `storage` is forced for state variables

There is a third location `calldata` where function arguments are stored.

### Arrays
Can have a fixed size or can be dynamic.

Array of 5 dynamic arrays of uint:
```
uint[][5] a;
uint a32 = a[2][3]; // access second uint in third array
```
**NOTE**: notation is reversed!!!

**USEFUL** - convert from string to bytes:
```
string memory s = "hello world";
b = bytes(s); 
```

Create a **getter** for arrays automatically by marking them `public`:
```
int32 public intArray;
```
But values can only be obtained with a numeric index.

#### Allocating Memory Arrays
Use `new` for arrays with variable length in *memory*.
```
uint[] memory a = new uint[](7);
bytes memory b = new bytes(7);
```

#### Array Literals / Inline Arrays
Arrays written as an expression:
```
[uint(1), 2, 3]; // evaluates to a 'uint8[3] memory' array
```
The cast on the first element is necessary to define the type.
They cannot be assigned to dynamic arrays at the moment.

#### Members
* length<br>
*Dynamic* arrays can be resized in *storage* with `.length`.<br>
The size of *memory* arrays is fixed once they are created.

* push<br>
Use `push` to append an element on dynamic storage arrays and `bytes`.

**NOTE**:<br>
It is not possible to return dynamic content from external function calls.
The only workaround now is to use large statically-sized arrays.


### Structs
```
struct Funder {
    address addr;
    uint amount;
}

Funder f1 = Funder({addr: msg.sender, amount: msg.value}); // create with names
Funder f2 = Funder(msg.sender, msg.value); // simple create
f1.amount += msg.value; // access
```

## Mappings
Formal definition:
```
mapping(_KeyType => _ValueType)
```
* Keytype can be almost anything except for a mapping, dynamically sized array, contract, enum or struct.
* ValueType can be anything, even another mapping.

The key data is not actually stored in a mapping, only its `keccak256` hash.
Mappings do not have a length.
Mappings are only allowed for **state variables** (or storage reference types in internal functions).

The only way to retreive a value from a mapping is by its key. Mappings are not enumerable.

Example:
```
// declaration
mapping(address => Voter) public voters;

// change a value in a mapping
chairperson = msg.sender;
voters[chairperson].weight = 1;
```

## LValue Operators
```
a += e;
a -= e;
a *= e;
a /= e;
a %= e;
a |= e;
a &= e;
a ^= e;
a++;
a--;
++a;
--a;
```

### delete
`delete` assigns the initial value for the type of a:
```
int i = 42;
delete i; // i is now 0
```
Delete on dynamic arrays assigns an array of size 0.<br>
Delete on static arrays resets all values.<br>
Delete on structs resets all values.

## Conversions

### Implicit conversions
Possible when no information is lost:
* `uint8` to `uint17` is possible
* `int128` to `int256` is possible
* `int8` to `uint256` is NOT possible
* uints can be converted to bytes of the same size or larger
* `uint160` can be converted to `address`

### Explicit conversions
Use with care!
```
int8 y = -3;
uint x = uint(y);
```

```
uint32 a = 0x12345678;
uint16 b = uint16(a); // b will be 0x5678 now -> information loss
```

## Type Deduction (var)
It is not necessary everytime to assign a type.
```
uint24 x = 0x123;
var y = x; // y has type uint24 automatically here
```

# Units and global variables

## Ether units
Possible ways to work with ether units:
* Literal number with suffix (`wei`, `finney`, `szabo`, `ether`)
* Literal number without suffix is always `wei`

Calculation works as expected.
```
2 ether == 2000 finney // evaluates to true
```

## Time units
Calculation works as expected.<br>
The base unit is *seconds*.
```
1 == 1 seconds
1 minutes == 60 seconds
1 hours == 60 minutes
1 days == 24 hours
1 weeks == 7 days
1 years == 365 days
```

The suffixes cannot be applied to variables. Do it like this:
```
uint daysAfter = 42;
if (now >= daysAfter * 1 days) {...};

```

## Special variables and functions

### Block and transaction properties
* `block.blockhash(uint blockNumber)` returns (`bytes32`): hash of the given block - only works for 256 most recent blocks excluding current
* `block.coinbase` (`address`): current block miner’s address
* `block.difficulty` (`uint`): current block difficulty
* `block.gaslimit` (`uint`): current block gaslimit
* `block.number` (`uint`): current block number
* `block.timestamp` (`uint`): current block timestamp as seconds since unix epoch
* `gasleft()` returns (`uint256`): remaining gas
* `msg.data` (`bytes`): complete calldata
* `msg.sender` (`address`): sender of the message (current call)
* `msg.sig` (`bytes4`): first four bytes of the calldata (i.e. function identifier)
* `msg.value` (`uint`): number of wei sent with the message
* `now` (`uint`): current block timestamp (alias for block.timestamp)
* `tx.gasprice` (`uint`): gas price of the transaction
* `tx.origin` (`address`): sender of the transaction (full call chain)

**NOTE:** `now` is just the timestamp from the block!

### Error handling
```
assert(bool condition) // for internal errors
require(bool condition) // for errors in inputs or external components
revert() // abort execution, revert state changes
```

### Mathematical and cryptographic functions
```
addmod(uint x, uint y, uint k) returns (uint) // compute (x + y) % k
mulmod(uint x, uint y, uint k) returns (uint): // compute (x * y) % k
keccak256(...) returns (bytes32) // compute Ethereum-SHA-3 hash of args
sha256(...) returns (bytes32) // compute SHA-256 hash of args
sha3(...) returns (bytes32) // alias to keccak256()
ripemd160(...) returns (bytes20) // compute RIPEMD-160 hash of args
ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address) // elliptic curve signature
```
The arguments are packed without padding.<br>
[ecrecover example](https://ethereum.stackexchange.com/questions/1777/workflow-on-signing-a-string-with-private-key-followed-by-signature-verificatio)

### Address related
```
<address>.balance (uint256) // balance of the address in wei
<address>.transfer(uint256 amount) // send amount of wei to address, throws on failure
<address>.send(uint256 amount) returns (bool) // send amount of wei to address, returns false on failure
```

### Contract related
```
this // the current contract, convertible to address
selfdestruct(address recipient) // destroy current contract, send funds to address
```


# Expressions and control structures

## Input parameters
```
function taker(uint _a, uint _b) public pure {
    // do something with _a and _b.
}
```
## Output parameters
Returning multiple values is possible.
```
function arithmetics(uint _a, uint _b)
    public
    pure
    returns (uint a, uint b)
{
    a = 1;
    b = 2;
}
```
Return parameters are initialized to zero.

## Control structures
They can be used the same as in C or Javascript:
* `if`
* `else`
* `while`
* `do`
* `for`
* `break`
* `continue`
* `return`
* `? :`

There is no type conversion from non-boolean to boolean (`1` is not `true`!).

## Function calls

### Internal function calls
Internal functions (from the same contract) can be used recursively.

### External function calls
```
this.g(8);
c.g(8) // where c is a contract instance
```

Amount of wei and gas can be specified when calling functions from other contracts:
```
contract InfoFeed {
    function info() public payable returns (uint ret) { return 42; }
}

contract Consumer {
    InfoFeed feed; // contract instance
    function callFeed() public { feed.info.value(10).gas(800)(); }
}
```
`payable` must be used for `info()` to have the `.value()` option.

**WARNING**:<br>
Called contracts can change state from our own contracts. Write functions in a way that calls to external functions happen after any changes to state variables in our contract so our contract is not vulnerable to a *reentrancy exploit*.

### Named calls
Enclose args in `{}`, then the order doesn't matter:
```
f({value: 2, key: 3});
```

## Creating contracts with new & constructors
Contracts can create other contracts with `new`:
```
contract D {
    uint x;
    function D(uint a) public payable { // ctor
        x = a;
    }
}

contract C {
    D d = new D(4); // will be executed as part of C's constructor

    function createD(uint arg) public {
        D newD = new D(arg);
    }
}
```

## Assignment
Tuple syntax is possible:
```
function f() public pure returns (uint, bool, uint) {
    return (7, true, 2);
}

var (x, b, y) = f(); // specifying types is not possible here
(x, y) = (2, 7); // assign to predefined variables
(x, y) = (y, x); // swap
(data.length,) = f(); // rest of the values can be ignored (returns 2 values but we only care about first)
(,data[3]) = f(); // ignore beginning values
(x,) = (1,); // one component tuple
```

## Scoping and declarations
For version 0.4.x, a variable declared anywhere in a function is available everywhere in the function (like Javascript).<br>
In version 0.5.x, this will change.

## Error handling (Assert, Require, Revert, Exceptions)
Solidity uses state-reverting exceptions.

* Use `assert` to check invariants
* Use `require` to ensure input values
* Use `revert` to throw an exception, revert the current call (and done subcalls)

Catching exceptions is not yet possible.

`assert` will use all gas, `require` uses none.

# Contracts

## Creating Contracts
With web3js: [web3.eth.Contract](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#new-contract)

Only one constructor is allowed --> ctor overloading is not possible.
Cyclic dependencies between contracts are not possible.

## Visibility and getters

There are two kinds of function calls in Solidity, so there are four types of **visibilities for functions**.

### external
Called via other contracts and transactions.

To call it from inside a contract, we have to use `this.f()`.

### public (default)
Call internally or via messages.
For public state variables, a getter is generated automatically.

### internal
Functions and state variables can only be accessed from within the *contract (or deriving contracts)*.

### private
Functions and state variables can only be accessed from within the *contract*.

**NOTE:** private stuff is still visible for everyone, just not accessible!

## Getter functions
The compiler automatically creates getter-functions for public state variables.

This:
```
contract Complex {
    struct Data {
        uint a;
        bytes3 b;
        mapping (uint => uint) map;
    }
    mapping (uint => mapping(bool => Data[])) public data;
}
```
will generate the following function:
```
function data(uint arg1, bool arg2, uint arg3) public returns (uint a, bytes3 b) {
    a = data[arg1][arg2][arg3].a;
    b = data[arg1][arg2][arg3].b;
}
```

## Function modifiers
Modifiers can change the behaviour of functions.
The function body is inserted where the special symbol **_** appears.

```
modifier onlyOwner {
    require(msg.sender == owner);
    _;
}

function changePrice(uint _price) public onlyOwner {
    price = _price;
}
```

Multiple modifiers can be used in a whitespace-separated list.
All symbols visible in the function are visible for the modifier.

## Constant state variables
State variables can be declared as `constant`. Then they have to be assigned from an expression which is a constant at compile time.

These functions are allowed:
* `keccak256`
* `sha256`
* `ripemd160`
* `ecrecover`
* `addmod`
* `mulmod`

The only supported types valid for now are **value types** and **strings**.


## Funtions

### View functions
Promise **not to modify state**. Can be declared with `view`.

These things are considered to modify state:
* Writing to state variables
* Emitting events
* Creating other contracts
* Using `selfdestruct`
* Sending ether
* Calling functions not marked `view` or `pure`
* Using low-level calls
* Using inline assembly with opcodes

**NOTE:** getter methods are marked `view`.

### Pure functions
Functions that do **not read from or modify the state**.

These things are considered to read from state:
* Reading from state variables
* Accessing `this.balance` or `<address>.balance`
* Accessing `block`, `tx` or `msg`
* Calling functions not marked with `pure`
* Inline assembly with opcodes

### Fallback function
The unnamed function. This is called when no other function matches the function identifier.

Sending ether to this contract will cause an exception (no other functions are defined):
```
uint x;
function() public { x = 1; }
```

If ether is sent to this contract, there is no way to get it back:
```
function() public payable { }
```

### Function overloading
Function overloading is possible (but not for ctors).

```
contract A {
    function f(uint _in) public pure returns (uint out) {
        out = 1;
    }

    function f(uint _in, bytes32 _key) public pure returns (uint out) {
        out = 2;
    }
}
```

If there is not exactly one candidate for the function, resolution fails.
For example: `f(unit8)` and `f(uint256)` fails when `f` is called with a `uint8` value or below.

## Events
The "logging" mechanism of ethereum.

SPV proofs are possible:
If an external entity supplies a contract with an SPV proof, it can check that the log actually exists in the blockchain (but block headers have to be supplied).

Up to three arguments can receive the attribute `indexed`. We can then search for these arguments.
Indexed arguments will not be stored themselves, we can only search for these values.
If arrays are used as indexed arguments, their `keccak256` hash will be stored.

With `anonymous`, the signature of the event is not stored.
All non-indexed arguments will be stored in the data part of the log.

Event example:
```
contract ClientReceipt {
    event Deposit(
        address indexed _from,
        bytes32 indexed _id,
        uint _value
    );

    function deposit(bytes32 _id) public payable {
        emit Deposit(msg.sender, _id, msg.value); // 'Deposit' is now filterable with JS
    }
}
```

Look for events with *javascript*:
```
var abi = /* abi as generated by the compiler */;
var ClientReceipt = web3.eth.contract(abi);
var clientReceipt = ClientReceipt.at("0x1234...ab67" /* address */);

var event = clientReceipt.Deposit();

// watch for changes
event.watch(function(error, result){
    // result will contain various information
    // including the argumets given to the `Deposit`
    // call.
    if (!error)
        console.log(result);
});

// or callback to start watching immediately
var event = clientReceipt.Deposit(function(error, result) {
    if (!error)
        console.log(result);
});
```

There is also a **low-level interface** for logs.


## Inheritance
Solidity supports multiple inheritance.
All functions are *virtual* (most derived function is called).

The code from inherited contracts is copied into one contract.

Use `is` to derive from another contract.

If a contract doesn't implement all functions, it can only be used as an interface:
```
function lookup(uint id) public returns (address adr); // 'abstract' function
```

Multiple inheritance is possible:
```
contract named is owned, mortal { ... }
```

Functions can be overridden by another function with the same name and the same number/types of inputs.

If the constructor takes an argument, it must be provided like this:
```
contract PriceFeed is named("GoldFeed") { ... }
```

To specifically access functions from base contracts, use `super`:
```
contract Base is mortal {
    function kill() public { super.kill(); }
}
```

### Constructors
Constructor functions can be `public` or `internal`.

```
contract B is A(1) {
    function B() public {}
}
```

An `internal` ctor marks the contract as abstract!

### Arguments for base constructors
```
contract Base {
    uint x;
    function Base(uint _x) public { x = _x; }
}

contract Derived is Base(7) {
    function Derived(uint _y) Base(_y * _y) public {
    }
}
```


## Abstract contracts
Contracts where at least one function is not implemented.

This is a function declaration:
```
function foo(address) external returns (address);
```

Careful: this is a function type (variable which type is a function):
```
function(address) external returns (address) foo;
```


## Interfaces
* Cannot have any functions implemented
* Cannot inherit other contracts or interfaces
* Cannot define variables
* Cannot define structs
* Cannot define enums

Use keyword `interface`:
```
interface Token {
    function transfer(address recipient, uint amount) public;
}
```


## Libraries
Libraries are assumed to be stateless. They are deployed only once at a specific address.

Restrictions in comparison to contracts
* No state variables
* Cannot inherit or be inherited
* Cannot receive ether

Example:
```
library Set {
  // type of Data is 'storage reference', so only the storage address, not the content is saved here
  struct Data { mapping(uint => bool) flags; } // will be used in the calling contract!

  function insert(Data storage self, uint value)
      public
      returns (bool)
  {
      if (self.flags[value])
          return false; // already there
      self.flags[value] = true;
      return true;
  }
  // ...

contract C {
    Set.Data knownValues;

    function register(uint value) public {
        // library functions can be called without a specific instance!
        // the 'instance' is the current contract...
        require(Set.insert(knownValues, value));
    }
```

## Using for
Attach library functions to any type:
```
using A for B; // where A is the library and B the type
```

With the example from above:
```
contract C {
    using Set for Set.Data; // this is the crucial change
    Set.Data knownValues;

    function register(uint value) public {
        // Here, all variables of type Set.Data have
        // corresponding member functions.
        // The following function call is identical to
        // `Set.insert(knownValues, value)`
        require(knownValues.insert(value));
    }
}
```

We can also extend elementary types:
```
using Search for uint[];
```
