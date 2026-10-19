import { e as Rn, d as Zs, g as Ss } from "./vendor-react-BPvvDyqO.js";
import { r as Le } from "./vendor-buffer-CTvp1cCp.js";
import { t as ol } from "./vendor-aws-hJDgVEKM.js";
function Is(t, d) {
  for (var g = 0; g < d.length; g++) {
    const i = d[g];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const l in i) if (l !== "default" && !(l in t)) {
        const r = Object.getOwnPropertyDescriptor(i, l);
        r && Object.defineProperty(t, l, r.get ? r : { enumerable: true, get: () => i[l] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var qt = {}, Js = {}, Qs = {};
const cl = {}, ll = Object.freeze(Object.defineProperty({ __proto__: null, default: cl }, Symbol.toStringTag, { value: "Module" })), Bt = Rn(ll);
var Xi;
function ft() {
  return Xi || (Xi = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.inspect = void 0;
    var d = Bt;
    Object.defineProperty(t, "inspect", { enumerable: true, get: function() {
      return d.inspect;
    } });
  })(Qs)), Qs;
}
var Xs = { exports: {} }, Yi;
function Ke() {
  return Yi || (Yi = 1, (function(t) {
    var d = (function(g) {
      var i = 1e7, l = 7, r = 9007199254740992, e = S(r), s = "0123456789abcdefghijklmnopqrstuvwxyz", n = typeof BigInt == "function";
      function a(A, D, j, Z) {
        return typeof A > "u" ? a[0] : typeof D < "u" ? +D == 10 && !j ? Se(A) : De(A, D, j, Z) : Se(A);
      }
      function o(A, D) {
        this.value = A, this.sign = D, this.isSmall = false;
      }
      o.prototype = Object.create(a.prototype);
      function c(A) {
        this.value = A, this.sign = A < 0, this.isSmall = true;
      }
      c.prototype = Object.create(a.prototype);
      function u(A) {
        this.value = A;
      }
      u.prototype = Object.create(a.prototype);
      function _(A) {
        return -r < A && A < r;
      }
      function S(A) {
        return A < 1e7 ? [A] : A < 1e14 ? [A % 1e7, Math.floor(A / 1e7)] : [A % 1e7, Math.floor(A / 1e7) % 1e7, Math.floor(A / 1e14)];
      }
      function $(A) {
        m(A);
        var D = A.length;
        if (D < 4 && U(A, e) < 0) switch (D) {
          case 0:
            return 0;
          case 1:
            return A[0];
          case 2:
            return A[0] + A[1] * i;
          default:
            return A[0] + (A[1] + A[2] * i) * i;
        }
        return A;
      }
      function m(A) {
        for (var D = A.length; A[--D] === 0; ) ;
        A.length = D + 1;
      }
      function h(A) {
        for (var D = new Array(A), j = -1; ++j < A; ) D[j] = 0;
        return D;
      }
      function I(A) {
        return A > 0 ? Math.floor(A) : Math.ceil(A);
      }
      function b(A, D) {
        var j = A.length, Z = D.length, P = new Array(j), O = 0, z = i, J, L;
        for (L = 0; L < Z; L++) J = A[L] + D[L] + O, O = J >= z ? 1 : 0, P[L] = J - O * z;
        for (; L < j; ) J = A[L] + O, O = J === z ? 1 : 0, P[L++] = J - O * z;
        return O > 0 && P.push(O), P;
      }
      function f(A, D) {
        return A.length >= D.length ? b(A, D) : b(D, A);
      }
      function p(A, D) {
        var j = A.length, Z = new Array(j), P = i, O, z;
        for (z = 0; z < j; z++) O = A[z] - P + D, D = Math.floor(O / P), Z[z] = O - D * P, D += 1;
        for (; D > 0; ) Z[z++] = D % P, D = Math.floor(D / P);
        return Z;
      }
      o.prototype.add = function(A) {
        var D = Se(A);
        if (this.sign !== D.sign) return this.subtract(D.negate());
        var j = this.value, Z = D.value;
        return D.isSmall ? new o(p(j, Math.abs(Z)), this.sign) : new o(f(j, Z), this.sign);
      }, o.prototype.plus = o.prototype.add, c.prototype.add = function(A) {
        var D = Se(A), j = this.value;
        if (j < 0 !== D.sign) return this.subtract(D.negate());
        var Z = D.value;
        if (D.isSmall) {
          if (_(j + Z)) return new c(j + Z);
          Z = S(Math.abs(Z));
        }
        return new o(p(Z, Math.abs(j)), j < 0);
      }, c.prototype.plus = c.prototype.add, u.prototype.add = function(A) {
        return new u(this.value + Se(A).value);
      }, u.prototype.plus = u.prototype.add;
      function w(A, D) {
        var j = A.length, Z = D.length, P = new Array(j), O = 0, z = i, J, L;
        for (J = 0; J < Z; J++) L = A[J] - O - D[J], L < 0 ? (L += z, O = 1) : O = 0, P[J] = L;
        for (J = Z; J < j; J++) {
          if (L = A[J] - O, L < 0) L += z;
          else {
            P[J++] = L;
            break;
          }
          P[J] = L;
        }
        for (; J < j; J++) P[J] = A[J];
        return m(P), P;
      }
      function M(A, D, j) {
        var Z;
        return U(A, D) >= 0 ? Z = w(A, D) : (Z = w(D, A), j = !j), Z = $(Z), typeof Z == "number" ? (j && (Z = -Z), new c(Z)) : new o(Z, j);
      }
      function T(A, D, j) {
        var Z = A.length, P = new Array(Z), O = -D, z = i, J, L;
        for (J = 0; J < Z; J++) L = A[J] + O, O = Math.floor(L / z), L %= z, P[J] = L < 0 ? L + z : L;
        return P = $(P), typeof P == "number" ? (j && (P = -P), new c(P)) : new o(P, j);
      }
      o.prototype.subtract = function(A) {
        var D = Se(A);
        if (this.sign !== D.sign) return this.add(D.negate());
        var j = this.value, Z = D.value;
        return D.isSmall ? T(j, Math.abs(Z), this.sign) : M(j, Z, this.sign);
      }, o.prototype.minus = o.prototype.subtract, c.prototype.subtract = function(A) {
        var D = Se(A), j = this.value;
        if (j < 0 !== D.sign) return this.add(D.negate());
        var Z = D.value;
        return D.isSmall ? new c(j - Z) : T(Z, Math.abs(j), j >= 0);
      }, c.prototype.minus = c.prototype.subtract, u.prototype.subtract = function(A) {
        return new u(this.value - Se(A).value);
      }, u.prototype.minus = u.prototype.subtract, o.prototype.negate = function() {
        return new o(this.value, !this.sign);
      }, c.prototype.negate = function() {
        var A = this.sign, D = new c(-this.value);
        return D.sign = !A, D;
      }, u.prototype.negate = function() {
        return new u(-this.value);
      }, o.prototype.abs = function() {
        return new o(this.value, false);
      }, c.prototype.abs = function() {
        return new c(Math.abs(this.value));
      }, u.prototype.abs = function() {
        return new u(this.value >= 0 ? this.value : -this.value);
      };
      function k(A, D) {
        var j = A.length, Z = D.length, P = j + Z, O = h(P), z = i, J, L, X, x, ie;
        for (X = 0; X < j; ++X) {
          x = A[X];
          for (var me = 0; me < Z; ++me) ie = D[me], J = x * ie + O[X + me], L = Math.floor(J / z), O[X + me] = J - L * z, O[X + me + 1] += L;
        }
        return m(O), O;
      }
      function B(A, D) {
        var j = A.length, Z = new Array(j), P = i, O = 0, z, J;
        for (J = 0; J < j; J++) z = A[J] * D + O, O = Math.floor(z / P), Z[J] = z - O * P;
        for (; O > 0; ) Z[J++] = O % P, O = Math.floor(O / P);
        return Z;
      }
      function C(A, D) {
        for (var j = []; D-- > 0; ) j.push(0);
        return j.concat(A);
      }
      function E(A, D) {
        var j = Math.max(A.length, D.length);
        if (j <= 30) return k(A, D);
        j = Math.ceil(j / 2);
        var Z = A.slice(j), P = A.slice(0, j), O = D.slice(j), z = D.slice(0, j), J = E(P, z), L = E(Z, O), X = E(f(P, Z), f(z, O)), x = f(f(J, C(w(w(X, J), L), j)), C(L, 2 * j));
        return m(x), x;
      }
      function q(A, D) {
        return -0.012 * A - 0.012 * D + 15e-6 * A * D > 0;
      }
      o.prototype.multiply = function(A) {
        var D = Se(A), j = this.value, Z = D.value, P = this.sign !== D.sign, O;
        if (D.isSmall) {
          if (Z === 0) return a[0];
          if (Z === 1) return this;
          if (Z === -1) return this.negate();
          if (O = Math.abs(Z), O < i) return new o(B(j, O), P);
          Z = S(O);
        }
        return q(j.length, Z.length) ? new o(E(j, Z), P) : new o(k(j, Z), P);
      }, o.prototype.times = o.prototype.multiply;
      function W(A, D, j) {
        return A < i ? new o(B(D, A), j) : new o(k(D, S(A)), j);
      }
      c.prototype._multiplyBySmall = function(A) {
        return _(A.value * this.value) ? new c(A.value * this.value) : W(Math.abs(A.value), S(Math.abs(this.value)), this.sign !== A.sign);
      }, o.prototype._multiplyBySmall = function(A) {
        return A.value === 0 ? a[0] : A.value === 1 ? this : A.value === -1 ? this.negate() : W(Math.abs(A.value), this.value, this.sign !== A.sign);
      }, c.prototype.multiply = function(A) {
        return Se(A)._multiplyBySmall(this);
      }, c.prototype.times = c.prototype.multiply, u.prototype.multiply = function(A) {
        return new u(this.value * Se(A).value);
      }, u.prototype.times = u.prototype.multiply;
      function G(A) {
        var D = A.length, j = h(D + D), Z = i, P, O, z, J, L;
        for (z = 0; z < D; z++) {
          J = A[z], O = 0 - J * J;
          for (var X = z; X < D; X++) L = A[X], P = 2 * (J * L) + j[z + X] + O, O = Math.floor(P / Z), j[z + X] = P - O * Z;
          j[z + D] = O;
        }
        return m(j), j;
      }
      o.prototype.square = function() {
        return new o(G(this.value), false);
      }, c.prototype.square = function() {
        var A = this.value * this.value;
        return _(A) ? new c(A) : new o(G(S(Math.abs(this.value))), false);
      }, u.prototype.square = function(A) {
        return new u(this.value * this.value);
      };
      function te(A, D) {
        var j = A.length, Z = D.length, P = i, O = h(D.length), z = D[Z - 1], J = Math.ceil(P / (2 * z)), L = B(A, J), X = B(D, J), x, ie, me, pe, Ee, be, Pe;
        for (L.length <= j && L.push(0), X.push(0), z = X[Z - 1], ie = j - Z; ie >= 0; ie--) {
          for (x = P - 1, L[ie + Z] !== z && (x = Math.floor((L[ie + Z] * P + L[ie + Z - 1]) / z)), me = 0, pe = 0, be = X.length, Ee = 0; Ee < be; Ee++) me += x * X[Ee], Pe = Math.floor(me / P), pe += L[ie + Ee] - (me - Pe * P), me = Pe, pe < 0 ? (L[ie + Ee] = pe + P, pe = -1) : (L[ie + Ee] = pe, pe = 0);
          for (; pe !== 0; ) {
            for (x -= 1, me = 0, Ee = 0; Ee < be; Ee++) me += L[ie + Ee] - P + X[Ee], me < 0 ? (L[ie + Ee] = me + P, me = 0) : (L[ie + Ee] = me, me = 1);
            pe += me;
          }
          O[ie] = x;
        }
        return L = he(L, J)[0], [$(O), $(L)];
      }
      function oe(A, D) {
        for (var j = A.length, Z = D.length, P = [], O = [], z = i, J, L, X, x, ie; j; ) {
          if (O.unshift(A[--j]), m(O), U(O, D) < 0) {
            P.push(0);
            continue;
          }
          L = O.length, X = O[L - 1] * z + O[L - 2], x = D[Z - 1] * z + D[Z - 2], L > Z && (X = (X + 1) * z), J = Math.ceil(X / x);
          do {
            if (ie = B(D, J), U(ie, O) <= 0) break;
            J--;
          } while (J);
          P.push(J), O = w(O, ie);
        }
        return P.reverse(), [$(P), $(O)];
      }
      function he(A, D) {
        var j = A.length, Z = h(j), P = i, O, z, J, L;
        for (J = 0, O = j - 1; O >= 0; --O) L = J * P + A[O], z = I(L / D), J = L - z * D, Z[O] = z | 0;
        return [Z, J | 0];
      }
      function H(A, D) {
        var j, Z = Se(D);
        if (n) return [new u(A.value / Z.value), new u(A.value % Z.value)];
        var P = A.value, O = Z.value, z;
        if (O === 0) throw new Error("Cannot divide by zero");
        if (A.isSmall) return Z.isSmall ? [new c(I(P / O)), new c(P % O)] : [a[0], A];
        if (Z.isSmall) {
          if (O === 1) return [A, a[0]];
          if (O == -1) return [A.negate(), a[0]];
          var J = Math.abs(O);
          if (J < i) {
            j = he(P, J), z = $(j[0]);
            var L = j[1];
            return A.sign && (L = -L), typeof z == "number" ? (A.sign !== Z.sign && (z = -z), [new c(z), new c(L)]) : [new o(z, A.sign !== Z.sign), new c(L)];
          }
          O = S(J);
        }
        var X = U(P, O);
        if (X === -1) return [a[0], A];
        if (X === 0) return [a[A.sign === Z.sign ? 1 : -1], a[0]];
        P.length + O.length <= 200 ? j = te(P, O) : j = oe(P, O), z = j[0];
        var x = A.sign !== Z.sign, ie = j[1], me = A.sign;
        return typeof z == "number" ? (x && (z = -z), z = new c(z)) : z = new o(z, x), typeof ie == "number" ? (me && (ie = -ie), ie = new c(ie)) : ie = new o(ie, me), [z, ie];
      }
      o.prototype.divmod = function(A) {
        var D = H(this, A);
        return { quotient: D[0], remainder: D[1] };
      }, u.prototype.divmod = c.prototype.divmod = o.prototype.divmod, o.prototype.divide = function(A) {
        return H(this, A)[0];
      }, u.prototype.over = u.prototype.divide = function(A) {
        return new u(this.value / Se(A).value);
      }, c.prototype.over = c.prototype.divide = o.prototype.over = o.prototype.divide, o.prototype.mod = function(A) {
        return H(this, A)[1];
      }, u.prototype.mod = u.prototype.remainder = function(A) {
        return new u(this.value % Se(A).value);
      }, c.prototype.remainder = c.prototype.mod = o.prototype.remainder = o.prototype.mod, o.prototype.pow = function(A) {
        var D = Se(A), j = this.value, Z = D.value, P, O, z;
        if (Z === 0) return a[1];
        if (j === 0) return a[0];
        if (j === 1) return a[1];
        if (j === -1) return D.isEven() ? a[1] : a[-1];
        if (D.sign) return a[0];
        if (!D.isSmall) throw new Error("The exponent " + D.toString() + " is too large.");
        if (this.isSmall && _(P = Math.pow(j, Z))) return new c(I(P));
        for (O = this, z = a[1]; Z & true && (z = z.times(O), --Z), Z !== 0; ) Z /= 2, O = O.square();
        return z;
      }, c.prototype.pow = o.prototype.pow, u.prototype.pow = function(A) {
        var D = Se(A), j = this.value, Z = D.value, P = BigInt(0), O = BigInt(1), z = BigInt(2);
        if (Z === P) return a[1];
        if (j === P) return a[0];
        if (j === O) return a[1];
        if (j === BigInt(-1)) return D.isEven() ? a[1] : a[-1];
        if (D.isNegative()) return new u(P);
        for (var J = this, L = a[1]; (Z & O) === O && (L = L.times(J), --Z), Z !== P; ) Z /= z, J = J.square();
        return L;
      }, o.prototype.modPow = function(A, D) {
        if (A = Se(A), D = Se(D), D.isZero()) throw new Error("Cannot take modPow with modulus 0");
        var j = a[1], Z = this.mod(D);
        for (A.isNegative() && (A = A.multiply(a[-1]), Z = Z.modInv(D)); A.isPositive(); ) {
          if (Z.isZero()) return a[0];
          A.isOdd() && (j = j.multiply(Z).mod(D)), A = A.divide(2), Z = Z.square().mod(D);
        }
        return j;
      }, u.prototype.modPow = c.prototype.modPow = o.prototype.modPow;
      function U(A, D) {
        if (A.length !== D.length) return A.length > D.length ? 1 : -1;
        for (var j = A.length - 1; j >= 0; j--) if (A[j] !== D[j]) return A[j] > D[j] ? 1 : -1;
        return 0;
      }
      o.prototype.compareAbs = function(A) {
        var D = Se(A), j = this.value, Z = D.value;
        return D.isSmall ? 1 : U(j, Z);
      }, c.prototype.compareAbs = function(A) {
        var D = Se(A), j = Math.abs(this.value), Z = D.value;
        return D.isSmall ? (Z = Math.abs(Z), j === Z ? 0 : j > Z ? 1 : -1) : -1;
      }, u.prototype.compareAbs = function(A) {
        var D = this.value, j = Se(A).value;
        return D = D >= 0 ? D : -D, j = j >= 0 ? j : -j, D === j ? 0 : D > j ? 1 : -1;
      }, o.prototype.compare = function(A) {
        if (A === 1 / 0) return -1;
        if (A === -1 / 0) return 1;
        var D = Se(A), j = this.value, Z = D.value;
        return this.sign !== D.sign ? D.sign ? 1 : -1 : D.isSmall ? this.sign ? -1 : 1 : U(j, Z) * (this.sign ? -1 : 1);
      }, o.prototype.compareTo = o.prototype.compare, c.prototype.compare = function(A) {
        if (A === 1 / 0) return -1;
        if (A === -1 / 0) return 1;
        var D = Se(A), j = this.value, Z = D.value;
        return D.isSmall ? j == Z ? 0 : j > Z ? 1 : -1 : j < 0 !== D.sign ? j < 0 ? -1 : 1 : j < 0 ? 1 : -1;
      }, c.prototype.compareTo = c.prototype.compare, u.prototype.compare = function(A) {
        if (A === 1 / 0) return -1;
        if (A === -1 / 0) return 1;
        var D = this.value, j = Se(A).value;
        return D === j ? 0 : D > j ? 1 : -1;
      }, u.prototype.compareTo = u.prototype.compare, o.prototype.equals = function(A) {
        return this.compare(A) === 0;
      }, u.prototype.eq = u.prototype.equals = c.prototype.eq = c.prototype.equals = o.prototype.eq = o.prototype.equals, o.prototype.notEquals = function(A) {
        return this.compare(A) !== 0;
      }, u.prototype.neq = u.prototype.notEquals = c.prototype.neq = c.prototype.notEquals = o.prototype.neq = o.prototype.notEquals, o.prototype.greater = function(A) {
        return this.compare(A) > 0;
      }, u.prototype.gt = u.prototype.greater = c.prototype.gt = c.prototype.greater = o.prototype.gt = o.prototype.greater, o.prototype.lesser = function(A) {
        return this.compare(A) < 0;
      }, u.prototype.lt = u.prototype.lesser = c.prototype.lt = c.prototype.lesser = o.prototype.lt = o.prototype.lesser, o.prototype.greaterOrEquals = function(A) {
        return this.compare(A) >= 0;
      }, u.prototype.geq = u.prototype.greaterOrEquals = c.prototype.geq = c.prototype.greaterOrEquals = o.prototype.geq = o.prototype.greaterOrEquals, o.prototype.lesserOrEquals = function(A) {
        return this.compare(A) <= 0;
      }, u.prototype.leq = u.prototype.lesserOrEquals = c.prototype.leq = c.prototype.lesserOrEquals = o.prototype.leq = o.prototype.lesserOrEquals, o.prototype.isEven = function() {
        return (this.value[0] & 1) === 0;
      }, c.prototype.isEven = function() {
        return (this.value & 1) === 0;
      }, u.prototype.isEven = function() {
        return (this.value & BigInt(1)) === BigInt(0);
      }, o.prototype.isOdd = function() {
        return (this.value[0] & 1) === 1;
      }, c.prototype.isOdd = function() {
        return (this.value & 1) === 1;
      }, u.prototype.isOdd = function() {
        return (this.value & BigInt(1)) === BigInt(1);
      }, o.prototype.isPositive = function() {
        return !this.sign;
      }, c.prototype.isPositive = function() {
        return this.value > 0;
      }, u.prototype.isPositive = c.prototype.isPositive, o.prototype.isNegative = function() {
        return this.sign;
      }, c.prototype.isNegative = function() {
        return this.value < 0;
      }, u.prototype.isNegative = c.prototype.isNegative, o.prototype.isUnit = function() {
        return false;
      }, c.prototype.isUnit = function() {
        return Math.abs(this.value) === 1;
      }, u.prototype.isUnit = function() {
        return this.abs().value === BigInt(1);
      }, o.prototype.isZero = function() {
        return false;
      }, c.prototype.isZero = function() {
        return this.value === 0;
      }, u.prototype.isZero = function() {
        return this.value === BigInt(0);
      }, o.prototype.isDivisibleBy = function(A) {
        var D = Se(A);
        return D.isZero() ? false : D.isUnit() ? true : D.compareAbs(2) === 0 ? this.isEven() : this.mod(D).isZero();
      }, u.prototype.isDivisibleBy = c.prototype.isDivisibleBy = o.prototype.isDivisibleBy;
      function V(A) {
        var D = A.abs();
        if (D.isUnit()) return false;
        if (D.equals(2) || D.equals(3) || D.equals(5)) return true;
        if (D.isEven() || D.isDivisibleBy(3) || D.isDivisibleBy(5)) return false;
        if (D.lesser(49)) return true;
      }
      function K(A, D) {
        for (var j = A.prev(), Z = j, P = 0, O, z, J; Z.isEven(); ) Z = Z.divide(2), P++;
        e: for (z = 0; z < D.length; z++) if (!A.lesser(D[z]) && (J = d(D[z]).modPow(Z, A), !(J.isUnit() || J.equals(j)))) {
          for (O = P - 1; O != 0; O--) {
            if (J = J.square().mod(A), J.isUnit()) return false;
            if (J.equals(j)) continue e;
          }
          return false;
        }
        return true;
      }
      o.prototype.isPrime = function(A) {
        var D = V(this);
        if (D !== g) return D;
        var j = this.abs(), Z = j.bitLength();
        if (Z <= 64) return K(j, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
        for (var P = Math.log(2) * Z.toJSNumber(), O = Math.ceil(A === true ? 2 * Math.pow(P, 2) : P), z = [], J = 0; J < O; J++) z.push(d(J + 2));
        return K(j, z);
      }, u.prototype.isPrime = c.prototype.isPrime = o.prototype.isPrime, o.prototype.isProbablePrime = function(A, D) {
        var j = V(this);
        if (j !== g) return j;
        for (var Z = this.abs(), P = A === g ? 5 : A, O = [], z = 0; z < P; z++) O.push(d.randBetween(2, Z.minus(2), D));
        return K(Z, O);
      }, u.prototype.isProbablePrime = c.prototype.isProbablePrime = o.prototype.isProbablePrime, o.prototype.modInv = function(A) {
        for (var D = d.zero, j = d.one, Z = Se(A), P = this.abs(), O, z, J; !P.isZero(); ) O = Z.divide(P), z = D, J = Z, D = j, Z = P, j = z.subtract(O.multiply(j)), P = J.subtract(O.multiply(P));
        if (!Z.isUnit()) throw new Error(this.toString() + " and " + A.toString() + " are not co-prime");
        return D.compare(0) === -1 && (D = D.add(A)), this.isNegative() ? D.negate() : D;
      }, u.prototype.modInv = c.prototype.modInv = o.prototype.modInv, o.prototype.next = function() {
        var A = this.value;
        return this.sign ? T(A, 1, this.sign) : new o(p(A, 1), this.sign);
      }, c.prototype.next = function() {
        var A = this.value;
        return A + 1 < r ? new c(A + 1) : new o(e, false);
      }, u.prototype.next = function() {
        return new u(this.value + BigInt(1));
      }, o.prototype.prev = function() {
        var A = this.value;
        return this.sign ? new o(p(A, 1), true) : T(A, 1, this.sign);
      }, c.prototype.prev = function() {
        var A = this.value;
        return A - 1 > -r ? new c(A - 1) : new o(e, true);
      }, u.prototype.prev = function() {
        return new u(this.value - BigInt(1));
      };
      for (var F = [1]; 2 * F[F.length - 1] <= i; ) F.push(2 * F[F.length - 1]);
      var R = F.length, ee = F[R - 1];
      function Y(A) {
        return Math.abs(A) <= i;
      }
      o.prototype.shiftLeft = function(A) {
        var D = Se(A).toJSNumber();
        if (!Y(D)) throw new Error(String(D) + " is too large for shifting.");
        if (D < 0) return this.shiftRight(-D);
        var j = this;
        if (j.isZero()) return j;
        for (; D >= R; ) j = j.multiply(ee), D -= R - 1;
        return j.multiply(F[D]);
      }, u.prototype.shiftLeft = c.prototype.shiftLeft = o.prototype.shiftLeft, o.prototype.shiftRight = function(A) {
        var D, j = Se(A).toJSNumber();
        if (!Y(j)) throw new Error(String(j) + " is too large for shifting.");
        if (j < 0) return this.shiftLeft(-j);
        for (var Z = this; j >= R; ) {
          if (Z.isZero() || Z.isNegative() && Z.isUnit()) return Z;
          D = H(Z, ee), Z = D[1].isNegative() ? D[0].prev() : D[0], j -= R - 1;
        }
        return D = H(Z, F[j]), D[1].isNegative() ? D[0].prev() : D[0];
      }, u.prototype.shiftRight = c.prototype.shiftRight = o.prototype.shiftRight;
      function Q(A, D, j) {
        D = Se(D);
        for (var Z = A.isNegative(), P = D.isNegative(), O = Z ? A.not() : A, z = P ? D.not() : D, J = 0, L = 0, X = null, x = null, ie = []; !O.isZero() || !z.isZero(); ) X = H(O, ee), J = X[1].toJSNumber(), Z && (J = ee - 1 - J), x = H(z, ee), L = x[1].toJSNumber(), P && (L = ee - 1 - L), O = X[0], z = x[0], ie.push(j(J, L));
        for (var me = j(Z ? 1 : 0, P ? 1 : 0) !== 0 ? d(-1) : d(0), pe = ie.length - 1; pe >= 0; pe -= 1) me = me.multiply(ee).add(d(ie[pe]));
        return me;
      }
      o.prototype.not = function() {
        return this.negate().prev();
      }, u.prototype.not = c.prototype.not = o.prototype.not, o.prototype.and = function(A) {
        return Q(this, A, function(D, j) {
          return D & j;
        });
      }, u.prototype.and = c.prototype.and = o.prototype.and, o.prototype.or = function(A) {
        return Q(this, A, function(D, j) {
          return D | j;
        });
      }, u.prototype.or = c.prototype.or = o.prototype.or, o.prototype.xor = function(A) {
        return Q(this, A, function(D, j) {
          return D ^ j;
        });
      }, u.prototype.xor = c.prototype.xor = o.prototype.xor;
      var se = 1 << 30, ge = (i & -i) * (i & -i) | se;
      function ue(A) {
        var D = A.value, j = typeof D == "number" ? D | se : typeof D == "bigint" ? D | BigInt(se) : D[0] + D[1] * i | ge;
        return j & -j;
      }
      function ce(A, D) {
        if (D.compareTo(A) <= 0) {
          var j = ce(A, D.square(D)), Z = j.p, P = j.e, O = Z.multiply(D);
          return O.compareTo(A) <= 0 ? { p: O, e: P * 2 + 1 } : { p: Z, e: P * 2 };
        }
        return { p: d(1), e: 0 };
      }
      o.prototype.bitLength = function() {
        var A = this;
        return A.compareTo(d(0)) < 0 && (A = A.negate().subtract(d(1))), A.compareTo(d(0)) === 0 ? d(0) : d(ce(A, d(2)).e).add(d(1));
      }, u.prototype.bitLength = c.prototype.bitLength = o.prototype.bitLength;
      function ye(A, D) {
        return A = Se(A), D = Se(D), A.greater(D) ? A : D;
      }
      function v(A, D) {
        return A = Se(A), D = Se(D), A.lesser(D) ? A : D;
      }
      function le(A, D) {
        if (A = Se(A).abs(), D = Se(D).abs(), A.equals(D)) return A;
        if (A.isZero()) return D;
        if (D.isZero()) return A;
        for (var j = a[1], Z, P; A.isEven() && D.isEven(); ) Z = v(ue(A), ue(D)), A = A.divide(Z), D = D.divide(Z), j = j.multiply(Z);
        for (; A.isEven(); ) A = A.divide(ue(A));
        do {
          for (; D.isEven(); ) D = D.divide(ue(D));
          A.greater(D) && (P = D, D = A, A = P), D = D.subtract(A);
        } while (!D.isZero());
        return j.isUnit() ? A : A.multiply(j);
      }
      function ve(A, D) {
        return A = Se(A).abs(), D = Se(D).abs(), A.divide(le(A, D)).multiply(D);
      }
      function we(A, D, j) {
        A = Se(A), D = Se(D);
        var Z = j || Math.random, P = v(A, D), O = ye(A, D), z = O.subtract(P).add(1);
        if (z.isSmall) return P.add(Math.floor(Z() * z));
        for (var J = ke(z, i).value, L = [], X = true, x = 0; x < J.length; x++) {
          var ie = X ? J[x] + (x + 1 < J.length ? J[x + 1] / i : 0) : i, me = I(Z() * ie);
          L.push(me), me < J[x] && (X = false);
        }
        return P.add(a.fromArray(L, i, false));
      }
      var De = function(A, D, j, Z) {
        j = j || s, A = String(A), Z || (A = A.toLowerCase(), j = j.toLowerCase());
        var P = A.length, O, z = Math.abs(D), J = {};
        for (O = 0; O < j.length; O++) J[j[O]] = O;
        for (O = 0; O < P; O++) {
          var L = A[O];
          if (L !== "-" && L in J && J[L] >= z) {
            if (L === "1" && z === 1) continue;
            throw new Error(L + " is not a valid digit in base " + D + ".");
          }
        }
        D = Se(D);
        var X = [], x = A[0] === "-";
        for (O = x ? 1 : 0; O < A.length; O++) {
          var L = A[O];
          if (L in J) X.push(Se(J[L]));
          else if (L === "<") {
            var ie = O;
            do
              O++;
            while (A[O] !== ">" && O < A.length);
            X.push(Se(A.slice(ie + 1, O)));
          } else throw new Error(L + " is not a valid character");
        }
        return Me(X, D, x);
      };
      function Me(A, D, j) {
        var Z = a[0], P = a[1], O;
        for (O = A.length - 1; O >= 0; O--) Z = Z.add(A[O].times(P)), P = P.times(D);
        return j ? Z.negate() : Z;
      }
      function Ve(A, D) {
        return D = D || s, A < D.length ? D[A] : "<" + A + ">";
      }
      function ke(A, D) {
        if (D = d(D), D.isZero()) {
          if (A.isZero()) return { value: [0], isNegative: false };
          throw new Error("Cannot convert nonzero numbers to base 0.");
        }
        if (D.equals(-1)) {
          if (A.isZero()) return { value: [0], isNegative: false };
          if (A.isNegative()) return { value: [].concat.apply([], Array.apply(null, Array(-A.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };
          var j = Array.apply(null, Array(A.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
          return j.unshift([1]), { value: [].concat.apply([], j), isNegative: false };
        }
        var Z = false;
        if (A.isNegative() && D.isPositive() && (Z = true, A = A.abs()), D.isUnit()) return A.isZero() ? { value: [0], isNegative: false } : { value: Array.apply(null, Array(A.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: Z };
        for (var P = [], O = A, z; O.isNegative() || O.compareAbs(D) >= 0; ) {
          z = O.divmod(D), O = z.quotient;
          var J = z.remainder;
          J.isNegative() && (J = D.minus(J).abs(), O = O.next()), P.push(J.toJSNumber());
        }
        return P.push(O.toJSNumber()), { value: P.reverse(), isNegative: Z };
      }
      function qe(A, D, j) {
        var Z = ke(A, D);
        return (Z.isNegative ? "-" : "") + Z.value.map(function(P) {
          return Ve(P, j);
        }).join("");
      }
      o.prototype.toArray = function(A) {
        return ke(this, A);
      }, c.prototype.toArray = function(A) {
        return ke(this, A);
      }, u.prototype.toArray = function(A) {
        return ke(this, A);
      }, o.prototype.toString = function(A, D) {
        if (A === g && (A = 10), A !== 10 || D) return qe(this, A, D);
        for (var j = this.value, Z = j.length, P = String(j[--Z]), O = "0000000", z; --Z >= 0; ) z = String(j[Z]), P += O.slice(z.length) + z;
        var J = this.sign ? "-" : "";
        return J + P;
      }, c.prototype.toString = function(A, D) {
        return A === g && (A = 10), A != 10 || D ? qe(this, A, D) : String(this.value);
      }, u.prototype.toString = c.prototype.toString, u.prototype.toJSON = o.prototype.toJSON = c.prototype.toJSON = function() {
        return this.toString();
      }, o.prototype.valueOf = function() {
        return parseInt(this.toString(), 10);
      }, o.prototype.toJSNumber = o.prototype.valueOf, c.prototype.valueOf = function() {
        return this.value;
      }, c.prototype.toJSNumber = c.prototype.valueOf, u.prototype.valueOf = u.prototype.toJSNumber = function() {
        return parseInt(this.toString(), 10);
      };
      function Ue(A) {
        if (_(+A)) {
          var D = +A;
          if (D === I(D)) return n ? new u(BigInt(D)) : new c(D);
          throw new Error("Invalid integer: " + A);
        }
        var j = A[0] === "-";
        j && (A = A.slice(1));
        var Z = A.split(/e/i);
        if (Z.length > 2) throw new Error("Invalid integer: " + Z.join("e"));
        if (Z.length === 2) {
          var P = Z[1];
          if (P[0] === "+" && (P = P.slice(1)), P = +P, P !== I(P) || !_(P)) throw new Error("Invalid integer: " + P + " is not a valid exponent.");
          var O = Z[0], z = O.indexOf(".");
          if (z >= 0 && (P -= O.length - z - 1, O = O.slice(0, z) + O.slice(z + 1)), P < 0) throw new Error("Cannot include negative exponent part for integers");
          O += new Array(P + 1).join("0"), A = O;
        }
        var J = /^([0-9][0-9]*)$/.test(A);
        if (!J) throw new Error("Invalid integer: " + A);
        if (n) return new u(BigInt(j ? "-" + A : A));
        for (var L = [], X = A.length, x = l, ie = X - x; X > 0; ) L.push(+A.slice(ie, X)), ie -= x, ie < 0 && (ie = 0), X -= x;
        return m(L), new o(L, j);
      }
      function Ce(A) {
        if (n) return new u(BigInt(A));
        if (_(A)) {
          if (A !== I(A)) throw new Error(A + " is not an integer.");
          return new c(A);
        }
        return Ue(A.toString());
      }
      function Se(A) {
        return typeof A == "number" ? Ce(A) : typeof A == "string" ? Ue(A) : typeof A == "bigint" ? new u(A) : A;
      }
      for (var Ze = 0; Ze < 1e3; Ze++) a[Ze] = Se(Ze), Ze > 0 && (a[-Ze] = Se(-Ze));
      return a.one = a[1], a.zero = a[0], a.minusOne = a[-1], a.max = ye, a.min = v, a.gcd = le, a.lcm = ve, a.isInstance = function(A) {
        return A instanceof o || A instanceof c || A instanceof u;
      }, a.randBetween = we, a.fromArray = function(A, D, j) {
        return Me(A.map(Se), Se(D || 10), j);
      }, a;
    })();
    t.hasOwnProperty("exports") && (t.exports = d);
  })(Xs)), Xs.exports;
}
var Tn = {}, $t = {}, it = {}, dt = new Uint8Array(256), ms = new Uint8Array(256), _s = new Uint32Array(256), bs = new Uint32Array(256), vs = new Uint32Array(256), ys = new Uint32Array(256), xn = new Uint32Array(256), En = new Uint32Array(256), Mn = new Uint32Array(256), $n = new Uint32Array(256);
function ul() {
  for (var t = new Uint8Array(256), d = new Uint8Array(256), g, i, l, r, e, s, n = 0, a = 0, o = 0; o < 256; o++) t[o] = o << 1 ^ (o >> 7) * 283, d[t[o] ^ o] = o;
  for (; !dt[n]; n ^= g || 1) r = a ^ a << 1 ^ a << 2 ^ a << 3 ^ a << 4, r = r >> 8 ^ r & 255 ^ 99, dt[n] = r, ms[r] = n, l = t[i = t[g = t[n]]], s = l * 16843009 ^ i * 65537 ^ g * 257 ^ n * 16843008, e = t[r] * 257 ^ r * 16843008, _s[n] = e = e << 24 ^ e >>> 8, bs[n] = e = e << 24 ^ e >>> 8, vs[n] = e = e << 24 ^ e >>> 8, ys[n] = e = e << 24 ^ e >>> 8, xn[r] = s = s << 24 ^ s >>> 8, En[r] = s = s << 24 ^ s >>> 8, Mn[r] = s = s << 24 ^ s >>> 8, $n[r] = s = s << 24 ^ s >>> 8, a = d[a] || 1;
}
function dl(t, d) {
  return t.charCodeAt(d) << 24 ^ t.charCodeAt(d + 1) << 16 ^ t.charCodeAt(d + 2) << 8 ^ t.charCodeAt(d + 3);
}
function Tt(t) {
  if (t instanceof Uint32Array) return t;
  if (typeof t == "string") {
    if (t.length % 4 !== 0) for (var d = t.length % 4; d <= 4; d++) t += "\0x00";
    for (var g = new Uint32Array(t.length / 4), d = 0; d < t.length; d += 4) g[d / 4] = dl(t, d);
    return g;
  }
  if (t instanceof Uint8Array) {
    for (var g = new Uint32Array(t.length / 4), d = 0; d < t.length; d += 4) g[d / 4] = t[d] << 24 ^ t[d + 1] << 16 ^ t[d + 2] << 8 ^ t[d + 3];
    return g;
  }
  throw new Error("Unable to create 32-bit words");
}
function Ms(t, d, g) {
  g === void 0 && (g = t);
  for (var i = 0; i < t.length; i++) g[i] = t[i] ^ d[i];
}
ul();
var Fi = (function() {
  function t(d) {
    var g = Tt(d);
    if (g.length !== 4 && g.length !== 6 && g.length !== 8) throw new Error("Invalid key size");
    this.encKey = new Uint32Array(4 * g.length + 28), this.decKey = new Uint32Array(4 * g.length + 28), this.encKey.set(g);
    for (var i = 1, l = g.length, r; l < 4 * g.length + 28; l++) r = this.encKey[l - 1], (l % g.length === 0 || g.length === 8 && l % g.length === 4) && (r = dt[r >>> 24] << 24 ^ dt[r >> 16 & 255] << 16 ^ dt[r >> 8 & 255] << 8 ^ dt[r & 255], l % g.length === 0 && (r = r << 8 ^ r >>> 24 ^ i << 24, i = i << 1 ^ (i >> 7) * 283)), this.encKey[l] = this.encKey[l - g.length] ^ r;
    for (var e = 0; l; e++, l--) r = this.encKey[e & 3 ? l : l - 4], l <= 4 || e < 4 ? this.decKey[e] = r : this.decKey[e] = xn[dt[r >>> 24]] ^ En[dt[r >> 16 & 255]] ^ Mn[dt[r >> 8 & 255]] ^ $n[dt[r & 255]];
  }
  return t.prototype.encrypt = function(d) {
    for (var g = Tt(d), i = new Uint32Array(4), l = g[0] ^ this.encKey[0], r = g[1] ^ this.encKey[1], e = g[2] ^ this.encKey[2], s = g[3] ^ this.encKey[3], n = this.encKey.length / 4 - 2, a = 4, o, c, u, _ = 0; _ < n; _++) o = _s[l >>> 24] ^ bs[r >> 16 & 255] ^ vs[e >> 8 & 255] ^ ys[s & 255] ^ this.encKey[a], c = _s[r >>> 24] ^ bs[e >> 16 & 255] ^ vs[s >> 8 & 255] ^ ys[l & 255] ^ this.encKey[a + 1], u = _s[e >>> 24] ^ bs[s >> 16 & 255] ^ vs[l >> 8 & 255] ^ ys[r & 255] ^ this.encKey[a + 2], s = _s[s >>> 24] ^ bs[l >> 16 & 255] ^ vs[r >> 8 & 255] ^ ys[e & 255] ^ this.encKey[a + 3], l = o, r = c, e = u, a += 4;
    for (var _ = 0; _ < 4; _++) i[_] = dt[l >>> 24] << 24 ^ dt[r >> 16 & 255] << 16 ^ dt[e >> 8 & 255] << 8 ^ dt[s & 255] ^ this.encKey[a++], o = l, l = r, r = e, e = s, s = o;
    return i;
  }, t.prototype.decrypt = function(d) {
    for (var g = Tt(d), i = new Uint32Array(4), l = g[0] ^ this.decKey[0], r = g[3] ^ this.decKey[1], e = g[2] ^ this.decKey[2], s = g[1] ^ this.decKey[3], n = this.decKey.length / 4 - 2, a, o, c, u = 4, _ = 0; _ < n; _++) a = xn[l >>> 24] ^ En[r >> 16 & 255] ^ Mn[e >> 8 & 255] ^ $n[s & 255] ^ this.decKey[u], o = xn[r >>> 24] ^ En[e >> 16 & 255] ^ Mn[s >> 8 & 255] ^ $n[l & 255] ^ this.decKey[u + 1], c = xn[e >>> 24] ^ En[s >> 16 & 255] ^ Mn[l >> 8 & 255] ^ $n[r & 255] ^ this.decKey[u + 2], s = xn[s >>> 24] ^ En[l >> 16 & 255] ^ Mn[r >> 8 & 255] ^ $n[e & 255] ^ this.decKey[u + 3], l = a, r = o, e = c, u += 4;
    for (var _ = 0; _ < 4; _++) i[3 & -_] = ms[l >>> 24] << 24 ^ ms[r >> 16 & 255] << 16 ^ ms[e >> 8 & 255] << 8 ^ ms[s & 255] ^ this.decKey[u++], a = l, l = r, r = e, e = s, s = a;
    return i;
  }, t;
})(), fl = (function() {
  function t(d, g, i) {
    i === void 0 && (i = 16), this.key = Tt(d), this.iv = Tt(g), this.cipher = new Fi(d), this.blockSize = i / 4;
  }
  return t.prototype.encrypt = function(d, g) {
    for (var i = Tt(d), l = g || new Uint32Array(i.length), r = this.iv.subarray(this.blockSize, this.iv.length), e = this.iv.subarray(0, this.blockSize), s = new Uint32Array(this.blockSize), n = 0; n < i.length; n += this.blockSize) {
      var a = i.subarray(n, n + this.blockSize);
      Ms(a, e, s);
      var o = this.cipher.encrypt(s);
      Ms(o, r), r = a, e = o;
      for (var c = n, u = 0; c < i.length && u < 4; c++, u++) l[c] = o[u];
    }
    return l;
  }, t.prototype.decrypt = function(d, g) {
    for (var i = Tt(d), l = g || new Uint32Array(i.length), r = this.iv.subarray(this.blockSize, this.iv.length), e = this.iv.subarray(0, this.blockSize), s = new Uint32Array(this.blockSize), n = 0; n < l.length; n += this.blockSize) {
      var a = i.subarray(n, n + this.blockSize);
      Ms(a, r, s);
      var o = this.cipher.decrypt(s);
      Ms(o, e), e = a, r = o;
      for (var c = n, u = 0; c < l.length && u < 4; c++, u++) l[c] = o[u];
    }
    return l;
  }, t;
})(), pl = (function() {
  function t(d, g, i) {
    if (i === void 0 && (i = 16), this.offset = 0, this.key = Tt(d), this.counter = Tt(g), this.cipher = new Fi(d), this.blockSize = i / 4, this.counter.length !== 4) throw new Error("AES-CTR mode counter must be 16 bytes length");
  }
  return t.prototype.encrypt = function(d, g) {
    for (var i = Tt(d), l = g || new Uint32Array(i.length), r = this.offset, e = 0; e < i.length; e += this.blockSize) {
      for (var s = this.cipher.encrypt(this.counter), n = e, a = r; n < i.length && a < this.blockSize; n++, a++) l[n] = s[a] ^ i[n];
      i.length - e >= this.blockSize && this.incrementCounter(), r && (e -= r, r = 0);
    }
    return this.offset = (this.offset + i.length % 4) % 4, l;
  }, t.prototype.decrypt = function(d, g) {
    return this.encrypt(d, g);
  }, t.prototype.incrementCounter = function() {
    for (var d = this.counter.length - 1; d >= 0 && !(++this.counter[d] < 4294967295); d--) ;
  }, t;
})();
const gl = Object.freeze(Object.defineProperty({ __proto__: null, CTR: pl, IGE: fl, default: Fi }, Symbol.toStringTag, { value: "Module" })), sc = Rn(gl);
var Ys = {}, er;
function hl() {
  return er || (er = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.ab2i = t.i2ab = t.isBigEndian = void 0, t.i2abLow = d, t.i2abBig = g, t.ab2iLow = i, t.ab2iBig = l;
    function d(r) {
      const e = new Uint8Array(r.length * 4);
      let s = 0;
      for (let n = 0; n < r.length; n++) {
        const a = r[n];
        e[s++] = a >>> 24, e[s++] = a >> 16 & 255, e[s++] = a >> 8 & 255, e[s++] = a & 255;
      }
      return e.buffer;
    }
    function g(r) {
      return r.buffer;
    }
    function i(r) {
      const e = new Uint8Array(r), s = new Uint32Array(e.length / 4);
      for (let n = 0; n < e.length; n += 4) s[n / 4] = e[n] << 24 ^ e[n + 1] << 16 ^ e[n + 2] << 8 ^ e[n + 3];
      return s;
    }
    function l(r) {
      return new Uint32Array(r);
    }
    t.isBigEndian = new Uint8Array(new Uint32Array([16909060]))[0] === 1, t.i2ab = t.isBigEndian ? g : d, t.ab2i = t.isBigEndian ? l : i;
  })(Ys)), Ys;
}
var wn = {}, tr;
function ml() {
  if (tr) return wn;
  tr = 1, Object.defineProperty(wn, "__esModule", { value: true }), wn.s2i = t, wn.getWords = d, wn.xor = g;
  function t(i, l) {
    return i.charCodeAt(l) << 24 ^ i.charCodeAt(l + 1) << 16 ^ i.charCodeAt(l + 2) << 8 ^ i.charCodeAt(l + 3);
  }
  function d(i) {
    if (i instanceof Uint32Array) return i;
    if (typeof i == "string") {
      if (i.length % 4 !== 0) for (let r = i.length % 4; r <= 4; r++) i += "\0x00";
      const l = new Uint32Array(i.length / 4);
      for (let r = 0; r < i.length; r += 4) l[r / 4] = t(i, r);
      return l;
    }
    if (i instanceof Uint8Array) {
      const l = new Uint32Array(i.length / 4);
      for (let r = 0; r < i.length; r += 4) l[r / 4] = i[r] << 24 ^ i[r + 1] << 16 ^ i[r + 2] << 8 ^ i[r + 3];
      return l;
    }
    throw new Error("Unable to create 32-bit words");
  }
  function g(i, l, r = i) {
    for (let e = 0; e < i.length; e++) r[e] = i[e] ^ l[e];
  }
  return wn;
}
var nr;
function ic() {
  if (nr) return it;
  nr = 1;
  var t = Le().Buffer, d = it && it.__importDefault || function(_) {
    return _ && _.__esModule ? _ : { default: _ };
  };
  Object.defineProperty(it, "__esModule", { value: true }), it.Hash = it.CTR = it.Counter = void 0, it.createDecipheriv = s, it.createCipheriv = n, it.randomBytes = a, it.pbkdf2Sync = c, it.createHash = u;
  const g = d(sc), i = hl(), l = ml();
  class r {
    constructor(S) {
      this._counter = t.from(S);
    }
    increment() {
      for (let S = 15; S >= 0; S--) if (this._counter[S] === 255) this._counter[S] = 0;
      else {
        this._counter[S]++;
        break;
      }
    }
  }
  it.Counter = r;
  class e {
    constructor(S, $) {
      $ instanceof r || ($ = new r($)), this._counter = $, this._remainingCounter = void 0, this._remainingCounterIndex = 16, this._aes = new g.default((0, l.getWords)(S));
    }
    update(S) {
      return this.encrypt(S);
    }
    encrypt(S) {
      const $ = t.from(S);
      for (let m = 0; m < $.length; m++) this._remainingCounterIndex === 16 && (this._remainingCounter = t.from((0, i.i2ab)(this._aes.encrypt((0, i.ab2i)(this._counter._counter)))), this._remainingCounterIndex = 0, this._counter.increment()), this._remainingCounter && ($[m] ^= this._remainingCounter[this._remainingCounterIndex++]);
      return $;
    }
  }
  it.CTR = e;
  function s(_, S, $) {
    if (_.includes("ECB")) throw new Error("Not supported");
    return new e(S, $);
  }
  function n(_, S, $) {
    if (_.includes("ECB")) throw new Error("Not supported");
    return new e(S, $);
  }
  function a(_) {
    const S = new Uint8Array(_);
    return crypto.getRandomValues(S), S;
  }
  class o {
    constructor(S) {
      this.algorithm = S;
    }
    update(S) {
      this.data = new Uint8Array(S);
    }
    async digest() {
      if (this.data) {
        if (this.algorithm === "sha1") return t.from(await self.crypto.subtle.digest("SHA-1", this.data));
        if (this.algorithm === "sha256") return t.from(await self.crypto.subtle.digest("SHA-256", this.data));
      }
      return t.alloc(0);
    }
  }
  it.Hash = o;
  async function c(_, S, $, ...m) {
    const h = await crypto.subtle.importKey("raw", _, { name: "PBKDF2" }, false, ["deriveBits"]);
    return t.from(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-512", salt: S, iterations: $ }, h, 512));
  }
  function u(_) {
    return new o(_);
  }
  return it;
}
var sr;
function rc() {
  if (sr) return $t;
  sr = 1;
  var t = $t && $t.__createBinding || (Object.create ? (function(l, r, e, s) {
    s === void 0 && (s = e);
    var n = Object.getOwnPropertyDescriptor(r, e);
    (!n || ("get" in n ? !r.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
      return r[e];
    } }), Object.defineProperty(l, s, n);
  }) : (function(l, r, e, s) {
    s === void 0 && (s = e), l[s] = r[e];
  })), d = $t && $t.__setModuleDefault || (Object.create ? (function(l, r) {
    Object.defineProperty(l, "default", { enumerable: true, value: r });
  }) : function(l, r) {
    l.default = r;
  }), g = $t && $t.__importStar || function(l) {
    if (l && l.__esModule) return l;
    var r = {};
    if (l != null) for (var e in l) e !== "default" && Object.prototype.hasOwnProperty.call(l, e) && t(r, l, e);
    return d(r, l), r;
  };
  Object.defineProperty($t, "__esModule", { value: true });
  const i = g(ic());
  return $t.default = i, $t;
}
var ei = {}, ir;
function Ps() {
  return ir || (ir = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.isNode = t.isBrowser = t.isDeno = void 0, t.isDeno = "Deno" in globalThis, t.isBrowser = !t.isDeno && typeof window < "u", t.isNode = !t.isBrowser;
  })(ei)), ei;
}
var rr;
function Ae() {
  return rr || (rr = 1, (function(t) {
    var d = Le().Buffer, g = Tn && Tn.__importDefault || function(H) {
      return H && H.__esModule ? H : { default: H };
    };
    Object.defineProperty(t, "__esModule", { value: true }), t._EntityType = t.TotalList = t.sleep = t.isArrayLike = void 0, t.readBigIntFromBuffer = e, t.generateRandomBigInt = s, t.escapeRegex = n, t.groupBy = a, t.betterConsoleLog = o, t.toSignedLittleBuffer = u, t.readBufferFromBigInt = _, t.generateRandomLong = S, t.mod = $, t.bigIntMod = m, t.generateRandomBytes = h, t.stripText = I, t.generateKeyDataFromNonce = b, t.convertToLittle = f, t.sha1 = p, t.sha256 = w, t.modExp = M, t.getByteArray = T, t.returnBigInt = k, t.getMinBigInt = B, t.getRandomInt = C, t.bufferXor = q, t.crc32 = te, t._entityType = he;
    const i = g(Ke()), l = g(rc()), r = Ps();
    function e(H, U = true, V = false) {
      let K = d.from(H);
      const F = K.length;
      U && (K = K.reverse());
      let R = (0, i.default)(K.toString("hex"), 16);
      return V && Math.floor(R.toString(2).length / 8) >= F && (R = R.subtract((0, i.default)(2).pow((0, i.default)(F * 8)))), R;
    }
    function s() {
      return e(h(8), false);
    }
    function n(H) {
      return H.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function a(H, U) {
      const V = /* @__PURE__ */ new Map();
      return H.forEach((K) => {
        const F = U(K), R = V.get(F);
        R ? R.push(K) : V.set(F, [K]);
      }), V;
    }
    function o(H) {
      const U = {};
      for (const V in H) H.hasOwnProperty(V) && !V.startsWith("_") && V != "originalArgs" && (U[V] = H[V]);
      return U;
    }
    const c = (H) => H && typeof H.length == "number" && typeof H != "function" && typeof H != "string";
    t.isArrayLike = c;
    function u(H, U = 8) {
      const V = k(H), K = [];
      for (let F = 0; F < U; F++) K[F] = V.shiftRight(8 * F).and(255);
      return d.from(K);
    }
    function _(H, U, V = true, K = false) {
      H = (0, i.default)(H);
      const F = H.bitLength().toJSNumber(), R = Math.ceil(F / 8);
      if (U < R) throw new Error("OverflowError: int too big to convert");
      if (!K && H.lesser((0, i.default)(0))) throw new Error("Cannot convert to unsigned");
      K && H.lesser((0, i.default)(0)) && (H = (0, i.default)(2).pow((0, i.default)(U).multiply(8)).add(H));
      const ee = H.toString(16).padStart(U * 2, "0");
      let Y = d.from(ee, "hex");
      return V && (Y = Y.reverse()), Y;
    }
    function S(H = true) {
      return e(h(8), true, H);
    }
    function $(H, U) {
      return (H % U + U) % U;
    }
    function m(H, U) {
      return H.remainder(U).add(U).remainder(U);
    }
    function h(H) {
      return d.from(l.default.randomBytes(H));
    }
    function I(H, U) {
      if (!U || !U.length) return H.trim();
      for (; H && H[H.length - 1].trim() === ""; ) {
        const V = U[U.length - 1];
        if (V.offset + V.length == H.length) if (V.length == 1) {
          if (U.pop(), !U.length) return H.trim();
        } else V.length -= 1;
        H = H.slice(0, -1);
      }
      for (; H && H[0].trim() === ""; ) {
        for (let V = 0; V < U.length; V++) {
          const K = U[V];
          if (K.offset != 0) {
            K.offset--;
            continue;
          }
          if (K.length == 1) {
            if (U.shift(), !U.length) return H.trimLeft();
          } else K.length -= 1;
        }
        H = H.slice(1);
      }
      return H;
    }
    async function b(H, U) {
      const V = u(H, 16), K = u(U, 32), [F, R, ee] = await Promise.all([p(d.concat([K, V])), p(d.concat([V, K])), p(d.concat([K, K]))]), Y = d.concat([F, R.slice(0, 12)]), Q = d.concat([R.slice(12, 20), ee, K.slice(0, 4)]);
      return { key: Y, iv: Q };
    }
    function f(H) {
      const U = d.alloc(H.length * 4);
      for (let V = 0; V < H.length; V++) U.writeUInt32BE(H[V], V * 4);
      return U;
    }
    function p(H) {
      const U = l.default.createHash("sha1");
      return U.update(H), U.digest();
    }
    function w(H) {
      const U = l.default.createHash("sha256");
      return U.update(H), U.digest();
    }
    function M(H, U, V) {
      H = H.remainder(V);
      let K = i.default.one, F = H;
      for (; U.greater(i.default.zero); ) {
        const R = U.remainder((0, i.default)(2));
        U = U.divide((0, i.default)(2)), R.eq(i.default.one) && (K = K.multiply(F), K = K.remainder(V)), F = F.multiply(F), F = F.remainder(V);
      }
      return K;
    }
    function T(H, U = false) {
      const V = H.toString(2).length, K = Math.floor((V + 8 - 1) / 8);
      return _(typeof H == "number" ? (0, i.default)(H) : H, K, false, U);
    }
    function k(H) {
      return i.default.isInstance(H) ? H : (0, i.default)(H);
    }
    function B(H) {
      if (H.length == 0) return i.default.zero;
      if (H.length == 1) return k(H[0]);
      let U = k(H[0]);
      for (let V = 1; V < H.length; V++) k(H[V]).lesser(U) && (U = k(H[V]));
      return U;
    }
    function C(H, U) {
      return H = Math.ceil(H), U = Math.floor(U), Math.floor(Math.random() * (U - H + 1)) + H;
    }
    const E = (H, U = false) => new Promise((V) => U && r.isNode ? setTimeout(V, H).unref() : setTimeout(V, H));
    t.sleep = E;
    function q(H, U) {
      const V = [];
      for (let K = 0; K < H.length; K++) V.push(H[K] ^ U[K]);
      return d.from(V);
    }
    function W() {
      let H;
      const U = [];
      for (let V = 0; V < 256; V++) {
        H = V;
        for (let K = 0; K < 8; K++) H = H & 1 ? 3988292384 ^ H >>> 1 : H >>> 1;
        U[V] = H;
      }
      return U;
    }
    let G;
    function te(H) {
      G || (G = W()), d.isBuffer(H) || (H = d.from(H));
      let U = -1;
      for (let V = 0; V < H.length; V++) {
        const K = H[V];
        U = G[(U ^ K) & 255] ^ U >>> 8;
      }
      return (U ^ -1) >>> 0;
    }
    class oe extends Array {
      constructor() {
        super(), this.total = 0;
      }
    }
    t.TotalList = oe, t._EntityType = { USER: 0, CHAT: 1, CHANNEL: 2 }, Object.freeze(t._EntityType);
    function he(H) {
      if (typeof H != "object" || !("SUBCLASS_OF_ID" in H)) throw new Error(`${H} is not a TLObject, cannot determine entity type`);
      if (![47470215, 3374092470, 3865689926, 1089602301, 765557111, 3316604308, 524706233, 3566872215].includes(H.SUBCLASS_OF_ID)) throw new Error(`${H} does not have any entity type`);
      const U = H.className;
      if (U.includes("User")) return t._EntityType.USER;
      if (U.includes("Chat")) return t._EntityType.CHAT;
      if (U.includes("Channel")) return t._EntityType.CHANNEL;
      if (U.includes("Self")) return t._EntityType.USER;
      throw new Error(`${H} does not have any entity type`);
    }
  })(Tn)), Tn;
}
var ti, ar;
function _l() {
  return ar || (ar = 1, ti = `boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
true#3fedd339 = True;
vector#1cb5c415 {t:Type} # [ t ] = Vector t;
error#c4b9f9bb code:int text:string = Error;
null#56730bcc = Null;
inputPeerEmpty#7f3b18ea = InputPeer;
inputPeerSelf#7da07ec9 = InputPeer;
inputPeerChat#35a95cb9 chat_id:long = InputPeer;
inputPeerUser#dde8a54c user_id:long access_hash:long = InputPeer;
inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;
inputPeerUserFromMessage#a87b0a1c peer:InputPeer msg_id:int user_id:long = InputPeer;
inputPeerChannelFromMessage#bd2a0840 peer:InputPeer msg_id:int channel_id:long = InputPeer;
inputUserEmpty#b98886cf = InputUser;
inputUserSelf#f7c1b13f = InputUser;
inputUser#f21158c6 user_id:long access_hash:long = InputUser;
inputUserFromMessage#1da448e2 peer:InputPeer msg_id:int user_id:long = InputUser;
inputPhoneContact#f392b7f4 client_id:long phone:string first_name:string last_name:string = InputContact;
inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;
inputFileBig#fa4f0bb5 id:long parts:int name:string = InputFile;
inputFileStoryDocument#62dc8b48 id:InputDocument = InputFile;
inputMediaEmpty#9664f57f = InputMedia;
inputMediaUploadedPhoto#1e287d04 flags:# spoiler:flags.2?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int = InputMedia;
inputMediaPhoto#b3ba0635 flags:# spoiler:flags.1?true id:InputPhoto ttl_seconds:flags.0?int = InputMedia;
inputMediaGeoPoint#f9c44144 geo_point:InputGeoPoint = InputMedia;
inputMediaContact#f8ab7dfb phone_number:string first_name:string last_name:string vcard:string = InputMedia;
inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;
inputMediaVenue#c13d1c11 geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string = InputMedia;
inputMediaPhotoExternal#e5bbfe1a flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int = InputMedia;
inputMediaDocumentExternal#779600f9 flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int video_cover:flags.2?InputPhoto video_timestamp:flags.3?int = InputMedia;
inputMediaGame#d33f43f3 id:InputGame = InputMedia;
inputMediaInvoice#405fef0d flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:flags.3?string provider_data:DataJSON start_param:flags.1?string extended_media:flags.2?InputMedia = InputMedia;
inputMediaGeoLive#971fa843 flags:# stopped:flags.0?true geo_point:InputGeoPoint heading:flags.2?int period:flags.1?int proximity_notification_radius:flags.3?int = InputMedia;
inputMediaPoll#f94e5f1 flags:# poll:Poll correct_answers:flags.0?Vector<bytes> solution:flags.1?string solution_entities:flags.1?Vector<MessageEntity> = InputMedia;
inputMediaDice#e66fbf7b emoticon:string = InputMedia;
inputMediaStory#89fdd778 peer:InputPeer id:int = InputMedia;
inputMediaWebPage#c21b8849 flags:# force_large_media:flags.0?true force_small_media:flags.1?true optional:flags.2?true url:string = InputMedia;
inputMediaPaidMedia#c4103386 flags:# stars_amount:long extended_media:Vector<InputMedia> payload:flags.0?string = InputMedia;
inputChatPhotoEmpty#1ca48f57 = InputChatPhoto;
inputChatUploadedPhoto#bdcdaec0 flags:# file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.3?VideoSize = InputChatPhoto;
inputChatPhoto#8953ad37 id:InputPhoto = InputChatPhoto;
inputGeoPointEmpty#e4c123d6 = InputGeoPoint;
inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;
inputPhotoEmpty#1cd7bf0d = InputPhoto;
inputPhoto#3bb3b94a id:long access_hash:long file_reference:bytes = InputPhoto;
inputFileLocation#dfdaabe1 volume_id:long local_id:int secret:long file_reference:bytes = InputFileLocation;
inputEncryptedFileLocation#f5235d55 id:long access_hash:long = InputFileLocation;
inputDocumentFileLocation#bad07584 id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
inputSecureFileLocation#cbc7ee28 id:long access_hash:long = InputFileLocation;
inputTakeoutFileLocation#29be5899 = InputFileLocation;
inputPhotoFileLocation#40181ffe id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
inputPhotoLegacyFileLocation#d83466f3 id:long access_hash:long file_reference:bytes volume_id:long local_id:int secret:long = InputFileLocation;
inputPeerPhotoFileLocation#37257e99 flags:# big:flags.0?true peer:InputPeer photo_id:long = InputFileLocation;
inputStickerSetThumb#9d84f3db stickerset:InputStickerSet thumb_version:int = InputFileLocation;
inputGroupCallStream#598a92a flags:# call:InputGroupCall time_ms:long scale:int video_channel:flags.0?int video_quality:flags.0?int = InputFileLocation;
peerUser#59511722 user_id:long = Peer;
peerChat#36c6019a chat_id:long = Peer;
peerChannel#a2a5371e channel_id:long = Peer;
storage.fileUnknown#aa963b05 = storage.FileType;
storage.filePartial#40bc6f52 = storage.FileType;
storage.fileJpeg#7efe0e = storage.FileType;
storage.fileGif#cae1aadf = storage.FileType;
storage.filePng#a4f63c0 = storage.FileType;
storage.filePdf#ae1e508d = storage.FileType;
storage.fileMp3#528a0677 = storage.FileType;
storage.fileMov#4b09ebbc = storage.FileType;
storage.fileMp4#b3cea0e4 = storage.FileType;
storage.fileWebp#1081464c = storage.FileType;
userEmpty#d3bc4b7a id:long = User;
user#4b46c37e flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?int color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long = User;
userProfilePhotoEmpty#4f11bae1 = UserProfilePhoto;
userProfilePhoto#82d1f706 flags:# has_video:flags.0?true personal:flags.2?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = UserProfilePhoto;
userStatusEmpty#9d05049 = UserStatus;
userStatusOnline#edb93949 expires:int = UserStatus;
userStatusOffline#8c703f was_online:int = UserStatus;
userStatusRecently#7b197dc8 flags:# by_me:flags.0?true = UserStatus;
userStatusLastWeek#541a1d1a flags:# by_me:flags.0?true = UserStatus;
userStatusLastMonth#65899777 flags:# by_me:flags.0?true = UserStatus;
chatEmpty#29562865 id:long = Chat;
chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;
chatForbidden#6592a1a7 id:long title:string = Chat;
channel#e00998b7 flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?int color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long = Chat;
channelForbidden#17d493d5 flags:# broadcast:flags.5?true megagroup:flags.8?true id:long access_hash:long title:string until_date:flags.16?int = Chat;
chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;
channelFull#52d6806b flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int = ChatFull;
chatParticipant#c02d4007 user_id:long inviter_id:long date:int = ChatParticipant;
chatParticipantCreator#e46bcee4 user_id:long = ChatParticipant;
chatParticipantAdmin#a0933f5b user_id:long inviter_id:long date:int = ChatParticipant;
chatParticipantsForbidden#8763d3e1 flags:# chat_id:long self_participant:flags.0?ChatParticipant = ChatParticipants;
chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;
chatPhotoEmpty#37c1011c = ChatPhoto;
chatPhoto#1c6e1c11 flags:# has_video:flags.0?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = ChatPhoto;
messageEmpty#90a6ca84 flags:# id:int peer_id:flags.0?Peer = Message;
message#96fdbbe9 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int = Message;
messageService#d3d28540 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;
messageMediaEmpty#3ded6320 = MessageMedia;
messageMediaPhoto#695150d7 flags:# spoiler:flags.3?true photo:flags.0?Photo ttl_seconds:flags.2?int = MessageMedia;
messageMediaGeo#56e0d474 geo:GeoPoint = MessageMedia;
messageMediaContact#70322949 phone_number:string first_name:string last_name:string vcard:string user_id:long = MessageMedia;
messageMediaUnsupported#9f84f49e = MessageMedia;
messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;
messageMediaWebPage#ddf10c3b flags:# force_large_media:flags.0?true force_small_media:flags.1?true manual:flags.3?true safe:flags.4?true webpage:WebPage = MessageMedia;
messageMediaVenue#2ec0533f geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MessageMedia;
messageMediaGame#fdb19008 game:Game = MessageMedia;
messageMediaInvoice#f6a548d3 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument receipt_msg_id:flags.2?int currency:string total_amount:long start_param:string extended_media:flags.4?MessageExtendedMedia = MessageMedia;
messageMediaGeoLive#b940c666 flags:# geo:GeoPoint heading:flags.0?int period:int proximity_notification_radius:flags.1?int = MessageMedia;
messageMediaPoll#4bd6e798 poll:Poll results:PollResults = MessageMedia;
messageMediaDice#3f7ee58b value:int emoticon:string = MessageMedia;
messageMediaStory#68cb6283 flags:# via_mention:flags.1?true peer:Peer id:int story:flags.0?StoryItem = MessageMedia;
messageMediaGiveaway#aa073beb flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.2?true channels:Vector<long> countries_iso2:flags.1?Vector<string> prize_description:flags.3?string quantity:int months:flags.4?int stars:flags.5?long until_date:int = MessageMedia;
messageMediaGiveawayResults#ceaa3ea1 flags:# only_new_subscribers:flags.0?true refunded:flags.2?true channel_id:long additional_peers_count:flags.3?int launch_msg_id:int winners_count:int unclaimed_count:int winners:Vector<long> months:flags.4?int stars:flags.5?long prize_description:flags.1?string until_date:int = MessageMedia;
messageMediaPaidMedia#a8852491 stars_amount:long extended_media:Vector<MessageExtendedMedia> = MessageMedia;
messageActionEmpty#b6aef7b0 = MessageAction;
messageActionChatCreate#bd47cbad title:string users:Vector<long> = MessageAction;
messageActionChatEditTitle#b5a1ce5a title:string = MessageAction;
messageActionChatEditPhoto#7fcb13a8 photo:Photo = MessageAction;
messageActionChatDeletePhoto#95e3fbef = MessageAction;
messageActionChatAddUser#15cefd00 users:Vector<long> = MessageAction;
messageActionChatDeleteUser#a43f30cc user_id:long = MessageAction;
messageActionChatJoinedByLink#31224c3 inviter_id:long = MessageAction;
messageActionChannelCreate#95d2ac92 title:string = MessageAction;
messageActionChatMigrateTo#e1037f92 channel_id:long = MessageAction;
messageActionChannelMigrateFrom#ea3948e9 title:string chat_id:long = MessageAction;
messageActionPinMessage#94bd38ed = MessageAction;
messageActionHistoryClear#9fbab604 = MessageAction;
messageActionGameScore#92a72876 game_id:long score:int = MessageAction;
messageActionPaymentSentMe#ffa00ccc flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string charge:PaymentCharge subscription_until_date:flags.4?int = MessageAction;
messageActionPaymentSent#c624b16e flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long invoice_slug:flags.0?string subscription_until_date:flags.4?int = MessageAction;
messageActionPhoneCall#80e11a7f flags:# video:flags.2?true call_id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int = MessageAction;
messageActionScreenshotTaken#4792929b = MessageAction;
messageActionCustomAction#fae69f56 message:string = MessageAction;
messageActionBotAllowed#c516d679 flags:# attach_menu:flags.1?true from_request:flags.3?true domain:flags.0?string app:flags.2?BotApp = MessageAction;
messageActionSecureValuesSentMe#1b287353 values:Vector<SecureValue> credentials:SecureCredentialsEncrypted = MessageAction;
messageActionSecureValuesSent#d95c6154 types:Vector<SecureValueType> = MessageAction;
messageActionContactSignUp#f3f25f76 = MessageAction;
messageActionGeoProximityReached#98e0d697 from_id:Peer to_id:Peer distance:int = MessageAction;
messageActionGroupCall#7a0d7f42 flags:# call:InputGroupCall duration:flags.0?int = MessageAction;
messageActionInviteToGroupCall#502f92f7 call:InputGroupCall users:Vector<long> = MessageAction;
messageActionSetMessagesTTL#3c134d7b flags:# period:int auto_setting_from:flags.0?long = MessageAction;
messageActionGroupCallScheduled#b3a07661 call:InputGroupCall schedule_date:int = MessageAction;
messageActionSetChatTheme#aa786345 emoticon:string = MessageAction;
messageActionChatJoinedByRequest#ebbca3cb = MessageAction;
messageActionWebViewDataSentMe#47dd8079 text:string data:string = MessageAction;
messageActionWebViewDataSent#b4c38cb5 text:string = MessageAction;
messageActionGiftPremium#6c6274fa flags:# currency:string amount:long months:int crypto_currency:flags.0?string crypto_amount:flags.0?long message:flags.1?TextWithEntities = MessageAction;
messageActionTopicCreate#d999256 flags:# title:string icon_color:int icon_emoji_id:flags.0?long = MessageAction;
messageActionTopicEdit#c0944820 flags:# title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = MessageAction;
messageActionSuggestProfilePhoto#57de635e photo:Photo = MessageAction;
messageActionRequestedPeer#31518e9b button_id:int peers:Vector<Peer> = MessageAction;
messageActionSetChatWallPaper#5060a3f4 flags:# same:flags.0?true for_both:flags.1?true wallpaper:WallPaper = MessageAction;
messageActionGiftCode#56d03994 flags:# via_giveaway:flags.0?true unclaimed:flags.2?true boost_peer:flags.1?Peer months:int slug:string currency:flags.2?string amount:flags.2?long crypto_currency:flags.3?string crypto_amount:flags.3?long message:flags.4?TextWithEntities = MessageAction;
messageActionGiveawayLaunch#a80f51e4 flags:# stars:flags.0?long = MessageAction;
messageActionGiveawayResults#87e2f155 flags:# stars:flags.0?true winners_count:int unclaimed_count:int = MessageAction;
messageActionBoostApply#cc02aa6d boosts:int = MessageAction;
messageActionRequestedPeerSentMe#93b31848 button_id:int peers:Vector<RequestedPeer> = MessageAction;
messageActionPaymentRefunded#41b3e202 flags:# peer:Peer currency:string total_amount:long payload:flags.0?bytes charge:PaymentCharge = MessageAction;
messageActionGiftStars#45d5b021 flags:# currency:string amount:long stars:long crypto_currency:flags.0?string crypto_amount:flags.0?long transaction_id:flags.1?string = MessageAction;
messageActionPrizeStars#b00c47a2 flags:# unclaimed:flags.0?true stars:long transaction_id:string boost_peer:Peer giveaway_msg_id:int = MessageAction;
messageActionStarGift#4717e8a4 flags:# name_hidden:flags.0?true saved:flags.2?true converted:flags.3?true upgraded:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true gift:StarGift message:flags.1?TextWithEntities convert_stars:flags.4?long upgrade_msg_id:flags.5?int upgrade_stars:flags.8?long from_id:flags.11?Peer peer:flags.12?Peer saved_id:flags.12?long = MessageAction;
messageActionStarGiftUnique#acdfcb81 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long = MessageAction;
dialog#d58a08c6 flags:# pinned:flags.2?true unread_mark:flags.3?true view_forum_as_messages:flags.6?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int notify_settings:PeerNotifySettings pts:flags.0?int draft:flags.1?DraftMessage folder_id:flags.4?int ttl_period:flags.5?int = Dialog;
dialogFolder#71bd134c flags:# pinned:flags.2?true folder:Folder peer:Peer top_message:int unread_muted_peers_count:int unread_unmuted_peers_count:int unread_muted_messages_count:int unread_unmuted_messages_count:int = Dialog;
photoEmpty#2331b22d id:long = Photo;
photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
photoSizeEmpty#e17e23c type:string = PhotoSize;
photoSize#75c78e60 type:string w:int h:int size:int = PhotoSize;
photoCachedSize#21e1ad6 type:string w:int h:int bytes:bytes = PhotoSize;
photoStrippedSize#e0b0bc2e type:string bytes:bytes = PhotoSize;
photoSizeProgressive#fa3efb95 type:string w:int h:int sizes:Vector<int> = PhotoSize;
photoPathSize#d8214d41 type:string bytes:bytes = PhotoSize;
geoPointEmpty#1117dd5f = GeoPoint;
geoPoint#b2a2f663 flags:# long:double lat:double access_hash:long accuracy_radius:flags.0?int = GeoPoint;
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
auth.exportedAuthorization#b434e2b8 id:long bytes:bytes = auth.ExportedAuthorization;
inputNotifyPeer#b8bc5b0c peer:InputPeer = InputNotifyPeer;
inputNotifyUsers#193b4417 = InputNotifyPeer;
inputNotifyChats#4a95e84e = InputNotifyPeer;
inputNotifyBroadcasts#b1db7c7e = InputNotifyPeer;
inputNotifyForumTopic#5c467992 peer:InputPeer top_msg_id:int = InputNotifyPeer;
inputPeerNotifySettings#cacb6ae2 flags:# show_previews:flags.0?Bool silent:flags.1?Bool mute_until:flags.2?int sound:flags.3?NotificationSound stories_muted:flags.6?Bool stories_hide_sender:flags.7?Bool stories_sound:flags.8?NotificationSound = InputPeerNotifySettings;
peerNotifySettings#99622c0c flags:# show_previews:flags.0?Bool silent:flags.1?Bool mute_until:flags.2?int ios_sound:flags.3?NotificationSound android_sound:flags.4?NotificationSound other_sound:flags.5?NotificationSound stories_muted:flags.6?Bool stories_hide_sender:flags.7?Bool stories_ios_sound:flags.8?NotificationSound stories_android_sound:flags.9?NotificationSound stories_other_sound:flags.10?NotificationSound = PeerNotifySettings;
peerSettings#acd66c5e flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string = PeerSettings;
wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;
wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;
inputReportReasonSpam#58dbcab8 = ReportReason;
inputReportReasonViolence#1e22c78d = ReportReason;
inputReportReasonPornography#2e59d922 = ReportReason;
inputReportReasonChildAbuse#adf44ee3 = ReportReason;
inputReportReasonOther#c1e4a2b1 = ReportReason;
inputReportReasonCopyright#9b89f93a = ReportReason;
inputReportReasonGeoIrrelevant#dbd4feed = ReportReason;
inputReportReasonFake#f5ddd6e7 = ReportReason;
inputReportReasonIllegalDrugs#a8eb2be = ReportReason;
inputReportReasonPersonalDetails#9ec7863d = ReportReason;
userFull#4d975bbc flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme_emoticon:flags.15?string private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights premium_gifts:flags.19?Vector<PremiumGiftOption> wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification = UserFull;
contact#145ade0b user_id:long mutual:Bool = Contact;
importedContact#c13e3c50 user_id:long client_id:long = ImportedContact;
contactStatus#16d9703b user_id:long status:UserStatus = ContactStatus;
contacts.contactsNotModified#b74ba9d2 = contacts.Contacts;
contacts.contacts#eae87e42 contacts:Vector<Contact> saved_count:int users:Vector<User> = contacts.Contacts;
contacts.importedContacts#77d01c3b imported:Vector<ImportedContact> popular_invites:Vector<PopularContact> retry_contacts:Vector<long> users:Vector<User> = contacts.ImportedContacts;
contacts.blocked#ade1591 blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
contacts.blockedSlice#e1664194 count:int blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
messages.dialogs#15ba6c40 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
messages.dialogsSlice#71e094f3 count:int dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
messages.dialogsNotModified#f0e3e596 count:int = messages.Dialogs;
messages.messages#8c718e87 messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#3a54685e flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
inputMessagesFilterEmpty#57e2f66c = MessagesFilter;
inputMessagesFilterPhotos#9609a51c = MessagesFilter;
inputMessagesFilterVideo#9fc00e65 = MessagesFilter;
inputMessagesFilterPhotoVideo#56e9f0e4 = MessagesFilter;
inputMessagesFilterDocument#9eddf188 = MessagesFilter;
inputMessagesFilterUrl#7ef0dd87 = MessagesFilter;
inputMessagesFilterGif#ffc86587 = MessagesFilter;
inputMessagesFilterVoice#50f5c392 = MessagesFilter;
inputMessagesFilterMusic#3751b49e = MessagesFilter;
inputMessagesFilterChatPhotos#3a20ecb8 = MessagesFilter;
inputMessagesFilterPhoneCalls#80c99768 flags:# missed:flags.0?true = MessagesFilter;
inputMessagesFilterRoundVoice#7a7c17a4 = MessagesFilter;
inputMessagesFilterRoundVideo#b549da53 = MessagesFilter;
inputMessagesFilterMyMentions#c1f8e69a = MessagesFilter;
inputMessagesFilterGeo#e7026d0d = MessagesFilter;
inputMessagesFilterContacts#e062db83 = MessagesFilter;
inputMessagesFilterPinned#1bb00451 = MessagesFilter;
updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
updateMessageID#4e90bfd6 id:int random_id:long = Update;
updateDeleteMessages#a20db0e5 messages:Vector<int> pts:int pts_count:int = Update;
updateUserTyping#c01e857f user_id:long action:SendMessageAction = Update;
updateChatUserTyping#83487af0 chat_id:long from_id:Peer action:SendMessageAction = Update;
updateChatParticipants#7761198 participants:ChatParticipants = Update;
updateUserStatus#e5bdf8de user_id:long status:UserStatus = Update;
updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;
updateNewAuthorization#8951abef flags:# unconfirmed:flags.0?true hash:long date:flags.0?int device:flags.0?string location:flags.0?string = Update;
updateNewEncryptedMessage#12bcbd9a message:EncryptedMessage qts:int = Update;
updateEncryptedChatTyping#1710f156 chat_id:int = Update;
updateEncryption#b4a2e88d chat:EncryptedChat date:int = Update;
updateEncryptedMessagesRead#38fe25b7 chat_id:int max_date:int date:int = Update;
updateChatParticipantAdd#3dda5451 chat_id:long user_id:long inviter_id:long date:int version:int = Update;
updateChatParticipantDelete#e32f3d77 chat_id:long user_id:long version:int = Update;
updateDcOptions#8e5e9873 dc_options:Vector<DcOption> = Update;
updateNotifySettings#bec268ef peer:NotifyPeer notify_settings:PeerNotifySettings = Update;
updateServiceNotification#ebe46819 flags:# popup:flags.0?true invert_media:flags.2?true inbox_date:flags.1?int type:string message:string media:MessageMedia entities:Vector<MessageEntity> = Update;
updatePrivacy#ee3b272a key:PrivacyKey rules:Vector<PrivacyRule> = Update;
updateUserPhone#5492a13 user_id:long phone:string = Update;
updateReadHistoryInbox#9c974fdf flags:# folder_id:flags.0?int peer:Peer max_id:int still_unread_count:int pts:int pts_count:int = Update;
updateReadHistoryOutbox#2f2f21bf peer:Peer max_id:int pts:int pts_count:int = Update;
updateWebPage#7f891213 webpage:WebPage pts:int pts_count:int = Update;
updateReadMessagesContents#f8227181 flags:# messages:Vector<int> pts:int pts_count:int date:flags.0?int = Update;
updateChannelTooLong#108d941f flags:# channel_id:long pts:flags.0?int = Update;
updateChannel#635b4c09 channel_id:long = Update;
updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;
updateReadChannelInbox#922e6e10 flags:# folder_id:flags.0?int channel_id:long max_id:int still_unread_count:int pts:int = Update;
updateDeleteChannelMessages#c32d5b12 channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
updateChannelMessageViews#f226ac08 channel_id:long id:int views:int = Update;
updateChatParticipantAdmin#d7ca61a2 chat_id:long user_id:long is_admin:Bool version:int = Update;
updateNewStickerSet#688a30aa stickerset:messages.StickerSet = Update;
updateStickerSetsOrder#bb2d201 flags:# masks:flags.0?true emojis:flags.1?true order:Vector<long> = Update;
updateStickerSets#31c24808 flags:# masks:flags.0?true emojis:flags.1?true = Update;
updateSavedGifs#9375341e = Update;
updateBotInlineQuery#496f379c flags:# query_id:long user_id:long query:string geo:flags.0?GeoPoint peer_type:flags.1?InlineQueryPeerType offset:string = Update;
updateBotInlineSend#12f12a07 flags:# user_id:long query:string geo:flags.0?GeoPoint id:string msg_id:flags.1?InputBotInlineMessageID = Update;
updateEditChannelMessage#1b3f4df7 message:Message pts:int pts_count:int = Update;
updateBotCallbackQuery#b9cfc48d flags:# query_id:long user_id:long peer:Peer msg_id:int chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
updateEditMessage#e40370a3 message:Message pts:int pts_count:int = Update;
updateInlineBotCallbackQuery#691e9052 flags:# query_id:long user_id:long msg_id:InputBotInlineMessageID chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
updateReadChannelOutbox#b75f99a9 channel_id:long max_id:int = Update;
updateDraftMessage#1b49ec6d flags:# peer:Peer top_msg_id:flags.0?int draft:DraftMessage = Update;
updateReadFeaturedStickers#571d2742 = Update;
updateRecentStickers#9a422c20 = Update;
updateConfig#a229dd06 = Update;
updatePtsChanged#3354678f = Update;
updateChannelWebPage#2f2ba99f channel_id:long webpage:WebPage pts:int pts_count:int = Update;
updateDialogPinned#6e6fe51c flags:# pinned:flags.0?true folder_id:flags.1?int peer:DialogPeer = Update;
updatePinnedDialogs#fa0f3ca2 flags:# folder_id:flags.1?int order:flags.0?Vector<DialogPeer> = Update;
updateBotWebhookJSON#8317c0c3 data:DataJSON = Update;
updateBotWebhookJSONQuery#9b9240a6 query_id:long data:DataJSON timeout:int = Update;
updateBotShippingQuery#b5aefd7d query_id:long user_id:long payload:bytes shipping_address:PostAddress = Update;
updateBotPrecheckoutQuery#8caa9a96 flags:# query_id:long user_id:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string currency:string total_amount:long = Update;
updatePhoneCall#ab0f6b1e phone_call:PhoneCall = Update;
updateLangPackTooLong#46560264 lang_code:string = Update;
updateLangPack#56022f4d difference:LangPackDifference = Update;
updateFavedStickers#e511996d = Update;
updateChannelReadMessagesContents#ea29055d flags:# channel_id:long top_msg_id:flags.0?int messages:Vector<int> = Update;
updateContactsReset#7084a7be = Update;
updateChannelAvailableMessages#b23fc698 channel_id:long available_min_id:int = Update;
updateDialogUnreadMark#e16459c3 flags:# unread:flags.0?true peer:DialogPeer = Update;
updateMessagePoll#aca1657b flags:# poll_id:long poll:flags.0?Poll results:PollResults = Update;
updateChatDefaultBannedRights#54c01850 peer:Peer default_banned_rights:ChatBannedRights version:int = Update;
updateFolderPeers#19360dc0 folder_peers:Vector<FolderPeer> pts:int pts_count:int = Update;
updatePeerSettings#6a7e7366 peer:Peer settings:PeerSettings = Update;
updatePeerLocated#b4afcfb0 peers:Vector<PeerLocated> = Update;
updateNewScheduledMessage#39a51dfb message:Message = Update;
updateDeleteScheduledMessages#f2a71983 flags:# peer:Peer messages:Vector<int> sent_messages:flags.0?Vector<int> = Update;
updateTheme#8216fba3 theme:Theme = Update;
updateGeoLiveViewed#871fb939 peer:Peer msg_id:int = Update;
updateLoginToken#564fe691 = Update;
updateMessagePollVote#24f40e77 poll_id:long peer:Peer options:Vector<bytes> qts:int = Update;
updateDialogFilter#26ffde7d flags:# id:int filter:flags.0?DialogFilter = Update;
updateDialogFilterOrder#a5d72105 order:Vector<int> = Update;
updateDialogFilters#3504914f = Update;
updatePhoneCallSignalingData#2661bf09 phone_call_id:long data:bytes = Update;
updateChannelMessageForwards#d29a27f4 channel_id:long id:int forwards:int = Update;
updateReadChannelDiscussionInbox#d6b19546 flags:# channel_id:long top_msg_id:int read_max_id:int broadcast_id:flags.0?long broadcast_post:flags.0?int = Update;
updateReadChannelDiscussionOutbox#695c9e7c channel_id:long top_msg_id:int read_max_id:int = Update;
updatePeerBlocked#ebe07752 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer = Update;
updateChannelUserTyping#8c88c923 flags:# channel_id:long top_msg_id:flags.0?int from_id:Peer action:SendMessageAction = Update;
updatePinnedMessages#ed85eab5 flags:# pinned:flags.0?true peer:Peer messages:Vector<int> pts:int pts_count:int = Update;
updatePinnedChannelMessages#5bb98608 flags:# pinned:flags.0?true channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
updateChat#f89a6a4e chat_id:long = Update;
updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;
updateGroupCall#97d64341 flags:# chat_id:flags.0?long call:GroupCall = Update;
updatePeerHistoryTTL#bb9bb9a5 flags:# peer:Peer ttl_period:flags.0?int = Update;
updateChatParticipant#d087663a flags:# chat_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChatParticipant new_participant:flags.1?ChatParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
updateChannelParticipant#985d3abb flags:# via_chatlist:flags.3?true channel_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChannelParticipant new_participant:flags.1?ChannelParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
updateBotStopped#c4870a49 user_id:long date:int stopped:Bool qts:int = Update;
updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;
updateBotCommands#4d712f2e peer:Peer bot_id:long commands:Vector<BotCommand> = Update;
updatePendingJoinRequests#7063c3db peer:Peer requests_pending:int recent_requesters:Vector<long> = Update;
updateBotChatInviteRequester#11dfa986 peer:Peer date:int user_id:long about:string invite:ExportedChatInvite qts:int = Update;
updateMessageReactions#5e1b3cb8 flags:# peer:Peer msg_id:int top_msg_id:flags.0?int reactions:MessageReactions = Update;
updateAttachMenuBots#17b7a20b = Update;
updateWebViewResultSent#1592b79d query_id:long = Update;
updateBotMenuButton#14b85813 bot_id:long button:BotMenuButton = Update;
updateSavedRingtones#74d8be99 = Update;
updateTranscribedAudio#84cd5a flags:# pending:flags.0?true peer:Peer msg_id:int transcription_id:long text:string = Update;
updateReadFeaturedEmojiStickers#fb4c496c = Update;
updateUserEmojiStatus#28373599 user_id:long emoji_status:EmojiStatus = Update;
updateRecentEmojiStatuses#30f443db = Update;
updateRecentReactions#6f7863f4 = Update;
updateMoveStickerSetToTop#86fccf85 flags:# masks:flags.0?true emojis:flags.1?true stickerset:long = Update;
updateMessageExtendedMedia#d5a41724 peer:Peer msg_id:int extended_media:Vector<MessageExtendedMedia> = Update;
updateChannelPinnedTopic#192efbe3 flags:# pinned:flags.0?true channel_id:long topic_id:int = Update;
updateChannelPinnedTopics#fe198602 flags:# channel_id:long order:flags.0?Vector<int> = Update;
updateUser#20529438 user_id:long = Update;
updateAutoSaveSettings#ec05b097 = Update;
updateStory#75b3b798 peer:Peer story:StoryItem = Update;
updateReadStories#f74e932b peer:Peer max_id:int = Update;
updateStoryID#1bf335b9 id:int random_id:long = Update;
updateStoriesStealthMode#2c084dc1 stealth_mode:StoriesStealthMode = Update;
updateSentStoryReaction#7d627683 peer:Peer story_id:int reaction:Reaction = Update;
updateBotChatBoost#904dd49c peer:Peer boost:Boost qts:int = Update;
updateChannelViewForumAsMessages#7b68920 channel_id:long enabled:Bool = Update;
updatePeerWallpaper#ae3f101d flags:# wallpaper_overridden:flags.1?true peer:Peer wallpaper:flags.0?WallPaper = Update;
updateBotMessageReaction#ac21d3ce peer:Peer msg_id:int date:int actor:Peer old_reactions:Vector<Reaction> new_reactions:Vector<Reaction> qts:int = Update;
updateBotMessageReactions#9cb7759 peer:Peer msg_id:int date:int reactions:Vector<ReactionCount> qts:int = Update;
updateSavedDialogPinned#aeaf9e74 flags:# pinned:flags.0?true peer:DialogPeer = Update;
updatePinnedSavedDialogs#686c85a6 flags:# order:flags.0?Vector<DialogPeer> = Update;
updateSavedReactionTags#39c67432 = Update;
updateSmsJob#f16269d4 job_id:string = Update;
updateQuickReplies#f9470ab2 quick_replies:Vector<QuickReply> = Update;
updateNewQuickReply#f53da717 quick_reply:QuickReply = Update;
updateDeleteQuickReply#53e6f1ec shortcut_id:int = Update;
updateQuickReplyMessage#3e050d0f message:Message = Update;
updateDeleteQuickReplyMessages#566fe7cd shortcut_id:int messages:Vector<int> = Update;
updateBotBusinessConnect#8ae5c97a connection:BotBusinessConnection qts:int = Update;
updateBotNewBusinessMessage#9ddb347c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
updateBotEditBusinessMessage#7df587c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
updateBotDeleteBusinessMessage#a02a982e connection_id:string peer:Peer messages:Vector<int> qts:int = Update;
updateNewStoryReaction#1824e40b story_id:int peer:Peer reaction:Reaction = Update;
updateBroadcastRevenueTransactions#dfd961f5 peer:Peer balances:BroadcastRevenueBalances = Update;
updateStarsBalance#4e80a379 balance:StarsAmount = Update;
updateBusinessBotCallbackQuery#1ea2fda7 flags:# query_id:long user_id:long connection_id:string message:Message reply_to_message:flags.2?Message chat_instance:long data:flags.0?bytes = Update;
updateStarsRevenueStatus#a584b019 peer:Peer status:StarsRevenueStatus = Update;
updateBotPurchasedPaidMedia#283bd312 user_id:long payload:string qts:int = Update;
updatePaidReactionPrivacy#51ca7aec private:Bool = Update;
updates.state#a56c2a3e pts:int qts:int date:int seq:int unread_count:int = updates.State;
updates.differenceEmpty#5d75a138 date:int seq:int = updates.Difference;
updates.difference#f49ca0 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> state:updates.State = updates.Difference;
updates.differenceSlice#a8fb1981 new_messages:Vector<Message> new_encrypted_messages:Vector<EncryptedMessage> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> intermediate_state:updates.State = updates.Difference;
updates.differenceTooLong#4afe8f6d pts:int = updates.Difference;
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
photos.photos#8dca6aa5 photos:Vector<Photo> users:Vector<User> = photos.Photos;
photos.photosSlice#15051f54 count:int photos:Vector<Photo> users:Vector<User> = photos.Photos;
photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;
upload.file#96a18d5 type:storage.FileType mtime:int bytes:bytes = upload.File;
upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;
dcOption#18b7a10d flags:# ipv6:flags.0?true media_only:flags.1?true tcpo_only:flags.2?true cdn:flags.3?true static:flags.4?true this_port_only:flags.5?true id:int ip_address:string port:int secret:flags.10?bytes = DcOption;
config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;
nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;
help.appUpdate#ccbbce30 flags:# can_not_skip:flags.0?true id:int version:string text:string entities:Vector<MessageEntity> document:flags.1?Document url:flags.2?string sticker:flags.3?Document = help.AppUpdate;
help.noAppUpdate#c45a6536 = help.AppUpdate;
help.inviteText#18cb9f78 message:string = help.InviteText;
encryptedChatEmpty#ab7ec0a0 id:int = EncryptedChat;
encryptedChatWaiting#66b25953 id:int access_hash:long date:int admin_id:long participant_id:long = EncryptedChat;
encryptedChatRequested#48f1d94c flags:# folder_id:flags.0?int id:int access_hash:long date:int admin_id:long participant_id:long g_a:bytes = EncryptedChat;
encryptedChat#61f0d4c7 id:int access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long = EncryptedChat;
encryptedChatDiscarded#1e1c7c45 flags:# history_deleted:flags.0?true id:int = EncryptedChat;
inputEncryptedChat#f141b5e1 chat_id:int access_hash:long = InputEncryptedChat;
encryptedFileEmpty#c21f497e = EncryptedFile;
encryptedFile#a8008cd8 id:long access_hash:long size:long dc_id:int key_fingerprint:int = EncryptedFile;
inputEncryptedFileEmpty#1837c364 = InputEncryptedFile;
inputEncryptedFileUploaded#64bd0306 id:long parts:int md5_checksum:string key_fingerprint:int = InputEncryptedFile;
inputEncryptedFile#5a17b5e5 id:long access_hash:long = InputEncryptedFile;
inputEncryptedFileBigUploaded#2dc173c8 id:long parts:int key_fingerprint:int = InputEncryptedFile;
encryptedMessage#ed18c118 random_id:long chat_id:int date:int bytes:bytes file:EncryptedFile = EncryptedMessage;
encryptedMessageService#23734b06 random_id:long chat_id:int date:int bytes:bytes = EncryptedMessage;
messages.dhConfigNotModified#c0e24635 random:bytes = messages.DhConfig;
messages.dhConfig#2c221edd g:int p:bytes version:int random:bytes = messages.DhConfig;
messages.sentEncryptedMessage#560f8935 date:int = messages.SentEncryptedMessage;
messages.sentEncryptedFile#9493ff32 date:int file:EncryptedFile = messages.SentEncryptedMessage;
inputDocumentEmpty#72f0eaae = InputDocument;
inputDocument#1abfb575 id:long access_hash:long file_reference:bytes = InputDocument;
documentEmpty#36f8c871 id:long = Document;
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
help.support#17c6b5f6 phone_number:string user:User = help.Support;
notifyPeer#9fd40bd8 peer:Peer = NotifyPeer;
notifyUsers#b4c83b4c = NotifyPeer;
notifyChats#c007cec3 = NotifyPeer;
notifyBroadcasts#d612e8ef = NotifyPeer;
notifyForumTopic#226e6308 peer:Peer top_msg_id:int = NotifyPeer;
sendMessageTypingAction#16bf744e = SendMessageAction;
sendMessageCancelAction#fd5ec8f5 = SendMessageAction;
sendMessageRecordVideoAction#a187d66f = SendMessageAction;
sendMessageUploadVideoAction#e9763aec progress:int = SendMessageAction;
sendMessageRecordAudioAction#d52f73f7 = SendMessageAction;
sendMessageUploadAudioAction#f351d7ab progress:int = SendMessageAction;
sendMessageUploadPhotoAction#d1d34a26 progress:int = SendMessageAction;
sendMessageUploadDocumentAction#aa0cd9e4 progress:int = SendMessageAction;
sendMessageGeoLocationAction#176f8ba1 = SendMessageAction;
sendMessageChooseContactAction#628cbc6f = SendMessageAction;
sendMessageGamePlayAction#dd6a8f48 = SendMessageAction;
sendMessageRecordRoundAction#88f27fbc = SendMessageAction;
sendMessageUploadRoundAction#243e1c66 progress:int = SendMessageAction;
speakingInGroupCallAction#d92c2285 = SendMessageAction;
sendMessageHistoryImportAction#dbda9246 progress:int = SendMessageAction;
sendMessageChooseStickerAction#b05ac6b1 = SendMessageAction;
sendMessageEmojiInteraction#25972bcb emoticon:string msg_id:int interaction:DataJSON = SendMessageAction;
sendMessageEmojiInteractionSeen#b665902e emoticon:string = SendMessageAction;
contacts.found#b3134d9d my_results:Vector<Peer> results:Vector<Peer> chats:Vector<Chat> users:Vector<User> = contacts.Found;
inputPrivacyKeyStatusTimestamp#4f96cb18 = InputPrivacyKey;
inputPrivacyKeyChatInvite#bdfb0426 = InputPrivacyKey;
inputPrivacyKeyPhoneCall#fabadc5f = InputPrivacyKey;
inputPrivacyKeyPhoneP2P#db9e70d2 = InputPrivacyKey;
inputPrivacyKeyForwards#a4dd4c08 = InputPrivacyKey;
inputPrivacyKeyProfilePhoto#5719bacc = InputPrivacyKey;
inputPrivacyKeyPhoneNumber#352dafa = InputPrivacyKey;
inputPrivacyKeyAddedByPhone#d1219bdd = InputPrivacyKey;
inputPrivacyKeyVoiceMessages#aee69d68 = InputPrivacyKey;
inputPrivacyKeyAbout#3823cc40 = InputPrivacyKey;
inputPrivacyKeyBirthday#d65a11cc = InputPrivacyKey;
inputPrivacyKeyStarGiftsAutoSave#e1732341 = InputPrivacyKey;
privacyKeyStatusTimestamp#bc2eab30 = PrivacyKey;
privacyKeyChatInvite#500e6dfa = PrivacyKey;
privacyKeyPhoneCall#3d662b7b = PrivacyKey;
privacyKeyPhoneP2P#39491cc8 = PrivacyKey;
privacyKeyForwards#69ec56a3 = PrivacyKey;
privacyKeyProfilePhoto#96151fed = PrivacyKey;
privacyKeyPhoneNumber#d19ae46d = PrivacyKey;
privacyKeyAddedByPhone#42ffd42b = PrivacyKey;
privacyKeyVoiceMessages#697f414 = PrivacyKey;
privacyKeyAbout#a486b761 = PrivacyKey;
privacyKeyBirthday#2000a518 = PrivacyKey;
privacyKeyStarGiftsAutoSave#2ca4fdf8 = PrivacyKey;
inputPrivacyValueAllowContacts#d09e07b = InputPrivacyRule;
inputPrivacyValueAllowAll#184b35ce = InputPrivacyRule;
inputPrivacyValueAllowUsers#131cc67f users:Vector<InputUser> = InputPrivacyRule;
inputPrivacyValueDisallowContacts#ba52007 = InputPrivacyRule;
inputPrivacyValueDisallowAll#d66b66c9 = InputPrivacyRule;
inputPrivacyValueDisallowUsers#90110467 users:Vector<InputUser> = InputPrivacyRule;
inputPrivacyValueAllowChatParticipants#840649cf chats:Vector<long> = InputPrivacyRule;
inputPrivacyValueDisallowChatParticipants#e94f0f86 chats:Vector<long> = InputPrivacyRule;
inputPrivacyValueAllowCloseFriends#2f453e49 = InputPrivacyRule;
inputPrivacyValueAllowPremium#77cdc9f1 = InputPrivacyRule;
inputPrivacyValueAllowBots#5a4fcce5 = InputPrivacyRule;
inputPrivacyValueDisallowBots#c4e57915 = InputPrivacyRule;
privacyValueAllowContacts#fffe1bac = PrivacyRule;
privacyValueAllowAll#65427b82 = PrivacyRule;
privacyValueAllowUsers#b8905fb2 users:Vector<long> = PrivacyRule;
privacyValueDisallowContacts#f888fa1a = PrivacyRule;
privacyValueDisallowAll#8b73e763 = PrivacyRule;
privacyValueDisallowUsers#e4621141 users:Vector<long> = PrivacyRule;
privacyValueAllowChatParticipants#6b134e8e chats:Vector<long> = PrivacyRule;
privacyValueDisallowChatParticipants#41c87565 chats:Vector<long> = PrivacyRule;
privacyValueAllowCloseFriends#f7e8d89b = PrivacyRule;
privacyValueAllowPremium#ece9814b = PrivacyRule;
privacyValueAllowBots#21461b5d = PrivacyRule;
privacyValueDisallowBots#f6a5f82f = PrivacyRule;
account.privacyRules#50a04e45 rules:Vector<PrivacyRule> chats:Vector<Chat> users:Vector<User> = account.PrivacyRules;
accountDaysTTL#b8d0afdf days:int = AccountDaysTTL;
documentAttributeImageSize#6c37c15c w:int h:int = DocumentAttribute;
documentAttributeAnimated#11b58939 = DocumentAttribute;
documentAttributeSticker#6319d612 flags:# mask:flags.1?true alt:string stickerset:InputStickerSet mask_coords:flags.0?MaskCoords = DocumentAttribute;
documentAttributeVideo#43c57c48 flags:# round_message:flags.0?true supports_streaming:flags.1?true nosound:flags.3?true duration:double w:int h:int preload_prefix_size:flags.2?int video_start_ts:flags.4?double video_codec:flags.5?string = DocumentAttribute;
documentAttributeAudio#9852f9c6 flags:# voice:flags.10?true duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;
documentAttributeFilename#15590068 file_name:string = DocumentAttribute;
documentAttributeHasStickers#9801d2f7 = DocumentAttribute;
documentAttributeCustomEmoji#fd149899 flags:# free:flags.0?true text_color:flags.1?true alt:string stickerset:InputStickerSet = DocumentAttribute;
messages.stickersNotModified#f1749a22 = messages.Stickers;
messages.stickers#30a6ec7e hash:long stickers:Vector<Document> = messages.Stickers;
stickerPack#12b299d4 emoticon:string documents:Vector<long> = StickerPack;
messages.allStickersNotModified#e86602c3 = messages.AllStickers;
messages.allStickers#cdbbcebb hash:long sets:Vector<StickerSet> = messages.AllStickers;
messages.affectedMessages#84d19185 pts:int pts_count:int = messages.AffectedMessages;
webPageEmpty#211a1788 flags:# id:long url:flags.0?string = WebPage;
webPagePending#b0d13e47 flags:# id:long url:flags.0?string date:int = WebPage;
webPage#e89c45b2 flags:# has_large_media:flags.13?true id:long url:string display_url:string hash:int type:flags.0?string site_name:flags.1?string title:flags.2?string description:flags.3?string photo:flags.4?Photo embed_url:flags.5?string embed_type:flags.5?string embed_width:flags.6?int embed_height:flags.6?int duration:flags.7?int author:flags.8?string document:flags.9?Document cached_page:flags.10?Page attributes:flags.12?Vector<WebPageAttribute> = WebPage;
webPageNotModified#7311ca11 flags:# cached_page_views:flags.0?int = WebPage;
authorization#ad01d61d flags:# current:flags.0?true official_app:flags.1?true password_pending:flags.2?true encrypted_requests_disabled:flags.3?true call_requests_disabled:flags.4?true unconfirmed:flags.5?true hash:long device_model:string platform:string system_version:string api_id:int app_name:string app_version:string date_created:int date_active:int ip:string country:string region:string = Authorization;
account.authorizations#4bff8ea0 authorization_ttl_days:int authorizations:Vector<Authorization> = account.Authorizations;
account.password#957b50fb flags:# has_recovery:flags.0?true has_secure_values:flags.1?true has_password:flags.2?true current_algo:flags.2?PasswordKdfAlgo srp_B:flags.2?bytes srp_id:flags.2?long hint:flags.3?string email_unconfirmed_pattern:flags.4?string new_algo:PasswordKdfAlgo new_secure_algo:SecurePasswordKdfAlgo secure_random:bytes pending_reset_date:flags.5?int login_email_pattern:flags.6?string = account.Password;
account.passwordSettings#9a5c33e5 flags:# email:flags.0?string secure_settings:flags.1?SecureSecretSettings = account.PasswordSettings;
account.passwordInputSettings#c23727c9 flags:# new_algo:flags.0?PasswordKdfAlgo new_password_hash:flags.0?bytes hint:flags.0?string email:flags.1?string new_secure_settings:flags.2?SecureSecretSettings = account.PasswordInputSettings;
auth.passwordRecovery#137948a5 email_pattern:string = auth.PasswordRecovery;
receivedNotifyMessage#a384b779 id:int flags:int = ReceivedNotifyMessage;
chatInviteExported#a22cbd96 flags:# revoked:flags.0?true permanent:flags.5?true request_needed:flags.6?true link:string admin_id:long date:int start_date:flags.4?int expire_date:flags.1?int usage_limit:flags.2?int usage:flags.3?int requested:flags.7?int subscription_expired:flags.10?int title:flags.8?string subscription_pricing:flags.9?StarsSubscriptionPricing = ExportedChatInvite;
chatInvitePublicJoinRequests#ed107ab7 = ExportedChatInvite;
chatInviteAlready#5a686d7c chat:Chat = ChatInvite;
chatInvite#5c9d3702 flags:# channel:flags.0?true broadcast:flags.1?true public:flags.2?true megagroup:flags.3?true request_needed:flags.6?true verified:flags.7?true scam:flags.8?true fake:flags.9?true can_refulfill_subscription:flags.11?true title:string about:flags.5?string photo:Photo participants_count:int participants:flags.4?Vector<User> color:int subscription_pricing:flags.10?StarsSubscriptionPricing subscription_form_id:flags.12?long bot_verification:flags.13?BotVerification = ChatInvite;
chatInvitePeek#61695cb0 chat:Chat expires:int = ChatInvite;
inputStickerSetEmpty#ffb62b95 = InputStickerSet;
inputStickerSetID#9de7a269 id:long access_hash:long = InputStickerSet;
inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
inputStickerSetAnimatedEmoji#28703c8 = InputStickerSet;
inputStickerSetDice#e67f520e emoticon:string = InputStickerSet;
inputStickerSetAnimatedEmojiAnimations#cde3739 = InputStickerSet;
inputStickerSetPremiumGifts#c88b3b02 = InputStickerSet;
inputStickerSetEmojiGenericAnimations#4c4d4ce = InputStickerSet;
inputStickerSetEmojiDefaultStatuses#29d0f5ee = InputStickerSet;
inputStickerSetEmojiDefaultTopicIcons#44c1f8e9 = InputStickerSet;
inputStickerSetEmojiChannelDefaultStatuses#49748553 = InputStickerSet;
stickerSet#2dd14edc flags:# archived:flags.1?true official:flags.2?true masks:flags.3?true emojis:flags.7?true text_color:flags.9?true channel_emoji_status:flags.10?true creator:flags.11?true installed_date:flags.0?int id:long access_hash:long title:string short_name:string thumbs:flags.4?Vector<PhotoSize> thumb_dc_id:flags.4?int thumb_version:flags.4?int thumb_document_id:flags.8?long count:int hash:int = StickerSet;
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
botCommand#c27ac8c7 command:string description:string = BotCommand;
botInfo#4d8a0299 flags:# has_preview_medias:flags.6?true user_id:flags.0?long description:flags.1?string description_photo:flags.4?Photo description_document:flags.5?Document commands:flags.2?Vector<BotCommand> menu_button:flags.3?BotMenuButton privacy_policy_url:flags.7?string app_settings:flags.8?BotAppSettings verifier_settings:flags.9?BotVerifierSettings = BotInfo;
keyboardButton#a2fa4880 text:string = KeyboardButton;
keyboardButtonUrl#258aff05 text:string url:string = KeyboardButton;
keyboardButtonCallback#35bbdb6b flags:# requires_password:flags.0?true text:string data:bytes = KeyboardButton;
keyboardButtonRequestPhone#b16a6c29 text:string = KeyboardButton;
keyboardButtonRequestGeoLocation#fc796b3f text:string = KeyboardButton;
keyboardButtonSwitchInline#93b9fbb5 flags:# same_peer:flags.0?true text:string query:string peer_types:flags.1?Vector<InlineQueryPeerType> = KeyboardButton;
keyboardButtonGame#50f41ccf text:string = KeyboardButton;
keyboardButtonBuy#afd93fbb text:string = KeyboardButton;
keyboardButtonUrlAuth#10b78d29 flags:# text:string fwd_text:flags.0?string url:string button_id:int = KeyboardButton;
inputKeyboardButtonUrlAuth#d02e7fd4 flags:# request_write_access:flags.0?true text:string fwd_text:flags.1?string url:string bot:InputUser = KeyboardButton;
keyboardButtonRequestPoll#bbc7515d flags:# quiz:flags.0?Bool text:string = KeyboardButton;
inputKeyboardButtonUserProfile#e988037b text:string user_id:InputUser = KeyboardButton;
keyboardButtonUserProfile#308660c1 text:string user_id:long = KeyboardButton;
keyboardButtonWebView#13767230 text:string url:string = KeyboardButton;
keyboardButtonSimpleWebView#a0c0505c text:string url:string = KeyboardButton;
keyboardButtonRequestPeer#53d7bfd8 text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
inputKeyboardButtonRequestPeer#c9662d05 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
keyboardButtonCopy#75d2698e text:string copy_text:string = KeyboardButton;
keyboardButtonRow#77608b83 buttons:Vector<KeyboardButton> = KeyboardButtonRow;
replyKeyboardHide#a03e5b85 flags:# selective:flags.2?true = ReplyMarkup;
replyKeyboardForceReply#86b40b08 flags:# single_use:flags.1?true selective:flags.2?true placeholder:flags.3?string = ReplyMarkup;
replyKeyboardMarkup#85dd99d1 flags:# resize:flags.0?true single_use:flags.1?true selective:flags.2?true persistent:flags.4?true rows:Vector<KeyboardButtonRow> placeholder:flags.3?string = ReplyMarkup;
replyInlineMarkup#48a30254 rows:Vector<KeyboardButtonRow> = ReplyMarkup;
messageEntityUnknown#bb92ba95 offset:int length:int = MessageEntity;
messageEntityMention#fa04579d offset:int length:int = MessageEntity;
messageEntityHashtag#6f635b0d offset:int length:int = MessageEntity;
messageEntityBotCommand#6cef8ac7 offset:int length:int = MessageEntity;
messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;
messageEntityEmail#64e475c2 offset:int length:int = MessageEntity;
messageEntityBold#bd610bc9 offset:int length:int = MessageEntity;
messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
messageEntityCode#28a20571 offset:int length:int = MessageEntity;
messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
messageEntityMentionName#dc7b1140 offset:int length:int user_id:long = MessageEntity;
inputMessageEntityMentionName#208e68c9 offset:int length:int user_id:InputUser = MessageEntity;
messageEntityPhone#9b69e34b offset:int length:int = MessageEntity;
messageEntityCashtag#4c4e743f offset:int length:int = MessageEntity;
messageEntityUnderline#9c4e7e8b offset:int length:int = MessageEntity;
messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
messageEntityBankCard#761e6af4 offset:int length:int = MessageEntity;
messageEntitySpoiler#32ca960f offset:int length:int = MessageEntity;
messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;
messageEntityBlockquote#f1ccaaac flags:# collapsed:flags.0?true offset:int length:int = MessageEntity;
inputChannelEmpty#ee8c1e86 = InputChannel;
inputChannel#f35aec28 channel_id:long access_hash:long = InputChannel;
inputChannelFromMessage#5b934f9d peer:InputPeer msg_id:int channel_id:long = InputChannel;
contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;
messageRange#ae30253 min_id:int max_id:int = MessageRange;
updates.channelDifferenceEmpty#3e11affb flags:# final:flags.0?true pts:int timeout:flags.1?int = updates.ChannelDifference;
updates.channelDifferenceTooLong#a4bcc6fe flags:# final:flags.0?true timeout:flags.1?int dialog:Dialog messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
updates.channelDifference#2064674e flags:# final:flags.0?true pts:int timeout:flags.1?int new_messages:Vector<Message> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
channelMessagesFilterEmpty#94d42ee7 = ChannelMessagesFilter;
channelMessagesFilter#cd77d957 flags:# exclude_new_messages:flags.1?true ranges:Vector<MessageRange> = ChannelMessagesFilter;
channelParticipant#cb397619 flags:# user_id:long date:int subscription_until_date:flags.0?int = ChannelParticipant;
channelParticipantSelf#4f607bef flags:# via_request:flags.0?true user_id:long inviter_id:long date:int subscription_until_date:flags.1?int = ChannelParticipant;
channelParticipantCreator#2fe601d3 flags:# user_id:long admin_rights:ChatAdminRights rank:flags.0?string = ChannelParticipant;
channelParticipantAdmin#34c3bb53 flags:# can_edit:flags.0?true self:flags.1?true user_id:long inviter_id:flags.1?long promoted_by:long date:int admin_rights:ChatAdminRights rank:flags.2?string = ChannelParticipant;
channelParticipantBanned#6df8014e flags:# left:flags.0?true peer:Peer kicked_by:long date:int banned_rights:ChatBannedRights = ChannelParticipant;
channelParticipantLeft#1b03f006 peer:Peer = ChannelParticipant;
channelParticipantsRecent#de3f3c79 = ChannelParticipantsFilter;
channelParticipantsAdmins#b4608969 = ChannelParticipantsFilter;
channelParticipantsKicked#a3b54985 q:string = ChannelParticipantsFilter;
channelParticipantsBots#b0d1865b = ChannelParticipantsFilter;
channelParticipantsBanned#1427a5e1 q:string = ChannelParticipantsFilter;
channelParticipantsSearch#656ac4b q:string = ChannelParticipantsFilter;
channelParticipantsContacts#bb6ae88d q:string = ChannelParticipantsFilter;
channelParticipantsMentions#e04b5ceb flags:# q:flags.0?string top_msg_id:flags.1?int = ChannelParticipantsFilter;
channels.channelParticipants#9ab0feaf count:int participants:Vector<ChannelParticipant> chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipants;
channels.channelParticipantsNotModified#f0173fe9 = channels.ChannelParticipants;
channels.channelParticipant#dfb80317 participant:ChannelParticipant chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipant;
help.termsOfService#780a0310 flags:# popup:flags.0?true id:DataJSON text:string entities:Vector<MessageEntity> min_age_confirm:flags.1?int = help.TermsOfService;
messages.savedGifsNotModified#e8025ca2 = messages.SavedGifs;
messages.savedGifs#84a02a0d hash:long gifs:Vector<Document> = messages.SavedGifs;
inputBotInlineMessageMediaAuto#3380c786 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageText#3dcd7a87 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaGeo#96929a85 flags:# geo_point:InputGeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaVenue#417bbf11 flags:# geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaContact#a6edbffd flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageGame#4b425864 flags:# reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaInvoice#d7e78225 flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:string provider_data:DataJSON reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineMessageMediaWebPage#bddcc510 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true optional:flags.6?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
inputBotInlineResult#88bf9319 flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?InputWebDocument content:flags.5?InputWebDocument send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultPhoto#a8d864a7 id:string type:string photo:InputPhoto send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultDocument#fff8fdc4 flags:# id:string type:string title:flags.1?string description:flags.2?string document:InputDocument send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultGame#4fa417f2 id:string short_name:string send_message:InputBotInlineMessage = InputBotInlineResult;
botInlineMessageMediaAuto#764cf810 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageText#8c7f65e2 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaGeo#51846fd flags:# geo:GeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaVenue#8a86659c flags:# geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaContact#18d1cdc2 flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaInvoice#354a9b09 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument currency:string total_amount:long reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineMessageMediaWebPage#809ad9a6 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true manual:flags.7?true safe:flags.8?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
botInlineResult#11965f3a flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?WebDocument content:flags.5?WebDocument send_message:BotInlineMessage = BotInlineResult;
botInlineMediaResult#17db940b flags:# id:string type:string photo:flags.0?Photo document:flags.1?Document title:flags.2?string description:flags.3?string send_message:BotInlineMessage = BotInlineResult;
messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;
exportedMessageLink#5dab1af4 link:string html:string = ExportedMessageLink;
messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;
auth.codeTypeSms#72a3158c = auth.CodeType;
auth.codeTypeCall#741cd3e3 = auth.CodeType;
auth.codeTypeFlashCall#226ccefb = auth.CodeType;
auth.codeTypeMissedCall#d61ad6ee = auth.CodeType;
auth.codeTypeFragmentSms#6ed998c = auth.CodeType;
auth.sentCodeTypeApp#3dbb5986 length:int = auth.SentCodeType;
auth.sentCodeTypeSms#c000bba2 length:int = auth.SentCodeType;
auth.sentCodeTypeCall#5353e5a7 length:int = auth.SentCodeType;
auth.sentCodeTypeFlashCall#ab03c6d9 pattern:string = auth.SentCodeType;
auth.sentCodeTypeMissedCall#82006484 prefix:string length:int = auth.SentCodeType;
auth.sentCodeTypeEmailCode#f450f59b flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true email_pattern:string length:int reset_available_period:flags.3?int reset_pending_date:flags.4?int = auth.SentCodeType;
auth.sentCodeTypeSetUpEmailRequired#a5491dea flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true = auth.SentCodeType;
auth.sentCodeTypeFragmentSms#d9565c39 url:string length:int = auth.SentCodeType;
auth.sentCodeTypeFirebaseSms#9fd736 flags:# nonce:flags.0?bytes play_integrity_project_id:flags.2?long play_integrity_nonce:flags.2?bytes receipt:flags.1?string push_timeout:flags.1?int length:int = auth.SentCodeType;
auth.sentCodeTypeSmsWord#a416ac81 flags:# beginning:flags.0?string = auth.SentCodeType;
auth.sentCodeTypeSmsPhrase#b37794af flags:# beginning:flags.0?string = auth.SentCodeType;
messages.botCallbackAnswer#36585ea4 flags:# alert:flags.1?true has_url:flags.3?true native_ui:flags.4?true message:flags.0?string url:flags.2?string cache_time:int = messages.BotCallbackAnswer;
messages.messageEditData#26b5dde6 flags:# caption:flags.0?true = messages.MessageEditData;
inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;
inputBotInlineMessageID64#b6d915d7 dc_id:int owner_id:long id:int access_hash:long = InputBotInlineMessageID;
inlineBotSwitchPM#3c20629f text:string start_param:string = InlineBotSwitchPM;
messages.peerDialogs#3371c354 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> state:updates.State = messages.PeerDialogs;
topPeer#edcdc05b peer:Peer rating:double = TopPeer;
topPeerCategoryBotsPM#ab661b5b = TopPeerCategory;
topPeerCategoryBotsInline#148677e2 = TopPeerCategory;
topPeerCategoryCorrespondents#637b7ed = TopPeerCategory;
topPeerCategoryGroups#bd17a14a = TopPeerCategory;
topPeerCategoryChannels#161d9628 = TopPeerCategory;
topPeerCategoryPhoneCalls#1e76a78c = TopPeerCategory;
topPeerCategoryForwardUsers#a8406ca9 = TopPeerCategory;
topPeerCategoryForwardChats#fbeec0f0 = TopPeerCategory;
topPeerCategoryBotsApp#fd9e7bec = TopPeerCategory;
topPeerCategoryPeers#fb834291 category:TopPeerCategory count:int peers:Vector<TopPeer> = TopPeerCategoryPeers;
contacts.topPeersNotModified#de266ef5 = contacts.TopPeers;
contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;
contacts.topPeersDisabled#b52c939d = contacts.TopPeers;
draftMessageEmpty#1b0c841a flags:# date:flags.0?int = DraftMessage;
draftMessage#2d65321f flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia date:int effect:flags.7?long = DraftMessage;
messages.featuredStickersNotModified#c6dc0c66 count:int = messages.FeaturedStickers;
messages.featuredStickers#be382906 flags:# premium:flags.0?true hash:long count:int sets:Vector<StickerSetCovered> unread:Vector<long> = messages.FeaturedStickers;
messages.recentStickersNotModified#b17f890 = messages.RecentStickers;
messages.recentStickers#88d37c56 hash:long packs:Vector<StickerPack> stickers:Vector<Document> dates:Vector<int> = messages.RecentStickers;
messages.archivedStickers#4fcba9c8 count:int sets:Vector<StickerSetCovered> = messages.ArchivedStickers;
messages.stickerSetInstallResultSuccess#38641628 = messages.StickerSetInstallResult;
messages.stickerSetInstallResultArchive#35e410a8 sets:Vector<StickerSetCovered> = messages.StickerSetInstallResult;
stickerSetCovered#6410a5d2 set:StickerSet cover:Document = StickerSetCovered;
stickerSetMultiCovered#3407e51b set:StickerSet covers:Vector<Document> = StickerSetCovered;
stickerSetFullCovered#40d13c0e set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = StickerSetCovered;
stickerSetNoCovered#77b15d1c set:StickerSet = StickerSetCovered;
maskCoords#aed6dbb2 n:int x:double y:double zoom:double = MaskCoords;
inputStickeredMediaPhoto#4a992157 id:InputPhoto = InputStickeredMedia;
inputStickeredMediaDocument#438865b id:InputDocument = InputStickeredMedia;
game#bdf9653b flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document = Game;
inputGameID#32c3e77 id:long access_hash:long = InputGame;
inputGameShortName#c331e80a bot_id:InputUser short_name:string = InputGame;
highScore#73a379eb pos:int user_id:long score:int = HighScore;
messages.highScores#9a3bfd99 scores:Vector<HighScore> users:Vector<User> = messages.HighScores;
textEmpty#dc3d824f = RichText;
textPlain#744694e0 text:string = RichText;
textBold#6724abc4 text:RichText = RichText;
textItalic#d912a59c text:RichText = RichText;
textUnderline#c12622c4 text:RichText = RichText;
textStrike#9bf8bb95 text:RichText = RichText;
textFixed#6c3f19b9 text:RichText = RichText;
textUrl#3c2884c1 text:RichText url:string webpage_id:long = RichText;
textEmail#de5a0dd6 text:RichText email:string = RichText;
textConcat#7e6260d7 texts:Vector<RichText> = RichText;
textSubscript#ed6a8504 text:RichText = RichText;
textSuperscript#c7fb5e01 text:RichText = RichText;
textMarked#34b8621 text:RichText = RichText;
textPhone#1ccb966a text:RichText phone:string = RichText;
textImage#81ccf4f document_id:long w:int h:int = RichText;
textAnchor#35553762 text:RichText name:string = RichText;
pageBlockUnsupported#13567e8a = PageBlock;
pageBlockTitle#70abc3fd text:RichText = PageBlock;
pageBlockSubtitle#8ffa9a1f text:RichText = PageBlock;
pageBlockAuthorDate#baafe5e0 author:RichText published_date:int = PageBlock;
pageBlockHeader#bfd064ec text:RichText = PageBlock;
pageBlockSubheader#f12bb6e1 text:RichText = PageBlock;
pageBlockParagraph#467a0766 text:RichText = PageBlock;
pageBlockPreformatted#c070d93e text:RichText language:string = PageBlock;
pageBlockFooter#48870999 text:RichText = PageBlock;
pageBlockDivider#db20b188 = PageBlock;
pageBlockAnchor#ce0d37b0 name:string = PageBlock;
pageBlockList#e4e88011 items:Vector<PageListItem> = PageBlock;
pageBlockBlockquote#263d7c26 text:RichText caption:RichText = PageBlock;
pageBlockPullquote#4f4456d3 text:RichText caption:RichText = PageBlock;
pageBlockPhoto#1759c560 flags:# photo_id:long caption:PageCaption url:flags.0?string webpage_id:flags.0?long = PageBlock;
pageBlockVideo#7c8fe7b6 flags:# autoplay:flags.0?true loop:flags.1?true video_id:long caption:PageCaption = PageBlock;
pageBlockCover#39f23300 cover:PageBlock = PageBlock;
pageBlockEmbed#a8718dc5 flags:# full_width:flags.0?true allow_scrolling:flags.3?true url:flags.1?string html:flags.2?string poster_photo_id:flags.4?long w:flags.5?int h:flags.5?int caption:PageCaption = PageBlock;
pageBlockEmbedPost#f259a80b url:string webpage_id:long author_photo_id:long author:string date:int blocks:Vector<PageBlock> caption:PageCaption = PageBlock;
pageBlockCollage#65a0fa4d items:Vector<PageBlock> caption:PageCaption = PageBlock;
pageBlockSlideshow#31f9590 items:Vector<PageBlock> caption:PageCaption = PageBlock;
pageBlockChannel#ef1751b5 channel:Chat = PageBlock;
pageBlockAudio#804361ea audio_id:long caption:PageCaption = PageBlock;
pageBlockKicker#1e148390 text:RichText = PageBlock;
pageBlockTable#bf4dea82 flags:# bordered:flags.0?true striped:flags.1?true title:RichText rows:Vector<PageTableRow> = PageBlock;
pageBlockOrderedList#9a8ae1e1 items:Vector<PageListOrderedItem> = PageBlock;
pageBlockDetails#76768bed flags:# open:flags.0?true blocks:Vector<PageBlock> title:RichText = PageBlock;
pageBlockRelatedArticles#16115a96 title:RichText articles:Vector<PageRelatedArticle> = PageBlock;
pageBlockMap#a44f3ef6 geo:GeoPoint zoom:int w:int h:int caption:PageCaption = PageBlock;
phoneCallDiscardReasonMissed#85e42301 = PhoneCallDiscardReason;
phoneCallDiscardReasonDisconnect#e095c1a0 = PhoneCallDiscardReason;
phoneCallDiscardReasonHangup#57adc690 = PhoneCallDiscardReason;
phoneCallDiscardReasonBusy#faf7e8c9 = PhoneCallDiscardReason;
phoneCallDiscardReasonAllowGroupCall#afe2b839 encrypted_key:bytes = PhoneCallDiscardReason;
dataJSON#7d748d04 data:string = DataJSON;
labeledPrice#cb296bf8 label:string amount:long = LabeledPrice;
invoice#49ee584 flags:# test:flags.0?true name_requested:flags.1?true phone_requested:flags.2?true email_requested:flags.3?true shipping_address_requested:flags.4?true flexible:flags.5?true phone_to_provider:flags.6?true email_to_provider:flags.7?true recurring:flags.9?true currency:string prices:Vector<LabeledPrice> max_tip_amount:flags.8?long suggested_tip_amounts:flags.8?Vector<long> terms_url:flags.10?string subscription_period:flags.11?int = Invoice;
paymentCharge#ea02c27e id:string provider_charge_id:string = PaymentCharge;
postAddress#1e8caaeb street_line1:string street_line2:string city:string state:string country_iso2:string post_code:string = PostAddress;
paymentRequestedInfo#909c3f94 flags:# name:flags.0?string phone:flags.1?string email:flags.2?string shipping_address:flags.3?PostAddress = PaymentRequestedInfo;
paymentSavedCredentialsCard#cdc27a1f id:string title:string = PaymentSavedCredentials;
webDocument#1c570ed1 url:string access_hash:long size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;
webDocumentNoProxy#f9c8bcc6 url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;
inputWebDocument#9bed434d url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = InputWebDocument;
inputWebFileLocation#c239d686 url:string access_hash:long = InputWebFileLocation;
inputWebFileGeoPointLocation#9f2221c9 geo_point:InputGeoPoint access_hash:long w:int h:int zoom:int scale:int = InputWebFileLocation;
inputWebFileAudioAlbumThumbLocation#f46fe924 flags:# small:flags.2?true document:flags.0?InputDocument title:flags.1?string performer:flags.1?string = InputWebFileLocation;
upload.webFile#21e753bc size:int mime_type:string file_type:storage.FileType mtime:int bytes:bytes = upload.WebFile;
payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;
payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;
payments.paymentFormStarGift#b425cfe1 form_id:long invoice:Invoice = payments.PaymentForm;
payments.validatedRequestedInfo#d1451883 flags:# id:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = payments.ValidatedRequestedInfo;
payments.paymentResult#4e5f810d updates:Updates = payments.PaymentResult;
payments.paymentVerificationNeeded#d8411139 url:string = payments.PaymentResult;
payments.paymentReceipt#70c4fe03 flags:# date:int bot_id:long provider_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice info:flags.0?PaymentRequestedInfo shipping:flags.1?ShippingOption tip_amount:flags.3?long currency:string total_amount:long credentials_title:string users:Vector<User> = payments.PaymentReceipt;
payments.paymentReceiptStars#dabbf83a flags:# date:int bot_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice currency:string total_amount:long transaction_id:string users:Vector<User> = payments.PaymentReceipt;
payments.savedInfo#fb8fe43c flags:# has_saved_credentials:flags.1?true saved_info:flags.0?PaymentRequestedInfo = payments.SavedInfo;
inputPaymentCredentialsSaved#c10eb2cf id:string tmp_password:bytes = InputPaymentCredentials;
inputPaymentCredentials#3417d728 flags:# save:flags.0?true data:DataJSON = InputPaymentCredentials;
inputPaymentCredentialsApplePay#aa1c39f payment_data:DataJSON = InputPaymentCredentials;
inputPaymentCredentialsGooglePay#8ac32801 payment_token:DataJSON = InputPaymentCredentials;
account.tmpPassword#db64fd34 tmp_password:bytes valid_until:int = account.TmpPassword;
shippingOption#b6213cdf id:string title:string prices:Vector<LabeledPrice> = ShippingOption;
inputStickerSetItem#32da9e9c flags:# document:InputDocument emoji:string mask_coords:flags.0?MaskCoords keywords:flags.1?string = InputStickerSetItem;
inputPhoneCall#1e36fded id:long access_hash:long = InputPhoneCall;
phoneCallEmpty#5366c915 id:long = PhoneCall;
phoneCallWaiting#eed42858 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long protocol:PhoneCallProtocol receive_date:flags.0?int conference_call:flags.8?InputGroupCall = PhoneCall;
phoneCallRequested#45361c63 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_hash:bytes protocol:PhoneCallProtocol conference_call:flags.8?InputGroupCall = PhoneCall;
phoneCallAccepted#22fd7181 flags:# video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_b:bytes protocol:PhoneCallProtocol conference_call:flags.8?InputGroupCall = PhoneCall;
phoneCall#3ba5940c flags:# p2p_allowed:flags.5?true video:flags.6?true id:long access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long protocol:PhoneCallProtocol connections:Vector<PhoneConnection> start_date:int custom_parameters:flags.7?DataJSON conference_call:flags.8?InputGroupCall = PhoneCall;
phoneCallDiscarded#f9d25503 flags:# need_rating:flags.2?true need_debug:flags.3?true video:flags.6?true id:long reason:flags.0?PhoneCallDiscardReason duration:flags.1?int conference_call:flags.8?InputGroupCall = PhoneCall;
phoneConnection#9cc123c7 flags:# tcp:flags.0?true id:long ip:string ipv6:string port:int peer_tag:bytes = PhoneConnection;
phoneConnectionWebrtc#635fe375 flags:# turn:flags.0?true stun:flags.1?true id:long ip:string ipv6:string port:int username:string password:string = PhoneConnection;
phoneCallProtocol#fc878fc8 flags:# udp_p2p:flags.0?true udp_reflector:flags.1?true min_layer:int max_layer:int library_versions:Vector<string> = PhoneCallProtocol;
phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;
upload.cdnFileReuploadNeeded#eea8e46e request_token:bytes = upload.CdnFile;
upload.cdnFile#a99fca4f bytes:bytes = upload.CdnFile;
cdnPublicKey#c982eaba dc_id:int public_key:string = CdnPublicKey;
cdnConfig#5725e40a public_keys:Vector<CdnPublicKey> = CdnConfig;
langPackString#cad181f6 key:string value:string = LangPackString;
langPackStringPluralized#6c47ac9f flags:# key:string zero_value:flags.0?string one_value:flags.1?string two_value:flags.2?string few_value:flags.3?string many_value:flags.4?string other_value:string = LangPackString;
langPackStringDeleted#2979eeb2 key:string = LangPackString;
langPackDifference#f385c1f6 lang_code:string from_version:int version:int strings:Vector<LangPackString> = LangPackDifference;
langPackLanguage#eeca5ce3 flags:# official:flags.0?true rtl:flags.2?true beta:flags.3?true name:string native_name:string lang_code:string base_lang_code:flags.1?string plural_code:string strings_count:int translated_count:int translations_url:string = LangPackLanguage;
channelAdminLogEventActionChangeTitle#e6dfb825 prev_value:string new_value:string = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeAbout#55188a2e prev_value:string new_value:string = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeUsername#6a4afc38 prev_value:string new_value:string = ChannelAdminLogEventAction;
channelAdminLogEventActionChangePhoto#434bd2af prev_photo:Photo new_photo:Photo = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleInvites#1b7907ae new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleSignatures#26ae0971 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionUpdatePinned#e9e82c18 message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionEditMessage#709b2405 prev_message:Message new_message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionDeleteMessage#42e047bb message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantJoin#183040d3 = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantLeave#f89777f2 = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantInvite#e31c34d8 participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantToggleBan#e6d83d7e prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantToggleAdmin#d5676710 prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeStickerSet#b1c3caa7 prev_stickerset:InputStickerSet new_stickerset:InputStickerSet = ChannelAdminLogEventAction;
channelAdminLogEventActionTogglePreHistoryHidden#5f5c95f1 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionDefaultBannedRights#2df5fc0a prev_banned_rights:ChatBannedRights new_banned_rights:ChatBannedRights = ChannelAdminLogEventAction;
channelAdminLogEventActionStopPoll#8f079643 message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeLinkedChat#50c7ac8 prev_value:long new_value:long = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeLocation#e6b76ae prev_value:ChannelLocation new_value:ChannelLocation = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleSlowMode#53909779 prev_value:int new_value:int = ChannelAdminLogEventAction;
channelAdminLogEventActionStartGroupCall#23209745 call:InputGroupCall = ChannelAdminLogEventAction;
channelAdminLogEventActionDiscardGroupCall#db9f9140 call:InputGroupCall = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantMute#f92424d2 participant:GroupCallParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantUnmute#e64429c0 participant:GroupCallParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleGroupCallSetting#56d6a247 join_muted:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantJoinByInvite#fe9fc158 flags:# via_chatlist:flags.0?true invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionExportedInviteDelete#5a50fca4 invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionExportedInviteRevoke#410a134e invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionExportedInviteEdit#e90ebb59 prev_invite:ExportedChatInvite new_invite:ExportedChatInvite = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantVolume#3e7f6847 participant:GroupCallParticipant = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeHistoryTTL#6e941a38 prev_value:int new_value:int = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantJoinByRequest#afb6144a invite:ExportedChatInvite approved_by:long = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleNoForwards#cb2ac766 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionSendMessage#278f2868 message:Message = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeAvailableReactions#be4e0ef8 prev_value:ChatReactions new_value:ChatReactions = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeUsernames#f04fb3a9 prev_value:Vector<string> new_value:Vector<string> = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleForum#2cc6383 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionCreateTopic#58707d28 topic:ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionEditTopic#f06fe208 prev_topic:ForumTopic new_topic:ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionDeleteTopic#ae168909 topic:ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionPinTopic#5d8d353b flags:# prev_topic:flags.0?ForumTopic new_topic:flags.1?ForumTopic = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleAntiSpam#64f36dfc new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionChangePeerColor#5796e780 prev_value:PeerColor new_value:PeerColor = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeProfilePeerColor#5e477b25 prev_value:PeerColor new_value:PeerColor = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeWallpaper#31bb5d52 prev_value:WallPaper new_value:WallPaper = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeEmojiStatus#3ea9feb1 prev_value:EmojiStatus new_value:EmojiStatus = ChannelAdminLogEventAction;
channelAdminLogEventActionChangeEmojiStickerSet#46d840ab prev_stickerset:InputStickerSet new_stickerset:InputStickerSet = ChannelAdminLogEventAction;
channelAdminLogEventActionToggleSignatureProfiles#60a79c79 new_value:Bool = ChannelAdminLogEventAction;
channelAdminLogEventActionParticipantSubExtend#64642db3 prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
channelAdminLogEvent#1fad68cd id:long date:int user_id:long action:ChannelAdminLogEventAction = ChannelAdminLogEvent;
channels.adminLogResults#ed8af74d events:Vector<ChannelAdminLogEvent> chats:Vector<Chat> users:Vector<User> = channels.AdminLogResults;
channelAdminLogEventsFilter#ea107ae4 flags:# join:flags.0?true leave:flags.1?true invite:flags.2?true ban:flags.3?true unban:flags.4?true kick:flags.5?true unkick:flags.6?true promote:flags.7?true demote:flags.8?true info:flags.9?true settings:flags.10?true pinned:flags.11?true edit:flags.12?true delete:flags.13?true group_call:flags.14?true invites:flags.15?true send:flags.16?true forums:flags.17?true sub_extend:flags.18?true = ChannelAdminLogEventsFilter;
popularContact#5ce14175 client_id:long importers:int = PopularContact;
messages.favedStickersNotModified#9e8fa6d3 = messages.FavedStickers;
messages.favedStickers#2cb51097 hash:long packs:Vector<StickerPack> stickers:Vector<Document> = messages.FavedStickers;
recentMeUrlUnknown#46e1d13d url:string = RecentMeUrl;
recentMeUrlUser#b92c09e2 url:string user_id:long = RecentMeUrl;
recentMeUrlChat#b2da71d2 url:string chat_id:long = RecentMeUrl;
recentMeUrlChatInvite#eb49081d url:string chat_invite:ChatInvite = RecentMeUrl;
recentMeUrlStickerSet#bc0a57dc url:string set:StickerSetCovered = RecentMeUrl;
help.recentMeUrls#e0310d7 urls:Vector<RecentMeUrl> chats:Vector<Chat> users:Vector<User> = help.RecentMeUrls;
inputSingleMedia#1cc6e91f flags:# media:InputMedia random_id:long message:string entities:flags.0?Vector<MessageEntity> = InputSingleMedia;
webAuthorization#a6f8f452 hash:long bot_id:long domain:string browser:string platform:string date_created:int date_active:int ip:string region:string = WebAuthorization;
account.webAuthorizations#ed56c9fc authorizations:Vector<WebAuthorization> users:Vector<User> = account.WebAuthorizations;
inputMessageID#a676a322 id:int = InputMessage;
inputMessageReplyTo#bad88395 id:int = InputMessage;
inputMessagePinned#86872538 = InputMessage;
inputMessageCallbackQuery#acfa1a7e id:int query_id:long = InputMessage;
inputDialogPeer#fcaafeb7 peer:InputPeer = InputDialogPeer;
inputDialogPeerFolder#64600527 folder_id:int = InputDialogPeer;
dialogPeer#e56dbf05 peer:Peer = DialogPeer;
dialogPeerFolder#514519e2 folder_id:int = DialogPeer;
messages.foundStickerSetsNotModified#d54b65d = messages.FoundStickerSets;
messages.foundStickerSets#8af09dd2 hash:long sets:Vector<StickerSetCovered> = messages.FoundStickerSets;
fileHash#f39b035c offset:long limit:int hash:bytes = FileHash;
inputClientProxy#75588b3f address:string port:int = InputClientProxy;
help.termsOfServiceUpdateEmpty#e3309f7f expires:int = help.TermsOfServiceUpdate;
help.termsOfServiceUpdate#28ecf961 expires:int terms_of_service:help.TermsOfService = help.TermsOfServiceUpdate;
inputSecureFileUploaded#3334b0f0 id:long parts:int md5_checksum:string file_hash:bytes secret:bytes = InputSecureFile;
inputSecureFile#5367e5be id:long access_hash:long = InputSecureFile;
secureFileEmpty#64199744 = SecureFile;
secureFile#7d09c27e id:long access_hash:long size:long dc_id:int date:int file_hash:bytes secret:bytes = SecureFile;
secureData#8aeabec3 data:bytes data_hash:bytes secret:bytes = SecureData;
securePlainPhone#7d6099dd phone:string = SecurePlainData;
securePlainEmail#21ec5a5f email:string = SecurePlainData;
secureValueTypePersonalDetails#9d2a81e3 = SecureValueType;
secureValueTypePassport#3dac6a00 = SecureValueType;
secureValueTypeDriverLicense#6e425c4 = SecureValueType;
secureValueTypeIdentityCard#a0d0744b = SecureValueType;
secureValueTypeInternalPassport#99a48f23 = SecureValueType;
secureValueTypeAddress#cbe31e26 = SecureValueType;
secureValueTypeUtilityBill#fc36954e = SecureValueType;
secureValueTypeBankStatement#89137c0d = SecureValueType;
secureValueTypeRentalAgreement#8b883488 = SecureValueType;
secureValueTypePassportRegistration#99e3806a = SecureValueType;
secureValueTypeTemporaryRegistration#ea02ec33 = SecureValueType;
secureValueTypePhone#b320aadb = SecureValueType;
secureValueTypeEmail#8e3ca7ee = SecureValueType;
secureValue#187fa0ca flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?SecureFile reverse_side:flags.2?SecureFile selfie:flags.3?SecureFile translation:flags.6?Vector<SecureFile> files:flags.4?Vector<SecureFile> plain_data:flags.5?SecurePlainData hash:bytes = SecureValue;
inputSecureValue#db21d0a7 flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?InputSecureFile reverse_side:flags.2?InputSecureFile selfie:flags.3?InputSecureFile translation:flags.6?Vector<InputSecureFile> files:flags.4?Vector<InputSecureFile> plain_data:flags.5?SecurePlainData = InputSecureValue;
secureValueHash#ed1ecdb0 type:SecureValueType hash:bytes = SecureValueHash;
secureValueErrorData#e8a40bd9 type:SecureValueType data_hash:bytes field:string text:string = SecureValueError;
secureValueErrorFrontSide#be3dfa type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorReverseSide#868a2aa5 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorSelfie#e537ced6 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorFile#7a700873 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorFiles#666220e9 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
secureValueError#869d758f type:SecureValueType hash:bytes text:string = SecureValueError;
secureValueErrorTranslationFile#a1144770 type:SecureValueType file_hash:bytes text:string = SecureValueError;
secureValueErrorTranslationFiles#34636dd8 type:SecureValueType file_hash:Vector<bytes> text:string = SecureValueError;
secureCredentialsEncrypted#33f0ea47 data:bytes hash:bytes secret:bytes = SecureCredentialsEncrypted;
account.authorizationForm#ad2e1cd8 flags:# required_types:Vector<SecureRequiredType> values:Vector<SecureValue> errors:Vector<SecureValueError> users:Vector<User> privacy_policy_url:flags.0?string = account.AuthorizationForm;
account.sentEmailCode#811f854f email_pattern:string length:int = account.SentEmailCode;
help.deepLinkInfoEmpty#66afa166 = help.DeepLinkInfo;
help.deepLinkInfo#6a4ee832 flags:# update_app:flags.0?true message:string entities:flags.1?Vector<MessageEntity> = help.DeepLinkInfo;
savedPhoneContact#1142bd56 phone:string first_name:string last_name:string date:int = SavedContact;
account.takeout#4dba4501 id:long = account.Takeout;
passwordKdfAlgoUnknown#d45ab096 = PasswordKdfAlgo;
passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow#3a912d4a salt1:bytes salt2:bytes g:int p:bytes = PasswordKdfAlgo;
securePasswordKdfAlgoUnknown#4a8537 = SecurePasswordKdfAlgo;
securePasswordKdfAlgoPBKDF2HMACSHA512iter100000#bbf2dda0 salt:bytes = SecurePasswordKdfAlgo;
securePasswordKdfAlgoSHA512#86471d92 salt:bytes = SecurePasswordKdfAlgo;
secureSecretSettings#1527bcac secure_algo:SecurePasswordKdfAlgo secure_secret:bytes secure_secret_id:long = SecureSecretSettings;
inputCheckPasswordEmpty#9880f658 = InputCheckPasswordSRP;
inputCheckPasswordSRP#d27ff082 srp_id:long A:bytes M1:bytes = InputCheckPasswordSRP;
secureRequiredType#829d99da flags:# native_names:flags.0?true selfie_required:flags.1?true translation_required:flags.2?true type:SecureValueType = SecureRequiredType;
secureRequiredTypeOneOf#27477b4 types:Vector<SecureRequiredType> = SecureRequiredType;
help.passportConfigNotModified#bfb9f457 = help.PassportConfig;
help.passportConfig#a098d6af hash:int countries_langs:DataJSON = help.PassportConfig;
inputAppEvent#1d1b1245 time:double type:string peer:long data:JSONValue = InputAppEvent;
jsonObjectValue#c0de1bd9 key:string value:JSONValue = JSONObjectValue;
jsonNull#3f6d7b68 = JSONValue;
jsonBool#c7345e6a value:Bool = JSONValue;
jsonNumber#2be0dfa4 value:double = JSONValue;
jsonString#b71e767a value:string = JSONValue;
jsonArray#f7444763 value:Vector<JSONValue> = JSONValue;
jsonObject#99c1d49d value:Vector<JSONObjectValue> = JSONValue;
pageTableCell#34566b6a flags:# header:flags.0?true align_center:flags.3?true align_right:flags.4?true valign_middle:flags.5?true valign_bottom:flags.6?true text:flags.7?RichText colspan:flags.1?int rowspan:flags.2?int = PageTableCell;
pageTableRow#e0c0c5e5 cells:Vector<PageTableCell> = PageTableRow;
pageCaption#6f747657 text:RichText credit:RichText = PageCaption;
pageListItemText#b92fb6cd text:RichText = PageListItem;
pageListItemBlocks#25e073fc blocks:Vector<PageBlock> = PageListItem;
pageListOrderedItemText#5e068047 num:string text:RichText = PageListOrderedItem;
pageListOrderedItemBlocks#98dd8936 num:string blocks:Vector<PageBlock> = PageListOrderedItem;
pageRelatedArticle#b390dc08 flags:# url:string webpage_id:long title:flags.0?string description:flags.1?string photo_id:flags.2?long author:flags.3?string published_date:flags.4?int = PageRelatedArticle;
page#98657f0d flags:# part:flags.0?true rtl:flags.1?true v2:flags.2?true url:string blocks:Vector<PageBlock> photos:Vector<Photo> documents:Vector<Document> views:flags.3?int = Page;
help.supportName#8c05f1c9 name:string = help.SupportName;
help.userInfoEmpty#f3ae2eed = help.UserInfo;
help.userInfo#1eb3758 message:string entities:Vector<MessageEntity> author:string date:int = help.UserInfo;
pollAnswer#ff16e2ca text:TextWithEntities option:bytes = PollAnswer;
poll#58747131 id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int = Poll;
pollAnswerVoters#3b6ddad2 flags:# chosen:flags.0?true correct:flags.1?true option:bytes voters:int = PollAnswerVoters;
pollResults#7adf2420 flags:# min:flags.0?true results:flags.1?Vector<PollAnswerVoters> total_voters:flags.2?int recent_voters:flags.3?Vector<Peer> solution:flags.4?string solution_entities:flags.4?Vector<MessageEntity> = PollResults;
chatOnlines#f041e250 onlines:int = ChatOnlines;
statsURL#47a971e0 url:string = StatsURL;
chatAdminRights#5fb224d5 flags:# change_info:flags.0?true post_messages:flags.1?true edit_messages:flags.2?true delete_messages:flags.3?true ban_users:flags.4?true invite_users:flags.5?true pin_messages:flags.7?true add_admins:flags.9?true anonymous:flags.10?true manage_call:flags.11?true other:flags.12?true manage_topics:flags.13?true post_stories:flags.14?true edit_stories:flags.15?true delete_stories:flags.16?true = ChatAdminRights;
chatBannedRights#9f120418 flags:# view_messages:flags.0?true send_messages:flags.1?true send_media:flags.2?true send_stickers:flags.3?true send_gifs:flags.4?true send_games:flags.5?true send_inline:flags.6?true embed_links:flags.7?true send_polls:flags.8?true change_info:flags.10?true invite_users:flags.15?true pin_messages:flags.17?true manage_topics:flags.18?true send_photos:flags.19?true send_videos:flags.20?true send_roundvideos:flags.21?true send_audios:flags.22?true send_voices:flags.23?true send_docs:flags.24?true send_plain:flags.25?true until_date:int = ChatBannedRights;
inputWallPaper#e630b979 id:long access_hash:long = InputWallPaper;
inputWallPaperSlug#72091c80 slug:string = InputWallPaper;
inputWallPaperNoFile#967a462e id:long = InputWallPaper;
account.wallPapersNotModified#1c199183 = account.WallPapers;
account.wallPapers#cdc3858c hash:long wallpapers:Vector<WallPaper> = account.WallPapers;
codeSettings#ad253d78 flags:# allow_flashcall:flags.0?true current_number:flags.1?true allow_app_hash:flags.4?true allow_missed_call:flags.5?true allow_firebase:flags.7?true unknown_number:flags.9?true logout_tokens:flags.6?Vector<bytes> token:flags.8?string app_sandbox:flags.8?Bool = CodeSettings;
wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;
autoDownloadSettings#baa57628 flags:# disabled:flags.0?true video_preload_large:flags.1?true audio_preload_next:flags.2?true phonecalls_less_data:flags.3?true stories_preload:flags.4?true photo_size_max:int video_size_max:long file_size_max:long video_upload_maxbitrate:int small_queue_active_operations_max:int large_queue_active_operations_max:int = AutoDownloadSettings;
account.autoDownloadSettings#63cacf26 low:AutoDownloadSettings medium:AutoDownloadSettings high:AutoDownloadSettings = account.AutoDownloadSettings;
emojiKeyword#d5b3b9f9 keyword:string emoticons:Vector<string> = EmojiKeyword;
emojiKeywordDeleted#236df622 keyword:string emoticons:Vector<string> = EmojiKeyword;
emojiKeywordsDifference#5cc761bd lang_code:string from_version:int version:int keywords:Vector<EmojiKeyword> = EmojiKeywordsDifference;
emojiURL#a575739d url:string = EmojiURL;
emojiLanguage#b3fb5361 lang_code:string = EmojiLanguage;
folder#ff544e65 flags:# autofill_new_broadcasts:flags.0?true autofill_public_groups:flags.1?true autofill_new_correspondents:flags.2?true id:int title:string photo:flags.3?ChatPhoto = Folder;
inputFolderPeer#fbd2c296 peer:InputPeer folder_id:int = InputFolderPeer;
folderPeer#e9baa668 peer:Peer folder_id:int = FolderPeer;
messages.searchCounter#e844ebff flags:# inexact:flags.1?true filter:MessagesFilter count:int = messages.SearchCounter;
urlAuthResultRequest#92d33a0e flags:# request_write_access:flags.0?true bot:User domain:string = UrlAuthResult;
urlAuthResultAccepted#8f8c0e4e url:string = UrlAuthResult;
urlAuthResultDefault#a9d6db1f = UrlAuthResult;
channelLocationEmpty#bfb5ad8b = ChannelLocation;
channelLocation#209b82db geo_point:GeoPoint address:string = ChannelLocation;
peerLocated#ca461b5d peer:Peer expires:int distance:int = PeerLocated;
peerSelfLocated#f8ec284b expires:int = PeerLocated;
restrictionReason#d072acb4 platform:string reason:string text:string = RestrictionReason;
inputTheme#3c5693e9 id:long access_hash:long = InputTheme;
inputThemeSlug#f5890df1 slug:string = InputTheme;
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;
account.themesNotModified#f41eb622 = account.Themes;
account.themes#9a3d8c6d hash:long themes:Vector<Theme> = account.Themes;
auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
auth.loginTokenMigrateTo#68e9916 dc_id:int token:bytes = auth.LoginToken;
auth.loginTokenSuccess#390d5c5e authorization:auth.Authorization = auth.LoginToken;
account.contentSettings#57e28221 flags:# sensitive_enabled:flags.0?true sensitive_can_change:flags.1?true = account.ContentSettings;
messages.inactiveChats#a927fec5 dates:Vector<int> chats:Vector<Chat> users:Vector<User> = messages.InactiveChats;
baseThemeClassic#c3a12462 = BaseTheme;
baseThemeDay#fbd81688 = BaseTheme;
baseThemeNight#b7b31ea8 = BaseTheme;
baseThemeTinted#6d5f77ee = BaseTheme;
baseThemeArctic#5b11125a = BaseTheme;
inputThemeSettings#8fde504f flags:# message_colors_animated:flags.2?true base_theme:BaseTheme accent_color:int outbox_accent_color:flags.3?int message_colors:flags.0?Vector<int> wallpaper:flags.1?InputWallPaper wallpaper_settings:flags.1?WallPaperSettings = InputThemeSettings;
themeSettings#fa58b6d4 flags:# message_colors_animated:flags.2?true base_theme:BaseTheme accent_color:int outbox_accent_color:flags.3?int message_colors:flags.0?Vector<int> wallpaper:flags.1?WallPaper = ThemeSettings;
webPageAttributeTheme#54b56617 flags:# documents:flags.0?Vector<Document> settings:flags.1?ThemeSettings = WebPageAttribute;
webPageAttributeStory#2e94c3e7 flags:# peer:Peer id:int story:flags.0?StoryItem = WebPageAttribute;
webPageAttributeStickerSet#50cc03d3 flags:# emojis:flags.0?true text_color:flags.1?true stickers:Vector<Document> = WebPageAttribute;
webPageAttributeUniqueStarGift#cf6f6db8 gift:StarGift = WebPageAttribute;
messages.votesList#4899484e flags:# count:int votes:Vector<MessagePeerVote> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.VotesList;
bankCardOpenUrl#f568028a url:string name:string = BankCardOpenUrl;
payments.bankCardData#3e24e573 title:string open_urls:Vector<BankCardOpenUrl> = payments.BankCardData;
dialogFilter#aa472651 flags:# contacts:flags.0?true non_contacts:flags.1?true groups:flags.2?true broadcasts:flags.3?true bots:flags.4?true exclude_muted:flags.11?true exclude_read:flags.12?true exclude_archived:flags.13?true title_noanimate:flags.28?true id:int title:TextWithEntities emoticon:flags.25?string color:flags.27?int pinned_peers:Vector<InputPeer> include_peers:Vector<InputPeer> exclude_peers:Vector<InputPeer> = DialogFilter;
dialogFilterDefault#363293ae = DialogFilter;
dialogFilterChatlist#96537bd7 flags:# has_my_invites:flags.26?true title_noanimate:flags.28?true id:int title:TextWithEntities emoticon:flags.25?string color:flags.27?int pinned_peers:Vector<InputPeer> include_peers:Vector<InputPeer> = DialogFilter;
dialogFilterSuggested#77744d4a filter:DialogFilter description:string = DialogFilterSuggested;
statsDateRangeDays#b637edaf min_date:int max_date:int = StatsDateRangeDays;
statsAbsValueAndPrev#cb43acde current:double previous:double = StatsAbsValueAndPrev;
statsPercentValue#cbce2fe0 part:double total:double = StatsPercentValue;
statsGraphAsync#4a27eb2d token:string = StatsGraph;
statsGraphError#bedc9822 error:string = StatsGraph;
statsGraph#8ea464b6 flags:# json:DataJSON zoom_token:flags.0?string = StatsGraph;
stats.broadcastStats#396ca5fc period:StatsDateRangeDays followers:StatsAbsValueAndPrev views_per_post:StatsAbsValueAndPrev shares_per_post:StatsAbsValueAndPrev reactions_per_post:StatsAbsValueAndPrev views_per_story:StatsAbsValueAndPrev shares_per_story:StatsAbsValueAndPrev reactions_per_story:StatsAbsValueAndPrev enabled_notifications:StatsPercentValue growth_graph:StatsGraph followers_graph:StatsGraph mute_graph:StatsGraph top_hours_graph:StatsGraph interactions_graph:StatsGraph iv_interactions_graph:StatsGraph views_by_source_graph:StatsGraph new_followers_by_source_graph:StatsGraph languages_graph:StatsGraph reactions_by_emotion_graph:StatsGraph story_interactions_graph:StatsGraph story_reactions_by_emotion_graph:StatsGraph recent_posts_interactions:Vector<PostInteractionCounters> = stats.BroadcastStats;
help.promoDataEmpty#98f6ac75 expires:int = help.PromoData;
help.promoData#8c39793f flags:# proxy:flags.0?true expires:int peer:Peer chats:Vector<Chat> users:Vector<User> psa_type:flags.1?string psa_message:flags.2?string = help.PromoData;
videoSize#de33b094 flags:# type:string w:int h:int size:int video_start_ts:flags.0?double = VideoSize;
videoSizeEmojiMarkup#f85c413c emoji_id:long background_colors:Vector<int> = VideoSize;
videoSizeStickerMarkup#da082fe stickerset:InputStickerSet sticker_id:long background_colors:Vector<int> = VideoSize;
statsGroupTopPoster#9d04af9b user_id:long messages:int avg_chars:int = StatsGroupTopPoster;
statsGroupTopAdmin#d7584c87 user_id:long deleted:int kicked:int banned:int = StatsGroupTopAdmin;
statsGroupTopInviter#535f779d user_id:long invitations:int = StatsGroupTopInviter;
stats.megagroupStats#ef7ff916 period:StatsDateRangeDays members:StatsAbsValueAndPrev messages:StatsAbsValueAndPrev viewers:StatsAbsValueAndPrev posters:StatsAbsValueAndPrev growth_graph:StatsGraph members_graph:StatsGraph new_members_by_source_graph:StatsGraph languages_graph:StatsGraph messages_graph:StatsGraph actions_graph:StatsGraph top_hours_graph:StatsGraph weekdays_graph:StatsGraph top_posters:Vector<StatsGroupTopPoster> top_admins:Vector<StatsGroupTopAdmin> top_inviters:Vector<StatsGroupTopInviter> users:Vector<User> = stats.MegagroupStats;
globalPrivacySettings#734c4ccb flags:# archive_and_mute_new_noncontact_peers:flags.0?true keep_archived_unmuted:flags.1?true keep_archived_folders:flags.2?true hide_read_marks:flags.3?true new_noncontact_peers_require_premium:flags.4?true = GlobalPrivacySettings;
help.countryCode#4203c5ef flags:# country_code:string prefixes:flags.0?Vector<string> patterns:flags.1?Vector<string> = help.CountryCode;
help.country#c3878e23 flags:# hidden:flags.0?true iso2:string default_name:string name:flags.1?string country_codes:Vector<help.CountryCode> = help.Country;
help.countriesListNotModified#93cc1f32 = help.CountriesList;
help.countriesList#87d0759e countries:Vector<help.Country> hash:int = help.CountriesList;
messageViews#455b853d flags:# views:flags.0?int forwards:flags.1?int replies:flags.2?MessageReplies = MessageViews;
messages.messageViews#b6c4f543 views:Vector<MessageViews> chats:Vector<Chat> users:Vector<User> = messages.MessageViews;
messages.discussionMessage#a6341782 flags:# messages:Vector<Message> max_id:flags.0?int read_inbox_max_id:flags.1?int read_outbox_max_id:flags.2?int unread_count:int chats:Vector<Chat> users:Vector<User> = messages.DiscussionMessage;
messageReplyHeader#afbc09db flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int = MessageReplyHeader;
messageReplyStoryHeader#e5af939 peer:Peer story_id:int = MessageReplyHeader;
messageReplies#83d60fc2 flags:# comments:flags.0?true replies:int replies_pts:int recent_repliers:flags.1?Vector<Peer> channel_id:flags.0?long max_id:flags.2?int read_max_id:flags.3?int = MessageReplies;
peerBlocked#e8fd8014 peer_id:Peer date:int = PeerBlocked;
stats.messageStats#7fe91c14 views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.MessageStats;
groupCallDiscarded#7780bcb4 id:long access_hash:long duration:int = GroupCall;
groupCall#cdf8d3e3 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int conference_from_call:flags.14?long = GroupCall;
inputGroupCall#d8aa840f id:long access_hash:long = InputGroupCall;
groupCallParticipant#eba636fe flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo = GroupCallParticipant;
phone.groupCall#9e727aad call:GroupCall participants:Vector<GroupCallParticipant> participants_next_offset:string chats:Vector<Chat> users:Vector<User> = phone.GroupCall;
phone.groupParticipants#f47751b6 count:int participants:Vector<GroupCallParticipant> next_offset:string chats:Vector<Chat> users:Vector<User> version:int = phone.GroupParticipants;
inlineQueryPeerTypeSameBotPM#3081ed9d = InlineQueryPeerType;
inlineQueryPeerTypePM#833c0fac = InlineQueryPeerType;
inlineQueryPeerTypeChat#d766c50a = InlineQueryPeerType;
inlineQueryPeerTypeMegagroup#5ec4be43 = InlineQueryPeerType;
inlineQueryPeerTypeBroadcast#6334ee9a = InlineQueryPeerType;
inlineQueryPeerTypeBotPM#e3b2d0c = InlineQueryPeerType;
messages.historyImport#1662af0b id:long = messages.HistoryImport;
messages.historyImportParsed#5e0fb7b9 flags:# pm:flags.0?true group:flags.1?true title:flags.2?string = messages.HistoryImportParsed;
messages.affectedFoundMessages#ef8d3e6c pts:int pts_count:int offset:int messages:Vector<int> = messages.AffectedFoundMessages;
chatInviteImporter#8c5adfd9 flags:# requested:flags.0?true via_chatlist:flags.3?true user_id:long date:int about:flags.2?string approved_by:flags.1?long = ChatInviteImporter;
messages.exportedChatInvites#bdc62dcc count:int invites:Vector<ExportedChatInvite> users:Vector<User> = messages.ExportedChatInvites;
messages.exportedChatInvite#1871be50 invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.exportedChatInviteReplaced#222600ef invite:ExportedChatInvite new_invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.chatInviteImporters#81b6b00a count:int importers:Vector<ChatInviteImporter> users:Vector<User> = messages.ChatInviteImporters;
chatAdminWithInvites#f2ecef23 admin_id:long invites_count:int revoked_invites_count:int = ChatAdminWithInvites;
messages.chatAdminsWithInvites#b69b72d7 admins:Vector<ChatAdminWithInvites> users:Vector<User> = messages.ChatAdminsWithInvites;
messages.checkedHistoryImportPeer#a24de717 confirm_text:string = messages.CheckedHistoryImportPeer;
phone.joinAsPeers#afe5623f peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = phone.JoinAsPeers;
phone.exportedGroupCallInvite#204bd158 link:string = phone.ExportedGroupCallInvite;
groupCallParticipantVideoSourceGroup#dcb118b7 semantics:string sources:Vector<int> = GroupCallParticipantVideoSourceGroup;
groupCallParticipantVideo#67753ac8 flags:# paused:flags.0?true endpoint:string source_groups:Vector<GroupCallParticipantVideoSourceGroup> audio_source:flags.1?int = GroupCallParticipantVideo;
stickers.suggestedShortName#85fea03f short_name:string = stickers.SuggestedShortName;
botCommandScopeDefault#2f6cb2ab = BotCommandScope;
botCommandScopeUsers#3c4f04d8 = BotCommandScope;
botCommandScopeChats#6fe1a881 = BotCommandScope;
botCommandScopeChatAdmins#b9aa606a = BotCommandScope;
botCommandScopePeer#db9d897d peer:InputPeer = BotCommandScope;
botCommandScopePeerAdmins#3fd863d1 peer:InputPeer = BotCommandScope;
botCommandScopePeerUser#a1321f3 peer:InputPeer user_id:InputUser = BotCommandScope;
account.resetPasswordFailedWait#e3779861 retry_date:int = account.ResetPasswordResult;
account.resetPasswordRequestedWait#e9effc7d until_date:int = account.ResetPasswordResult;
account.resetPasswordOk#e926d63e = account.ResetPasswordResult;
sponsoredMessage#4d93a990 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo media:flags.14?MessageMedia color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string = SponsoredMessage;
messages.sponsoredMessages#c9ee1d87 flags:# posts_between:flags.0?int messages:Vector<SponsoredMessage> chats:Vector<Chat> users:Vector<User> = messages.SponsoredMessages;
messages.sponsoredMessagesEmpty#1839490f = messages.SponsoredMessages;
searchResultsCalendarPeriod#c9b0539f date:int min_msg_id:int max_msg_id:int count:int = SearchResultsCalendarPeriod;
messages.searchResultsCalendar#147ee23c flags:# inexact:flags.0?true count:int min_date:int min_msg_id:int offset_id_offset:flags.1?int periods:Vector<SearchResultsCalendarPeriod> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SearchResultsCalendar;
searchResultPosition#7f648b67 msg_id:int date:int offset:int = SearchResultsPosition;
messages.searchResultsPositions#53b22baf count:int positions:Vector<SearchResultsPosition> = messages.SearchResultsPositions;
channels.sendAsPeers#f496b0c6 peers:Vector<SendAsPeer> chats:Vector<Chat> users:Vector<User> = channels.SendAsPeers;
users.userFull#3b6d152e full_user:UserFull chats:Vector<Chat> users:Vector<User> = users.UserFull;
messages.peerSettings#6880b94d settings:PeerSettings chats:Vector<Chat> users:Vector<User> = messages.PeerSettings;
auth.loggedOut#c3a2835f flags:# future_auth_token:flags.0?bytes = auth.LoggedOut;
reactionCount#a3d1cb80 flags:# chosen_order:flags.0?int reaction:Reaction count:int = ReactionCount;
messageReactions#a339f0b flags:# min:flags.0?true can_see_list:flags.2?true reactions_as_tags:flags.3?true results:Vector<ReactionCount> recent_reactions:flags.1?Vector<MessagePeerReaction> top_reactors:flags.4?Vector<MessageReactor> = MessageReactions;
messages.messageReactionsList#31bd492d flags:# count:int reactions:Vector<MessagePeerReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.MessageReactionsList;
availableReaction#c077ec01 flags:# inactive:flags.0?true premium:flags.2?true reaction:string title:string static_icon:Document appear_animation:Document select_animation:Document activate_animation:Document effect_animation:Document around_animation:flags.1?Document center_icon:flags.1?Document = AvailableReaction;
messages.availableReactionsNotModified#9f071957 = messages.AvailableReactions;
messages.availableReactions#768e3aad hash:int reactions:Vector<AvailableReaction> = messages.AvailableReactions;
messagePeerReaction#8c79b63c flags:# big:flags.0?true unread:flags.1?true my:flags.2?true peer_id:Peer date:int reaction:Reaction = MessagePeerReaction;
groupCallStreamChannel#80eb48af channel:int scale:int last_timestamp_ms:long = GroupCallStreamChannel;
phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;
phone.groupCallStreamRtmpUrl#2dbf3432 url:string key:string = phone.GroupCallStreamRtmpUrl;
attachMenuBotIconColor#4576f3f0 name:string color:int = AttachMenuBotIconColor;
attachMenuBotIcon#b2a7386b flags:# name:string icon:Document colors:flags.0?Vector<AttachMenuBotIconColor> = AttachMenuBotIcon;
attachMenuBot#d90d8dfe flags:# inactive:flags.0?true has_settings:flags.1?true request_write_access:flags.2?true show_in_attach_menu:flags.3?true show_in_side_menu:flags.4?true side_menu_disclaimer_needed:flags.5?true bot_id:long short_name:string peer_types:flags.3?Vector<AttachMenuPeerType> icons:Vector<AttachMenuBotIcon> = AttachMenuBot;
attachMenuBotsNotModified#f1d88a5c = AttachMenuBots;
attachMenuBots#3c4301c0 hash:long bots:Vector<AttachMenuBot> users:Vector<User> = AttachMenuBots;
attachMenuBotsBot#93bf667f bot:AttachMenuBot users:Vector<User> = AttachMenuBotsBot;
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true fullscreen:flags.2?true query_id:flags.0?long url:string = WebViewResult;
webViewMessageSent#c94511c flags:# msg_id:flags.0?InputBotInlineMessageID = WebViewMessageSent;
botMenuButtonDefault#7533a588 = BotMenuButton;
botMenuButtonCommands#4258c205 = BotMenuButton;
botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;
account.savedRingtonesNotModified#fbf6e8b1 = account.SavedRingtones;
account.savedRingtones#c1e92cc5 hash:long ringtones:Vector<Document> = account.SavedRingtones;
notificationSoundDefault#97e8bebe = NotificationSound;
notificationSoundNone#6f0c34df = NotificationSound;
notificationSoundLocal#830b9ae4 title:string data:string = NotificationSound;
notificationSoundRingtone#ff6c8049 id:long = NotificationSound;
account.savedRingtone#b7263f6d = account.SavedRingtone;
account.savedRingtoneConverted#1f307eb7 document:Document = account.SavedRingtone;
attachMenuPeerTypeSameBotPM#7d6be90e = AttachMenuPeerType;
attachMenuPeerTypeBotPM#c32bfa1a = AttachMenuPeerType;
attachMenuPeerTypePM#f146d31f = AttachMenuPeerType;
attachMenuPeerTypeChat#509113f = AttachMenuPeerType;
attachMenuPeerTypeBroadcast#7bfbdefc = AttachMenuPeerType;
inputInvoiceMessage#c5b56859 peer:InputPeer msg_id:int = InputInvoice;
inputInvoiceSlug#c326caef slug:string = InputInvoice;
inputInvoicePremiumGiftCode#98986c0d purpose:InputStorePaymentPurpose option:PremiumGiftCodeOption = InputInvoice;
inputInvoiceStars#65f00ce3 purpose:InputStorePaymentPurpose = InputInvoice;
inputInvoiceChatInviteSubscription#34e793f1 hash:string = InputInvoice;
inputInvoiceStarGift#e8625e92 flags:# hide_name:flags.0?true include_upgrade:flags.2?true peer:InputPeer gift_id:long message:flags.1?TextWithEntities = InputInvoice;
inputInvoiceStarGiftUpgrade#4d818d5d flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = InputInvoice;
inputInvoiceStarGiftTransfer#4a5f5bd9 stargift:InputSavedStarGift to_id:InputPeer = InputInvoice;
payments.exportedInvoice#aed0cbd9 url:string = payments.ExportedInvoice;
messages.transcribedAudio#cfb9d957 flags:# pending:flags.0?true transcription_id:long text:string trial_remains_num:flags.1?int trial_remains_until_date:flags.1?int = messages.TranscribedAudio;
help.premiumPromo#5334759c status_text:string status_entities:Vector<MessageEntity> video_sections:Vector<string> videos:Vector<Document> period_options:Vector<PremiumSubscriptionOption> users:Vector<User> = help.PremiumPromo;
inputStorePaymentPremiumSubscription#a6751e66 flags:# restore:flags.0?true upgrade:flags.1?true = InputStorePaymentPurpose;
inputStorePaymentGiftPremium#616f7fe8 user_id:InputUser currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentPremiumGiftCode#fb790393 flags:# users:Vector<InputUser> boost_peer:flags.0?InputPeer currency:string amount:long message:flags.1?TextWithEntities = InputStorePaymentPurpose;
inputStorePaymentPremiumGiveaway#160544ca flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStarsTopup#dddd0f56 stars:long currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStarsGift#1d741ef7 user_id:InputUser stars:long currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStarsGiveaway#751f08fa flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true stars:long boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long users:int = InputStorePaymentPurpose;
premiumGiftOption#74c34319 flags:# months:int currency:string amount:long bot_url:string store_product:flags.0?string = PremiumGiftOption;
paymentFormMethod#88f8f21b url:string title:string = PaymentFormMethod;
emojiStatusEmpty#2de11aae = EmojiStatus;
emojiStatus#e7ff068a flags:# document_id:long until:flags.0?int = EmojiStatus;
emojiStatusCollectible#7184603b flags:# collectible_id:long document_id:long title:string slug:string pattern_document_id:long center_color:int edge_color:int pattern_color:int text_color:int until:flags.0?int = EmojiStatus;
inputEmojiStatusCollectible#7141dbf flags:# collectible_id:long until:flags.0?int = EmojiStatus;
account.emojiStatusesNotModified#d08ce645 = account.EmojiStatuses;
account.emojiStatuses#90c467d1 hash:long statuses:Vector<EmojiStatus> = account.EmojiStatuses;
reactionEmpty#79f5d419 = Reaction;
reactionEmoji#1b2286b8 emoticon:string = Reaction;
reactionCustomEmoji#8935fc73 document_id:long = Reaction;
reactionPaid#523da4eb = Reaction;
chatReactionsNone#eafc32bc = ChatReactions;
chatReactionsAll#52928bca flags:# allow_custom:flags.0?true = ChatReactions;
chatReactionsSome#661d4037 reactions:Vector<Reaction> = ChatReactions;
messages.reactionsNotModified#b06fdbdf = messages.Reactions;
messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;
emailVerifyPurposeLoginSetup#4345be73 phone_number:string phone_code_hash:string = EmailVerifyPurpose;
emailVerifyPurposeLoginChange#527d22eb = EmailVerifyPurpose;
emailVerifyPurposePassport#bbf51685 = EmailVerifyPurpose;
emailVerificationCode#922e55a9 code:string = EmailVerification;
emailVerificationGoogle#db909ec2 token:string = EmailVerification;
emailVerificationApple#96d074fd token:string = EmailVerification;
account.emailVerified#2b96cd1b email:string = account.EmailVerified;
account.emailVerifiedLogin#e1bb0d61 email:string sent_code:auth.SentCode = account.EmailVerified;
premiumSubscriptionOption#5f2d1df2 flags:# current:flags.1?true can_purchase_upgrade:flags.2?true transaction:flags.3?string months:int currency:string amount:long bot_url:string store_product:flags.0?string = PremiumSubscriptionOption;
sendAsPeer#b81c7034 flags:# premium_required:flags.0?true peer:Peer = SendAsPeer;
messageExtendedMediaPreview#ad628cc8 flags:# w:flags.0?int h:flags.0?int thumb:flags.1?PhotoSize video_duration:flags.2?int = MessageExtendedMedia;
messageExtendedMedia#ee479c64 media:MessageMedia = MessageExtendedMedia;
stickerKeyword#fcfeb29c document_id:long keyword:Vector<string> = StickerKeyword;
username#b4073647 flags:# editable:flags.0?true active:flags.1?true username:string = Username;
forumTopicDeleted#23f109b id:int = ForumTopic;
forumTopic#71701da9 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true id:int date:int title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;
messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;
defaultHistoryTTL#43b46b20 period:int = DefaultHistoryTTL;
exportedContactToken#41bf109b url:string expires:int = ExportedContactToken;
requestPeerTypeUser#5f3b8a00 flags:# bot:flags.0?Bool premium:flags.1?Bool = RequestPeerType;
requestPeerTypeChat#c9f06e1b flags:# creator:flags.0?true bot_participant:flags.5?true has_username:flags.3?Bool forum:flags.4?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
requestPeerTypeBroadcast#339bef6c flags:# creator:flags.0?true has_username:flags.3?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
emojiListNotModified#481eadfa = EmojiList;
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
emojiGroup#7a9abda9 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
emojiGroupGreeting#80d26cc7 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
emojiGroupPremium#93bcf34 title:string icon_emoji_id:long = EmojiGroup;
messages.emojiGroupsNotModified#6fb4ad87 = messages.EmojiGroups;
messages.emojiGroups#881fb94b hash:int groups:Vector<EmojiGroup> = messages.EmojiGroups;
textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;
messages.translateResult#33db32f8 result:Vector<TextWithEntities> = messages.TranslatedText;
autoSaveSettings#c84834ce flags:# photos:flags.0?true videos:flags.1?true video_max_size:flags.2?long = AutoSaveSettings;
autoSaveException#81602d47 peer:Peer settings:AutoSaveSettings = AutoSaveException;
account.autoSaveSettings#4c3e069d users_settings:AutoSaveSettings chats_settings:AutoSaveSettings broadcasts_settings:AutoSaveSettings exceptions:Vector<AutoSaveException> chats:Vector<Chat> users:Vector<User> = account.AutoSaveSettings;
help.appConfigNotModified#7cde641d = help.AppConfig;
help.appConfig#dd18782e hash:int config:JSONValue = help.AppConfig;
inputBotAppID#a920bd7a id:long access_hash:long = InputBotApp;
inputBotAppShortName#908c0407 bot_id:InputUser short_name:string = InputBotApp;
botAppNotModified#5da674b7 = BotApp;
botApp#95fcd1d6 flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document hash:long = BotApp;
messages.botApp#eb50adf5 flags:# inactive:flags.0?true request_write_access:flags.1?true has_settings:flags.2?true app:BotApp = messages.BotApp;
inlineBotWebView#b57295d5 text:string url:string = InlineBotWebView;
readParticipantDate#4a4ff172 user_id:long date:int = ReadParticipantDate;
inputChatlistDialogFilter#f3e0da33 filter_id:int = InputChatlist;
exportedChatlistInvite#c5181ac flags:# title:string url:string peers:Vector<Peer> = ExportedChatlistInvite;
chatlists.exportedChatlistInvite#10e6e3a6 filter:DialogFilter invite:ExportedChatlistInvite = chatlists.ExportedChatlistInvite;
chatlists.exportedInvites#10ab6dc7 invites:Vector<ExportedChatlistInvite> chats:Vector<Chat> users:Vector<User> = chatlists.ExportedInvites;
chatlists.chatlistInviteAlready#fa87f659 filter_id:int missing_peers:Vector<Peer> already_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
chatlists.chatlistInvite#f10ece2f flags:# title_noanimate:flags.1?true title:TextWithEntities emoticon:flags.0?string peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
chatlists.chatlistUpdates#93bd878d missing_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistUpdates;
bots.botInfo#e8a775b0 name:string about:string description:string = bots.BotInfo;
messagePeerVote#b6cc2d5c peer:Peer option:bytes date:int = MessagePeerVote;
messagePeerVoteInputOption#74cda504 peer:Peer date:int = MessagePeerVote;
messagePeerVoteMultiple#4628f6e6 peer:Peer options:Vector<bytes> date:int = MessagePeerVote;
storyViews#8d595cd6 flags:# has_viewers:flags.1?true views_count:int forwards_count:flags.2?int reactions:flags.3?Vector<ReactionCount> reactions_count:flags.4?int recent_viewers:flags.0?Vector<long> = StoryViews;
storyItemDeleted#51e6ee4f id:int = StoryItem;
storyItemSkipped#ffadc913 flags:# close_friends:flags.8?true id:int date:int expire_date:int = StoryItem;
storyItem#79b26a24 flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction = StoryItem;
stories.allStoriesNotModified#1158fe3e flags:# state:string stealth_mode:StoriesStealthMode = stories.AllStories;
stories.allStories#6efc5e81 flags:# has_more:flags.0?true count:int state:string peer_stories:Vector<PeerStories> chats:Vector<Chat> users:Vector<User> stealth_mode:StoriesStealthMode = stories.AllStories;
stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;
storyView#b0bdeac5 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true user_id:long date:int reaction:flags.2?Reaction = StoryView;
storyViewPublicForward#9083670b flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true message:Message = StoryView;
storyViewPublicRepost#bd74cf49 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer story:StoryItem = StoryView;
stories.storyViewsList#59d78fc5 flags:# count:int views_count:int forwards_count:int reactions_count:int views:Vector<StoryView> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryViewsList;
stories.storyViews#de9eed1d views:Vector<StoryViews> users:Vector<User> = stories.StoryViews;
inputReplyToMessage#22c0f6d5 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int = InputReplyTo;
inputReplyToStory#5881323a peer:InputPeer story_id:int = InputReplyTo;
exportedStoryLink#3fc9053b link:string = ExportedStoryLink;
storiesStealthMode#712e27fd flags:# active_until_date:flags.0?int cooldown_until_date:flags.1?int = StoriesStealthMode;
mediaAreaCoordinates#cfc9e002 flags:# x:double y:double w:double h:double rotation:double radius:flags.0?double = MediaAreaCoordinates;
mediaAreaVenue#be82db9c coordinates:MediaAreaCoordinates geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MediaArea;
inputMediaAreaVenue#b282217f coordinates:MediaAreaCoordinates query_id:long result_id:string = MediaArea;
mediaAreaGeoPoint#cad5452d flags:# coordinates:MediaAreaCoordinates geo:GeoPoint address:flags.0?GeoPointAddress = MediaArea;
mediaAreaSuggestedReaction#14455871 flags:# dark:flags.0?true flipped:flags.1?true coordinates:MediaAreaCoordinates reaction:Reaction = MediaArea;
mediaAreaChannelPost#770416af coordinates:MediaAreaCoordinates channel_id:long msg_id:int = MediaArea;
inputMediaAreaChannelPost#2271f2bf coordinates:MediaAreaCoordinates channel:InputChannel msg_id:int = MediaArea;
mediaAreaUrl#37381085 coordinates:MediaAreaCoordinates url:string = MediaArea;
mediaAreaWeather#49a6549c coordinates:MediaAreaCoordinates emoji:string temperature_c:double color:int = MediaArea;
mediaAreaStarGift#5787686d coordinates:MediaAreaCoordinates slug:string = MediaArea;
peerStories#9a35e999 flags:# peer:Peer max_read_id:flags.0?int stories:Vector<StoryItem> = PeerStories;
stories.peerStories#cae68768 stories:PeerStories chats:Vector<Chat> users:Vector<User> = stories.PeerStories;
messages.webPage#fd5e12bd webpage:WebPage chats:Vector<Chat> users:Vector<User> = messages.WebPage;
premiumGiftCodeOption#257e962b flags:# users:int months:int store_product:flags.0?string store_quantity:flags.1?int currency:string amount:long = PremiumGiftCodeOption;
payments.checkedGiftCode#284a1096 flags:# via_giveaway:flags.2?true from_id:flags.4?Peer giveaway_msg_id:flags.3?int to_id:flags.0?long date:int months:int used_date:flags.1?int chats:Vector<Chat> users:Vector<User> = payments.CheckedGiftCode;
payments.giveawayInfo#4367daa0 flags:# participating:flags.0?true preparing_results:flags.3?true start_date:int joined_too_early_date:flags.1?int admin_disallowed_chat_id:flags.2?long disallowed_country:flags.4?string = payments.GiveawayInfo;
payments.giveawayInfoResults#e175e66f flags:# winner:flags.0?true refunded:flags.1?true start_date:int gift_code_slug:flags.3?string stars_prize:flags.4?long finish_date:int winners_count:int activated_count:flags.2?int = payments.GiveawayInfo;
prepaidGiveaway#b2539d54 id:long months:int quantity:int date:int = PrepaidGiveaway;
prepaidStarsGiveaway#9a9d77e0 id:long stars:long quantity:int boosts:int date:int = PrepaidGiveaway;
boost#4b3e14d6 flags:# gift:flags.1?true giveaway:flags.2?true unclaimed:flags.3?true id:string user_id:flags.0?long giveaway_msg_id:flags.2?int date:int expires:int used_gift_slug:flags.4?string multiplier:flags.5?int stars:flags.6?long = Boost;
premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;
myBoost#c448415c flags:# slot:int peer:flags.0?Peer date:int expires:int cooldown_until_date:flags.1?int = MyBoost;
premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;
premium.boostsStatus#4959427a flags:# my_boost:flags.2?true level:int current_level_boosts:int boosts:int gift_boosts:flags.4?int next_level_boosts:flags.0?int premium_audience:flags.1?StatsPercentValue boost_url:string prepaid_giveaways:flags.3?Vector<PrepaidGiveaway> my_boost_slots:flags.2?Vector<int> = premium.BoostsStatus;
storyFwdHeader#b826e150 flags:# modified:flags.3?true from:flags.0?Peer from_name:flags.1?string story_id:flags.2?int = StoryFwdHeader;
postInteractionCountersMessage#e7058e7f msg_id:int views:int forwards:int reactions:int = PostInteractionCounters;
postInteractionCountersStory#8a480e27 story_id:int views:int forwards:int reactions:int = PostInteractionCounters;
stats.storyStats#50cd067c views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.StoryStats;
publicForwardMessage#1f2bf4a message:Message = PublicForward;
publicForwardStory#edf3add0 peer:Peer story:StoryItem = PublicForward;
stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;
peerColor#b54b5acf flags:# color:flags.0?int background_emoji_id:flags.1?long = PeerColor;
help.peerColorSet#26219a58 colors:Vector<int> = help.PeerColorSet;
help.peerColorProfileSet#767d61eb palette_colors:Vector<int> bg_colors:Vector<int> story_colors:Vector<int> = help.PeerColorSet;
help.peerColorOption#adec6ebe flags:# hidden:flags.0?true color_id:int colors:flags.1?help.PeerColorSet dark_colors:flags.2?help.PeerColorSet channel_min_level:flags.3?int group_min_level:flags.4?int = help.PeerColorOption;
help.peerColorsNotModified#2ba1f5ce = help.PeerColors;
help.peerColors#f8ed08 hash:int colors:Vector<help.PeerColorOption> = help.PeerColors;
storyReaction#6090d6d5 peer_id:Peer date:int reaction:Reaction = StoryReaction;
storyReactionPublicForward#bbab2643 message:Message = StoryReaction;
storyReactionPublicRepost#cfcd0f13 peer_id:Peer story:StoryItem = StoryReaction;
stories.storyReactionsList#aa5f789c flags:# count:int reactions:Vector<StoryReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryReactionsList;
savedDialog#bd87cb6c flags:# pinned:flags.2?true peer:Peer top_message:int = SavedDialog;
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;
savedReactionTag#cb6ff828 flags:# reaction:Reaction title:flags.0?string count:int = SavedReactionTag;
messages.savedReactionTagsNotModified#889b59ef = messages.SavedReactionTags;
messages.savedReactionTags#3259950a tags:Vector<SavedReactionTag> hash:long = messages.SavedReactionTags;
outboxReadDate#3bb842ac date:int = OutboxReadDate;
smsjobs.eligibleToJoin#dc8b44cf terms_url:string monthly_sent_sms:int = smsjobs.EligibilityToJoin;
smsjobs.status#2aee9191 flags:# allow_international:flags.0?true recent_sent:int recent_since:int recent_remains:int total_sent:int total_since:int last_gift_slug:flags.1?string terms_url:string = smsjobs.Status;
smsJob#e6a1eeb8 job_id:string phone_number:string text:string = SmsJob;
businessWeeklyOpen#120b1ab9 start_minute:int end_minute:int = BusinessWeeklyOpen;
businessWorkHours#8c92b098 flags:# open_now:flags.0?true timezone_id:string weekly_open:Vector<BusinessWeeklyOpen> = BusinessWorkHours;
businessLocation#ac5c1af7 flags:# geo_point:flags.0?GeoPoint address:string = BusinessLocation;
inputBusinessRecipients#6f8b32aa flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<InputUser> = InputBusinessRecipients;
businessRecipients#21108ff7 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> = BusinessRecipients;
businessAwayMessageScheduleAlways#c9b9e2b9 = BusinessAwayMessageSchedule;
businessAwayMessageScheduleOutsideWorkHours#c3f2f501 = BusinessAwayMessageSchedule;
businessAwayMessageScheduleCustom#cc4d9ecc start_date:int end_date:int = BusinessAwayMessageSchedule;
inputBusinessGreetingMessage#194cb3b shortcut_id:int recipients:InputBusinessRecipients no_activity_days:int = InputBusinessGreetingMessage;
businessGreetingMessage#e519abab shortcut_id:int recipients:BusinessRecipients no_activity_days:int = BusinessGreetingMessage;
inputBusinessAwayMessage#832175e0 flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:InputBusinessRecipients = InputBusinessAwayMessage;
businessAwayMessage#ef156a5c flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:BusinessRecipients = BusinessAwayMessage;
timezone#ff9289f5 id:string name:string utc_offset:int = Timezone;
help.timezonesListNotModified#970708cc = help.TimezonesList;
help.timezonesList#7b74ed71 timezones:Vector<Timezone> hash:int = help.TimezonesList;
quickReply#697102b shortcut_id:int shortcut:string top_message:int count:int = QuickReply;
inputQuickReplyShortcut#24596d41 shortcut:string = InputQuickReplyShortcut;
inputQuickReplyShortcutId#1190cf1 shortcut_id:int = InputQuickReplyShortcut;
messages.quickReplies#c68d6695 quick_replies:Vector<QuickReply> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.QuickReplies;
messages.quickRepliesNotModified#5f91eb5b = messages.QuickReplies;
connectedBot#bd068601 flags:# can_reply:flags.0?true bot_id:long recipients:BusinessBotRecipients = ConnectedBot;
account.connectedBots#17d7f87b connected_bots:Vector<ConnectedBot> users:Vector<User> = account.ConnectedBots;
messages.dialogFilters#2ad93719 flags:# tags_enabled:flags.0?true filters:Vector<DialogFilter> = messages.DialogFilters;
birthday#6c8e1e06 flags:# day:int month:int year:flags.0?int = Birthday;
botBusinessConnection#896433b4 flags:# can_reply:flags.0?true disabled:flags.1?true connection_id:string user_id:long dc_id:int date:int = BotBusinessConnection;
inputBusinessIntro#9c469cd flags:# title:string description:string sticker:flags.0?InputDocument = InputBusinessIntro;
businessIntro#5a0a066d flags:# title:string description:string sticker:flags.0?Document = BusinessIntro;
messages.myStickers#faff629d count:int sets:Vector<StickerSetCovered> = messages.MyStickers;
inputCollectibleUsername#e39460a9 username:string = InputCollectible;
inputCollectiblePhone#a2e214a4 phone:string = InputCollectible;
fragment.collectibleInfo#6ebdff91 purchase_date:int currency:string amount:long crypto_currency:string crypto_amount:long url:string = fragment.CollectibleInfo;
inputBusinessBotRecipients#c4e5921e flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<InputUser> exclude_users:flags.6?Vector<InputUser> = InputBusinessBotRecipients;
businessBotRecipients#b88cf373 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> exclude_users:flags.6?Vector<long> = BusinessBotRecipients;
contactBirthday#1d998733 contact_id:long birthday:Birthday = ContactBirthday;
contacts.contactBirthdays#114ff30d contacts:Vector<ContactBirthday> users:Vector<User> = contacts.ContactBirthdays;
missingInvitee#628c9224 flags:# premium_would_allow_invite:flags.0?true premium_required_for_pm:flags.1?true user_id:long = MissingInvitee;
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;
inputBusinessChatLink#11679fa7 flags:# message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string = InputBusinessChatLink;
businessChatLink#b4ae666f flags:# link:string message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string views:int = BusinessChatLink;
account.businessChatLinks#ec43a2d1 links:Vector<BusinessChatLink> chats:Vector<Chat> users:Vector<User> = account.BusinessChatLinks;
account.resolvedBusinessChatLinks#9a23af21 flags:# peer:Peer message:string entities:flags.0?Vector<MessageEntity> chats:Vector<Chat> users:Vector<User> = account.ResolvedBusinessChatLinks;
requestedPeerUser#d62ff46a flags:# user_id:long first_name:flags.0?string last_name:flags.0?string username:flags.1?string photo:flags.2?Photo = RequestedPeer;
requestedPeerChat#7307544f flags:# chat_id:long title:flags.0?string photo:flags.2?Photo = RequestedPeer;
requestedPeerChannel#8ba403e4 flags:# channel_id:long title:flags.0?string username:flags.1?string photo:flags.2?Photo = RequestedPeer;
sponsoredMessageReportOption#430d3150 text:string option:bytes = SponsoredMessageReportOption;
channels.sponsoredMessageReportResultChooseOption#846f9e42 title:string options:Vector<SponsoredMessageReportOption> = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultAdsHidden#3e3bcf2f = channels.SponsoredMessageReportResult;
channels.sponsoredMessageReportResultReported#ad798849 = channels.SponsoredMessageReportResult;
stats.broadcastRevenueStats#5407e297 top_hours_graph:StatsGraph revenue_graph:StatsGraph balances:BroadcastRevenueBalances usd_rate:double = stats.BroadcastRevenueStats;
stats.broadcastRevenueWithdrawalUrl#ec659737 url:string = stats.BroadcastRevenueWithdrawalUrl;
broadcastRevenueTransactionProceeds#557e2cc4 amount:long from_date:int to_date:int = BroadcastRevenueTransaction;
broadcastRevenueTransactionWithdrawal#5a590978 flags:# pending:flags.0?true failed:flags.2?true amount:long date:int provider:string transaction_date:flags.1?int transaction_url:flags.1?string = BroadcastRevenueTransaction;
broadcastRevenueTransactionRefund#42d30d2e amount:long date:int provider:string = BroadcastRevenueTransaction;
stats.broadcastRevenueTransactions#87158466 count:int transactions:Vector<BroadcastRevenueTransaction> = stats.BroadcastRevenueTransactions;
reactionNotificationsFromContacts#bac3a61a = ReactionNotificationsFrom;
reactionNotificationsFromAll#4b9e22a0 = ReactionNotificationsFrom;
reactionsNotifySettings#56e34970 flags:# messages_notify_from:flags.0?ReactionNotificationsFrom stories_notify_from:flags.1?ReactionNotificationsFrom sound:NotificationSound show_previews:Bool = ReactionsNotifySettings;
broadcastRevenueBalances#c3ff71e7 flags:# withdrawal_enabled:flags.0?true current_balance:long available_balance:long overall_revenue:long = BroadcastRevenueBalances;
availableEffect#93c3e27e flags:# premium_required:flags.2?true id:long emoticon:string static_icon_id:flags.0?long effect_sticker_id:long effect_animation_id:flags.1?long = AvailableEffect;
messages.availableEffectsNotModified#d1ed9a5b = messages.AvailableEffects;
messages.availableEffects#bddb616e hash:int effects:Vector<AvailableEffect> documents:Vector<Document> = messages.AvailableEffects;
factCheck#b89bfccf flags:# need_check:flags.0?true country:flags.1?string text:flags.1?TextWithEntities hash:long = FactCheck;
starsTransactionPeerUnsupported#95f2bfe4 = StarsTransactionPeer;
starsTransactionPeerAppStore#b457b375 = StarsTransactionPeer;
starsTransactionPeerPlayMarket#7b560a0b = StarsTransactionPeer;
starsTransactionPeerPremiumBot#250dbaf8 = StarsTransactionPeer;
starsTransactionPeerFragment#e92fd902 = StarsTransactionPeer;
starsTransactionPeer#d80da15d peer:Peer = StarsTransactionPeer;
starsTransactionPeerAds#60682812 = StarsTransactionPeer;
starsTransactionPeerAPI#f9677aad = StarsTransactionPeer;
starsTopupOption#bd915c0 flags:# extended:flags.1?true stars:long store_product:flags.0?string currency:string amount:long = StarsTopupOption;
starsTransaction#64dfc926 flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true gift:flags.10?true reaction:flags.11?true stargift_upgrade:flags.18?true id:string stars:StarsAmount date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> subscription_period:flags.12?int giveaway_post_id:flags.13?int stargift:flags.14?StarGift floodskip_number:flags.15?int starref_commission_permille:flags.16?int starref_peer:flags.17?Peer starref_amount:flags.17?StarsAmount = StarsTransaction;
payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;
foundStory#e87acbc0 peer:Peer story:StoryItem = FoundStory;
stories.foundStories#e2de7737 flags:# count:int stories:Vector<FoundStory> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stories.FoundStories;
geoPointAddress#de4c5d93 flags:# country_iso2:string state:flags.0?string city:flags.1?string street:flags.2?string = GeoPointAddress;
starsRevenueStatus#febe5491 flags:# withdrawal_enabled:flags.0?true current_balance:StarsAmount available_balance:StarsAmount overall_revenue:StarsAmount next_withdrawal_at:flags.1?int = StarsRevenueStatus;
payments.starsRevenueStats#c92bb73b revenue_graph:StatsGraph status:StarsRevenueStatus usd_rate:double = payments.StarsRevenueStats;
payments.starsRevenueWithdrawalUrl#1dab80b7 url:string = payments.StarsRevenueWithdrawalUrl;
payments.starsRevenueAdsAccountUrl#394e7f21 url:string = payments.StarsRevenueAdsAccountUrl;
inputStarsTransaction#206ae6d1 flags:# refund:flags.0?true id:string = InputStarsTransaction;
starsGiftOption#5e0589f1 flags:# extended:flags.1?true stars:long store_product:flags.0?string currency:string amount:long = StarsGiftOption;
bots.popularAppBots#1991b13b flags:# next_offset:flags.0?string users:Vector<User> = bots.PopularAppBots;
botPreviewMedia#23e91ba3 date:int media:MessageMedia = BotPreviewMedia;
bots.previewInfo#ca71d64 media:Vector<BotPreviewMedia> lang_codes:Vector<string> = bots.PreviewInfo;
starsSubscriptionPricing#5416d58 period:int amount:long = StarsSubscriptionPricing;
starsSubscription#2e6eab1a flags:# canceled:flags.0?true can_refulfill:flags.1?true missing_balance:flags.2?true bot_canceled:flags.7?true id:string peer:Peer until_date:int pricing:StarsSubscriptionPricing chat_invite_hash:flags.3?string title:flags.4?string photo:flags.5?WebDocument invoice_slug:flags.6?string = StarsSubscription;
messageReactor#4ba3a95a flags:# top:flags.0?true my:flags.1?true anonymous:flags.2?true peer_id:flags.3?Peer count:int = MessageReactor;
starsGiveawayOption#94ce852a flags:# extended:flags.0?true default:flags.1?true stars:long yearly_boosts:int store_product:flags.2?string currency:string amount:long winners:Vector<StarsGiveawayWinnersOption> = StarsGiveawayOption;
starsGiveawayWinnersOption#54236209 flags:# default:flags.0?true users:int per_user_stars:long = StarsGiveawayWinnersOption;
starGift#2cc73c8 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long = StarGift;
starGiftUnique#f2fe7e4a flags:# id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int = StarGift;
payments.starGiftsNotModified#a388a368 = payments.StarGifts;
payments.starGifts#901689ea hash:int gifts:Vector<StarGift> = payments.StarGifts;
messageReportOption#7903e3d9 text:string option:bytes = MessageReportOption;
reportResultChooseOption#f0e4e0b6 title:string options:Vector<MessageReportOption> = ReportResult;
reportResultAddComment#6f09ac31 flags:# optional:flags.0?true option:bytes = ReportResult;
reportResultReported#8db33c4b = ReportResult;
messages.botPreparedInlineMessage#8ecf0511 id:string expire_date:int = messages.BotPreparedInlineMessage;
messages.preparedInlineMessage#ff57708d query_id:long result:BotInlineResult peer_types:Vector<InlineQueryPeerType> cache_time:int users:Vector<User> = messages.PreparedInlineMessage;
botAppSettings#c99b1950 flags:# placeholder_path:flags.0?bytes background_color:flags.1?int background_dark_color:flags.2?int header_color:flags.3?int header_dark_color:flags.4?int = BotAppSettings;
starRefProgram#dd0c66f2 flags:# bot_id:long commission_permille:int duration_months:flags.0?int end_date:flags.1?int daily_revenue_per_user:flags.2?StarsAmount = StarRefProgram;
connectedBotStarRef#19a13f71 flags:# revoked:flags.1?true url:string date:int bot_id:long commission_permille:int duration_months:flags.0?int participants:long revenue:long = ConnectedBotStarRef;
payments.connectedStarRefBots#98d5ea1d count:int connected_bots:Vector<ConnectedBotStarRef> users:Vector<User> = payments.ConnectedStarRefBots;
payments.suggestedStarRefBots#b4d5d859 flags:# count:int suggested_bots:Vector<StarRefProgram> users:Vector<User> next_offset:flags.0?string = payments.SuggestedStarRefBots;
starsAmount#bbb6b4a3 amount:long nanos:int = StarsAmount;
messages.foundStickersNotModified#6010c534 flags:# next_offset:flags.0?int = messages.FoundStickers;
messages.foundStickers#82c9e290 flags:# next_offset:flags.0?int hash:long stickers:Vector<Document> = messages.FoundStickers;
botVerifierSettings#b0cd6617 flags:# can_modify_custom_description:flags.1?true icon:long company:string custom_description:flags.0?string = BotVerifierSettings;
botVerification#f93cd45c bot_id:long icon:long description:string = BotVerification;
starGiftAttributeModel#39d99013 name:string document:Document rarity_permille:int = StarGiftAttribute;
starGiftAttributePattern#13acff19 name:string document:Document rarity_permille:int = StarGiftAttribute;
starGiftAttributeBackdrop#94271762 name:string center_color:int edge_color:int pattern_color:int text_color:int rarity_permille:int = StarGiftAttribute;
starGiftAttributeOriginalDetails#e0bff26c flags:# sender_id:flags.0?Peer recipient_id:Peer date:int message:flags.1?TextWithEntities = StarGiftAttribute;
payments.starGiftUpgradePreview#167bd90b sample_attributes:Vector<StarGiftAttribute> = payments.StarGiftUpgradePreview;
users.users#62d706b8 users:Vector<User> = users.Users;
users.usersSlice#315a4974 count:int users:Vector<User> = users.Users;
payments.uniqueStarGift#caa2f60b gift:StarGift users:Vector<User> = payments.UniqueStarGift;
messages.webPagePreview#b53e8b21 media:MessageMedia users:Vector<User> = messages.WebPagePreview;
savedStarGift#6056dba5 flags:# name_hidden:flags.0?true unsaved:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true from_id:flags.1?Peer date:int gift:StarGift message:flags.2?TextWithEntities msg_id:flags.3?int saved_id:flags.11?long convert_stars:flags.4?long upgrade_stars:flags.6?long can_export_at:flags.7?int transfer_stars:flags.8?long = SavedStarGift;
payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;
inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
payments.starGiftWithdrawalUrl#84aa3a9c url:string = payments.StarGiftWithdrawalUrl;
---functions---
invokeAfterMsg#cb9f372d {X:Type} msg_id:long query:!X = X;
invokeAfterMsgs#3dc4b4f0 {X:Type} msg_ids:Vector<long> query:!X = X;
initConnection#c1cd5ea9 {X:Type} flags:# api_id:int device_model:string system_version:string app_version:string system_lang_code:string lang_pack:string lang_code:string proxy:flags.0?InputClientProxy params:flags.1?JSONValue query:!X = X;
invokeWithLayer#da9b0d0d {X:Type} layer:int query:!X = X;
invokeWithoutUpdates#bf9459b7 {X:Type} query:!X = X;
invokeWithMessagesRange#365275f2 {X:Type} range:MessageRange query:!X = X;
invokeWithTakeout#aca9fd2e {X:Type} takeout_id:long query:!X = X;
invokeWithBusinessConnection#dd289f8e {X:Type} connection_id:string query:!X = X;
invokeWithGooglePlayIntegrity#1df92984 {X:Type} nonce:string token:string query:!X = X;
invokeWithApnsSecret#0dae54f8 {X:Type} nonce:string secret:string query:!X = X;
auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
auth.signUp#aac7b717 flags:# no_joined_notifications:flags.0?true phone_number:string phone_code_hash:string first_name:string last_name:string = auth.Authorization;
auth.signIn#8d52a951 flags:# phone_number:string phone_code_hash:string phone_code:flags.0?string email_verification:flags.1?EmailVerification = auth.Authorization;
auth.logOut#3e72ba19 = auth.LoggedOut;
auth.resetAuthorizations#9fab0d1a = Bool;
auth.exportAuthorization#e5bfffcd dc_id:int = auth.ExportedAuthorization;
auth.importAuthorization#a57a7dad id:long bytes:bytes = auth.Authorization;
auth.bindTempAuthKey#cdd42a05 perm_auth_key_id:long nonce:long expires_at:int encrypted_message:bytes = Bool;
auth.importBotAuthorization#67a3ff2c flags:int api_id:int api_hash:string bot_auth_token:string = auth.Authorization;
auth.checkPassword#d18b4d16 password:InputCheckPasswordSRP = auth.Authorization;
auth.requestPasswordRecovery#d897bc66 = auth.PasswordRecovery;
auth.recoverPassword#37096c70 flags:# code:string new_settings:flags.0?account.PasswordInputSettings = auth.Authorization;
auth.resendCode#cae47523 flags:# phone_number:string phone_code_hash:string reason:flags.0?string = auth.SentCode;
auth.cancelCode#1f040578 phone_number:string phone_code_hash:string = Bool;
auth.dropTempAuthKeys#8e48a188 except_auth_keys:Vector<long> = Bool;
auth.exportLoginToken#b7e085fe api_id:int api_hash:string except_ids:Vector<long> = auth.LoginToken;
auth.importLoginToken#95ac5ce4 token:bytes = auth.LoginToken;
auth.acceptLoginToken#e894ad4d token:bytes = Authorization;
auth.checkRecoveryPassword#d36bf79 code:string = Bool;
auth.importWebTokenAuthorization#2db873a9 api_id:int api_hash:string web_auth_token:string = auth.Authorization;
auth.requestFirebaseSms#8e39261e flags:# phone_number:string phone_code_hash:string safety_net_token:flags.0?string play_integrity_token:flags.2?string ios_push_secret:flags.1?string = Bool;
auth.resetLoginEmail#7e960193 phone_number:string phone_code_hash:string = auth.SentCode;
auth.reportMissingCode#cb9deff6 phone_number:string phone_code_hash:string mnc:string = Bool;
account.registerDevice#ec86017a flags:# no_muted:flags.0?true token_type:int token:string app_sandbox:Bool secret:bytes other_uids:Vector<long> = Bool;
account.unregisterDevice#6a0d3206 token_type:int token:string other_uids:Vector<long> = Bool;
account.updateNotifySettings#84be5b93 peer:InputNotifyPeer settings:InputPeerNotifySettings = Bool;
account.getNotifySettings#12b3ad31 peer:InputNotifyPeer = PeerNotifySettings;
account.resetNotifySettings#db7e1747 = Bool;
account.updateProfile#78515775 flags:# first_name:flags.0?string last_name:flags.1?string about:flags.2?string = User;
account.updateStatus#6628562c offline:Bool = Bool;
account.getWallPapers#7967d36 hash:long = account.WallPapers;
account.reportPeer#c5ba3d86 peer:InputPeer reason:ReportReason message:string = Bool;
account.checkUsername#2714d86c username:string = Bool;
account.updateUsername#3e0bdd7c username:string = User;
account.getPrivacy#dadbc950 key:InputPrivacyKey = account.PrivacyRules;
account.setPrivacy#c9f81ce8 key:InputPrivacyKey rules:Vector<InputPrivacyRule> = account.PrivacyRules;
account.deleteAccount#a2c0cf74 flags:# reason:string password:flags.0?InputCheckPasswordSRP = Bool;
account.getAccountTTL#8fc711d = AccountDaysTTL;
account.setAccountTTL#2442485e ttl:AccountDaysTTL = Bool;
account.sendChangePhoneCode#82574ae5 phone_number:string settings:CodeSettings = auth.SentCode;
account.changePhone#70c32edb phone_number:string phone_code_hash:string phone_code:string = User;
account.updateDeviceLocked#38df3532 period:int = Bool;
account.getAuthorizations#e320c158 = account.Authorizations;
account.resetAuthorization#df77f3bc hash:long = Bool;
account.getPassword#548a30f5 = account.Password;
account.getPasswordSettings#9cd4eaf9 password:InputCheckPasswordSRP = account.PasswordSettings;
account.updatePasswordSettings#a59b102f password:InputCheckPasswordSRP new_settings:account.PasswordInputSettings = Bool;
account.sendConfirmPhoneCode#1b3faa88 hash:string settings:CodeSettings = auth.SentCode;
account.confirmPhone#5f2178c3 phone_code_hash:string phone_code:string = Bool;
account.getTmpPassword#449e0b51 password:InputCheckPasswordSRP period:int = account.TmpPassword;
account.getWebAuthorizations#182e6d6f = account.WebAuthorizations;
account.resetWebAuthorization#2d01b9ef hash:long = Bool;
account.resetWebAuthorizations#682d2594 = Bool;
account.getAllSecureValues#b288bc7d = Vector<SecureValue>;
account.getSecureValue#73665bc2 types:Vector<SecureValueType> = Vector<SecureValue>;
account.saveSecureValue#899fe31d value:InputSecureValue secure_secret_id:long = SecureValue;
account.deleteSecureValue#b880bc4b types:Vector<SecureValueType> = Bool;
account.getAuthorizationForm#a929597a bot_id:long scope:string public_key:string = account.AuthorizationForm;
account.acceptAuthorization#f3ed4c73 bot_id:long scope:string public_key:string value_hashes:Vector<SecureValueHash> credentials:SecureCredentialsEncrypted = Bool;
account.sendVerifyPhoneCode#a5a356f9 phone_number:string settings:CodeSettings = auth.SentCode;
account.verifyPhone#4dd3a7f6 phone_number:string phone_code_hash:string phone_code:string = Bool;
account.sendVerifyEmailCode#98e037bb purpose:EmailVerifyPurpose email:string = account.SentEmailCode;
account.verifyEmail#32da4cf purpose:EmailVerifyPurpose verification:EmailVerification = account.EmailVerified;
account.initTakeoutSession#8ef3eab0 flags:# contacts:flags.0?true message_users:flags.1?true message_chats:flags.2?true message_megagroups:flags.3?true message_channels:flags.4?true files:flags.5?true file_max_size:flags.5?long = account.Takeout;
account.finishTakeoutSession#1d2652ee flags:# success:flags.0?true = Bool;
account.confirmPasswordEmail#8fdf1920 code:string = Bool;
account.resendPasswordEmail#7a7f2a15 = Bool;
account.cancelPasswordEmail#c1cbd5b6 = Bool;
account.getContactSignUpNotification#9f07c728 = Bool;
account.setContactSignUpNotification#cff43f61 silent:Bool = Bool;
account.getNotifyExceptions#53577479 flags:# compare_sound:flags.1?true compare_stories:flags.2?true peer:flags.0?InputNotifyPeer = Updates;
account.getWallPaper#fc8ddbea wallpaper:InputWallPaper = WallPaper;
account.uploadWallPaper#e39a8f03 flags:# for_chat:flags.0?true file:InputFile mime_type:string settings:WallPaperSettings = WallPaper;
account.saveWallPaper#6c5a5b37 wallpaper:InputWallPaper unsave:Bool settings:WallPaperSettings = Bool;
account.installWallPaper#feed5769 wallpaper:InputWallPaper settings:WallPaperSettings = Bool;
account.resetWallPapers#bb3b9804 = Bool;
account.getAutoDownloadSettings#56da0b3f = account.AutoDownloadSettings;
account.saveAutoDownloadSettings#76f36233 flags:# low:flags.0?true high:flags.1?true settings:AutoDownloadSettings = Bool;
account.uploadTheme#1c3db333 flags:# file:InputFile thumb:flags.0?InputFile file_name:string mime_type:string = Document;
account.createTheme#652e4400 flags:# slug:string title:string document:flags.2?InputDocument settings:flags.3?Vector<InputThemeSettings> = Theme;
account.updateTheme#2bf40ccc flags:# format:string theme:InputTheme slug:flags.0?string title:flags.1?string document:flags.2?InputDocument settings:flags.3?Vector<InputThemeSettings> = Theme;
account.saveTheme#f257106c theme:InputTheme unsave:Bool = Bool;
account.installTheme#c727bb3b flags:# dark:flags.0?true theme:flags.1?InputTheme format:flags.2?string base_theme:flags.3?BaseTheme = Bool;
account.getTheme#3a5869ec format:string theme:InputTheme = Theme;
account.getThemes#7206e458 format:string hash:long = account.Themes;
account.setContentSettings#b574b16b flags:# sensitive_enabled:flags.0?true = Bool;
account.getContentSettings#8b9b4dae = account.ContentSettings;
account.getMultiWallPapers#65ad71dc wallpapers:Vector<InputWallPaper> = Vector<WallPaper>;
account.getGlobalPrivacySettings#eb2b4cf6 = GlobalPrivacySettings;
account.setGlobalPrivacySettings#1edaaac2 settings:GlobalPrivacySettings = GlobalPrivacySettings;
account.reportProfilePhoto#fa8cc6f5 peer:InputPeer photo_id:InputPhoto reason:ReportReason message:string = Bool;
account.resetPassword#9308ce1b = account.ResetPasswordResult;
account.declinePasswordReset#4c9409f6 = Bool;
account.getChatThemes#d638de89 hash:long = account.Themes;
account.setAuthorizationTTL#bf899aa0 authorization_ttl_days:int = Bool;
account.changeAuthorizationSettings#40f48462 flags:# confirmed:flags.3?true hash:long encrypted_requests_disabled:flags.0?Bool call_requests_disabled:flags.1?Bool = Bool;
account.getSavedRingtones#e1902288 hash:long = account.SavedRingtones;
account.saveRingtone#3dea5b03 id:InputDocument unsave:Bool = account.SavedRingtone;
account.uploadRingtone#831a83a2 file:InputFile file_name:string mime_type:string = Document;
account.updateEmojiStatus#fbd3de6b emoji_status:EmojiStatus = Bool;
account.getDefaultEmojiStatuses#d6753386 hash:long = account.EmojiStatuses;
account.getRecentEmojiStatuses#f578105 hash:long = account.EmojiStatuses;
account.clearRecentEmojiStatuses#18201aae = Bool;
account.reorderUsernames#ef500eab order:Vector<string> = Bool;
account.toggleUsername#58d6b376 username:string active:Bool = Bool;
account.getDefaultProfilePhotoEmojis#e2750328 hash:long = EmojiList;
account.getDefaultGroupPhotoEmojis#915860ae hash:long = EmojiList;
account.getAutoSaveSettings#adcbbcda = account.AutoSaveSettings;
account.saveAutoSaveSettings#d69b8361 flags:# users:flags.0?true chats:flags.1?true broadcasts:flags.2?true peer:flags.3?InputPeer settings:AutoSaveSettings = Bool;
account.deleteAutoSaveExceptions#53bc0020 = Bool;
account.invalidateSignInCodes#ca8ae8ba codes:Vector<string> = Bool;
account.updateColor#7cefa15d flags:# for_profile:flags.1?true color:flags.2?int background_emoji_id:flags.0?long = Bool;
account.getDefaultBackgroundEmojis#a60ab9ce hash:long = EmojiList;
account.getChannelDefaultEmojiStatuses#7727a7d5 hash:long = account.EmojiStatuses;
account.getChannelRestrictedStatusEmojis#35a9e0d5 hash:long = EmojiList;
account.updateBusinessWorkHours#4b00e066 flags:# business_work_hours:flags.0?BusinessWorkHours = Bool;
account.updateBusinessLocation#9e6b131a flags:# geo_point:flags.1?InputGeoPoint address:flags.0?string = Bool;
account.updateBusinessGreetingMessage#66cdafc4 flags:# message:flags.0?InputBusinessGreetingMessage = Bool;
account.updateBusinessAwayMessage#a26a7fa5 flags:# message:flags.0?InputBusinessAwayMessage = Bool;
account.updateConnectedBot#43d8521d flags:# can_reply:flags.0?true deleted:flags.1?true bot:InputUser recipients:InputBusinessBotRecipients = Updates;
account.getConnectedBots#4ea4c80f = account.ConnectedBots;
account.getBotBusinessConnection#76a86270 connection_id:string = Updates;
account.updateBusinessIntro#a614d034 flags:# intro:flags.0?InputBusinessIntro = Bool;
account.toggleConnectedBotPaused#646e1097 peer:InputPeer paused:Bool = Bool;
account.disablePeerConnectedBot#5e437ed9 peer:InputPeer = Bool;
account.updateBirthday#cc6e0c11 flags:# birthday:flags.0?Birthday = Bool;
account.createBusinessChatLink#8851e68e link:InputBusinessChatLink = BusinessChatLink;
account.editBusinessChatLink#8c3410af slug:string link:InputBusinessChatLink = BusinessChatLink;
account.deleteBusinessChatLink#60073674 slug:string = Bool;
account.getBusinessChatLinks#6f70dde1 = account.BusinessChatLinks;
account.resolveBusinessChatLink#5492e5ee slug:string = account.ResolvedBusinessChatLinks;
account.updatePersonalChannel#d94305e0 channel:InputChannel = Bool;
account.toggleSponsoredMessages#b9d9a38d enabled:Bool = Bool;
account.getReactionsNotifySettings#6dd654c = ReactionsNotifySettings;
account.setReactionsNotifySettings#316ce548 settings:ReactionsNotifySettings = ReactionsNotifySettings;
account.getCollectibleEmojiStatuses#2e7b4543 hash:long = account.EmojiStatuses;
users.getUsers#d91a548 id:Vector<InputUser> = Vector<User>;
users.getFullUser#b60f5918 id:InputUser = users.UserFull;
users.setSecureValueErrors#90c894b5 id:InputUser errors:Vector<SecureValueError> = Bool;
users.getIsPremiumRequiredToContact#a622aa10 id:Vector<InputUser> = Vector<Bool>;
contacts.getContactIDs#7adc669d hash:long = Vector<int>;
contacts.getStatuses#c4a353ee = Vector<ContactStatus>;
contacts.getContacts#5dd69e12 hash:long = contacts.Contacts;
contacts.importContacts#2c800be5 contacts:Vector<InputContact> = contacts.ImportedContacts;
contacts.deleteContacts#96a0e00 id:Vector<InputUser> = Updates;
contacts.deleteByPhones#1013fd9e phones:Vector<string> = Bool;
contacts.block#2e2e8734 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
contacts.unblock#b550d328 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
contacts.getBlocked#9a868f80 flags:# my_stories_from:flags.0?true offset:int limit:int = contacts.Blocked;
contacts.search#11f812d8 q:string limit:int = contacts.Found;
contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;
contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true offset:int limit:int hash:long = contacts.TopPeers;
contacts.resetTopPeerRating#1ae373ac category:TopPeerCategory peer:InputPeer = Bool;
contacts.resetSaved#879537f1 = Bool;
contacts.getSaved#82f1e39f = Vector<SavedContact>;
contacts.toggleTopPeers#8514bdda enabled:Bool = Bool;
contacts.addContact#e8f463d0 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string = Updates;
contacts.acceptContact#f831a20f id:InputUser = Updates;
contacts.getLocated#d348bc44 flags:# background:flags.1?true geo_point:InputGeoPoint self_expires:flags.0?int = Updates;
contacts.blockFromReplies#29a8962c flags:# delete_message:flags.0?true delete_history:flags.1?true report_spam:flags.2?true msg_id:int = Updates;
contacts.resolvePhone#8af94344 phone:string = contacts.ResolvedPeer;
contacts.exportContactToken#f8654027 = ExportedContactToken;
contacts.importContactToken#13005788 token:string = User;
contacts.editCloseFriends#ba6705f0 id:Vector<long> = Bool;
contacts.setBlocked#94c65c76 flags:# my_stories_from:flags.0?true id:Vector<InputPeer> limit:int = Bool;
contacts.getBirthdays#daeda864 = contacts.ContactBirthdays;
messages.getMessages#63c66506 id:Vector<InputMessage> = messages.Messages;
messages.getDialogs#a0f4cb4f flags:# exclude_pinned:flags.0?true folder_id:flags.1?int offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.Dialogs;
messages.getHistory#4423e6c5 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.readHistory#e306d3a peer:InputPeer max_id:int = messages.AffectedMessages;
messages.deleteHistory#b08f922a flags:# just_clear:flags.0?true revoke:flags.1?true peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
messages.deleteMessages#e58e95d2 flags:# revoke:flags.0?true id:Vector<int> = messages.AffectedMessages;
messages.receivedMessages#5a954c0 max_id:int = Vector<ReceivedNotifyMessage>;
messages.setTyping#58943ee2 flags:# peer:InputPeer top_msg_id:flags.0?int action:SendMessageAction = Bool;
messages.sendMessage#983f9745 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long = Updates;
messages.sendMedia#7852834e flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long = Updates;
messages.forwardMessages#6d74da08 flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut video_timestamp:flags.20?int = Updates;
messages.reportSpam#cf1592db peer:InputPeer = Bool;
messages.getPeerSettings#efd9a6a2 peer:InputPeer = messages.PeerSettings;
messages.report#fc78af9b peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;
messages.getChats#49e9528f id:Vector<long> = messages.Chats;
messages.getFullChat#aeb00b34 chat_id:long = messages.ChatFull;
messages.editChatTitle#73783ffd chat_id:long title:string = Updates;
messages.editChatPhoto#35ddd674 chat_id:long photo:InputChatPhoto = Updates;
messages.addChatUser#cbc6d107 chat_id:long user_id:InputUser fwd_limit:int = messages.InvitedUsers;
messages.deleteChatUser#a2185cab flags:# revoke_history:flags.0?true chat_id:long user_id:InputUser = Updates;
messages.createChat#92ceddd4 flags:# users:Vector<InputUser> title:string ttl_period:flags.0?int = messages.InvitedUsers;
messages.getDhConfig#26cf8950 version:int random_length:int = messages.DhConfig;
messages.requestEncryption#f64daf43 user_id:InputUser random_id:int g_a:bytes = EncryptedChat;
messages.acceptEncryption#3dbc0415 peer:InputEncryptedChat g_b:bytes key_fingerprint:long = EncryptedChat;
messages.discardEncryption#f393aea0 flags:# delete_history:flags.0?true chat_id:int = Bool;
messages.setEncryptedTyping#791451ed peer:InputEncryptedChat typing:Bool = Bool;
messages.readEncryptedHistory#7f4b690a peer:InputEncryptedChat max_date:int = Bool;
messages.sendEncrypted#44fa7a15 flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;
messages.sendEncryptedFile#5559481d flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes file:InputEncryptedFile = messages.SentEncryptedMessage;
messages.sendEncryptedService#32d439a4 peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;
messages.receivedQueue#55a5bb66 max_qts:int = Vector<long>;
messages.reportEncryptedSpam#4b0c8c0f peer:InputEncryptedChat = Bool;
messages.readMessageContents#36a73f77 id:Vector<int> = messages.AffectedMessages;
messages.getStickers#d5a5d3a1 emoticon:string hash:long = messages.Stickers;
messages.getAllStickers#b8a0a1a8 hash:long = messages.AllStickers;
messages.getWebPagePreview#570d6f6f flags:# message:string entities:flags.3?Vector<MessageEntity> = messages.WebPagePreview;
messages.exportChatInvite#a455de90 flags:# legacy_revoke_permanent:flags.2?true request_needed:flags.3?true peer:InputPeer expire_date:flags.0?int usage_limit:flags.1?int title:flags.4?string subscription_pricing:flags.5?StarsSubscriptionPricing = ExportedChatInvite;
messages.checkChatInvite#3eadb1bb hash:string = ChatInvite;
messages.importChatInvite#6c50051c hash:string = Updates;
messages.getStickerSet#c8a0ec74 stickerset:InputStickerSet hash:int = messages.StickerSet;
messages.installStickerSet#c78fe460 stickerset:InputStickerSet archived:Bool = messages.StickerSetInstallResult;
messages.uninstallStickerSet#f96e55de stickerset:InputStickerSet = Bool;
messages.startBot#e6df7378 bot:InputUser peer:InputPeer random_id:long start_param:string = Updates;
messages.getMessagesViews#5784d3e1 peer:InputPeer id:Vector<int> increment:Bool = messages.MessageViews;
messages.editChatAdmin#a85bd1c2 chat_id:long user_id:InputUser is_admin:Bool = Bool;
messages.migrateChat#a2875319 chat_id:long = Updates;
messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;
messages.reorderStickerSets#78337739 flags:# masks:flags.0?true emojis:flags.1?true order:Vector<long> = Bool;
messages.getDocumentByHash#b1f2061f sha256:bytes size:long mime_type:string = Document;
messages.getSavedGifs#5cf09635 hash:long = messages.SavedGifs;
messages.saveGif#327a30cb id:InputDocument unsave:Bool = Bool;
messages.getInlineBotResults#514e999d flags:# bot:InputUser peer:InputPeer geo_point:flags.0?InputGeoPoint query:string offset:string = messages.BotResults;
messages.setInlineBotResults#bb12a419 flags:# gallery:flags.0?true private:flags.1?true query_id:long results:Vector<InputBotInlineResult> cache_time:int next_offset:flags.2?string switch_pm:flags.3?InlineBotSwitchPM switch_webview:flags.4?InlineBotWebView = Bool;
messages.sendInlineBotResult#3ebee86a flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut = Updates;
messages.getMessageEditData#fda68d36 peer:InputPeer id:int = messages.MessageEditData;
messages.editMessage#dfd14005 flags:# no_webpage:flags.1?true invert_media:flags.16?true peer:InputPeer id:int message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.15?int quick_reply_shortcut_id:flags.17?int = Updates;
messages.editInlineBotMessage#83557dba flags:# no_webpage:flags.1?true invert_media:flags.16?true id:InputBotInlineMessageID message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> = Bool;
messages.getBotCallbackAnswer#9342ca07 flags:# game:flags.1?true peer:InputPeer msg_id:int data:flags.0?bytes password:flags.2?InputCheckPasswordSRP = messages.BotCallbackAnswer;
messages.setBotCallbackAnswer#d58f130a flags:# alert:flags.1?true query_id:long message:flags.0?string url:flags.2?string cache_time:int = Bool;
messages.getPeerDialogs#e470bcfd peers:Vector<InputDialogPeer> = messages.PeerDialogs;
messages.saveDraft#d372c5ce flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo peer:InputPeer message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia effect:flags.7?long = Bool;
messages.getAllDrafts#6a3f8d65 = Updates;
messages.getFeaturedStickers#64780b14 hash:long = messages.FeaturedStickers;
messages.readFeaturedStickers#5b118126 id:Vector<long> = Bool;
messages.getRecentStickers#9da9403b flags:# attached:flags.0?true hash:long = messages.RecentStickers;
messages.saveRecentSticker#392718f8 flags:# attached:flags.0?true id:InputDocument unsave:Bool = Bool;
messages.clearRecentStickers#8999602d flags:# attached:flags.0?true = Bool;
messages.getArchivedStickers#57f17692 flags:# masks:flags.0?true emojis:flags.1?true offset_id:long limit:int = messages.ArchivedStickers;
messages.getMaskStickers#640f82b8 hash:long = messages.AllStickers;
messages.getAttachedStickers#cc5b67cc media:InputStickeredMedia = Vector<StickerSetCovered>;
messages.setGameScore#8ef8ecc0 flags:# edit_message:flags.0?true force:flags.1?true peer:InputPeer id:int user_id:InputUser score:int = Updates;
messages.setInlineGameScore#15ad9f64 flags:# edit_message:flags.0?true force:flags.1?true id:InputBotInlineMessageID user_id:InputUser score:int = Bool;
messages.getGameHighScores#e822649d peer:InputPeer id:int user_id:InputUser = messages.HighScores;
messages.getInlineGameHighScores#f635e1b id:InputBotInlineMessageID user_id:InputUser = messages.HighScores;
messages.getCommonChats#e40ca104 user_id:InputUser max_id:long limit:int = messages.Chats;
messages.getWebPage#8d9692a3 url:string hash:int = messages.WebPage;
messages.toggleDialogPin#a731e257 flags:# pinned:flags.0?true peer:InputDialogPeer = Bool;
messages.reorderPinnedDialogs#3b1adf37 flags:# force:flags.0?true folder_id:int order:Vector<InputDialogPeer> = Bool;
messages.getPinnedDialogs#d6b94df2 folder_id:int = messages.PeerDialogs;
messages.setBotShippingResults#e5f672fa flags:# query_id:long error:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = Bool;
messages.setBotPrecheckoutResults#9c2dd95 flags:# success:flags.1?true query_id:long error:flags.0?string = Bool;
messages.uploadMedia#14967978 flags:# business_connection_id:flags.0?string peer:InputPeer media:InputMedia = MessageMedia;
messages.sendScreenshotNotification#a1405817 peer:InputPeer reply_to:InputReplyTo random_id:long = Updates;
messages.getFavedStickers#4f1aaa9 hash:long = messages.FavedStickers;
messages.faveSticker#b9ffc55b id:InputDocument unfave:Bool = Bool;
messages.getUnreadMentions#f107e790 flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.readMentions#36e5bf4d flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.getRecentLocations#702a40e0 peer:InputPeer limit:int hash:long = messages.Messages;
messages.sendMultiMedia#37b74355 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long = Updates;
messages.uploadEncryptedFile#5057c497 peer:InputEncryptedChat file:InputEncryptedFile = EncryptedFile;
messages.searchStickerSets#35705b8a flags:# exclude_featured:flags.0?true q:string hash:long = messages.FoundStickerSets;
messages.getSplitRanges#1cff7e08 = Vector<MessageRange>;
messages.markDialogUnread#c286d98f flags:# unread:flags.0?true peer:InputDialogPeer = Bool;
messages.getDialogUnreadMarks#22e24e22 = Vector<DialogPeer>;
messages.clearAllDrafts#7e58ee9c = Bool;
messages.updatePinnedMessage#d2aaf7ec flags:# silent:flags.0?true unpin:flags.1?true pm_oneside:flags.2?true peer:InputPeer id:int = Updates;
messages.sendVote#10ea6184 peer:InputPeer msg_id:int options:Vector<bytes> = Updates;
messages.getPollResults#73bb643b peer:InputPeer msg_id:int = Updates;
messages.getOnlines#6e2be050 peer:InputPeer = ChatOnlines;
messages.editChatAbout#def60797 peer:InputPeer about:string = Bool;
messages.editChatDefaultBannedRights#a5866b41 peer:InputPeer banned_rights:ChatBannedRights = Updates;
messages.getEmojiKeywords#35a0e062 lang_code:string = EmojiKeywordsDifference;
messages.getEmojiKeywordsDifference#1508b6af lang_code:string from_version:int = EmojiKeywordsDifference;
messages.getEmojiKeywordsLanguages#4e9963b2 lang_codes:Vector<string> = Vector<EmojiLanguage>;
messages.getEmojiURL#d5b10c26 lang_code:string = EmojiURL;
messages.getSearchCounters#1bbcf300 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer top_msg_id:flags.0?int filters:Vector<MessagesFilter> = Vector<messages.SearchCounter>;
messages.requestUrlAuth#198fb446 flags:# peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string = UrlAuthResult;
messages.acceptUrlAuth#b12c7125 flags:# write_allowed:flags.0?true peer:flags.1?InputPeer msg_id:flags.1?int button_id:flags.1?int url:flags.2?string = UrlAuthResult;
messages.hidePeerSettingsBar#4facb138 peer:InputPeer = Bool;
messages.getScheduledHistory#f516760b peer:InputPeer hash:long = messages.Messages;
messages.getScheduledMessages#bdbb0464 peer:InputPeer id:Vector<int> = messages.Messages;
messages.sendScheduledMessages#bd38850a peer:InputPeer id:Vector<int> = Updates;
messages.deleteScheduledMessages#59ae2b16 peer:InputPeer id:Vector<int> = Updates;
messages.getPollVotes#b86e380e flags:# peer:InputPeer id:int option:flags.0?bytes offset:flags.1?string limit:int = messages.VotesList;
messages.toggleStickerSets#b5052fea flags:# uninstall:flags.0?true archive:flags.1?true unarchive:flags.2?true stickersets:Vector<InputStickerSet> = Bool;
messages.getDialogFilters#efd48c89 = messages.DialogFilters;
messages.getSuggestedDialogFilters#a29cd42c = Vector<DialogFilterSuggested>;
messages.updateDialogFilter#1ad4a04a flags:# id:int filter:flags.0?DialogFilter = Bool;
messages.updateDialogFiltersOrder#c563c1e4 order:Vector<int> = Bool;
messages.getOldFeaturedStickers#7ed094a1 offset:int limit:int hash:long = messages.FeaturedStickers;
messages.getReplies#22ddd30c peer:InputPeer msg_id:int offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.getDiscussionMessage#446972fd peer:InputPeer msg_id:int = messages.DiscussionMessage;
messages.readDiscussion#f731a9f4 peer:InputPeer msg_id:int read_max_id:int = Bool;
messages.unpinAllMessages#ee22b9a8 flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.deleteChat#5bd0ee50 chat_id:long = Bool;
messages.deletePhoneCallHistory#f9cbe409 flags:# revoke:flags.0?true = messages.AffectedFoundMessages;
messages.checkHistoryImport#43fe19f3 import_head:string = messages.HistoryImportParsed;
messages.initHistoryImport#34090c3b peer:InputPeer file:InputFile media_count:int = messages.HistoryImport;
messages.uploadImportedMedia#2a862092 peer:InputPeer import_id:long file_name:string media:InputMedia = MessageMedia;
messages.startHistoryImport#b43df344 peer:InputPeer import_id:long = Bool;
messages.getExportedChatInvites#a2b5a3f6 flags:# revoked:flags.3?true peer:InputPeer admin_id:InputUser offset_date:flags.2?int offset_link:flags.2?string limit:int = messages.ExportedChatInvites;
messages.getExportedChatInvite#73746f5c peer:InputPeer link:string = messages.ExportedChatInvite;
messages.editExportedChatInvite#bdca2f75 flags:# revoked:flags.2?true peer:InputPeer link:string expire_date:flags.0?int usage_limit:flags.1?int request_needed:flags.3?Bool title:flags.4?string = messages.ExportedChatInvite;
messages.deleteRevokedExportedChatInvites#56987bd5 peer:InputPeer admin_id:InputUser = Bool;
messages.deleteExportedChatInvite#d464a42b peer:InputPeer link:string = Bool;
messages.getAdminsWithInvites#3920e6ef peer:InputPeer = messages.ChatAdminsWithInvites;
messages.getChatInviteImporters#df04dd4e flags:# requested:flags.0?true subscription_expired:flags.3?true peer:InputPeer link:flags.1?string q:flags.2?string offset_date:int offset_user:InputUser limit:int = messages.ChatInviteImporters;
messages.setHistoryTTL#b80e5fe4 peer:InputPeer period:int = Updates;
messages.checkHistoryImportPeer#5dc60f03 peer:InputPeer = messages.CheckedHistoryImportPeer;
messages.setChatTheme#e63be13f peer:InputPeer emoticon:string = Updates;
messages.getMessageReadParticipants#31c1c44f peer:InputPeer msg_id:int = Vector<ReadParticipantDate>;
messages.getSearchResultsCalendar#6aa3f6bd flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int offset_date:int = messages.SearchResultsCalendar;
messages.getSearchResultsPositions#9c7f2f10 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int limit:int = messages.SearchResultsPositions;
messages.hideChatJoinRequest#7fe7e815 flags:# approved:flags.0?true peer:InputPeer user_id:InputUser = Updates;
messages.hideAllChatJoinRequests#e085f4ea flags:# approved:flags.0?true peer:InputPeer link:flags.1?string = Updates;
messages.toggleNoForwards#b11eafa2 peer:InputPeer enabled:Bool = Updates;
messages.saveDefaultSendAs#ccfddf96 peer:InputPeer send_as:InputPeer = Bool;
messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;
messages.getMessagesReactions#8bba90e6 peer:InputPeer id:Vector<int> = Updates;
messages.getMessageReactionsList#461b3f48 flags:# peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = messages.MessageReactionsList;
messages.setChatAvailableReactions#864b2581 flags:# peer:InputPeer available_reactions:ChatReactions reactions_limit:flags.0?int paid_enabled:flags.1?Bool = Updates;
messages.getAvailableReactions#18dea0ac hash:int = messages.AvailableReactions;
messages.setDefaultReaction#4f47a016 reaction:Reaction = Bool;
messages.translateText#63183030 flags:# peer:flags.0?InputPeer id:flags.0?Vector<int> text:flags.1?Vector<TextWithEntities> to_lang:string = messages.TranslatedText;
messages.getUnreadReactions#3223495b flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
messages.readReactions#54aa7f8e flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.searchSentMedia#107e31a0 q:string filter:MessagesFilter limit:int = messages.Messages;
messages.getAttachMenuBots#16fcc2cb hash:long = AttachMenuBots;
messages.getAttachMenuBot#77216192 bot:InputUser = AttachMenuBotsBot;
messages.toggleBotInAttachMenu#69f59d69 flags:# write_allowed:flags.0?true bot:InputUser enabled:Bool = Bool;
messages.requestWebView#269dc2c1 flags:# from_bot_menu:flags.4?true silent:flags.5?true compact:flags.7?true fullscreen:flags.8?true peer:InputPeer bot:InputUser url:flags.1?string start_param:flags.3?string theme_params:flags.2?DataJSON platform:string reply_to:flags.0?InputReplyTo send_as:flags.13?InputPeer = WebViewResult;
messages.prolongWebView#b0d81a83 flags:# silent:flags.5?true peer:InputPeer bot:InputUser query_id:long reply_to:flags.0?InputReplyTo send_as:flags.13?InputPeer = Bool;
messages.requestSimpleWebView#413a3e73 flags:# from_switch_webview:flags.1?true from_side_menu:flags.2?true compact:flags.7?true fullscreen:flags.8?true bot:InputUser url:flags.3?string start_param:flags.4?string theme_params:flags.0?DataJSON platform:string = WebViewResult;
messages.sendWebViewResultMessage#a4314f5 bot_query_id:string result:InputBotInlineResult = WebViewMessageSent;
messages.sendWebViewData#dc0242c8 bot:InputUser random_id:long button_text:string data:string = Updates;
messages.transcribeAudio#269e9a49 peer:InputPeer msg_id:int = messages.TranscribedAudio;
messages.rateTranscribedAudio#7f1d072f peer:InputPeer msg_id:int transcription_id:long good:Bool = Bool;
messages.getCustomEmojiDocuments#d9ab0f54 document_id:Vector<long> = Vector<Document>;
messages.getEmojiStickers#fbfca18f hash:long = messages.AllStickers;
messages.getFeaturedEmojiStickers#ecf6736 hash:long = messages.FeaturedStickers;
messages.reportReaction#3f64c076 peer:InputPeer id:int reaction_peer:InputPeer = Bool;
messages.getTopReactions#bb8125ba limit:int hash:long = messages.Reactions;
messages.getRecentReactions#39461db2 limit:int hash:long = messages.Reactions;
messages.clearRecentReactions#9dfeefb4 = Bool;
messages.getExtendedMedia#84f80814 peer:InputPeer id:Vector<int> = Updates;
messages.setDefaultHistoryTTL#9eb51445 period:int = Bool;
messages.getDefaultHistoryTTL#658b7188 = DefaultHistoryTTL;
messages.sendBotRequestedPeer#91b2d060 peer:InputPeer msg_id:int button_id:int requested_peers:Vector<InputPeer> = Updates;
messages.getEmojiGroups#7488ce5b hash:int = messages.EmojiGroups;
messages.getEmojiStatusGroups#2ecd56cd hash:int = messages.EmojiGroups;
messages.getEmojiProfilePhotoGroups#21a548f3 hash:int = messages.EmojiGroups;
messages.searchCustomEmoji#2c11c0d7 emoticon:string hash:long = EmojiList;
messages.togglePeerTranslations#e47cb579 flags:# disabled:flags.0?true peer:InputPeer = Bool;
messages.getBotApp#34fdc5c3 app:InputBotApp hash:long = messages.BotApp;
messages.requestAppWebView#53618bce flags:# write_allowed:flags.0?true compact:flags.7?true fullscreen:flags.8?true peer:InputPeer app:InputBotApp start_param:flags.1?string theme_params:flags.2?DataJSON platform:string = WebViewResult;
messages.setChatWallPaper#8ffacae1 flags:# for_both:flags.3?true revert:flags.4?true peer:InputPeer wallpaper:flags.0?InputWallPaper settings:flags.2?WallPaperSettings id:flags.1?int = Updates;
messages.searchEmojiStickerSets#92b4494c flags:# exclude_featured:flags.0?true q:string hash:long = messages.FoundStickerSets;
messages.getSavedDialogs#5381d21a flags:# exclude_pinned:flags.0?true offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.SavedDialogs;
messages.getSavedHistory#3d9a414d peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
messages.deleteSavedHistory#6e98102b flags:# peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
messages.getPinnedSavedDialogs#d63d94e0 = messages.SavedDialogs;
messages.toggleSavedDialogPin#ac81bbde flags:# pinned:flags.0?true peer:InputDialogPeer = Bool;
messages.reorderPinnedSavedDialogs#8b716587 flags:# force:flags.0?true order:Vector<InputDialogPeer> = Bool;
messages.getSavedReactionTags#3637e05b flags:# peer:flags.0?InputPeer hash:long = messages.SavedReactionTags;
messages.updateSavedReactionTag#60297dec flags:# reaction:Reaction title:flags.0?string = Bool;
messages.getDefaultTagReactions#bdf93428 hash:long = messages.Reactions;
messages.getOutboxReadDate#8c4bfe5d peer:InputPeer msg_id:int = OutboxReadDate;
messages.getQuickReplies#d483f2a8 hash:long = messages.QuickReplies;
messages.reorderQuickReplies#60331907 order:Vector<int> = Bool;
messages.checkQuickReplyShortcut#f1d0fbd3 shortcut:string = Bool;
messages.editQuickReplyShortcut#5c003cef shortcut_id:int shortcut:string = Bool;
messages.deleteQuickReplyShortcut#3cc04740 shortcut_id:int = Bool;
messages.getQuickReplyMessages#94a495c3 flags:# shortcut_id:int id:flags.0?Vector<int> hash:long = messages.Messages;
messages.sendQuickReplyMessages#6c750de1 peer:InputPeer shortcut_id:int id:Vector<int> random_id:Vector<long> = Updates;
messages.deleteQuickReplyMessages#e105e910 shortcut_id:int id:Vector<int> = Updates;
messages.toggleDialogFilterTags#fd2dda49 enabled:Bool = Bool;
messages.getMyStickers#d0b5e1fc offset_id:long limit:int = messages.MyStickers;
messages.getEmojiStickerGroups#1dd840f5 hash:int = messages.EmojiGroups;
messages.getAvailableEffects#dea20a39 hash:int = messages.AvailableEffects;
messages.editFactCheck#589ee75 peer:InputPeer msg_id:int text:TextWithEntities = Updates;
messages.deleteFactCheck#d1da940c peer:InputPeer msg_id:int = Updates;
messages.getFactCheck#b9cdc5ee peer:InputPeer msg_id:Vector<int> = Vector<FactCheck>;
messages.requestMainWebView#c9e01e7b flags:# compact:flags.7?true fullscreen:flags.8?true peer:InputPeer bot:InputUser start_param:flags.1?string theme_params:flags.0?DataJSON platform:string = WebViewResult;
messages.sendPaidReaction#9dd6a67b flags:# peer:InputPeer msg_id:int count:int random_id:long private:flags.0?Bool = Updates;
messages.togglePaidReactionPrivacy#849ad397 peer:InputPeer msg_id:int private:Bool = Bool;
messages.getPaidReactionPrivacy#472455aa = Updates;
messages.viewSponsoredMessage#673ad8f1 peer:InputPeer random_id:bytes = Bool;
messages.clickSponsoredMessage#f093465 flags:# media:flags.0?true fullscreen:flags.1?true peer:InputPeer random_id:bytes = Bool;
messages.reportSponsoredMessage#1af3dbb8 peer:InputPeer random_id:bytes option:bytes = channels.SponsoredMessageReportResult;
messages.getSponsoredMessages#9bd2f439 peer:InputPeer = messages.SponsoredMessages;
messages.savePreparedInlineMessage#f21f7f2f flags:# result:InputBotInlineResult user_id:InputUser peer_types:flags.0?Vector<InlineQueryPeerType> = messages.BotPreparedInlineMessage;
messages.getPreparedInlineMessage#857ebdb8 bot:InputUser id:string = messages.PreparedInlineMessage;
messages.searchStickers#29b1c66a flags:# emojis:flags.0?true q:string emoticon:string lang_code:Vector<string> offset:int limit:int hash:long = messages.FoundStickers;
messages.reportMessagesDelivery#5a6d7395 flags:# push:flags.0?true peer:InputPeer id:Vector<int> = Bool;
updates.getState#edd4882a = updates.State;
updates.getDifference#19c2f763 flags:# pts:int pts_limit:flags.1?int pts_total_limit:flags.0?int date:int qts:int qts_limit:flags.2?int = updates.Difference;
updates.getChannelDifference#3173d78 flags:# force:flags.0?true channel:InputChannel filter:ChannelMessagesFilter pts:int limit:int = updates.ChannelDifference;
photos.updateProfilePhoto#9e82039 flags:# fallback:flags.0?true bot:flags.1?InputUser id:InputPhoto = photos.Photo;
photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;
photos.deletePhotos#87cf7f2f id:Vector<InputPhoto> = Vector<long>;
photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;
photos.uploadContactProfilePhoto#e14c4a71 flags:# suggest:flags.3?true save:flags.4?true user_id:InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.5?VideoSize = photos.Photo;
upload.saveFilePart#b304a621 file_id:long file_part:int bytes:bytes = Bool;
upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;
upload.saveBigFilePart#de7b673d file_id:long file_part:int file_total_parts:int bytes:bytes = Bool;
upload.getWebFile#24e6818d location:InputWebFileLocation offset:int limit:int = upload.WebFile;
upload.getCdnFile#395f69da file_token:bytes offset:long limit:int = upload.CdnFile;
upload.reuploadCdnFile#9b2754a8 file_token:bytes request_token:bytes = Vector<FileHash>;
upload.getCdnFileHashes#91dc3f31 file_token:bytes offset:long = Vector<FileHash>;
upload.getFileHashes#9156982a location:InputFileLocation offset:long = Vector<FileHash>;
help.getConfig#c4f9186b = Config;
help.getNearestDc#1fb33026 = NearestDc;
help.getAppUpdate#522d5a7d source:string = help.AppUpdate;
help.getInviteText#4d392343 = help.InviteText;
help.getSupport#9cdf08cd = help.Support;
help.setBotUpdatesStatus#ec22cfcd pending_updates_count:int message:string = Bool;
help.getCdnConfig#52029342 = CdnConfig;
help.getRecentMeUrls#3dc0f114 referer:string = help.RecentMeUrls;
help.getTermsOfServiceUpdate#2ca51fd1 = help.TermsOfServiceUpdate;
help.acceptTermsOfService#ee72f79a id:DataJSON = Bool;
help.getDeepLinkInfo#3fedc75f path:string = help.DeepLinkInfo;
help.getAppConfig#61e3f854 hash:int = help.AppConfig;
help.saveAppLog#6f02f748 events:Vector<InputAppEvent> = Bool;
help.getPassportConfig#c661ad08 hash:int = help.PassportConfig;
help.getSupportName#d360e72c = help.SupportName;
help.getUserInfo#38a08d3 user_id:InputUser = help.UserInfo;
help.editUserInfo#66b91b70 user_id:InputUser message:string entities:Vector<MessageEntity> = help.UserInfo;
help.getPromoData#c0977421 = help.PromoData;
help.hidePromoData#1e251c95 peer:InputPeer = Bool;
help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;
help.getCountriesList#735787a8 lang_code:string hash:int = help.CountriesList;
help.getPremiumPromo#b81b93d4 = help.PremiumPromo;
help.getPeerColors#da80f42f hash:int = help.PeerColors;
help.getPeerProfileColors#abcfa9fd hash:int = help.PeerColors;
help.getTimezonesList#49b30240 hash:int = help.TimezonesList;
channels.readHistory#cc104937 channel:InputChannel max_id:int = Bool;
channels.deleteMessages#84c1fd4e channel:InputChannel id:Vector<int> = messages.AffectedMessages;
channels.reportSpam#f44a8315 channel:InputChannel participant:InputPeer id:Vector<int> = Bool;
channels.getMessages#ad8c9a23 channel:InputChannel id:Vector<InputMessage> = messages.Messages;
channels.getParticipants#77ced9d0 channel:InputChannel filter:ChannelParticipantsFilter offset:int limit:int hash:long = channels.ChannelParticipants;
channels.getParticipant#a0ab6cc6 channel:InputChannel participant:InputPeer = channels.ChannelParticipant;
channels.getChannels#a7f6bbb id:Vector<InputChannel> = messages.Chats;
channels.getFullChannel#8736a09 channel:InputChannel = messages.ChatFull;
channels.createChannel#91006707 flags:# broadcast:flags.0?true megagroup:flags.1?true for_import:flags.3?true forum:flags.5?true title:string about:string geo_point:flags.2?InputGeoPoint address:flags.2?string ttl_period:flags.4?int = Updates;
channels.editAdmin#d33c8902 channel:InputChannel user_id:InputUser admin_rights:ChatAdminRights rank:string = Updates;
channels.editTitle#566decd0 channel:InputChannel title:string = Updates;
channels.editPhoto#f12e57c9 channel:InputChannel photo:InputChatPhoto = Updates;
channels.checkUsername#10e6bd2c channel:InputChannel username:string = Bool;
channels.updateUsername#3514b3de channel:InputChannel username:string = Bool;
channels.joinChannel#24b524c5 channel:InputChannel = Updates;
channels.leaveChannel#f836aa95 channel:InputChannel = Updates;
channels.inviteToChannel#c9e33d54 channel:InputChannel users:Vector<InputUser> = messages.InvitedUsers;
channels.deleteChannel#c0111fe3 channel:InputChannel = Updates;
channels.exportMessageLink#e63fadeb flags:# grouped:flags.0?true thread:flags.1?true channel:InputChannel id:int = ExportedMessageLink;
channels.toggleSignatures#418d549c flags:# signatures_enabled:flags.0?true profiles_enabled:flags.1?true channel:InputChannel = Updates;
channels.getAdminedPublicChannels#f8b036af flags:# by_location:flags.0?true check_limit:flags.1?true for_personal:flags.2?true = messages.Chats;
channels.editBanned#96e6cd81 channel:InputChannel participant:InputPeer banned_rights:ChatBannedRights = Updates;
channels.getAdminLog#33ddf480 flags:# channel:InputChannel q:string events_filter:flags.0?ChannelAdminLogEventsFilter admins:flags.1?Vector<InputUser> max_id:long min_id:long limit:int = channels.AdminLogResults;
channels.setStickers#ea8ca4f9 channel:InputChannel stickerset:InputStickerSet = Bool;
channels.readMessageContents#eab5dc38 channel:InputChannel id:Vector<int> = Bool;
channels.deleteHistory#9baa9647 flags:# for_everyone:flags.0?true channel:InputChannel max_id:int = Updates;
channels.togglePreHistoryHidden#eabbb94c channel:InputChannel enabled:Bool = Updates;
channels.getLeftChannels#8341ecc0 offset:int = messages.Chats;
channels.getGroupsForDiscussion#f5dad378 = messages.Chats;
channels.setDiscussionGroup#40582bb2 broadcast:InputChannel group:InputChannel = Bool;
channels.editCreator#8f38cd1f channel:InputChannel user_id:InputUser password:InputCheckPasswordSRP = Updates;
channels.editLocation#58e63f6d channel:InputChannel geo_point:InputGeoPoint address:string = Bool;
channels.toggleSlowMode#edd49ef0 channel:InputChannel seconds:int = Updates;
channels.getInactiveChannels#11e831ee = messages.InactiveChats;
channels.convertToGigagroup#b290c69 channel:InputChannel = Updates;
channels.getSendAs#dc770ee peer:InputPeer = channels.SendAsPeers;
channels.deleteParticipantHistory#367544db channel:InputChannel participant:InputPeer = messages.AffectedHistory;
channels.toggleJoinToSend#e4cb9580 channel:InputChannel enabled:Bool = Updates;
channels.toggleJoinRequest#4c2985b6 channel:InputChannel enabled:Bool = Updates;
channels.reorderUsernames#b45ced1d channel:InputChannel order:Vector<string> = Bool;
channels.toggleUsername#50f24105 channel:InputChannel username:string active:Bool = Bool;
channels.deactivateAllUsernames#a245dd3 channel:InputChannel = Bool;
channels.toggleForum#a4298b29 channel:InputChannel enabled:Bool = Updates;
channels.createForumTopic#f40c0224 flags:# channel:InputChannel title:string icon_color:flags.0?int icon_emoji_id:flags.3?long random_id:long send_as:flags.2?InputPeer = Updates;
channels.getForumTopics#de560d1 flags:# channel:InputChannel q:flags.0?string offset_date:int offset_id:int offset_topic:int limit:int = messages.ForumTopics;
channels.getForumTopicsByID#b0831eb9 channel:InputChannel topics:Vector<int> = messages.ForumTopics;
channels.editForumTopic#f4dfa185 flags:# channel:InputChannel topic_id:int title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = Updates;
channels.updatePinnedForumTopic#6c2d9026 channel:InputChannel topic_id:int pinned:Bool = Updates;
channels.deleteTopicHistory#34435f2d channel:InputChannel top_msg_id:int = messages.AffectedHistory;
channels.reorderPinnedForumTopics#2950a18f flags:# force:flags.0?true channel:InputChannel order:Vector<int> = Updates;
channels.toggleAntiSpam#68f3e4eb channel:InputChannel enabled:Bool = Updates;
channels.reportAntiSpamFalsePositive#a850a693 channel:InputChannel msg_id:int = Bool;
channels.toggleParticipantsHidden#6a6e7854 channel:InputChannel enabled:Bool = Updates;
channels.updateColor#d8aa3671 flags:# for_profile:flags.1?true channel:InputChannel color:flags.2?int background_emoji_id:flags.0?long = Updates;
channels.toggleViewForumAsMessages#9738bb15 channel:InputChannel enabled:Bool = Updates;
channels.getChannelRecommendations#25a71742 flags:# channel:flags.0?InputChannel = messages.Chats;
channels.updateEmojiStatus#f0d3e6a8 channel:InputChannel emoji_status:EmojiStatus = Updates;
channels.setBoostsToUnblockRestrictions#ad399cee channel:InputChannel boosts:int = Updates;
channels.setEmojiStickers#3cd930b7 channel:InputChannel stickerset:InputStickerSet = Bool;
channels.restrictSponsoredMessages#9ae91519 channel:InputChannel restricted:Bool = Updates;
channels.searchPosts#d19f987b hashtag:string offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;
bots.sendCustomRequest#aa2769ed custom_method:string params:DataJSON = DataJSON;
bots.answerWebhookJSONQuery#e6213f4d query_id:long data:DataJSON = Bool;
bots.setBotCommands#517165a scope:BotCommandScope lang_code:string commands:Vector<BotCommand> = Bool;
bots.resetBotCommands#3d8de0f9 scope:BotCommandScope lang_code:string = Bool;
bots.getBotCommands#e34c0dd6 scope:BotCommandScope lang_code:string = Vector<BotCommand>;
bots.setBotMenuButton#4504d54f user_id:InputUser button:BotMenuButton = Bool;
bots.getBotMenuButton#9c60eb28 user_id:InputUser = BotMenuButton;
bots.setBotBroadcastDefaultAdminRights#788464e1 admin_rights:ChatAdminRights = Bool;
bots.setBotGroupDefaultAdminRights#925ec9ea admin_rights:ChatAdminRights = Bool;
bots.setBotInfo#10cf3123 flags:# bot:flags.2?InputUser lang_code:string name:flags.3?string about:flags.0?string description:flags.1?string = Bool;
bots.getBotInfo#dcd914fd flags:# bot:flags.0?InputUser lang_code:string = bots.BotInfo;
bots.reorderUsernames#9709b1c2 bot:InputUser order:Vector<string> = Bool;
bots.toggleUsername#53ca973 bot:InputUser username:string active:Bool = Bool;
bots.canSendMessage#1359f4e6 bot:InputUser = Bool;
bots.allowSendMessage#f132e3ef bot:InputUser = Updates;
bots.invokeWebViewCustomMethod#87fc5e7 bot:InputUser custom_method:string params:DataJSON = DataJSON;
bots.getPopularAppBots#c2510192 offset:string limit:int = bots.PopularAppBots;
bots.addPreviewMedia#17aeb75a bot:InputUser lang_code:string media:InputMedia = BotPreviewMedia;
bots.editPreviewMedia#8525606f bot:InputUser lang_code:string media:InputMedia new_media:InputMedia = BotPreviewMedia;
bots.deletePreviewMedia#2d0135b3 bot:InputUser lang_code:string media:Vector<InputMedia> = Bool;
bots.reorderPreviewMedias#b627f3aa bot:InputUser lang_code:string order:Vector<InputMedia> = Bool;
bots.getPreviewInfo#423ab3ad bot:InputUser lang_code:string = bots.PreviewInfo;
bots.getPreviewMedias#a2a5594d bot:InputUser = Vector<BotPreviewMedia>;
bots.updateUserEmojiStatus#ed9f30c5 user_id:InputUser emoji_status:EmojiStatus = Bool;
bots.toggleUserEmojiStatusPermission#6de6392 bot:InputUser enabled:Bool = Bool;
bots.checkDownloadFileParams#50077589 bot:InputUser file_name:string url:string = Bool;
bots.getAdminedBots#b0711d83 = Vector<User>;
bots.updateStarRefProgram#778b5ab3 flags:# bot:InputUser commission_permille:int duration_months:flags.0?int = StarRefProgram;
bots.setCustomVerification#8b89dfbd flags:# enabled:flags.1?true bot:flags.0?InputUser peer:InputPeer custom_description:flags.2?string = Bool;
bots.getBotRecommendations#a1b70815 bot:InputUser = users.Users;
payments.getPaymentForm#37148dbb flags:# invoice:InputInvoice theme_params:flags.0?DataJSON = payments.PaymentForm;
payments.getPaymentReceipt#2478d1cc peer:InputPeer msg_id:int = payments.PaymentReceipt;
payments.validateRequestedInfo#b6c8f12b flags:# save:flags.0?true invoice:InputInvoice info:PaymentRequestedInfo = payments.ValidatedRequestedInfo;
payments.sendPaymentForm#2d03522f flags:# form_id:long invoice:InputInvoice requested_info_id:flags.0?string shipping_option_id:flags.1?string credentials:InputPaymentCredentials tip_amount:flags.2?long = payments.PaymentResult;
payments.getSavedInfo#227d824b = payments.SavedInfo;
payments.clearSavedInfo#d83d70c1 flags:# credentials:flags.0?true info:flags.1?true = Bool;
payments.getBankCardData#2e79d779 number:string = payments.BankCardData;
payments.exportInvoice#f91b065 invoice_media:InputMedia = payments.ExportedInvoice;
payments.assignAppStoreTransaction#80ed747d receipt:bytes purpose:InputStorePaymentPurpose = Updates;
payments.assignPlayMarketTransaction#dffd50d3 receipt:DataJSON purpose:InputStorePaymentPurpose = Updates;
payments.canPurchasePremium#9fc19eb6 purpose:InputStorePaymentPurpose = Bool;
payments.getPremiumGiftCodeOptions#2757ba54 flags:# boost_peer:flags.0?InputPeer = Vector<PremiumGiftCodeOption>;
payments.checkGiftCode#8e51b4c1 slug:string = payments.CheckedGiftCode;
payments.applyGiftCode#f6e26854 slug:string = Updates;
payments.getGiveawayInfo#f4239425 peer:InputPeer msg_id:int = payments.GiveawayInfo;
payments.launchPrepaidGiveaway#5ff58f20 peer:InputPeer giveaway_id:long purpose:InputStorePaymentPurpose = Updates;
payments.getStarsTopupOptions#c00ec7d3 = Vector<StarsTopupOption>;
payments.getStarsStatus#104fcfa7 peer:InputPeer = payments.StarsStatus;
payments.getStarsTransactions#69da4557 flags:# inbound:flags.0?true outbound:flags.1?true ascending:flags.2?true subscription_id:flags.3?string peer:InputPeer offset:string limit:int = payments.StarsStatus;
payments.sendStarsForm#7998c914 form_id:long invoice:InputInvoice = payments.PaymentResult;
payments.refundStarsCharge#25ae8f4a user_id:InputUser charge_id:string = Updates;
payments.getStarsRevenueStats#d91ffad6 flags:# dark:flags.0?true peer:InputPeer = payments.StarsRevenueStats;
payments.getStarsRevenueWithdrawalUrl#13bbe8b3 peer:InputPeer stars:long password:InputCheckPasswordSRP = payments.StarsRevenueWithdrawalUrl;
payments.getStarsRevenueAdsAccountUrl#d1d7efc5 peer:InputPeer = payments.StarsRevenueAdsAccountUrl;
payments.getStarsTransactionsByID#27842d2e peer:InputPeer id:Vector<InputStarsTransaction> = payments.StarsStatus;
payments.getStarsGiftOptions#d3c96bc8 flags:# user_id:flags.0?InputUser = Vector<StarsGiftOption>;
payments.getStarsSubscriptions#32512c5 flags:# missing_balance:flags.0?true peer:InputPeer offset:string = payments.StarsStatus;
payments.changeStarsSubscription#c7770878 flags:# peer:InputPeer subscription_id:string canceled:flags.0?Bool = Bool;
payments.fulfillStarsSubscription#cc5bebb3 peer:InputPeer subscription_id:string = Bool;
payments.getStarsGiveawayOptions#bd1efd3e = Vector<StarsGiveawayOption>;
payments.getStarGifts#c4563590 hash:int = payments.StarGifts;
payments.saveStarGift#2a2a697c flags:# unsave:flags.0?true stargift:InputSavedStarGift = Bool;
payments.convertStarGift#74bf076b stargift:InputSavedStarGift = Bool;
payments.botCancelStarsSubscription#6dfa0622 flags:# restore:flags.0?true user_id:InputUser charge_id:string = Bool;
payments.getConnectedStarRefBots#5869a553 flags:# peer:InputPeer offset_date:flags.2?int offset_link:flags.2?string limit:int = payments.ConnectedStarRefBots;
payments.getConnectedStarRefBot#b7d998f0 peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;
payments.getSuggestedStarRefBots#d6b48f7 flags:# order_by_revenue:flags.0?true order_by_date:flags.1?true peer:InputPeer offset:string limit:int = payments.SuggestedStarRefBots;
payments.connectStarRefBot#7ed5348a peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;
payments.editConnectedStarRefBot#e4fca4a3 flags:# revoked:flags.0?true peer:InputPeer link:string = payments.ConnectedStarRefBots;
payments.getStarGiftUpgradePreview#9c9abcb1 gift_id:long = payments.StarGiftUpgradePreview;
payments.upgradeStarGift#aed6e4f5 flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = Updates;
payments.transferStarGift#7f18176a stargift:InputSavedStarGift to_id:InputPeer = Updates;
payments.getUniqueStarGift#a1974d72 slug:string = payments.UniqueStarGift;
payments.getSavedStarGifts#23830de9 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_limited:flags.3?true exclude_unique:flags.4?true sort_by_value:flags.5?true peer:InputPeer offset:string limit:int = payments.SavedStarGifts;
payments.getSavedStarGift#b455a106 stargift:Vector<InputSavedStarGift> = payments.SavedStarGifts;
payments.getStarGiftWithdrawalUrl#d06e93a8 stargift:InputSavedStarGift password:InputCheckPasswordSRP = payments.StarGiftWithdrawalUrl;
payments.toggleChatStarGiftNotifications#60eaefa1 flags:# enabled:flags.0?true peer:InputPeer = Bool;
stickers.createStickerSet#9021ab67 flags:# masks:flags.0?true emojis:flags.5?true text_color:flags.6?true user_id:InputUser title:string short_name:string thumb:flags.2?InputDocument stickers:Vector<InputStickerSetItem> software:flags.3?string = messages.StickerSet;
stickers.removeStickerFromSet#f7760f51 sticker:InputDocument = messages.StickerSet;
stickers.changeStickerPosition#ffb6d4ca sticker:InputDocument position:int = messages.StickerSet;
stickers.addStickerToSet#8653febe stickerset:InputStickerSet sticker:InputStickerSetItem = messages.StickerSet;
stickers.setStickerSetThumb#a76a5392 flags:# stickerset:InputStickerSet thumb:flags.0?InputDocument thumb_document_id:flags.1?long = messages.StickerSet;
stickers.checkShortName#284b3639 short_name:string = Bool;
stickers.suggestShortName#4dafc503 title:string = stickers.SuggestedShortName;
stickers.changeSticker#f5537ebc flags:# sticker:InputDocument emoji:flags.0?string mask_coords:flags.1?MaskCoords keywords:flags.2?string = messages.StickerSet;
stickers.renameStickerSet#124b1c00 stickerset:InputStickerSet title:string = messages.StickerSet;
stickers.deleteStickerSet#87704394 stickerset:InputStickerSet = Bool;
stickers.replaceSticker#4696459a sticker:InputDocument new_sticker:InputStickerSetItem = messages.StickerSet;
phone.getCallConfig#55451fa9 = DataJSON;
phone.requestCall#a6c4600c flags:# video:flags.0?true user_id:InputUser conference_call:flags.1?InputGroupCall random_id:int g_a_hash:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.acceptCall#3bd2b4a0 peer:InputPhoneCall g_b:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.confirmCall#2efe1722 peer:InputPhoneCall g_a:bytes key_fingerprint:long protocol:PhoneCallProtocol = phone.PhoneCall;
phone.receivedCall#17d54f61 peer:InputPhoneCall = Bool;
phone.discardCall#b2cbc1c0 flags:# video:flags.0?true peer:InputPhoneCall duration:int reason:PhoneCallDiscardReason connection_id:long = Updates;
phone.setCallRating#59ead627 flags:# user_initiative:flags.0?true peer:InputPhoneCall rating:int comment:string = Updates;
phone.saveCallDebug#277add7e peer:InputPhoneCall debug:DataJSON = Bool;
phone.sendSignalingData#ff7a9383 peer:InputPhoneCall data:bytes = Bool;
phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
phone.joinGroupCall#d61e1df3 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string key_fingerprint:flags.3?long params:DataJSON = Updates;
phone.leaveGroupCall#500377f9 call:InputGroupCall source:int = Updates;
phone.inviteToGroupCall#7b393160 call:InputGroupCall users:Vector<InputUser> = Updates;
phone.discardGroupCall#7a777135 call:InputGroupCall = Updates;
phone.toggleGroupCallSettings#74bbb43d flags:# reset_invite_hash:flags.1?true call:InputGroupCall join_muted:flags.0?Bool = Updates;
phone.getGroupCall#41845db call:InputGroupCall limit:int = phone.GroupCall;
phone.getGroupParticipants#c558d8ab call:InputGroupCall ids:Vector<InputPeer> sources:Vector<int> offset:string limit:int = phone.GroupParticipants;
phone.checkGroupCall#b59cf977 call:InputGroupCall sources:Vector<int> = Vector<int>;
phone.toggleGroupCallRecord#f128c708 flags:# start:flags.0?true video:flags.2?true call:InputGroupCall title:flags.1?string video_portrait:flags.2?Bool = Updates;
phone.editGroupCallParticipant#a5273abf flags:# call:InputGroupCall participant:InputPeer muted:flags.0?Bool volume:flags.1?int raise_hand:flags.2?Bool video_stopped:flags.3?Bool video_paused:flags.4?Bool presentation_paused:flags.5?Bool = Updates;
phone.editGroupCallTitle#1ca6ac0a call:InputGroupCall title:string = Updates;
phone.getGroupCallJoinAs#ef7c213a peer:InputPeer = phone.JoinAsPeers;
phone.exportGroupCallInvite#e6aa647f flags:# can_self_unmute:flags.0?true call:InputGroupCall = phone.ExportedGroupCallInvite;
phone.toggleGroupCallStartSubscription#219c34e6 call:InputGroupCall subscribed:Bool = Updates;
phone.startScheduledGroupCall#5680e342 call:InputGroupCall = Updates;
phone.saveDefaultGroupCallJoinAs#575e1f8c peer:InputPeer join_as:InputPeer = Bool;
phone.joinGroupCallPresentation#cbea6bc4 call:InputGroupCall params:DataJSON = Updates;
phone.leaveGroupCallPresentation#1c50d144 call:InputGroupCall = Updates;
phone.getGroupCallStreamChannels#1ab21940 call:InputGroupCall = phone.GroupCallStreamChannels;
phone.getGroupCallStreamRtmpUrl#deb3abbf peer:InputPeer revoke:Bool = phone.GroupCallStreamRtmpUrl;
phone.saveCallLog#41248786 peer:InputPhoneCall file:InputFile = Bool;
phone.createConferenceCall#dfc909ab peer:InputPhoneCall key_fingerprint:long = phone.PhoneCall;
langpack.getLangPack#f2f2330a lang_pack:string lang_code:string = LangPackDifference;
langpack.getStrings#efea3803 lang_pack:string lang_code:string keys:Vector<string> = Vector<LangPackString>;
langpack.getDifference#cd984aa5 lang_pack:string lang_code:string from_version:int = LangPackDifference;
langpack.getLanguages#42c6978f lang_pack:string = Vector<LangPackLanguage>;
langpack.getLanguage#6a596502 lang_pack:string lang_code:string = LangPackLanguage;
folders.editPeerFolders#6847d0ab folder_peers:Vector<InputFolderPeer> = Updates;
stats.getBroadcastStats#ab42441a flags:# dark:flags.0?true channel:InputChannel = stats.BroadcastStats;
stats.loadAsyncGraph#621d5fa0 flags:# token:string x:flags.0?long = StatsGraph;
stats.getMegagroupStats#dcdf8607 flags:# dark:flags.0?true channel:InputChannel = stats.MegagroupStats;
stats.getMessagePublicForwards#5f150144 channel:InputChannel msg_id:int offset:string limit:int = stats.PublicForwards;
stats.getMessageStats#b6e0a3f5 flags:# dark:flags.0?true channel:InputChannel msg_id:int = stats.MessageStats;
stats.getStoryStats#374fef40 flags:# dark:flags.0?true peer:InputPeer id:int = stats.StoryStats;
stats.getStoryPublicForwards#a6437ef6 peer:InputPeer id:int offset:string limit:int = stats.PublicForwards;
stats.getBroadcastRevenueStats#f788ee19 flags:# dark:flags.0?true peer:InputPeer = stats.BroadcastRevenueStats;
stats.getBroadcastRevenueWithdrawalUrl#9df4faad peer:InputPeer password:InputCheckPasswordSRP = stats.BroadcastRevenueWithdrawalUrl;
stats.getBroadcastRevenueTransactions#70990b6d peer:InputPeer offset:int limit:int = stats.BroadcastRevenueTransactions;
chatlists.exportChatlistInvite#8472478e chatlist:InputChatlist title:string peers:Vector<InputPeer> = chatlists.ExportedChatlistInvite;
chatlists.deleteExportedInvite#719c5c5e chatlist:InputChatlist slug:string = Bool;
chatlists.editExportedInvite#653db63d flags:# chatlist:InputChatlist slug:string title:flags.1?string peers:flags.2?Vector<InputPeer> = ExportedChatlistInvite;
chatlists.getExportedInvites#ce03da83 chatlist:InputChatlist = chatlists.ExportedInvites;
chatlists.checkChatlistInvite#41c10fff slug:string = chatlists.ChatlistInvite;
chatlists.joinChatlistInvite#a6b1e39a slug:string peers:Vector<InputPeer> = Updates;
chatlists.getChatlistUpdates#89419521 chatlist:InputChatlist = chatlists.ChatlistUpdates;
chatlists.joinChatlistUpdates#e089f8f5 chatlist:InputChatlist peers:Vector<InputPeer> = Updates;
chatlists.hideChatlistUpdates#66e486fb chatlist:InputChatlist = Bool;
chatlists.getLeaveChatlistSuggestions#fdbcd714 chatlist:InputChatlist = Vector<Peer>;
chatlists.leaveChatlist#74fae13a chatlist:InputChatlist peers:Vector<InputPeer> = Updates;
stories.canSendStory#c7dfdfdd peer:InputPeer = Bool;
stories.sendStory#e4e6694b flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int = Updates;
stories.editStory#b583ba46 flags:# peer:InputPeer id:int media:flags.0?InputMedia media_areas:flags.3?Vector<MediaArea> caption:flags.1?string entities:flags.1?Vector<MessageEntity> privacy_rules:flags.2?Vector<InputPrivacyRule> = Updates;
stories.deleteStories#ae59db5f peer:InputPeer id:Vector<int> = Vector<int>;
stories.togglePinned#9a75a1ef peer:InputPeer id:Vector<int> pinned:Bool = Vector<int>;
stories.getAllStories#eeb0d625 flags:# next:flags.1?true hidden:flags.2?true state:flags.0?string = stories.AllStories;
stories.getPinnedStories#5821a5dc peer:InputPeer offset_id:int limit:int = stories.Stories;
stories.getStoriesArchive#b4352016 peer:InputPeer offset_id:int limit:int = stories.Stories;
stories.getStoriesByID#5774ca74 peer:InputPeer id:Vector<int> = stories.Stories;
stories.toggleAllStoriesHidden#7c2557c4 hidden:Bool = Bool;
stories.readStories#a556dac8 peer:InputPeer max_id:int = Vector<int>;
stories.incrementStoryViews#b2028afb peer:InputPeer id:Vector<int> = Bool;
stories.getStoryViewsList#7ed23c57 flags:# just_contacts:flags.0?true reactions_first:flags.2?true forwards_first:flags.3?true peer:InputPeer q:flags.1?string id:int offset:string limit:int = stories.StoryViewsList;
stories.getStoriesViews#28e16cc8 peer:InputPeer id:Vector<int> = stories.StoryViews;
stories.exportStoryLink#7b8def20 peer:InputPeer id:int = ExportedStoryLink;
stories.report#19d8eb45 peer:InputPeer id:Vector<int> option:bytes message:string = ReportResult;
stories.activateStealthMode#57bbd166 flags:# past:flags.0?true future:flags.1?true = Updates;
stories.sendReaction#7fd736b2 flags:# add_to_recent:flags.0?true peer:InputPeer story_id:int reaction:Reaction = Updates;
stories.getPeerStories#2c4ada50 peer:InputPeer = stories.PeerStories;
stories.getAllReadPeerStories#9b5ae7f9 = Updates;
stories.getPeerMaxIDs#535983c3 id:Vector<InputPeer> = Vector<int>;
stories.getChatsToSend#a56a8b60 = messages.Chats;
stories.togglePeerStoriesHidden#bd0415c4 peer:InputPeer hidden:Bool = Bool;
stories.getStoryReactionsList#b9b2881f flags:# forwards_first:flags.2?true peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = stories.StoryReactionsList;
stories.togglePinnedToTop#b297e9b peer:InputPeer id:Vector<int> = Bool;
stories.searchPosts#d1810907 flags:# hashtag:flags.0?string area:flags.1?MediaArea peer:flags.2?InputPeer offset:string limit:int = stories.FoundStories;
premium.getBoostsList#60f67660 flags:# gifts:flags.0?true peer:InputPeer offset:string limit:int = premium.BoostsList;
premium.getMyBoosts#be77b4a = premium.MyBoosts;
premium.applyBoost#6b7da746 flags:# slots:flags.0?Vector<int> peer:InputPeer = premium.MyBoosts;
premium.getBoostsStatus#42f1f61 peer:InputPeer = premium.BoostsStatus;
premium.getUserBoosts#39854d1f peer:InputPeer user_id:InputUser = premium.BoostsList;
smsjobs.isEligibleToJoin#edc39d0 = smsjobs.EligibilityToJoin;
smsjobs.join#a74ece2d = Bool;
smsjobs.leave#9898ad73 = Bool;
smsjobs.updateSettings#93fa0bf flags:# allow_international:flags.0?true = Bool;
smsjobs.getStatus#10a698e8 = smsjobs.Status;
smsjobs.getSmsJob#778d902f job_id:string = SmsJob;
smsjobs.finishJob#4f1ebf24 flags:# job_id:string error:flags.0?string = Bool;
fragment.getCollectibleInfo#be1e85ba collectible:InputCollectible = fragment.CollectibleInfo;
`), ti;
}
var ni, or;
function bl() {
  return or || (or = 1, ni = `
resPQ#05162463 nonce:int128 server_nonce:int128 pq:string server_public_key_fingerprints:Vector<long> = ResPQ;
p_q_inner_data#83c95aec pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 = P_Q_inner_data;
p_q_inner_data_dc#a9f55f95 pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 dc:int = P_Q_inner_data;
p_q_inner_data_temp#3c6a84d4 pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 expires_in:int = P_Q_inner_data;
p_q_inner_data_temp_dc#56fddf88 pq:string p:string q:string nonce:int128 server_nonce:int128 new_nonce:int256 dc:int expires_in:int = P_Q_inner_data;
bind_auth_key_inner#75a3f765 nonce:long temp_auth_key_id:long perm_auth_key_id:long temp_session_id:long expires_at:int = BindAuthKeyInner;
server_DH_params_fail#79cb045d nonce:int128 server_nonce:int128 new_nonce_hash:int128 = Server_DH_Params;
server_DH_params_ok#d0e8075c nonce:int128 server_nonce:int128 encrypted_answer:string = Server_DH_Params;
server_DH_inner_data#b5890dba nonce:int128 server_nonce:int128 g:int dh_prime:string g_a:string server_time:int = Server_DH_inner_data;
client_DH_inner_data#6643b654 nonce:int128 server_nonce:int128 retry_id:long g_b:string = Client_DH_Inner_Data;
dh_gen_ok#3bcbf734 nonce:int128 server_nonce:int128 new_nonce_hash1:int128 = Set_client_DH_params_answer;
dh_gen_retry#46dc1fb9 nonce:int128 server_nonce:int128 new_nonce_hash2:int128 = Set_client_DH_params_answer;
dh_gen_fail#a69dae02 nonce:int128 server_nonce:int128 new_nonce_hash3:int128 = Set_client_DH_params_answer;
destroy_auth_key_ok#f660e1d4 = DestroyAuthKeyRes;
destroy_auth_key_none#0a9f2259 = DestroyAuthKeyRes;
destroy_auth_key_fail#ea109b13 = DestroyAuthKeyRes;
---functions---
req_pq#60469778 nonce:int128 = ResPQ;
req_pq_multi#be7e8ef1 nonce:int128 = ResPQ;
req_DH_params#d712e4be nonce:int128 server_nonce:int128 p:string q:string public_key_fingerprint:long encrypted_data:string = Server_DH_Params;
set_client_DH_params#f5045f1f nonce:int128 server_nonce:int128 encrypted_data:string = Set_client_DH_params_answer;
destroy_auth_key#d1435160 = DestroyAuthKeyRes;
---types---
msgs_ack#62d6b459 msg_ids:Vector<long> = MsgsAck;
bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int error_code:int = BadMsgNotification;
bad_server_salt#edab447b bad_msg_id:long bad_msg_seqno:int error_code:int new_server_salt:long = BadMsgNotification;
msgs_state_req#da69fb52 msg_ids:Vector<long> = MsgsStateReq;
msgs_state_info#04deb57d req_msg_id:long info:string = MsgsStateInfo;
msgs_all_info#8cc0d131 msg_ids:Vector<long> info:string = MsgsAllInfo;
msg_detailed_info#276d3ec6 msg_id:long answer_msg_id:long bytes:int status:int = MsgDetailedInfo;
msg_new_detailed_info#809db6df answer_msg_id:long bytes:int status:int = MsgDetailedInfo;
msg_resend_req#7d861a08 msg_ids:Vector<long> = MsgResendReq;
rpc_error#2144ca19 error_code:int error_message:string = RpcError;
rpc_answer_unknown#5e2ad36e = RpcDropAnswer;
rpc_answer_dropped_running#cd78e586 = RpcDropAnswer;
rpc_answer_dropped#a43ad8b7 msg_id:long seq_no:int bytes:int = RpcDropAnswer;
future_salt#0949d9dc valid_since:int valid_until:int salt:long = FutureSalt;
future_salts#ae500895 req_msg_id:long now:int salts:vector<future_salt> = FutureSalts;
pong#347773c5 msg_id:long ping_id:long = Pong;
destroy_session_ok#e22045fc session_id:long = DestroySessionRes;
destroy_session_none#62d350c9 session_id:long = DestroySessionRes;
new_session_created#9ec20908 first_msg_id:long unique_id:long server_salt:long = NewSession;
http_wait#9299359f max_delay:int wait_after:int max_wait:int = HttpWait;
ipPort#d433ad73 ipv4:int port:int = IpPort;
ipPortSecret#37982646 ipv4:int port:int secret:bytes = IpPort;
accessPointRule#4679b65f phone_prefix_rules:string dc_id:int ips:vector<IpPort> = AccessPointRule;
help.configSimple#5a592a6c date:int expires:int rules:vector<AccessPointRule> = help.ConfigSimple;
tlsClientHello blocks:vector<TlsBlock> = TlsClientHello;
tlsBlockString data:string = TlsBlock;
tlsBlockRandom length:int = TlsBlock;
tlsBlockZero length:int = TlsBlock;
tlsBlockDomain = TlsBlock;
tlsBlockGrease seed:int = TlsBlock;
tlsBlockPublicKey = TlsBlock;
tlsBlockScope entries:Vector<TlsBlock> = TlsBlock;
tlsBlockPermutation entries:Vector<Vector<TlsBlock>> = TlsBlock;
---functions---
rpc_drop_answer#58e4a740 req_msg_id:long = RpcDropAnswer;
get_future_salts#b921bd04 num:int = FutureSalts;
ping#7abe77ec ping_id:long = Pong;
ping_delay_disconnect#f3427b8c ping_id:long disconnect_delay:int = Pong;
destroy_session#e7512126 session_id:long = DestroySessionRes;
`), ni;
}
var Qe = {}, cr;
function ac() {
  if (cr) return Qe;
  cr = 1;
  var t = Le().Buffer;
  Object.defineProperty(Qe, "__esModule", { value: true }), Qe.variableSnakeToCamelCase = Qe.snakeToCamelCase = Qe.CORE_TYPES = Qe.fromLine = Qe.parseTl = Qe.findAll = void 0, Qe.serializeBytes = o, Qe.serializeDate = c, Qe.buildArgConfig = s;
  const d = Ae(), g = (u) => u.replace(/(?:^|_)([a-z])/g, (S, $) => $.toUpperCase()).replace(/_/g, "");
  Qe.snakeToCamelCase = g;
  const i = (u) => u.replace(/([-_][a-z])/g, (_) => _.toUpperCase().replace("-", "").replace("_", ""));
  Qe.variableSnakeToCamelCase = i;
  const l = /* @__PURE__ */ new Set([3162085175, 2574415285, 1072550713, 3300522427, 1450380236]);
  Qe.CORE_TYPES = l;
  const r = /* @__PURE__ */ new Set([85337187, 2211011308, 2851430293, 1013613780, 1459478408, 3504867164, 3045658042, 1715713620, 3608339646, 4110704415, 812830625]), e = (u, _) => {
    const S = u.match(/([\w.]+)(?:#([0-9a-fA-F]+))?(?:\s{?\w+:[\w\d<>#.?!]+}?)*\s=\s([\w\d<>#.?]+);$/);
    if (!S) throw new Error(`Cannot parse TLObject ${u}`);
    const $ = a(/({)?(\w+):([\w\d<>#.?!]+)}?/, u), m = { name: S[1], constructorId: parseInt(S[2], 16), argsConfig: {}, subclassOfId: (0, d.crc32)(S[3]), result: S[3], isFunction: _, namespace: void 0 };
    if (!m.constructorId) {
      let I;
      Object.values(m.argsConfig).length ? I = ` ${Object.keys(m.argsConfig).map((f) => f.toString()).join(" ")}` : I = "";
      const b = `${m.name}${I} = ${m.result}`.replace(/(:|\?)bytes /g, "$1string ").replace(/</g, " ").replace(/>|{|}/g, "").replace(/ \w+:flags(\d+)?\.\d+\?true/g, "");
      m.name === "inputMediaInvoice" && m.name, m.constructorId = (0, d.crc32)(t.from(b, "utf8"));
    }
    for (const [h, I, b] of $) h === void 0 && (m.argsConfig[i(I)] = s(I, b));
    return m.name.includes(".") && ([m.namespace, m.name] = m.name.split(/\.(.+)/)), m.name = g(m.name), m;
  };
  Qe.fromLine = e;
  function s(u, _) {
    const S = { isVector: false, isFlag: false, skipConstructorId: false, flagName: null, flagIndex: -1, flagIndicator: true, type: null, useVectorId: null };
    if (_ !== "#") {
      S.flagIndicator = false, S.type = _.replace(/^!+/, "");
      const $ = S.type.match(/(flags(?:\d+)?).(\d+)\?([\w<>.]+)/);
      $ && (S.isFlag = true, S.flagName = $[1], S.flagIndex = Number($[2]), S.type = $[3]);
      const m = S.type.match(/[Vv]ector<([\w\d.]+)>/);
      m && (S.isVector = true, S.useVectorId = S.type.charAt(0) === "V", [, S.type] = m), /^[a-z]$/.test(S.type.split(".").pop().charAt(0)) && (S.skipConstructorId = true);
    }
    return S.type == "future_salt" && (S.type = "FutureSalt"), S;
  }
  const n = function* (u, _, S = [], $ = l) {
    (S || []).reduce((p, w) => Object.assign(Object.assign({}, p), { [w.name]: w }), {});
    const m = [], h = {}, I = {}, b = u;
    let f = false;
    for (let p of b.split(`
`)) {
      const w = p.indexOf("//");
      if (w !== -1 && (p = p.slice(0, w)), p = p.trim(), !p) continue;
      const M = p.match(/---(\w+)---/);
      if (M) {
        const [, T] = M;
        f = T === "functions";
        continue;
      }
      try {
        const T = e(p, f);
        if ($.has(T.constructorId)) continue;
        m.push(T), T.isFunction || (I[T.result] || (I[T.result] = []), h[T.name] = T, I[T.result].push(T));
      } catch (T) {
        if (!T.toString().includes("vector#1cb5c415")) throw T;
      }
    }
    for (const p of m) if (r.has(p.constructorId)) for (const w in p.argsConfig) p.argsConfig[w].type === "string" && (p.argsConfig[w].type = "bytes");
    for (const p of m) yield p;
  };
  Qe.parseTl = n;
  const a = (u, _, S = []) => {
    u.flags.includes("g") || (u = new RegExp(u.source, "g"));
    const $ = u.exec(_);
    return $ && (S.push($.slice(1)), a(u, _, S)), S;
  };
  Qe.findAll = a;
  function o(u) {
    if (!(u instanceof t)) if (typeof u == "string") u = t.from(u);
    else throw Error(`Bytes or str expected, not ${u.constructor.name}`);
    const _ = [];
    let S;
    return u.length < 254 ? (S = (u.length + 1) % 4, S !== 0 && (S = 4 - S), _.push(t.from([u.length])), _.push(u)) : (S = u.length % 4, S !== 0 && (S = 4 - S), _.push(t.from([254, u.length % 256, (u.length >> 8) % 256, (u.length >> 16) % 256])), _.push(u)), _.push(t.alloc(S).fill(0)), t.concat(_);
  }
  function c(u) {
    if (!u) return t.alloc(4).fill(0);
    if (u instanceof Date && (u = Math.floor((Date.now() - u.getTime()) / 1e3)), typeof u == "number") {
      const _ = t.alloc(4);
      return _.writeInt32LE(u, 0), _;
    }
    throw Error(`Cannot interpret "${u}" as a date`);
  }
  return Qe;
}
var si, lr;
function ht() {
  if (lr) return si;
  lr = 1;
  var t = Le().Buffer;
  const { inspect: d } = ft(), g = Ke(), { generateRandomBytes: i, readBigIntFromBuffer: l, isArrayLike: r, betterConsoleLog: e } = Ae(), s = _l(), n = bl();
  function a() {
    return l(i(8), false, true);
  }
  const { parseTl: o, serializeBytes: c, serializeDate: u } = ac(), { toSignedLittleBuffer: _ } = Ae(), S = /* @__PURE__ */ new Set(["chatId,int"]), $ = /* @__PURE__ */ new Set(["InputPeer", "InputChannel", "InputUser", "InputDialogPeer", "InputNotifyPeer", "InputMedia", "InputPhoto", "InputMessage", "InputDocument", "InputChatPhoto"]);
  class m extends Error {
    constructor(W, G, te, ...oe) {
      const he = "Found wrong type for " + W + ". expected " + G + " but received " + te + ".If you think this is a mistake please report it.";
      super(he, ...oe), Error.captureStackTrace && Error.captureStackTrace(this, m), this.name = "CastError";
    }
  }
  const h = typeof self < "u" && self.localStorage !== void 0, I = "GramJs:apiCache";
  function b() {
    let q;
    const W = h && f();
    return W ? q = W : (q = p(), h && localStorage.setItem(I, JSON.stringify(q))), C("all", q);
  }
  function f() {
    const q = localStorage.getItem(I);
    return q && JSON.parse(q);
  }
  function p() {
    const [q, W] = w(s), [G, te] = w(n), oe = [].concat(q, G), he = [].concat(W, te);
    return [].concat(oe, he);
  }
  function w(q) {
    const W = o(q, 109), G = [], te = [];
    for (const oe of W) oe.isFunction ? te.push(oe) : G.push(oe);
    return [G, te];
  }
  function M(q, W, G, te) {
    switch (W) {
      case "int":
        const oe = t.alloc(4);
        return oe.writeInt32LE(q, 0), oe;
      case "long":
        return _(q, 8);
      case "int128":
        return _(q, 16);
      case "int256":
        return _(q, 32);
      case "double":
        const he = t.alloc(8);
        return he.writeDoubleLE(q, 0), he;
      case "string":
        return c(q);
      case "Bool":
        return q ? t.from("b5757299", "hex") : t.from("379779bc", "hex");
      case "true":
        return t.alloc(0);
      case "bytes":
        return c(q);
      case "date":
        return u(q);
      default:
        if (q === void 0 || typeof q.getBytes != "function") throw new Error(`Required object ${G} of ${te} is undefined`);
        return q.getBytes();
    }
  }
  async function T(q, W, G, te) {
    switch (te) {
      case "InputPeer":
        return q.getInputPeer(await W.getInputEntity(G));
      case "InputChannel":
        return q.getInputChannel(await W.getInputEntity(G));
      case "InputUser":
        return q.getInputUser(await W.getInputEntity(G));
      case "InputDialogPeer":
        return await W._getInputDialog(G);
      case "InputNotifyPeer":
        return await W._getInputNotify(G);
      case "InputMedia":
        return q.getInputMedia(G);
      case "InputPhoto":
        return q.getInputPhoto(G);
      case "InputMessage":
        return q.getInputMessage(G);
      case "InputDocument":
        return q.getInputDocument(G);
      case "InputChatPhoto":
        return q.getInputChatPhoto(G);
      case "chatId,int":
        return await W.getPeerId(G, false);
      default:
        throw new Error("unsupported peer type : " + te);
    }
  }
  function k(q, W) {
    if (W.isVector) {
      W.useVectorId && q.readInt();
      const G = [], te = q.readInt();
      W.isVector = false;
      for (let oe = 0; oe < te; oe++) G.push(k(q, W));
      return W.isVector = true, G;
    } else {
      if (W.flagIndicator) return q.readInt();
      switch (W.type) {
        case "int":
          return q.readInt();
        case "long":
          return q.readLong();
        case "int128":
          return q.readLargeInt(128);
        case "int256":
          return q.readLargeInt(256);
        case "double":
          return q.readDouble();
        case "string":
          return q.tgReadString();
        case "Bool":
          return q.tgReadBool();
        case "true":
          return true;
        case "bytes":
          return q.tgReadBytes();
        case "date":
          return q.tgReadDate();
        default:
          return W.skipConstructorId ? E.constructors[W.type].fromReader(q) : q.tgReadObject();
      }
    }
  }
  function B(q, W) {
    let G = true;
    switch (W) {
      case "number":
        G = typeof q == "number" || q === void 0;
        break;
      case "string":
      case "boolean":
        G = typeof q === W;
        break;
      case "bigInt":
        G = g.isInstance(q) || typeof q == "bigint" || typeof q == "number" || typeof q == "string" || q === void 0;
        break;
      case "true":
        break;
      case "buffer":
        G = t.isBuffer(q);
        break;
      case "date":
        G = q && Object.prototype.toString.call(q) === "[object Date]" && !isNaN(q) || typeof q == "number";
        break;
      default:
        console.error(new Error("Unknown type." + W));
    }
    return G;
  }
  function C(q, W) {
    const G = {};
    for (const te of W) {
      const { name: oe, constructorId: he, subclassOfId: H, argsConfig: U, namespace: V, isFunction: K, result: F } = te, R = [V, oe].join(".").replace(/^\./, "");
      class ee {
        constructor(Q) {
          this.CONSTRUCTOR_ID = he, this.SUBCLASS_OF_ID = H, this.className = R, this.classType = K ? "request" : "constructor", Q = Q || {}, this.originalArgs = Q, this.init(Q);
          for (const se in U) if (se === "randomId" && !Q[se]) if (U[se].isVector) {
            const ge = [];
            for (let ue = 0; ue < Q.id.length; ue++) ge.push(a());
            this[se] = ge;
          } else this[se] = a();
          else this[se] = Q[se];
        }
        init(Q) {
        }
        static fromReader(Q) {
          const se = {};
          for (const ge in U) if (U.hasOwnProperty(ge)) {
            const ue = U[ge];
            if (ue.isFlag) {
              if (ue.type === "true") {
                se[ge] = !!(se[ue.flagName] & 1 << ue.flagIndex);
                continue;
              }
              se[ue.flagName] & 1 << ue.flagIndex ? se[ge] = k(Q, ue) : se[ge] = null;
            } else ue.flagIndicator && (ue.name = ge), se[ge] = k(Q, ue);
          }
          return new this(se);
        }
        validate() {
          for (const Q in U) if (U.hasOwnProperty(Q)) {
            if (U[Q].flagIndicator || U[Q].isFlag) continue;
            const se = this[Q];
            this.assertType(Q, U[Q], se);
          }
        }
        assertType(Q, se, ge) {
          let ue;
          if (se.isVector) {
            r(ge) || console.error(new m(Q, "array", ge)), ge == null && (ge = []);
            for (const ce of ge) this.assertType(Q, Object.assign(Object.assign({}, se), { isVector: false }), ce);
          } else {
            switch (se.type) {
              case "int":
                ue = "number";
                break;
              case "long":
              case "int128":
              case "int256":
                ue = "bigInt";
                break;
              case "double":
                ue = "number";
                break;
              case "string":
                ue = "string";
                break;
              case "Bool":
                ue = "boolean";
                break;
              case "true":
                ue = "true";
                break;
              case "bytes":
                ue = "buffer";
                break;
              case "date":
                ue = "date";
                break;
              default:
                ue = "object";
            }
            ue === "object" || B(ge, ue) !== true && console.error(new m(Q, ue, ge));
          }
        }
        getBytes() {
          try {
            this.validate();
          } catch {
          }
          const Q = this.CONSTRUCTOR_ID, se = t.alloc(4);
          se.writeUInt32LE(Q, 0);
          const ge = [se];
          for (const ue in U) if (U.hasOwnProperty(ue)) {
            if (U[ue].isFlag && (this[ue] === false && U[ue].type !== "Bool" || this[ue] === null || this[ue] === void 0 || U[ue].type === "true")) continue;
            if (U[ue].isVector) {
              U[ue].useVectorId && ge.push(t.from("15c4b51c", "hex"));
              const ce = t.alloc(4);
              ce.writeInt32LE(this[ue].length, 0), ge.push(ce, t.concat(this[ue].map((ye) => M(ye, U[ue].type, R))));
            } else if (U[ue].flagIndicator) if (!Object.values(U).some((ce) => ce.isFlag)) ge.push(t.alloc(4));
            else {
              let ce = 0;
              for (const v in U) U[v].isFlag && ue === U[v].flagName && (this[v] === false && U[v].type !== "Bool" || this[v] === void 0 || this[v] === null ? ce |= 0 : ce |= 1 << U[v].flagIndex);
              const ye = t.alloc(4);
              ye.writeUInt32LE(ce, 0), ge.push(ye);
            }
            else if (ge.push(M(this[ue], U[ue].type, ue, R)), this[ue] && typeof this[ue].getBytes == "function") {
              let ce = U[ue].type.charAt(U[ue].type.indexOf(".") + 1);
              ce = ce === ce.toUpperCase(), ce || ge.shift();
            }
          }
          return t.concat(ge);
        }
        readResult(Q) {
          if (!K) throw new Error("`readResult()` called for non-request instance");
          const se = F.match(/Vector<(int|long)>/);
          if (se) {
            Q.readInt();
            const ge = [], ue = Q.readInt();
            if (se[1] === "int") for (let ce = 0; ce < ue; ce++) ge.push(Q.readInt());
            else for (let ce = 0; ce < ue; ce++) ge.push(Q.readLong());
            return ge;
          } else return Q.tgReadObject();
        }
        async resolve(Q, se) {
          if (!K) throw new Error("`resolve()` called for non-request instance");
          for (const ge in U) if (U.hasOwnProperty(ge)) {
            if (!$.has(U[ge].type) && !S.has(`${U[ge].name},${U[ge].type}`) || U[ge].isFlag && !this[ge]) continue;
            if (U[ge].isVector) {
              const ue = [];
              for (const ce of this[ge]) ue.push(await T(se, Q, ce, U[ge].type));
              this[ge] = ue;
            } else this[ge] = await T(se, Q, this[ge], U[ge].type);
          }
        }
        [d.custom]() {
          return e(this);
        }
        toJSON() {
          return Object.assign(Object.assign({}, this.originalArgs), { className: R });
        }
      }
      ee.CONSTRUCTOR_ID = he, ee.SUBCLASS_OF_ID = H, ee.className = R, ee.classType = K ? "request" : "constructor", V ? (G[V] || (G[V] = {}), G[V][oe] = ee) : G[oe] = ee;
    }
    return G;
  }
  const E = b();
  return si = { Api: E }, si;
}
var $s = {}, vt = {}, Bn = {}, Ht = {}, ur;
function Ns() {
  if (ur) return Ht;
  ur = 1;
  var t = Ht && Ht.__asyncValues || function(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var s = e[Symbol.asyncIterator], n;
    return s ? s.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), n = {}, a("next"), a("throw"), a("return"), n[Symbol.asyncIterator] = function() {
      return this;
    }, n);
    function a(c) {
      n[c] = e[c] && function(u) {
        return new Promise(function(_, S) {
          u = e[c](u), o(_, S, u.done, u.value);
        });
      };
    }
    function o(c, u, _, S) {
      Promise.resolve(S).then(function($) {
        c({ value: $, done: _ });
      }, u);
    }
  };
  Object.defineProperty(Ht, "__esModule", { value: true }), Ht.ChatGetter = void 0;
  const d = Ye(), g = ht(), i = Ae(), l = ft();
  class r {
    [l.inspect.custom]() {
      return (0, i.betterConsoleLog)(this);
    }
    static initChatClass(s, { chatPeer: n, inputChat: a, chat: o, broadcast: c }) {
      s._chatPeer = n, s._inputChat = a, s._chat = o, s._broadcast = c, s._client = void 0;
    }
    get chat() {
      return this._chat;
    }
    async getChat() {
      var s;
      if (!this._chat || "min" in this._chat && await this.getInputChat()) try {
        this._inputChat && (this._chat = await ((s = this._client) === null || s === void 0 ? void 0 : s.getEntity(this._inputChat)));
      } catch {
        await this._refetchChat();
      }
      return this._chat;
    }
    get inputChat() {
      if (!this._inputChat && this._chatPeer && this._client) try {
        this._inputChat = this._client._entityCache.get(d.utils.getPeerId(this._chatPeer));
      } catch {
      }
      return this._inputChat;
    }
    async getInputChat() {
      var s, n, a, o;
      if (!this.inputChat && this.chatId && this._client) {
        try {
          const S = this.chatId;
          try {
            for (var c = true, u = t(this._client.iterDialogs({ limit: 100 })), _; _ = await u.next(), s = _.done, !s; c = true) {
              o = _.value, c = false;
              const $ = o;
              if ($.id.eq(S)) {
                this._chat = $.entity, this._inputChat = $.inputEntity;
                break;
              }
            }
          } catch ($) {
            n = { error: $ };
          } finally {
            try {
              !c && !s && (a = u.return) && await a.call(u);
            } finally {
              if (n) throw n.error;
            }
          }
        } catch {
        }
        return this._inputChat;
      }
      return this._inputChat;
    }
    get chatId() {
      return this._chatPeer ? (0, i.returnBigInt)(d.utils.getPeerId(this._chatPeer)) : void 0;
    }
    get isPrivate() {
      return this._chatPeer ? this._chatPeer instanceof g.Api.PeerUser : void 0;
    }
    get isGroup() {
      return !this._broadcast && this.chat && "broadcast" in this.chat && (this._broadcast = !!this.chat.broadcast), this._chatPeer instanceof g.Api.PeerChannel ? this._broadcast === void 0 ? void 0 : !this._broadcast : this._chatPeer instanceof g.Api.PeerChat;
    }
    get isChannel() {
      return this._chatPeer instanceof g.Api.PeerChannel;
    }
    async _refetchChat() {
    }
  }
  return Ht.ChatGetter = r, Ht;
}
var dr;
function ji() {
  if (dr) return Bn;
  dr = 1, Object.defineProperty(Bn, "__esModule", { value: true }), Bn.SenderGetter = void 0;
  const t = ht(), d = Ae(), g = Ns(), i = ft();
  class l extends g.ChatGetter {
    [i.inspect.custom]() {
      return (0, d.betterConsoleLog)(this);
    }
    static initSenderClass(e, { senderId: s, sender: n, inputSender: a }) {
      e._senderId = s, e._sender = n, e._inputSender = a, e._client = void 0;
    }
    get sender() {
      return this._sender;
    }
    async getSender() {
      if (this._client && (!this._sender || this._sender instanceof t.Api.Channel && this._sender.min) && await this.getInputSender()) try {
        this._sender = await this._client.getEntity(this._inputSender);
      } catch {
        await this._refetchSender();
      }
      return this._sender;
    }
    get inputSender() {
      if (!this._inputSender && this._senderId && this._client) try {
        this._inputSender = this._client._entityCache.get(this._senderId);
      } catch {
      }
      return this._inputSender;
    }
    async getInputSender() {
      return !this.inputSender && this._senderId && this._client && await this._refetchSender(), this._inputSender;
    }
    get senderId() {
      return this._senderId;
    }
    async _refetchSender() {
    }
  }
  return Bn.SenderGetter = l, Bn;
}
var Be = {}, ii, fr;
function vl() {
  if (fr) return ii;
  fr = 1;
  function t() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let d = 0; d < arguments.length; d++) this.define(arguments[d]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  return t.prototype.define = function(d, g) {
    for (let i in d) {
      let l = d[i].map(function(r) {
        return r.toLowerCase();
      });
      i = i.toLowerCase();
      for (let r = 0; r < l.length; r++) {
        const e = l[r];
        if (e[0] !== "*") {
          if (!g && e in this._types) throw new Error('Attempt to change mapping for "' + e + '" extension from "' + this._types[e] + '" to "' + i + '". Pass `force=true` to allow this, otherwise remove "' + e + '" from the list of extensions for "' + i + '".');
          this._types[e] = i;
        }
      }
      if (g || !this._extensions[i]) {
        const r = l[0];
        this._extensions[i] = r[0] !== "*" ? r : r.substr(1);
      }
    }
  }, t.prototype.getType = function(d) {
    d = String(d);
    let g = d.replace(/^.*[/\\]/, "").toLowerCase(), i = g.replace(/^.*\./, "").toLowerCase(), l = g.length < d.length;
    return (i.length < g.length - 1 || !l) && this._types[i] || null;
  }, t.prototype.getExtension = function(d) {
    return d = /^\s*([^;\s]*)/.test(d) && RegExp.$1, d && this._extensions[d.toLowerCase()] || null;
  }, ii = t, ii;
}
var ri, pr;
function yl() {
  return pr || (pr = 1, ri = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] }), ri;
}
var ai, gr;
function wl() {
  return gr || (gr = 1, ai = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] }), ai;
}
var oi, hr;
function Sl() {
  if (hr) return oi;
  hr = 1;
  let t = vl();
  return oi = new t(yl(), wl()), oi;
}
var Dn = {}, pt = {}, zt = {}, Sn = {}, In = {};
const Il = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
var mr;
function Pl() {
  if (mr) return In;
  mr = 1;
  var t = In && In.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(In, "__esModule", { value: true });
  var d = t(Il), g = String.fromCodePoint || function(l) {
    var r = "";
    return l > 65535 && (l -= 65536, r += String.fromCharCode(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), r += String.fromCharCode(l), r;
  };
  function i(l) {
    return l >= 55296 && l <= 57343 || l > 1114111 ? "\uFFFD" : (l in d.default && (l = d.default[l]), g(l));
  }
  return In.default = i, In;
}
const Al = "\xC1", Cl = "\xE1", xl = "\u0102", El = "\u0103", Ml = "\u223E", $l = "\u223F", kl = "\u223E\u0333", Rl = "\xC2", Tl = "\xE2", Bl = "\xB4", Dl = "\u0410", ql = "\u0430", Ul = "\xC6", Ll = "\xE6", Ol = "\u2061", Vl = "\u{1D504}", Nl = "\u{1D51E}", Fl = "\xC0", jl = "\xE0", Gl = "\u2135", Hl = "\u2135", zl = "\u0391", Kl = "\u03B1", Wl = "\u0100", Zl = "\u0101", Jl = "\u2A3F", Ql = "&", Xl = "&", Yl = "\u2A55", eu = "\u2A53", tu = "\u2227", nu = "\u2A5C", su = "\u2A58", iu = "\u2A5A", ru = "\u2220", au = "\u29A4", ou = "\u2220", cu = "\u29A8", lu = "\u29A9", uu = "\u29AA", du = "\u29AB", fu = "\u29AC", pu = "\u29AD", gu = "\u29AE", hu = "\u29AF", mu = "\u2221", _u = "\u221F", bu = "\u22BE", vu = "\u299D", yu = "\u2222", wu = "\xC5", Su = "\u237C", Iu = "\u0104", Pu = "\u0105", Au = "\u{1D538}", Cu = "\u{1D552}", xu = "\u2A6F", Eu = "\u2248", Mu = "\u2A70", $u = "\u224A", ku = "\u224B", Ru = "'", Tu = "\u2061", Bu = "\u2248", Du = "\u224A", qu = "\xC5", Uu = "\xE5", Lu = "\u{1D49C}", Ou = "\u{1D4B6}", Vu = "\u2254", Nu = "*", Fu = "\u2248", ju = "\u224D", Gu = "\xC3", Hu = "\xE3", zu = "\xC4", Ku = "\xE4", Wu = "\u2233", Zu = "\u2A11", Ju = "\u224C", Qu = "\u03F6", Xu = "\u2035", Yu = "\u223D", ed = "\u22CD", td = "\u2216", nd = "\u2AE7", sd = "\u22BD", id = "\u2305", rd = "\u2306", ad = "\u2305", od = "\u23B5", cd = "\u23B6", ld = "\u224C", ud = "\u0411", dd = "\u0431", fd = "\u201E", pd = "\u2235", gd = "\u2235", hd = "\u2235", md = "\u29B0", _d = "\u03F6", bd = "\u212C", vd = "\u212C", yd = "\u0392", wd = "\u03B2", Sd = "\u2136", Id = "\u226C", Pd = "\u{1D505}", Ad = "\u{1D51F}", Cd = "\u22C2", xd = "\u25EF", Ed = "\u22C3", Md = "\u2A00", $d = "\u2A01", kd = "\u2A02", Rd = "\u2A06", Td = "\u2605", Bd = "\u25BD", Dd = "\u25B3", qd = "\u2A04", Ud = "\u22C1", Ld = "\u22C0", Od = "\u290D", Vd = "\u29EB", Nd = "\u25AA", Fd = "\u25B4", jd = "\u25BE", Gd = "\u25C2", Hd = "\u25B8", zd = "\u2423", Kd = "\u2592", Wd = "\u2591", Zd = "\u2593", Jd = "\u2588", Qd = "=\u20E5", Xd = "\u2261\u20E5", Yd = "\u2AED", ef = "\u2310", tf = "\u{1D539}", nf = "\u{1D553}", sf = "\u22A5", rf = "\u22A5", af = "\u22C8", of = "\u29C9", cf = "\u2510", lf = "\u2555", uf = "\u2556", df = "\u2557", ff = "\u250C", pf = "\u2552", gf = "\u2553", hf = "\u2554", mf = "\u2500", _f = "\u2550", bf = "\u252C", vf = "\u2564", yf = "\u2565", wf = "\u2566", Sf = "\u2534", If = "\u2567", Pf = "\u2568", Af = "\u2569", Cf = "\u229F", xf = "\u229E", Ef = "\u22A0", Mf = "\u2518", $f = "\u255B", kf = "\u255C", Rf = "\u255D", Tf = "\u2514", Bf = "\u2558", Df = "\u2559", qf = "\u255A", Uf = "\u2502", Lf = "\u2551", Of = "\u253C", Vf = "\u256A", Nf = "\u256B", Ff = "\u256C", jf = "\u2524", Gf = "\u2561", Hf = "\u2562", zf = "\u2563", Kf = "\u251C", Wf = "\u255E", Zf = "\u255F", Jf = "\u2560", Qf = "\u2035", Xf = "\u02D8", Yf = "\u02D8", ep = "\xA6", tp = "\u{1D4B7}", np = "\u212C", sp = "\u204F", ip = "\u223D", rp = "\u22CD", ap = "\u29C5", op = "\\", cp = "\u27C8", lp = "\u2022", up = "\u2022", dp = "\u224E", fp = "\u2AAE", pp = "\u224F", gp = "\u224E", hp = "\u224F", mp = "\u0106", _p = "\u0107", bp = "\u2A44", vp = "\u2A49", yp = "\u2A4B", wp = "\u2229", Sp = "\u22D2", Ip = "\u2A47", Pp = "\u2A40", Ap = "\u2145", Cp = "\u2229\uFE00", xp = "\u2041", Ep = "\u02C7", Mp = "\u212D", $p = "\u2A4D", kp = "\u010C", Rp = "\u010D", Tp = "\xC7", Bp = "\xE7", Dp = "\u0108", qp = "\u0109", Up = "\u2230", Lp = "\u2A4C", Op = "\u2A50", Vp = "\u010A", Np = "\u010B", Fp = "\xB8", jp = "\xB8", Gp = "\u29B2", Hp = "\xA2", zp = "\xB7", Kp = "\xB7", Wp = "\u{1D520}", Zp = "\u212D", Jp = "\u0427", Qp = "\u0447", Xp = "\u2713", Yp = "\u2713", eg = "\u03A7", tg = "\u03C7", ng = "\u02C6", sg = "\u2257", ig = "\u21BA", rg = "\u21BB", ag = "\u229B", og = "\u229A", cg = "\u229D", lg = "\u2299", ug = "\xAE", dg = "\u24C8", fg = "\u2296", pg = "\u2295", gg = "\u2297", hg = "\u25CB", mg = "\u29C3", _g = "\u2257", bg = "\u2A10", vg = "\u2AEF", yg = "\u29C2", wg = "\u2232", Sg = "\u201D", Ig = "\u2019", Pg = "\u2663", Ag = "\u2663", Cg = ":", xg = "\u2237", Eg = "\u2A74", Mg = "\u2254", $g = "\u2254", kg = ",", Rg = "@", Tg = "\u2201", Bg = "\u2218", Dg = "\u2201", qg = "\u2102", Ug = "\u2245", Lg = "\u2A6D", Og = "\u2261", Vg = "\u222E", Ng = "\u222F", Fg = "\u222E", jg = "\u{1D554}", Gg = "\u2102", Hg = "\u2210", zg = "\u2210", Kg = "\xA9", Wg = "\xA9", Zg = "\u2117", Jg = "\u2233", Qg = "\u21B5", Xg = "\u2717", Yg = "\u2A2F", eh = "\u{1D49E}", th = "\u{1D4B8}", nh = "\u2ACF", sh = "\u2AD1", ih = "\u2AD0", rh = "\u2AD2", ah = "\u22EF", oh = "\u2938", ch = "\u2935", lh = "\u22DE", uh = "\u22DF", dh = "\u21B6", fh = "\u293D", ph = "\u2A48", gh = "\u2A46", hh = "\u224D", mh = "\u222A", _h = "\u22D3", bh = "\u2A4A", vh = "\u228D", yh = "\u2A45", wh = "\u222A\uFE00", Sh = "\u21B7", Ih = "\u293C", Ph = "\u22DE", Ah = "\u22DF", Ch = "\u22CE", xh = "\u22CF", Eh = "\xA4", Mh = "\u21B6", $h = "\u21B7", kh = "\u22CE", Rh = "\u22CF", Th = "\u2232", Bh = "\u2231", Dh = "\u232D", qh = "\u2020", Uh = "\u2021", Lh = "\u2138", Oh = "\u2193", Vh = "\u21A1", Nh = "\u21D3", Fh = "\u2010", jh = "\u2AE4", Gh = "\u22A3", Hh = "\u290F", zh = "\u02DD", Kh = "\u010E", Wh = "\u010F", Zh = "\u0414", Jh = "\u0434", Qh = "\u2021", Xh = "\u21CA", Yh = "\u2145", em = "\u2146", tm = "\u2911", nm = "\u2A77", sm = "\xB0", im = "\u2207", rm = "\u0394", am = "\u03B4", om = "\u29B1", cm = "\u297F", lm = "\u{1D507}", um = "\u{1D521}", dm = "\u2965", fm = "\u21C3", pm = "\u21C2", gm = "\xB4", hm = "\u02D9", mm = "\u02DD", _m = "`", bm = "\u02DC", vm = "\u22C4", ym = "\u22C4", wm = "\u22C4", Sm = "\u2666", Im = "\u2666", Pm = "\xA8", Am = "\u2146", Cm = "\u03DD", xm = "\u22F2", Em = "\xF7", Mm = "\xF7", $m = "\u22C7", km = "\u22C7", Rm = "\u0402", Tm = "\u0452", Bm = "\u231E", Dm = "\u230D", qm = "$", Um = "\u{1D53B}", Lm = "\u{1D555}", Om = "\xA8", Vm = "\u02D9", Nm = "\u20DC", Fm = "\u2250", jm = "\u2251", Gm = "\u2250", Hm = "\u2238", zm = "\u2214", Km = "\u22A1", Wm = "\u2306", Zm = "\u222F", Jm = "\xA8", Qm = "\u21D3", Xm = "\u21D0", Ym = "\u21D4", e_ = "\u2AE4", t_ = "\u27F8", n_ = "\u27FA", s_ = "\u27F9", i_ = "\u21D2", r_ = "\u22A8", a_ = "\u21D1", o_ = "\u21D5", c_ = "\u2225", l_ = "\u2913", u_ = "\u2193", d_ = "\u2193", f_ = "\u21D3", p_ = "\u21F5", g_ = "\u0311", h_ = "\u21CA", m_ = "\u21C3", __ = "\u21C2", b_ = "\u2950", v_ = "\u295E", y_ = "\u2956", w_ = "\u21BD", S_ = "\u295F", I_ = "\u2957", P_ = "\u21C1", A_ = "\u21A7", C_ = "\u22A4", x_ = "\u2910", E_ = "\u231F", M_ = "\u230C", $_ = "\u{1D49F}", k_ = "\u{1D4B9}", R_ = "\u0405", T_ = "\u0455", B_ = "\u29F6", D_ = "\u0110", q_ = "\u0111", U_ = "\u22F1", L_ = "\u25BF", O_ = "\u25BE", V_ = "\u21F5", N_ = "\u296F", F_ = "\u29A6", j_ = "\u040F", G_ = "\u045F", H_ = "\u27FF", z_ = "\xC9", K_ = "\xE9", W_ = "\u2A6E", Z_ = "\u011A", J_ = "\u011B", Q_ = "\xCA", X_ = "\xEA", Y_ = "\u2256", e1 = "\u2255", t1 = "\u042D", n1 = "\u044D", s1 = "\u2A77", i1 = "\u0116", r1 = "\u0117", a1 = "\u2251", o1 = "\u2147", c1 = "\u2252", l1 = "\u{1D508}", u1 = "\u{1D522}", d1 = "\u2A9A", f1 = "\xC8", p1 = "\xE8", g1 = "\u2A96", h1 = "\u2A98", m1 = "\u2A99", _1 = "\u2208", b1 = "\u23E7", v1 = "\u2113", y1 = "\u2A95", w1 = "\u2A97", S1 = "\u0112", I1 = "\u0113", P1 = "\u2205", A1 = "\u2205", C1 = "\u25FB", x1 = "\u2205", E1 = "\u25AB", M1 = "\u2004", $1 = "\u2005", k1 = "\u2003", R1 = "\u014A", T1 = "\u014B", B1 = "\u2002", D1 = "\u0118", q1 = "\u0119", U1 = "\u{1D53C}", L1 = "\u{1D556}", O1 = "\u22D5", V1 = "\u29E3", N1 = "\u2A71", F1 = "\u03B5", j1 = "\u0395", G1 = "\u03B5", H1 = "\u03F5", z1 = "\u2256", K1 = "\u2255", W1 = "\u2242", Z1 = "\u2A96", J1 = "\u2A95", Q1 = "\u2A75", X1 = "=", Y1 = "\u2242", eb = "\u225F", tb = "\u21CC", nb = "\u2261", sb = "\u2A78", ib = "\u29E5", rb = "\u2971", ab = "\u2253", ob = "\u212F", cb = "\u2130", lb = "\u2250", ub = "\u2A73", db = "\u2242", fb = "\u0397", pb = "\u03B7", gb = "\xD0", hb = "\xF0", mb = "\xCB", _b = "\xEB", bb = "\u20AC", vb = "!", yb = "\u2203", wb = "\u2203", Sb = "\u2130", Ib = "\u2147", Pb = "\u2147", Ab = "\u2252", Cb = "\u0424", xb = "\u0444", Eb = "\u2640", Mb = "\uFB03", $b = "\uFB00", kb = "\uFB04", Rb = "\u{1D509}", Tb = "\u{1D523}", Bb = "\uFB01", Db = "\u25FC", qb = "\u25AA", Ub = "fj", Lb = "\u266D", Ob = "\uFB02", Vb = "\u25B1", Nb = "\u0192", Fb = "\u{1D53D}", jb = "\u{1D557}", Gb = "\u2200", Hb = "\u2200", zb = "\u22D4", Kb = "\u2AD9", Wb = "\u2131", Zb = "\u2A0D", Jb = "\xBD", Qb = "\u2153", Xb = "\xBC", Yb = "\u2155", ev = "\u2159", tv = "\u215B", nv = "\u2154", sv = "\u2156", iv = "\xBE", rv = "\u2157", av = "\u215C", ov = "\u2158", cv = "\u215A", lv = "\u215D", uv = "\u215E", dv = "\u2044", fv = "\u2322", pv = "\u{1D4BB}", gv = "\u2131", hv = "\u01F5", mv = "\u0393", _v = "\u03B3", bv = "\u03DC", vv = "\u03DD", yv = "\u2A86", wv = "\u011E", Sv = "\u011F", Iv = "\u0122", Pv = "\u011C", Av = "\u011D", Cv = "\u0413", xv = "\u0433", Ev = "\u0120", Mv = "\u0121", $v = "\u2265", kv = "\u2267", Rv = "\u2A8C", Tv = "\u22DB", Bv = "\u2265", Dv = "\u2267", qv = "\u2A7E", Uv = "\u2AA9", Lv = "\u2A7E", Ov = "\u2A80", Vv = "\u2A82", Nv = "\u2A84", Fv = "\u22DB\uFE00", jv = "\u2A94", Gv = "\u{1D50A}", Hv = "\u{1D524}", zv = "\u226B", Kv = "\u22D9", Wv = "\u22D9", Zv = "\u2137", Jv = "\u0403", Qv = "\u0453", Xv = "\u2AA5", Yv = "\u2277", ey = "\u2A92", ty = "\u2AA4", ny = "\u2A8A", sy = "\u2A8A", iy = "\u2A88", ry = "\u2269", ay = "\u2A88", oy = "\u2269", cy = "\u22E7", ly = "\u{1D53E}", uy = "\u{1D558}", dy = "`", fy = "\u2265", py = "\u22DB", gy = "\u2267", hy = "\u2AA2", my = "\u2277", _y = "\u2A7E", by = "\u2273", vy = "\u{1D4A2}", yy = "\u210A", wy = "\u2273", Sy = "\u2A8E", Iy = "\u2A90", Py = "\u2AA7", Ay = "\u2A7A", Cy = ">", xy = ">", Ey = "\u226B", My = "\u22D7", $y = "\u2995", ky = "\u2A7C", Ry = "\u2A86", Ty = "\u2978", By = "\u22D7", Dy = "\u22DB", qy = "\u2A8C", Uy = "\u2277", Ly = "\u2273", Oy = "\u2269\uFE00", Vy = "\u2269\uFE00", Ny = "\u02C7", Fy = "\u200A", jy = "\xBD", Gy = "\u210B", Hy = "\u042A", zy = "\u044A", Ky = "\u2948", Wy = "\u2194", Zy = "\u21D4", Jy = "\u21AD", Qy = "^", Xy = "\u210F", Yy = "\u0124", e0 = "\u0125", t0 = "\u2665", n0 = "\u2665", s0 = "\u2026", i0 = "\u22B9", r0 = "\u{1D525}", a0 = "\u210C", o0 = "\u210B", c0 = "\u2925", l0 = "\u2926", u0 = "\u21FF", d0 = "\u223B", f0 = "\u21A9", p0 = "\u21AA", g0 = "\u{1D559}", h0 = "\u210D", m0 = "\u2015", _0 = "\u2500", b0 = "\u{1D4BD}", v0 = "\u210B", y0 = "\u210F", w0 = "\u0126", S0 = "\u0127", I0 = "\u224E", P0 = "\u224F", A0 = "\u2043", C0 = "\u2010", x0 = "\xCD", E0 = "\xED", M0 = "\u2063", $0 = "\xCE", k0 = "\xEE", R0 = "\u0418", T0 = "\u0438", B0 = "\u0130", D0 = "\u0415", q0 = "\u0435", U0 = "\xA1", L0 = "\u21D4", O0 = "\u{1D526}", V0 = "\u2111", N0 = "\xCC", F0 = "\xEC", j0 = "\u2148", G0 = "\u2A0C", H0 = "\u222D", z0 = "\u29DC", K0 = "\u2129", W0 = "\u0132", Z0 = "\u0133", J0 = "\u012A", Q0 = "\u012B", X0 = "\u2111", Y0 = "\u2148", ew = "\u2110", tw = "\u2111", nw = "\u0131", sw = "\u2111", iw = "\u22B7", rw = "\u01B5", aw = "\u21D2", ow = "\u2105", cw = "\u221E", lw = "\u29DD", uw = "\u0131", dw = "\u22BA", fw = "\u222B", pw = "\u222C", gw = "\u2124", hw = "\u222B", mw = "\u22BA", _w = "\u22C2", bw = "\u2A17", vw = "\u2A3C", yw = "\u2063", ww = "\u2062", Sw = "\u0401", Iw = "\u0451", Pw = "\u012E", Aw = "\u012F", Cw = "\u{1D540}", xw = "\u{1D55A}", Ew = "\u0399", Mw = "\u03B9", $w = "\u2A3C", kw = "\xBF", Rw = "\u{1D4BE}", Tw = "\u2110", Bw = "\u2208", Dw = "\u22F5", qw = "\u22F9", Uw = "\u22F4", Lw = "\u22F3", Ow = "\u2208", Vw = "\u2062", Nw = "\u0128", Fw = "\u0129", jw = "\u0406", Gw = "\u0456", Hw = "\xCF", zw = "\xEF", Kw = "\u0134", Ww = "\u0135", Zw = "\u0419", Jw = "\u0439", Qw = "\u{1D50D}", Xw = "\u{1D527}", Yw = "\u0237", eS = "\u{1D541}", tS = "\u{1D55B}", nS = "\u{1D4A5}", sS = "\u{1D4BF}", iS = "\u0408", rS = "\u0458", aS = "\u0404", oS = "\u0454", cS = "\u039A", lS = "\u03BA", uS = "\u03F0", dS = "\u0136", fS = "\u0137", pS = "\u041A", gS = "\u043A", hS = "\u{1D50E}", mS = "\u{1D528}", _S = "\u0138", bS = "\u0425", vS = "\u0445", yS = "\u040C", wS = "\u045C", SS = "\u{1D542}", IS = "\u{1D55C}", PS = "\u{1D4A6}", AS = "\u{1D4C0}", CS = "\u21DA", xS = "\u0139", ES = "\u013A", MS = "\u29B4", $S = "\u2112", kS = "\u039B", RS = "\u03BB", TS = "\u27E8", BS = "\u27EA", DS = "\u2991", qS = "\u27E8", US = "\u2A85", LS = "\u2112", OS = "\xAB", VS = "\u21E4", NS = "\u291F", FS = "\u2190", jS = "\u219E", GS = "\u21D0", HS = "\u291D", zS = "\u21A9", KS = "\u21AB", WS = "\u2939", ZS = "\u2973", JS = "\u21A2", QS = "\u2919", XS = "\u291B", YS = "\u2AAB", eI = "\u2AAD", tI = "\u2AAD\uFE00", nI = "\u290C", sI = "\u290E", iI = "\u2772", rI = "{", aI = "[", oI = "\u298B", cI = "\u298F", lI = "\u298D", uI = "\u013D", dI = "\u013E", fI = "\u013B", pI = "\u013C", gI = "\u2308", hI = "{", mI = "\u041B", _I = "\u043B", bI = "\u2936", vI = "\u201C", yI = "\u201E", wI = "\u2967", SI = "\u294B", II = "\u21B2", PI = "\u2264", AI = "\u2266", CI = "\u27E8", xI = "\u21E4", EI = "\u2190", MI = "\u2190", $I = "\u21D0", kI = "\u21C6", RI = "\u21A2", TI = "\u2308", BI = "\u27E6", DI = "\u2961", qI = "\u2959", UI = "\u21C3", LI = "\u230A", OI = "\u21BD", VI = "\u21BC", NI = "\u21C7", FI = "\u2194", jI = "\u2194", GI = "\u21D4", HI = "\u21C6", zI = "\u21CB", KI = "\u21AD", WI = "\u294E", ZI = "\u21A4", JI = "\u22A3", QI = "\u295A", XI = "\u22CB", YI = "\u29CF", eP = "\u22B2", tP = "\u22B4", nP = "\u2951", sP = "\u2960", iP = "\u2958", rP = "\u21BF", aP = "\u2952", oP = "\u21BC", cP = "\u2A8B", lP = "\u22DA", uP = "\u2264", dP = "\u2266", fP = "\u2A7D", pP = "\u2AA8", gP = "\u2A7D", hP = "\u2A7F", mP = "\u2A81", _P = "\u2A83", bP = "\u22DA\uFE00", vP = "\u2A93", yP = "\u2A85", wP = "\u22D6", SP = "\u22DA", IP = "\u2A8B", PP = "\u22DA", AP = "\u2266", CP = "\u2276", xP = "\u2276", EP = "\u2AA1", MP = "\u2272", $P = "\u2A7D", kP = "\u2272", RP = "\u297C", TP = "\u230A", BP = "\u{1D50F}", DP = "\u{1D529}", qP = "\u2276", UP = "\u2A91", LP = "\u2962", OP = "\u21BD", VP = "\u21BC", NP = "\u296A", FP = "\u2584", jP = "\u0409", GP = "\u0459", HP = "\u21C7", zP = "\u226A", KP = "\u22D8", WP = "\u231E", ZP = "\u21DA", JP = "\u296B", QP = "\u25FA", XP = "\u013F", YP = "\u0140", eA = "\u23B0", tA = "\u23B0", nA = "\u2A89", sA = "\u2A89", iA = "\u2A87", rA = "\u2268", aA = "\u2A87", oA = "\u2268", cA = "\u22E6", lA = "\u27EC", uA = "\u21FD", dA = "\u27E6", fA = "\u27F5", pA = "\u27F5", gA = "\u27F8", hA = "\u27F7", mA = "\u27F7", _A = "\u27FA", bA = "\u27FC", vA = "\u27F6", yA = "\u27F6", wA = "\u27F9", SA = "\u21AB", IA = "\u21AC", PA = "\u2985", AA = "\u{1D543}", CA = "\u{1D55D}", xA = "\u2A2D", EA = "\u2A34", MA = "\u2217", $A = "_", kA = "\u2199", RA = "\u2198", TA = "\u25CA", BA = "\u25CA", DA = "\u29EB", qA = "(", UA = "\u2993", LA = "\u21C6", OA = "\u231F", VA = "\u21CB", NA = "\u296D", FA = "\u200E", jA = "\u22BF", GA = "\u2039", HA = "\u{1D4C1}", zA = "\u2112", KA = "\u21B0", WA = "\u21B0", ZA = "\u2272", JA = "\u2A8D", QA = "\u2A8F", XA = "[", YA = "\u2018", eC = "\u201A", tC = "\u0141", nC = "\u0142", sC = "\u2AA6", iC = "\u2A79", rC = "<", aC = "<", oC = "\u226A", cC = "\u22D6", lC = "\u22CB", uC = "\u22C9", dC = "\u2976", fC = "\u2A7B", pC = "\u25C3", gC = "\u22B4", hC = "\u25C2", mC = "\u2996", _C = "\u294A", bC = "\u2966", vC = "\u2268\uFE00", yC = "\u2268\uFE00", wC = "\xAF", SC = "\u2642", IC = "\u2720", PC = "\u2720", AC = "\u21A6", CC = "\u21A6", xC = "\u21A7", EC = "\u21A4", MC = "\u21A5", $C = "\u25AE", kC = "\u2A29", RC = "\u041C", TC = "\u043C", BC = "\u2014", DC = "\u223A", qC = "\u2221", UC = "\u205F", LC = "\u2133", OC = "\u{1D510}", VC = "\u{1D52A}", NC = "\u2127", FC = "\xB5", jC = "*", GC = "\u2AF0", HC = "\u2223", zC = "\xB7", KC = "\u229F", WC = "\u2212", ZC = "\u2238", JC = "\u2A2A", QC = "\u2213", XC = "\u2ADB", YC = "\u2026", e2 = "\u2213", t2 = "\u22A7", n2 = "\u{1D544}", s2 = "\u{1D55E}", i2 = "\u2213", r2 = "\u{1D4C2}", a2 = "\u2133", o2 = "\u223E", c2 = "\u039C", l2 = "\u03BC", u2 = "\u22B8", d2 = "\u22B8", f2 = "\u2207", p2 = "\u0143", g2 = "\u0144", h2 = "\u2220\u20D2", m2 = "\u2249", _2 = "\u2A70\u0338", b2 = "\u224B\u0338", v2 = "\u0149", y2 = "\u2249", w2 = "\u266E", S2 = "\u2115", I2 = "\u266E", P2 = "\xA0", A2 = "\u224E\u0338", C2 = "\u224F\u0338", x2 = "\u2A43", E2 = "\u0147", M2 = "\u0148", $2 = "\u0145", k2 = "\u0146", R2 = "\u2247", T2 = "\u2A6D\u0338", B2 = "\u2A42", D2 = "\u041D", q2 = "\u043D", U2 = "\u2013", L2 = "\u2924", O2 = "\u2197", V2 = "\u21D7", N2 = "\u2197", F2 = "\u2260", j2 = "\u2250\u0338", G2 = "\u200B", H2 = "\u200B", z2 = "\u200B", K2 = "\u200B", W2 = "\u2262", Z2 = "\u2928", J2 = "\u2242\u0338", Q2 = "\u226B", X2 = "\u226A", Y2 = `
`, ex = "\u2204", tx = "\u2204", nx = "\u{1D511}", sx = "\u{1D52B}", ix = "\u2267\u0338", rx = "\u2271", ax = "\u2271", ox = "\u2267\u0338", cx = "\u2A7E\u0338", lx = "\u2A7E\u0338", ux = "\u22D9\u0338", dx = "\u2275", fx = "\u226B\u20D2", px = "\u226F", gx = "\u226F", hx = "\u226B\u0338", mx = "\u21AE", _x = "\u21CE", bx = "\u2AF2", vx = "\u220B", yx = "\u22FC", wx = "\u22FA", Sx = "\u220B", Ix = "\u040A", Px = "\u045A", Ax = "\u219A", Cx = "\u21CD", xx = "\u2025", Ex = "\u2266\u0338", Mx = "\u2270", $x = "\u219A", kx = "\u21CD", Rx = "\u21AE", Tx = "\u21CE", Bx = "\u2270", Dx = "\u2266\u0338", qx = "\u2A7D\u0338", Ux = "\u2A7D\u0338", Lx = "\u226E", Ox = "\u22D8\u0338", Vx = "\u2274", Nx = "\u226A\u20D2", Fx = "\u226E", jx = "\u22EA", Gx = "\u22EC", Hx = "\u226A\u0338", zx = "\u2224", Kx = "\u2060", Wx = "\xA0", Zx = "\u{1D55F}", Jx = "\u2115", Qx = "\u2AEC", Xx = "\xAC", Yx = "\u2262", eE = "\u226D", tE = "\u2226", nE = "\u2209", sE = "\u2260", iE = "\u2242\u0338", rE = "\u2204", aE = "\u226F", oE = "\u2271", cE = "\u2267\u0338", lE = "\u226B\u0338", uE = "\u2279", dE = "\u2A7E\u0338", fE = "\u2275", pE = "\u224E\u0338", gE = "\u224F\u0338", hE = "\u2209", mE = "\u22F5\u0338", _E = "\u22F9\u0338", bE = "\u2209", vE = "\u22F7", yE = "\u22F6", wE = "\u29CF\u0338", SE = "\u22EA", IE = "\u22EC", PE = "\u226E", AE = "\u2270", CE = "\u2278", xE = "\u226A\u0338", EE = "\u2A7D\u0338", ME = "\u2274", $E = "\u2AA2\u0338", kE = "\u2AA1\u0338", RE = "\u220C", TE = "\u220C", BE = "\u22FE", DE = "\u22FD", qE = "\u2280", UE = "\u2AAF\u0338", LE = "\u22E0", OE = "\u220C", VE = "\u29D0\u0338", NE = "\u22EB", FE = "\u22ED", jE = "\u228F\u0338", GE = "\u22E2", HE = "\u2290\u0338", zE = "\u22E3", KE = "\u2282\u20D2", WE = "\u2288", ZE = "\u2281", JE = "\u2AB0\u0338", QE = "\u22E1", XE = "\u227F\u0338", YE = "\u2283\u20D2", eM = "\u2289", tM = "\u2241", nM = "\u2244", sM = "\u2247", iM = "\u2249", rM = "\u2224", aM = "\u2226", oM = "\u2226", cM = "\u2AFD\u20E5", lM = "\u2202\u0338", uM = "\u2A14", dM = "\u2280", fM = "\u22E0", pM = "\u2280", gM = "\u2AAF\u0338", hM = "\u2AAF\u0338", mM = "\u2933\u0338", _M = "\u219B", bM = "\u21CF", vM = "\u219D\u0338", yM = "\u219B", wM = "\u21CF", SM = "\u22EB", IM = "\u22ED", PM = "\u2281", AM = "\u22E1", CM = "\u2AB0\u0338", xM = "\u{1D4A9}", EM = "\u{1D4C3}", MM = "\u2224", $M = "\u2226", kM = "\u2241", RM = "\u2244", TM = "\u2244", BM = "\u2224", DM = "\u2226", qM = "\u22E2", UM = "\u22E3", LM = "\u2284", OM = "\u2AC5\u0338", VM = "\u2288", NM = "\u2282\u20D2", FM = "\u2288", jM = "\u2AC5\u0338", GM = "\u2281", HM = "\u2AB0\u0338", zM = "\u2285", KM = "\u2AC6\u0338", WM = "\u2289", ZM = "\u2283\u20D2", JM = "\u2289", QM = "\u2AC6\u0338", XM = "\u2279", YM = "\xD1", e$ = "\xF1", t$ = "\u2278", n$ = "\u22EA", s$ = "\u22EC", i$ = "\u22EB", r$ = "\u22ED", a$ = "\u039D", o$ = "\u03BD", c$ = "#", l$ = "\u2116", u$ = "\u2007", d$ = "\u224D\u20D2", f$ = "\u22AC", p$ = "\u22AD", g$ = "\u22AE", h$ = "\u22AF", m$ = "\u2265\u20D2", _$ = ">\u20D2", b$ = "\u2904", v$ = "\u29DE", y$ = "\u2902", w$ = "\u2264\u20D2", S$ = "<\u20D2", I$ = "\u22B4\u20D2", P$ = "\u2903", A$ = "\u22B5\u20D2", C$ = "\u223C\u20D2", x$ = "\u2923", E$ = "\u2196", M$ = "\u21D6", $$ = "\u2196", k$ = "\u2927", R$ = "\xD3", T$ = "\xF3", B$ = "\u229B", D$ = "\xD4", q$ = "\xF4", U$ = "\u229A", L$ = "\u041E", O$ = "\u043E", V$ = "\u229D", N$ = "\u0150", F$ = "\u0151", j$ = "\u2A38", G$ = "\u2299", H$ = "\u29BC", z$ = "\u0152", K$ = "\u0153", W$ = "\u29BF", Z$ = "\u{1D512}", J$ = "\u{1D52C}", Q$ = "\u02DB", X$ = "\xD2", Y$ = "\xF2", ek = "\u29C1", tk = "\u29B5", nk = "\u03A9", sk = "\u222E", ik = "\u21BA", rk = "\u29BE", ak = "\u29BB", ok = "\u203E", ck = "\u29C0", lk = "\u014C", uk = "\u014D", dk = "\u03A9", fk = "\u03C9", pk = "\u039F", gk = "\u03BF", hk = "\u29B6", mk = "\u2296", _k = "\u{1D546}", bk = "\u{1D560}", vk = "\u29B7", yk = "\u201C", wk = "\u2018", Sk = "\u29B9", Ik = "\u2295", Pk = "\u21BB", Ak = "\u2A54", Ck = "\u2228", xk = "\u2A5D", Ek = "\u2134", Mk = "\u2134", $k = "\xAA", kk = "\xBA", Rk = "\u22B6", Tk = "\u2A56", Bk = "\u2A57", Dk = "\u2A5B", qk = "\u24C8", Uk = "\u{1D4AA}", Lk = "\u2134", Ok = "\xD8", Vk = "\xF8", Nk = "\u2298", Fk = "\xD5", jk = "\xF5", Gk = "\u2A36", Hk = "\u2A37", zk = "\u2297", Kk = "\xD6", Wk = "\xF6", Zk = "\u233D", Jk = "\u203E", Qk = "\u23DE", Xk = "\u23B4", Yk = "\u23DC", e3 = "\xB6", t3 = "\u2225", n3 = "\u2225", s3 = "\u2AF3", i3 = "\u2AFD", r3 = "\u2202", a3 = "\u2202", o3 = "\u041F", c3 = "\u043F", l3 = "%", u3 = ".", d3 = "\u2030", f3 = "\u22A5", p3 = "\u2031", g3 = "\u{1D513}", h3 = "\u{1D52D}", m3 = "\u03A6", _3 = "\u03C6", b3 = "\u03D5", v3 = "\u2133", y3 = "\u260E", w3 = "\u03A0", S3 = "\u03C0", I3 = "\u22D4", P3 = "\u03D6", A3 = "\u210F", C3 = "\u210E", x3 = "\u210F", E3 = "\u2A23", M3 = "\u229E", $3 = "\u2A22", k3 = "+", R3 = "\u2214", T3 = "\u2A25", B3 = "\u2A72", D3 = "\xB1", q3 = "\xB1", U3 = "\u2A26", L3 = "\u2A27", O3 = "\xB1", V3 = "\u210C", N3 = "\u2A15", F3 = "\u{1D561}", j3 = "\u2119", G3 = "\xA3", H3 = "\u2AB7", z3 = "\u2ABB", K3 = "\u227A", W3 = "\u227C", Z3 = "\u2AB7", J3 = "\u227A", Q3 = "\u227C", X3 = "\u227A", Y3 = "\u2AAF", eR = "\u227C", tR = "\u227E", nR = "\u2AAF", sR = "\u2AB9", iR = "\u2AB5", rR = "\u22E8", aR = "\u2AAF", oR = "\u2AB3", cR = "\u227E", lR = "\u2032", uR = "\u2033", dR = "\u2119", fR = "\u2AB9", pR = "\u2AB5", gR = "\u22E8", hR = "\u220F", mR = "\u220F", _R = "\u232E", bR = "\u2312", vR = "\u2313", yR = "\u221D", wR = "\u221D", SR = "\u2237", IR = "\u221D", PR = "\u227E", AR = "\u22B0", CR = "\u{1D4AB}", xR = "\u{1D4C5}", ER = "\u03A8", MR = "\u03C8", $R = "\u2008", kR = "\u{1D514}", RR = "\u{1D52E}", TR = "\u2A0C", BR = "\u{1D562}", DR = "\u211A", qR = "\u2057", UR = "\u{1D4AC}", LR = "\u{1D4C6}", OR = "\u210D", VR = "\u2A16", NR = "?", FR = "\u225F", jR = '"', GR = '"', HR = "\u21DB", zR = "\u223D\u0331", KR = "\u0154", WR = "\u0155", ZR = "\u221A", JR = "\u29B3", QR = "\u27E9", XR = "\u27EB", YR = "\u2992", e4 = "\u29A5", t4 = "\u27E9", n4 = "\xBB", s4 = "\u2975", i4 = "\u21E5", r4 = "\u2920", a4 = "\u2933", o4 = "\u2192", c4 = "\u21A0", l4 = "\u21D2", u4 = "\u291E", d4 = "\u21AA", f4 = "\u21AC", p4 = "\u2945", g4 = "\u2974", h4 = "\u2916", m4 = "\u21A3", _4 = "\u219D", b4 = "\u291A", v4 = "\u291C", y4 = "\u2236", w4 = "\u211A", S4 = "\u290D", I4 = "\u290F", P4 = "\u2910", A4 = "\u2773", C4 = "}", x4 = "]", E4 = "\u298C", M4 = "\u298E", $4 = "\u2990", k4 = "\u0158", R4 = "\u0159", T4 = "\u0156", B4 = "\u0157", D4 = "\u2309", q4 = "}", U4 = "\u0420", L4 = "\u0440", O4 = "\u2937", V4 = "\u2969", N4 = "\u201D", F4 = "\u201D", j4 = "\u21B3", G4 = "\u211C", H4 = "\u211B", z4 = "\u211C", K4 = "\u211D", W4 = "\u211C", Z4 = "\u25AD", J4 = "\xAE", Q4 = "\xAE", X4 = "\u220B", Y4 = "\u21CB", eT = "\u296F", tT = "\u297D", nT = "\u230B", sT = "\u{1D52F}", iT = "\u211C", rT = "\u2964", aT = "\u21C1", oT = "\u21C0", cT = "\u296C", lT = "\u03A1", uT = "\u03C1", dT = "\u03F1", fT = "\u27E9", pT = "\u21E5", gT = "\u2192", hT = "\u2192", mT = "\u21D2", _T = "\u21C4", bT = "\u21A3", vT = "\u2309", yT = "\u27E7", wT = "\u295D", ST = "\u2955", IT = "\u21C2", PT = "\u230B", AT = "\u21C1", CT = "\u21C0", xT = "\u21C4", ET = "\u21CC", MT = "\u21C9", $T = "\u219D", kT = "\u21A6", RT = "\u22A2", TT = "\u295B", BT = "\u22CC", DT = "\u29D0", qT = "\u22B3", UT = "\u22B5", LT = "\u294F", OT = "\u295C", VT = "\u2954", NT = "\u21BE", FT = "\u2953", jT = "\u21C0", GT = "\u02DA", HT = "\u2253", zT = "\u21C4", KT = "\u21CC", WT = "\u200F", ZT = "\u23B1", JT = "\u23B1", QT = "\u2AEE", XT = "\u27ED", YT = "\u21FE", e5 = "\u27E7", t5 = "\u2986", n5 = "\u{1D563}", s5 = "\u211D", i5 = "\u2A2E", r5 = "\u2A35", a5 = "\u2970", o5 = ")", c5 = "\u2994", l5 = "\u2A12", u5 = "\u21C9", d5 = "\u21DB", f5 = "\u203A", p5 = "\u{1D4C7}", g5 = "\u211B", h5 = "\u21B1", m5 = "\u21B1", _5 = "]", b5 = "\u2019", v5 = "\u2019", y5 = "\u22CC", w5 = "\u22CA", S5 = "\u25B9", I5 = "\u22B5", P5 = "\u25B8", A5 = "\u29CE", C5 = "\u29F4", x5 = "\u2968", E5 = "\u211E", M5 = "\u015A", $5 = "\u015B", k5 = "\u201A", R5 = "\u2AB8", T5 = "\u0160", B5 = "\u0161", D5 = "\u2ABC", q5 = "\u227B", U5 = "\u227D", L5 = "\u2AB0", O5 = "\u2AB4", V5 = "\u015E", N5 = "\u015F", F5 = "\u015C", j5 = "\u015D", G5 = "\u2ABA", H5 = "\u2AB6", z5 = "\u22E9", K5 = "\u2A13", W5 = "\u227F", Z5 = "\u0421", J5 = "\u0441", Q5 = "\u22A1", X5 = "\u22C5", Y5 = "\u2A66", e8 = "\u2925", t8 = "\u2198", n8 = "\u21D8", s8 = "\u2198", i8 = "\xA7", r8 = ";", a8 = "\u2929", o8 = "\u2216", c8 = "\u2216", l8 = "\u2736", u8 = "\u{1D516}", d8 = "\u{1D530}", f8 = "\u2322", p8 = "\u266F", g8 = "\u0429", h8 = "\u0449", m8 = "\u0428", _8 = "\u0448", b8 = "\u2193", v8 = "\u2190", y8 = "\u2223", w8 = "\u2225", S8 = "\u2192", I8 = "\u2191", P8 = "\xAD", A8 = "\u03A3", C8 = "\u03C3", x8 = "\u03C2", E8 = "\u03C2", M8 = "\u223C", $8 = "\u2A6A", k8 = "\u2243", R8 = "\u2243", T8 = "\u2A9E", B8 = "\u2AA0", D8 = "\u2A9D", q8 = "\u2A9F", U8 = "\u2246", L8 = "\u2A24", O8 = "\u2972", V8 = "\u2190", N8 = "\u2218", F8 = "\u2216", j8 = "\u2A33", G8 = "\u29E4", H8 = "\u2223", z8 = "\u2323", K8 = "\u2AAA", W8 = "\u2AAC", Z8 = "\u2AAC\uFE00", J8 = "\u042C", Q8 = "\u044C", X8 = "\u233F", Y8 = "\u29C4", e6 = "/", t6 = "\u{1D54A}", n6 = "\u{1D564}", s6 = "\u2660", i6 = "\u2660", r6 = "\u2225", a6 = "\u2293", o6 = "\u2293\uFE00", c6 = "\u2294", l6 = "\u2294\uFE00", u6 = "\u221A", d6 = "\u228F", f6 = "\u2291", p6 = "\u228F", g6 = "\u2291", h6 = "\u2290", m6 = "\u2292", _6 = "\u2290", b6 = "\u2292", v6 = "\u25A1", y6 = "\u25A1", w6 = "\u2293", S6 = "\u228F", I6 = "\u2291", P6 = "\u2290", A6 = "\u2292", C6 = "\u2294", x6 = "\u25AA", E6 = "\u25A1", M6 = "\u25AA", $6 = "\u2192", k6 = "\u{1D4AE}", R6 = "\u{1D4C8}", T6 = "\u2216", B6 = "\u2323", D6 = "\u22C6", q6 = "\u22C6", U6 = "\u2606", L6 = "\u2605", O6 = "\u03F5", V6 = "\u03D5", N6 = "\xAF", F6 = "\u2282", j6 = "\u22D0", G6 = "\u2ABD", H6 = "\u2AC5", z6 = "\u2286", K6 = "\u2AC3", W6 = "\u2AC1", Z6 = "\u2ACB", J6 = "\u228A", Q6 = "\u2ABF", X6 = "\u2979", Y6 = "\u2282", eB = "\u22D0", tB = "\u2286", nB = "\u2AC5", sB = "\u2286", iB = "\u228A", rB = "\u2ACB", aB = "\u2AC7", oB = "\u2AD5", cB = "\u2AD3", lB = "\u2AB8", uB = "\u227B", dB = "\u227D", fB = "\u227B", pB = "\u2AB0", gB = "\u227D", hB = "\u227F", mB = "\u2AB0", _B = "\u2ABA", bB = "\u2AB6", vB = "\u22E9", yB = "\u227F", wB = "\u220B", SB = "\u2211", IB = "\u2211", PB = "\u266A", AB = "\xB9", CB = "\xB2", xB = "\xB3", EB = "\u2283", MB = "\u22D1", $B = "\u2ABE", kB = "\u2AD8", RB = "\u2AC6", TB = "\u2287", BB = "\u2AC4", DB = "\u2283", qB = "\u2287", UB = "\u27C9", LB = "\u2AD7", OB = "\u297B", VB = "\u2AC2", NB = "\u2ACC", FB = "\u228B", jB = "\u2AC0", GB = "\u2283", HB = "\u22D1", zB = "\u2287", KB = "\u2AC6", WB = "\u228B", ZB = "\u2ACC", JB = "\u2AC8", QB = "\u2AD4", XB = "\u2AD6", YB = "\u2926", eD = "\u2199", tD = "\u21D9", nD = "\u2199", sD = "\u292A", iD = "\xDF", rD = "	", aD = "\u2316", oD = "\u03A4", cD = "\u03C4", lD = "\u23B4", uD = "\u0164", dD = "\u0165", fD = "\u0162", pD = "\u0163", gD = "\u0422", hD = "\u0442", mD = "\u20DB", _D = "\u2315", bD = "\u{1D517}", vD = "\u{1D531}", yD = "\u2234", wD = "\u2234", SD = "\u2234", ID = "\u0398", PD = "\u03B8", AD = "\u03D1", CD = "\u03D1", xD = "\u2248", ED = "\u223C", MD = "\u205F\u200A", $D = "\u2009", kD = "\u2009", RD = "\u2248", TD = "\u223C", BD = "\xDE", DD = "\xFE", qD = "\u02DC", UD = "\u223C", LD = "\u2243", OD = "\u2245", VD = "\u2248", ND = "\u2A31", FD = "\u22A0", jD = "\xD7", GD = "\u2A30", HD = "\u222D", zD = "\u2928", KD = "\u2336", WD = "\u2AF1", ZD = "\u22A4", JD = "\u{1D54B}", QD = "\u{1D565}", XD = "\u2ADA", YD = "\u2929", eq = "\u2034", tq = "\u2122", nq = "\u2122", sq = "\u25B5", iq = "\u25BF", rq = "\u25C3", aq = "\u22B4", oq = "\u225C", cq = "\u25B9", lq = "\u22B5", uq = "\u25EC", dq = "\u225C", fq = "\u2A3A", pq = "\u20DB", gq = "\u2A39", hq = "\u29CD", mq = "\u2A3B", _q = "\u23E2", bq = "\u{1D4AF}", vq = "\u{1D4C9}", yq = "\u0426", wq = "\u0446", Sq = "\u040B", Iq = "\u045B", Pq = "\u0166", Aq = "\u0167", Cq = "\u226C", xq = "\u219E", Eq = "\u21A0", Mq = "\xDA", $q = "\xFA", kq = "\u2191", Rq = "\u219F", Tq = "\u21D1", Bq = "\u2949", Dq = "\u040E", qq = "\u045E", Uq = "\u016C", Lq = "\u016D", Oq = "\xDB", Vq = "\xFB", Nq = "\u0423", Fq = "\u0443", jq = "\u21C5", Gq = "\u0170", Hq = "\u0171", zq = "\u296E", Kq = "\u297E", Wq = "\u{1D518}", Zq = "\u{1D532}", Jq = "\xD9", Qq = "\xF9", Xq = "\u2963", Yq = "\u21BF", e7 = "\u21BE", t7 = "\u2580", n7 = "\u231C", s7 = "\u231C", i7 = "\u230F", r7 = "\u25F8", a7 = "\u016A", o7 = "\u016B", c7 = "\xA8", l7 = "_", u7 = "\u23DF", d7 = "\u23B5", f7 = "\u23DD", p7 = "\u22C3", g7 = "\u228E", h7 = "\u0172", m7 = "\u0173", _7 = "\u{1D54C}", b7 = "\u{1D566}", v7 = "\u2912", y7 = "\u2191", w7 = "\u2191", S7 = "\u21D1", I7 = "\u21C5", P7 = "\u2195", A7 = "\u2195", C7 = "\u21D5", x7 = "\u296E", E7 = "\u21BF", M7 = "\u21BE", $7 = "\u228E", k7 = "\u2196", R7 = "\u2197", T7 = "\u03C5", B7 = "\u03D2", D7 = "\u03D2", q7 = "\u03A5", U7 = "\u03C5", L7 = "\u21A5", O7 = "\u22A5", V7 = "\u21C8", N7 = "\u231D", F7 = "\u231D", j7 = "\u230E", G7 = "\u016E", H7 = "\u016F", z7 = "\u25F9", K7 = "\u{1D4B0}", W7 = "\u{1D4CA}", Z7 = "\u22F0", J7 = "\u0168", Q7 = "\u0169", X7 = "\u25B5", Y7 = "\u25B4", e9 = "\u21C8", t9 = "\xDC", n9 = "\xFC", s9 = "\u29A7", i9 = "\u299C", r9 = "\u03F5", a9 = "\u03F0", o9 = "\u2205", c9 = "\u03D5", l9 = "\u03D6", u9 = "\u221D", d9 = "\u2195", f9 = "\u21D5", p9 = "\u03F1", g9 = "\u03C2", h9 = "\u228A\uFE00", m9 = "\u2ACB\uFE00", _9 = "\u228B\uFE00", b9 = "\u2ACC\uFE00", v9 = "\u03D1", y9 = "\u22B2", w9 = "\u22B3", S9 = "\u2AE8", I9 = "\u2AEB", P9 = "\u2AE9", A9 = "\u0412", C9 = "\u0432", x9 = "\u22A2", E9 = "\u22A8", M9 = "\u22A9", $9 = "\u22AB", k9 = "\u2AE6", R9 = "\u22BB", T9 = "\u2228", B9 = "\u22C1", D9 = "\u225A", q9 = "\u22EE", U9 = "|", L9 = "\u2016", O9 = "|", V9 = "\u2016", N9 = "\u2223", F9 = "|", j9 = "\u2758", G9 = "\u2240", H9 = "\u200A", z9 = "\u{1D519}", K9 = "\u{1D533}", W9 = "\u22B2", Z9 = "\u2282\u20D2", J9 = "\u2283\u20D2", Q9 = "\u{1D54D}", X9 = "\u{1D567}", Y9 = "\u221D", eU = "\u22B3", tU = "\u{1D4B1}", nU = "\u{1D4CB}", sU = "\u2ACB\uFE00", iU = "\u228A\uFE00", rU = "\u2ACC\uFE00", aU = "\u228B\uFE00", oU = "\u22AA", cU = "\u299A", lU = "\u0174", uU = "\u0175", dU = "\u2A5F", fU = "\u2227", pU = "\u22C0", gU = "\u2259", hU = "\u2118", mU = "\u{1D51A}", _U = "\u{1D534}", bU = "\u{1D54E}", vU = "\u{1D568}", yU = "\u2118", wU = "\u2240", SU = "\u2240", IU = "\u{1D4B2}", PU = "\u{1D4CC}", AU = "\u22C2", CU = "\u25EF", xU = "\u22C3", EU = "\u25BD", MU = "\u{1D51B}", $U = "\u{1D535}", kU = "\u27F7", RU = "\u27FA", TU = "\u039E", BU = "\u03BE", DU = "\u27F5", qU = "\u27F8", UU = "\u27FC", LU = "\u22FB", OU = "\u2A00", VU = "\u{1D54F}", NU = "\u{1D569}", FU = "\u2A01", jU = "\u2A02", GU = "\u27F6", HU = "\u27F9", zU = "\u{1D4B3}", KU = "\u{1D4CD}", WU = "\u2A06", ZU = "\u2A04", JU = "\u25B3", QU = "\u22C1", XU = "\u22C0", YU = "\xDD", eL = "\xFD", tL = "\u042F", nL = "\u044F", sL = "\u0176", iL = "\u0177", rL = "\u042B", aL = "\u044B", oL = "\xA5", cL = "\u{1D51C}", lL = "\u{1D536}", uL = "\u0407", dL = "\u0457", fL = "\u{1D550}", pL = "\u{1D56A}", gL = "\u{1D4B4}", hL = "\u{1D4CE}", mL = "\u042E", _L = "\u044E", bL = "\xFF", vL = "\u0178", yL = "\u0179", wL = "\u017A", SL = "\u017D", IL = "\u017E", PL = "\u0417", AL = "\u0437", CL = "\u017B", xL = "\u017C", EL = "\u2128", ML = "\u200B", $L = "\u0396", kL = "\u03B6", RL = "\u{1D537}", TL = "\u2128", BL = "\u0416", DL = "\u0436", qL = "\u21DD", UL = "\u{1D56B}", LL = "\u2124", OL = "\u{1D4B5}", VL = "\u{1D4CF}", NL = "\u200D", FL = "\u200C", jL = { Aacute: Al, aacute: Cl, Abreve: xl, abreve: El, ac: Ml, acd: $l, acE: kl, Acirc: Rl, acirc: Tl, acute: Bl, Acy: Dl, acy: ql, AElig: Ul, aelig: Ll, af: Ol, Afr: Vl, afr: Nl, Agrave: Fl, agrave: jl, alefsym: Gl, aleph: Hl, Alpha: zl, alpha: Kl, Amacr: Wl, amacr: Zl, amalg: Jl, amp: Ql, AMP: Xl, andand: Yl, And: eu, and: tu, andd: nu, andslope: su, andv: iu, ang: ru, ange: au, angle: ou, angmsdaa: cu, angmsdab: lu, angmsdac: uu, angmsdad: du, angmsdae: fu, angmsdaf: pu, angmsdag: gu, angmsdah: hu, angmsd: mu, angrt: _u, angrtvb: bu, angrtvbd: vu, angsph: yu, angst: wu, angzarr: Su, Aogon: Iu, aogon: Pu, Aopf: Au, aopf: Cu, apacir: xu, ap: Eu, apE: Mu, ape: $u, apid: ku, apos: Ru, ApplyFunction: Tu, approx: Bu, approxeq: Du, Aring: qu, aring: Uu, Ascr: Lu, ascr: Ou, Assign: Vu, ast: Nu, asymp: Fu, asympeq: ju, Atilde: Gu, atilde: Hu, Auml: zu, auml: Ku, awconint: Wu, awint: Zu, backcong: Ju, backepsilon: Qu, backprime: Xu, backsim: Yu, backsimeq: ed, Backslash: td, Barv: nd, barvee: sd, barwed: id, Barwed: rd, barwedge: ad, bbrk: od, bbrktbrk: cd, bcong: ld, Bcy: ud, bcy: dd, bdquo: fd, becaus: pd, because: gd, Because: hd, bemptyv: md, bepsi: _d, bernou: bd, Bernoullis: vd, Beta: yd, beta: wd, beth: Sd, between: Id, Bfr: Pd, bfr: Ad, bigcap: Cd, bigcirc: xd, bigcup: Ed, bigodot: Md, bigoplus: $d, bigotimes: kd, bigsqcup: Rd, bigstar: Td, bigtriangledown: Bd, bigtriangleup: Dd, biguplus: qd, bigvee: Ud, bigwedge: Ld, bkarow: Od, blacklozenge: Vd, blacksquare: Nd, blacktriangle: Fd, blacktriangledown: jd, blacktriangleleft: Gd, blacktriangleright: Hd, blank: zd, blk12: Kd, blk14: Wd, blk34: Zd, block: Jd, bne: Qd, bnequiv: Xd, bNot: Yd, bnot: ef, Bopf: tf, bopf: nf, bot: sf, bottom: rf, bowtie: af, boxbox: of, boxdl: cf, boxdL: lf, boxDl: uf, boxDL: df, boxdr: ff, boxdR: pf, boxDr: gf, boxDR: hf, boxh: mf, boxH: _f, boxhd: bf, boxHd: vf, boxhD: yf, boxHD: wf, boxhu: Sf, boxHu: If, boxhU: Pf, boxHU: Af, boxminus: Cf, boxplus: xf, boxtimes: Ef, boxul: Mf, boxuL: $f, boxUl: kf, boxUL: Rf, boxur: Tf, boxuR: Bf, boxUr: Df, boxUR: qf, boxv: Uf, boxV: Lf, boxvh: Of, boxvH: Vf, boxVh: Nf, boxVH: Ff, boxvl: jf, boxvL: Gf, boxVl: Hf, boxVL: zf, boxvr: Kf, boxvR: Wf, boxVr: Zf, boxVR: Jf, bprime: Qf, breve: Xf, Breve: Yf, brvbar: ep, bscr: tp, Bscr: np, bsemi: sp, bsim: ip, bsime: rp, bsolb: ap, bsol: op, bsolhsub: cp, bull: lp, bullet: up, bump: dp, bumpE: fp, bumpe: pp, Bumpeq: gp, bumpeq: hp, Cacute: mp, cacute: _p, capand: bp, capbrcup: vp, capcap: yp, cap: wp, Cap: Sp, capcup: Ip, capdot: Pp, CapitalDifferentialD: Ap, caps: Cp, caret: xp, caron: Ep, Cayleys: Mp, ccaps: $p, Ccaron: kp, ccaron: Rp, Ccedil: Tp, ccedil: Bp, Ccirc: Dp, ccirc: qp, Cconint: Up, ccups: Lp, ccupssm: Op, Cdot: Vp, cdot: Np, cedil: Fp, Cedilla: jp, cemptyv: Gp, cent: Hp, centerdot: zp, CenterDot: Kp, cfr: Wp, Cfr: Zp, CHcy: Jp, chcy: Qp, check: Xp, checkmark: Yp, Chi: eg, chi: tg, circ: ng, circeq: sg, circlearrowleft: ig, circlearrowright: rg, circledast: ag, circledcirc: og, circleddash: cg, CircleDot: lg, circledR: ug, circledS: dg, CircleMinus: fg, CirclePlus: pg, CircleTimes: gg, cir: hg, cirE: mg, cire: _g, cirfnint: bg, cirmid: vg, cirscir: yg, ClockwiseContourIntegral: wg, CloseCurlyDoubleQuote: Sg, CloseCurlyQuote: Ig, clubs: Pg, clubsuit: Ag, colon: Cg, Colon: xg, Colone: Eg, colone: Mg, coloneq: $g, comma: kg, commat: Rg, comp: Tg, compfn: Bg, complement: Dg, complexes: qg, cong: Ug, congdot: Lg, Congruent: Og, conint: Vg, Conint: Ng, ContourIntegral: Fg, copf: jg, Copf: Gg, coprod: Hg, Coproduct: zg, copy: Kg, COPY: Wg, copysr: Zg, CounterClockwiseContourIntegral: Jg, crarr: Qg, cross: Xg, Cross: Yg, Cscr: eh, cscr: th, csub: nh, csube: sh, csup: ih, csupe: rh, ctdot: ah, cudarrl: oh, cudarrr: ch, cuepr: lh, cuesc: uh, cularr: dh, cularrp: fh, cupbrcap: ph, cupcap: gh, CupCap: hh, cup: mh, Cup: _h, cupcup: bh, cupdot: vh, cupor: yh, cups: wh, curarr: Sh, curarrm: Ih, curlyeqprec: Ph, curlyeqsucc: Ah, curlyvee: Ch, curlywedge: xh, curren: Eh, curvearrowleft: Mh, curvearrowright: $h, cuvee: kh, cuwed: Rh, cwconint: Th, cwint: Bh, cylcty: Dh, dagger: qh, Dagger: Uh, daleth: Lh, darr: Oh, Darr: Vh, dArr: Nh, dash: Fh, Dashv: jh, dashv: Gh, dbkarow: Hh, dblac: zh, Dcaron: Kh, dcaron: Wh, Dcy: Zh, dcy: Jh, ddagger: Qh, ddarr: Xh, DD: Yh, dd: em, DDotrahd: tm, ddotseq: nm, deg: sm, Del: im, Delta: rm, delta: am, demptyv: om, dfisht: cm, Dfr: lm, dfr: um, dHar: dm, dharl: fm, dharr: pm, DiacriticalAcute: gm, DiacriticalDot: hm, DiacriticalDoubleAcute: mm, DiacriticalGrave: _m, DiacriticalTilde: bm, diam: vm, diamond: ym, Diamond: wm, diamondsuit: Sm, diams: Im, die: Pm, DifferentialD: Am, digamma: Cm, disin: xm, div: Em, divide: Mm, divideontimes: $m, divonx: km, DJcy: Rm, djcy: Tm, dlcorn: Bm, dlcrop: Dm, dollar: qm, Dopf: Um, dopf: Lm, Dot: Om, dot: Vm, DotDot: Nm, doteq: Fm, doteqdot: jm, DotEqual: Gm, dotminus: Hm, dotplus: zm, dotsquare: Km, doublebarwedge: Wm, DoubleContourIntegral: Zm, DoubleDot: Jm, DoubleDownArrow: Qm, DoubleLeftArrow: Xm, DoubleLeftRightArrow: Ym, DoubleLeftTee: e_, DoubleLongLeftArrow: t_, DoubleLongLeftRightArrow: n_, DoubleLongRightArrow: s_, DoubleRightArrow: i_, DoubleRightTee: r_, DoubleUpArrow: a_, DoubleUpDownArrow: o_, DoubleVerticalBar: c_, DownArrowBar: l_, downarrow: u_, DownArrow: d_, Downarrow: f_, DownArrowUpArrow: p_, DownBreve: g_, downdownarrows: h_, downharpoonleft: m_, downharpoonright: __, DownLeftRightVector: b_, DownLeftTeeVector: v_, DownLeftVectorBar: y_, DownLeftVector: w_, DownRightTeeVector: S_, DownRightVectorBar: I_, DownRightVector: P_, DownTeeArrow: A_, DownTee: C_, drbkarow: x_, drcorn: E_, drcrop: M_, Dscr: $_, dscr: k_, DScy: R_, dscy: T_, dsol: B_, Dstrok: D_, dstrok: q_, dtdot: U_, dtri: L_, dtrif: O_, duarr: V_, duhar: N_, dwangle: F_, DZcy: j_, dzcy: G_, dzigrarr: H_, Eacute: z_, eacute: K_, easter: W_, Ecaron: Z_, ecaron: J_, Ecirc: Q_, ecirc: X_, ecir: Y_, ecolon: e1, Ecy: t1, ecy: n1, eDDot: s1, Edot: i1, edot: r1, eDot: a1, ee: o1, efDot: c1, Efr: l1, efr: u1, eg: d1, Egrave: f1, egrave: p1, egs: g1, egsdot: h1, el: m1, Element: _1, elinters: b1, ell: v1, els: y1, elsdot: w1, Emacr: S1, emacr: I1, empty: P1, emptyset: A1, EmptySmallSquare: C1, emptyv: x1, EmptyVerySmallSquare: E1, emsp13: M1, emsp14: $1, emsp: k1, ENG: R1, eng: T1, ensp: B1, Eogon: D1, eogon: q1, Eopf: U1, eopf: L1, epar: O1, eparsl: V1, eplus: N1, epsi: F1, Epsilon: j1, epsilon: G1, epsiv: H1, eqcirc: z1, eqcolon: K1, eqsim: W1, eqslantgtr: Z1, eqslantless: J1, Equal: Q1, equals: X1, EqualTilde: Y1, equest: eb, Equilibrium: tb, equiv: nb, equivDD: sb, eqvparsl: ib, erarr: rb, erDot: ab, escr: ob, Escr: cb, esdot: lb, Esim: ub, esim: db, Eta: fb, eta: pb, ETH: gb, eth: hb, Euml: mb, euml: _b, euro: bb, excl: vb, exist: yb, Exists: wb, expectation: Sb, exponentiale: Ib, ExponentialE: Pb, fallingdotseq: Ab, Fcy: Cb, fcy: xb, female: Eb, ffilig: Mb, fflig: $b, ffllig: kb, Ffr: Rb, ffr: Tb, filig: Bb, FilledSmallSquare: Db, FilledVerySmallSquare: qb, fjlig: Ub, flat: Lb, fllig: Ob, fltns: Vb, fnof: Nb, Fopf: Fb, fopf: jb, forall: Gb, ForAll: Hb, fork: zb, forkv: Kb, Fouriertrf: Wb, fpartint: Zb, frac12: Jb, frac13: Qb, frac14: Xb, frac15: Yb, frac16: ev, frac18: tv, frac23: nv, frac25: sv, frac34: iv, frac35: rv, frac38: av, frac45: ov, frac56: cv, frac58: lv, frac78: uv, frasl: dv, frown: fv, fscr: pv, Fscr: gv, gacute: hv, Gamma: mv, gamma: _v, Gammad: bv, gammad: vv, gap: yv, Gbreve: wv, gbreve: Sv, Gcedil: Iv, Gcirc: Pv, gcirc: Av, Gcy: Cv, gcy: xv, Gdot: Ev, gdot: Mv, ge: $v, gE: kv, gEl: Rv, gel: Tv, geq: Bv, geqq: Dv, geqslant: qv, gescc: Uv, ges: Lv, gesdot: Ov, gesdoto: Vv, gesdotol: Nv, gesl: Fv, gesles: jv, Gfr: Gv, gfr: Hv, gg: zv, Gg: Kv, ggg: Wv, gimel: Zv, GJcy: Jv, gjcy: Qv, gla: Xv, gl: Yv, glE: ey, glj: ty, gnap: ny, gnapprox: sy, gne: iy, gnE: ry, gneq: ay, gneqq: oy, gnsim: cy, Gopf: ly, gopf: uy, grave: dy, GreaterEqual: fy, GreaterEqualLess: py, GreaterFullEqual: gy, GreaterGreater: hy, GreaterLess: my, GreaterSlantEqual: _y, GreaterTilde: by, Gscr: vy, gscr: yy, gsim: wy, gsime: Sy, gsiml: Iy, gtcc: Py, gtcir: Ay, gt: Cy, GT: xy, Gt: Ey, gtdot: My, gtlPar: $y, gtquest: ky, gtrapprox: Ry, gtrarr: Ty, gtrdot: By, gtreqless: Dy, gtreqqless: qy, gtrless: Uy, gtrsim: Ly, gvertneqq: Oy, gvnE: Vy, Hacek: Ny, hairsp: Fy, half: jy, hamilt: Gy, HARDcy: Hy, hardcy: zy, harrcir: Ky, harr: Wy, hArr: Zy, harrw: Jy, Hat: Qy, hbar: Xy, Hcirc: Yy, hcirc: e0, hearts: t0, heartsuit: n0, hellip: s0, hercon: i0, hfr: r0, Hfr: a0, HilbertSpace: o0, hksearow: c0, hkswarow: l0, hoarr: u0, homtht: d0, hookleftarrow: f0, hookrightarrow: p0, hopf: g0, Hopf: h0, horbar: m0, HorizontalLine: _0, hscr: b0, Hscr: v0, hslash: y0, Hstrok: w0, hstrok: S0, HumpDownHump: I0, HumpEqual: P0, hybull: A0, hyphen: C0, Iacute: x0, iacute: E0, ic: M0, Icirc: $0, icirc: k0, Icy: R0, icy: T0, Idot: B0, IEcy: D0, iecy: q0, iexcl: U0, iff: L0, ifr: O0, Ifr: V0, Igrave: N0, igrave: F0, ii: j0, iiiint: G0, iiint: H0, iinfin: z0, iiota: K0, IJlig: W0, ijlig: Z0, Imacr: J0, imacr: Q0, image: X0, ImaginaryI: Y0, imagline: ew, imagpart: tw, imath: nw, Im: sw, imof: iw, imped: rw, Implies: aw, incare: ow, in: "\u2208", infin: cw, infintie: lw, inodot: uw, intcal: dw, int: fw, Int: pw, integers: gw, Integral: hw, intercal: mw, Intersection: _w, intlarhk: bw, intprod: vw, InvisibleComma: yw, InvisibleTimes: ww, IOcy: Sw, iocy: Iw, Iogon: Pw, iogon: Aw, Iopf: Cw, iopf: xw, Iota: Ew, iota: Mw, iprod: $w, iquest: kw, iscr: Rw, Iscr: Tw, isin: Bw, isindot: Dw, isinE: qw, isins: Uw, isinsv: Lw, isinv: Ow, it: Vw, Itilde: Nw, itilde: Fw, Iukcy: jw, iukcy: Gw, Iuml: Hw, iuml: zw, Jcirc: Kw, jcirc: Ww, Jcy: Zw, jcy: Jw, Jfr: Qw, jfr: Xw, jmath: Yw, Jopf: eS, jopf: tS, Jscr: nS, jscr: sS, Jsercy: iS, jsercy: rS, Jukcy: aS, jukcy: oS, Kappa: cS, kappa: lS, kappav: uS, Kcedil: dS, kcedil: fS, Kcy: pS, kcy: gS, Kfr: hS, kfr: mS, kgreen: _S, KHcy: bS, khcy: vS, KJcy: yS, kjcy: wS, Kopf: SS, kopf: IS, Kscr: PS, kscr: AS, lAarr: CS, Lacute: xS, lacute: ES, laemptyv: MS, lagran: $S, Lambda: kS, lambda: RS, lang: TS, Lang: BS, langd: DS, langle: qS, lap: US, Laplacetrf: LS, laquo: OS, larrb: VS, larrbfs: NS, larr: FS, Larr: jS, lArr: GS, larrfs: HS, larrhk: zS, larrlp: KS, larrpl: WS, larrsim: ZS, larrtl: JS, latail: QS, lAtail: XS, lat: YS, late: eI, lates: tI, lbarr: nI, lBarr: sI, lbbrk: iI, lbrace: rI, lbrack: aI, lbrke: oI, lbrksld: cI, lbrkslu: lI, Lcaron: uI, lcaron: dI, Lcedil: fI, lcedil: pI, lceil: gI, lcub: hI, Lcy: mI, lcy: _I, ldca: bI, ldquo: vI, ldquor: yI, ldrdhar: wI, ldrushar: SI, ldsh: II, le: PI, lE: AI, LeftAngleBracket: CI, LeftArrowBar: xI, leftarrow: EI, LeftArrow: MI, Leftarrow: $I, LeftArrowRightArrow: kI, leftarrowtail: RI, LeftCeiling: TI, LeftDoubleBracket: BI, LeftDownTeeVector: DI, LeftDownVectorBar: qI, LeftDownVector: UI, LeftFloor: LI, leftharpoondown: OI, leftharpoonup: VI, leftleftarrows: NI, leftrightarrow: FI, LeftRightArrow: jI, Leftrightarrow: GI, leftrightarrows: HI, leftrightharpoons: zI, leftrightsquigarrow: KI, LeftRightVector: WI, LeftTeeArrow: ZI, LeftTee: JI, LeftTeeVector: QI, leftthreetimes: XI, LeftTriangleBar: YI, LeftTriangle: eP, LeftTriangleEqual: tP, LeftUpDownVector: nP, LeftUpTeeVector: sP, LeftUpVectorBar: iP, LeftUpVector: rP, LeftVectorBar: aP, LeftVector: oP, lEg: cP, leg: lP, leq: uP, leqq: dP, leqslant: fP, lescc: pP, les: gP, lesdot: hP, lesdoto: mP, lesdotor: _P, lesg: bP, lesges: vP, lessapprox: yP, lessdot: wP, lesseqgtr: SP, lesseqqgtr: IP, LessEqualGreater: PP, LessFullEqual: AP, LessGreater: CP, lessgtr: xP, LessLess: EP, lesssim: MP, LessSlantEqual: $P, LessTilde: kP, lfisht: RP, lfloor: TP, Lfr: BP, lfr: DP, lg: qP, lgE: UP, lHar: LP, lhard: OP, lharu: VP, lharul: NP, lhblk: FP, LJcy: jP, ljcy: GP, llarr: HP, ll: zP, Ll: KP, llcorner: WP, Lleftarrow: ZP, llhard: JP, lltri: QP, Lmidot: XP, lmidot: YP, lmoustache: eA, lmoust: tA, lnap: nA, lnapprox: sA, lne: iA, lnE: rA, lneq: aA, lneqq: oA, lnsim: cA, loang: lA, loarr: uA, lobrk: dA, longleftarrow: fA, LongLeftArrow: pA, Longleftarrow: gA, longleftrightarrow: hA, LongLeftRightArrow: mA, Longleftrightarrow: _A, longmapsto: bA, longrightarrow: vA, LongRightArrow: yA, Longrightarrow: wA, looparrowleft: SA, looparrowright: IA, lopar: PA, Lopf: AA, lopf: CA, loplus: xA, lotimes: EA, lowast: MA, lowbar: $A, LowerLeftArrow: kA, LowerRightArrow: RA, loz: TA, lozenge: BA, lozf: DA, lpar: qA, lparlt: UA, lrarr: LA, lrcorner: OA, lrhar: VA, lrhard: NA, lrm: FA, lrtri: jA, lsaquo: GA, lscr: HA, Lscr: zA, lsh: KA, Lsh: WA, lsim: ZA, lsime: JA, lsimg: QA, lsqb: XA, lsquo: YA, lsquor: eC, Lstrok: tC, lstrok: nC, ltcc: sC, ltcir: iC, lt: rC, LT: aC, Lt: oC, ltdot: cC, lthree: lC, ltimes: uC, ltlarr: dC, ltquest: fC, ltri: pC, ltrie: gC, ltrif: hC, ltrPar: mC, lurdshar: _C, luruhar: bC, lvertneqq: vC, lvnE: yC, macr: wC, male: SC, malt: IC, maltese: PC, Map: "\u2905", map: AC, mapsto: CC, mapstodown: xC, mapstoleft: EC, mapstoup: MC, marker: $C, mcomma: kC, Mcy: RC, mcy: TC, mdash: BC, mDDot: DC, measuredangle: qC, MediumSpace: UC, Mellintrf: LC, Mfr: OC, mfr: VC, mho: NC, micro: FC, midast: jC, midcir: GC, mid: HC, middot: zC, minusb: KC, minus: WC, minusd: ZC, minusdu: JC, MinusPlus: QC, mlcp: XC, mldr: YC, mnplus: e2, models: t2, Mopf: n2, mopf: s2, mp: i2, mscr: r2, Mscr: a2, mstpos: o2, Mu: c2, mu: l2, multimap: u2, mumap: d2, nabla: f2, Nacute: p2, nacute: g2, nang: h2, nap: m2, napE: _2, napid: b2, napos: v2, napprox: y2, natural: w2, naturals: S2, natur: I2, nbsp: P2, nbump: A2, nbumpe: C2, ncap: x2, Ncaron: E2, ncaron: M2, Ncedil: $2, ncedil: k2, ncong: R2, ncongdot: T2, ncup: B2, Ncy: D2, ncy: q2, ndash: U2, nearhk: L2, nearr: O2, neArr: V2, nearrow: N2, ne: F2, nedot: j2, NegativeMediumSpace: G2, NegativeThickSpace: H2, NegativeThinSpace: z2, NegativeVeryThinSpace: K2, nequiv: W2, nesear: Z2, nesim: J2, NestedGreaterGreater: Q2, NestedLessLess: X2, NewLine: Y2, nexist: ex, nexists: tx, Nfr: nx, nfr: sx, ngE: ix, nge: rx, ngeq: ax, ngeqq: ox, ngeqslant: cx, nges: lx, nGg: ux, ngsim: dx, nGt: fx, ngt: px, ngtr: gx, nGtv: hx, nharr: mx, nhArr: _x, nhpar: bx, ni: vx, nis: yx, nisd: wx, niv: Sx, NJcy: Ix, njcy: Px, nlarr: Ax, nlArr: Cx, nldr: xx, nlE: Ex, nle: Mx, nleftarrow: $x, nLeftarrow: kx, nleftrightarrow: Rx, nLeftrightarrow: Tx, nleq: Bx, nleqq: Dx, nleqslant: qx, nles: Ux, nless: Lx, nLl: Ox, nlsim: Vx, nLt: Nx, nlt: Fx, nltri: jx, nltrie: Gx, nLtv: Hx, nmid: zx, NoBreak: Kx, NonBreakingSpace: Wx, nopf: Zx, Nopf: Jx, Not: Qx, not: Xx, NotCongruent: Yx, NotCupCap: eE, NotDoubleVerticalBar: tE, NotElement: nE, NotEqual: sE, NotEqualTilde: iE, NotExists: rE, NotGreater: aE, NotGreaterEqual: oE, NotGreaterFullEqual: cE, NotGreaterGreater: lE, NotGreaterLess: uE, NotGreaterSlantEqual: dE, NotGreaterTilde: fE, NotHumpDownHump: pE, NotHumpEqual: gE, notin: hE, notindot: mE, notinE: _E, notinva: bE, notinvb: vE, notinvc: yE, NotLeftTriangleBar: wE, NotLeftTriangle: SE, NotLeftTriangleEqual: IE, NotLess: PE, NotLessEqual: AE, NotLessGreater: CE, NotLessLess: xE, NotLessSlantEqual: EE, NotLessTilde: ME, NotNestedGreaterGreater: $E, NotNestedLessLess: kE, notni: RE, notniva: TE, notnivb: BE, notnivc: DE, NotPrecedes: qE, NotPrecedesEqual: UE, NotPrecedesSlantEqual: LE, NotReverseElement: OE, NotRightTriangleBar: VE, NotRightTriangle: NE, NotRightTriangleEqual: FE, NotSquareSubset: jE, NotSquareSubsetEqual: GE, NotSquareSuperset: HE, NotSquareSupersetEqual: zE, NotSubset: KE, NotSubsetEqual: WE, NotSucceeds: ZE, NotSucceedsEqual: JE, NotSucceedsSlantEqual: QE, NotSucceedsTilde: XE, NotSuperset: YE, NotSupersetEqual: eM, NotTilde: tM, NotTildeEqual: nM, NotTildeFullEqual: sM, NotTildeTilde: iM, NotVerticalBar: rM, nparallel: aM, npar: oM, nparsl: cM, npart: lM, npolint: uM, npr: dM, nprcue: fM, nprec: pM, npreceq: gM, npre: hM, nrarrc: mM, nrarr: _M, nrArr: bM, nrarrw: vM, nrightarrow: yM, nRightarrow: wM, nrtri: SM, nrtrie: IM, nsc: PM, nsccue: AM, nsce: CM, Nscr: xM, nscr: EM, nshortmid: MM, nshortparallel: $M, nsim: kM, nsime: RM, nsimeq: TM, nsmid: BM, nspar: DM, nsqsube: qM, nsqsupe: UM, nsub: LM, nsubE: OM, nsube: VM, nsubset: NM, nsubseteq: FM, nsubseteqq: jM, nsucc: GM, nsucceq: HM, nsup: zM, nsupE: KM, nsupe: WM, nsupset: ZM, nsupseteq: JM, nsupseteqq: QM, ntgl: XM, Ntilde: YM, ntilde: e$, ntlg: t$, ntriangleleft: n$, ntrianglelefteq: s$, ntriangleright: i$, ntrianglerighteq: r$, Nu: a$, nu: o$, num: c$, numero: l$, numsp: u$, nvap: d$, nvdash: f$, nvDash: p$, nVdash: g$, nVDash: h$, nvge: m$, nvgt: _$, nvHarr: b$, nvinfin: v$, nvlArr: y$, nvle: w$, nvlt: S$, nvltrie: I$, nvrArr: P$, nvrtrie: A$, nvsim: C$, nwarhk: x$, nwarr: E$, nwArr: M$, nwarrow: $$, nwnear: k$, Oacute: R$, oacute: T$, oast: B$, Ocirc: D$, ocirc: q$, ocir: U$, Ocy: L$, ocy: O$, odash: V$, Odblac: N$, odblac: F$, odiv: j$, odot: G$, odsold: H$, OElig: z$, oelig: K$, ofcir: W$, Ofr: Z$, ofr: J$, ogon: Q$, Ograve: X$, ograve: Y$, ogt: ek, ohbar: tk, ohm: nk, oint: sk, olarr: ik, olcir: rk, olcross: ak, oline: ok, olt: ck, Omacr: lk, omacr: uk, Omega: dk, omega: fk, Omicron: pk, omicron: gk, omid: hk, ominus: mk, Oopf: _k, oopf: bk, opar: vk, OpenCurlyDoubleQuote: yk, OpenCurlyQuote: wk, operp: Sk, oplus: Ik, orarr: Pk, Or: Ak, or: Ck, ord: xk, order: Ek, orderof: Mk, ordf: $k, ordm: kk, origof: Rk, oror: Tk, orslope: Bk, orv: Dk, oS: qk, Oscr: Uk, oscr: Lk, Oslash: Ok, oslash: Vk, osol: Nk, Otilde: Fk, otilde: jk, otimesas: Gk, Otimes: Hk, otimes: zk, Ouml: Kk, ouml: Wk, ovbar: Zk, OverBar: Jk, OverBrace: Qk, OverBracket: Xk, OverParenthesis: Yk, para: e3, parallel: t3, par: n3, parsim: s3, parsl: i3, part: r3, PartialD: a3, Pcy: o3, pcy: c3, percnt: l3, period: u3, permil: d3, perp: f3, pertenk: p3, Pfr: g3, pfr: h3, Phi: m3, phi: _3, phiv: b3, phmmat: v3, phone: y3, Pi: w3, pi: S3, pitchfork: I3, piv: P3, planck: A3, planckh: C3, plankv: x3, plusacir: E3, plusb: M3, pluscir: $3, plus: k3, plusdo: R3, plusdu: T3, pluse: B3, PlusMinus: D3, plusmn: q3, plussim: U3, plustwo: L3, pm: O3, Poincareplane: V3, pointint: N3, popf: F3, Popf: j3, pound: G3, prap: H3, Pr: z3, pr: K3, prcue: W3, precapprox: Z3, prec: J3, preccurlyeq: Q3, Precedes: X3, PrecedesEqual: Y3, PrecedesSlantEqual: eR, PrecedesTilde: tR, preceq: nR, precnapprox: sR, precneqq: iR, precnsim: rR, pre: aR, prE: oR, precsim: cR, prime: lR, Prime: uR, primes: dR, prnap: fR, prnE: pR, prnsim: gR, prod: hR, Product: mR, profalar: _R, profline: bR, profsurf: vR, prop: yR, Proportional: wR, Proportion: SR, propto: IR, prsim: PR, prurel: AR, Pscr: CR, pscr: xR, Psi: ER, psi: MR, puncsp: $R, Qfr: kR, qfr: RR, qint: TR, qopf: BR, Qopf: DR, qprime: qR, Qscr: UR, qscr: LR, quaternions: OR, quatint: VR, quest: NR, questeq: FR, quot: jR, QUOT: GR, rAarr: HR, race: zR, Racute: KR, racute: WR, radic: ZR, raemptyv: JR, rang: QR, Rang: XR, rangd: YR, range: e4, rangle: t4, raquo: n4, rarrap: s4, rarrb: i4, rarrbfs: r4, rarrc: a4, rarr: o4, Rarr: c4, rArr: l4, rarrfs: u4, rarrhk: d4, rarrlp: f4, rarrpl: p4, rarrsim: g4, Rarrtl: h4, rarrtl: m4, rarrw: _4, ratail: b4, rAtail: v4, ratio: y4, rationals: w4, rbarr: S4, rBarr: I4, RBarr: P4, rbbrk: A4, rbrace: C4, rbrack: x4, rbrke: E4, rbrksld: M4, rbrkslu: $4, Rcaron: k4, rcaron: R4, Rcedil: T4, rcedil: B4, rceil: D4, rcub: q4, Rcy: U4, rcy: L4, rdca: O4, rdldhar: V4, rdquo: N4, rdquor: F4, rdsh: j4, real: G4, realine: H4, realpart: z4, reals: K4, Re: W4, rect: Z4, reg: J4, REG: Q4, ReverseElement: X4, ReverseEquilibrium: Y4, ReverseUpEquilibrium: eT, rfisht: tT, rfloor: nT, rfr: sT, Rfr: iT, rHar: rT, rhard: aT, rharu: oT, rharul: cT, Rho: lT, rho: uT, rhov: dT, RightAngleBracket: fT, RightArrowBar: pT, rightarrow: gT, RightArrow: hT, Rightarrow: mT, RightArrowLeftArrow: _T, rightarrowtail: bT, RightCeiling: vT, RightDoubleBracket: yT, RightDownTeeVector: wT, RightDownVectorBar: ST, RightDownVector: IT, RightFloor: PT, rightharpoondown: AT, rightharpoonup: CT, rightleftarrows: xT, rightleftharpoons: ET, rightrightarrows: MT, rightsquigarrow: $T, RightTeeArrow: kT, RightTee: RT, RightTeeVector: TT, rightthreetimes: BT, RightTriangleBar: DT, RightTriangle: qT, RightTriangleEqual: UT, RightUpDownVector: LT, RightUpTeeVector: OT, RightUpVectorBar: VT, RightUpVector: NT, RightVectorBar: FT, RightVector: jT, ring: GT, risingdotseq: HT, rlarr: zT, rlhar: KT, rlm: WT, rmoustache: ZT, rmoust: JT, rnmid: QT, roang: XT, roarr: YT, robrk: e5, ropar: t5, ropf: n5, Ropf: s5, roplus: i5, rotimes: r5, RoundImplies: a5, rpar: o5, rpargt: c5, rppolint: l5, rrarr: u5, Rrightarrow: d5, rsaquo: f5, rscr: p5, Rscr: g5, rsh: h5, Rsh: m5, rsqb: _5, rsquo: b5, rsquor: v5, rthree: y5, rtimes: w5, rtri: S5, rtrie: I5, rtrif: P5, rtriltri: A5, RuleDelayed: C5, ruluhar: x5, rx: E5, Sacute: M5, sacute: $5, sbquo: k5, scap: R5, Scaron: T5, scaron: B5, Sc: D5, sc: q5, sccue: U5, sce: L5, scE: O5, Scedil: V5, scedil: N5, Scirc: F5, scirc: j5, scnap: G5, scnE: H5, scnsim: z5, scpolint: K5, scsim: W5, Scy: Z5, scy: J5, sdotb: Q5, sdot: X5, sdote: Y5, searhk: e8, searr: t8, seArr: n8, searrow: s8, sect: i8, semi: r8, seswar: a8, setminus: o8, setmn: c8, sext: l8, Sfr: u8, sfr: d8, sfrown: f8, sharp: p8, SHCHcy: g8, shchcy: h8, SHcy: m8, shcy: _8, ShortDownArrow: b8, ShortLeftArrow: v8, shortmid: y8, shortparallel: w8, ShortRightArrow: S8, ShortUpArrow: I8, shy: P8, Sigma: A8, sigma: C8, sigmaf: x8, sigmav: E8, sim: M8, simdot: $8, sime: k8, simeq: R8, simg: T8, simgE: B8, siml: D8, simlE: q8, simne: U8, simplus: L8, simrarr: O8, slarr: V8, SmallCircle: N8, smallsetminus: F8, smashp: j8, smeparsl: G8, smid: H8, smile: z8, smt: K8, smte: W8, smtes: Z8, SOFTcy: J8, softcy: Q8, solbar: X8, solb: Y8, sol: e6, Sopf: t6, sopf: n6, spades: s6, spadesuit: i6, spar: r6, sqcap: a6, sqcaps: o6, sqcup: c6, sqcups: l6, Sqrt: u6, sqsub: d6, sqsube: f6, sqsubset: p6, sqsubseteq: g6, sqsup: h6, sqsupe: m6, sqsupset: _6, sqsupseteq: b6, square: v6, Square: y6, SquareIntersection: w6, SquareSubset: S6, SquareSubsetEqual: I6, SquareSuperset: P6, SquareSupersetEqual: A6, SquareUnion: C6, squarf: x6, squ: E6, squf: M6, srarr: $6, Sscr: k6, sscr: R6, ssetmn: T6, ssmile: B6, sstarf: D6, Star: q6, star: U6, starf: L6, straightepsilon: O6, straightphi: V6, strns: N6, sub: F6, Sub: j6, subdot: G6, subE: H6, sube: z6, subedot: K6, submult: W6, subnE: Z6, subne: J6, subplus: Q6, subrarr: X6, subset: Y6, Subset: eB, subseteq: tB, subseteqq: nB, SubsetEqual: sB, subsetneq: iB, subsetneqq: rB, subsim: aB, subsub: oB, subsup: cB, succapprox: lB, succ: uB, succcurlyeq: dB, Succeeds: fB, SucceedsEqual: pB, SucceedsSlantEqual: gB, SucceedsTilde: hB, succeq: mB, succnapprox: _B, succneqq: bB, succnsim: vB, succsim: yB, SuchThat: wB, sum: SB, Sum: IB, sung: PB, sup1: AB, sup2: CB, sup3: xB, sup: EB, Sup: MB, supdot: $B, supdsub: kB, supE: RB, supe: TB, supedot: BB, Superset: DB, SupersetEqual: qB, suphsol: UB, suphsub: LB, suplarr: OB, supmult: VB, supnE: NB, supne: FB, supplus: jB, supset: GB, Supset: HB, supseteq: zB, supseteqq: KB, supsetneq: WB, supsetneqq: ZB, supsim: JB, supsub: QB, supsup: XB, swarhk: YB, swarr: eD, swArr: tD, swarrow: nD, swnwar: sD, szlig: iD, Tab: rD, target: aD, Tau: oD, tau: cD, tbrk: lD, Tcaron: uD, tcaron: dD, Tcedil: fD, tcedil: pD, Tcy: gD, tcy: hD, tdot: mD, telrec: _D, Tfr: bD, tfr: vD, there4: yD, therefore: wD, Therefore: SD, Theta: ID, theta: PD, thetasym: AD, thetav: CD, thickapprox: xD, thicksim: ED, ThickSpace: MD, ThinSpace: $D, thinsp: kD, thkap: RD, thksim: TD, THORN: BD, thorn: DD, tilde: qD, Tilde: UD, TildeEqual: LD, TildeFullEqual: OD, TildeTilde: VD, timesbar: ND, timesb: FD, times: jD, timesd: GD, tint: HD, toea: zD, topbot: KD, topcir: WD, top: ZD, Topf: JD, topf: QD, topfork: XD, tosa: YD, tprime: eq, trade: tq, TRADE: nq, triangle: sq, triangledown: iq, triangleleft: rq, trianglelefteq: aq, triangleq: oq, triangleright: cq, trianglerighteq: lq, tridot: uq, trie: dq, triminus: fq, TripleDot: pq, triplus: gq, trisb: hq, tritime: mq, trpezium: _q, Tscr: bq, tscr: vq, TScy: yq, tscy: wq, TSHcy: Sq, tshcy: Iq, Tstrok: Pq, tstrok: Aq, twixt: Cq, twoheadleftarrow: xq, twoheadrightarrow: Eq, Uacute: Mq, uacute: $q, uarr: kq, Uarr: Rq, uArr: Tq, Uarrocir: Bq, Ubrcy: Dq, ubrcy: qq, Ubreve: Uq, ubreve: Lq, Ucirc: Oq, ucirc: Vq, Ucy: Nq, ucy: Fq, udarr: jq, Udblac: Gq, udblac: Hq, udhar: zq, ufisht: Kq, Ufr: Wq, ufr: Zq, Ugrave: Jq, ugrave: Qq, uHar: Xq, uharl: Yq, uharr: e7, uhblk: t7, ulcorn: n7, ulcorner: s7, ulcrop: i7, ultri: r7, Umacr: a7, umacr: o7, uml: c7, UnderBar: l7, UnderBrace: u7, UnderBracket: d7, UnderParenthesis: f7, Union: p7, UnionPlus: g7, Uogon: h7, uogon: m7, Uopf: _7, uopf: b7, UpArrowBar: v7, uparrow: y7, UpArrow: w7, Uparrow: S7, UpArrowDownArrow: I7, updownarrow: P7, UpDownArrow: A7, Updownarrow: C7, UpEquilibrium: x7, upharpoonleft: E7, upharpoonright: M7, uplus: $7, UpperLeftArrow: k7, UpperRightArrow: R7, upsi: T7, Upsi: B7, upsih: D7, Upsilon: q7, upsilon: U7, UpTeeArrow: L7, UpTee: O7, upuparrows: V7, urcorn: N7, urcorner: F7, urcrop: j7, Uring: G7, uring: H7, urtri: z7, Uscr: K7, uscr: W7, utdot: Z7, Utilde: J7, utilde: Q7, utri: X7, utrif: Y7, uuarr: e9, Uuml: t9, uuml: n9, uwangle: s9, vangrt: i9, varepsilon: r9, varkappa: a9, varnothing: o9, varphi: c9, varpi: l9, varpropto: u9, varr: d9, vArr: f9, varrho: p9, varsigma: g9, varsubsetneq: h9, varsubsetneqq: m9, varsupsetneq: _9, varsupsetneqq: b9, vartheta: v9, vartriangleleft: y9, vartriangleright: w9, vBar: S9, Vbar: I9, vBarv: P9, Vcy: A9, vcy: C9, vdash: x9, vDash: E9, Vdash: M9, VDash: $9, Vdashl: k9, veebar: R9, vee: T9, Vee: B9, veeeq: D9, vellip: q9, verbar: U9, Verbar: L9, vert: O9, Vert: V9, VerticalBar: N9, VerticalLine: F9, VerticalSeparator: j9, VerticalTilde: G9, VeryThinSpace: H9, Vfr: z9, vfr: K9, vltri: W9, vnsub: Z9, vnsup: J9, Vopf: Q9, vopf: X9, vprop: Y9, vrtri: eU, Vscr: tU, vscr: nU, vsubnE: sU, vsubne: iU, vsupnE: rU, vsupne: aU, Vvdash: oU, vzigzag: cU, Wcirc: lU, wcirc: uU, wedbar: dU, wedge: fU, Wedge: pU, wedgeq: gU, weierp: hU, Wfr: mU, wfr: _U, Wopf: bU, wopf: vU, wp: yU, wr: wU, wreath: SU, Wscr: IU, wscr: PU, xcap: AU, xcirc: CU, xcup: xU, xdtri: EU, Xfr: MU, xfr: $U, xharr: kU, xhArr: RU, Xi: TU, xi: BU, xlarr: DU, xlArr: qU, xmap: UU, xnis: LU, xodot: OU, Xopf: VU, xopf: NU, xoplus: FU, xotime: jU, xrarr: GU, xrArr: HU, Xscr: zU, xscr: KU, xsqcup: WU, xuplus: ZU, xutri: JU, xvee: QU, xwedge: XU, Yacute: YU, yacute: eL, YAcy: tL, yacy: nL, Ycirc: sL, ycirc: iL, Ycy: rL, ycy: aL, yen: oL, Yfr: cL, yfr: lL, YIcy: uL, yicy: dL, Yopf: fL, yopf: pL, Yscr: gL, yscr: hL, YUcy: mL, yucy: _L, yuml: bL, Yuml: vL, Zacute: yL, zacute: wL, Zcaron: SL, zcaron: IL, Zcy: PL, zcy: AL, Zdot: CL, zdot: xL, zeetrf: EL, ZeroWidthSpace: ML, Zeta: $L, zeta: kL, zfr: RL, Zfr: TL, ZHcy: BL, zhcy: DL, zigrarr: qL, zopf: UL, Zopf: LL, Zscr: OL, zscr: VL, zwj: NL, zwnj: FL }, GL = "\xC1", HL = "\xE1", zL = "\xC2", KL = "\xE2", WL = "\xB4", ZL = "\xC6", JL = "\xE6", QL = "\xC0", XL = "\xE0", YL = "&", eO = "&", tO = "\xC5", nO = "\xE5", sO = "\xC3", iO = "\xE3", rO = "\xC4", aO = "\xE4", oO = "\xA6", cO = "\xC7", lO = "\xE7", uO = "\xB8", dO = "\xA2", fO = "\xA9", pO = "\xA9", gO = "\xA4", hO = "\xB0", mO = "\xF7", _O = "\xC9", bO = "\xE9", vO = "\xCA", yO = "\xEA", wO = "\xC8", SO = "\xE8", IO = "\xD0", PO = "\xF0", AO = "\xCB", CO = "\xEB", xO = "\xBD", EO = "\xBC", MO = "\xBE", $O = ">", kO = ">", RO = "\xCD", TO = "\xED", BO = "\xCE", DO = "\xEE", qO = "\xA1", UO = "\xCC", LO = "\xEC", OO = "\xBF", VO = "\xCF", NO = "\xEF", FO = "\xAB", jO = "<", GO = "<", HO = "\xAF", zO = "\xB5", KO = "\xB7", WO = "\xA0", ZO = "\xAC", JO = "\xD1", QO = "\xF1", XO = "\xD3", YO = "\xF3", eV = "\xD4", tV = "\xF4", nV = "\xD2", sV = "\xF2", iV = "\xAA", rV = "\xBA", aV = "\xD8", oV = "\xF8", cV = "\xD5", lV = "\xF5", uV = "\xD6", dV = "\xF6", fV = "\xB6", pV = "\xB1", gV = "\xA3", hV = '"', mV = '"', _V = "\xBB", bV = "\xAE", vV = "\xAE", yV = "\xA7", wV = "\xAD", SV = "\xB9", IV = "\xB2", PV = "\xB3", AV = "\xDF", CV = "\xDE", xV = "\xFE", EV = "\xD7", MV = "\xDA", $V = "\xFA", kV = "\xDB", RV = "\xFB", TV = "\xD9", BV = "\xF9", DV = "\xA8", qV = "\xDC", UV = "\xFC", LV = "\xDD", OV = "\xFD", VV = "\xA5", NV = "\xFF", FV = { Aacute: GL, aacute: HL, Acirc: zL, acirc: KL, acute: WL, AElig: ZL, aelig: JL, Agrave: QL, agrave: XL, amp: YL, AMP: eO, Aring: tO, aring: nO, Atilde: sO, atilde: iO, Auml: rO, auml: aO, brvbar: oO, Ccedil: cO, ccedil: lO, cedil: uO, cent: dO, copy: fO, COPY: pO, curren: gO, deg: hO, divide: mO, Eacute: _O, eacute: bO, Ecirc: vO, ecirc: yO, Egrave: wO, egrave: SO, ETH: IO, eth: PO, Euml: AO, euml: CO, frac12: xO, frac14: EO, frac34: MO, gt: $O, GT: kO, Iacute: RO, iacute: TO, Icirc: BO, icirc: DO, iexcl: qO, Igrave: UO, igrave: LO, iquest: OO, Iuml: VO, iuml: NO, laquo: FO, lt: jO, LT: GO, macr: HO, micro: zO, middot: KO, nbsp: WO, not: ZO, Ntilde: JO, ntilde: QO, Oacute: XO, oacute: YO, Ocirc: eV, ocirc: tV, Ograve: nV, ograve: sV, ordf: iV, ordm: rV, Oslash: aV, oslash: oV, Otilde: cV, otilde: lV, Ouml: uV, ouml: dV, para: fV, plusmn: pV, pound: gV, quot: hV, QUOT: mV, raquo: _V, reg: bV, REG: vV, sect: yV, shy: wV, sup1: SV, sup2: IV, sup3: PV, szlig: AV, THORN: CV, thorn: xV, times: EV, Uacute: MV, uacute: $V, Ucirc: kV, ucirc: RV, Ugrave: TV, ugrave: BV, uml: DV, Uuml: qV, uuml: UV, Yacute: LV, yacute: OV, yen: VV, yuml: NV }, jV = "&", GV = "'", HV = ">", zV = "<", KV = '"', WV = { amp: jV, apos: GV, gt: HV, lt: zV, quot: KV };
var _r;
function oc() {
  if (_r) return Sn;
  _r = 1;
  var t = Sn && Sn.__importDefault || function(F) {
    return F && F.__esModule ? F : { default: F };
  };
  Object.defineProperty(Sn, "__esModule", { value: true });
  var d = t(Pl()), g = t(jL), i = t(FV), l = t(WV);
  function r(F) {
    return F === " " || F === `
` || F === "	" || F === "\f" || F === "\r";
  }
  function e(F) {
    return F >= "a" && F <= "z" || F >= "A" && F <= "Z";
  }
  function s(F, R, ee) {
    var Y = F.toLowerCase();
    return F === Y ? function(Q, se) {
      se === Y ? Q._state = R : (Q._state = ee, Q._index--);
    } : function(Q, se) {
      se === Y || se === F ? Q._state = R : (Q._state = ee, Q._index--);
    };
  }
  function n(F, R) {
    var ee = F.toLowerCase();
    return function(Y, Q) {
      Q === ee || Q === F ? Y._state = R : (Y._state = 3, Y._index--);
    };
  }
  var a = s("C", 24, 16), o = s("D", 25, 16), c = s("A", 26, 16), u = s("T", 27, 16), _ = s("A", 28, 16), S = n("R", 35), $ = n("I", 36), m = n("P", 37), h = n("T", 38), I = s("R", 40, 1), b = s("I", 41, 1), f = s("P", 42, 1), p = s("T", 43, 1), w = n("Y", 45), M = n("L", 46), T = n("E", 47), k = s("Y", 49, 1), B = s("L", 50, 1), C = s("E", 51, 1), E = n("I", 54), q = n("T", 55), W = n("L", 56), G = n("E", 57), te = s("I", 58, 1), oe = s("T", 59, 1), he = s("L", 60, 1), H = s("E", 61, 1), U = s("#", 63, 64), V = s("X", 66, 65), K = (function() {
    function F(R, ee) {
      var Y;
      this._state = 1, this.buffer = "", this.sectionStart = 0, this._index = 0, this.bufferOffset = 0, this.baseState = 1, this.special = 1, this.running = true, this.ended = false, this.cbs = ee, this.xmlMode = !!(R == null ? void 0 : R.xmlMode), this.decodeEntities = (Y = R == null ? void 0 : R.decodeEntities) !== null && Y !== void 0 ? Y : true;
    }
    return F.prototype.reset = function() {
      this._state = 1, this.buffer = "", this.sectionStart = 0, this._index = 0, this.bufferOffset = 0, this.baseState = 1, this.special = 1, this.running = true, this.ended = false;
    }, F.prototype.write = function(R) {
      this.ended && this.cbs.onerror(Error(".write() after done!")), this.buffer += R, this.parse();
    }, F.prototype.end = function(R) {
      this.ended && this.cbs.onerror(Error(".end() after done!")), R && this.write(R), this.ended = true, this.running && this.finish();
    }, F.prototype.pause = function() {
      this.running = false;
    }, F.prototype.resume = function() {
      this.running = true, this._index < this.buffer.length && this.parse(), this.ended && this.finish();
    }, F.prototype.getAbsoluteIndex = function() {
      return this.bufferOffset + this._index;
    }, F.prototype.stateText = function(R) {
      R === "<" ? (this._index > this.sectionStart && this.cbs.ontext(this.getSection()), this._state = 2, this.sectionStart = this._index) : this.decodeEntities && R === "&" && (this.special === 1 || this.special === 4) && (this._index > this.sectionStart && this.cbs.ontext(this.getSection()), this.baseState = 1, this._state = 62, this.sectionStart = this._index);
    }, F.prototype.isTagStartChar = function(R) {
      return e(R) || this.xmlMode && !r(R) && R !== "/" && R !== ">";
    }, F.prototype.stateBeforeTagName = function(R) {
      R === "/" ? this._state = 5 : R === "<" ? (this.cbs.ontext(this.getSection()), this.sectionStart = this._index) : R === ">" || this.special !== 1 || r(R) ? this._state = 1 : R === "!" ? (this._state = 15, this.sectionStart = this._index + 1) : R === "?" ? (this._state = 17, this.sectionStart = this._index + 1) : this.isTagStartChar(R) ? (this._state = !this.xmlMode && (R === "s" || R === "S") ? 32 : !this.xmlMode && (R === "t" || R === "T") ? 52 : 3, this.sectionStart = this._index) : this._state = 1;
    }, F.prototype.stateInTagName = function(R) {
      (R === "/" || R === ">" || r(R)) && (this.emitToken("onopentagname"), this._state = 8, this._index--);
    }, F.prototype.stateBeforeClosingTagName = function(R) {
      r(R) || (R === ">" ? this._state = 1 : this.special !== 1 ? this.special !== 4 && (R === "s" || R === "S") ? this._state = 33 : this.special === 4 && (R === "t" || R === "T") ? this._state = 53 : (this._state = 1, this._index--) : this.isTagStartChar(R) ? (this._state = 6, this.sectionStart = this._index) : (this._state = 20, this.sectionStart = this._index));
    }, F.prototype.stateInClosingTagName = function(R) {
      (R === ">" || r(R)) && (this.emitToken("onclosetag"), this._state = 7, this._index--);
    }, F.prototype.stateAfterClosingTagName = function(R) {
      R === ">" && (this._state = 1, this.sectionStart = this._index + 1);
    }, F.prototype.stateBeforeAttributeName = function(R) {
      R === ">" ? (this.cbs.onopentagend(), this._state = 1, this.sectionStart = this._index + 1) : R === "/" ? this._state = 4 : r(R) || (this._state = 9, this.sectionStart = this._index);
    }, F.prototype.stateInSelfClosingTag = function(R) {
      R === ">" ? (this.cbs.onselfclosingtag(), this._state = 1, this.sectionStart = this._index + 1, this.special = 1) : r(R) || (this._state = 8, this._index--);
    }, F.prototype.stateInAttributeName = function(R) {
      (R === "=" || R === "/" || R === ">" || r(R)) && (this.cbs.onattribname(this.getSection()), this.sectionStart = -1, this._state = 10, this._index--);
    }, F.prototype.stateAfterAttributeName = function(R) {
      R === "=" ? this._state = 11 : R === "/" || R === ">" ? (this.cbs.onattribend(void 0), this._state = 8, this._index--) : r(R) || (this.cbs.onattribend(void 0), this._state = 9, this.sectionStart = this._index);
    }, F.prototype.stateBeforeAttributeValue = function(R) {
      R === '"' ? (this._state = 12, this.sectionStart = this._index + 1) : R === "'" ? (this._state = 13, this.sectionStart = this._index + 1) : r(R) || (this._state = 14, this.sectionStart = this._index, this._index--);
    }, F.prototype.handleInAttributeValue = function(R, ee) {
      R === ee ? (this.emitToken("onattribdata"), this.cbs.onattribend(ee), this._state = 8) : this.decodeEntities && R === "&" && (this.emitToken("onattribdata"), this.baseState = this._state, this._state = 62, this.sectionStart = this._index);
    }, F.prototype.stateInAttributeValueDoubleQuotes = function(R) {
      this.handleInAttributeValue(R, '"');
    }, F.prototype.stateInAttributeValueSingleQuotes = function(R) {
      this.handleInAttributeValue(R, "'");
    }, F.prototype.stateInAttributeValueNoQuotes = function(R) {
      r(R) || R === ">" ? (this.emitToken("onattribdata"), this.cbs.onattribend(null), this._state = 8, this._index--) : this.decodeEntities && R === "&" && (this.emitToken("onattribdata"), this.baseState = this._state, this._state = 62, this.sectionStart = this._index);
    }, F.prototype.stateBeforeDeclaration = function(R) {
      this._state = R === "[" ? 23 : R === "-" ? 18 : 16;
    }, F.prototype.stateInDeclaration = function(R) {
      R === ">" && (this.cbs.ondeclaration(this.getSection()), this._state = 1, this.sectionStart = this._index + 1);
    }, F.prototype.stateInProcessingInstruction = function(R) {
      R === ">" && (this.cbs.onprocessinginstruction(this.getSection()), this._state = 1, this.sectionStart = this._index + 1);
    }, F.prototype.stateBeforeComment = function(R) {
      R === "-" ? (this._state = 19, this.sectionStart = this._index + 1) : this._state = 16;
    }, F.prototype.stateInComment = function(R) {
      R === "-" && (this._state = 21);
    }, F.prototype.stateInSpecialComment = function(R) {
      R === ">" && (this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index)), this._state = 1, this.sectionStart = this._index + 1);
    }, F.prototype.stateAfterComment1 = function(R) {
      R === "-" ? this._state = 22 : this._state = 19;
    }, F.prototype.stateAfterComment2 = function(R) {
      R === ">" ? (this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index - 2)), this._state = 1, this.sectionStart = this._index + 1) : R !== "-" && (this._state = 19);
    }, F.prototype.stateBeforeCdata6 = function(R) {
      R === "[" ? (this._state = 29, this.sectionStart = this._index + 1) : (this._state = 16, this._index--);
    }, F.prototype.stateInCdata = function(R) {
      R === "]" && (this._state = 30);
    }, F.prototype.stateAfterCdata1 = function(R) {
      R === "]" ? this._state = 31 : this._state = 29;
    }, F.prototype.stateAfterCdata2 = function(R) {
      R === ">" ? (this.cbs.oncdata(this.buffer.substring(this.sectionStart, this._index - 2)), this._state = 1, this.sectionStart = this._index + 1) : R !== "]" && (this._state = 29);
    }, F.prototype.stateBeforeSpecialS = function(R) {
      R === "c" || R === "C" ? this._state = 34 : R === "t" || R === "T" ? this._state = 44 : (this._state = 3, this._index--);
    }, F.prototype.stateBeforeSpecialSEnd = function(R) {
      this.special === 2 && (R === "c" || R === "C") ? this._state = 39 : this.special === 3 && (R === "t" || R === "T") ? this._state = 48 : this._state = 1;
    }, F.prototype.stateBeforeSpecialLast = function(R, ee) {
      (R === "/" || R === ">" || r(R)) && (this.special = ee), this._state = 3, this._index--;
    }, F.prototype.stateAfterSpecialLast = function(R, ee) {
      R === ">" || r(R) ? (this.special = 1, this._state = 6, this.sectionStart = this._index - ee, this._index--) : this._state = 1;
    }, F.prototype.parseFixedEntity = function(R) {
      if (R === void 0 && (R = this.xmlMode ? l.default : g.default), this.sectionStart + 1 < this._index) {
        var ee = this.buffer.substring(this.sectionStart + 1, this._index);
        Object.prototype.hasOwnProperty.call(R, ee) && (this.emitPartial(R[ee]), this.sectionStart = this._index + 1);
      }
    }, F.prototype.parseLegacyEntity = function() {
      for (var R = this.sectionStart + 1, ee = Math.min(this._index - R, 6); ee >= 2; ) {
        var Y = this.buffer.substr(R, ee);
        if (Object.prototype.hasOwnProperty.call(i.default, Y)) {
          this.emitPartial(i.default[Y]), this.sectionStart += ee + 1;
          return;
        }
        ee--;
      }
    }, F.prototype.stateInNamedEntity = function(R) {
      R === ";" ? (this.parseFixedEntity(), this.baseState === 1 && this.sectionStart + 1 < this._index && !this.xmlMode && this.parseLegacyEntity(), this._state = this.baseState) : (R < "0" || R > "9") && !e(R) && (this.xmlMode || this.sectionStart + 1 === this._index || (this.baseState !== 1 ? R !== "=" && this.parseFixedEntity(i.default) : this.parseLegacyEntity()), this._state = this.baseState, this._index--);
    }, F.prototype.decodeNumericEntity = function(R, ee, Y) {
      var Q = this.sectionStart + R;
      if (Q !== this._index) {
        var se = this.buffer.substring(Q, this._index), ge = parseInt(se, ee);
        this.emitPartial(d.default(ge)), this.sectionStart = Y ? this._index + 1 : this._index;
      }
      this._state = this.baseState;
    }, F.prototype.stateInNumericEntity = function(R) {
      R === ";" ? this.decodeNumericEntity(2, 10, true) : (R < "0" || R > "9") && (this.xmlMode ? this._state = this.baseState : this.decodeNumericEntity(2, 10, false), this._index--);
    }, F.prototype.stateInHexEntity = function(R) {
      R === ";" ? this.decodeNumericEntity(3, 16, true) : (R < "a" || R > "f") && (R < "A" || R > "F") && (R < "0" || R > "9") && (this.xmlMode ? this._state = this.baseState : this.decodeNumericEntity(3, 16, false), this._index--);
    }, F.prototype.cleanup = function() {
      this.sectionStart < 0 ? (this.buffer = "", this.bufferOffset += this._index, this._index = 0) : this.running && (this._state === 1 ? (this.sectionStart !== this._index && this.cbs.ontext(this.buffer.substr(this.sectionStart)), this.buffer = "", this.bufferOffset += this._index, this._index = 0) : this.sectionStart === this._index ? (this.buffer = "", this.bufferOffset += this._index, this._index = 0) : (this.buffer = this.buffer.substr(this.sectionStart), this._index -= this.sectionStart, this.bufferOffset += this.sectionStart), this.sectionStart = 0);
    }, F.prototype.parse = function() {
      for (; this._index < this.buffer.length && this.running; ) {
        var R = this.buffer.charAt(this._index);
        this._state === 1 ? this.stateText(R) : this._state === 12 ? this.stateInAttributeValueDoubleQuotes(R) : this._state === 9 ? this.stateInAttributeName(R) : this._state === 19 ? this.stateInComment(R) : this._state === 20 ? this.stateInSpecialComment(R) : this._state === 8 ? this.stateBeforeAttributeName(R) : this._state === 3 ? this.stateInTagName(R) : this._state === 6 ? this.stateInClosingTagName(R) : this._state === 2 ? this.stateBeforeTagName(R) : this._state === 10 ? this.stateAfterAttributeName(R) : this._state === 13 ? this.stateInAttributeValueSingleQuotes(R) : this._state === 11 ? this.stateBeforeAttributeValue(R) : this._state === 5 ? this.stateBeforeClosingTagName(R) : this._state === 7 ? this.stateAfterClosingTagName(R) : this._state === 32 ? this.stateBeforeSpecialS(R) : this._state === 21 ? this.stateAfterComment1(R) : this._state === 14 ? this.stateInAttributeValueNoQuotes(R) : this._state === 4 ? this.stateInSelfClosingTag(R) : this._state === 16 ? this.stateInDeclaration(R) : this._state === 15 ? this.stateBeforeDeclaration(R) : this._state === 22 ? this.stateAfterComment2(R) : this._state === 18 ? this.stateBeforeComment(R) : this._state === 33 ? this.stateBeforeSpecialSEnd(R) : this._state === 53 ? te(this, R) : this._state === 39 ? I(this, R) : this._state === 40 ? b(this, R) : this._state === 41 ? f(this, R) : this._state === 34 ? S(this, R) : this._state === 35 ? $(this, R) : this._state === 36 ? m(this, R) : this._state === 37 ? h(this, R) : this._state === 38 ? this.stateBeforeSpecialLast(R, 2) : this._state === 42 ? p(this, R) : this._state === 43 ? this.stateAfterSpecialLast(R, 6) : this._state === 44 ? w(this, R) : this._state === 29 ? this.stateInCdata(R) : this._state === 45 ? M(this, R) : this._state === 46 ? T(this, R) : this._state === 47 ? this.stateBeforeSpecialLast(R, 3) : this._state === 48 ? k(this, R) : this._state === 49 ? B(this, R) : this._state === 50 ? C(this, R) : this._state === 51 ? this.stateAfterSpecialLast(R, 5) : this._state === 52 ? E(this, R) : this._state === 54 ? q(this, R) : this._state === 55 ? W(this, R) : this._state === 56 ? G(this, R) : this._state === 57 ? this.stateBeforeSpecialLast(R, 4) : this._state === 58 ? oe(this, R) : this._state === 59 ? he(this, R) : this._state === 60 ? H(this, R) : this._state === 61 ? this.stateAfterSpecialLast(R, 5) : this._state === 17 ? this.stateInProcessingInstruction(R) : this._state === 64 ? this.stateInNamedEntity(R) : this._state === 23 ? a(this, R) : this._state === 62 ? U(this, R) : this._state === 24 ? o(this, R) : this._state === 25 ? c(this, R) : this._state === 30 ? this.stateAfterCdata1(R) : this._state === 31 ? this.stateAfterCdata2(R) : this._state === 26 ? u(this, R) : this._state === 27 ? _(this, R) : this._state === 28 ? this.stateBeforeCdata6(R) : this._state === 66 ? this.stateInHexEntity(R) : this._state === 65 ? this.stateInNumericEntity(R) : this._state === 63 ? V(this, R) : this.cbs.onerror(Error("unknown _state"), this._state), this._index++;
      }
      this.cleanup();
    }, F.prototype.finish = function() {
      this.sectionStart < this._index && this.handleTrailingData(), this.cbs.onend();
    }, F.prototype.handleTrailingData = function() {
      var R = this.buffer.substr(this.sectionStart);
      this._state === 29 || this._state === 30 || this._state === 31 ? this.cbs.oncdata(R) : this._state === 19 || this._state === 21 || this._state === 22 ? this.cbs.oncomment(R) : this._state === 64 && !this.xmlMode ? (this.parseLegacyEntity(), this.sectionStart < this._index && (this._state = this.baseState, this.handleTrailingData())) : this._state === 65 && !this.xmlMode ? (this.decodeNumericEntity(2, 10, false), this.sectionStart < this._index && (this._state = this.baseState, this.handleTrailingData())) : this._state === 66 && !this.xmlMode ? (this.decodeNumericEntity(3, 16, false), this.sectionStart < this._index && (this._state = this.baseState, this.handleTrailingData())) : this._state !== 3 && this._state !== 8 && this._state !== 11 && this._state !== 10 && this._state !== 9 && this._state !== 13 && this._state !== 12 && this._state !== 14 && this._state !== 6 && this.cbs.ontext(R);
    }, F.prototype.getSection = function() {
      return this.buffer.substring(this.sectionStart, this._index);
    }, F.prototype.emitToken = function(R) {
      this.cbs[R](this.getSection()), this.sectionStart = -1;
    }, F.prototype.emitPartial = function(R) {
      this.baseState !== 1 ? this.cbs.onattribdata(R) : this.cbs.ontext(R);
    }, F;
  })();
  return Sn.default = K, Sn;
}
var br;
function cc() {
  if (br) return zt;
  br = 1;
  var t = zt && zt.__importDefault || function(o) {
    return o && o.__esModule ? o : { default: o };
  };
  Object.defineProperty(zt, "__esModule", { value: true }), zt.Parser = void 0;
  var d = t(oc()), g = /* @__PURE__ */ new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"]), i = /* @__PURE__ */ new Set(["p"]), l = { tr: /* @__PURE__ */ new Set(["tr", "th", "td"]), th: /* @__PURE__ */ new Set(["th"]), td: /* @__PURE__ */ new Set(["thead", "th", "td"]), body: /* @__PURE__ */ new Set(["head", "link", "script"]), li: /* @__PURE__ */ new Set(["li"]), p: i, h1: i, h2: i, h3: i, h4: i, h5: i, h6: i, select: g, input: g, output: g, button: g, datalist: g, textarea: g, option: /* @__PURE__ */ new Set(["option"]), optgroup: /* @__PURE__ */ new Set(["optgroup", "option"]), dd: /* @__PURE__ */ new Set(["dt", "dd"]), dt: /* @__PURE__ */ new Set(["dt", "dd"]), address: i, article: i, aside: i, blockquote: i, details: i, div: i, dl: i, fieldset: i, figcaption: i, figure: i, footer: i, form: i, header: i, hr: i, main: i, nav: i, ol: i, pre: i, section: i, table: i, ul: i, rt: /* @__PURE__ */ new Set(["rt", "rp"]), rp: /* @__PURE__ */ new Set(["rt", "rp"]), tbody: /* @__PURE__ */ new Set(["thead", "tbody"]), tfoot: /* @__PURE__ */ new Set(["thead", "tbody"]) }, r = /* @__PURE__ */ new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]), e = /* @__PURE__ */ new Set(["math", "svg"]), s = /* @__PURE__ */ new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]), n = /\s|\//, a = (function() {
    function o(c, u) {
      u === void 0 && (u = {});
      var _, S, $, m, h;
      this.startIndex = 0, this.endIndex = null, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.options = u, this.cbs = c ?? {}, this.lowerCaseTagNames = (_ = u.lowerCaseTags) !== null && _ !== void 0 ? _ : !u.xmlMode, this.lowerCaseAttributeNames = (S = u.lowerCaseAttributeNames) !== null && S !== void 0 ? S : !u.xmlMode, this.tokenizer = new (($ = u.Tokenizer) !== null && $ !== void 0 ? $ : d.default)(this.options, this), (h = (m = this.cbs).onparserinit) === null || h === void 0 || h.call(m, this);
    }
    return o.prototype.updatePosition = function(c) {
      this.endIndex === null ? this.tokenizer.sectionStart <= c ? this.startIndex = 0 : this.startIndex = this.tokenizer.sectionStart - c : this.startIndex = this.endIndex + 1, this.endIndex = this.tokenizer.getAbsoluteIndex();
    }, o.prototype.ontext = function(c) {
      var u, _;
      this.updatePosition(1), this.endIndex--, (_ = (u = this.cbs).ontext) === null || _ === void 0 || _.call(u, c);
    }, o.prototype.onopentagname = function(c) {
      var u, _;
      if (this.lowerCaseTagNames && (c = c.toLowerCase()), this.tagname = c, !this.options.xmlMode && Object.prototype.hasOwnProperty.call(l, c)) for (var S = void 0; this.stack.length > 0 && l[c].has(S = this.stack[this.stack.length - 1]); ) this.onclosetag(S);
      (this.options.xmlMode || !r.has(c)) && (this.stack.push(c), e.has(c) ? this.foreignContext.push(true) : s.has(c) && this.foreignContext.push(false)), (_ = (u = this.cbs).onopentagname) === null || _ === void 0 || _.call(u, c), this.cbs.onopentag && (this.attribs = {});
    }, o.prototype.onopentagend = function() {
      var c, u;
      this.updatePosition(1), this.attribs && ((u = (c = this.cbs).onopentag) === null || u === void 0 || u.call(c, this.tagname, this.attribs), this.attribs = null), !this.options.xmlMode && this.cbs.onclosetag && r.has(this.tagname) && this.cbs.onclosetag(this.tagname), this.tagname = "";
    }, o.prototype.onclosetag = function(c) {
      if (this.updatePosition(1), this.lowerCaseTagNames && (c = c.toLowerCase()), (e.has(c) || s.has(c)) && this.foreignContext.pop(), this.stack.length && (this.options.xmlMode || !r.has(c))) {
        var u = this.stack.lastIndexOf(c);
        if (u !== -1) if (this.cbs.onclosetag) for (u = this.stack.length - u; u--; ) this.cbs.onclosetag(this.stack.pop());
        else this.stack.length = u;
        else c === "p" && !this.options.xmlMode && (this.onopentagname(c), this.closeCurrentTag());
      } else !this.options.xmlMode && (c === "br" || c === "p") && (this.onopentagname(c), this.closeCurrentTag());
    }, o.prototype.onselfclosingtag = function() {
      this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? this.closeCurrentTag() : this.onopentagend();
    }, o.prototype.closeCurrentTag = function() {
      var c, u, _ = this.tagname;
      this.onopentagend(), this.stack[this.stack.length - 1] === _ && ((u = (c = this.cbs).onclosetag) === null || u === void 0 || u.call(c, _), this.stack.pop());
    }, o.prototype.onattribname = function(c) {
      this.lowerCaseAttributeNames && (c = c.toLowerCase()), this.attribname = c;
    }, o.prototype.onattribdata = function(c) {
      this.attribvalue += c;
    }, o.prototype.onattribend = function(c) {
      var u, _;
      (_ = (u = this.cbs).onattribute) === null || _ === void 0 || _.call(u, this.attribname, this.attribvalue, c), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribname = "", this.attribvalue = "";
    }, o.prototype.getInstructionName = function(c) {
      var u = c.search(n), _ = u < 0 ? c : c.substr(0, u);
      return this.lowerCaseTagNames && (_ = _.toLowerCase()), _;
    }, o.prototype.ondeclaration = function(c) {
      if (this.cbs.onprocessinginstruction) {
        var u = this.getInstructionName(c);
        this.cbs.onprocessinginstruction("!" + u, "!" + c);
      }
    }, o.prototype.onprocessinginstruction = function(c) {
      if (this.cbs.onprocessinginstruction) {
        var u = this.getInstructionName(c);
        this.cbs.onprocessinginstruction("?" + u, "?" + c);
      }
    }, o.prototype.oncomment = function(c) {
      var u, _, S, $;
      this.updatePosition(4), (_ = (u = this.cbs).oncomment) === null || _ === void 0 || _.call(u, c), ($ = (S = this.cbs).oncommentend) === null || $ === void 0 || $.call(S);
    }, o.prototype.oncdata = function(c) {
      var u, _, S, $, m, h;
      this.updatePosition(1), this.options.xmlMode || this.options.recognizeCDATA ? ((_ = (u = this.cbs).oncdatastart) === null || _ === void 0 || _.call(u), ($ = (S = this.cbs).ontext) === null || $ === void 0 || $.call(S, c), (h = (m = this.cbs).oncdataend) === null || h === void 0 || h.call(m)) : this.oncomment("[CDATA[" + c + "]]");
    }, o.prototype.onerror = function(c) {
      var u, _;
      (_ = (u = this.cbs).onerror) === null || _ === void 0 || _.call(u, c);
    }, o.prototype.onend = function() {
      var c, u;
      if (this.cbs.onclosetag) for (var _ = this.stack.length; _ > 0; this.cbs.onclosetag(this.stack[--_])) ;
      (u = (c = this.cbs).onend) === null || u === void 0 || u.call(c);
    }, o.prototype.reset = function() {
      var c, u, _, S;
      (u = (c = this.cbs).onreset) === null || u === void 0 || u.call(c), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack = [], (S = (_ = this.cbs).onparserinit) === null || S === void 0 || S.call(_, this);
    }, o.prototype.parseComplete = function(c) {
      this.reset(), this.end(c);
    }, o.prototype.write = function(c) {
      this.tokenizer.write(c);
    }, o.prototype.end = function(c) {
      this.tokenizer.end(c);
    }, o.prototype.pause = function() {
      this.tokenizer.pause();
    }, o.prototype.resume = function() {
      this.tokenizer.resume();
    }, o.prototype.parseChunk = function(c) {
      this.write(c);
    }, o.prototype.done = function(c) {
      this.end(c);
    }, o;
  })();
  return zt.Parser = a, zt;
}
var Kt = {}, ci = {}, vr;
function As() {
  return vr || (vr = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.Doctype = t.CDATA = t.Tag = t.Style = t.Script = t.Comment = t.Directive = t.Text = t.Root = t.isTag = t.ElementType = void 0;
    var d;
    (function(i) {
      i.Root = "root", i.Text = "text", i.Directive = "directive", i.Comment = "comment", i.Script = "script", i.Style = "style", i.Tag = "tag", i.CDATA = "cdata", i.Doctype = "doctype";
    })(d = t.ElementType || (t.ElementType = {}));
    function g(i) {
      return i.type === d.Tag || i.type === d.Script || i.type === d.Style;
    }
    t.isTag = g, t.Root = d.Root, t.Text = d.Text, t.Directive = d.Directive, t.Comment = d.Comment, t.Script = d.Script, t.Style = d.Style, t.Tag = d.Tag, t.CDATA = d.CDATA, t.Doctype = d.Doctype;
  })(ci)), ci;
}
var Re = {}, yr;
function wr() {
  if (yr) return Re;
  yr = 1;
  var t = Re && Re.__extends || /* @__PURE__ */ (function() {
    var p = function(w, M) {
      return p = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(T, k) {
        T.__proto__ = k;
      } || function(T, k) {
        for (var B in k) Object.prototype.hasOwnProperty.call(k, B) && (T[B] = k[B]);
      }, p(w, M);
    };
    return function(w, M) {
      if (typeof M != "function" && M !== null) throw new TypeError("Class extends value " + String(M) + " is not a constructor or null");
      p(w, M);
      function T() {
        this.constructor = w;
      }
      w.prototype = M === null ? Object.create(M) : (T.prototype = M.prototype, new T());
    };
  })(), d = Re && Re.__assign || function() {
    return d = Object.assign || function(p) {
      for (var w, M = 1, T = arguments.length; M < T; M++) {
        w = arguments[M];
        for (var k in w) Object.prototype.hasOwnProperty.call(w, k) && (p[k] = w[k]);
      }
      return p;
    }, d.apply(this, arguments);
  };
  Object.defineProperty(Re, "__esModule", { value: true }), Re.cloneNode = Re.hasChildren = Re.isDocument = Re.isDirective = Re.isComment = Re.isText = Re.isCDATA = Re.isTag = Re.Element = Re.Document = Re.NodeWithChildren = Re.ProcessingInstruction = Re.Comment = Re.Text = Re.DataNode = Re.Node = void 0;
  var g = As(), i = /* @__PURE__ */ new Map([[g.ElementType.Tag, 1], [g.ElementType.Script, 1], [g.ElementType.Style, 1], [g.ElementType.Directive, 1], [g.ElementType.Text, 3], [g.ElementType.CDATA, 4], [g.ElementType.Comment, 8], [g.ElementType.Root, 9]]), l = (function() {
    function p(w) {
      this.type = w, this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(p.prototype, "nodeType", { get: function() {
      var w;
      return (w = i.get(this.type)) !== null && w !== void 0 ? w : 1;
    }, enumerable: false, configurable: true }), Object.defineProperty(p.prototype, "parentNode", { get: function() {
      return this.parent;
    }, set: function(w) {
      this.parent = w;
    }, enumerable: false, configurable: true }), Object.defineProperty(p.prototype, "previousSibling", { get: function() {
      return this.prev;
    }, set: function(w) {
      this.prev = w;
    }, enumerable: false, configurable: true }), Object.defineProperty(p.prototype, "nextSibling", { get: function() {
      return this.next;
    }, set: function(w) {
      this.next = w;
    }, enumerable: false, configurable: true }), p.prototype.cloneNode = function(w) {
      return w === void 0 && (w = false), b(this, w);
    }, p;
  })();
  Re.Node = l;
  var r = (function(p) {
    t(w, p);
    function w(M, T) {
      var k = p.call(this, M) || this;
      return k.data = T, k;
    }
    return Object.defineProperty(w.prototype, "nodeValue", { get: function() {
      return this.data;
    }, set: function(M) {
      this.data = M;
    }, enumerable: false, configurable: true }), w;
  })(l);
  Re.DataNode = r;
  var e = (function(p) {
    t(w, p);
    function w(M) {
      return p.call(this, g.ElementType.Text, M) || this;
    }
    return w;
  })(r);
  Re.Text = e;
  var s = (function(p) {
    t(w, p);
    function w(M) {
      return p.call(this, g.ElementType.Comment, M) || this;
    }
    return w;
  })(r);
  Re.Comment = s;
  var n = (function(p) {
    t(w, p);
    function w(M, T) {
      var k = p.call(this, g.ElementType.Directive, T) || this;
      return k.name = M, k;
    }
    return w;
  })(r);
  Re.ProcessingInstruction = n;
  var a = (function(p) {
    t(w, p);
    function w(M, T) {
      var k = p.call(this, M) || this;
      return k.children = T, k;
    }
    return Object.defineProperty(w.prototype, "firstChild", { get: function() {
      var M;
      return (M = this.children[0]) !== null && M !== void 0 ? M : null;
    }, enumerable: false, configurable: true }), Object.defineProperty(w.prototype, "lastChild", { get: function() {
      return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    }, enumerable: false, configurable: true }), Object.defineProperty(w.prototype, "childNodes", { get: function() {
      return this.children;
    }, set: function(M) {
      this.children = M;
    }, enumerable: false, configurable: true }), w;
  })(l);
  Re.NodeWithChildren = a;
  var o = (function(p) {
    t(w, p);
    function w(M) {
      return p.call(this, g.ElementType.Root, M) || this;
    }
    return w;
  })(a);
  Re.Document = o;
  var c = (function(p) {
    t(w, p);
    function w(M, T, k, B) {
      k === void 0 && (k = []), B === void 0 && (B = M === "script" ? g.ElementType.Script : M === "style" ? g.ElementType.Style : g.ElementType.Tag);
      var C = p.call(this, B, k) || this;
      return C.name = M, C.attribs = T, C;
    }
    return Object.defineProperty(w.prototype, "tagName", { get: function() {
      return this.name;
    }, set: function(M) {
      this.name = M;
    }, enumerable: false, configurable: true }), Object.defineProperty(w.prototype, "attributes", { get: function() {
      var M = this;
      return Object.keys(this.attribs).map(function(T) {
        var k, B;
        return { name: T, value: M.attribs[T], namespace: (k = M["x-attribsNamespace"]) === null || k === void 0 ? void 0 : k[T], prefix: (B = M["x-attribsPrefix"]) === null || B === void 0 ? void 0 : B[T] };
      });
    }, enumerable: false, configurable: true }), w;
  })(a);
  Re.Element = c;
  function u(p) {
    return (0, g.isTag)(p);
  }
  Re.isTag = u;
  function _(p) {
    return p.type === g.ElementType.CDATA;
  }
  Re.isCDATA = _;
  function S(p) {
    return p.type === g.ElementType.Text;
  }
  Re.isText = S;
  function $(p) {
    return p.type === g.ElementType.Comment;
  }
  Re.isComment = $;
  function m(p) {
    return p.type === g.ElementType.Directive;
  }
  Re.isDirective = m;
  function h(p) {
    return p.type === g.ElementType.Root;
  }
  Re.isDocument = h;
  function I(p) {
    return Object.prototype.hasOwnProperty.call(p, "children");
  }
  Re.hasChildren = I;
  function b(p, w) {
    w === void 0 && (w = false);
    var M;
    if (S(p)) M = new e(p.data);
    else if ($(p)) M = new s(p.data);
    else if (u(p)) {
      var T = w ? f(p.children) : [], k = new c(p.name, d({}, p.attribs), T);
      T.forEach(function(q) {
        return q.parent = k;
      }), p.namespace != null && (k.namespace = p.namespace), p["x-attribsNamespace"] && (k["x-attribsNamespace"] = d({}, p["x-attribsNamespace"])), p["x-attribsPrefix"] && (k["x-attribsPrefix"] = d({}, p["x-attribsPrefix"])), M = k;
    } else if (_(p)) {
      var T = w ? f(p.children) : [], B = new a(g.ElementType.CDATA, T);
      T.forEach(function(W) {
        return W.parent = B;
      }), M = B;
    } else if (h(p)) {
      var T = w ? f(p.children) : [], C = new o(T);
      T.forEach(function(W) {
        return W.parent = C;
      }), p["x-mode"] && (C["x-mode"] = p["x-mode"]), M = C;
    } else if (m(p)) {
      var E = new n(p.name, p.data);
      p["x-name"] != null && (E["x-name"] = p["x-name"], E["x-publicId"] = p["x-publicId"], E["x-systemId"] = p["x-systemId"]), M = E;
    } else throw new Error("Not implemented yet: ".concat(p.type));
    return M.startIndex = p.startIndex, M.endIndex = p.endIndex, p.sourceCodeLocation != null && (M.sourceCodeLocation = p.sourceCodeLocation), M;
  }
  Re.cloneNode = b;
  function f(p) {
    for (var w = p.map(function(T) {
      return b(T, true);
    }), M = 1; M < w.length; M++) w[M].prev = w[M - 1], w[M - 1].next = w[M];
    return w;
  }
  return Re;
}
var Sr;
function jt() {
  return Sr || (Sr = 1, (function(t) {
    var d = Kt && Kt.__createBinding || (Object.create ? (function(n, a, o, c) {
      c === void 0 && (c = o);
      var u = Object.getOwnPropertyDescriptor(a, o);
      (!u || ("get" in u ? !a.__esModule : u.writable || u.configurable)) && (u = { enumerable: true, get: function() {
        return a[o];
      } }), Object.defineProperty(n, c, u);
    }) : (function(n, a, o, c) {
      c === void 0 && (c = o), n[c] = a[o];
    })), g = Kt && Kt.__exportStar || function(n, a) {
      for (var o in n) o !== "default" && !Object.prototype.hasOwnProperty.call(a, o) && d(a, n, o);
    };
    Object.defineProperty(t, "__esModule", { value: true }), t.DomHandler = void 0;
    var i = As(), l = wr();
    g(wr(), t);
    var r = /\s+/g, e = { normalizeWhitespace: false, withStartIndices: false, withEndIndices: false, xmlMode: false }, s = (function() {
      function n(a, o, c) {
        this.dom = [], this.root = new l.Document(this.dom), this.done = false, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof o == "function" && (c = o, o = e), typeof a == "object" && (o = a, a = void 0), this.callback = a ?? null, this.options = o ?? e, this.elementCB = c ?? null;
      }
      return n.prototype.onparserinit = function(a) {
        this.parser = a;
      }, n.prototype.onreset = function() {
        this.dom = [], this.root = new l.Document(this.dom), this.done = false, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, n.prototype.onend = function() {
        this.done || (this.done = true, this.parser = null, this.handleCallback(null));
      }, n.prototype.onerror = function(a) {
        this.handleCallback(a);
      }, n.prototype.onclosetag = function() {
        this.lastNode = null;
        var a = this.tagStack.pop();
        this.options.withEndIndices && (a.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(a);
      }, n.prototype.onopentag = function(a, o) {
        var c = this.options.xmlMode ? i.ElementType.Tag : void 0, u = new l.Element(a, o, void 0, c);
        this.addNode(u), this.tagStack.push(u);
      }, n.prototype.ontext = function(a) {
        var o = this.options.normalizeWhitespace, c = this.lastNode;
        if (c && c.type === i.ElementType.Text) o ? c.data = (c.data + a).replace(r, " ") : c.data += a, this.options.withEndIndices && (c.endIndex = this.parser.endIndex);
        else {
          o && (a = a.replace(r, " "));
          var u = new l.Text(a);
          this.addNode(u), this.lastNode = u;
        }
      }, n.prototype.oncomment = function(a) {
        if (this.lastNode && this.lastNode.type === i.ElementType.Comment) {
          this.lastNode.data += a;
          return;
        }
        var o = new l.Comment(a);
        this.addNode(o), this.lastNode = o;
      }, n.prototype.oncommentend = function() {
        this.lastNode = null;
      }, n.prototype.oncdatastart = function() {
        var a = new l.Text(""), o = new l.NodeWithChildren(i.ElementType.CDATA, [a]);
        this.addNode(o), a.parent = o, this.lastNode = a;
      }, n.prototype.oncdataend = function() {
        this.lastNode = null;
      }, n.prototype.onprocessinginstruction = function(a, o) {
        var c = new l.ProcessingInstruction(a, o);
        this.addNode(c);
      }, n.prototype.handleCallback = function(a) {
        if (typeof this.callback == "function") this.callback(a, this.dom);
        else if (a) throw a;
      }, n.prototype.addNode = function(a) {
        var o = this.tagStack[this.tagStack.length - 1], c = o.children[o.children.length - 1];
        this.options.withStartIndices && (a.startIndex = this.parser.startIndex), this.options.withEndIndices && (a.endIndex = this.parser.endIndex), o.children.push(a), c && (a.prev = c, c.next = a), a.parent = o, this.lastNode = null;
      }, n;
    })();
    t.DomHandler = s, t.default = s;
  })(Kt)), Kt;
}
var et = {}, Wt = {}, at = {}, mt = {}, li = {}, yt = {};
const ZV = "\xC1", JV = "\xE1", QV = "\u0102", XV = "\u0103", YV = "\u223E", eN = "\u223F", tN = "\u223E\u0333", nN = "\xC2", sN = "\xE2", iN = "\xB4", rN = "\u0410", aN = "\u0430", oN = "\xC6", cN = "\xE6", lN = "\u2061", uN = "\u{1D504}", dN = "\u{1D51E}", fN = "\xC0", pN = "\xE0", gN = "\u2135", hN = "\u2135", mN = "\u0391", _N = "\u03B1", bN = "\u0100", vN = "\u0101", yN = "\u2A3F", wN = "&", SN = "&", IN = "\u2A55", PN = "\u2A53", AN = "\u2227", CN = "\u2A5C", xN = "\u2A58", EN = "\u2A5A", MN = "\u2220", $N = "\u29A4", kN = "\u2220", RN = "\u29A8", TN = "\u29A9", BN = "\u29AA", DN = "\u29AB", qN = "\u29AC", UN = "\u29AD", LN = "\u29AE", ON = "\u29AF", VN = "\u2221", NN = "\u221F", FN = "\u22BE", jN = "\u299D", GN = "\u2222", HN = "\xC5", zN = "\u237C", KN = "\u0104", WN = "\u0105", ZN = "\u{1D538}", JN = "\u{1D552}", QN = "\u2A6F", XN = "\u2248", YN = "\u2A70", eF = "\u224A", tF = "\u224B", nF = "'", sF = "\u2061", iF = "\u2248", rF = "\u224A", aF = "\xC5", oF = "\xE5", cF = "\u{1D49C}", lF = "\u{1D4B6}", uF = "\u2254", dF = "*", fF = "\u2248", pF = "\u224D", gF = "\xC3", hF = "\xE3", mF = "\xC4", _F = "\xE4", bF = "\u2233", vF = "\u2A11", yF = "\u224C", wF = "\u03F6", SF = "\u2035", IF = "\u223D", PF = "\u22CD", AF = "\u2216", CF = "\u2AE7", xF = "\u22BD", EF = "\u2305", MF = "\u2306", $F = "\u2305", kF = "\u23B5", RF = "\u23B6", TF = "\u224C", BF = "\u0411", DF = "\u0431", qF = "\u201E", UF = "\u2235", LF = "\u2235", OF = "\u2235", VF = "\u29B0", NF = "\u03F6", FF = "\u212C", jF = "\u212C", GF = "\u0392", HF = "\u03B2", zF = "\u2136", KF = "\u226C", WF = "\u{1D505}", ZF = "\u{1D51F}", JF = "\u22C2", QF = "\u25EF", XF = "\u22C3", YF = "\u2A00", ej = "\u2A01", tj = "\u2A02", nj = "\u2A06", sj = "\u2605", ij = "\u25BD", rj = "\u25B3", aj = "\u2A04", oj = "\u22C1", cj = "\u22C0", lj = "\u290D", uj = "\u29EB", dj = "\u25AA", fj = "\u25B4", pj = "\u25BE", gj = "\u25C2", hj = "\u25B8", mj = "\u2423", _j = "\u2592", bj = "\u2591", vj = "\u2593", yj = "\u2588", wj = "=\u20E5", Sj = "\u2261\u20E5", Ij = "\u2AED", Pj = "\u2310", Aj = "\u{1D539}", Cj = "\u{1D553}", xj = "\u22A5", Ej = "\u22A5", Mj = "\u22C8", $j = "\u29C9", kj = "\u2510", Rj = "\u2555", Tj = "\u2556", Bj = "\u2557", Dj = "\u250C", qj = "\u2552", Uj = "\u2553", Lj = "\u2554", Oj = "\u2500", Vj = "\u2550", Nj = "\u252C", Fj = "\u2564", jj = "\u2565", Gj = "\u2566", Hj = "\u2534", zj = "\u2567", Kj = "\u2568", Wj = "\u2569", Zj = "\u229F", Jj = "\u229E", Qj = "\u22A0", Xj = "\u2518", Yj = "\u255B", eG = "\u255C", tG = "\u255D", nG = "\u2514", sG = "\u2558", iG = "\u2559", rG = "\u255A", aG = "\u2502", oG = "\u2551", cG = "\u253C", lG = "\u256A", uG = "\u256B", dG = "\u256C", fG = "\u2524", pG = "\u2561", gG = "\u2562", hG = "\u2563", mG = "\u251C", _G = "\u255E", bG = "\u255F", vG = "\u2560", yG = "\u2035", wG = "\u02D8", SG = "\u02D8", IG = "\xA6", PG = "\u{1D4B7}", AG = "\u212C", CG = "\u204F", xG = "\u223D", EG = "\u22CD", MG = "\u29C5", $G = "\\", kG = "\u27C8", RG = "\u2022", TG = "\u2022", BG = "\u224E", DG = "\u2AAE", qG = "\u224F", UG = "\u224E", LG = "\u224F", OG = "\u0106", VG = "\u0107", NG = "\u2A44", FG = "\u2A49", jG = "\u2A4B", GG = "\u2229", HG = "\u22D2", zG = "\u2A47", KG = "\u2A40", WG = "\u2145", ZG = "\u2229\uFE00", JG = "\u2041", QG = "\u02C7", XG = "\u212D", YG = "\u2A4D", eH = "\u010C", tH = "\u010D", nH = "\xC7", sH = "\xE7", iH = "\u0108", rH = "\u0109", aH = "\u2230", oH = "\u2A4C", cH = "\u2A50", lH = "\u010A", uH = "\u010B", dH = "\xB8", fH = "\xB8", pH = "\u29B2", gH = "\xA2", hH = "\xB7", mH = "\xB7", _H = "\u{1D520}", bH = "\u212D", vH = "\u0427", yH = "\u0447", wH = "\u2713", SH = "\u2713", IH = "\u03A7", PH = "\u03C7", AH = "\u02C6", CH = "\u2257", xH = "\u21BA", EH = "\u21BB", MH = "\u229B", $H = "\u229A", kH = "\u229D", RH = "\u2299", TH = "\xAE", BH = "\u24C8", DH = "\u2296", qH = "\u2295", UH = "\u2297", LH = "\u25CB", OH = "\u29C3", VH = "\u2257", NH = "\u2A10", FH = "\u2AEF", jH = "\u29C2", GH = "\u2232", HH = "\u201D", zH = "\u2019", KH = "\u2663", WH = "\u2663", ZH = ":", JH = "\u2237", QH = "\u2A74", XH = "\u2254", YH = "\u2254", ez = ",", tz = "@", nz = "\u2201", sz = "\u2218", iz = "\u2201", rz = "\u2102", az = "\u2245", oz = "\u2A6D", cz = "\u2261", lz = "\u222E", uz = "\u222F", dz = "\u222E", fz = "\u{1D554}", pz = "\u2102", gz = "\u2210", hz = "\u2210", mz = "\xA9", _z = "\xA9", bz = "\u2117", vz = "\u2233", yz = "\u21B5", wz = "\u2717", Sz = "\u2A2F", Iz = "\u{1D49E}", Pz = "\u{1D4B8}", Az = "\u2ACF", Cz = "\u2AD1", xz = "\u2AD0", Ez = "\u2AD2", Mz = "\u22EF", $z = "\u2938", kz = "\u2935", Rz = "\u22DE", Tz = "\u22DF", Bz = "\u21B6", Dz = "\u293D", qz = "\u2A48", Uz = "\u2A46", Lz = "\u224D", Oz = "\u222A", Vz = "\u22D3", Nz = "\u2A4A", Fz = "\u228D", jz = "\u2A45", Gz = "\u222A\uFE00", Hz = "\u21B7", zz = "\u293C", Kz = "\u22DE", Wz = "\u22DF", Zz = "\u22CE", Jz = "\u22CF", Qz = "\xA4", Xz = "\u21B6", Yz = "\u21B7", eK = "\u22CE", tK = "\u22CF", nK = "\u2232", sK = "\u2231", iK = "\u232D", rK = "\u2020", aK = "\u2021", oK = "\u2138", cK = "\u2193", lK = "\u21A1", uK = "\u21D3", dK = "\u2010", fK = "\u2AE4", pK = "\u22A3", gK = "\u290F", hK = "\u02DD", mK = "\u010E", _K = "\u010F", bK = "\u0414", vK = "\u0434", yK = "\u2021", wK = "\u21CA", SK = "\u2145", IK = "\u2146", PK = "\u2911", AK = "\u2A77", CK = "\xB0", xK = "\u2207", EK = "\u0394", MK = "\u03B4", $K = "\u29B1", kK = "\u297F", RK = "\u{1D507}", TK = "\u{1D521}", BK = "\u2965", DK = "\u21C3", qK = "\u21C2", UK = "\xB4", LK = "\u02D9", OK = "\u02DD", VK = "`", NK = "\u02DC", FK = "\u22C4", jK = "\u22C4", GK = "\u22C4", HK = "\u2666", zK = "\u2666", KK = "\xA8", WK = "\u2146", ZK = "\u03DD", JK = "\u22F2", QK = "\xF7", XK = "\xF7", YK = "\u22C7", eW = "\u22C7", tW = "\u0402", nW = "\u0452", sW = "\u231E", iW = "\u230D", rW = "$", aW = "\u{1D53B}", oW = "\u{1D555}", cW = "\xA8", lW = "\u02D9", uW = "\u20DC", dW = "\u2250", fW = "\u2251", pW = "\u2250", gW = "\u2238", hW = "\u2214", mW = "\u22A1", _W = "\u2306", bW = "\u222F", vW = "\xA8", yW = "\u21D3", wW = "\u21D0", SW = "\u21D4", IW = "\u2AE4", PW = "\u27F8", AW = "\u27FA", CW = "\u27F9", xW = "\u21D2", EW = "\u22A8", MW = "\u21D1", $W = "\u21D5", kW = "\u2225", RW = "\u2913", TW = "\u2193", BW = "\u2193", DW = "\u21D3", qW = "\u21F5", UW = "\u0311", LW = "\u21CA", OW = "\u21C3", VW = "\u21C2", NW = "\u2950", FW = "\u295E", jW = "\u2956", GW = "\u21BD", HW = "\u295F", zW = "\u2957", KW = "\u21C1", WW = "\u21A7", ZW = "\u22A4", JW = "\u2910", QW = "\u231F", XW = "\u230C", YW = "\u{1D49F}", eZ = "\u{1D4B9}", tZ = "\u0405", nZ = "\u0455", sZ = "\u29F6", iZ = "\u0110", rZ = "\u0111", aZ = "\u22F1", oZ = "\u25BF", cZ = "\u25BE", lZ = "\u21F5", uZ = "\u296F", dZ = "\u29A6", fZ = "\u040F", pZ = "\u045F", gZ = "\u27FF", hZ = "\xC9", mZ = "\xE9", _Z = "\u2A6E", bZ = "\u011A", vZ = "\u011B", yZ = "\xCA", wZ = "\xEA", SZ = "\u2256", IZ = "\u2255", PZ = "\u042D", AZ = "\u044D", CZ = "\u2A77", xZ = "\u0116", EZ = "\u0117", MZ = "\u2251", $Z = "\u2147", kZ = "\u2252", RZ = "\u{1D508}", TZ = "\u{1D522}", BZ = "\u2A9A", DZ = "\xC8", qZ = "\xE8", UZ = "\u2A96", LZ = "\u2A98", OZ = "\u2A99", VZ = "\u2208", NZ = "\u23E7", FZ = "\u2113", jZ = "\u2A95", GZ = "\u2A97", HZ = "\u0112", zZ = "\u0113", KZ = "\u2205", WZ = "\u2205", ZZ = "\u25FB", JZ = "\u2205", QZ = "\u25AB", XZ = "\u2004", YZ = "\u2005", eJ = "\u2003", tJ = "\u014A", nJ = "\u014B", sJ = "\u2002", iJ = "\u0118", rJ = "\u0119", aJ = "\u{1D53C}", oJ = "\u{1D556}", cJ = "\u22D5", lJ = "\u29E3", uJ = "\u2A71", dJ = "\u03B5", fJ = "\u0395", pJ = "\u03B5", gJ = "\u03F5", hJ = "\u2256", mJ = "\u2255", _J = "\u2242", bJ = "\u2A96", vJ = "\u2A95", yJ = "\u2A75", wJ = "=", SJ = "\u2242", IJ = "\u225F", PJ = "\u21CC", AJ = "\u2261", CJ = "\u2A78", xJ = "\u29E5", EJ = "\u2971", MJ = "\u2253", $J = "\u212F", kJ = "\u2130", RJ = "\u2250", TJ = "\u2A73", BJ = "\u2242", DJ = "\u0397", qJ = "\u03B7", UJ = "\xD0", LJ = "\xF0", OJ = "\xCB", VJ = "\xEB", NJ = "\u20AC", FJ = "!", jJ = "\u2203", GJ = "\u2203", HJ = "\u2130", zJ = "\u2147", KJ = "\u2147", WJ = "\u2252", ZJ = "\u0424", JJ = "\u0444", QJ = "\u2640", XJ = "\uFB03", YJ = "\uFB00", eQ = "\uFB04", tQ = "\u{1D509}", nQ = "\u{1D523}", sQ = "\uFB01", iQ = "\u25FC", rQ = "\u25AA", aQ = "fj", oQ = "\u266D", cQ = "\uFB02", lQ = "\u25B1", uQ = "\u0192", dQ = "\u{1D53D}", fQ = "\u{1D557}", pQ = "\u2200", gQ = "\u2200", hQ = "\u22D4", mQ = "\u2AD9", _Q = "\u2131", bQ = "\u2A0D", vQ = "\xBD", yQ = "\u2153", wQ = "\xBC", SQ = "\u2155", IQ = "\u2159", PQ = "\u215B", AQ = "\u2154", CQ = "\u2156", xQ = "\xBE", EQ = "\u2157", MQ = "\u215C", $Q = "\u2158", kQ = "\u215A", RQ = "\u215D", TQ = "\u215E", BQ = "\u2044", DQ = "\u2322", qQ = "\u{1D4BB}", UQ = "\u2131", LQ = "\u01F5", OQ = "\u0393", VQ = "\u03B3", NQ = "\u03DC", FQ = "\u03DD", jQ = "\u2A86", GQ = "\u011E", HQ = "\u011F", zQ = "\u0122", KQ = "\u011C", WQ = "\u011D", ZQ = "\u0413", JQ = "\u0433", QQ = "\u0120", XQ = "\u0121", YQ = "\u2265", eX = "\u2267", tX = "\u2A8C", nX = "\u22DB", sX = "\u2265", iX = "\u2267", rX = "\u2A7E", aX = "\u2AA9", oX = "\u2A7E", cX = "\u2A80", lX = "\u2A82", uX = "\u2A84", dX = "\u22DB\uFE00", fX = "\u2A94", pX = "\u{1D50A}", gX = "\u{1D524}", hX = "\u226B", mX = "\u22D9", _X = "\u22D9", bX = "\u2137", vX = "\u0403", yX = "\u0453", wX = "\u2AA5", SX = "\u2277", IX = "\u2A92", PX = "\u2AA4", AX = "\u2A8A", CX = "\u2A8A", xX = "\u2A88", EX = "\u2269", MX = "\u2A88", $X = "\u2269", kX = "\u22E7", RX = "\u{1D53E}", TX = "\u{1D558}", BX = "`", DX = "\u2265", qX = "\u22DB", UX = "\u2267", LX = "\u2AA2", OX = "\u2277", VX = "\u2A7E", NX = "\u2273", FX = "\u{1D4A2}", jX = "\u210A", GX = "\u2273", HX = "\u2A8E", zX = "\u2A90", KX = "\u2AA7", WX = "\u2A7A", ZX = ">", JX = ">", QX = "\u226B", XX = "\u22D7", YX = "\u2995", eY = "\u2A7C", tY = "\u2A86", nY = "\u2978", sY = "\u22D7", iY = "\u22DB", rY = "\u2A8C", aY = "\u2277", oY = "\u2273", cY = "\u2269\uFE00", lY = "\u2269\uFE00", uY = "\u02C7", dY = "\u200A", fY = "\xBD", pY = "\u210B", gY = "\u042A", hY = "\u044A", mY = "\u2948", _Y = "\u2194", bY = "\u21D4", vY = "\u21AD", yY = "^", wY = "\u210F", SY = "\u0124", IY = "\u0125", PY = "\u2665", AY = "\u2665", CY = "\u2026", xY = "\u22B9", EY = "\u{1D525}", MY = "\u210C", $Y = "\u210B", kY = "\u2925", RY = "\u2926", TY = "\u21FF", BY = "\u223B", DY = "\u21A9", qY = "\u21AA", UY = "\u{1D559}", LY = "\u210D", OY = "\u2015", VY = "\u2500", NY = "\u{1D4BD}", FY = "\u210B", jY = "\u210F", GY = "\u0126", HY = "\u0127", zY = "\u224E", KY = "\u224F", WY = "\u2043", ZY = "\u2010", JY = "\xCD", QY = "\xED", XY = "\u2063", YY = "\xCE", eee = "\xEE", tee = "\u0418", nee = "\u0438", see = "\u0130", iee = "\u0415", ree = "\u0435", aee = "\xA1", oee = "\u21D4", cee = "\u{1D526}", lee = "\u2111", uee = "\xCC", dee = "\xEC", fee = "\u2148", pee = "\u2A0C", gee = "\u222D", hee = "\u29DC", mee = "\u2129", _ee = "\u0132", bee = "\u0133", vee = "\u012A", yee = "\u012B", wee = "\u2111", See = "\u2148", Iee = "\u2110", Pee = "\u2111", Aee = "\u0131", Cee = "\u2111", xee = "\u22B7", Eee = "\u01B5", Mee = "\u21D2", $ee = "\u2105", kee = "\u221E", Ree = "\u29DD", Tee = "\u0131", Bee = "\u22BA", Dee = "\u222B", qee = "\u222C", Uee = "\u2124", Lee = "\u222B", Oee = "\u22BA", Vee = "\u22C2", Nee = "\u2A17", Fee = "\u2A3C", jee = "\u2063", Gee = "\u2062", Hee = "\u0401", zee = "\u0451", Kee = "\u012E", Wee = "\u012F", Zee = "\u{1D540}", Jee = "\u{1D55A}", Qee = "\u0399", Xee = "\u03B9", Yee = "\u2A3C", ete = "\xBF", tte = "\u{1D4BE}", nte = "\u2110", ste = "\u2208", ite = "\u22F5", rte = "\u22F9", ate = "\u22F4", ote = "\u22F3", cte = "\u2208", lte = "\u2062", ute = "\u0128", dte = "\u0129", fte = "\u0406", pte = "\u0456", gte = "\xCF", hte = "\xEF", mte = "\u0134", _te = "\u0135", bte = "\u0419", vte = "\u0439", yte = "\u{1D50D}", wte = "\u{1D527}", Ste = "\u0237", Ite = "\u{1D541}", Pte = "\u{1D55B}", Ate = "\u{1D4A5}", Cte = "\u{1D4BF}", xte = "\u0408", Ete = "\u0458", Mte = "\u0404", $te = "\u0454", kte = "\u039A", Rte = "\u03BA", Tte = "\u03F0", Bte = "\u0136", Dte = "\u0137", qte = "\u041A", Ute = "\u043A", Lte = "\u{1D50E}", Ote = "\u{1D528}", Vte = "\u0138", Nte = "\u0425", Fte = "\u0445", jte = "\u040C", Gte = "\u045C", Hte = "\u{1D542}", zte = "\u{1D55C}", Kte = "\u{1D4A6}", Wte = "\u{1D4C0}", Zte = "\u21DA", Jte = "\u0139", Qte = "\u013A", Xte = "\u29B4", Yte = "\u2112", ene = "\u039B", tne = "\u03BB", nne = "\u27E8", sne = "\u27EA", ine = "\u2991", rne = "\u27E8", ane = "\u2A85", one = "\u2112", cne = "\xAB", lne = "\u21E4", une = "\u291F", dne = "\u2190", fne = "\u219E", pne = "\u21D0", gne = "\u291D", hne = "\u21A9", mne = "\u21AB", _ne = "\u2939", bne = "\u2973", vne = "\u21A2", yne = "\u2919", wne = "\u291B", Sne = "\u2AAB", Ine = "\u2AAD", Pne = "\u2AAD\uFE00", Ane = "\u290C", Cne = "\u290E", xne = "\u2772", Ene = "{", Mne = "[", $ne = "\u298B", kne = "\u298F", Rne = "\u298D", Tne = "\u013D", Bne = "\u013E", Dne = "\u013B", qne = "\u013C", Une = "\u2308", Lne = "{", One = "\u041B", Vne = "\u043B", Nne = "\u2936", Fne = "\u201C", jne = "\u201E", Gne = "\u2967", Hne = "\u294B", zne = "\u21B2", Kne = "\u2264", Wne = "\u2266", Zne = "\u27E8", Jne = "\u21E4", Qne = "\u2190", Xne = "\u2190", Yne = "\u21D0", ese = "\u21C6", tse = "\u21A2", nse = "\u2308", sse = "\u27E6", ise = "\u2961", rse = "\u2959", ase = "\u21C3", ose = "\u230A", cse = "\u21BD", lse = "\u21BC", use = "\u21C7", dse = "\u2194", fse = "\u2194", pse = "\u21D4", gse = "\u21C6", hse = "\u21CB", mse = "\u21AD", _se = "\u294E", bse = "\u21A4", vse = "\u22A3", yse = "\u295A", wse = "\u22CB", Sse = "\u29CF", Ise = "\u22B2", Pse = "\u22B4", Ase = "\u2951", Cse = "\u2960", xse = "\u2958", Ese = "\u21BF", Mse = "\u2952", $se = "\u21BC", kse = "\u2A8B", Rse = "\u22DA", Tse = "\u2264", Bse = "\u2266", Dse = "\u2A7D", qse = "\u2AA8", Use = "\u2A7D", Lse = "\u2A7F", Ose = "\u2A81", Vse = "\u2A83", Nse = "\u22DA\uFE00", Fse = "\u2A93", jse = "\u2A85", Gse = "\u22D6", Hse = "\u22DA", zse = "\u2A8B", Kse = "\u22DA", Wse = "\u2266", Zse = "\u2276", Jse = "\u2276", Qse = "\u2AA1", Xse = "\u2272", Yse = "\u2A7D", eie = "\u2272", tie = "\u297C", nie = "\u230A", sie = "\u{1D50F}", iie = "\u{1D529}", rie = "\u2276", aie = "\u2A91", oie = "\u2962", cie = "\u21BD", lie = "\u21BC", uie = "\u296A", die = "\u2584", fie = "\u0409", pie = "\u0459", gie = "\u21C7", hie = "\u226A", mie = "\u22D8", _ie = "\u231E", bie = "\u21DA", vie = "\u296B", yie = "\u25FA", wie = "\u013F", Sie = "\u0140", Iie = "\u23B0", Pie = "\u23B0", Aie = "\u2A89", Cie = "\u2A89", xie = "\u2A87", Eie = "\u2268", Mie = "\u2A87", $ie = "\u2268", kie = "\u22E6", Rie = "\u27EC", Tie = "\u21FD", Bie = "\u27E6", Die = "\u27F5", qie = "\u27F5", Uie = "\u27F8", Lie = "\u27F7", Oie = "\u27F7", Vie = "\u27FA", Nie = "\u27FC", Fie = "\u27F6", jie = "\u27F6", Gie = "\u27F9", Hie = "\u21AB", zie = "\u21AC", Kie = "\u2985", Wie = "\u{1D543}", Zie = "\u{1D55D}", Jie = "\u2A2D", Qie = "\u2A34", Xie = "\u2217", Yie = "_", ere = "\u2199", tre = "\u2198", nre = "\u25CA", sre = "\u25CA", ire = "\u29EB", rre = "(", are = "\u2993", ore = "\u21C6", cre = "\u231F", lre = "\u21CB", ure = "\u296D", dre = "\u200E", fre = "\u22BF", pre = "\u2039", gre = "\u{1D4C1}", hre = "\u2112", mre = "\u21B0", _re = "\u21B0", bre = "\u2272", vre = "\u2A8D", yre = "\u2A8F", wre = "[", Sre = "\u2018", Ire = "\u201A", Pre = "\u0141", Are = "\u0142", Cre = "\u2AA6", xre = "\u2A79", Ere = "<", Mre = "<", $re = "\u226A", kre = "\u22D6", Rre = "\u22CB", Tre = "\u22C9", Bre = "\u2976", Dre = "\u2A7B", qre = "\u25C3", Ure = "\u22B4", Lre = "\u25C2", Ore = "\u2996", Vre = "\u294A", Nre = "\u2966", Fre = "\u2268\uFE00", jre = "\u2268\uFE00", Gre = "\xAF", Hre = "\u2642", zre = "\u2720", Kre = "\u2720", Wre = "\u21A6", Zre = "\u21A6", Jre = "\u21A7", Qre = "\u21A4", Xre = "\u21A5", Yre = "\u25AE", eae = "\u2A29", tae = "\u041C", nae = "\u043C", sae = "\u2014", iae = "\u223A", rae = "\u2221", aae = "\u205F", oae = "\u2133", cae = "\u{1D510}", lae = "\u{1D52A}", uae = "\u2127", dae = "\xB5", fae = "*", pae = "\u2AF0", gae = "\u2223", hae = "\xB7", mae = "\u229F", _ae = "\u2212", bae = "\u2238", vae = "\u2A2A", yae = "\u2213", wae = "\u2ADB", Sae = "\u2026", Iae = "\u2213", Pae = "\u22A7", Aae = "\u{1D544}", Cae = "\u{1D55E}", xae = "\u2213", Eae = "\u{1D4C2}", Mae = "\u2133", $ae = "\u223E", kae = "\u039C", Rae = "\u03BC", Tae = "\u22B8", Bae = "\u22B8", Dae = "\u2207", qae = "\u0143", Uae = "\u0144", Lae = "\u2220\u20D2", Oae = "\u2249", Vae = "\u2A70\u0338", Nae = "\u224B\u0338", Fae = "\u0149", jae = "\u2249", Gae = "\u266E", Hae = "\u2115", zae = "\u266E", Kae = "\xA0", Wae = "\u224E\u0338", Zae = "\u224F\u0338", Jae = "\u2A43", Qae = "\u0147", Xae = "\u0148", Yae = "\u0145", eoe = "\u0146", toe = "\u2247", noe = "\u2A6D\u0338", soe = "\u2A42", ioe = "\u041D", roe = "\u043D", aoe = "\u2013", ooe = "\u2924", coe = "\u2197", loe = "\u21D7", uoe = "\u2197", doe = "\u2260", foe = "\u2250\u0338", poe = "\u200B", goe = "\u200B", hoe = "\u200B", moe = "\u200B", _oe = "\u2262", boe = "\u2928", voe = "\u2242\u0338", yoe = "\u226B", woe = "\u226A", Soe = `
`, Ioe = "\u2204", Poe = "\u2204", Aoe = "\u{1D511}", Coe = "\u{1D52B}", xoe = "\u2267\u0338", Eoe = "\u2271", Moe = "\u2271", $oe = "\u2267\u0338", koe = "\u2A7E\u0338", Roe = "\u2A7E\u0338", Toe = "\u22D9\u0338", Boe = "\u2275", Doe = "\u226B\u20D2", qoe = "\u226F", Uoe = "\u226F", Loe = "\u226B\u0338", Ooe = "\u21AE", Voe = "\u21CE", Noe = "\u2AF2", Foe = "\u220B", joe = "\u22FC", Goe = "\u22FA", Hoe = "\u220B", zoe = "\u040A", Koe = "\u045A", Woe = "\u219A", Zoe = "\u21CD", Joe = "\u2025", Qoe = "\u2266\u0338", Xoe = "\u2270", Yoe = "\u219A", ece = "\u21CD", tce = "\u21AE", nce = "\u21CE", sce = "\u2270", ice = "\u2266\u0338", rce = "\u2A7D\u0338", ace = "\u2A7D\u0338", oce = "\u226E", cce = "\u22D8\u0338", lce = "\u2274", uce = "\u226A\u20D2", dce = "\u226E", fce = "\u22EA", pce = "\u22EC", gce = "\u226A\u0338", hce = "\u2224", mce = "\u2060", _ce = "\xA0", bce = "\u{1D55F}", vce = "\u2115", yce = "\u2AEC", wce = "\xAC", Sce = "\u2262", Ice = "\u226D", Pce = "\u2226", Ace = "\u2209", Cce = "\u2260", xce = "\u2242\u0338", Ece = "\u2204", Mce = "\u226F", $ce = "\u2271", kce = "\u2267\u0338", Rce = "\u226B\u0338", Tce = "\u2279", Bce = "\u2A7E\u0338", Dce = "\u2275", qce = "\u224E\u0338", Uce = "\u224F\u0338", Lce = "\u2209", Oce = "\u22F5\u0338", Vce = "\u22F9\u0338", Nce = "\u2209", Fce = "\u22F7", jce = "\u22F6", Gce = "\u29CF\u0338", Hce = "\u22EA", zce = "\u22EC", Kce = "\u226E", Wce = "\u2270", Zce = "\u2278", Jce = "\u226A\u0338", Qce = "\u2A7D\u0338", Xce = "\u2274", Yce = "\u2AA2\u0338", ele = "\u2AA1\u0338", tle = "\u220C", nle = "\u220C", sle = "\u22FE", ile = "\u22FD", rle = "\u2280", ale = "\u2AAF\u0338", ole = "\u22E0", cle = "\u220C", lle = "\u29D0\u0338", ule = "\u22EB", dle = "\u22ED", fle = "\u228F\u0338", ple = "\u22E2", gle = "\u2290\u0338", hle = "\u22E3", mle = "\u2282\u20D2", _le = "\u2288", ble = "\u2281", vle = "\u2AB0\u0338", yle = "\u22E1", wle = "\u227F\u0338", Sle = "\u2283\u20D2", Ile = "\u2289", Ple = "\u2241", Ale = "\u2244", Cle = "\u2247", xle = "\u2249", Ele = "\u2224", Mle = "\u2226", $le = "\u2226", kle = "\u2AFD\u20E5", Rle = "\u2202\u0338", Tle = "\u2A14", Ble = "\u2280", Dle = "\u22E0", qle = "\u2280", Ule = "\u2AAF\u0338", Lle = "\u2AAF\u0338", Ole = "\u2933\u0338", Vle = "\u219B", Nle = "\u21CF", Fle = "\u219D\u0338", jle = "\u219B", Gle = "\u21CF", Hle = "\u22EB", zle = "\u22ED", Kle = "\u2281", Wle = "\u22E1", Zle = "\u2AB0\u0338", Jle = "\u{1D4A9}", Qle = "\u{1D4C3}", Xle = "\u2224", Yle = "\u2226", eue = "\u2241", tue = "\u2244", nue = "\u2244", sue = "\u2224", iue = "\u2226", rue = "\u22E2", aue = "\u22E3", oue = "\u2284", cue = "\u2AC5\u0338", lue = "\u2288", uue = "\u2282\u20D2", due = "\u2288", fue = "\u2AC5\u0338", pue = "\u2281", gue = "\u2AB0\u0338", hue = "\u2285", mue = "\u2AC6\u0338", _ue = "\u2289", bue = "\u2283\u20D2", vue = "\u2289", yue = "\u2AC6\u0338", wue = "\u2279", Sue = "\xD1", Iue = "\xF1", Pue = "\u2278", Aue = "\u22EA", Cue = "\u22EC", xue = "\u22EB", Eue = "\u22ED", Mue = "\u039D", $ue = "\u03BD", kue = "#", Rue = "\u2116", Tue = "\u2007", Bue = "\u224D\u20D2", Due = "\u22AC", que = "\u22AD", Uue = "\u22AE", Lue = "\u22AF", Oue = "\u2265\u20D2", Vue = ">\u20D2", Nue = "\u2904", Fue = "\u29DE", jue = "\u2902", Gue = "\u2264\u20D2", Hue = "<\u20D2", zue = "\u22B4\u20D2", Kue = "\u2903", Wue = "\u22B5\u20D2", Zue = "\u223C\u20D2", Jue = "\u2923", Que = "\u2196", Xue = "\u21D6", Yue = "\u2196", ede = "\u2927", tde = "\xD3", nde = "\xF3", sde = "\u229B", ide = "\xD4", rde = "\xF4", ade = "\u229A", ode = "\u041E", cde = "\u043E", lde = "\u229D", ude = "\u0150", dde = "\u0151", fde = "\u2A38", pde = "\u2299", gde = "\u29BC", hde = "\u0152", mde = "\u0153", _de = "\u29BF", bde = "\u{1D512}", vde = "\u{1D52C}", yde = "\u02DB", wde = "\xD2", Sde = "\xF2", Ide = "\u29C1", Pde = "\u29B5", Ade = "\u03A9", Cde = "\u222E", xde = "\u21BA", Ede = "\u29BE", Mde = "\u29BB", $de = "\u203E", kde = "\u29C0", Rde = "\u014C", Tde = "\u014D", Bde = "\u03A9", Dde = "\u03C9", qde = "\u039F", Ude = "\u03BF", Lde = "\u29B6", Ode = "\u2296", Vde = "\u{1D546}", Nde = "\u{1D560}", Fde = "\u29B7", jde = "\u201C", Gde = "\u2018", Hde = "\u29B9", zde = "\u2295", Kde = "\u21BB", Wde = "\u2A54", Zde = "\u2228", Jde = "\u2A5D", Qde = "\u2134", Xde = "\u2134", Yde = "\xAA", efe = "\xBA", tfe = "\u22B6", nfe = "\u2A56", sfe = "\u2A57", ife = "\u2A5B", rfe = "\u24C8", afe = "\u{1D4AA}", ofe = "\u2134", cfe = "\xD8", lfe = "\xF8", ufe = "\u2298", dfe = "\xD5", ffe = "\xF5", pfe = "\u2A36", gfe = "\u2A37", hfe = "\u2297", mfe = "\xD6", _fe = "\xF6", bfe = "\u233D", vfe = "\u203E", yfe = "\u23DE", wfe = "\u23B4", Sfe = "\u23DC", Ife = "\xB6", Pfe = "\u2225", Afe = "\u2225", Cfe = "\u2AF3", xfe = "\u2AFD", Efe = "\u2202", Mfe = "\u2202", $fe = "\u041F", kfe = "\u043F", Rfe = "%", Tfe = ".", Bfe = "\u2030", Dfe = "\u22A5", qfe = "\u2031", Ufe = "\u{1D513}", Lfe = "\u{1D52D}", Ofe = "\u03A6", Vfe = "\u03C6", Nfe = "\u03D5", Ffe = "\u2133", jfe = "\u260E", Gfe = "\u03A0", Hfe = "\u03C0", zfe = "\u22D4", Kfe = "\u03D6", Wfe = "\u210F", Zfe = "\u210E", Jfe = "\u210F", Qfe = "\u2A23", Xfe = "\u229E", Yfe = "\u2A22", epe = "+", tpe = "\u2214", npe = "\u2A25", spe = "\u2A72", ipe = "\xB1", rpe = "\xB1", ape = "\u2A26", ope = "\u2A27", cpe = "\xB1", lpe = "\u210C", upe = "\u2A15", dpe = "\u{1D561}", fpe = "\u2119", ppe = "\xA3", gpe = "\u2AB7", hpe = "\u2ABB", mpe = "\u227A", _pe = "\u227C", bpe = "\u2AB7", vpe = "\u227A", ype = "\u227C", wpe = "\u227A", Spe = "\u2AAF", Ipe = "\u227C", Ppe = "\u227E", Ape = "\u2AAF", Cpe = "\u2AB9", xpe = "\u2AB5", Epe = "\u22E8", Mpe = "\u2AAF", $pe = "\u2AB3", kpe = "\u227E", Rpe = "\u2032", Tpe = "\u2033", Bpe = "\u2119", Dpe = "\u2AB9", qpe = "\u2AB5", Upe = "\u22E8", Lpe = "\u220F", Ope = "\u220F", Vpe = "\u232E", Npe = "\u2312", Fpe = "\u2313", jpe = "\u221D", Gpe = "\u221D", Hpe = "\u2237", zpe = "\u221D", Kpe = "\u227E", Wpe = "\u22B0", Zpe = "\u{1D4AB}", Jpe = "\u{1D4C5}", Qpe = "\u03A8", Xpe = "\u03C8", Ype = "\u2008", ege = "\u{1D514}", tge = "\u{1D52E}", nge = "\u2A0C", sge = "\u{1D562}", ige = "\u211A", rge = "\u2057", age = "\u{1D4AC}", oge = "\u{1D4C6}", cge = "\u210D", lge = "\u2A16", uge = "?", dge = "\u225F", fge = '"', pge = '"', gge = "\u21DB", hge = "\u223D\u0331", mge = "\u0154", _ge = "\u0155", bge = "\u221A", vge = "\u29B3", yge = "\u27E9", wge = "\u27EB", Sge = "\u2992", Ige = "\u29A5", Pge = "\u27E9", Age = "\xBB", Cge = "\u2975", xge = "\u21E5", Ege = "\u2920", Mge = "\u2933", $ge = "\u2192", kge = "\u21A0", Rge = "\u21D2", Tge = "\u291E", Bge = "\u21AA", Dge = "\u21AC", qge = "\u2945", Uge = "\u2974", Lge = "\u2916", Oge = "\u21A3", Vge = "\u219D", Nge = "\u291A", Fge = "\u291C", jge = "\u2236", Gge = "\u211A", Hge = "\u290D", zge = "\u290F", Kge = "\u2910", Wge = "\u2773", Zge = "}", Jge = "]", Qge = "\u298C", Xge = "\u298E", Yge = "\u2990", ehe = "\u0158", the = "\u0159", nhe = "\u0156", she = "\u0157", ihe = "\u2309", rhe = "}", ahe = "\u0420", ohe = "\u0440", che = "\u2937", lhe = "\u2969", uhe = "\u201D", dhe = "\u201D", fhe = "\u21B3", phe = "\u211C", ghe = "\u211B", hhe = "\u211C", mhe = "\u211D", _he = "\u211C", bhe = "\u25AD", vhe = "\xAE", yhe = "\xAE", whe = "\u220B", She = "\u21CB", Ihe = "\u296F", Phe = "\u297D", Ahe = "\u230B", Che = "\u{1D52F}", xhe = "\u211C", Ehe = "\u2964", Mhe = "\u21C1", $he = "\u21C0", khe = "\u296C", Rhe = "\u03A1", The = "\u03C1", Bhe = "\u03F1", Dhe = "\u27E9", qhe = "\u21E5", Uhe = "\u2192", Lhe = "\u2192", Ohe = "\u21D2", Vhe = "\u21C4", Nhe = "\u21A3", Fhe = "\u2309", jhe = "\u27E7", Ghe = "\u295D", Hhe = "\u2955", zhe = "\u21C2", Khe = "\u230B", Whe = "\u21C1", Zhe = "\u21C0", Jhe = "\u21C4", Qhe = "\u21CC", Xhe = "\u21C9", Yhe = "\u219D", eme = "\u21A6", tme = "\u22A2", nme = "\u295B", sme = "\u22CC", ime = "\u29D0", rme = "\u22B3", ame = "\u22B5", ome = "\u294F", cme = "\u295C", lme = "\u2954", ume = "\u21BE", dme = "\u2953", fme = "\u21C0", pme = "\u02DA", gme = "\u2253", hme = "\u21C4", mme = "\u21CC", _me = "\u200F", bme = "\u23B1", vme = "\u23B1", yme = "\u2AEE", wme = "\u27ED", Sme = "\u21FE", Ime = "\u27E7", Pme = "\u2986", Ame = "\u{1D563}", Cme = "\u211D", xme = "\u2A2E", Eme = "\u2A35", Mme = "\u2970", $me = ")", kme = "\u2994", Rme = "\u2A12", Tme = "\u21C9", Bme = "\u21DB", Dme = "\u203A", qme = "\u{1D4C7}", Ume = "\u211B", Lme = "\u21B1", Ome = "\u21B1", Vme = "]", Nme = "\u2019", Fme = "\u2019", jme = "\u22CC", Gme = "\u22CA", Hme = "\u25B9", zme = "\u22B5", Kme = "\u25B8", Wme = "\u29CE", Zme = "\u29F4", Jme = "\u2968", Qme = "\u211E", Xme = "\u015A", Yme = "\u015B", e_e = "\u201A", t_e = "\u2AB8", n_e = "\u0160", s_e = "\u0161", i_e = "\u2ABC", r_e = "\u227B", a_e = "\u227D", o_e = "\u2AB0", c_e = "\u2AB4", l_e = "\u015E", u_e = "\u015F", d_e = "\u015C", f_e = "\u015D", p_e = "\u2ABA", g_e = "\u2AB6", h_e = "\u22E9", m_e = "\u2A13", __e = "\u227F", b_e = "\u0421", v_e = "\u0441", y_e = "\u22A1", w_e = "\u22C5", S_e = "\u2A66", I_e = "\u2925", P_e = "\u2198", A_e = "\u21D8", C_e = "\u2198", x_e = "\xA7", E_e = ";", M_e = "\u2929", $_e = "\u2216", k_e = "\u2216", R_e = "\u2736", T_e = "\u{1D516}", B_e = "\u{1D530}", D_e = "\u2322", q_e = "\u266F", U_e = "\u0429", L_e = "\u0449", O_e = "\u0428", V_e = "\u0448", N_e = "\u2193", F_e = "\u2190", j_e = "\u2223", G_e = "\u2225", H_e = "\u2192", z_e = "\u2191", K_e = "\xAD", W_e = "\u03A3", Z_e = "\u03C3", J_e = "\u03C2", Q_e = "\u03C2", X_e = "\u223C", Y_e = "\u2A6A", e1e = "\u2243", t1e = "\u2243", n1e = "\u2A9E", s1e = "\u2AA0", i1e = "\u2A9D", r1e = "\u2A9F", a1e = "\u2246", o1e = "\u2A24", c1e = "\u2972", l1e = "\u2190", u1e = "\u2218", d1e = "\u2216", f1e = "\u2A33", p1e = "\u29E4", g1e = "\u2223", h1e = "\u2323", m1e = "\u2AAA", _1e = "\u2AAC", b1e = "\u2AAC\uFE00", v1e = "\u042C", y1e = "\u044C", w1e = "\u233F", S1e = "\u29C4", I1e = "/", P1e = "\u{1D54A}", A1e = "\u{1D564}", C1e = "\u2660", x1e = "\u2660", E1e = "\u2225", M1e = "\u2293", $1e = "\u2293\uFE00", k1e = "\u2294", R1e = "\u2294\uFE00", T1e = "\u221A", B1e = "\u228F", D1e = "\u2291", q1e = "\u228F", U1e = "\u2291", L1e = "\u2290", O1e = "\u2292", V1e = "\u2290", N1e = "\u2292", F1e = "\u25A1", j1e = "\u25A1", G1e = "\u2293", H1e = "\u228F", z1e = "\u2291", K1e = "\u2290", W1e = "\u2292", Z1e = "\u2294", J1e = "\u25AA", Q1e = "\u25A1", X1e = "\u25AA", Y1e = "\u2192", ebe = "\u{1D4AE}", tbe = "\u{1D4C8}", nbe = "\u2216", sbe = "\u2323", ibe = "\u22C6", rbe = "\u22C6", abe = "\u2606", obe = "\u2605", cbe = "\u03F5", lbe = "\u03D5", ube = "\xAF", dbe = "\u2282", fbe = "\u22D0", pbe = "\u2ABD", gbe = "\u2AC5", hbe = "\u2286", mbe = "\u2AC3", _be = "\u2AC1", bbe = "\u2ACB", vbe = "\u228A", ybe = "\u2ABF", wbe = "\u2979", Sbe = "\u2282", Ibe = "\u22D0", Pbe = "\u2286", Abe = "\u2AC5", Cbe = "\u2286", xbe = "\u228A", Ebe = "\u2ACB", Mbe = "\u2AC7", $be = "\u2AD5", kbe = "\u2AD3", Rbe = "\u2AB8", Tbe = "\u227B", Bbe = "\u227D", Dbe = "\u227B", qbe = "\u2AB0", Ube = "\u227D", Lbe = "\u227F", Obe = "\u2AB0", Vbe = "\u2ABA", Nbe = "\u2AB6", Fbe = "\u22E9", jbe = "\u227F", Gbe = "\u220B", Hbe = "\u2211", zbe = "\u2211", Kbe = "\u266A", Wbe = "\xB9", Zbe = "\xB2", Jbe = "\xB3", Qbe = "\u2283", Xbe = "\u22D1", Ybe = "\u2ABE", eve = "\u2AD8", tve = "\u2AC6", nve = "\u2287", sve = "\u2AC4", ive = "\u2283", rve = "\u2287", ave = "\u27C9", ove = "\u2AD7", cve = "\u297B", lve = "\u2AC2", uve = "\u2ACC", dve = "\u228B", fve = "\u2AC0", pve = "\u2283", gve = "\u22D1", hve = "\u2287", mve = "\u2AC6", _ve = "\u228B", bve = "\u2ACC", vve = "\u2AC8", yve = "\u2AD4", wve = "\u2AD6", Sve = "\u2926", Ive = "\u2199", Pve = "\u21D9", Ave = "\u2199", Cve = "\u292A", xve = "\xDF", Eve = "	", Mve = "\u2316", $ve = "\u03A4", kve = "\u03C4", Rve = "\u23B4", Tve = "\u0164", Bve = "\u0165", Dve = "\u0162", qve = "\u0163", Uve = "\u0422", Lve = "\u0442", Ove = "\u20DB", Vve = "\u2315", Nve = "\u{1D517}", Fve = "\u{1D531}", jve = "\u2234", Gve = "\u2234", Hve = "\u2234", zve = "\u0398", Kve = "\u03B8", Wve = "\u03D1", Zve = "\u03D1", Jve = "\u2248", Qve = "\u223C", Xve = "\u205F\u200A", Yve = "\u2009", eye = "\u2009", tye = "\u2248", nye = "\u223C", sye = "\xDE", iye = "\xFE", rye = "\u02DC", aye = "\u223C", oye = "\u2243", cye = "\u2245", lye = "\u2248", uye = "\u2A31", dye = "\u22A0", fye = "\xD7", pye = "\u2A30", gye = "\u222D", hye = "\u2928", mye = "\u2336", _ye = "\u2AF1", bye = "\u22A4", vye = "\u{1D54B}", yye = "\u{1D565}", wye = "\u2ADA", Sye = "\u2929", Iye = "\u2034", Pye = "\u2122", Aye = "\u2122", Cye = "\u25B5", xye = "\u25BF", Eye = "\u25C3", Mye = "\u22B4", $ye = "\u225C", kye = "\u25B9", Rye = "\u22B5", Tye = "\u25EC", Bye = "\u225C", Dye = "\u2A3A", qye = "\u20DB", Uye = "\u2A39", Lye = "\u29CD", Oye = "\u2A3B", Vye = "\u23E2", Nye = "\u{1D4AF}", Fye = "\u{1D4C9}", jye = "\u0426", Gye = "\u0446", Hye = "\u040B", zye = "\u045B", Kye = "\u0166", Wye = "\u0167", Zye = "\u226C", Jye = "\u219E", Qye = "\u21A0", Xye = "\xDA", Yye = "\xFA", e0e = "\u2191", t0e = "\u219F", n0e = "\u21D1", s0e = "\u2949", i0e = "\u040E", r0e = "\u045E", a0e = "\u016C", o0e = "\u016D", c0e = "\xDB", l0e = "\xFB", u0e = "\u0423", d0e = "\u0443", f0e = "\u21C5", p0e = "\u0170", g0e = "\u0171", h0e = "\u296E", m0e = "\u297E", _0e = "\u{1D518}", b0e = "\u{1D532}", v0e = "\xD9", y0e = "\xF9", w0e = "\u2963", S0e = "\u21BF", I0e = "\u21BE", P0e = "\u2580", A0e = "\u231C", C0e = "\u231C", x0e = "\u230F", E0e = "\u25F8", M0e = "\u016A", $0e = "\u016B", k0e = "\xA8", R0e = "_", T0e = "\u23DF", B0e = "\u23B5", D0e = "\u23DD", q0e = "\u22C3", U0e = "\u228E", L0e = "\u0172", O0e = "\u0173", V0e = "\u{1D54C}", N0e = "\u{1D566}", F0e = "\u2912", j0e = "\u2191", G0e = "\u2191", H0e = "\u21D1", z0e = "\u21C5", K0e = "\u2195", W0e = "\u2195", Z0e = "\u21D5", J0e = "\u296E", Q0e = "\u21BF", X0e = "\u21BE", Y0e = "\u228E", ewe = "\u2196", twe = "\u2197", nwe = "\u03C5", swe = "\u03D2", iwe = "\u03D2", rwe = "\u03A5", awe = "\u03C5", owe = "\u21A5", cwe = "\u22A5", lwe = "\u21C8", uwe = "\u231D", dwe = "\u231D", fwe = "\u230E", pwe = "\u016E", gwe = "\u016F", hwe = "\u25F9", mwe = "\u{1D4B0}", _we = "\u{1D4CA}", bwe = "\u22F0", vwe = "\u0168", ywe = "\u0169", wwe = "\u25B5", Swe = "\u25B4", Iwe = "\u21C8", Pwe = "\xDC", Awe = "\xFC", Cwe = "\u29A7", xwe = "\u299C", Ewe = "\u03F5", Mwe = "\u03F0", $we = "\u2205", kwe = "\u03D5", Rwe = "\u03D6", Twe = "\u221D", Bwe = "\u2195", Dwe = "\u21D5", qwe = "\u03F1", Uwe = "\u03C2", Lwe = "\u228A\uFE00", Owe = "\u2ACB\uFE00", Vwe = "\u228B\uFE00", Nwe = "\u2ACC\uFE00", Fwe = "\u03D1", jwe = "\u22B2", Gwe = "\u22B3", Hwe = "\u2AE8", zwe = "\u2AEB", Kwe = "\u2AE9", Wwe = "\u0412", Zwe = "\u0432", Jwe = "\u22A2", Qwe = "\u22A8", Xwe = "\u22A9", Ywe = "\u22AB", eSe = "\u2AE6", tSe = "\u22BB", nSe = "\u2228", sSe = "\u22C1", iSe = "\u225A", rSe = "\u22EE", aSe = "|", oSe = "\u2016", cSe = "|", lSe = "\u2016", uSe = "\u2223", dSe = "|", fSe = "\u2758", pSe = "\u2240", gSe = "\u200A", hSe = "\u{1D519}", mSe = "\u{1D533}", _Se = "\u22B2", bSe = "\u2282\u20D2", vSe = "\u2283\u20D2", ySe = "\u{1D54D}", wSe = "\u{1D567}", SSe = "\u221D", ISe = "\u22B3", PSe = "\u{1D4B1}", ASe = "\u{1D4CB}", CSe = "\u2ACB\uFE00", xSe = "\u228A\uFE00", ESe = "\u2ACC\uFE00", MSe = "\u228B\uFE00", $Se = "\u22AA", kSe = "\u299A", RSe = "\u0174", TSe = "\u0175", BSe = "\u2A5F", DSe = "\u2227", qSe = "\u22C0", USe = "\u2259", LSe = "\u2118", OSe = "\u{1D51A}", VSe = "\u{1D534}", NSe = "\u{1D54E}", FSe = "\u{1D568}", jSe = "\u2118", GSe = "\u2240", HSe = "\u2240", zSe = "\u{1D4B2}", KSe = "\u{1D4CC}", WSe = "\u22C2", ZSe = "\u25EF", JSe = "\u22C3", QSe = "\u25BD", XSe = "\u{1D51B}", YSe = "\u{1D535}", eIe = "\u27F7", tIe = "\u27FA", nIe = "\u039E", sIe = "\u03BE", iIe = "\u27F5", rIe = "\u27F8", aIe = "\u27FC", oIe = "\u22FB", cIe = "\u2A00", lIe = "\u{1D54F}", uIe = "\u{1D569}", dIe = "\u2A01", fIe = "\u2A02", pIe = "\u27F6", gIe = "\u27F9", hIe = "\u{1D4B3}", mIe = "\u{1D4CD}", _Ie = "\u2A06", bIe = "\u2A04", vIe = "\u25B3", yIe = "\u22C1", wIe = "\u22C0", SIe = "\xDD", IIe = "\xFD", PIe = "\u042F", AIe = "\u044F", CIe = "\u0176", xIe = "\u0177", EIe = "\u042B", MIe = "\u044B", $Ie = "\xA5", kIe = "\u{1D51C}", RIe = "\u{1D536}", TIe = "\u0407", BIe = "\u0457", DIe = "\u{1D550}", qIe = "\u{1D56A}", UIe = "\u{1D4B4}", LIe = "\u{1D4CE}", OIe = "\u042E", VIe = "\u044E", NIe = "\xFF", FIe = "\u0178", jIe = "\u0179", GIe = "\u017A", HIe = "\u017D", zIe = "\u017E", KIe = "\u0417", WIe = "\u0437", ZIe = "\u017B", JIe = "\u017C", QIe = "\u2128", XIe = "\u200B", YIe = "\u0396", ePe = "\u03B6", tPe = "\u{1D537}", nPe = "\u2128", sPe = "\u0416", iPe = "\u0436", rPe = "\u21DD", aPe = "\u{1D56B}", oPe = "\u2124", cPe = "\u{1D4B5}", lPe = "\u{1D4CF}", uPe = "\u200D", dPe = "\u200C", lc = { Aacute: ZV, aacute: JV, Abreve: QV, abreve: XV, ac: YV, acd: eN, acE: tN, Acirc: nN, acirc: sN, acute: iN, Acy: rN, acy: aN, AElig: oN, aelig: cN, af: lN, Afr: uN, afr: dN, Agrave: fN, agrave: pN, alefsym: gN, aleph: hN, Alpha: mN, alpha: _N, Amacr: bN, amacr: vN, amalg: yN, amp: wN, AMP: SN, andand: IN, And: PN, and: AN, andd: CN, andslope: xN, andv: EN, ang: MN, ange: $N, angle: kN, angmsdaa: RN, angmsdab: TN, angmsdac: BN, angmsdad: DN, angmsdae: qN, angmsdaf: UN, angmsdag: LN, angmsdah: ON, angmsd: VN, angrt: NN, angrtvb: FN, angrtvbd: jN, angsph: GN, angst: HN, angzarr: zN, Aogon: KN, aogon: WN, Aopf: ZN, aopf: JN, apacir: QN, ap: XN, apE: YN, ape: eF, apid: tF, apos: nF, ApplyFunction: sF, approx: iF, approxeq: rF, Aring: aF, aring: oF, Ascr: cF, ascr: lF, Assign: uF, ast: dF, asymp: fF, asympeq: pF, Atilde: gF, atilde: hF, Auml: mF, auml: _F, awconint: bF, awint: vF, backcong: yF, backepsilon: wF, backprime: SF, backsim: IF, backsimeq: PF, Backslash: AF, Barv: CF, barvee: xF, barwed: EF, Barwed: MF, barwedge: $F, bbrk: kF, bbrktbrk: RF, bcong: TF, Bcy: BF, bcy: DF, bdquo: qF, becaus: UF, because: LF, Because: OF, bemptyv: VF, bepsi: NF, bernou: FF, Bernoullis: jF, Beta: GF, beta: HF, beth: zF, between: KF, Bfr: WF, bfr: ZF, bigcap: JF, bigcirc: QF, bigcup: XF, bigodot: YF, bigoplus: ej, bigotimes: tj, bigsqcup: nj, bigstar: sj, bigtriangledown: ij, bigtriangleup: rj, biguplus: aj, bigvee: oj, bigwedge: cj, bkarow: lj, blacklozenge: uj, blacksquare: dj, blacktriangle: fj, blacktriangledown: pj, blacktriangleleft: gj, blacktriangleright: hj, blank: mj, blk12: _j, blk14: bj, blk34: vj, block: yj, bne: wj, bnequiv: Sj, bNot: Ij, bnot: Pj, Bopf: Aj, bopf: Cj, bot: xj, bottom: Ej, bowtie: Mj, boxbox: $j, boxdl: kj, boxdL: Rj, boxDl: Tj, boxDL: Bj, boxdr: Dj, boxdR: qj, boxDr: Uj, boxDR: Lj, boxh: Oj, boxH: Vj, boxhd: Nj, boxHd: Fj, boxhD: jj, boxHD: Gj, boxhu: Hj, boxHu: zj, boxhU: Kj, boxHU: Wj, boxminus: Zj, boxplus: Jj, boxtimes: Qj, boxul: Xj, boxuL: Yj, boxUl: eG, boxUL: tG, boxur: nG, boxuR: sG, boxUr: iG, boxUR: rG, boxv: aG, boxV: oG, boxvh: cG, boxvH: lG, boxVh: uG, boxVH: dG, boxvl: fG, boxvL: pG, boxVl: gG, boxVL: hG, boxvr: mG, boxvR: _G, boxVr: bG, boxVR: vG, bprime: yG, breve: wG, Breve: SG, brvbar: IG, bscr: PG, Bscr: AG, bsemi: CG, bsim: xG, bsime: EG, bsolb: MG, bsol: $G, bsolhsub: kG, bull: RG, bullet: TG, bump: BG, bumpE: DG, bumpe: qG, Bumpeq: UG, bumpeq: LG, Cacute: OG, cacute: VG, capand: NG, capbrcup: FG, capcap: jG, cap: GG, Cap: HG, capcup: zG, capdot: KG, CapitalDifferentialD: WG, caps: ZG, caret: JG, caron: QG, Cayleys: XG, ccaps: YG, Ccaron: eH, ccaron: tH, Ccedil: nH, ccedil: sH, Ccirc: iH, ccirc: rH, Cconint: aH, ccups: oH, ccupssm: cH, Cdot: lH, cdot: uH, cedil: dH, Cedilla: fH, cemptyv: pH, cent: gH, centerdot: hH, CenterDot: mH, cfr: _H, Cfr: bH, CHcy: vH, chcy: yH, check: wH, checkmark: SH, Chi: IH, chi: PH, circ: AH, circeq: CH, circlearrowleft: xH, circlearrowright: EH, circledast: MH, circledcirc: $H, circleddash: kH, CircleDot: RH, circledR: TH, circledS: BH, CircleMinus: DH, CirclePlus: qH, CircleTimes: UH, cir: LH, cirE: OH, cire: VH, cirfnint: NH, cirmid: FH, cirscir: jH, ClockwiseContourIntegral: GH, CloseCurlyDoubleQuote: HH, CloseCurlyQuote: zH, clubs: KH, clubsuit: WH, colon: ZH, Colon: JH, Colone: QH, colone: XH, coloneq: YH, comma: ez, commat: tz, comp: nz, compfn: sz, complement: iz, complexes: rz, cong: az, congdot: oz, Congruent: cz, conint: lz, Conint: uz, ContourIntegral: dz, copf: fz, Copf: pz, coprod: gz, Coproduct: hz, copy: mz, COPY: _z, copysr: bz, CounterClockwiseContourIntegral: vz, crarr: yz, cross: wz, Cross: Sz, Cscr: Iz, cscr: Pz, csub: Az, csube: Cz, csup: xz, csupe: Ez, ctdot: Mz, cudarrl: $z, cudarrr: kz, cuepr: Rz, cuesc: Tz, cularr: Bz, cularrp: Dz, cupbrcap: qz, cupcap: Uz, CupCap: Lz, cup: Oz, Cup: Vz, cupcup: Nz, cupdot: Fz, cupor: jz, cups: Gz, curarr: Hz, curarrm: zz, curlyeqprec: Kz, curlyeqsucc: Wz, curlyvee: Zz, curlywedge: Jz, curren: Qz, curvearrowleft: Xz, curvearrowright: Yz, cuvee: eK, cuwed: tK, cwconint: nK, cwint: sK, cylcty: iK, dagger: rK, Dagger: aK, daleth: oK, darr: cK, Darr: lK, dArr: uK, dash: dK, Dashv: fK, dashv: pK, dbkarow: gK, dblac: hK, Dcaron: mK, dcaron: _K, Dcy: bK, dcy: vK, ddagger: yK, ddarr: wK, DD: SK, dd: IK, DDotrahd: PK, ddotseq: AK, deg: CK, Del: xK, Delta: EK, delta: MK, demptyv: $K, dfisht: kK, Dfr: RK, dfr: TK, dHar: BK, dharl: DK, dharr: qK, DiacriticalAcute: UK, DiacriticalDot: LK, DiacriticalDoubleAcute: OK, DiacriticalGrave: VK, DiacriticalTilde: NK, diam: FK, diamond: jK, Diamond: GK, diamondsuit: HK, diams: zK, die: KK, DifferentialD: WK, digamma: ZK, disin: JK, div: QK, divide: XK, divideontimes: YK, divonx: eW, DJcy: tW, djcy: nW, dlcorn: sW, dlcrop: iW, dollar: rW, Dopf: aW, dopf: oW, Dot: cW, dot: lW, DotDot: uW, doteq: dW, doteqdot: fW, DotEqual: pW, dotminus: gW, dotplus: hW, dotsquare: mW, doublebarwedge: _W, DoubleContourIntegral: bW, DoubleDot: vW, DoubleDownArrow: yW, DoubleLeftArrow: wW, DoubleLeftRightArrow: SW, DoubleLeftTee: IW, DoubleLongLeftArrow: PW, DoubleLongLeftRightArrow: AW, DoubleLongRightArrow: CW, DoubleRightArrow: xW, DoubleRightTee: EW, DoubleUpArrow: MW, DoubleUpDownArrow: $W, DoubleVerticalBar: kW, DownArrowBar: RW, downarrow: TW, DownArrow: BW, Downarrow: DW, DownArrowUpArrow: qW, DownBreve: UW, downdownarrows: LW, downharpoonleft: OW, downharpoonright: VW, DownLeftRightVector: NW, DownLeftTeeVector: FW, DownLeftVectorBar: jW, DownLeftVector: GW, DownRightTeeVector: HW, DownRightVectorBar: zW, DownRightVector: KW, DownTeeArrow: WW, DownTee: ZW, drbkarow: JW, drcorn: QW, drcrop: XW, Dscr: YW, dscr: eZ, DScy: tZ, dscy: nZ, dsol: sZ, Dstrok: iZ, dstrok: rZ, dtdot: aZ, dtri: oZ, dtrif: cZ, duarr: lZ, duhar: uZ, dwangle: dZ, DZcy: fZ, dzcy: pZ, dzigrarr: gZ, Eacute: hZ, eacute: mZ, easter: _Z, Ecaron: bZ, ecaron: vZ, Ecirc: yZ, ecirc: wZ, ecir: SZ, ecolon: IZ, Ecy: PZ, ecy: AZ, eDDot: CZ, Edot: xZ, edot: EZ, eDot: MZ, ee: $Z, efDot: kZ, Efr: RZ, efr: TZ, eg: BZ, Egrave: DZ, egrave: qZ, egs: UZ, egsdot: LZ, el: OZ, Element: VZ, elinters: NZ, ell: FZ, els: jZ, elsdot: GZ, Emacr: HZ, emacr: zZ, empty: KZ, emptyset: WZ, EmptySmallSquare: ZZ, emptyv: JZ, EmptyVerySmallSquare: QZ, emsp13: XZ, emsp14: YZ, emsp: eJ, ENG: tJ, eng: nJ, ensp: sJ, Eogon: iJ, eogon: rJ, Eopf: aJ, eopf: oJ, epar: cJ, eparsl: lJ, eplus: uJ, epsi: dJ, Epsilon: fJ, epsilon: pJ, epsiv: gJ, eqcirc: hJ, eqcolon: mJ, eqsim: _J, eqslantgtr: bJ, eqslantless: vJ, Equal: yJ, equals: wJ, EqualTilde: SJ, equest: IJ, Equilibrium: PJ, equiv: AJ, equivDD: CJ, eqvparsl: xJ, erarr: EJ, erDot: MJ, escr: $J, Escr: kJ, esdot: RJ, Esim: TJ, esim: BJ, Eta: DJ, eta: qJ, ETH: UJ, eth: LJ, Euml: OJ, euml: VJ, euro: NJ, excl: FJ, exist: jJ, Exists: GJ, expectation: HJ, exponentiale: zJ, ExponentialE: KJ, fallingdotseq: WJ, Fcy: ZJ, fcy: JJ, female: QJ, ffilig: XJ, fflig: YJ, ffllig: eQ, Ffr: tQ, ffr: nQ, filig: sQ, FilledSmallSquare: iQ, FilledVerySmallSquare: rQ, fjlig: aQ, flat: oQ, fllig: cQ, fltns: lQ, fnof: uQ, Fopf: dQ, fopf: fQ, forall: pQ, ForAll: gQ, fork: hQ, forkv: mQ, Fouriertrf: _Q, fpartint: bQ, frac12: vQ, frac13: yQ, frac14: wQ, frac15: SQ, frac16: IQ, frac18: PQ, frac23: AQ, frac25: CQ, frac34: xQ, frac35: EQ, frac38: MQ, frac45: $Q, frac56: kQ, frac58: RQ, frac78: TQ, frasl: BQ, frown: DQ, fscr: qQ, Fscr: UQ, gacute: LQ, Gamma: OQ, gamma: VQ, Gammad: NQ, gammad: FQ, gap: jQ, Gbreve: GQ, gbreve: HQ, Gcedil: zQ, Gcirc: KQ, gcirc: WQ, Gcy: ZQ, gcy: JQ, Gdot: QQ, gdot: XQ, ge: YQ, gE: eX, gEl: tX, gel: nX, geq: sX, geqq: iX, geqslant: rX, gescc: aX, ges: oX, gesdot: cX, gesdoto: lX, gesdotol: uX, gesl: dX, gesles: fX, Gfr: pX, gfr: gX, gg: hX, Gg: mX, ggg: _X, gimel: bX, GJcy: vX, gjcy: yX, gla: wX, gl: SX, glE: IX, glj: PX, gnap: AX, gnapprox: CX, gne: xX, gnE: EX, gneq: MX, gneqq: $X, gnsim: kX, Gopf: RX, gopf: TX, grave: BX, GreaterEqual: DX, GreaterEqualLess: qX, GreaterFullEqual: UX, GreaterGreater: LX, GreaterLess: OX, GreaterSlantEqual: VX, GreaterTilde: NX, Gscr: FX, gscr: jX, gsim: GX, gsime: HX, gsiml: zX, gtcc: KX, gtcir: WX, gt: ZX, GT: JX, Gt: QX, gtdot: XX, gtlPar: YX, gtquest: eY, gtrapprox: tY, gtrarr: nY, gtrdot: sY, gtreqless: iY, gtreqqless: rY, gtrless: aY, gtrsim: oY, gvertneqq: cY, gvnE: lY, Hacek: uY, hairsp: dY, half: fY, hamilt: pY, HARDcy: gY, hardcy: hY, harrcir: mY, harr: _Y, hArr: bY, harrw: vY, Hat: yY, hbar: wY, Hcirc: SY, hcirc: IY, hearts: PY, heartsuit: AY, hellip: CY, hercon: xY, hfr: EY, Hfr: MY, HilbertSpace: $Y, hksearow: kY, hkswarow: RY, hoarr: TY, homtht: BY, hookleftarrow: DY, hookrightarrow: qY, hopf: UY, Hopf: LY, horbar: OY, HorizontalLine: VY, hscr: NY, Hscr: FY, hslash: jY, Hstrok: GY, hstrok: HY, HumpDownHump: zY, HumpEqual: KY, hybull: WY, hyphen: ZY, Iacute: JY, iacute: QY, ic: XY, Icirc: YY, icirc: eee, Icy: tee, icy: nee, Idot: see, IEcy: iee, iecy: ree, iexcl: aee, iff: oee, ifr: cee, Ifr: lee, Igrave: uee, igrave: dee, ii: fee, iiiint: pee, iiint: gee, iinfin: hee, iiota: mee, IJlig: _ee, ijlig: bee, Imacr: vee, imacr: yee, image: wee, ImaginaryI: See, imagline: Iee, imagpart: Pee, imath: Aee, Im: Cee, imof: xee, imped: Eee, Implies: Mee, incare: $ee, in: "\u2208", infin: kee, infintie: Ree, inodot: Tee, intcal: Bee, int: Dee, Int: qee, integers: Uee, Integral: Lee, intercal: Oee, Intersection: Vee, intlarhk: Nee, intprod: Fee, InvisibleComma: jee, InvisibleTimes: Gee, IOcy: Hee, iocy: zee, Iogon: Kee, iogon: Wee, Iopf: Zee, iopf: Jee, Iota: Qee, iota: Xee, iprod: Yee, iquest: ete, iscr: tte, Iscr: nte, isin: ste, isindot: ite, isinE: rte, isins: ate, isinsv: ote, isinv: cte, it: lte, Itilde: ute, itilde: dte, Iukcy: fte, iukcy: pte, Iuml: gte, iuml: hte, Jcirc: mte, jcirc: _te, Jcy: bte, jcy: vte, Jfr: yte, jfr: wte, jmath: Ste, Jopf: Ite, jopf: Pte, Jscr: Ate, jscr: Cte, Jsercy: xte, jsercy: Ete, Jukcy: Mte, jukcy: $te, Kappa: kte, kappa: Rte, kappav: Tte, Kcedil: Bte, kcedil: Dte, Kcy: qte, kcy: Ute, Kfr: Lte, kfr: Ote, kgreen: Vte, KHcy: Nte, khcy: Fte, KJcy: jte, kjcy: Gte, Kopf: Hte, kopf: zte, Kscr: Kte, kscr: Wte, lAarr: Zte, Lacute: Jte, lacute: Qte, laemptyv: Xte, lagran: Yte, Lambda: ene, lambda: tne, lang: nne, Lang: sne, langd: ine, langle: rne, lap: ane, Laplacetrf: one, laquo: cne, larrb: lne, larrbfs: une, larr: dne, Larr: fne, lArr: pne, larrfs: gne, larrhk: hne, larrlp: mne, larrpl: _ne, larrsim: bne, larrtl: vne, latail: yne, lAtail: wne, lat: Sne, late: Ine, lates: Pne, lbarr: Ane, lBarr: Cne, lbbrk: xne, lbrace: Ene, lbrack: Mne, lbrke: $ne, lbrksld: kne, lbrkslu: Rne, Lcaron: Tne, lcaron: Bne, Lcedil: Dne, lcedil: qne, lceil: Une, lcub: Lne, Lcy: One, lcy: Vne, ldca: Nne, ldquo: Fne, ldquor: jne, ldrdhar: Gne, ldrushar: Hne, ldsh: zne, le: Kne, lE: Wne, LeftAngleBracket: Zne, LeftArrowBar: Jne, leftarrow: Qne, LeftArrow: Xne, Leftarrow: Yne, LeftArrowRightArrow: ese, leftarrowtail: tse, LeftCeiling: nse, LeftDoubleBracket: sse, LeftDownTeeVector: ise, LeftDownVectorBar: rse, LeftDownVector: ase, LeftFloor: ose, leftharpoondown: cse, leftharpoonup: lse, leftleftarrows: use, leftrightarrow: dse, LeftRightArrow: fse, Leftrightarrow: pse, leftrightarrows: gse, leftrightharpoons: hse, leftrightsquigarrow: mse, LeftRightVector: _se, LeftTeeArrow: bse, LeftTee: vse, LeftTeeVector: yse, leftthreetimes: wse, LeftTriangleBar: Sse, LeftTriangle: Ise, LeftTriangleEqual: Pse, LeftUpDownVector: Ase, LeftUpTeeVector: Cse, LeftUpVectorBar: xse, LeftUpVector: Ese, LeftVectorBar: Mse, LeftVector: $se, lEg: kse, leg: Rse, leq: Tse, leqq: Bse, leqslant: Dse, lescc: qse, les: Use, lesdot: Lse, lesdoto: Ose, lesdotor: Vse, lesg: Nse, lesges: Fse, lessapprox: jse, lessdot: Gse, lesseqgtr: Hse, lesseqqgtr: zse, LessEqualGreater: Kse, LessFullEqual: Wse, LessGreater: Zse, lessgtr: Jse, LessLess: Qse, lesssim: Xse, LessSlantEqual: Yse, LessTilde: eie, lfisht: tie, lfloor: nie, Lfr: sie, lfr: iie, lg: rie, lgE: aie, lHar: oie, lhard: cie, lharu: lie, lharul: uie, lhblk: die, LJcy: fie, ljcy: pie, llarr: gie, ll: hie, Ll: mie, llcorner: _ie, Lleftarrow: bie, llhard: vie, lltri: yie, Lmidot: wie, lmidot: Sie, lmoustache: Iie, lmoust: Pie, lnap: Aie, lnapprox: Cie, lne: xie, lnE: Eie, lneq: Mie, lneqq: $ie, lnsim: kie, loang: Rie, loarr: Tie, lobrk: Bie, longleftarrow: Die, LongLeftArrow: qie, Longleftarrow: Uie, longleftrightarrow: Lie, LongLeftRightArrow: Oie, Longleftrightarrow: Vie, longmapsto: Nie, longrightarrow: Fie, LongRightArrow: jie, Longrightarrow: Gie, looparrowleft: Hie, looparrowright: zie, lopar: Kie, Lopf: Wie, lopf: Zie, loplus: Jie, lotimes: Qie, lowast: Xie, lowbar: Yie, LowerLeftArrow: ere, LowerRightArrow: tre, loz: nre, lozenge: sre, lozf: ire, lpar: rre, lparlt: are, lrarr: ore, lrcorner: cre, lrhar: lre, lrhard: ure, lrm: dre, lrtri: fre, lsaquo: pre, lscr: gre, Lscr: hre, lsh: mre, Lsh: _re, lsim: bre, lsime: vre, lsimg: yre, lsqb: wre, lsquo: Sre, lsquor: Ire, Lstrok: Pre, lstrok: Are, ltcc: Cre, ltcir: xre, lt: Ere, LT: Mre, Lt: $re, ltdot: kre, lthree: Rre, ltimes: Tre, ltlarr: Bre, ltquest: Dre, ltri: qre, ltrie: Ure, ltrif: Lre, ltrPar: Ore, lurdshar: Vre, luruhar: Nre, lvertneqq: Fre, lvnE: jre, macr: Gre, male: Hre, malt: zre, maltese: Kre, Map: "\u2905", map: Wre, mapsto: Zre, mapstodown: Jre, mapstoleft: Qre, mapstoup: Xre, marker: Yre, mcomma: eae, Mcy: tae, mcy: nae, mdash: sae, mDDot: iae, measuredangle: rae, MediumSpace: aae, Mellintrf: oae, Mfr: cae, mfr: lae, mho: uae, micro: dae, midast: fae, midcir: pae, mid: gae, middot: hae, minusb: mae, minus: _ae, minusd: bae, minusdu: vae, MinusPlus: yae, mlcp: wae, mldr: Sae, mnplus: Iae, models: Pae, Mopf: Aae, mopf: Cae, mp: xae, mscr: Eae, Mscr: Mae, mstpos: $ae, Mu: kae, mu: Rae, multimap: Tae, mumap: Bae, nabla: Dae, Nacute: qae, nacute: Uae, nang: Lae, nap: Oae, napE: Vae, napid: Nae, napos: Fae, napprox: jae, natural: Gae, naturals: Hae, natur: zae, nbsp: Kae, nbump: Wae, nbumpe: Zae, ncap: Jae, Ncaron: Qae, ncaron: Xae, Ncedil: Yae, ncedil: eoe, ncong: toe, ncongdot: noe, ncup: soe, Ncy: ioe, ncy: roe, ndash: aoe, nearhk: ooe, nearr: coe, neArr: loe, nearrow: uoe, ne: doe, nedot: foe, NegativeMediumSpace: poe, NegativeThickSpace: goe, NegativeThinSpace: hoe, NegativeVeryThinSpace: moe, nequiv: _oe, nesear: boe, nesim: voe, NestedGreaterGreater: yoe, NestedLessLess: woe, NewLine: Soe, nexist: Ioe, nexists: Poe, Nfr: Aoe, nfr: Coe, ngE: xoe, nge: Eoe, ngeq: Moe, ngeqq: $oe, ngeqslant: koe, nges: Roe, nGg: Toe, ngsim: Boe, nGt: Doe, ngt: qoe, ngtr: Uoe, nGtv: Loe, nharr: Ooe, nhArr: Voe, nhpar: Noe, ni: Foe, nis: joe, nisd: Goe, niv: Hoe, NJcy: zoe, njcy: Koe, nlarr: Woe, nlArr: Zoe, nldr: Joe, nlE: Qoe, nle: Xoe, nleftarrow: Yoe, nLeftarrow: ece, nleftrightarrow: tce, nLeftrightarrow: nce, nleq: sce, nleqq: ice, nleqslant: rce, nles: ace, nless: oce, nLl: cce, nlsim: lce, nLt: uce, nlt: dce, nltri: fce, nltrie: pce, nLtv: gce, nmid: hce, NoBreak: mce, NonBreakingSpace: _ce, nopf: bce, Nopf: vce, Not: yce, not: wce, NotCongruent: Sce, NotCupCap: Ice, NotDoubleVerticalBar: Pce, NotElement: Ace, NotEqual: Cce, NotEqualTilde: xce, NotExists: Ece, NotGreater: Mce, NotGreaterEqual: $ce, NotGreaterFullEqual: kce, NotGreaterGreater: Rce, NotGreaterLess: Tce, NotGreaterSlantEqual: Bce, NotGreaterTilde: Dce, NotHumpDownHump: qce, NotHumpEqual: Uce, notin: Lce, notindot: Oce, notinE: Vce, notinva: Nce, notinvb: Fce, notinvc: jce, NotLeftTriangleBar: Gce, NotLeftTriangle: Hce, NotLeftTriangleEqual: zce, NotLess: Kce, NotLessEqual: Wce, NotLessGreater: Zce, NotLessLess: Jce, NotLessSlantEqual: Qce, NotLessTilde: Xce, NotNestedGreaterGreater: Yce, NotNestedLessLess: ele, notni: tle, notniva: nle, notnivb: sle, notnivc: ile, NotPrecedes: rle, NotPrecedesEqual: ale, NotPrecedesSlantEqual: ole, NotReverseElement: cle, NotRightTriangleBar: lle, NotRightTriangle: ule, NotRightTriangleEqual: dle, NotSquareSubset: fle, NotSquareSubsetEqual: ple, NotSquareSuperset: gle, NotSquareSupersetEqual: hle, NotSubset: mle, NotSubsetEqual: _le, NotSucceeds: ble, NotSucceedsEqual: vle, NotSucceedsSlantEqual: yle, NotSucceedsTilde: wle, NotSuperset: Sle, NotSupersetEqual: Ile, NotTilde: Ple, NotTildeEqual: Ale, NotTildeFullEqual: Cle, NotTildeTilde: xle, NotVerticalBar: Ele, nparallel: Mle, npar: $le, nparsl: kle, npart: Rle, npolint: Tle, npr: Ble, nprcue: Dle, nprec: qle, npreceq: Ule, npre: Lle, nrarrc: Ole, nrarr: Vle, nrArr: Nle, nrarrw: Fle, nrightarrow: jle, nRightarrow: Gle, nrtri: Hle, nrtrie: zle, nsc: Kle, nsccue: Wle, nsce: Zle, Nscr: Jle, nscr: Qle, nshortmid: Xle, nshortparallel: Yle, nsim: eue, nsime: tue, nsimeq: nue, nsmid: sue, nspar: iue, nsqsube: rue, nsqsupe: aue, nsub: oue, nsubE: cue, nsube: lue, nsubset: uue, nsubseteq: due, nsubseteqq: fue, nsucc: pue, nsucceq: gue, nsup: hue, nsupE: mue, nsupe: _ue, nsupset: bue, nsupseteq: vue, nsupseteqq: yue, ntgl: wue, Ntilde: Sue, ntilde: Iue, ntlg: Pue, ntriangleleft: Aue, ntrianglelefteq: Cue, ntriangleright: xue, ntrianglerighteq: Eue, Nu: Mue, nu: $ue, num: kue, numero: Rue, numsp: Tue, nvap: Bue, nvdash: Due, nvDash: que, nVdash: Uue, nVDash: Lue, nvge: Oue, nvgt: Vue, nvHarr: Nue, nvinfin: Fue, nvlArr: jue, nvle: Gue, nvlt: Hue, nvltrie: zue, nvrArr: Kue, nvrtrie: Wue, nvsim: Zue, nwarhk: Jue, nwarr: Que, nwArr: Xue, nwarrow: Yue, nwnear: ede, Oacute: tde, oacute: nde, oast: sde, Ocirc: ide, ocirc: rde, ocir: ade, Ocy: ode, ocy: cde, odash: lde, Odblac: ude, odblac: dde, odiv: fde, odot: pde, odsold: gde, OElig: hde, oelig: mde, ofcir: _de, Ofr: bde, ofr: vde, ogon: yde, Ograve: wde, ograve: Sde, ogt: Ide, ohbar: Pde, ohm: Ade, oint: Cde, olarr: xde, olcir: Ede, olcross: Mde, oline: $de, olt: kde, Omacr: Rde, omacr: Tde, Omega: Bde, omega: Dde, Omicron: qde, omicron: Ude, omid: Lde, ominus: Ode, Oopf: Vde, oopf: Nde, opar: Fde, OpenCurlyDoubleQuote: jde, OpenCurlyQuote: Gde, operp: Hde, oplus: zde, orarr: Kde, Or: Wde, or: Zde, ord: Jde, order: Qde, orderof: Xde, ordf: Yde, ordm: efe, origof: tfe, oror: nfe, orslope: sfe, orv: ife, oS: rfe, Oscr: afe, oscr: ofe, Oslash: cfe, oslash: lfe, osol: ufe, Otilde: dfe, otilde: ffe, otimesas: pfe, Otimes: gfe, otimes: hfe, Ouml: mfe, ouml: _fe, ovbar: bfe, OverBar: vfe, OverBrace: yfe, OverBracket: wfe, OverParenthesis: Sfe, para: Ife, parallel: Pfe, par: Afe, parsim: Cfe, parsl: xfe, part: Efe, PartialD: Mfe, Pcy: $fe, pcy: kfe, percnt: Rfe, period: Tfe, permil: Bfe, perp: Dfe, pertenk: qfe, Pfr: Ufe, pfr: Lfe, Phi: Ofe, phi: Vfe, phiv: Nfe, phmmat: Ffe, phone: jfe, Pi: Gfe, pi: Hfe, pitchfork: zfe, piv: Kfe, planck: Wfe, planckh: Zfe, plankv: Jfe, plusacir: Qfe, plusb: Xfe, pluscir: Yfe, plus: epe, plusdo: tpe, plusdu: npe, pluse: spe, PlusMinus: ipe, plusmn: rpe, plussim: ape, plustwo: ope, pm: cpe, Poincareplane: lpe, pointint: upe, popf: dpe, Popf: fpe, pound: ppe, prap: gpe, Pr: hpe, pr: mpe, prcue: _pe, precapprox: bpe, prec: vpe, preccurlyeq: ype, Precedes: wpe, PrecedesEqual: Spe, PrecedesSlantEqual: Ipe, PrecedesTilde: Ppe, preceq: Ape, precnapprox: Cpe, precneqq: xpe, precnsim: Epe, pre: Mpe, prE: $pe, precsim: kpe, prime: Rpe, Prime: Tpe, primes: Bpe, prnap: Dpe, prnE: qpe, prnsim: Upe, prod: Lpe, Product: Ope, profalar: Vpe, profline: Npe, profsurf: Fpe, prop: jpe, Proportional: Gpe, Proportion: Hpe, propto: zpe, prsim: Kpe, prurel: Wpe, Pscr: Zpe, pscr: Jpe, Psi: Qpe, psi: Xpe, puncsp: Ype, Qfr: ege, qfr: tge, qint: nge, qopf: sge, Qopf: ige, qprime: rge, Qscr: age, qscr: oge, quaternions: cge, quatint: lge, quest: uge, questeq: dge, quot: fge, QUOT: pge, rAarr: gge, race: hge, Racute: mge, racute: _ge, radic: bge, raemptyv: vge, rang: yge, Rang: wge, rangd: Sge, range: Ige, rangle: Pge, raquo: Age, rarrap: Cge, rarrb: xge, rarrbfs: Ege, rarrc: Mge, rarr: $ge, Rarr: kge, rArr: Rge, rarrfs: Tge, rarrhk: Bge, rarrlp: Dge, rarrpl: qge, rarrsim: Uge, Rarrtl: Lge, rarrtl: Oge, rarrw: Vge, ratail: Nge, rAtail: Fge, ratio: jge, rationals: Gge, rbarr: Hge, rBarr: zge, RBarr: Kge, rbbrk: Wge, rbrace: Zge, rbrack: Jge, rbrke: Qge, rbrksld: Xge, rbrkslu: Yge, Rcaron: ehe, rcaron: the, Rcedil: nhe, rcedil: she, rceil: ihe, rcub: rhe, Rcy: ahe, rcy: ohe, rdca: che, rdldhar: lhe, rdquo: uhe, rdquor: dhe, rdsh: fhe, real: phe, realine: ghe, realpart: hhe, reals: mhe, Re: _he, rect: bhe, reg: vhe, REG: yhe, ReverseElement: whe, ReverseEquilibrium: She, ReverseUpEquilibrium: Ihe, rfisht: Phe, rfloor: Ahe, rfr: Che, Rfr: xhe, rHar: Ehe, rhard: Mhe, rharu: $he, rharul: khe, Rho: Rhe, rho: The, rhov: Bhe, RightAngleBracket: Dhe, RightArrowBar: qhe, rightarrow: Uhe, RightArrow: Lhe, Rightarrow: Ohe, RightArrowLeftArrow: Vhe, rightarrowtail: Nhe, RightCeiling: Fhe, RightDoubleBracket: jhe, RightDownTeeVector: Ghe, RightDownVectorBar: Hhe, RightDownVector: zhe, RightFloor: Khe, rightharpoondown: Whe, rightharpoonup: Zhe, rightleftarrows: Jhe, rightleftharpoons: Qhe, rightrightarrows: Xhe, rightsquigarrow: Yhe, RightTeeArrow: eme, RightTee: tme, RightTeeVector: nme, rightthreetimes: sme, RightTriangleBar: ime, RightTriangle: rme, RightTriangleEqual: ame, RightUpDownVector: ome, RightUpTeeVector: cme, RightUpVectorBar: lme, RightUpVector: ume, RightVectorBar: dme, RightVector: fme, ring: pme, risingdotseq: gme, rlarr: hme, rlhar: mme, rlm: _me, rmoustache: bme, rmoust: vme, rnmid: yme, roang: wme, roarr: Sme, robrk: Ime, ropar: Pme, ropf: Ame, Ropf: Cme, roplus: xme, rotimes: Eme, RoundImplies: Mme, rpar: $me, rpargt: kme, rppolint: Rme, rrarr: Tme, Rrightarrow: Bme, rsaquo: Dme, rscr: qme, Rscr: Ume, rsh: Lme, Rsh: Ome, rsqb: Vme, rsquo: Nme, rsquor: Fme, rthree: jme, rtimes: Gme, rtri: Hme, rtrie: zme, rtrif: Kme, rtriltri: Wme, RuleDelayed: Zme, ruluhar: Jme, rx: Qme, Sacute: Xme, sacute: Yme, sbquo: e_e, scap: t_e, Scaron: n_e, scaron: s_e, Sc: i_e, sc: r_e, sccue: a_e, sce: o_e, scE: c_e, Scedil: l_e, scedil: u_e, Scirc: d_e, scirc: f_e, scnap: p_e, scnE: g_e, scnsim: h_e, scpolint: m_e, scsim: __e, Scy: b_e, scy: v_e, sdotb: y_e, sdot: w_e, sdote: S_e, searhk: I_e, searr: P_e, seArr: A_e, searrow: C_e, sect: x_e, semi: E_e, seswar: M_e, setminus: $_e, setmn: k_e, sext: R_e, Sfr: T_e, sfr: B_e, sfrown: D_e, sharp: q_e, SHCHcy: U_e, shchcy: L_e, SHcy: O_e, shcy: V_e, ShortDownArrow: N_e, ShortLeftArrow: F_e, shortmid: j_e, shortparallel: G_e, ShortRightArrow: H_e, ShortUpArrow: z_e, shy: K_e, Sigma: W_e, sigma: Z_e, sigmaf: J_e, sigmav: Q_e, sim: X_e, simdot: Y_e, sime: e1e, simeq: t1e, simg: n1e, simgE: s1e, siml: i1e, simlE: r1e, simne: a1e, simplus: o1e, simrarr: c1e, slarr: l1e, SmallCircle: u1e, smallsetminus: d1e, smashp: f1e, smeparsl: p1e, smid: g1e, smile: h1e, smt: m1e, smte: _1e, smtes: b1e, SOFTcy: v1e, softcy: y1e, solbar: w1e, solb: S1e, sol: I1e, Sopf: P1e, sopf: A1e, spades: C1e, spadesuit: x1e, spar: E1e, sqcap: M1e, sqcaps: $1e, sqcup: k1e, sqcups: R1e, Sqrt: T1e, sqsub: B1e, sqsube: D1e, sqsubset: q1e, sqsubseteq: U1e, sqsup: L1e, sqsupe: O1e, sqsupset: V1e, sqsupseteq: N1e, square: F1e, Square: j1e, SquareIntersection: G1e, SquareSubset: H1e, SquareSubsetEqual: z1e, SquareSuperset: K1e, SquareSupersetEqual: W1e, SquareUnion: Z1e, squarf: J1e, squ: Q1e, squf: X1e, srarr: Y1e, Sscr: ebe, sscr: tbe, ssetmn: nbe, ssmile: sbe, sstarf: ibe, Star: rbe, star: abe, starf: obe, straightepsilon: cbe, straightphi: lbe, strns: ube, sub: dbe, Sub: fbe, subdot: pbe, subE: gbe, sube: hbe, subedot: mbe, submult: _be, subnE: bbe, subne: vbe, subplus: ybe, subrarr: wbe, subset: Sbe, Subset: Ibe, subseteq: Pbe, subseteqq: Abe, SubsetEqual: Cbe, subsetneq: xbe, subsetneqq: Ebe, subsim: Mbe, subsub: $be, subsup: kbe, succapprox: Rbe, succ: Tbe, succcurlyeq: Bbe, Succeeds: Dbe, SucceedsEqual: qbe, SucceedsSlantEqual: Ube, SucceedsTilde: Lbe, succeq: Obe, succnapprox: Vbe, succneqq: Nbe, succnsim: Fbe, succsim: jbe, SuchThat: Gbe, sum: Hbe, Sum: zbe, sung: Kbe, sup1: Wbe, sup2: Zbe, sup3: Jbe, sup: Qbe, Sup: Xbe, supdot: Ybe, supdsub: eve, supE: tve, supe: nve, supedot: sve, Superset: ive, SupersetEqual: rve, suphsol: ave, suphsub: ove, suplarr: cve, supmult: lve, supnE: uve, supne: dve, supplus: fve, supset: pve, Supset: gve, supseteq: hve, supseteqq: mve, supsetneq: _ve, supsetneqq: bve, supsim: vve, supsub: yve, supsup: wve, swarhk: Sve, swarr: Ive, swArr: Pve, swarrow: Ave, swnwar: Cve, szlig: xve, Tab: Eve, target: Mve, Tau: $ve, tau: kve, tbrk: Rve, Tcaron: Tve, tcaron: Bve, Tcedil: Dve, tcedil: qve, Tcy: Uve, tcy: Lve, tdot: Ove, telrec: Vve, Tfr: Nve, tfr: Fve, there4: jve, therefore: Gve, Therefore: Hve, Theta: zve, theta: Kve, thetasym: Wve, thetav: Zve, thickapprox: Jve, thicksim: Qve, ThickSpace: Xve, ThinSpace: Yve, thinsp: eye, thkap: tye, thksim: nye, THORN: sye, thorn: iye, tilde: rye, Tilde: aye, TildeEqual: oye, TildeFullEqual: cye, TildeTilde: lye, timesbar: uye, timesb: dye, times: fye, timesd: pye, tint: gye, toea: hye, topbot: mye, topcir: _ye, top: bye, Topf: vye, topf: yye, topfork: wye, tosa: Sye, tprime: Iye, trade: Pye, TRADE: Aye, triangle: Cye, triangledown: xye, triangleleft: Eye, trianglelefteq: Mye, triangleq: $ye, triangleright: kye, trianglerighteq: Rye, tridot: Tye, trie: Bye, triminus: Dye, TripleDot: qye, triplus: Uye, trisb: Lye, tritime: Oye, trpezium: Vye, Tscr: Nye, tscr: Fye, TScy: jye, tscy: Gye, TSHcy: Hye, tshcy: zye, Tstrok: Kye, tstrok: Wye, twixt: Zye, twoheadleftarrow: Jye, twoheadrightarrow: Qye, Uacute: Xye, uacute: Yye, uarr: e0e, Uarr: t0e, uArr: n0e, Uarrocir: s0e, Ubrcy: i0e, ubrcy: r0e, Ubreve: a0e, ubreve: o0e, Ucirc: c0e, ucirc: l0e, Ucy: u0e, ucy: d0e, udarr: f0e, Udblac: p0e, udblac: g0e, udhar: h0e, ufisht: m0e, Ufr: _0e, ufr: b0e, Ugrave: v0e, ugrave: y0e, uHar: w0e, uharl: S0e, uharr: I0e, uhblk: P0e, ulcorn: A0e, ulcorner: C0e, ulcrop: x0e, ultri: E0e, Umacr: M0e, umacr: $0e, uml: k0e, UnderBar: R0e, UnderBrace: T0e, UnderBracket: B0e, UnderParenthesis: D0e, Union: q0e, UnionPlus: U0e, Uogon: L0e, uogon: O0e, Uopf: V0e, uopf: N0e, UpArrowBar: F0e, uparrow: j0e, UpArrow: G0e, Uparrow: H0e, UpArrowDownArrow: z0e, updownarrow: K0e, UpDownArrow: W0e, Updownarrow: Z0e, UpEquilibrium: J0e, upharpoonleft: Q0e, upharpoonright: X0e, uplus: Y0e, UpperLeftArrow: ewe, UpperRightArrow: twe, upsi: nwe, Upsi: swe, upsih: iwe, Upsilon: rwe, upsilon: awe, UpTeeArrow: owe, UpTee: cwe, upuparrows: lwe, urcorn: uwe, urcorner: dwe, urcrop: fwe, Uring: pwe, uring: gwe, urtri: hwe, Uscr: mwe, uscr: _we, utdot: bwe, Utilde: vwe, utilde: ywe, utri: wwe, utrif: Swe, uuarr: Iwe, Uuml: Pwe, uuml: Awe, uwangle: Cwe, vangrt: xwe, varepsilon: Ewe, varkappa: Mwe, varnothing: $we, varphi: kwe, varpi: Rwe, varpropto: Twe, varr: Bwe, vArr: Dwe, varrho: qwe, varsigma: Uwe, varsubsetneq: Lwe, varsubsetneqq: Owe, varsupsetneq: Vwe, varsupsetneqq: Nwe, vartheta: Fwe, vartriangleleft: jwe, vartriangleright: Gwe, vBar: Hwe, Vbar: zwe, vBarv: Kwe, Vcy: Wwe, vcy: Zwe, vdash: Jwe, vDash: Qwe, Vdash: Xwe, VDash: Ywe, Vdashl: eSe, veebar: tSe, vee: nSe, Vee: sSe, veeeq: iSe, vellip: rSe, verbar: aSe, Verbar: oSe, vert: cSe, Vert: lSe, VerticalBar: uSe, VerticalLine: dSe, VerticalSeparator: fSe, VerticalTilde: pSe, VeryThinSpace: gSe, Vfr: hSe, vfr: mSe, vltri: _Se, vnsub: bSe, vnsup: vSe, Vopf: ySe, vopf: wSe, vprop: SSe, vrtri: ISe, Vscr: PSe, vscr: ASe, vsubnE: CSe, vsubne: xSe, vsupnE: ESe, vsupne: MSe, Vvdash: $Se, vzigzag: kSe, Wcirc: RSe, wcirc: TSe, wedbar: BSe, wedge: DSe, Wedge: qSe, wedgeq: USe, weierp: LSe, Wfr: OSe, wfr: VSe, Wopf: NSe, wopf: FSe, wp: jSe, wr: GSe, wreath: HSe, Wscr: zSe, wscr: KSe, xcap: WSe, xcirc: ZSe, xcup: JSe, xdtri: QSe, Xfr: XSe, xfr: YSe, xharr: eIe, xhArr: tIe, Xi: nIe, xi: sIe, xlarr: iIe, xlArr: rIe, xmap: aIe, xnis: oIe, xodot: cIe, Xopf: lIe, xopf: uIe, xoplus: dIe, xotime: fIe, xrarr: pIe, xrArr: gIe, Xscr: hIe, xscr: mIe, xsqcup: _Ie, xuplus: bIe, xutri: vIe, xvee: yIe, xwedge: wIe, Yacute: SIe, yacute: IIe, YAcy: PIe, yacy: AIe, Ycirc: CIe, ycirc: xIe, Ycy: EIe, ycy: MIe, yen: $Ie, Yfr: kIe, yfr: RIe, YIcy: TIe, yicy: BIe, Yopf: DIe, yopf: qIe, Yscr: UIe, yscr: LIe, YUcy: OIe, yucy: VIe, yuml: NIe, Yuml: FIe, Zacute: jIe, zacute: GIe, Zcaron: HIe, zcaron: zIe, Zcy: KIe, zcy: WIe, Zdot: ZIe, zdot: JIe, zeetrf: QIe, ZeroWidthSpace: XIe, Zeta: YIe, zeta: ePe, zfr: tPe, Zfr: nPe, ZHcy: sPe, zhcy: iPe, zigrarr: rPe, zopf: aPe, Zopf: oPe, Zscr: cPe, zscr: lPe, zwj: uPe, zwnj: dPe }, fPe = "\xC1", pPe = "\xE1", gPe = "\xC2", hPe = "\xE2", mPe = "\xB4", _Pe = "\xC6", bPe = "\xE6", vPe = "\xC0", yPe = "\xE0", wPe = "&", SPe = "&", IPe = "\xC5", PPe = "\xE5", APe = "\xC3", CPe = "\xE3", xPe = "\xC4", EPe = "\xE4", MPe = "\xA6", $Pe = "\xC7", kPe = "\xE7", RPe = "\xB8", TPe = "\xA2", BPe = "\xA9", DPe = "\xA9", qPe = "\xA4", UPe = "\xB0", LPe = "\xF7", OPe = "\xC9", VPe = "\xE9", NPe = "\xCA", FPe = "\xEA", jPe = "\xC8", GPe = "\xE8", HPe = "\xD0", zPe = "\xF0", KPe = "\xCB", WPe = "\xEB", ZPe = "\xBD", JPe = "\xBC", QPe = "\xBE", XPe = ">", YPe = ">", eAe = "\xCD", tAe = "\xED", nAe = "\xCE", sAe = "\xEE", iAe = "\xA1", rAe = "\xCC", aAe = "\xEC", oAe = "\xBF", cAe = "\xCF", lAe = "\xEF", uAe = "\xAB", dAe = "<", fAe = "<", pAe = "\xAF", gAe = "\xB5", hAe = "\xB7", mAe = "\xA0", _Ae = "\xAC", bAe = "\xD1", vAe = "\xF1", yAe = "\xD3", wAe = "\xF3", SAe = "\xD4", IAe = "\xF4", PAe = "\xD2", AAe = "\xF2", CAe = "\xAA", xAe = "\xBA", EAe = "\xD8", MAe = "\xF8", $Ae = "\xD5", kAe = "\xF5", RAe = "\xD6", TAe = "\xF6", BAe = "\xB6", DAe = "\xB1", qAe = "\xA3", UAe = '"', LAe = '"', OAe = "\xBB", VAe = "\xAE", NAe = "\xAE", FAe = "\xA7", jAe = "\xAD", GAe = "\xB9", HAe = "\xB2", zAe = "\xB3", KAe = "\xDF", WAe = "\xDE", ZAe = "\xFE", JAe = "\xD7", QAe = "\xDA", XAe = "\xFA", YAe = "\xDB", eCe = "\xFB", tCe = "\xD9", nCe = "\xF9", sCe = "\xA8", iCe = "\xDC", rCe = "\xFC", aCe = "\xDD", oCe = "\xFD", cCe = "\xA5", lCe = "\xFF", uCe = { Aacute: fPe, aacute: pPe, Acirc: gPe, acirc: hPe, acute: mPe, AElig: _Pe, aelig: bPe, Agrave: vPe, agrave: yPe, amp: wPe, AMP: SPe, Aring: IPe, aring: PPe, Atilde: APe, atilde: CPe, Auml: xPe, auml: EPe, brvbar: MPe, Ccedil: $Pe, ccedil: kPe, cedil: RPe, cent: TPe, copy: BPe, COPY: DPe, curren: qPe, deg: UPe, divide: LPe, Eacute: OPe, eacute: VPe, Ecirc: NPe, ecirc: FPe, Egrave: jPe, egrave: GPe, ETH: HPe, eth: zPe, Euml: KPe, euml: WPe, frac12: ZPe, frac14: JPe, frac34: QPe, gt: XPe, GT: YPe, Iacute: eAe, iacute: tAe, Icirc: nAe, icirc: sAe, iexcl: iAe, Igrave: rAe, igrave: aAe, iquest: oAe, Iuml: cAe, iuml: lAe, laquo: uAe, lt: dAe, LT: fAe, macr: pAe, micro: gAe, middot: hAe, nbsp: mAe, not: _Ae, Ntilde: bAe, ntilde: vAe, Oacute: yAe, oacute: wAe, Ocirc: SAe, ocirc: IAe, Ograve: PAe, ograve: AAe, ordf: CAe, ordm: xAe, Oslash: EAe, oslash: MAe, Otilde: $Ae, otilde: kAe, Ouml: RAe, ouml: TAe, para: BAe, plusmn: DAe, pound: qAe, quot: UAe, QUOT: LAe, raquo: OAe, reg: VAe, REG: NAe, sect: FAe, shy: jAe, sup1: GAe, sup2: HAe, sup3: zAe, szlig: KAe, THORN: WAe, thorn: ZAe, times: JAe, Uacute: QAe, uacute: XAe, Ucirc: YAe, ucirc: eCe, Ugrave: tCe, ugrave: nCe, uml: sCe, Uuml: iCe, uuml: rCe, Yacute: aCe, yacute: oCe, yen: cCe, yuml: lCe }, dCe = "&", fCe = "'", pCe = ">", gCe = "<", hCe = '"', uc = { amp: dCe, apos: fCe, gt: pCe, lt: gCe, quot: hCe };
var Pn = {};
const mCe = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
var Ir;
function _Ce() {
  if (Ir) return Pn;
  Ir = 1;
  var t = Pn && Pn.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(Pn, "__esModule", { value: true });
  var d = t(mCe), g = String.fromCodePoint || function(l) {
    var r = "";
    return l > 65535 && (l -= 65536, r += String.fromCharCode(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), r += String.fromCharCode(l), r;
  };
  function i(l) {
    return l >= 55296 && l <= 57343 || l > 1114111 ? "\uFFFD" : (l in d.default && (l = d.default[l]), g(l));
  }
  return Pn.default = i, Pn;
}
var Pr;
function Ar() {
  if (Pr) return yt;
  Pr = 1;
  var t = yt && yt.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(yt, "__esModule", { value: true }), yt.decodeHTML = yt.decodeHTMLStrict = yt.decodeXML = void 0;
  var d = t(lc), g = t(uCe), i = t(uc), l = t(_Ce()), r = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  yt.decodeXML = e(i.default), yt.decodeHTMLStrict = e(d.default);
  function e(a) {
    var o = n(a);
    return function(c) {
      return String(c).replace(r, o);
    };
  }
  var s = function(a, o) {
    return a < o ? 1 : -1;
  };
  yt.decodeHTML = (function() {
    for (var a = Object.keys(g.default).sort(s), o = Object.keys(d.default).sort(s), c = 0, u = 0; c < o.length; c++) a[u] === o[c] ? (o[c] += ";?", u++) : o[c] += ";";
    var _ = new RegExp("&(?:" + o.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), S = n(d.default);
    function $(m) {
      return m.substr(-1) !== ";" && (m += ";"), S(m);
    }
    return function(m) {
      return String(m).replace(_, $);
    };
  })();
  function n(a) {
    return function(c) {
      if (c.charAt(1) === "#") {
        var u = c.charAt(2);
        return u === "X" || u === "x" ? l.default(parseInt(c.substr(3), 16)) : l.default(parseInt(c.substr(2), 10));
      }
      return a[c.slice(1, -1)] || c;
    };
  }
  return yt;
}
var ot = {}, Cr;
function xr() {
  if (Cr) return ot;
  Cr = 1;
  var t = ot && ot.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(ot, "__esModule", { value: true }), ot.escapeUTF8 = ot.escape = ot.encodeNonAsciiHTML = ot.encodeHTML = ot.encodeXML = void 0;
  var d = t(uc), g = s(d.default), i = n(g);
  ot.encodeXML = m(g);
  var l = t(lc), r = s(l.default), e = n(r);
  ot.encodeHTML = u(r, e), ot.encodeNonAsciiHTML = m(r);
  function s(h) {
    return Object.keys(h).sort().reduce(function(I, b) {
      return I[h[b]] = "&" + b + ";", I;
    }, {});
  }
  function n(h) {
    for (var I = [], b = [], f = 0, p = Object.keys(h); f < p.length; f++) {
      var w = p[f];
      w.length === 1 ? I.push("\\" + w) : b.push(w);
    }
    I.sort();
    for (var M = 0; M < I.length - 1; M++) {
      for (var T = M; T < I.length - 1 && I[T].charCodeAt(1) + 1 === I[T + 1].charCodeAt(1); ) T += 1;
      var k = 1 + T - M;
      k < 3 || I.splice(M, k, I[M] + "-" + I[T]);
    }
    return b.unshift("[" + I.join("") + "]"), new RegExp(b.join("|"), "g");
  }
  var a = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, o = String.prototype.codePointAt != null ? function(h) {
    return h.codePointAt(0);
  } : function(h) {
    return (h.charCodeAt(0) - 55296) * 1024 + h.charCodeAt(1) - 56320 + 65536;
  };
  function c(h) {
    return "&#x" + (h.length > 1 ? o(h) : h.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  function u(h, I) {
    return function(b) {
      return b.replace(I, function(f) {
        return h[f];
      }).replace(a, c);
    };
  }
  var _ = new RegExp(i.source + "|" + a.source, "g");
  function S(h) {
    return h.replace(_, c);
  }
  ot.escape = S;
  function $(h) {
    return h.replace(i, c);
  }
  ot.escapeUTF8 = $;
  function m(h) {
    return function(I) {
      return I.replace(_, function(b) {
        return h[b] || c(b);
      });
    };
  }
  return ot;
}
var Er;
function bCe() {
  return Er || (Er = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.decodeXMLStrict = t.decodeHTML5Strict = t.decodeHTML4Strict = t.decodeHTML5 = t.decodeHTML4 = t.decodeHTMLStrict = t.decodeHTML = t.decodeXML = t.encodeHTML5 = t.encodeHTML4 = t.escapeUTF8 = t.escape = t.encodeNonAsciiHTML = t.encodeHTML = t.encodeXML = t.encode = t.decodeStrict = t.decode = void 0;
    var d = Ar(), g = xr();
    function i(n, a) {
      return (!a || a <= 0 ? d.decodeXML : d.decodeHTML)(n);
    }
    t.decode = i;
    function l(n, a) {
      return (!a || a <= 0 ? d.decodeXML : d.decodeHTMLStrict)(n);
    }
    t.decodeStrict = l;
    function r(n, a) {
      return (!a || a <= 0 ? g.encodeXML : g.encodeHTML)(n);
    }
    t.encode = r;
    var e = xr();
    Object.defineProperty(t, "encodeXML", { enumerable: true, get: function() {
      return e.encodeXML;
    } }), Object.defineProperty(t, "encodeHTML", { enumerable: true, get: function() {
      return e.encodeHTML;
    } }), Object.defineProperty(t, "encodeNonAsciiHTML", { enumerable: true, get: function() {
      return e.encodeNonAsciiHTML;
    } }), Object.defineProperty(t, "escape", { enumerable: true, get: function() {
      return e.escape;
    } }), Object.defineProperty(t, "escapeUTF8", { enumerable: true, get: function() {
      return e.escapeUTF8;
    } }), Object.defineProperty(t, "encodeHTML4", { enumerable: true, get: function() {
      return e.encodeHTML;
    } }), Object.defineProperty(t, "encodeHTML5", { enumerable: true, get: function() {
      return e.encodeHTML;
    } });
    var s = Ar();
    Object.defineProperty(t, "decodeXML", { enumerable: true, get: function() {
      return s.decodeXML;
    } }), Object.defineProperty(t, "decodeHTML", { enumerable: true, get: function() {
      return s.decodeHTML;
    } }), Object.defineProperty(t, "decodeHTMLStrict", { enumerable: true, get: function() {
      return s.decodeHTMLStrict;
    } }), Object.defineProperty(t, "decodeHTML4", { enumerable: true, get: function() {
      return s.decodeHTML;
    } }), Object.defineProperty(t, "decodeHTML5", { enumerable: true, get: function() {
      return s.decodeHTML;
    } }), Object.defineProperty(t, "decodeHTML4Strict", { enumerable: true, get: function() {
      return s.decodeHTMLStrict;
    } }), Object.defineProperty(t, "decodeHTML5Strict", { enumerable: true, get: function() {
      return s.decodeHTMLStrict;
    } }), Object.defineProperty(t, "decodeXMLStrict", { enumerable: true, get: function() {
      return s.decodeXML;
    } });
  })(li)), li;
}
var Zt = {}, Mr;
function vCe() {
  return Mr || (Mr = 1, Object.defineProperty(Zt, "__esModule", { value: true }), Zt.attributeNames = Zt.elementNames = void 0, Zt.elementNames = /* @__PURE__ */ new Map([["altglyph", "altGlyph"], ["altglyphdef", "altGlyphDef"], ["altglyphitem", "altGlyphItem"], ["animatecolor", "animateColor"], ["animatemotion", "animateMotion"], ["animatetransform", "animateTransform"], ["clippath", "clipPath"], ["feblend", "feBlend"], ["fecolormatrix", "feColorMatrix"], ["fecomponenttransfer", "feComponentTransfer"], ["fecomposite", "feComposite"], ["feconvolvematrix", "feConvolveMatrix"], ["fediffuselighting", "feDiffuseLighting"], ["fedisplacementmap", "feDisplacementMap"], ["fedistantlight", "feDistantLight"], ["fedropshadow", "feDropShadow"], ["feflood", "feFlood"], ["fefunca", "feFuncA"], ["fefuncb", "feFuncB"], ["fefuncg", "feFuncG"], ["fefuncr", "feFuncR"], ["fegaussianblur", "feGaussianBlur"], ["feimage", "feImage"], ["femerge", "feMerge"], ["femergenode", "feMergeNode"], ["femorphology", "feMorphology"], ["feoffset", "feOffset"], ["fepointlight", "fePointLight"], ["fespecularlighting", "feSpecularLighting"], ["fespotlight", "feSpotLight"], ["fetile", "feTile"], ["feturbulence", "feTurbulence"], ["foreignobject", "foreignObject"], ["glyphref", "glyphRef"], ["lineargradient", "linearGradient"], ["radialgradient", "radialGradient"], ["textpath", "textPath"]]), Zt.attributeNames = /* @__PURE__ */ new Map([["definitionurl", "definitionURL"], ["attributename", "attributeName"], ["attributetype", "attributeType"], ["basefrequency", "baseFrequency"], ["baseprofile", "baseProfile"], ["calcmode", "calcMode"], ["clippathunits", "clipPathUnits"], ["diffuseconstant", "diffuseConstant"], ["edgemode", "edgeMode"], ["filterunits", "filterUnits"], ["glyphref", "glyphRef"], ["gradienttransform", "gradientTransform"], ["gradientunits", "gradientUnits"], ["kernelmatrix", "kernelMatrix"], ["kernelunitlength", "kernelUnitLength"], ["keypoints", "keyPoints"], ["keysplines", "keySplines"], ["keytimes", "keyTimes"], ["lengthadjust", "lengthAdjust"], ["limitingconeangle", "limitingConeAngle"], ["markerheight", "markerHeight"], ["markerunits", "markerUnits"], ["markerwidth", "markerWidth"], ["maskcontentunits", "maskContentUnits"], ["maskunits", "maskUnits"], ["numoctaves", "numOctaves"], ["pathlength", "pathLength"], ["patterncontentunits", "patternContentUnits"], ["patterntransform", "patternTransform"], ["patternunits", "patternUnits"], ["pointsatx", "pointsAtX"], ["pointsaty", "pointsAtY"], ["pointsatz", "pointsAtZ"], ["preservealpha", "preserveAlpha"], ["preserveaspectratio", "preserveAspectRatio"], ["primitiveunits", "primitiveUnits"], ["refx", "refX"], ["refy", "refY"], ["repeatcount", "repeatCount"], ["repeatdur", "repeatDur"], ["requiredextensions", "requiredExtensions"], ["requiredfeatures", "requiredFeatures"], ["specularconstant", "specularConstant"], ["specularexponent", "specularExponent"], ["spreadmethod", "spreadMethod"], ["startoffset", "startOffset"], ["stddeviation", "stdDeviation"], ["stitchtiles", "stitchTiles"], ["surfacescale", "surfaceScale"], ["systemlanguage", "systemLanguage"], ["tablevalues", "tableValues"], ["targetx", "targetX"], ["targety", "targetY"], ["textlength", "textLength"], ["viewbox", "viewBox"], ["viewtarget", "viewTarget"], ["xchannelselector", "xChannelSelector"], ["ychannelselector", "yChannelSelector"], ["zoomandpan", "zoomAndPan"]])), Zt;
}
var $r;
function yCe() {
  if ($r) return mt;
  $r = 1;
  var t = mt && mt.__assign || function() {
    return t = Object.assign || function(b) {
      for (var f, p = 1, w = arguments.length; p < w; p++) {
        f = arguments[p];
        for (var M in f) Object.prototype.hasOwnProperty.call(f, M) && (b[M] = f[M]);
      }
      return b;
    }, t.apply(this, arguments);
  }, d = mt && mt.__createBinding || (Object.create ? (function(b, f, p, w) {
    w === void 0 && (w = p), Object.defineProperty(b, w, { enumerable: true, get: function() {
      return f[p];
    } });
  }) : (function(b, f, p, w) {
    w === void 0 && (w = p), b[w] = f[p];
  })), g = mt && mt.__setModuleDefault || (Object.create ? (function(b, f) {
    Object.defineProperty(b, "default", { enumerable: true, value: f });
  }) : function(b, f) {
    b.default = f;
  }), i = mt && mt.__importStar || function(b) {
    if (b && b.__esModule) return b;
    var f = {};
    if (b != null) for (var p in b) p !== "default" && Object.prototype.hasOwnProperty.call(b, p) && d(f, b, p);
    return g(f, b), f;
  };
  Object.defineProperty(mt, "__esModule", { value: true });
  var l = i(As()), r = bCe(), e = vCe(), s = /* @__PURE__ */ new Set(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
  function n(b, f) {
    if (b) return Object.keys(b).map(function(p) {
      var w, M, T = (w = b[p]) !== null && w !== void 0 ? w : "";
      return f.xmlMode === "foreign" && (p = (M = e.attributeNames.get(p)) !== null && M !== void 0 ? M : p), !f.emptyAttrs && !f.xmlMode && T === "" ? p : p + '="' + (f.decodeEntities !== false ? r.encodeXML(T) : T.replace(/"/g, "&quot;")) + '"';
    }).join(" ");
  }
  var a = /* @__PURE__ */ new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
  function o(b, f) {
    f === void 0 && (f = {});
    for (var p = ("length" in b) ? b : [b], w = "", M = 0; M < p.length; M++) w += c(p[M], f);
    return w;
  }
  mt.default = o;
  function c(b, f) {
    switch (b.type) {
      case l.Root:
        return o(b.children, f);
      case l.Directive:
      case l.Doctype:
        return $(b);
      case l.Comment:
        return I(b);
      case l.CDATA:
        return h(b);
      case l.Script:
      case l.Style:
      case l.Tag:
        return S(b, f);
      case l.Text:
        return m(b, f);
    }
  }
  var u = /* @__PURE__ */ new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]), _ = /* @__PURE__ */ new Set(["svg", "math"]);
  function S(b, f) {
    var p;
    f.xmlMode === "foreign" && (b.name = (p = e.elementNames.get(b.name)) !== null && p !== void 0 ? p : b.name, b.parent && u.has(b.parent.name) && (f = t(t({}, f), { xmlMode: false }))), !f.xmlMode && _.has(b.name) && (f = t(t({}, f), { xmlMode: "foreign" }));
    var w = "<" + b.name, M = n(b.attribs, f);
    return M && (w += " " + M), b.children.length === 0 && (f.xmlMode ? f.selfClosingTags !== false : f.selfClosingTags && a.has(b.name)) ? (f.xmlMode || (w += " "), w += "/>") : (w += ">", b.children.length > 0 && (w += o(b.children, f)), (f.xmlMode || !a.has(b.name)) && (w += "</" + b.name + ">")), w;
  }
  function $(b) {
    return "<" + b.data + ">";
  }
  function m(b, f) {
    var p = b.data || "";
    return f.decodeEntities !== false && !(!f.xmlMode && b.parent && s.has(b.parent.name)) && (p = r.encodeXML(p)), p;
  }
  function h(b) {
    return "<![CDATA[" + b.children[0].data + "]]>";
  }
  function I(b) {
    return "<!--" + b.data + "-->";
  }
  return mt;
}
var kr;
function dc() {
  if (kr) return at;
  kr = 1;
  var t = at && at.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(at, "__esModule", { value: true }), at.innerText = at.textContent = at.getText = at.getInnerHTML = at.getOuterHTML = void 0;
  var d = jt(), g = t(yCe()), i = As();
  function l(a, o) {
    return (0, g.default)(a, o);
  }
  at.getOuterHTML = l;
  function r(a, o) {
    return (0, d.hasChildren)(a) ? a.children.map(function(c) {
      return l(c, o);
    }).join("") : "";
  }
  at.getInnerHTML = r;
  function e(a) {
    return Array.isArray(a) ? a.map(e).join("") : (0, d.isTag)(a) ? a.name === "br" ? `
` : e(a.children) : (0, d.isCDATA)(a) ? e(a.children) : (0, d.isText)(a) ? a.data : "";
  }
  at.getText = e;
  function s(a) {
    return Array.isArray(a) ? a.map(s).join("") : (0, d.hasChildren)(a) && !(0, d.isComment)(a) ? s(a.children) : (0, d.isText)(a) ? a.data : "";
  }
  at.textContent = s;
  function n(a) {
    return Array.isArray(a) ? a.map(n).join("") : (0, d.hasChildren)(a) && (a.type === i.ElementType.Tag || (0, d.isCDATA)(a)) ? n(a.children) : (0, d.isText)(a) ? a.data : "";
  }
  return at.innerText = n, at;
}
var Je = {}, Rr;
function wCe() {
  if (Rr) return Je;
  Rr = 1, Object.defineProperty(Je, "__esModule", { value: true }), Je.prevElementSibling = Je.nextElementSibling = Je.getName = Je.hasAttrib = Je.getAttributeValue = Je.getSiblings = Je.getParent = Je.getChildren = void 0;
  var t = jt(), d = [];
  function g(o) {
    var c;
    return (c = o.children) !== null && c !== void 0 ? c : d;
  }
  Je.getChildren = g;
  function i(o) {
    return o.parent || null;
  }
  Je.getParent = i;
  function l(o) {
    var c, u, _ = i(o);
    if (_ != null) return g(_);
    for (var S = [o], $ = o.prev, m = o.next; $ != null; ) S.unshift($), c = $, $ = c.prev;
    for (; m != null; ) S.push(m), u = m, m = u.next;
    return S;
  }
  Je.getSiblings = l;
  function r(o, c) {
    var u;
    return (u = o.attribs) === null || u === void 0 ? void 0 : u[c];
  }
  Je.getAttributeValue = r;
  function e(o, c) {
    return o.attribs != null && Object.prototype.hasOwnProperty.call(o.attribs, c) && o.attribs[c] != null;
  }
  Je.hasAttrib = e;
  function s(o) {
    return o.name;
  }
  Je.getName = s;
  function n(o) {
    for (var c, u = o.next; u !== null && !(0, t.isTag)(u); ) c = u, u = c.next;
    return u;
  }
  Je.nextElementSibling = n;
  function a(o) {
    for (var c, u = o.prev; u !== null && !(0, t.isTag)(u); ) c = u, u = c.prev;
    return u;
  }
  return Je.prevElementSibling = a, Je;
}
var ct = {}, Tr;
function SCe() {
  if (Tr) return ct;
  Tr = 1, Object.defineProperty(ct, "__esModule", { value: true }), ct.prepend = ct.prependChild = ct.append = ct.appendChild = ct.replaceElement = ct.removeElement = void 0;
  function t(e) {
    if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
      var s = e.parent.children;
      s.splice(s.lastIndexOf(e), 1);
    }
  }
  ct.removeElement = t;
  function d(e, s) {
    var n = s.prev = e.prev;
    n && (n.next = s);
    var a = s.next = e.next;
    a && (a.prev = s);
    var o = s.parent = e.parent;
    if (o) {
      var c = o.children;
      c[c.lastIndexOf(e)] = s;
    }
  }
  ct.replaceElement = d;
  function g(e, s) {
    if (t(s), s.next = null, s.parent = e, e.children.push(s) > 1) {
      var n = e.children[e.children.length - 2];
      n.next = s, s.prev = n;
    } else s.prev = null;
  }
  ct.appendChild = g;
  function i(e, s) {
    t(s);
    var n = e.parent, a = e.next;
    if (s.next = a, s.prev = e, e.next = s, s.parent = n, a) {
      if (a.prev = s, n) {
        var o = n.children;
        o.splice(o.lastIndexOf(a), 0, s);
      }
    } else n && n.children.push(s);
  }
  ct.append = i;
  function l(e, s) {
    if (t(s), s.parent = e, s.prev = null, e.children.unshift(s) !== 1) {
      var n = e.children[1];
      n.prev = s, s.next = n;
    } else s.next = null;
  }
  ct.prependChild = l;
  function r(e, s) {
    t(s);
    var n = e.parent;
    if (n) {
      var a = n.children;
      a.splice(a.indexOf(e), 0, s);
    }
    e.prev && (e.prev.next = s), s.parent = n, s.prev = e.prev, s.next = e, e.prev = s;
  }
  return ct.prepend = r, ct;
}
var lt = {}, Br;
function fc() {
  if (Br) return lt;
  Br = 1, Object.defineProperty(lt, "__esModule", { value: true }), lt.findAll = lt.existsOne = lt.findOne = lt.findOneChild = lt.find = lt.filter = void 0;
  var t = jt();
  function d(s, n, a, o) {
    return a === void 0 && (a = true), o === void 0 && (o = 1 / 0), Array.isArray(n) || (n = [n]), g(s, n, a, o);
  }
  lt.filter = d;
  function g(s, n, a, o) {
    for (var c = [], u = 0, _ = n; u < _.length; u++) {
      var S = _[u];
      if (s(S) && (c.push(S), --o <= 0)) break;
      if (a && (0, t.hasChildren)(S) && S.children.length > 0) {
        var $ = g(s, S.children, a, o);
        if (c.push.apply(c, $), o -= $.length, o <= 0) break;
      }
    }
    return c;
  }
  lt.find = g;
  function i(s, n) {
    return n.find(s);
  }
  lt.findOneChild = i;
  function l(s, n, a) {
    a === void 0 && (a = true);
    for (var o = null, c = 0; c < n.length && !o; c++) {
      var u = n[c];
      if ((0, t.isTag)(u)) s(u) ? o = u : a && u.children.length > 0 && (o = l(s, u.children));
      else continue;
    }
    return o;
  }
  lt.findOne = l;
  function r(s, n) {
    return n.some(function(a) {
      return (0, t.isTag)(a) && (s(a) || a.children.length > 0 && r(s, a.children));
    });
  }
  lt.existsOne = r;
  function e(s, n) {
    for (var a, o = [], c = n.filter(t.isTag), u; u = c.shift(); ) {
      var _ = (a = u.children) === null || a === void 0 ? void 0 : a.filter(t.isTag);
      _ && _.length > 0 && c.unshift.apply(c, _), s(u) && o.push(u);
    }
    return o;
  }
  return lt.findAll = e, lt;
}
var gt = {}, Dr;
function pc() {
  if (Dr) return gt;
  Dr = 1, Object.defineProperty(gt, "__esModule", { value: true }), gt.getElementsByTagType = gt.getElementsByTagName = gt.getElementById = gt.getElements = gt.testElement = void 0;
  var t = jt(), d = fc(), g = { tag_name: function(c) {
    return typeof c == "function" ? function(u) {
      return (0, t.isTag)(u) && c(u.name);
    } : c === "*" ? t.isTag : function(u) {
      return (0, t.isTag)(u) && u.name === c;
    };
  }, tag_type: function(c) {
    return typeof c == "function" ? function(u) {
      return c(u.type);
    } : function(u) {
      return u.type === c;
    };
  }, tag_contains: function(c) {
    return typeof c == "function" ? function(u) {
      return (0, t.isText)(u) && c(u.data);
    } : function(u) {
      return (0, t.isText)(u) && u.data === c;
    };
  } };
  function i(c, u) {
    return typeof u == "function" ? function(_) {
      return (0, t.isTag)(_) && u(_.attribs[c]);
    } : function(_) {
      return (0, t.isTag)(_) && _.attribs[c] === u;
    };
  }
  function l(c, u) {
    return function(_) {
      return c(_) || u(_);
    };
  }
  function r(c) {
    var u = Object.keys(c).map(function(_) {
      var S = c[_];
      return Object.prototype.hasOwnProperty.call(g, _) ? g[_](S) : i(_, S);
    });
    return u.length === 0 ? null : u.reduce(l);
  }
  function e(c, u) {
    var _ = r(c);
    return _ ? _(u) : true;
  }
  gt.testElement = e;
  function s(c, u, _, S) {
    S === void 0 && (S = 1 / 0);
    var $ = r(c);
    return $ ? (0, d.filter)($, u, _, S) : [];
  }
  gt.getElements = s;
  function n(c, u, _) {
    return _ === void 0 && (_ = true), Array.isArray(u) || (u = [u]), (0, d.findOne)(i("id", c), u, _);
  }
  gt.getElementById = n;
  function a(c, u, _, S) {
    return _ === void 0 && (_ = true), S === void 0 && (S = 1 / 0), (0, d.filter)(g.tag_name(c), u, _, S);
  }
  gt.getElementsByTagName = a;
  function o(c, u, _, S) {
    return _ === void 0 && (_ = true), S === void 0 && (S = 1 / 0), (0, d.filter)(g.tag_type(c), u, _, S);
  }
  return gt.getElementsByTagType = o, gt;
}
var Ut = {}, qr;
function ICe() {
  if (qr) return Ut;
  qr = 1, Object.defineProperty(Ut, "__esModule", { value: true }), Ut.uniqueSort = Ut.compareDocumentPosition = Ut.removeSubsets = void 0;
  var t = jt();
  function d(l) {
    for (var r = l.length; --r >= 0; ) {
      var e = l[r];
      if (r > 0 && l.lastIndexOf(e, r - 1) >= 0) {
        l.splice(r, 1);
        continue;
      }
      for (var s = e.parent; s; s = s.parent) if (l.includes(s)) {
        l.splice(r, 1);
        break;
      }
    }
    return l;
  }
  Ut.removeSubsets = d;
  function g(l, r) {
    var e = [], s = [];
    if (l === r) return 0;
    for (var n = (0, t.hasChildren)(l) ? l : l.parent; n; ) e.unshift(n), n = n.parent;
    for (n = (0, t.hasChildren)(r) ? r : r.parent; n; ) s.unshift(n), n = n.parent;
    for (var a = Math.min(e.length, s.length), o = 0; o < a && e[o] === s[o]; ) o++;
    if (o === 0) return 1;
    var c = e[o - 1], u = c.children, _ = e[o], S = s[o];
    return u.indexOf(_) > u.indexOf(S) ? c === r ? 20 : 4 : c === l ? 10 : 2;
  }
  Ut.compareDocumentPosition = g;
  function i(l) {
    return l = l.filter(function(r, e, s) {
      return !s.includes(r, e + 1);
    }), l.sort(function(r, e) {
      var s = g(r, e);
      return s & 2 ? -1 : s & 4 ? 1 : 0;
    }), l;
  }
  return Ut.uniqueSort = i, Ut;
}
var qn = {}, Ur;
function PCe() {
  if (Ur) return qn;
  Ur = 1, Object.defineProperty(qn, "__esModule", { value: true }), qn.getFeed = void 0;
  var t = dc(), d = pc();
  function g(u) {
    var _ = n(c, u);
    return _ ? _.name === "feed" ? i(_) : l(_) : null;
  }
  qn.getFeed = g;
  function i(u) {
    var _, S = u.children, $ = { type: "atom", items: (0, d.getElementsByTagName)("entry", S).map(function(I) {
      var b, f = I.children, p = { media: s(f) };
      o(p, "id", "id", f), o(p, "title", "title", f);
      var w = (b = n("link", f)) === null || b === void 0 ? void 0 : b.attribs.href;
      w && (p.link = w);
      var M = a("summary", f) || a("content", f);
      M && (p.description = M);
      var T = a("updated", f);
      return T && (p.pubDate = new Date(T)), p;
    }) };
    o($, "id", "id", S), o($, "title", "title", S);
    var m = (_ = n("link", S)) === null || _ === void 0 ? void 0 : _.attribs.href;
    m && ($.link = m), o($, "description", "subtitle", S);
    var h = a("updated", S);
    return h && ($.updated = new Date(h)), o($, "author", "email", S, true), $;
  }
  function l(u) {
    var _, S, $ = (S = (_ = n("channel", u.children)) === null || _ === void 0 ? void 0 : _.children) !== null && S !== void 0 ? S : [], m = { type: u.name.substr(0, 3), id: "", items: (0, d.getElementsByTagName)("item", u.children).map(function(I) {
      var b = I.children, f = { media: s(b) };
      o(f, "id", "guid", b), o(f, "title", "title", b), o(f, "link", "link", b), o(f, "description", "description", b);
      var p = a("pubDate", b);
      return p && (f.pubDate = new Date(p)), f;
    }) };
    o(m, "title", "title", $), o(m, "link", "link", $), o(m, "description", "description", $);
    var h = a("lastBuildDate", $);
    return h && (m.updated = new Date(h)), o(m, "author", "managingEditor", $, true), m;
  }
  var r = ["url", "type", "lang"], e = ["fileSize", "bitrate", "framerate", "samplingrate", "channels", "duration", "height", "width"];
  function s(u) {
    return (0, d.getElementsByTagName)("media:content", u).map(function(_) {
      for (var S = _.attribs, $ = { medium: S.medium, isDefault: !!S.isDefault }, m = 0, h = r; m < h.length; m++) {
        var I = h[m];
        S[I] && ($[I] = S[I]);
      }
      for (var b = 0, f = e; b < f.length; b++) {
        var I = f[b];
        S[I] && ($[I] = parseInt(S[I], 10));
      }
      return S.expression && ($.expression = S.expression), $;
    });
  }
  function n(u, _) {
    return (0, d.getElementsByTagName)(u, _, true, 1)[0];
  }
  function a(u, _, S) {
    return S === void 0 && (S = false), (0, t.textContent)((0, d.getElementsByTagName)(u, _, S, 1)).trim();
  }
  function o(u, _, S, $, m) {
    m === void 0 && (m = false);
    var h = a(S, $, m);
    h && (u[_] = h);
  }
  function c(u) {
    return u === "rss" || u === "feed" || u === "rdf:RDF";
  }
  return qn;
}
var Lr;
function gc() {
  return Lr || (Lr = 1, (function(t) {
    var d = Wt && Wt.__createBinding || (Object.create ? (function(l, r, e, s) {
      s === void 0 && (s = e), Object.defineProperty(l, s, { enumerable: true, get: function() {
        return r[e];
      } });
    }) : (function(l, r, e, s) {
      s === void 0 && (s = e), l[s] = r[e];
    })), g = Wt && Wt.__exportStar || function(l, r) {
      for (var e in l) e !== "default" && !Object.prototype.hasOwnProperty.call(r, e) && d(r, l, e);
    };
    Object.defineProperty(t, "__esModule", { value: true }), t.hasChildren = t.isDocument = t.isComment = t.isText = t.isCDATA = t.isTag = void 0, g(dc(), t), g(wCe(), t), g(SCe(), t), g(fc(), t), g(pc(), t), g(ICe(), t), g(PCe(), t);
    var i = jt();
    Object.defineProperty(t, "isTag", { enumerable: true, get: function() {
      return i.isTag;
    } }), Object.defineProperty(t, "isCDATA", { enumerable: true, get: function() {
      return i.isCDATA;
    } }), Object.defineProperty(t, "isText", { enumerable: true, get: function() {
      return i.isText;
    } }), Object.defineProperty(t, "isComment", { enumerable: true, get: function() {
      return i.isComment;
    } }), Object.defineProperty(t, "isDocument", { enumerable: true, get: function() {
      return i.isDocument;
    } }), Object.defineProperty(t, "hasChildren", { enumerable: true, get: function() {
      return i.hasChildren;
    } });
  })(Wt)), Wt;
}
var Or;
function Vr() {
  if (Or) return et;
  Or = 1;
  var t = et && et.__extends || /* @__PURE__ */ (function() {
    var b = function(f, p) {
      return b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(w, M) {
        w.__proto__ = M;
      } || function(w, M) {
        for (var T in M) Object.prototype.hasOwnProperty.call(M, T) && (w[T] = M[T]);
      }, b(f, p);
    };
    return function(f, p) {
      if (typeof p != "function" && p !== null) throw new TypeError("Class extends value " + String(p) + " is not a constructor or null");
      b(f, p);
      function w() {
        this.constructor = f;
      }
      f.prototype = p === null ? Object.create(p) : (w.prototype = p.prototype, new w());
    };
  })(), d = et && et.__createBinding || (Object.create ? (function(b, f, p, w) {
    w === void 0 && (w = p), Object.defineProperty(b, w, { enumerable: true, get: function() {
      return f[p];
    } });
  }) : (function(b, f, p, w) {
    w === void 0 && (w = p), b[w] = f[p];
  })), g = et && et.__setModuleDefault || (Object.create ? (function(b, f) {
    Object.defineProperty(b, "default", { enumerable: true, value: f });
  }) : function(b, f) {
    b.default = f;
  }), i = et && et.__importStar || function(b) {
    if (b && b.__esModule) return b;
    var f = {};
    if (b != null) for (var p in b) p !== "default" && Object.prototype.hasOwnProperty.call(b, p) && d(f, b, p);
    return g(f, b), f;
  }, l = et && et.__importDefault || function(b) {
    return b && b.__esModule ? b : { default: b };
  };
  Object.defineProperty(et, "__esModule", { value: true }), et.parseFeed = et.FeedHandler = void 0;
  var r = l(jt()), e = i(gc()), s = cc(), n;
  (function(b) {
    b[b.image = 0] = "image", b[b.audio = 1] = "audio", b[b.video = 2] = "video", b[b.document = 3] = "document", b[b.executable = 4] = "executable";
  })(n || (n = {}));
  var a;
  (function(b) {
    b[b.sample = 0] = "sample", b[b.full = 1] = "full", b[b.nonstop = 2] = "nonstop";
  })(a || (a = {}));
  var o = (function(b) {
    t(f, b);
    function f(p, w) {
      var M = this;
      return typeof p == "object" && (p = void 0, w = p), M = b.call(this, p, w) || this, M;
    }
    return f.prototype.onend = function() {
      var p, w, M = _(h, this.dom);
      if (!M) {
        this.handleCallback(new Error("couldn't find root of feed"));
        return;
      }
      var T = {};
      if (M.name === "feed") {
        var k = M.children;
        T.type = "atom", m(T, "id", "id", k), m(T, "title", "title", k);
        var B = $("href", _("link", k));
        B && (T.link = B), m(T, "description", "subtitle", k);
        var C = S("updated", k);
        C && (T.updated = new Date(C)), m(T, "author", "email", k, true), T.items = u("entry", k).map(function(E) {
          var q = {}, W = E.children;
          m(q, "id", "id", W), m(q, "title", "title", W);
          var G = $("href", _("link", W));
          G && (q.link = G);
          var te = S("summary", W) || S("content", W);
          te && (q.description = te);
          var oe = S("updated", W);
          return oe && (q.pubDate = new Date(oe)), q.media = c(W), q;
        });
      } else {
        var k = (w = (p = _("channel", M.children)) === null || p === void 0 ? void 0 : p.children) !== null && w !== void 0 ? w : [];
        T.type = M.name.substr(0, 3), T.id = "", m(T, "title", "title", k), m(T, "link", "link", k), m(T, "description", "description", k);
        var C = S("lastBuildDate", k);
        C && (T.updated = new Date(C)), m(T, "author", "managingEditor", k, true), T.items = u("item", M.children).map(function(W) {
          var G = {}, te = W.children;
          m(G, "id", "guid", te), m(G, "title", "title", te), m(G, "link", "link", te), m(G, "description", "description", te);
          var oe = S("pubDate", te);
          return oe && (G.pubDate = new Date(oe)), G.media = c(te), G;
        });
      }
      this.feed = T, this.handleCallback(null);
    }, f;
  })(r.default);
  et.FeedHandler = o;
  function c(b) {
    return u("media:content", b).map(function(f) {
      var p = { medium: f.attribs.medium, isDefault: !!f.attribs.isDefault };
      return f.attribs.url && (p.url = f.attribs.url), f.attribs.fileSize && (p.fileSize = parseInt(f.attribs.fileSize, 10)), f.attribs.type && (p.type = f.attribs.type), f.attribs.expression && (p.expression = f.attribs.expression), f.attribs.bitrate && (p.bitrate = parseInt(f.attribs.bitrate, 10)), f.attribs.framerate && (p.framerate = parseInt(f.attribs.framerate, 10)), f.attribs.samplingrate && (p.samplingrate = parseInt(f.attribs.samplingrate, 10)), f.attribs.channels && (p.channels = parseInt(f.attribs.channels, 10)), f.attribs.duration && (p.duration = parseInt(f.attribs.duration, 10)), f.attribs.height && (p.height = parseInt(f.attribs.height, 10)), f.attribs.width && (p.width = parseInt(f.attribs.width, 10)), f.attribs.lang && (p.lang = f.attribs.lang), p;
    });
  }
  function u(b, f) {
    return e.getElementsByTagName(b, f, true);
  }
  function _(b, f) {
    return e.getElementsByTagName(b, f, true, 1)[0];
  }
  function S(b, f, p) {
    return p === void 0 && (p = false), e.getText(e.getElementsByTagName(b, f, p, 1)).trim();
  }
  function $(b, f) {
    if (!f) return null;
    var p = f.attribs;
    return p[b];
  }
  function m(b, f, p, w, M) {
    M === void 0 && (M = false);
    var T = S(p, w, M);
    T && (b[f] = T);
  }
  function h(b) {
    return b === "rss" || b === "feed" || b === "rdf:RDF";
  }
  function I(b, f) {
    f === void 0 && (f = { xmlMode: true });
    var p = new o(f);
    return new s.Parser(p, f).end(b), p.feed;
  }
  return et.parseFeed = I, et;
}
var Nr;
function ACe() {
  return Nr || (Nr = 1, (function(t) {
    var d = pt && pt.__createBinding || (Object.create ? (function(S, $, m, h) {
      h === void 0 && (h = m), Object.defineProperty(S, h, { enumerable: true, get: function() {
        return $[m];
      } });
    }) : (function(S, $, m, h) {
      h === void 0 && (h = m), S[h] = $[m];
    })), g = pt && pt.__setModuleDefault || (Object.create ? (function(S, $) {
      Object.defineProperty(S, "default", { enumerable: true, value: $ });
    }) : function(S, $) {
      S.default = $;
    }), i = pt && pt.__importStar || function(S) {
      if (S && S.__esModule) return S;
      var $ = {};
      if (S != null) for (var m in S) m !== "default" && Object.prototype.hasOwnProperty.call(S, m) && d($, S, m);
      return g($, S), $;
    }, l = pt && pt.__exportStar || function(S, $) {
      for (var m in S) m !== "default" && !Object.prototype.hasOwnProperty.call($, m) && d($, S, m);
    }, r = pt && pt.__importDefault || function(S) {
      return S && S.__esModule ? S : { default: S };
    };
    Object.defineProperty(t, "__esModule", { value: true }), t.RssHandler = t.DefaultHandler = t.DomUtils = t.ElementType = t.Tokenizer = t.createDomStream = t.parseDOM = t.parseDocument = t.DomHandler = t.Parser = void 0;
    var e = cc();
    Object.defineProperty(t, "Parser", { enumerable: true, get: function() {
      return e.Parser;
    } });
    var s = jt();
    Object.defineProperty(t, "DomHandler", { enumerable: true, get: function() {
      return s.DomHandler;
    } }), Object.defineProperty(t, "DefaultHandler", { enumerable: true, get: function() {
      return s.DomHandler;
    } });
    function n(S, $) {
      var m = new s.DomHandler(void 0, $);
      return new e.Parser(m, $).end(S), m.root;
    }
    t.parseDocument = n;
    function a(S, $) {
      return n(S, $).children;
    }
    t.parseDOM = a;
    function o(S, $, m) {
      var h = new s.DomHandler(S, $, m);
      return new e.Parser(h, $);
    }
    t.createDomStream = o;
    var c = oc();
    Object.defineProperty(t, "Tokenizer", { enumerable: true, get: function() {
      return r(c).default;
    } });
    var u = i(As());
    t.ElementType = u, l(Vr(), t), t.DomUtils = i(gc());
    var _ = Vr();
    Object.defineProperty(t, "RssHandler", { enumerable: true, get: function() {
      return _.FeedHandler;
    } });
  })(pt)), pt;
}
var Fr;
function hc() {
  if (Fr) return Dn;
  Fr = 1, Object.defineProperty(Dn, "__esModule", { value: true }), Dn.HTMLParser = void 0;
  const t = ACe(), d = Oe(), g = Ye();
  class i {
    constructor() {
      this.text = "", this.entities = [], this._buildingEntities = /* @__PURE__ */ new Map(), this._openTags = [], this._openTagsMeta = [];
    }
    onopentag(e, s) {
      this._openTags.unshift(e), this._openTagsMeta.unshift(void 0);
      let n;
      const a = {};
      if (e == "strong" || e == "b") n = d.Api.MessageEntityBold;
      else if (e == "spoiler") n = d.Api.MessageEntitySpoiler;
      else if (e == "em" || e == "i") n = d.Api.MessageEntityItalic;
      else if (e == "u") n = d.Api.MessageEntityUnderline;
      else if (e == "del" || e == "s") n = d.Api.MessageEntityStrike;
      else if (e == "blockquote") n = d.Api.MessageEntityBlockquote, s.expandable !== void 0 && (a.collapsed = true);
      else if (e == "code") {
        const o = this._buildingEntities.get("pre");
        if (o && o instanceof d.Api.MessageEntityPre) try {
          o.language = s.class.slice(9, s.class.length);
        } catch {
        }
        else n = d.Api.MessageEntityCode;
      } else if (e == "pre") n = d.Api.MessageEntityPre, a.language = "";
      else if (e == "a") {
        let o = s.href;
        if (!o) return;
        o.startsWith("mailto:") ? (o = o.slice(7, o.length), n = d.Api.MessageEntityEmail) : (n = d.Api.MessageEntityTextUrl, a.url = o, o = void 0), this._openTagsMeta.shift(), this._openTagsMeta.unshift(o);
      } else e == "tg-emoji" && (n = d.Api.MessageEntityCustomEmoji, a.documentId = s["emoji-id"]);
      n && !this._buildingEntities.has(e) && this._buildingEntities.set(e, new n(Object.assign({ offset: this.text.length, length: 0 }, a)));
    }
    ontext(e) {
      if ((this._openTags.length > 0 ? this._openTags[0] : "") == "a") {
        const n = this._openTagsMeta[0];
        n && (e = n);
      }
      for (let [n, a] of this._buildingEntities) a.length += e.length;
      this.text += e;
    }
    onclosetag(e) {
      this._openTagsMeta.shift(), this._openTags.shift();
      const s = this._buildingEntities.get(e);
      s && (this._buildingEntities.delete(e), this.entities.push(s));
    }
    onattribute(e, s, n) {
    }
    oncdataend() {
    }
    oncdatastart() {
    }
    oncomment(e) {
    }
    oncommentend() {
    }
    onend() {
    }
    onerror(e) {
    }
    onopentagname(e) {
    }
    onparserinit(e) {
    }
    onprocessinginstruction(e, s) {
    }
    onreset() {
    }
  }
  class l {
    static parse(e) {
      if (!e) return [e, []];
      const s = new i(), n = new t.Parser(s);
      return n.write(e), n.end(), [g.helpers.stripText(s.text, s.entities), s.entities];
    }
    static unparse(e, s, n = 0, a) {
      if (!e || !s || !s.length) return e;
      a == null && (a = e.length);
      const o = [];
      let c = 0;
      for (let u = 0; u < s.length; u++) {
        const _ = s[u];
        if (_.offset >= n + a) break;
        let S = _.offset - n;
        if (S > c) o.push(e.slice(c, S));
        else if (S < c) continue;
        let $ = false, m = _.length, h = this.unparse(e.slice(S, S + m), s.slice(u + 1, s.length), _.offset, m);
        _ instanceof d.Api.MessageEntityBold ? o.push(`<strong>${h}</strong>`) : _ instanceof d.Api.MessageEntitySpoiler ? o.push(`<spoiler>${h}</spoiler>`) : _ instanceof d.Api.MessageEntityItalic ? o.push(`<em>${h}</em>`) : _ instanceof d.Api.MessageEntityCode ? o.push(`<code>${h}</code>`) : _ instanceof d.Api.MessageEntityUnderline ? o.push(`<u>${h}</u>`) : _ instanceof d.Api.MessageEntityStrike ? o.push(`<del>${h}</del>`) : _ instanceof d.Api.MessageEntityBlockquote ? o.push(`<blockquote>${h}</blockquote>`) : _ instanceof d.Api.MessageEntityPre ? _.language ? o.push(`<pre><code class="language-${_.language}">${h}</code></pre>`) : o.push(`<pre>${h}</pre>`) : _ instanceof d.Api.MessageEntityEmail ? o.push(`<a href="mailto:${h}">${h}</a>`) : _ instanceof d.Api.MessageEntityUrl ? o.push(`<a href="${h}">${h}</a>`) : _ instanceof d.Api.MessageEntityTextUrl ? o.push(`<a href="${_.url}">${h}</a>`) : _ instanceof d.Api.MessageEntityMentionName ? o.push(`<a href="tg://user?id=${_.userId}">${h}</a>`) : _ instanceof d.Api.MessageEntityCustomEmoji ? o.push(`<tg-emoji emoji-id="${_.documentId}">${h}</tg-emoji>`) : $ = true, c = S + ($ ? 0 : m);
      }
      return o.push(e.slice(c, e.length)), o.join("");
    }
  }
  return Dn.HTMLParser = l, Dn;
}
var Un = {}, kt = {}, jr;
function Cs() {
  if (jr) return kt;
  jr = 1;
  var t = kt && kt.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(kt, "__esModule", { value: true }), kt.DEFAULT_DELIMITERS = void 0, kt._replaceWithMention = e, kt._parseMessageText = s, kt._getResponseMessage = n;
  const d = Xe(), g = ht(), i = Ye(), l = Ae(), r = t(Ke());
  kt.DEFAULT_DELIMITERS = { "**": g.Api.MessageEntityBold, __: g.Api.MessageEntityItalic, "~~": g.Api.MessageEntityStrike, "`": g.Api.MessageEntityCode, "```": g.Api.MessageEntityPre };
  async function e(a, o, c, u) {
    try {
      return o[c] = new g.Api.InputMessageEntityMentionName({ offset: o[c].offset, length: o[c].length, userId: await a.getInputEntity(u) }), true;
    } catch {
      return false;
    }
  }
  async function s(a, o, c) {
    if (c == false) return [o, []];
    if (c == null) {
      if (a.parseMode == null) return [o, []];
      c = a.parseMode;
    } else typeof c == "string" && (c = (0, d.sanitizeParseMode)(c));
    const [u, _] = c.parse(o);
    for (let S = _.length - 1; S >= 0; S--) {
      const $ = _[S];
      if ($ instanceof g.Api.MessageEntityTextUrl) {
        const m = /^@|\+|tg:\/\/user\?id=(\d+)/.exec($.url);
        if (m) {
          const h = m[1] ? Number(m[1]) : $.url;
          await e(a, _, S, h) || _.splice(S, 1);
        }
      }
    }
    return [u, _];
  }
  function n(a, o, c, u) {
    let _ = [], S = /* @__PURE__ */ new Map();
    if (c instanceof g.Api.UpdateShort) _ = [c.update];
    else if (c instanceof g.Api.Updates || c instanceof g.Api.UpdatesCombined) {
      _ = c.updates;
      for (const p of [...c.users, ...c.chats]) S.set(i.utils.getPeerId(p), p);
    } else return;
    const $ = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
    let h;
    for (const p of _) if (p instanceof g.Api.UpdateMessageID) $.set(p.randomId.toString(), p.id);
    else if (p instanceof g.Api.UpdateNewChannelMessage || p instanceof g.Api.UpdateNewMessage) if (p.message._finishInit(a, S, u), "randomId" in o || (0, l.isArrayLike)(o)) m.set(p.message.id, p.message);
    else return p.message;
    else if (p instanceof g.Api.UpdateEditMessage && "peer" in o && (0, l._entityType)(o.peer) != l._EntityType.CHANNEL) {
      if (p.message._finishInit(a, S, u), "randomId" in o) m.set(p.message.id, p.message);
      else if ("id" in o && o.id === p.message.id) return p.message;
    } else if (p instanceof g.Api.UpdateEditChannelMessage && "peer" in o && (0, d.getPeerId)(o.peer) == (0, d.getPeerId)(p.message.peerId)) {
      if (o.id == p.message.id) return p.message._finishInit(a, S, u), p.message;
    } else if (p instanceof g.Api.UpdateNewScheduledMessage) p.message._finishInit(a, S, u), h = p.message, m.set(p.message.id, p.message);
    else if (p instanceof g.Api.UpdateMessagePoll && o.media.poll.id == p.pollId) {
      const w = new g.Api.Message({ id: o.id, peerId: i.utils.getPeerId(o.peer), media: new g.Api.MessageMediaPoll({ poll: p.poll, results: p.results }), message: "", date: 0 });
      return w._finishInit(a, S, u), w;
    }
    if (o == null) return m;
    let I;
    if ((0, l.isArrayLike)(o) || typeof o == "number" || r.default.isInstance(o) ? I = o : I = o.randomId, !I) {
      if (h) return h;
      a._log.warn(`No randomId in ${o} to map to. returning undefined for ${c} (Message was empty)`);
      return;
    }
    if (!(0, l.isArrayLike)(I)) {
      let p = m.get($.get(I.toString()));
      return p || a._log.warn(`Request ${o.className} had missing message mapping ${c.className} (Message was empty)`), p;
    }
    let b = false;
    for (const p of I) {
      const w = $.get(p.toString());
      if (!w) {
        b = true;
        break;
      }
      if (!m.get(w)) {
        b = true;
        break;
      }
    }
    b && a._log.warn(`Request ${o.className} had missing message mapping ${c.className} (Message was empty)`);
    const f = [];
    for (const p of I) f.push(m.get($.get(p.toString())));
    return f;
  }
  return kt;
}
var Gr;
function mc() {
  if (Gr) return Un;
  Gr = 1, Object.defineProperty(Un, "__esModule", { value: true }), Un.MarkdownParser = void 0;
  const t = Cs();
  class d {
    static parse(i) {
      let l = 0;
      const r = {};
      for (const n in t.DEFAULT_DELIMITERS) r[n] = false;
      const e = [], s = {};
      for (; l < i.length; ) {
        let n = -1, a;
        for (const o of Object.keys(t.DEFAULT_DELIMITERS)) {
          const c = i.indexOf(o, l);
          c > -1 && (n === -1 || c < n) && (n = c, a = o);
        }
        if (n === -1 || a == null) break;
        r[a] ? (r[a] = false, s[a].length = n - s[a].offset, e.push(s[a])) : (s[a] = new t.DEFAULT_DELIMITERS[a]({ offset: n, length: -1, language: "" }), r[a] = true), i = i.toString().replace(a, ""), l = n;
      }
      return [i, e];
    }
    static unparse(i, l) {
      const r = t.DEFAULT_DELIMITERS;
      if (!i || !l) return i;
      let e = [];
      const s = /* @__PURE__ */ new Map();
      Object.keys(r).forEach((n) => {
        s.set(r[n].className, n);
      });
      for (const n of l) {
        const a = n.offset, o = n.offset + n.length, c = s.get(n.className);
        c && (e.push([a, c]), e.push([o, c]));
      }
      for (e = e.sort((n, a) => n[0] - a[0]); e.length; ) {
        const [n, a] = e.pop();
        i = i.slice(0, n) + a + i.slice(n);
      }
      return i;
    }
  }
  return Un.MarkdownParser = d, Un;
}
var Ln = {}, Hr;
function CCe() {
  if (Hr) return Ln;
  Hr = 1, Object.defineProperty(Ln, "__esModule", { value: true }), Ln.MarkdownV2Parser = void 0;
  const t = hc();
  class d {
    static parse(i) {
      return i = i.replace(/\*(.*?)\*/g, "<b>$1</b>"), i = i.replace(/__(.*?)__/g, "<u>$1</u>"), i = i.replace(/~(.*?)~/g, "<s>$1</s>"), i = i.replace(/-(.*?)-/g, "<i>$1</i>"), i = i.replace(/```([\s\S]*?)```/g, "<pre>$1</pre>"), i = i.replace(/`(.*?)`/g, "<code>$1</code>"), i = i.replace(/\|\|(.*?)\|\|/g, "<spoiler>$1</spoiler>"), i = i.replace(new RegExp("(?<!\\!)\\[([^\\]]+)\\]\\(([^)]+)\\)", "g"), '<a href="$2">$1</a>'), i = i.replace(/!\[([^\]]+)\]\(tg:\/\/emoji\?id=(\d+)\)/g, '<tg-emoji emoji-id="$2">$1</tg-emoji>'), t.HTMLParser.parse(i);
    }
    static unparse(i, l) {
      return i = t.HTMLParser.unparse(i, l), i = i.replace(/<b>(.*?)<\/b>/g, "*$1*"), i = i.replace(/<u>(.*?)<\/u>/g, "__$1__"), i = i.replace(/<code>(.*?)<\/code>/g, "`$1`"), i = i.replace(/<pre>(.*?)<\/pre>/g, "```$1```"), i = i.replace(/<s>(.*?)<\/s>/g, "~$1~"), i = i.replace(/<i>(.*?)<\/i>/g, "-$1-"), i = i.replace(/<spoiler>(.*?)<\/spoiler>/g, "||$1||"), i = i.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, "[$2]($1)"), i = i.replace(/<tg-emoji emoji-id="(\d+)">([^<]+)<\/tg-emoji>/g, "![$2](tg://emoji?id=$1)"), i;
    }
  }
  return Ln.MarkdownV2Parser = d, Ln;
}
var zr;
function Xe() {
  if (zr) return Be;
  zr = 1;
  var t = Le().Buffer, d = Be && Be.__importDefault || function(v) {
    return v && v.__esModule ? v : { default: v };
  };
  Object.defineProperty(Be, "__esModule", { value: true }), Be.getFileInfo = a, Be.chunks = o, Be.getInputPeer = h, Be._photoSizeByteCount = I, Be._getEntityPair = b, Be.getInnerText = f, Be.getInputChannel = p, Be.getInputUser = w, Be.getInputMessage = M, Be.getInputChatPhoto = T, Be.strippedPhotoToJpg = k, Be.getInputPhoto = B, Be.getInputDocument = C, Be.isAudio = E, Be.isImage = q, Be.getExtension = W, Be.getAttributes = he, Be.getInputGeo = H, Be.getInputMedia = U, Be.getAppropriatedPartSize = V, Be.getPeer = K, Be.sanitizeParseMode = F, Be.getPeerId = R, Be.resolveId = ee, Be.getMessageId = Y, Be.parsePhone = Q, Be.parseID = se, Be.resolveInviteLink = ge, Be.parseUsername = ue, Be.rtrim = ce, Be.getDisplayName = ye;
  const g = d(Ke()), i = d(Sl()), l = hc(), r = mc(), e = CCe(), s = Ae(), n = Oe();
  function a(v) {
    if ((!v || !v.SUBCLASS_OF_ID) && m(v, "InputFileLocation"), v.SUBCLASS_OF_ID == 354669666) return { dcId: void 0, location: v, size: void 0 };
    let le;
    if (v instanceof n.Api.Message && (le = v.media), v instanceof n.Api.MessageMediaDocument ? le = v.document : v instanceof n.Api.MessageMediaPhoto && (le = v.photo), le instanceof n.Api.Document) return { dcId: le.dcId, location: new n.Api.InputDocumentFileLocation({ id: le.id, accessHash: le.accessHash, fileReference: le.fileReference, thumbSize: "" }), size: le.size };
    if (le instanceof n.Api.Photo) return { dcId: le.dcId, location: new n.Api.InputPhotoFileLocation({ id: le.id, accessHash: le.accessHash, fileReference: le.fileReference, thumbSize: le.sizes[le.sizes.length - 1].type }), size: (0, g.default)(I(le.sizes[le.sizes.length - 1]) || 0) };
    m(v, "InputFileLocation");
  }
  function* o(v, le = 100) {
    for (let ve = 0; ve < v.length; ve += le) yield v.slice(ve, ve + le);
  }
  const c = new RegExp("@|(?:https?:\\/\\/)?(?:www\\.)?(?:telegram\\.(?:me|dog)|t\\.me)\\/(@|joinchat\\/)?", "i"), u = t.from("ffd8ffe000104a46494600010100000100010000ffdb004300281c1e231e19282321232d2b28303c64413c37373c7b585d4964918099968f808c8aa0b4e6c3a0aadaad8a8cc8ffcbdaeef5ffffff9bc1fffffffaffe6fdfff8ffdb0043012b2d2d3c353c76414176f8a58ca5f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8ffc00011080000000003012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00", "hex"), _ = t.from("ffd9", "hex"), S = new RegExp("tg:\\/\\/(join)\\?invite=", "i"), $ = new RegExp("^([a-z]((?!__)[\\w\\d]){3,30}[a-z\\d]|gif|vid|pic|bing|wiki|imdb|bold|vote|like|coub)$", "i");
  function m(v, le) {
    let ve = v;
    throw typeof v == "object" && "className" in v && (ve = v.className), new Error(`Cannot cast ${ve} to any kind of ${le}`);
  }
  function h(v, le = true, ve = true) {
    if (v.SUBCLASS_OF_ID === void 0) {
      if (le && "inputEntity" in v) return v.inputEntity;
      if ("entity" in v) return h(v.entity);
      m(v, "InputPeer");
    }
    if (v.SUBCLASS_OF_ID === 3374092470) return v;
    if (v instanceof n.Api.User) {
      if (v.self && le) return new n.Api.InputPeerSelf();
      if (v.accessHash !== void 0 && !v.min || !ve) return new n.Api.InputPeerUser({ userId: v.id, accessHash: v.accessHash || (0, g.default)(0) });
      throw new Error("User without accessHash or min cannot be input");
    }
    if (v instanceof n.Api.Chat || v instanceof n.Api.ChatEmpty || v instanceof n.Api.ChatForbidden) return new n.Api.InputPeerChat({ chatId: v.id });
    if (v instanceof n.Api.Channel) {
      if (v.accessHash !== void 0 && !v.min || !ve) return new n.Api.InputPeerChannel({ channelId: v.id, accessHash: v.accessHash || (0, g.default)(0) });
      throw new TypeError("Channel without accessHash or min info cannot be input");
    }
    if (v instanceof n.Api.ChannelForbidden) return new n.Api.InputPeerChannel({ channelId: v.id, accessHash: v.accessHash });
    if (v instanceof n.Api.InputUser) return new n.Api.InputPeerUser({ userId: v.userId, accessHash: v.accessHash });
    if (v instanceof n.Api.InputChannel) return new n.Api.InputPeerChannel({ channelId: v.channelId, accessHash: v.accessHash });
    if (v instanceof n.Api.UserEmpty) return new n.Api.InputPeerEmpty();
    if (v instanceof n.Api.UserFull) return h(v.id);
    if (v instanceof n.Api.ChatFull) return new n.Api.InputPeerChat({ chatId: v.id });
    if (v instanceof n.Api.PeerChat) return new n.Api.InputPeerChat({ chatId: v.chatId });
    m(v, "InputPeer");
  }
  function I(v) {
    return v instanceof n.Api.PhotoSize ? v.size : v instanceof n.Api.PhotoStrippedSize ? v.bytes.length < 3 || v.bytes[0] != 1 ? v.bytes.length : v.bytes.length + 622 : v instanceof n.Api.PhotoCachedSize ? v.bytes.length : v instanceof n.Api.PhotoSizeEmpty ? 0 : v instanceof n.Api.PhotoSizeProgressive ? v.sizes[v.sizes.length - 1] : void 0;
  }
  function b(v, le, ve, we = h) {
    const De = le.get(v);
    let Me;
    try {
      Me = ve.get(v);
    } catch {
      try {
        Me = we(Me);
      } catch {
      }
    }
    return [De, Me];
  }
  function f(v, le) {
    const ve = [];
    return le.forEach(function(we, De) {
      const Me = we.offset, Ve = we.offset + we.length;
      ve.push(v.slice(Me, Ve));
    }), ve;
  }
  function p(v) {
    if ((typeof v == "string" || typeof v == "number" || typeof v == "bigint" || g.default.isInstance(v)) && m(v, "InputChannel"), v.SUBCLASS_OF_ID === void 0 && m(v, "InputChannel"), v.SUBCLASS_OF_ID === 1089602301) return v;
    if (v instanceof n.Api.Channel || v instanceof n.Api.ChannelForbidden) return new n.Api.InputChannel({ channelId: v.id, accessHash: v.accessHash || g.default.zero });
    if (v instanceof n.Api.InputPeerChannel) return new n.Api.InputChannel({ channelId: v.channelId, accessHash: v.accessHash });
    m(v, "InputChannel");
  }
  function w(v) {
    if ((typeof v == "string" || typeof v == "number" || typeof v == "bigint" || g.default.isInstance(v)) && m(v, "InputUser"), v.SUBCLASS_OF_ID === void 0 && m(v, "InputUser"), v.SUBCLASS_OF_ID === 3865689926) return v;
    if (v instanceof n.Api.User) return v.self ? new n.Api.InputUserSelf() : new n.Api.InputUser({ userId: v.id, accessHash: v.accessHash || g.default.zero });
    if (v instanceof n.Api.InputPeerSelf) return new n.Api.InputUserSelf();
    if (v instanceof n.Api.UserEmpty || v instanceof n.Api.InputPeerEmpty) return new n.Api.InputUserEmpty();
    if (v instanceof n.Api.UserFull) return w(v);
    if (v instanceof n.Api.InputPeerUser) return new n.Api.InputUser({ userId: v.userId, accessHash: v.accessHash });
    if (v instanceof n.Api.InputPeerUserFromMessage) return new n.Api.InputUserFromMessage({ userId: v.userId, peer: v.peer, msgId: v.msgId });
    m(v, "InputUser");
  }
  function M(v) {
    if (typeof v == "number") return new n.Api.InputMessageID({ id: v });
    if ((v === void 0 || v.SUBCLASS_OF_ID === void 0) && m(v, "InputMessage"), v.SUBCLASS_OF_ID === 1421262021) return v;
    if (v.SUBCLASS_OF_ID === 2030045667) return new n.Api.InputMessageID({ id: v.id });
    m(v, "InputMessage");
  }
  function T(v) {
    if ((v === void 0 || v.SUBCLASS_OF_ID === void 0) && m(v, "InputChatPhoto"), v.SUBCLASS_OF_ID === 3572182388) return v;
    if (v.SUBCLASS_OF_ID === 3882180383) return new n.Api.InputChatUploadedPhoto({ file: v });
    if (v = B(v), v instanceof n.Api.InputPhoto) return new n.Api.InputChatPhoto({ id: v });
    if (v instanceof n.Api.InputPhotoEmpty) return new n.Api.InputChatPhotoEmpty();
    m(v, "InputChatPhoto");
  }
  function k(v) {
    if (v.length < 3 || v[0] !== 1) return v;
    const le = t.from(u);
    return le[164] = v[1], le[166] = v[2], t.concat([le, v.slice(3), _]);
  }
  function B(v) {
    if (v.SUBCLASS_OF_ID === void 0 && m(v, "InputPhoto"), v.SUBCLASS_OF_ID === 2221106144) return v;
    if (v instanceof n.Api.Message && (v = v.media), (v instanceof n.Api.photos.Photo || v instanceof n.Api.MessageMediaPhoto) && (v = v.photo), v instanceof n.Api.Photo) return new n.Api.InputPhoto({ id: v.id, accessHash: v.accessHash, fileReference: v.fileReference });
    if (v instanceof n.Api.PhotoEmpty) return new n.Api.InputPhotoEmpty();
    if (v instanceof n.Api.messages.ChatFull && (v = v.fullChat), v instanceof n.Api.ChannelFull) return B(v.chatPhoto);
    if (v instanceof n.Api.UserFull) return B(v.profilePhoto);
    if (v instanceof n.Api.Channel || v instanceof n.Api.Chat || v instanceof n.Api.User) return B(v.photo);
    if (v instanceof n.Api.UserEmpty || v instanceof n.Api.ChatEmpty || v instanceof n.Api.ChatForbidden || v instanceof n.Api.ChannelForbidden) return new n.Api.InputPhotoEmpty();
    m(v, "InputPhoto");
  }
  function C(v) {
    if (v.SUBCLASS_OF_ID === void 0 && m(v, "InputDocument"), v.SUBCLASS_OF_ID === 4081048424) return v;
    if (v instanceof n.Api.Document) return new n.Api.InputDocument({ id: v.id, accessHash: v.accessHash, fileReference: v.fileReference });
    if (v instanceof n.Api.DocumentEmpty) return new n.Api.InputDocumentEmpty();
    if (v instanceof n.Api.MessageMediaDocument) return C(v.document);
    if (v instanceof n.Api.Message) return C(v.media);
    m(v, "InputDocument");
  }
  function E(v) {
    const le = G(v);
    return le ? (v = "a" + le, (i.default.getType(v) || "").startsWith("audio/")) : (te().get("mimeType") || "").startsWith("audio/");
  }
  function q(v) {
    const le = G(v).toLowerCase();
    return le.endsWith(".png") || le.endsWith(".jpg") || le.endsWith(".jpeg");
  }
  function W(v) {
    try {
      return B(v), ".jpg";
    } catch {
    }
    return v instanceof n.Api.UserProfilePhoto || v instanceof n.Api.ChatPhoto ? ".jpg" : (v instanceof n.Api.MessageMediaDocument && (v = v.document), v instanceof n.Api.Document || v instanceof n.Api.WebDocument || v instanceof n.Api.WebDocumentNoProxy ? v.mimeType === "application/octet-stream" ? "" : i.default.getExtension(v.mimeType) || "" : "");
  }
  function G(v) {
    return typeof v == "string" ? "." + v.split(".").pop() : "name" in v ? G(v.name) : W(v);
  }
  function te(v) {
    return /* @__PURE__ */ new Map();
  }
  function oe(v) {
    var le;
    const ve = G(v);
    if (ve) return v = "a" + ve, (i.default.getType(v) || "").startsWith("video/");
    {
      const we = te();
      return we.has("mimeType") && ((le = we.get("mimeType")) === null || le === void 0 ? void 0 : le.startsWith("video/")) || false;
    }
  }
  function he(v, { attributes: le = null, mimeType: ve = void 0, forceDocument: we = false, voiceNote: De = false, videoNote: Me = false, supportsStreaming: Ve = false, thumb: ke = null }) {
    var qe, Ue, Ce, Se;
    const Ze = typeof v == "string" ? v : "name" in v && v.name || "unnamed";
    ve === void 0 && (ve = i.default.getType(Ze) || "application/octet-stream");
    const A = /* @__PURE__ */ new Map();
    if (A.set(n.Api.DocumentAttributeFilename, new n.Api.DocumentAttributeFilename({ fileName: Ze.split(/[\\/]/).pop() || "" })), E(v)) {
      const D = te();
      A.set(n.Api.DocumentAttributeAudio, new n.Api.DocumentAttributeAudio({ voice: De, title: D.has("title") ? D.get("title") : void 0, performer: D.has("author") ? D.get("author") : void 0, duration: Number.parseInt((qe = D.get("duration")) !== null && qe !== void 0 ? qe : "0") }));
    }
    if (!we && oe(v)) {
      let D;
      if (ke) {
        const j = te(), Z = Number.parseInt((j == null ? void 0 : j.get("width")) || "1"), P = Number.parseInt((j == null ? void 0 : j.get("height")) || "1");
        D = new n.Api.DocumentAttributeVideo({ duration: 0, h: P, w: Z, roundMessage: Me, supportsStreaming: Ve });
      } else {
        const j = te();
        D = new n.Api.DocumentAttributeVideo({ roundMessage: Me, w: Number.parseInt((Ue = j.get("width")) !== null && Ue !== void 0 ? Ue : "1"), h: Number.parseInt((Ce = j.get("height")) !== null && Ce !== void 0 ? Ce : "1"), duration: Number.parseInt((Se = j.get("duration")) !== null && Se !== void 0 ? Se : "0"), supportsStreaming: Ve });
      }
      A.set(n.Api.DocumentAttributeVideo, D);
    }
    if (Me && (A.has(n.Api.DocumentAttributeAudio) ? A.get(n.Api.DocumentAttributeAudio).voice = true : A.set(n.Api.DocumentAttributeAudio, new n.Api.DocumentAttributeAudio({ duration: 0, voice: true }))), le) for (const D of le) A.set(D.constructor, D);
    return { attrs: Array.from(A.values()), mimeType: ve };
  }
  function H(v) {
    if ((v === void 0 || v.SUBCLASS_OF_ID === void 0) && m(v, "InputGeoPoint"), v.SUBCLASS_OF_ID === 70308389) return v;
    if (v instanceof n.Api.GeoPoint) return new n.Api.InputGeoPoint({ lat: v.lat, long: v.long });
    if (v instanceof n.Api.GeoPointEmpty) return new n.Api.InputGeoPointEmpty();
    if (v instanceof n.Api.MessageMediaGeo) return H(v.geo);
    if (v instanceof n.Api.Message) return H(v.media);
    m(v, "InputGeoPoint");
  }
  function U(v, { isPhoto: le = false, attributes: ve = void 0, forceDocument: we = false, voiceNote: De = false, videoNote: Me = false, supportsStreaming: Ve = false } = {}) {
    if (v.SUBCLASS_OF_ID === void 0 && m(v, "InputMedia"), v.SUBCLASS_OF_ID === 4210575092) return v;
    if (v.SUBCLASS_OF_ID === 2221106144) return new n.Api.InputMediaPhoto({ id: v });
    if (v.SUBCLASS_OF_ID === 4081048424) return new n.Api.InputMediaDocument({ id: v });
    if (v instanceof n.Api.MessageMediaPhoto) return new n.Api.InputMediaPhoto({ id: B(v.photo), ttlSeconds: v.ttlSeconds });
    if (v instanceof n.Api.Photo || v instanceof n.Api.photos.Photo || v instanceof n.Api.PhotoEmpty) return new n.Api.InputMediaPhoto({ id: B(v) });
    if (v instanceof n.Api.MessageMediaDocument) return new n.Api.InputMediaDocument({ id: C(v.document), ttlSeconds: v.ttlSeconds });
    if (v instanceof n.Api.Document || v instanceof n.Api.DocumentEmpty) return new n.Api.InputMediaDocument({ id: C(v) });
    if (v instanceof n.Api.InputFile || v instanceof n.Api.InputFileBig) {
      if (le) return new n.Api.InputMediaUploadedPhoto({ file: v });
      {
        const { attrs: ke, mimeType: qe } = he(v, { attributes: ve, forceDocument: we, voiceNote: De, videoNote: Me, supportsStreaming: Ve });
        return new n.Api.InputMediaUploadedDocument({ file: v, mimeType: qe, attributes: ke, forceFile: we });
      }
    }
    if (v instanceof n.Api.MessageMediaGame) return new n.Api.InputMediaGame({ id: new n.Api.InputGameID({ id: v.game.id, accessHash: v.game.accessHash }) });
    if (v instanceof n.Api.MessageMediaContact) return new n.Api.InputMediaContact({ phoneNumber: v.phoneNumber, firstName: v.firstName, lastName: v.lastName, vcard: "" });
    if (v instanceof n.Api.MessageMediaGeo) return new n.Api.InputMediaGeoPoint({ geoPoint: H(v.geo) });
    if (v instanceof n.Api.MessageMediaVenue) return new n.Api.InputMediaVenue({ geoPoint: H(v.geo), title: v.title, address: v.address, provider: v.provider, venueId: v.venueId, venueType: "" });
    if (v instanceof n.Api.MessageMediaDice) return new n.Api.InputMediaDice({ emoticon: v.emoticon });
    if (v instanceof n.Api.MessageMediaEmpty || v instanceof n.Api.MessageMediaUnsupported || v instanceof n.Api.ChatPhotoEmpty || v instanceof n.Api.UserProfilePhotoEmpty || v instanceof n.Api.ChatPhoto || v instanceof n.Api.UserProfilePhoto) return new n.Api.InputMediaEmpty();
    if (v instanceof n.Api.Message) return U(v.media, { isPhoto: le });
    if (v instanceof n.Api.MessageMediaPoll) {
      let ke;
      if (v.poll.quiz) {
        if (!v.results.results) throw new Error("Cannot cast unanswered quiz to any kind of InputMedia.");
        ke = [];
        for (const qe of v.results.results) qe.correct && ke.push(qe.option);
      } else ke = void 0;
      return new n.Api.InputMediaPoll({ poll: v.poll, correctAnswers: ke, solution: v.results.solution, solutionEntities: v.results.solutionEntities });
    }
    if (v instanceof n.Api.Poll) return new n.Api.InputMediaPoll({ poll: v });
    m(v, "InputMedia");
  }
  function V(v) {
    return v.lesser(104857600) ? 128 : v.lesser(786432e3) ? 256 : 512;
  }
  function K(v) {
    v || m(v, "undefined"), typeof v == "string" && m(v, "peer"), (typeof v == "number" || typeof v == "bigint") && (v = (0, s.returnBigInt)(v));
    try {
      if (g.default.isInstance(v)) {
        const le = ee(v);
        return le[1] === n.Api.PeerChannel ? new n.Api.PeerChannel({ channelId: le[0] }) : le[1] === n.Api.PeerChat ? new n.Api.PeerChat({ chatId: le[0] }) : new n.Api.PeerUser({ userId: le[0] });
      }
      if (v.SUBCLASS_OF_ID === void 0) throw new Error();
      if (v.SUBCLASS_OF_ID === 47470215) return v;
      if (v instanceof n.Api.contacts.ResolvedPeer || v instanceof n.Api.InputNotifyPeer || v instanceof n.Api.TopPeer || v instanceof n.Api.Dialog || v instanceof n.Api.DialogPeer) return v.peer;
      if (v instanceof n.Api.ChannelFull) return new n.Api.PeerChannel({ channelId: v.id });
      if ((v.SUBCLASS_OF_ID === 2105307014 || v.SUBCLASS_OF_ID === 3653762072) && "userId" in v) return new n.Api.PeerUser({ userId: v.userId });
      if (v = h(v, false, false), v instanceof n.Api.InputPeerUser) return new n.Api.PeerUser({ userId: v.userId });
      if (v instanceof n.Api.InputPeerChat) return new n.Api.PeerChat({ chatId: v.chatId });
      if (v instanceof n.Api.InputPeerChannel) return new n.Api.PeerChannel({ channelId: v.channelId });
    } catch {
    }
    m(v, "peer");
  }
  function F(v) {
    if (v === "md" || v === "markdown") return r.MarkdownParser;
    if (v === "md2" || v === "markdownv2") return e.MarkdownV2Parser;
    if (v == "html") return l.HTMLParser;
    if (typeof v == "object" && "parse" in v && "unparse" in v) return v;
    throw new Error(`Invalid parse mode type ${v}`);
  }
  function R(v, le = true) {
    if (typeof v == "string" && se(v) && (v = (0, s.returnBigInt)(v)), g.default.isInstance(v)) return le ? v.toString() : ee(v)[0].toString();
    v instanceof n.Api.InputPeerSelf && m(v, "int (you might want to use client.get_peer_id)");
    try {
      v = K(v);
    } catch {
      m(v, "int");
    }
    if (v instanceof n.Api.PeerUser) return v.userId.toString();
    if (v instanceof n.Api.PeerChat) return v.chatId = ee((0, s.returnBigInt)(v.chatId))[0], le ? v.chatId.negate().toString() : v.chatId.toString();
    if (typeof v == "object" && "channelId" in v) return v.channelId = ee((0, s.returnBigInt)(v.channelId))[0], le ? "-100" + v.channelId.toString() : v.channelId.toString();
    m(v, "int");
  }
  function ee(v) {
    if (v.greaterOrEquals(g.default.zero)) return [v, n.Api.PeerUser];
    const le = v.toString().match(/-100([^0]\d*)/);
    return le ? [(0, g.default)(le[1]), n.Api.PeerChannel] : [v.negate(), n.Api.PeerChat];
  }
  function Y(v) {
    if (v) {
      if (typeof v == "number") return v;
      if (v.SUBCLASS_OF_ID === 2030045667 || "id" in v) return v.id;
      throw new Error(`Invalid message type: ${v.constructor.name}`);
    } else return;
  }
  function Q(v) {
    if (v = v.toString().replace(/[()\s-]/gm, ""), v.startsWith("+") && v.split("+").length - 1 == 1) return isNaN(Number(v)) ? void 0 : v.replace("+", "");
  }
  function se(v) {
    return /^(-?[0-9][0-9]*)$/.test(v) ? (0, g.default)(v) : void 0;
  }
  function ge(v) {
    throw new Error("not implemented");
  }
  function ue(v) {
    v = v.trim();
    const le = v.match(c) || v.match(S);
    if (le) {
      if (v = v.replace(le[0], ""), le[1]) return { username: v, isInvite: true };
      v = ce(v, "/");
    }
    return v.match($) ? { username: v.toLowerCase(), isInvite: false } : { username: void 0, isInvite: false };
  }
  function ce(v, le) {
    for (; ~le.indexOf(v[v.length - 1]); ) v = v.slice(0, -1);
    return v;
  }
  function ye(v) {
    return v instanceof n.Api.User ? v.lastName && v.firstName ? `${v.firstName} ${v.lastName}` : v.firstName ? v.firstName : v.lastName ? v.lastName : "" : v instanceof n.Api.Chat || v instanceof n.Api.Channel ? v.title : "";
  }
  return Be;
}
var On = {}, Kr;
function xCe() {
  if (Kr) return On;
  Kr = 1, Object.defineProperty(On, "__esModule", { value: true }), On.Forward = void 0;
  const t = Ns(), d = ji(), g = Ae(), i = Xe(), l = ft();
  class r extends d.SenderGetter {
    [l.inspect.custom]() {
      return (0, g.betterConsoleLog)(this);
    }
    constructor(s, n, a) {
      super(), this.originalFwd = n;
      let o, c, u, _, S, $;
      if (n.fromId) {
        const m = (0, g._entityType)(n.fromId);
        m === g._EntityType.USER ? (o = (0, i.getPeerId)(n.fromId), [c, u] = (0, i._getEntityPair)(o, a, s._entityCache)) : (m === g._EntityType.CHANNEL || m === g._EntityType.CHAT) && (_ = n.fromId, [S, $] = (0, i._getEntityPair)((0, i.getPeerId)(_), a, s._entityCache));
      }
      t.ChatGetter.initChatClass(this, { chatPeer: _, chat: S, inputChat: $ }), d.SenderGetter.initSenderClass(this, { senderId: o ? (0, g.returnBigInt)(o) : void 0, sender: c, inputSender: u }), this._client = s;
    }
  }
  return On.Forward = r, On;
}
var Vn = {}, Wr;
function ECe() {
  if (Wr) return Vn;
  Wr = 1, Object.defineProperty(Vn, "__esModule", { value: true }), Vn.File = void 0;
  const t = ht(), d = Xe(), g = Ae(), i = ft();
  class l {
    [i.inspect.custom]() {
      return (0, g.betterConsoleLog)(this);
    }
    constructor(e) {
      this.media = e;
    }
    get id() {
      throw new Error("Unsupported");
    }
    get name() {
      return this._fromAttr(t.Api.DocumentAttributeFilename, "fileName");
    }
    get mimeType() {
      if (this.media instanceof t.Api.Photo) return "image/jpeg";
      if (this.media instanceof t.Api.Document) return this.media.mimeType;
    }
    get width() {
      return this._fromAttr([t.Api.DocumentAttributeImageSize, t.Api.DocumentAttributeVideo], "w");
    }
    get height() {
      return this._fromAttr([t.Api.DocumentAttributeImageSize, t.Api.DocumentAttributeVideo], "h");
    }
    get duration() {
      return this._fromAttr([t.Api.DocumentAttributeAudio, t.Api.DocumentAttributeVideo], "duration");
    }
    get title() {
      return this._fromAttr(t.Api.DocumentAttributeAudio, "title");
    }
    get performer() {
      return this._fromAttr(t.Api.DocumentAttributeAudio, "performer");
    }
    get emoji() {
      return this._fromAttr(t.Api.DocumentAttributeSticker, "alt");
    }
    get stickerSet() {
      return this._fromAttr(t.Api.DocumentAttributeSticker, "stickerset");
    }
    get size() {
      if (this.media instanceof t.Api.Photo) return (0, d._photoSizeByteCount)(this.media.sizes[this.media.sizes.length - 1]);
      if (this.media instanceof t.Api.Document) return this.media.size;
    }
    _fromAttr(e, s) {
      if (this.media instanceof t.Api.Document) {
        for (const n of this.media.attributes) if (n instanceof e) return n[s];
      }
    }
  }
  return Vn.File = l, Vn;
}
var tt = {}, Jt = {}, Zr;
function xt() {
  if (Zr) return Jt;
  Zr = 1, Object.defineProperty(Jt, "__esModule", { value: true }), Jt.Logger = Jt.LogLevel = void 0;
  const t = Ps();
  var d;
  (function(i) {
    i.NONE = "none", i.ERROR = "error", i.WARN = "warn", i.INFO = "info", i.DEBUG = "debug";
  })(d || (Jt.LogLevel = d = {}));
  class g {
    constructor(l) {
      this.levels = ["error", "warn", "info", "debug"], this._logLevel = l || d.INFO, this.isBrowser = !t.isNode, this.isBrowser ? this.colors = { start: "%c", warn: "color : #ff00ff", info: "color : #ffff00", debug: "color : #00ffff", error: "color : #ff0000", end: "" } : this.colors = { start: "\x1B[2m", warn: "\x1B[35m", info: "\x1B[33m", debug: "\x1B[36m", error: "\x1B[31m", end: "\x1B[0m" }, this.messageFormat = "[%t] [%l] - [%m]", this.tzOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4;
    }
    canSend(l) {
      return this._logLevel ? this.levels.indexOf(this._logLevel) >= this.levels.indexOf(l) : false;
    }
    warn(l) {
      this._log(d.WARN, l, this.colors.warn);
    }
    info(l) {
      this._log(d.INFO, l, this.colors.info);
    }
    debug(l) {
      this._log(d.DEBUG, l, this.colors.debug);
    }
    error(l) {
      this._log(d.ERROR, l, this.colors.error);
    }
    format(l, r) {
      return this.messageFormat.replace("%t", this.getDateTime()).replace("%l", r.toUpperCase()).replace("%m", l);
    }
    get logLevel() {
      return this._logLevel;
    }
    setLevel(l) {
      this._logLevel = l;
    }
    static setLevel(l) {
      console.log("Logger.setLevel is deprecated, it will has no effect. Please, use client.setLogLevel instead.");
    }
    _log(l, r, e) {
      if (this.canSend(l)) this.log(l, r, e);
      else return;
    }
    log(l, r, e) {
      this.isBrowser ? console.log(this.colors.start + this.format(r, l), e) : console.log(e + this.format(r, l) + this.colors.end);
    }
    getDateTime() {
      return new Date(Date.now() - this.tzOffset).toISOString().slice(0, -1);
    }
  }
  return Jt.Logger = g, Jt;
}
var Qt = {}, ks = {}, Jr;
function bc() {
  if (Jr) return ks;
  Jr = 1, Object.defineProperty(ks, "__esModule", { value: true });
  let t = class _c {
    constructor() {
      this.promise = new Promise((g, i) => {
        this.reject = i, this.resolve = g;
      });
    }
    static resolved(g) {
      const i = new _c();
      return i.resolve(g), i;
    }
  };
  return ks.default = t, ks;
}
var Qr;
function vc() {
  if (Qr) return Qt;
  Qr = 1;
  var t = Qt && Qt.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(Qt, "__esModule", { value: true }), Qt.RequestState = void 0;
  const d = t(bc());
  let g = class {
    constructor(l) {
      this.containerId = void 0, this.msgId = void 0, this.request = l, this.data = l.getBytes(), this.after = void 0, this.result = void 0, this.finished = new d.default(), this.resetPromise();
    }
    isReady() {
      return this.after ? this.after.finished.promise : true;
    }
    resetPromise() {
      var l;
      (l = this.reject) === null || l === void 0 || l.call(this), this.promise = new Promise((r, e) => {
        this.resolve = r, this.reject = e;
      });
    }
  };
  return Qt.RequestState = g, Qt;
}
var Xr;
function Fs() {
  if (Xr) return tt;
  Xr = 1;
  var t = tt && tt.__importDefault || function(f) {
    return f && f.__esModule ? f : { default: f };
  };
  Object.defineProperty(tt, "__esModule", { value: true }), tt.invoke = n, tt.getMe = a, tt.isBot = o, tt.isUserAuthorized = c, tt.getEntity = u, tt.getInputEntity = _, tt._getEntityFromString = S, tt.getPeerId = $, tt._getPeer = m, tt._getInputDialog = h, tt._getInputNotify = I, tt._selfId = b;
  const d = Oe(), g = Xe(), i = Ae(), l = Ye(), r = t(Ke()), e = xt(), s = vc();
  async function n(f, p, w, M) {
    if (p.classType !== "request") throw new Error("You can only invoke MTProtoRequests");
    let T = f._sender;
    if (w && (T = await f.getSender(w)), M != null && (T = M), T == null) throw new Error("Cannot send requests while disconnected. You need to call .connect()");
    if (T.userDisconnected) throw new Error("Cannot send requests while disconnected. Please reconnect.");
    await f._connectedDeferred.promise, await p.resolve(f, l.utils), f._lastRequest = (/* @__PURE__ */ new Date()).getTime();
    const k = new s.RequestState(p);
    let B = 0;
    for (B = 0; B < f._requestRetries; B++) {
      T.addStateToQueue(k);
      try {
        const C = await k.promise;
        return k.finished.resolve(), f.session.processEntities(C), f._entityCache.add(C), C;
      } catch (C) {
        if (C instanceof l.errors.ServerError || C.errorMessage === "RPC_CALL_FAIL" || C.errorMessage === "RPC_MCGET_FAIL") f._log.warn(`Telegram is having internal issues ${C.constructor.name}`), await (0, i.sleep)(2e3);
        else if (C instanceof l.errors.FloodWaitError || C instanceof l.errors.FloodTestPhoneWaitError) if (C.seconds <= f.floodSleepThreshold) f._log.info(`Sleeping for ${C.seconds}s on flood wait (Caused by ${p.className})`), await (0, i.sleep)(C.seconds * 1e3);
        else throw k.finished.resolve(), C;
        else if (C instanceof l.errors.PhoneMigrateError || C instanceof l.errors.NetworkMigrateError || C instanceof l.errors.UserMigrateError) {
          if (f._log.info(`Phone migrated to ${C.newDc}`), (C instanceof l.errors.PhoneMigrateError || C instanceof l.errors.NetworkMigrateError) && await f.isUserAuthorized()) throw k.finished.resolve(), C;
          await f._switchDC(C.newDc), T = w === void 0 ? f._sender : await f.getSender(w);
        } else if (C instanceof l.errors.MsgWaitError) await k.isReady(), k.after = void 0;
        else if (C.message === "CONNECTION_NOT_INITED") await f.disconnect(), await (0, i.sleep)(2e3), await f.connect();
        else throw k.finished.resolve(), C;
      }
      k.resetPromise();
    }
    throw new Error(`Request was unsuccessful ${B} time(s)`);
  }
  async function a(f, p) {
    if (p && f._selfInputPeer) return f._selfInputPeer;
    const w = (await f.invoke(new d.Api.users.GetUsers({ id: [new d.Api.InputUserSelf()] })))[0];
    return f._bot = w.bot, f._selfInputPeer || (f._selfInputPeer = l.utils.getInputPeer(w, false)), p ? f._selfInputPeer : w;
  }
  async function o(f) {
    if (f._bot === void 0) {
      const p = await f.getMe();
      if (p) return p instanceof d.Api.InputPeerUser ? void 0 : p.bot;
    }
    return f._bot;
  }
  async function c(f) {
    try {
      return await f.invoke(new d.Api.updates.GetState()), true;
    } catch {
      return false;
    }
  }
  async function u(f, p) {
    const w = !(0, i.isArrayLike)(p);
    let M = [];
    (0, i.isArrayLike)(p) ? M = p : M.push(p);
    const T = [];
    for (const G of M) if (typeof G == "string") {
      const te = (0, g.parseID)(G);
      te ? T.push(await f.getInputEntity(te)) : T.push(G);
    } else T.push(await f.getInputEntity(G));
    const k = /* @__PURE__ */ new Map([[i._EntityType.USER, []], [i._EntityType.CHAT, []], [i._EntityType.CHANNEL, []]]);
    for (const G of T) try {
      k.get((0, i._entityType)(G)).push(G);
    } catch {
    }
    let B = k.get(i._EntityType.USER), C = k.get(i._EntityType.CHAT), E = k.get(i._EntityType.CHANNEL);
    if (B.length && (B = await f.invoke(new d.Api.users.GetUsers({ id: B }))), C.length) {
      const G = C.map((te) => te.chatId);
      C = (await f.invoke(new d.Api.messages.GetChats({ id: G }))).chats;
    }
    E.length && (E = (await f.invoke(new d.Api.channels.GetChannels({ id: E }))).chats);
    const q = /* @__PURE__ */ new Map();
    for (const G of B) q.set((0, g.getPeerId)(G), G);
    for (const G of E) q.set((0, g.getPeerId)(G), G);
    for (const G of C) q.set((0, g.getPeerId)(G), G);
    const W = [];
    for (const G of T) if (typeof G == "string") W.push(await S(f, G));
    else if (!(G instanceof d.Api.InputPeerSelf)) W.push(q.get((0, g.getPeerId)(G)));
    else for (const [te, oe] of q.entries()) if (oe instanceof d.Api.User && oe.self) {
      W.push(oe);
      break;
    }
    return w ? W[0] : W;
  }
  async function _(f, p) {
    try {
      return l.utils.getInputPeer(p);
    } catch {
    }
    try {
      if (typeof p == "string" && (0, g.parseID)(p)) {
        const M = f._entityCache.get(p);
        if (M) return M;
      }
      if (typeof p == "number" || typeof p == "bigint" || r.default.isInstance(p)) {
        const w = f._entityCache.get(p.toString());
        if (w) return w;
      }
      if (typeof p == "object" && !r.default.isInstance(p) && p.SUBCLASS_OF_ID === 47470215) {
        const w = f._entityCache.get(l.utils.getPeerId(p));
        if (w) return w;
      }
    } catch {
    }
    if (typeof p == "string" && ["me", "this", "self"].includes(p)) return new d.Api.InputPeerSelf();
    try {
      if (p != null) return f.session.getInputEntity(p);
    } catch {
    }
    if (typeof p == "string") return l.utils.getInputPeer(await S(f, p));
    if (typeof p == "number" && (p = (0, i.returnBigInt)(p)), p = l.utils.getPeer(p), p instanceof d.Api.PeerUser) {
      const w = await f.invoke(new d.Api.users.GetUsers({ id: [new d.Api.InputUser({ userId: p.userId, accessHash: r.default.zero })] }));
      if (w.length && !(w[0] instanceof d.Api.UserEmpty)) return l.utils.getInputPeer(w[0]);
    } else {
      if (p instanceof d.Api.PeerChat) return new d.Api.InputPeerChat({ chatId: p.chatId });
      if (p instanceof d.Api.PeerChannel) try {
        const w = await f.invoke(new d.Api.channels.GetChannels({ id: [new d.Api.InputChannel({ channelId: p.channelId, accessHash: r.default.zero })] }));
        return l.utils.getInputPeer(w.chats[0]);
      } catch (w) {
        f._errorHandler && await f._errorHandler(w), f._log.canSend(e.LogLevel.ERROR) && console.error(w);
      }
    }
    throw new Error(`Could not find the input entity for ${JSON.stringify(p)}.
         Please read https://docs.telethon.dev/en/stable/concepts/entities.html to find out more details.`);
  }
  async function S(f, p) {
    const w = l.utils.parsePhone(p);
    if (w) try {
      const T = await f.invoke(new d.Api.contacts.GetContacts({ hash: r.default.zero }));
      if (!(T instanceof d.Api.contacts.ContactsNotModified)) {
        for (const k of T.users) if (k instanceof d.Api.User && k.phone === w) return k;
      }
    } catch (T) {
      throw T.errorMessage === "BOT_METHOD_INVALID" ? new Error("Cannot get entity by phone number as a bot (try using integer IDs, not strings)") : T;
    }
    const M = l.utils.parseID(p);
    if (M != null) return _(f, M);
    if (["me", "this"].includes(p.toLowerCase())) return f.getMe();
    {
      const { username: T, isInvite: k } = l.utils.parseUsername(p);
      if (k) {
        const B = await f.invoke(new d.Api.messages.CheckChatInvite({ hash: T }));
        if (B instanceof d.Api.ChatInvite) throw new Error("Cannot get entity from a channel (or group) that you are not part of. Join the group and retry");
        if (B instanceof d.Api.ChatInviteAlready) return B.chat;
      } else if (T) try {
        const B = await f.invoke(new d.Api.contacts.ResolveUsername({ username: T })), C = l.utils.getPeerId(B.peer, false);
        if (B.peer instanceof d.Api.PeerUser) {
          for (const E of B.users) if ((0, i.returnBigInt)(E.id).equals((0, i.returnBigInt)(C))) return E;
        } else for (const E of B.chats) if ((0, i.returnBigInt)(E.id).equals((0, i.returnBigInt)(C))) return E;
      } catch (B) {
        throw B.errorMessage === "USERNAME_NOT_OCCUPIED" ? new Error(`No user has "${T}" as username`) : B;
      }
    }
    throw new Error(`Cannot find any entity corresponding to "${p}"`);
  }
  async function $(f, p, w = true) {
    if (typeof p == "string") {
      if ((0, g.parseID)(p)) return l.utils.getPeerId(p, w);
      p = await f.getInputEntity(p);
    }
    return typeof p == "number" || typeof p == "bigint" || r.default.isInstance(p) || ((p.SUBCLASS_OF_ID == 47470215 || p.SUBCLASS_OF_ID == 3374092470) && (p = await f.getInputEntity(p)), p instanceof d.Api.InputPeerSelf && (p = await f.getMe(true))), l.utils.getPeerId(p, w);
  }
  async function m(f, p) {
    if (!p) return;
    const [w, M] = l.utils.resolveId((0, i.returnBigInt)(await f.getPeerId(p)));
    return new M({ userId: w, channelId: w, chatId: w });
  }
  async function h(f, p) {
    try {
      if (p.SUBCLASS_OF_ID == 2719782805) return p.peer = await f.getInputEntity(p.peer), p;
      if (p.SUBCLASS_OF_ID == 3374092470) return new d.Api.InputDialogPeer({ peer: p });
    } catch {
    }
    return new d.Api.InputDialogPeer({ peer: p });
  }
  async function I(f, p) {
    try {
      if (p.SUBCLASS_OF_ID == 1486362133) return p instanceof d.Api.InputNotifyPeer && (p.peer = await f.getInputEntity(p.peer)), p;
    } catch {
    }
    return new d.Api.InputNotifyPeer({ peer: await f.getInputEntity(p) });
  }
  function b(f) {
    return f._selfInputPeer ? f._selfInputPeer.userId : void 0;
  }
  return tt;
}
var Nn = {}, Fn = {}, Yr;
function yc() {
  if (Yr) return Fn;
  Yr = 1;
  var t = Le().Buffer;
  Object.defineProperty(Fn, "__esModule", { value: true }), Fn.Button = void 0;
  const d = ht(), g = Ye(), i = Ae(), l = ft();
  class r {
    [l.inspect.custom]() {
      return (0, i.betterConsoleLog)(this);
    }
    constructor(s, n, a, o) {
      this.button = s, this.resize = n, this.singleUse = a, this.selective = o;
    }
    static _isInline(s) {
      return s instanceof d.Api.KeyboardButtonCallback || s instanceof d.Api.KeyboardButtonSwitchInline || s instanceof d.Api.KeyboardButtonUrl || s instanceof d.Api.KeyboardButtonUrlAuth || s instanceof d.Api.InputKeyboardButtonUrlAuth;
    }
    static inline(s, n) {
      if (n || (n = t.from(s, "utf-8")), n.length > 64) throw new Error("Too many bytes for the data");
      return new d.Api.KeyboardButtonCallback({ text: s, data: n });
    }
    static switchInline(s, n = "", a = false) {
      return new d.Api.KeyboardButtonSwitchInline({ text: s, query: n, samePeer: a });
    }
    static url(s, n) {
      return new d.Api.KeyboardButtonUrl({ text: s, url: n || s });
    }
    static auth(s, n, a, o, c) {
      return new d.Api.InputKeyboardButtonUrlAuth({ text: s, url: n || s, bot: g.utils.getInputUser(a || new d.Api.InputUserSelf()), requestWriteAccess: o, fwdText: c });
    }
    static text(s, n, a, o) {
      return new this(new d.Api.KeyboardButton({ text: s }), n, a, o);
    }
    static requestLocation(s, n, a, o) {
      return new this(new d.Api.KeyboardButtonRequestGeoLocation({ text: s }), n, a, o);
    }
    static requestPhone(s, n, a, o) {
      return new this(new d.Api.KeyboardButtonRequestPhone({ text: s }), n, a, o);
    }
    static requestPoll(s, n, a, o) {
      return new this(new d.Api.KeyboardButtonRequestPoll({ text: s }), n, a, o);
    }
    static clear() {
      return new d.Api.ReplyKeyboardHide({});
    }
    static forceReply() {
      return new d.Api.ReplyKeyboardForceReply({});
    }
  }
  return Fn.Button = r, Fn;
}
var Xt = {}, ea;
function js() {
  if (ea) return Xt;
  ea = 1;
  var t = Le().Buffer, d = Xt && Xt.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(Xt, "__esModule", { value: true }), Xt.computeCheck = m, Xt.computeDigest = $;
  const g = Oe(), i = Ae(), l = d(Ke()), r = d(rc()), e = 256;
  function s(h, I) {
    if (!(t.from([199, 28, 174, 185, 198, 177, 201, 4, 142, 108, 82, 47, 112, 241, 63, 115, 152, 13, 64, 35, 142, 62, 33, 193, 73, 52, 208, 55, 86, 61, 147, 15, 72, 25, 138, 10, 167, 193, 64, 88, 34, 148, 147, 210, 37, 48, 244, 219, 250, 51, 111, 110, 10, 201, 37, 19, 149, 67, 174, 212, 76, 206, 124, 55, 32, 253, 81, 246, 148, 88, 112, 90, 198, 140, 212, 254, 107, 107, 19, 171, 220, 151, 70, 81, 41, 105, 50, 132, 84, 241, 143, 175, 140, 89, 95, 100, 36, 119, 254, 150, 187, 42, 148, 29, 91, 205, 29, 74, 200, 204, 73, 136, 7, 8, 250, 155, 55, 142, 60, 79, 58, 144, 96, 190, 230, 124, 249, 164, 164, 166, 149, 129, 16, 81, 144, 126, 22, 39, 83, 181, 107, 15, 107, 65, 13, 186, 116, 216, 168, 75, 42, 20, 179, 20, 78, 14, 241, 40, 71, 84, 253, 23, 237, 149, 13, 89, 101, 180, 185, 221, 70, 88, 45, 177, 23, 141, 22, 156, 107, 196, 101, 176, 214, 255, 156, 163, 146, 143, 239, 91, 154, 228, 228, 24, 252, 21, 232, 62, 190, 160, 248, 127, 169, 255, 94, 237, 112, 5, 13, 237, 40, 73, 244, 123, 249, 89, 217, 86, 133, 12, 233, 41, 133, 31, 13, 129, 21, 246, 53, 177, 5, 238, 46, 78, 21, 208, 75, 36, 84, 191, 111, 79, 173, 240, 52, 177, 4, 3, 17, 156, 216, 227, 185, 47, 204, 91]).equals(h) && [3, 4, 5, 7].includes(I))) throw new Error("Changing passwords unsupported");
  }
  function n(h, I) {
    return h.greater((0, l.default)(0)) && I.subtract(h).greater((0, l.default)(0));
  }
  function a(h) {
    return t.concat([t.alloc(e - h.length), h]);
  }
  function o(h) {
    return (0, i.readBufferFromBigInt)(h, e, false);
  }
  function c(h, I) {
    const b = I.subtract(h), f = 1984;
    return !(b.lesser((0, l.default)(0)) || b.bitLength().toJSNumber() < f || h.bitLength().toJSNumber() < f || Math.floor((h.bitLength().toJSNumber() + 7) / 8) > 256);
  }
  function u(h, I) {
    const b = Math.min(h.length, I.length);
    for (let f = 0; f < b; f++) h[f] = h[f] ^ I[f];
    return h;
  }
  function _(h, I, b) {
    return r.default.pbkdf2Sync(h, I, b, 64, "sha512");
  }
  async function S(h, I) {
    const b = await (0, i.sha256)(t.concat([h.salt1, t.from(I, "utf-8"), h.salt1])), f = await (0, i.sha256)(t.concat([h.salt2, b, h.salt2])), p = await _(f, h.salt1, 1e5);
    return (0, i.sha256)(t.concat([h.salt2, p, h.salt2]));
  }
  async function $(h, I) {
    try {
      s(h.p, h.g);
    } catch {
      throw new Error("bad p/g in password");
    }
    const b = (0, i.modExp)((0, l.default)(h.g), (0, i.readBigIntFromBuffer)(await S(h, I), false), (0, i.readBigIntFromBuffer)(h.p, false));
    return o(b);
  }
  async function m(h, I) {
    const b = h.currentAlgo;
    if (!(b instanceof g.Api.PasswordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow)) throw new Error(`Unsupported password algorithm ${b == null ? void 0 : b.className}`);
    const f = h.srp_B, p = h.srpId;
    if (!f || !p) throw new Error(`Undefined srp_b  ${h}`);
    const w = await S(b, I), M = (0, i.readBigIntFromBuffer)(b.p, false), T = b.g, k = (0, i.readBigIntFromBuffer)(f, false);
    try {
      s(b.p, T);
    } catch {
      throw new Error("bad /g in password");
    }
    if (!n(k, M)) throw new Error("bad b in check");
    const B = (0, i.readBigIntFromBuffer)(w, false), C = a(b.p), E = o((0, l.default)(T)), q = a(f), W = (0, i.modExp)((0, l.default)(T), B, M), G = (0, i.readBigIntFromBuffer)(await (0, i.sha256)(t.concat([C, E])), false), te = (0, i.bigIntMod)(G.multiply(W), M), oe = async () => {
      for (; ; ) {
        const ye = (0, i.generateRandomBytes)(256), v = (0, i.readBigIntFromBuffer)(ye, false), le = (0, i.modExp)((0, l.default)(T), v, M);
        if (c(le, M)) {
          const ve = o(le), we = (0, i.readBigIntFromBuffer)(await (0, i.sha256)(t.concat([ve, q])), false);
          if (we.greater((0, l.default)(0))) return { a: v, aForHash: ve, u: we };
        }
      }
    }, { a: he, aForHash: H, u: U } = await oe(), V = (0, i.bigIntMod)(k.subtract(te), M);
    if (!c(V, M)) throw new Error("bad gB");
    const K = U.multiply(B), F = he.add(K), R = (0, i.modExp)(V, F, M), [ee, Y, Q, se, ge] = await Promise.all([(0, i.sha256)(o(R)), (0, i.sha256)(C), (0, i.sha256)(E), (0, i.sha256)(b.salt1), (0, i.sha256)(b.salt2)]), ue = await (0, i.sha256)(t.concat([u(Y, Q), se, ge, H, q, ee]));
    return new g.Api.InputCheckPasswordSRP({ srpId: p, A: t.from(H), M1: ue });
  }
  return Xt;
}
var ta;
function wc() {
  if (ta) return Nn;
  ta = 1, Object.defineProperty(Nn, "__esModule", { value: true }), Nn.MessageButton = void 0;
  const t = ht(), d = yc(), g = Ae(), i = js(), l = ft();
  class r {
    [l.inspect.custom]() {
      return (0, g.betterConsoleLog)(this);
    }
    constructor(s, n, a, o, c) {
      this.button = n, this._bot = o, this._chat = a, this._msgId = c, this._client = s;
    }
    get client() {
      return this._client;
    }
    get text() {
      return this.button instanceof d.Button ? "" : this.button.text;
    }
    get data() {
      if (this.button instanceof t.Api.KeyboardButtonCallback) return this.button.data;
    }
    get inlineQuery() {
      if (this.button instanceof t.Api.KeyboardButtonSwitchInline) return this.button.query;
    }
    get url() {
      if (this.button instanceof t.Api.KeyboardButtonUrl) return this.button.url;
    }
    async click({ sharePhone: s = false, shareGeo: n = [0, 0], password: a }) {
      if (this.button instanceof t.Api.KeyboardButton) return this._client.sendMessage(this._chat, { message: this.button.text, parseMode: void 0 });
      if (this.button instanceof t.Api.KeyboardButtonCallback) {
        let o;
        if (a != null) {
          const u = await this.client.invoke(new t.Api.account.GetPassword());
          o = await (0, i.computeCheck)(u, a);
        }
        const c = new t.Api.messages.GetBotCallbackAnswer({ peer: this._chat, msgId: this._msgId, data: this.button.data, password: o });
        try {
          return await this._client.invoke(c);
        } catch (u) {
          if (u.errorMessage == "BOT_RESPONSE_TIMEOUT") return null;
          throw u;
        }
      } else {
        if (this.button instanceof t.Api.KeyboardButtonSwitchInline) return this._client.invoke(new t.Api.messages.StartBot({ bot: this._bot, peer: this._chat, startParam: this.button.query }));
        if (this.button instanceof t.Api.KeyboardButtonUrl) return this.button.url;
        if (this.button instanceof t.Api.KeyboardButtonGame) {
          const o = new t.Api.messages.GetBotCallbackAnswer({ peer: this._chat, msgId: this._msgId, game: true });
          try {
            return await this._client.invoke(o);
          } catch (c) {
            if (c.errorMessage == "BOT_RESPONSE_TIMEOUT") return null;
            throw c;
          }
        } else if (this.button instanceof t.Api.KeyboardButtonRequestPhone) {
          if (!s) throw new Error("cannot click on phone buttons unless sharePhone=true");
          if (s == true || typeof s == "string") {
            const o = await this._client.getMe();
            s = new t.Api.InputMediaContact({ phoneNumber: (s == true ? o.phone : s) || "", firstName: o.firstName || "", lastName: o.lastName || "", vcard: "" });
          }
          throw new Error("Not supported for now");
        } else if (this.button instanceof t.Api.InputWebFileGeoPointLocation) throw n ? new Error("Not supported for now") : new Error("cannot click on geo buttons unless shareGeo=[longitude, latitude]");
      }
    }
  }
  return Nn.MessageButton = r, Nn;
}
var na;
function MCe() {
  if (na) return vt;
  na = 1;
  var t = vt && vt.__createBinding || (Object.create ? (function($, m, h, I) {
    I === void 0 && (I = h);
    var b = Object.getOwnPropertyDescriptor(m, h);
    (!b || ("get" in b ? !m.__esModule : b.writable || b.configurable)) && (b = { enumerable: true, get: function() {
      return m[h];
    } }), Object.defineProperty($, I, b);
  }) : (function($, m, h, I) {
    I === void 0 && (I = h), $[I] = m[h];
  })), d = vt && vt.__setModuleDefault || (Object.create ? (function($, m) {
    Object.defineProperty($, "default", { enumerable: true, value: m });
  }) : function($, m) {
    $.default = m;
  }), g = vt && vt.__importStar || function($) {
    if ($ && $.__esModule) return $;
    var m = {};
    if ($ != null) for (var h in $) h !== "default" && Object.prototype.hasOwnProperty.call($, h) && t(m, $, h);
    return d(m, $), m;
  };
  Object.defineProperty(vt, "__esModule", { value: true }), vt.CustomMessage = void 0;
  const i = ji(), l = ht(), r = Ns(), e = g(Xe()), s = xCe(), n = ECe(), a = Ae(), o = Fs(), c = xt(), u = wc(), _ = ft();
  class S extends i.SenderGetter {
    [_.inspect.custom]() {
      return (0, a.betterConsoleLog)(this);
    }
    init({ id: m, peerId: h = void 0, date: I = void 0, out: b = void 0, mentioned: f = void 0, mediaUnread: p = void 0, silent: w = void 0, post: M = void 0, fromId: T = void 0, replyTo: k = void 0, message: B = void 0, fwdFrom: C = void 0, viaBotId: E = void 0, media: q = void 0, replyMarkup: W = void 0, entities: G = void 0, views: te = void 0, editDate: oe = void 0, postAuthor: he = void 0, groupedId: H = void 0, fromScheduled: U = void 0, legacy: V = void 0, editHide: K = void 0, pinned: F = void 0, restrictionReason: R = void 0, forwards: ee = void 0, replies: Y = void 0, action: Q = void 0, reactions: se = void 0, noforwards: ge = void 0, ttlPeriod: ue = void 0, _entities: ce = /* @__PURE__ */ new Map() }) {
      if (!m) throw new Error("id is a required attribute for Message");
      let ye;
      T ? ye = e.getPeerId(T) : h && (M || !b && h instanceof l.Api.PeerUser) && (ye = e.getPeerId(h)), this._entities = ce, this.out = b, this.mentioned = f, this.mediaUnread = p, this.silent = w, this.post = M, this.post = M, this.fromScheduled = U, this.legacy = V, this.editHide = K, this.ttlPeriod = ue, this.id = m, this.fromId = T, this.peerId = h, this.fwdFrom = C, this.viaBotId = E, this.replyTo = k, this.date = I, this.message = B, this.media = q instanceof l.Api.MessageMediaEmpty ? q : void 0, this.replyMarkup = W, this.entities = G, this.views = te, this.forwards = ee, this.replies = Y, this.editDate = oe, this.pinned = F, this.postAuthor = he, this.groupedId = H, this.restrictionReason = R, this.action = Q, this.noforwards = ge, this.reactions = se, this._client = void 0, this._text = void 0, this._file = void 0, this._replyMessage = void 0, this._buttons = void 0, this._buttonsFlat = void 0, this._buttonsCount = 0, this._viaBot = void 0, this._viaInputBot = void 0, this._actionEntities = void 0, r.ChatGetter.initChatClass(this, { chatPeer: h, broadcast: M }), i.SenderGetter.initSenderClass(this, { senderId: ye ? (0, a.returnBigInt)(ye) : void 0 }), this._forward = void 0;
    }
    constructor(m) {
      super(), this.init(m);
    }
    _finishInit(m, h, I) {
      this._client = m;
      const b = m._entityCache;
      this.senderId && ([this._sender, this._inputSender] = e._getEntityPair(this.senderId.toString(), h, b)), this.chatId && ([this._chat, this._inputChat] = e._getEntityPair(this.chatId.toString(), h, b)), I && (this._inputChat = I), this.viaBotId && ([this._viaBot, this._viaInputBot] = e._getEntityPair(this.viaBotId.toString(), h, b)), this.fwdFrom && (this._forward = new s.Forward(this._client, this.fwdFrom, h)), this.action && (this.action instanceof l.Api.MessageActionChatAddUser || this.action instanceof l.Api.MessageActionChatCreate ? this._actionEntities = this.action.users.map((f) => h.get(f.toString())) : this.action instanceof l.Api.MessageActionChatDeleteUser ? this._actionEntities = [h.get(this.action.userId.toString())] : this.action instanceof l.Api.MessageActionChatJoinedByLink ? this._actionEntities = [h.get(e.getPeerId(new l.Api.PeerChannel({ channelId: this.action.inviterId })))] : this.action instanceof l.Api.MessageActionChannelMigrateFrom && (this._actionEntities = [h.get(e.getPeerId(new l.Api.PeerChat({ chatId: this.action.chatId })))]));
    }
    get client() {
      return this._client;
    }
    get text() {
      return this._text === void 0 && this._client && (this._client.parseMode ? this._text = this._client.parseMode.unparse(this.message || "", this.entities || []) : this._text = this.message), this._text || "";
    }
    set text(m) {
      this._text = m, this._client && this._client.parseMode ? [this.message, this.entities] = this._client.parseMode.parse(m) : (this.message = m, this.entities = []);
    }
    get rawText() {
      return this.message || "";
    }
    set rawText(m) {
      this.message = m, this.entities = [], this._text = "";
    }
    get isReply() {
      return !!this.replyTo;
    }
    get forward() {
      return this._forward;
    }
    async _refetchSender() {
      await this._reloadMessage();
    }
    async _reloadMessage() {
      if (!this._client) return;
      let m;
      try {
        const h = this.isChannel ? await this.getInputChat() : void 0;
        let I = await this._client.getMessages(h, { ids: this.id });
        I && (m = I[0]);
      } catch (h) {
        this._client._log.error("Got error while trying to finish init message with id " + this.id), this._client._errorHandler && await this._client._errorHandler(h), this._client._log.canSend(c.LogLevel.ERROR) && console.error(h);
      }
      m != null && (this._sender = m._sender, this._inputSender = m._inputSender, this._chat = m._chat, this._inputChat = m._inputChat, this._viaBot = m._viaBot, this._viaInputBot = m._viaInputBot, this._forward = m._forward, this._actionEntities = m._actionEntities);
    }
    get buttons() {
      if (!this._buttons && this.replyMarkup) {
        if (!this.inputChat) return;
        try {
          const m = this._neededMarkupBot();
          this._setButtons(this.inputChat, m);
        } catch {
          return;
        }
      }
      return this._buttons;
    }
    async getButtons() {
      if (!this.buttons && this.replyMarkup) {
        const m = await this.getInputChat();
        if (!m) return;
        let h;
        try {
          h = this._neededMarkupBot();
        } catch {
          await this._reloadMessage(), h = this._neededMarkupBot();
        }
        this._setButtons(m, h);
      }
      return this._buttons;
    }
    get buttonCount() {
      return this._buttonsCount || (this.replyMarkup instanceof l.Api.ReplyInlineMarkup || this.replyMarkup instanceof l.Api.ReplyKeyboardMarkup ? this._buttonsCount = this.replyMarkup.rows.map((m) => m.buttons.length).reduce(function(m, h) {
        return m + h;
      }, 0) : this._buttonsCount = 0), this._buttonsCount;
    }
    get file() {
      if (!this._file) {
        const m = this.photo || this.document;
        m && (this._file = new n.File(m));
      }
      return this._file;
    }
    get photo() {
      if (this.media instanceof l.Api.MessageMediaPhoto) {
        if (this.media.photo instanceof l.Api.Photo) return this.media.photo;
      } else return this.action instanceof l.Api.MessageActionChatEditPhoto ? this.action.photo : this.webPreview && this.webPreview.photo instanceof l.Api.Photo ? this.webPreview.photo : void 0;
    }
    get document() {
      if (this.media instanceof l.Api.MessageMediaDocument) {
        if (this.media.document instanceof l.Api.Document) return this.media.document;
      } else {
        const m = this.webPreview;
        return m && m.document instanceof l.Api.Document ? m.document : void 0;
      }
    }
    get webPreview() {
      if (this.media instanceof l.Api.MessageMediaWebPage && this.media.webpage instanceof l.Api.WebPage) return this.media.webpage;
    }
    get audio() {
      return this._documentByAttribute(l.Api.DocumentAttributeAudio, (m) => !m.voice);
    }
    get voice() {
      return this._documentByAttribute(l.Api.DocumentAttributeAudio, (m) => !!m.voice);
    }
    get video() {
      return this._documentByAttribute(l.Api.DocumentAttributeVideo);
    }
    get videoNote() {
      return this._documentByAttribute(l.Api.DocumentAttributeVideo, (m) => !!m.roundMessage);
    }
    get gif() {
      return this._documentByAttribute(l.Api.DocumentAttributeAnimated);
    }
    get sticker() {
      return this._documentByAttribute(l.Api.DocumentAttributeSticker);
    }
    get contact() {
      if (this.media instanceof l.Api.MessageMediaContact) return this.media;
    }
    get game() {
      if (this.media instanceof l.Api.MessageMediaGame) return this.media.game;
    }
    get geo() {
      if (this.media instanceof l.Api.MessageMediaGeo || this.media instanceof l.Api.MessageMediaGeoLive || this.media instanceof l.Api.MessageMediaVenue) return this.media.geo;
    }
    get invoice() {
      if (this.media instanceof l.Api.MessageMediaInvoice) return this.media;
    }
    get poll() {
      if (this.media instanceof l.Api.MessageMediaPoll) return this.media;
    }
    get venue() {
      if (this.media instanceof l.Api.MessageMediaVenue) return this.media;
    }
    get dice() {
      if (this.media instanceof l.Api.MessageMediaDice) return this.media;
    }
    get actionEntities() {
      return this._actionEntities;
    }
    get viaBot() {
      return this._viaBot;
    }
    get viaInputBot() {
      return this._viaInputBot;
    }
    get replyToMsgId() {
      var m;
      return (m = this.replyTo) === null || m === void 0 ? void 0 : m.replyToMsgId;
    }
    get toId() {
      return this._client && !this.out && this.isPrivate ? new l.Api.PeerUser({ userId: (0, o._selfId)(this._client) }) : this.peerId;
    }
    getEntitiesText(m) {
      let h = this.entities;
      if (!h || h.length == 0) return;
      m && (h = h.filter((f) => f instanceof m));
      const I = e.getInnerText(this.message || "", h);
      return ((f) => f[0].map((p, w) => f.map((M) => M[w])))([h, I]);
    }
    async getReplyMessage() {
      if (!this._replyMessage && this._client) {
        if (!this.replyTo) return;
        this._replyMessage = (await this._client.getMessages(this.isChannel ? await this.getInputChat() : void 0, { ids: new l.Api.InputMessageReplyTo({ id: this.id }) }))[0], this._replyMessage || (this._replyMessage = (await this._client.getMessages(this.isChannel ? this._inputChat : void 0, { ids: this.replyToMsgId }))[0]);
      }
      return this._replyMessage;
    }
    async respond(m) {
      if (this._client) return this._client.sendMessage(await this.getInputChat(), m);
    }
    async reply(m) {
      if (this._client) return m.replyTo = this.id, this._client.sendMessage(await this.getInputChat(), m);
    }
    async forwardTo(m) {
      if (this._client) {
        m = await this._client.getInputEntity(m);
        const h = { messages: [this.id], fromPeer: await this.getInputChat() };
        return this._client.forwardMessages(m, h);
      }
    }
    async edit(m) {
      const h = m;
      if (!(this.fwdFrom || !this._client)) return h.linkPreview == null && (h.linkPreview = !!this.webPreview), h.buttons == null && (h.buttons = this.replyMarkup), h.message = this.id, this._client.editMessage(await this.getInputChat(), h);
    }
    async delete({ revoke: m } = { revoke: false }) {
      if (this._client) return this._client.deleteMessages(await this.getInputChat(), [this.id], { revoke: m });
    }
    async pin(m) {
      if (this._client) {
        const h = await this.getInputChat();
        if (h === void 0) throw Error("Failed to pin message due to cannot get input chat.");
        return this._client.pinMessage(h, this.id, m);
      }
    }
    async unpin(m) {
      if (this._client) {
        const h = await this.getInputChat();
        if (h === void 0) throw Error("Failed to unpin message due to cannot get input chat.");
        return this._client.unpinMessage(h, this.id, m);
      }
    }
    async downloadMedia(m) {
      if (this._client) return this._client.downloadMedia(this, m || {});
    }
    async markAsRead() {
      if (this._client) {
        const m = await this.getInputChat();
        if (m === void 0) throw Error(`Failed to mark message id ${this.id} as read due to cannot get input chat.`);
        return this._client.markAsRead(m, this.id);
      }
    }
    async click({ i: m, j: h, text: I, filter: b, data: f, sharePhone: p, shareGeo: w, password: M }) {
      if (!this.client) return;
      if (f) {
        const B = await this.getInputChat();
        if (!B) return;
        const C = new l.Api.KeyboardButtonCallback({ text: "", data: f });
        return await new u.MessageButton(this.client, C, B, void 0, this.id).click({ sharePhone: p, shareGeo: w, password: M });
      }
      if (this.poll) {
        const C = (function(E) {
          if (m != null) {
            if (Array.isArray(m)) {
              const q = [];
              for (let W = 0; W < m.length; W++) q.push(E[W].option);
              return q;
            }
            return [E[m].option];
          }
          if (I != null) {
            if (typeof I == "function") {
              for (const q of E) if (I(q.text)) return [q.option];
            } else for (const q of E) if (q.text.text == I) return [q.option];
            return;
          }
          if (b != null) {
            for (const q of E) if (b(q)) return [q.option];
            return;
          }
        })(this.poll.poll.answers) || [];
        return await this.client.invoke(new l.Api.messages.SendVote({ peer: this.inputChat, msgId: this.id, options: C }));
      }
      if (!await this.getButtons()) return;
      function T(B) {
        if (!(!B._buttonsFlat || !B._buttons)) {
          if (Array.isArray(m) && (m = m[0]), I != null) {
            if (typeof I == "function") {
              for (const C of B._buttonsFlat) if (I(C.text)) return C;
            } else for (const C of B._buttonsFlat) if (C.text == I) return C;
            return;
          }
          if (b != null) {
            for (const C of B._buttonsFlat) if (b(C)) return C;
            return;
          }
          return m == null && (m = 0), h == null ? B._buttonsFlat[m] : B._buttons[m][h];
        }
      }
      const k = T(this);
      if (k) return await k.click({ sharePhone: p, shareGeo: w, password: M });
    }
    _setButtons(m, h) {
      if (this.client && (this.replyMarkup instanceof l.Api.ReplyInlineMarkup || this.replyMarkup instanceof l.Api.ReplyKeyboardMarkup)) {
        this._buttons = [], this._buttonsFlat = [];
        for (const I of this.replyMarkup.rows) {
          const b = [];
          for (const f of I.buttons) {
            const p = new u.MessageButton(this.client, f, m, h, this.id);
            b.push(p), this._buttonsFlat.push(p);
          }
          this._buttons.push(b);
        }
      }
    }
    _neededMarkupBot() {
      if (!(!this.client || this.replyMarkup == null) && (this.replyMarkup instanceof l.Api.ReplyInlineMarkup || this.replyMarkup instanceof l.Api.ReplyKeyboardMarkup)) {
        for (const m of this.replyMarkup.rows) for (const h of m.buttons) if (h instanceof l.Api.KeyboardButtonSwitchInline) if (h.samePeer || !this.viaBotId) {
          const I = this._inputSender;
          if (!I) throw new Error("No input sender");
          return I;
        } else {
          const I = this.client._entityCache.get(this.viaBotId);
          if (!I) throw new Error("No input sender");
          return I;
        }
      }
    }
    _documentByAttribute(m, h) {
      const I = this.document;
      if (I) {
        for (const b of I.attributes) if (b instanceof m) return h == null || typeof h == "function" && h(b) ? I : void 0;
      }
    }
  }
  return vt.CustomMessage = S, vt;
}
var sa;
function $Ce() {
  if (sa) return $s;
  sa = 1, Object.defineProperty($s, "__esModule", { value: true }), $s.patchAll = e;
  const t = ht(), d = MCe();
  function g(s, n) {
    for (; s; ) {
      let a = Object.getOwnPropertyDescriptor(s, n);
      if (a && a.get) return a.get;
      s = Object.getPrototypeOf(s);
    }
  }
  function i(s, n) {
    for (; s; ) {
      let a = Object.getOwnPropertyDescriptor(s, n);
      if (a && a.set) return a.set;
      s = Object.getPrototypeOf(s);
    }
  }
  const l = (s) => {
    let n = { methods: /* @__PURE__ */ new Set(), setters: /* @__PURE__ */ new Set(), getters: /* @__PURE__ */ new Set() }, a = s;
    const o = (c) => {
      const u = g(a, c), _ = i(a, c);
      u ? n.getters.add(c) : _ ? n.setters.add(c) : c != "constructor" && n.methods.add(c);
    };
    do
      Object.getOwnPropertyNames(s).map(o), s = Object.getPrototypeOf(s);
    while (s && Object.getPrototypeOf(s));
    return n;
  };
  function r(s) {
    const { getters: n, setters: a, methods: o } = l(d.CustomMessage.prototype);
    for (const c of n) Object.defineProperty(s.prototype, c, { get: g(d.CustomMessage.prototype, c) });
    for (const c of a) Object.defineProperty(s.prototype, c, { set: i(d.CustomMessage.prototype, c) });
    for (const c of o) s.prototype[c] = d.CustomMessage.prototype[c];
  }
  function e() {
    r(t.Api.Message), r(t.Api.MessageService), r(t.Api.MessageEmpty);
  }
  return $s;
}
var ia;
function Oe() {
  return ia || (ia = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.serializeDate = t.serializeBytes = t.Api = void 0;
    const d = ht();
    Object.defineProperty(t, "Api", { enumerable: true, get: function() {
      return d.Api;
    } }), (0, $Ce().patchAll)();
    var i = ac();
    Object.defineProperty(t, "serializeBytes", { enumerable: true, get: function() {
      return i.serializeBytes;
    } }), Object.defineProperty(t, "serializeDate", { enumerable: true, get: function() {
      return i.serializeDate;
    } });
  })(Js)), Js;
}
var wt = {}, Yt = {}, ui = {}, Lt = {}, di = {}, jn = {}, ra;
function Sc() {
  if (ra) return jn;
  ra = 1;
  var t = Le().Buffer;
  Object.defineProperty(jn, "__esModule", { value: true }), jn.BinaryWriter = void 0;
  let d = class {
    constructor(i) {
      this._buffers = [i];
    }
    write(i) {
      this._buffers.push(i);
    }
    getValue() {
      return t.concat(this._buffers);
    }
  };
  return jn.BinaryWriter = d, jn;
}
var Gn = {}, en = {}, Ge = {};
function kCe(t, d) {
  var g = Object.setPrototypeOf;
  g ? g(t, d) : t.__proto__ = d;
}
function Ic(t, d) {
  d === void 0 && (d = t.constructor);
  var g = Error.captureStackTrace;
  g && g(t, d);
}
var RCe = /* @__PURE__ */ (function() {
  var t = function(g, i) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(l, r) {
      l.__proto__ = r;
    } || function(l, r) {
      for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (l[e] = r[e]);
    }, t(g, i);
  };
  return function(d, g) {
    if (typeof g != "function" && g !== null) throw new TypeError("Class extends value " + String(g) + " is not a constructor or null");
    t(d, g);
    function i() {
      this.constructor = d;
    }
    d.prototype = g === null ? Object.create(g) : (i.prototype = g.prototype, new i());
  };
})(), TCe = (function(t) {
  RCe(d, t);
  function d(g, i) {
    var l = this.constructor, r = t.call(this, g, i) || this;
    return Object.defineProperty(r, "name", { value: l.name, enumerable: false, configurable: true }), kCe(r, l.prototype), Ic(r), r;
  }
  return d;
})(Error), BCe = function(t, d, g) {
  if (g || arguments.length === 2) for (var i = 0, l = d.length, r; i < l; i++) (r || !(i in d)) && (r || (r = Array.prototype.slice.call(d, 0, i)), r[i] = d[i]);
  return t.concat(r || Array.prototype.slice.call(d));
};
function DCe(t, d) {
  d === void 0 && (d = Error);
  function g() {
    for (var i = [], l = 0; l < arguments.length; l++) i[l] = arguments[l];
    if (!(this instanceof g)) return new (g.bind.apply(g, BCe([void 0], i, false)))();
    d.apply(this, i), Object.defineProperty(this, "name", { value: t.name || d.name, enumerable: false, configurable: true }), t.apply(this, i), Ic(this, g);
  }
  return Object.defineProperties(g, { prototype: { value: Object.create(d.prototype, { constructor: { value: g, writable: true, configurable: true } }) } });
}
const qCe = Object.freeze(Object.defineProperty({ __proto__: null, CustomError: TCe, customErrorFactory: DCe }, Symbol.toStringTag, { value: "Module" })), UCe = Rn(qCe);
var aa;
function Li() {
  if (aa) return Ge;
  aa = 1, Object.defineProperty(Ge, "__esModule", { value: true }), Ge.TimedOutError = Ge.ServerError = Ge.FloodError = Ge.AuthKeyError = Ge.NotFoundError = Ge.ForbiddenError = Ge.UnauthorizedError = Ge.BadRequestError = Ge.InvalidDCError = Ge.RPCError = void 0;
  const t = UCe;
  class d extends t.CustomError {
    constructor(u, _, S) {
      super("{0}: {1}{2}".replace("{0}", (S == null ? void 0 : S.toString()) || "").replace("{1}", u || "").replace("{2}", d._fmtRequest(_))), this.code = S, this.errorMessage = u;
    }
    static _fmtRequest(u) {
      return u ? ` (caused by ${u.className})` : "";
    }
  }
  Ge.RPCError = d;
  class g extends d {
    constructor(u, _, S) {
      super(u, _, S), this.code = S || 303, this.errorMessage = u || "ERROR_SEE_OTHER";
    }
  }
  Ge.InvalidDCError = g;
  class i extends d {
    constructor() {
      super(...arguments), this.code = 400, this.errorMessage = "BAD_REQUEST";
    }
  }
  Ge.BadRequestError = i;
  class l extends d {
    constructor() {
      super(...arguments), this.code = 401, this.errorMessage = "UNAUTHORIZED";
    }
  }
  Ge.UnauthorizedError = l;
  class r extends d {
    constructor() {
      super(...arguments), this.code = 403, this.errorMessage = "FORBIDDEN";
    }
  }
  Ge.ForbiddenError = r;
  class e extends d {
    constructor() {
      super(...arguments), this.code = 404, this.errorMessage = "NOT_FOUND";
    }
  }
  Ge.NotFoundError = e;
  class s extends d {
    constructor() {
      super(...arguments), this.code = 406, this.errorMessage = "AUTH_KEY";
    }
  }
  Ge.AuthKeyError = s;
  class n extends d {
    constructor() {
      super(...arguments), this.code = 420, this.errorMessage = "FLOOD";
    }
  }
  Ge.FloodError = n;
  class a extends d {
    constructor() {
      super(...arguments), this.code = 500, this.errorMessage = "INTERNAL";
    }
  }
  Ge.ServerError = a;
  class o extends d {
    constructor() {
      super(...arguments), this.code = 503, this.errorMessage = "Timeout";
    }
  }
  return Ge.TimedOutError = o, Ge;
}
var He = {}, oa;
function ca() {
  if (oa) return He;
  oa = 1, Object.defineProperty(He, "__esModule", { value: true }), He.rpcErrorRe = He.MsgWaitError = He.EmailUnconfirmedError = He.NetworkMigrateError = He.FileMigrateError = He.FloodTestPhoneWaitError = He.FloodWaitError = He.SlowModeWaitError = He.PhoneMigrateError = He.UserMigrateError = void 0;
  const t = Li();
  class d extends t.InvalidDCError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`The user whose identity is being used to execute queries is associated with DC ${u}` + t.RPCError._fmtRequest(c.request), c.request), this.message = `The user whose identity is being used to execute queries is associated with DC ${u}` + t.RPCError._fmtRequest(c.request), this.newDc = u;
    }
  }
  He.UserMigrateError = d;
  class g extends t.InvalidDCError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`The phone number a user is trying to use for authorization is associated with DC ${u}` + t.RPCError._fmtRequest(c.request), c.request), this.message = `The phone number a user is trying to use for authorization is associated with DC ${u}` + t.RPCError._fmtRequest(c.request), this.newDc = u;
    }
  }
  He.PhoneMigrateError = g;
  class i extends t.FloodError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`A wait of ${u} seconds is required before sending another message in this chat` + t.RPCError._fmtRequest(c.request), c.request), this.message = `A wait of ${u} seconds is required before sending another message in this chat` + t.RPCError._fmtRequest(c.request), this.seconds = u;
    }
  }
  He.SlowModeWaitError = i;
  class l extends t.FloodError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`A wait of ${u} seconds is required` + t.RPCError._fmtRequest(c.request), c.request), this.message = `A wait of ${u} seconds is required` + t.RPCError._fmtRequest(c.request), this.seconds = u;
    }
  }
  He.FloodWaitError = l;
  class r extends t.FloodError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`A wait of ${u} seconds is required in the test servers` + t.RPCError._fmtRequest(c.request), c.request), this.message = `A wait of ${u} seconds is required in the test servers` + t.RPCError._fmtRequest(c.request), this.seconds = u;
    }
  }
  He.FloodTestPhoneWaitError = r;
  class e extends t.InvalidDCError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`The file to be accessed is currently stored in DC ${u}` + t.RPCError._fmtRequest(c.request), c.request), this.message = `The file to be accessed is currently stored in DC ${u}` + t.RPCError._fmtRequest(c.request), this.newDc = u;
    }
  }
  He.FileMigrateError = e;
  class s extends t.InvalidDCError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`The source IP address is associated with DC ${u}` + t.RPCError._fmtRequest(c.request), c.request), this.message = `The source IP address is associated with DC ${u}` + t.RPCError._fmtRequest(c.request), this.newDc = u;
    }
  }
  He.NetworkMigrateError = s;
  class n extends t.BadRequestError {
    constructor(c) {
      const u = Number(c.capture || 0);
      super(`Email unconfirmed, the length of the code must be ${u}${t.RPCError._fmtRequest(c.request)}`, c.request, 400), this.message = `Email unconfirmed, the length of the code must be ${u}${t.RPCError._fmtRequest(c.request)}`, this.codeLength = u;
    }
  }
  He.EmailUnconfirmedError = n;
  class a extends t.FloodError {
    constructor(c) {
      super(`Message failed to be sent.${t.RPCError._fmtRequest(c.request)}`, c.request), this.message = `Message failed to be sent.${t.RPCError._fmtRequest(c.request)}`;
    }
  }
  return He.MsgWaitError = a, He.rpcErrorRe = /* @__PURE__ */ new Map([[/FILE_MIGRATE_(\d+)/, e], [/FLOOD_TEST_PHONE_WAIT_(\d+)/, r], [/FLOOD_WAIT_(\d+)/, l], [/FLOOD_PREMIUM_WAIT_(\d+)/, l], [/MSG_WAIT_(.*)/, a], [/PHONE_MIGRATE_(\d+)/, g], [/SLOWMODE_WAIT_(\d+)/, i], [/USER_MIGRATE_(\d+)/, d], [/NETWORK_MIGRATE_(\d+)/, s], [/EMAIL_UNCONFIRMED_(\d+)/, n]]), He;
}
var nt = {}, la;
function LCe() {
  if (la) return nt;
  la = 1, Object.defineProperty(nt, "__esModule", { value: true }), nt.BadMessageError = nt.CdnFileTamperedError = nt.SecurityError = nt.InvalidBufferError = nt.InvalidChecksumError = nt.TypeNotFoundError = nt.ReadCancelledError = void 0;
  class t extends Error {
    constructor() {
      super("The read operation was cancelled.");
    }
  }
  nt.ReadCancelledError = t;
  class d extends Error {
    constructor(n, a) {
      super(`Could not find a matching Constructor ID for the TLObject that was supposed to be
        read with ID ${n}. Most likely, a TLObject was trying to be read when
         it should not be read. Remaining bytes: ${a.length}`), typeof alert < "u" && alert(`Missing MTProto Entity: Please, make sure to add TL definition for ID ${n}`), this.invalidConstructorId = n, this.remaining = a;
    }
  }
  nt.TypeNotFoundError = d;
  class g extends Error {
    constructor(n, a) {
      super(`Invalid checksum (${n} when ${a} was expected). This packet should be skipped.`), this.checksum = n, this.validChecksum = a;
    }
  }
  nt.InvalidChecksumError = g;
  class i extends Error {
    constructor(n) {
      let a;
      n.length === 4 ? (a = -n.readInt32LE(0), super(`Invalid response buffer (HTTP code ${a})`)) : super(`Invalid response buffer (too short ${n})`), this.code = a, this.payload = n;
    }
  }
  nt.InvalidBufferError = i;
  class l extends Error {
    constructor(...n) {
      n.length || (n = ["A security check failed."]), super(...n);
    }
  }
  nt.SecurityError = l;
  class r extends l {
    constructor() {
      super("The CDN file has been altered and its download cancelled.");
    }
  }
  nt.CdnFileTamperedError = r;
  class e extends Error {
    constructor(n, a) {
      let o = e.ErrorMessages[a] || `Unknown error code (this should not happen): ${a}.`;
      o += `  Caused by ${n.className}`, super(o), this.errorMessage = o, this.code = a;
    }
  }
  return nt.BadMessageError = e, e.ErrorMessages = { 16: "msg_id too low (most likely, client time is wrong it would be worthwhile to synchronize it using msg_id notifications and re-send the original message with the \u201Ccorrect\u201D msg_id or wrap it in a container with a new msg_id if the original message had waited too long on the client to be transmitted).", 17: "msg_id too high (similar to the previous case, the client time has to be synchronized, and the message re-sent with the correct msg_id).", 18: "Incorrect two lower order msg_id bits (the server expects client message msg_id to be divisible by 4).", 19: "Container msg_id is the same as msg_id of a previously received message (this must never happen).", 20: "Message too old, and it cannot be verified whether the server has received a message with this msg_id or not.", 32: "msg_seqno too low (the server has already received a message with a lower msg_id but with either a higher or an equal and odd seqno).", 33: "msg_seqno too high (similarly, there is a message with a higher msg_id but with either a lower or an equal and odd seqno).", 34: "An even msg_seqno expected (irrelevant message), but odd received.", 35: "Odd msg_seqno expected (relevant message), but even received.", 48: "Incorrect server salt (in this case, the bad_server_salt response is received with the correct salt, and the message is to be re-sent with it).", 64: "Invalid container." }, nt;
}
var ua;
function Gt() {
  return ua || (ua = 1, (function(t) {
    var d = en && en.__createBinding || (Object.create ? (function(e, s, n, a) {
      a === void 0 && (a = n);
      var o = Object.getOwnPropertyDescriptor(s, n);
      (!o || ("get" in o ? !s.__esModule : o.writable || o.configurable)) && (o = { enumerable: true, get: function() {
        return s[n];
      } }), Object.defineProperty(e, a, o);
    }) : (function(e, s, n, a) {
      a === void 0 && (a = n), e[a] = s[n];
    })), g = en && en.__exportStar || function(e, s) {
      for (var n in e) n !== "default" && !Object.prototype.hasOwnProperty.call(s, n) && d(s, e, n);
    };
    Object.defineProperty(t, "__esModule", { value: true }), t.RPCMessageToError = r;
    const i = Li(), l = ca();
    function r(e, s) {
      for (const [n, a] of l.rpcErrorRe) {
        const o = e.errorMessage.match(n);
        if (o) {
          const c = o.length === 2 ? parseInt(o[1]) : null;
          return new a({ request: s, capture: c });
        }
      }
      return new i.RPCError(e.errorMessage, s, e.errorCode);
    }
    g(LCe(), t), g(Li(), t), g(ca(), t);
  })(en)), en;
}
var fi = {}, Hn = {}, da;
function Pc() {
  if (da) return Hn;
  da = 1, Object.defineProperty(Hn, "__esModule", { value: true }), Hn.TLMessage = void 0;
  let t = class {
    constructor(g, i, l) {
      this.msgId = g, this.seqNo = i, this.obj = l, this.classType = "constructor";
    }
  };
  return Hn.TLMessage = t, t.SIZE_OVERHEAD = 12, t.classType = "constructor", Hn;
}
var zn = {}, fa;
function OCe() {
  if (fa) return zn;
  fa = 1, Object.defineProperty(zn, "__esModule", { value: true }), zn.RPCResult = void 0;
  const t = ht(), d = kn();
  let g = class Os {
    constructor(l, r, e) {
      this.CONSTRUCTOR_ID = 4082920705, this.reqMsgId = l, this.body = r, this.error = e, this.classType = "constructor";
    }
    static async fromReader(l) {
      const r = l.readLong(), e = l.readInt(false);
      return e === t.Api.RpcError.CONSTRUCTOR_ID ? new Os(r, void 0, t.Api.RpcError.fromReader(l)) : e === d.GZIPPacked.CONSTRUCTOR_ID ? new Os(r, (await d.GZIPPacked.fromReader(l)).data) : (l.seek(-4), new Os(r, l.read(), void 0));
    }
  };
  return zn.RPCResult = g, g.CONSTRUCTOR_ID = 4082920705, g.classType = "constructor", zn;
}
var Kn = {}, pa;
function VCe() {
  if (pa) return Kn;
  pa = 1, Object.defineProperty(Kn, "__esModule", { value: true }), Kn.MessageContainer = void 0;
  const t = Pc();
  let d = class Ac {
    constructor(i) {
      this.CONSTRUCTOR_ID = 1945237724, this.messages = i, this.classType = "constructor";
    }
    static async fromReader(i) {
      const l = [], r = i.readInt();
      for (let e = 0; e < r; e++) {
        const s = i.readLong(), n = i.readInt(), a = i.readInt(), o = i.tellPosition(), c = i.tgReadObject();
        i.setPosition(o + a);
        const u = new t.TLMessage(s, n, c);
        l.push(u);
      }
      return new Ac(l);
    }
  };
  return Kn.MessageContainer = d, d.CONSTRUCTOR_ID = 1945237724, d.classType = "constructor", d.MAXIMUM_SIZE = 1044448, d.MAXIMUM_LENGTH = 100, Kn;
}
var Wn = {}, St = {}, tn = {}, It = {}, nn = {}, ga;
function NCe() {
  if (ga) return nn;
  ga = 1;
  const t = 4, d = 0, g = 1, i = 2;
  function l(P) {
    let O = P.length;
    for (; --O >= 0; ) P[O] = 0;
  }
  const r = 0, e = 1, s = 2, n = 3, a = 258, o = 29, c = 256, u = c + 1 + o, _ = 30, S = 19, $ = 2 * u + 1, m = 15, h = 16, I = 7, b = 256, f = 16, p = 17, w = 18, M = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]), T = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]), k = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]), B = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), C = 512, E = new Array((u + 2) * 2);
  l(E);
  const q = new Array(_ * 2);
  l(q);
  const W = new Array(C);
  l(W);
  const G = new Array(a - n + 1);
  l(G);
  const te = new Array(o);
  l(te);
  const oe = new Array(_);
  l(oe);
  function he(P, O, z, J, L) {
    this.static_tree = P, this.extra_bits = O, this.extra_base = z, this.elems = J, this.max_length = L, this.has_stree = P && P.length;
  }
  let H, U, V;
  function K(P, O) {
    this.dyn_tree = P, this.max_code = 0, this.stat_desc = O;
  }
  const F = (P) => P < 256 ? W[P] : W[256 + (P >>> 7)], R = (P, O) => {
    P.pending_buf[P.pending++] = O & 255, P.pending_buf[P.pending++] = O >>> 8 & 255;
  }, ee = (P, O, z) => {
    P.bi_valid > h - z ? (P.bi_buf |= O << P.bi_valid & 65535, R(P, P.bi_buf), P.bi_buf = O >> h - P.bi_valid, P.bi_valid += z - h) : (P.bi_buf |= O << P.bi_valid & 65535, P.bi_valid += z);
  }, Y = (P, O, z) => {
    ee(P, z[O * 2], z[O * 2 + 1]);
  }, Q = (P, O) => {
    let z = 0;
    do
      z |= P & 1, P >>>= 1, z <<= 1;
    while (--O > 0);
    return z >>> 1;
  }, se = (P) => {
    P.bi_valid === 16 ? (R(P, P.bi_buf), P.bi_buf = 0, P.bi_valid = 0) : P.bi_valid >= 8 && (P.pending_buf[P.pending++] = P.bi_buf & 255, P.bi_buf >>= 8, P.bi_valid -= 8);
  }, ge = (P, O) => {
    const z = O.dyn_tree, J = O.max_code, L = O.stat_desc.static_tree, X = O.stat_desc.has_stree, x = O.stat_desc.extra_bits, ie = O.stat_desc.extra_base, me = O.stat_desc.max_length;
    let pe, Ee, be, Pe, de, fe, y = 0;
    for (Pe = 0; Pe <= m; Pe++) P.bl_count[Pe] = 0;
    for (z[P.heap[P.heap_max] * 2 + 1] = 0, pe = P.heap_max + 1; pe < $; pe++) Ee = P.heap[pe], Pe = z[z[Ee * 2 + 1] * 2 + 1] + 1, Pe > me && (Pe = me, y++), z[Ee * 2 + 1] = Pe, !(Ee > J) && (P.bl_count[Pe]++, de = 0, Ee >= ie && (de = x[Ee - ie]), fe = z[Ee * 2], P.opt_len += fe * (Pe + de), X && (P.static_len += fe * (L[Ee * 2 + 1] + de)));
    if (y !== 0) {
      do {
        for (Pe = me - 1; P.bl_count[Pe] === 0; ) Pe--;
        P.bl_count[Pe]--, P.bl_count[Pe + 1] += 2, P.bl_count[me]--, y -= 2;
      } while (y > 0);
      for (Pe = me; Pe !== 0; Pe--) for (Ee = P.bl_count[Pe]; Ee !== 0; ) be = P.heap[--pe], !(be > J) && (z[be * 2 + 1] !== Pe && (P.opt_len += (Pe - z[be * 2 + 1]) * z[be * 2], z[be * 2 + 1] = Pe), Ee--);
    }
  }, ue = (P, O, z) => {
    const J = new Array(m + 1);
    let L = 0, X, x;
    for (X = 1; X <= m; X++) J[X] = L = L + z[X - 1] << 1;
    for (x = 0; x <= O; x++) {
      let ie = P[x * 2 + 1];
      ie !== 0 && (P[x * 2] = Q(J[ie]++, ie));
    }
  }, ce = () => {
    let P, O, z, J, L;
    const X = new Array(m + 1);
    for (z = 0, J = 0; J < o - 1; J++) for (te[J] = z, P = 0; P < 1 << M[J]; P++) G[z++] = J;
    for (G[z - 1] = J, L = 0, J = 0; J < 16; J++) for (oe[J] = L, P = 0; P < 1 << T[J]; P++) W[L++] = J;
    for (L >>= 7; J < _; J++) for (oe[J] = L << 7, P = 0; P < 1 << T[J] - 7; P++) W[256 + L++] = J;
    for (O = 0; O <= m; O++) X[O] = 0;
    for (P = 0; P <= 143; ) E[P * 2 + 1] = 8, P++, X[8]++;
    for (; P <= 255; ) E[P * 2 + 1] = 9, P++, X[9]++;
    for (; P <= 279; ) E[P * 2 + 1] = 7, P++, X[7]++;
    for (; P <= 287; ) E[P * 2 + 1] = 8, P++, X[8]++;
    for (ue(E, u + 1, X), P = 0; P < _; P++) q[P * 2 + 1] = 5, q[P * 2] = Q(P, 5);
    H = new he(E, M, c + 1, u, m), U = new he(q, T, 0, _, m), V = new he(new Array(0), k, 0, S, I);
  }, ye = (P) => {
    let O;
    for (O = 0; O < u; O++) P.dyn_ltree[O * 2] = 0;
    for (O = 0; O < _; O++) P.dyn_dtree[O * 2] = 0;
    for (O = 0; O < S; O++) P.bl_tree[O * 2] = 0;
    P.dyn_ltree[b * 2] = 1, P.opt_len = P.static_len = 0, P.last_lit = P.matches = 0;
  }, v = (P) => {
    P.bi_valid > 8 ? R(P, P.bi_buf) : P.bi_valid > 0 && (P.pending_buf[P.pending++] = P.bi_buf), P.bi_buf = 0, P.bi_valid = 0;
  }, le = (P, O, z, J) => {
    v(P), R(P, z), R(P, ~z), P.pending_buf.set(P.window.subarray(O, O + z), P.pending), P.pending += z;
  }, ve = (P, O, z, J) => {
    const L = O * 2, X = z * 2;
    return P[L] < P[X] || P[L] === P[X] && J[O] <= J[z];
  }, we = (P, O, z) => {
    const J = P.heap[z];
    let L = z << 1;
    for (; L <= P.heap_len && (L < P.heap_len && ve(O, P.heap[L + 1], P.heap[L], P.depth) && L++, !ve(O, J, P.heap[L], P.depth)); ) P.heap[z] = P.heap[L], z = L, L <<= 1;
    P.heap[z] = J;
  }, De = (P, O, z) => {
    let J, L, X = 0, x, ie;
    if (P.last_lit !== 0) do
      J = P.pending_buf[P.d_buf + X * 2] << 8 | P.pending_buf[P.d_buf + X * 2 + 1], L = P.pending_buf[P.l_buf + X], X++, J === 0 ? Y(P, L, O) : (x = G[L], Y(P, x + c + 1, O), ie = M[x], ie !== 0 && (L -= te[x], ee(P, L, ie)), J--, x = F(J), Y(P, x, z), ie = T[x], ie !== 0 && (J -= oe[x], ee(P, J, ie)));
    while (X < P.last_lit);
    Y(P, b, O);
  }, Me = (P, O) => {
    const z = O.dyn_tree, J = O.stat_desc.static_tree, L = O.stat_desc.has_stree, X = O.stat_desc.elems;
    let x, ie, me = -1, pe;
    for (P.heap_len = 0, P.heap_max = $, x = 0; x < X; x++) z[x * 2] !== 0 ? (P.heap[++P.heap_len] = me = x, P.depth[x] = 0) : z[x * 2 + 1] = 0;
    for (; P.heap_len < 2; ) pe = P.heap[++P.heap_len] = me < 2 ? ++me : 0, z[pe * 2] = 1, P.depth[pe] = 0, P.opt_len--, L && (P.static_len -= J[pe * 2 + 1]);
    for (O.max_code = me, x = P.heap_len >> 1; x >= 1; x--) we(P, z, x);
    pe = X;
    do
      x = P.heap[1], P.heap[1] = P.heap[P.heap_len--], we(P, z, 1), ie = P.heap[1], P.heap[--P.heap_max] = x, P.heap[--P.heap_max] = ie, z[pe * 2] = z[x * 2] + z[ie * 2], P.depth[pe] = (P.depth[x] >= P.depth[ie] ? P.depth[x] : P.depth[ie]) + 1, z[x * 2 + 1] = z[ie * 2 + 1] = pe, P.heap[1] = pe++, we(P, z, 1);
    while (P.heap_len >= 2);
    P.heap[--P.heap_max] = P.heap[1], ge(P, O), ue(z, me, P.bl_count);
  }, Ve = (P, O, z) => {
    let J, L = -1, X, x = O[1], ie = 0, me = 7, pe = 4;
    for (x === 0 && (me = 138, pe = 3), O[(z + 1) * 2 + 1] = 65535, J = 0; J <= z; J++) X = x, x = O[(J + 1) * 2 + 1], !(++ie < me && X === x) && (ie < pe ? P.bl_tree[X * 2] += ie : X !== 0 ? (X !== L && P.bl_tree[X * 2]++, P.bl_tree[f * 2]++) : ie <= 10 ? P.bl_tree[p * 2]++ : P.bl_tree[w * 2]++, ie = 0, L = X, x === 0 ? (me = 138, pe = 3) : X === x ? (me = 6, pe = 3) : (me = 7, pe = 4));
  }, ke = (P, O, z) => {
    let J, L = -1, X, x = O[1], ie = 0, me = 7, pe = 4;
    for (x === 0 && (me = 138, pe = 3), J = 0; J <= z; J++) if (X = x, x = O[(J + 1) * 2 + 1], !(++ie < me && X === x)) {
      if (ie < pe) do
        Y(P, X, P.bl_tree);
      while (--ie !== 0);
      else X !== 0 ? (X !== L && (Y(P, X, P.bl_tree), ie--), Y(P, f, P.bl_tree), ee(P, ie - 3, 2)) : ie <= 10 ? (Y(P, p, P.bl_tree), ee(P, ie - 3, 3)) : (Y(P, w, P.bl_tree), ee(P, ie - 11, 7));
      ie = 0, L = X, x === 0 ? (me = 138, pe = 3) : X === x ? (me = 6, pe = 3) : (me = 7, pe = 4);
    }
  }, qe = (P) => {
    let O;
    for (Ve(P, P.dyn_ltree, P.l_desc.max_code), Ve(P, P.dyn_dtree, P.d_desc.max_code), Me(P, P.bl_desc), O = S - 1; O >= 3 && P.bl_tree[B[O] * 2 + 1] === 0; O--) ;
    return P.opt_len += 3 * (O + 1) + 5 + 5 + 4, O;
  }, Ue = (P, O, z, J) => {
    let L;
    for (ee(P, O - 257, 5), ee(P, z - 1, 5), ee(P, J - 4, 4), L = 0; L < J; L++) ee(P, P.bl_tree[B[L] * 2 + 1], 3);
    ke(P, P.dyn_ltree, O - 1), ke(P, P.dyn_dtree, z - 1);
  }, Ce = (P) => {
    let O = 4093624447, z;
    for (z = 0; z <= 31; z++, O >>>= 1) if (O & 1 && P.dyn_ltree[z * 2] !== 0) return d;
    if (P.dyn_ltree[18] !== 0 || P.dyn_ltree[20] !== 0 || P.dyn_ltree[26] !== 0) return g;
    for (z = 32; z < c; z++) if (P.dyn_ltree[z * 2] !== 0) return g;
    return d;
  };
  let Se = false;
  const Ze = (P) => {
    Se || (ce(), Se = true), P.l_desc = new K(P.dyn_ltree, H), P.d_desc = new K(P.dyn_dtree, U), P.bl_desc = new K(P.bl_tree, V), P.bi_buf = 0, P.bi_valid = 0, ye(P);
  }, A = (P, O, z, J) => {
    ee(P, (r << 1) + (J ? 1 : 0), 3), le(P, O, z);
  }, D = (P) => {
    ee(P, e << 1, 3), Y(P, b, E), se(P);
  }, j = (P, O, z, J) => {
    let L, X, x = 0;
    P.level > 0 ? (P.strm.data_type === i && (P.strm.data_type = Ce(P)), Me(P, P.l_desc), Me(P, P.d_desc), x = qe(P), L = P.opt_len + 3 + 7 >>> 3, X = P.static_len + 3 + 7 >>> 3, X <= L && (L = X)) : L = X = z + 5, z + 4 <= L && O !== -1 ? A(P, O, z, J) : P.strategy === t || X === L ? (ee(P, (e << 1) + (J ? 1 : 0), 3), De(P, E, q)) : (ee(P, (s << 1) + (J ? 1 : 0), 3), Ue(P, P.l_desc.max_code + 1, P.d_desc.max_code + 1, x + 1), De(P, P.dyn_ltree, P.dyn_dtree)), ye(P), J && v(P);
  }, Z = (P, O, z) => (P.pending_buf[P.d_buf + P.last_lit * 2] = O >>> 8 & 255, P.pending_buf[P.d_buf + P.last_lit * 2 + 1] = O & 255, P.pending_buf[P.l_buf + P.last_lit] = z & 255, P.last_lit++, O === 0 ? P.dyn_ltree[z * 2]++ : (P.matches++, O--, P.dyn_ltree[(G[z] + c + 1) * 2]++, P.dyn_dtree[F(O) * 2]++), P.last_lit === P.lit_bufsize - 1);
  return nn._tr_init = Ze, nn._tr_stored_block = A, nn._tr_flush_block = j, nn._tr_tally = Z, nn._tr_align = D, nn;
}
var pi, ha;
function Cc() {
  return ha || (ha = 1, pi = (d, g, i, l) => {
    let r = d & 65535 | 0, e = d >>> 16 & 65535 | 0, s = 0;
    for (; i !== 0; ) {
      s = i > 2e3 ? 2e3 : i, i -= s;
      do
        r = r + g[l++] | 0, e = e + r | 0;
      while (--s);
      r %= 65521, e %= 65521;
    }
    return r | e << 16 | 0;
  }), pi;
}
var gi, ma;
function xc() {
  if (ma) return gi;
  ma = 1;
  const t = () => {
    let i, l = [];
    for (var r = 0; r < 256; r++) {
      i = r;
      for (var e = 0; e < 8; e++) i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
      l[r] = i;
    }
    return l;
  }, d = new Uint32Array(t());
  return gi = (i, l, r, e) => {
    const s = d, n = e + r;
    i ^= -1;
    for (let a = e; a < n; a++) i = i >>> 8 ^ s[(i ^ l[a]) & 255];
    return i ^ -1;
  }, gi;
}
var hi, _a;
function Gi() {
  return _a || (_a = 1, hi = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }), hi;
}
var mi, ba;
function bn() {
  return ba || (ba = 1, mi = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }), mi;
}
var va;
function FCe() {
  if (va) return It;
  va = 1;
  const { _tr_init: t, _tr_stored_block: d, _tr_flush_block: g, _tr_tally: i, _tr_align: l } = NCe(), r = Cc(), e = xc(), s = Gi(), { Z_NO_FLUSH: n, Z_PARTIAL_FLUSH: a, Z_FULL_FLUSH: o, Z_FINISH: c, Z_BLOCK: u, Z_OK: _, Z_STREAM_END: S, Z_STREAM_ERROR: $, Z_DATA_ERROR: m, Z_BUF_ERROR: h, Z_DEFAULT_COMPRESSION: I, Z_FILTERED: b, Z_HUFFMAN_ONLY: f, Z_RLE: p, Z_FIXED: w, Z_DEFAULT_STRATEGY: M, Z_UNKNOWN: T, Z_DEFLATED: k } = bn(), B = 9, C = 15, E = 8, G = 256 + 1 + 29, te = 30, oe = 19, he = 2 * G + 1, H = 15, U = 3, V = 258, K = V + U + 1, F = 32, R = 42, ee = 69, Y = 73, Q = 91, se = 103, ge = 113, ue = 666, ce = 1, ye = 2, v = 3, le = 4, ve = 3, we = (y, re) => (y.msg = s[re], re), De = (y) => (y << 1) - (y > 4 ? 9 : 0), Me = (y) => {
    let re = y.length;
    for (; --re >= 0; ) y[re] = 0;
  };
  let ke = (y, re, ne) => (re << y.hash_shift ^ ne) & y.hash_mask;
  const qe = (y) => {
    const re = y.state;
    let ne = re.pending;
    ne > y.avail_out && (ne = y.avail_out), ne !== 0 && (y.output.set(re.pending_buf.subarray(re.pending_out, re.pending_out + ne), y.next_out), y.next_out += ne, re.pending_out += ne, y.total_out += ne, y.avail_out -= ne, re.pending -= ne, re.pending === 0 && (re.pending_out = 0));
  }, Ue = (y, re) => {
    g(y, y.block_start >= 0 ? y.block_start : -1, y.strstart - y.block_start, re), y.block_start = y.strstart, qe(y.strm);
  }, Ce = (y, re) => {
    y.pending_buf[y.pending++] = re;
  }, Se = (y, re) => {
    y.pending_buf[y.pending++] = re >>> 8 & 255, y.pending_buf[y.pending++] = re & 255;
  }, Ze = (y, re, ne, ae) => {
    let N = y.avail_in;
    return N > ae && (N = ae), N === 0 ? 0 : (y.avail_in -= N, re.set(y.input.subarray(y.next_in, y.next_in + N), ne), y.state.wrap === 1 ? y.adler = r(y.adler, re, N, ne) : y.state.wrap === 2 && (y.adler = e(y.adler, re, N, ne)), y.next_in += N, y.total_in += N, N);
  }, A = (y, re) => {
    let ne = y.max_chain_length, ae = y.strstart, N, $e, _e = y.prev_length, Ie = y.nice_match;
    const Fe = y.strstart > y.w_size - K ? y.strstart - (y.w_size - K) : 0, xe = y.window, vn = y.w_mask, yn = y.prev, je = y.strstart + V;
    let rt = xe[ae + _e - 1], We = xe[ae + _e];
    y.prev_length >= y.good_match && (ne >>= 2), Ie > y.lookahead && (Ie = y.lookahead);
    do
      if (N = re, !(xe[N + _e] !== We || xe[N + _e - 1] !== rt || xe[N] !== xe[ae] || xe[++N] !== xe[ae + 1])) {
        ae += 2, N++;
        do
          ;
        while (xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && xe[++ae] === xe[++N] && ae < je);
        if ($e = V - (je - ae), ae = je - V, $e > _e) {
          if (y.match_start = re, _e = $e, $e >= Ie) break;
          rt = xe[ae + _e - 1], We = xe[ae + _e];
        }
      }
    while ((re = yn[re & vn]) > Fe && --ne !== 0);
    return _e <= y.lookahead ? _e : y.lookahead;
  }, D = (y) => {
    const re = y.w_size;
    let ne, ae, N, $e, _e;
    do {
      if ($e = y.window_size - y.lookahead - y.strstart, y.strstart >= re + (re - K)) {
        y.window.set(y.window.subarray(re, re + re), 0), y.match_start -= re, y.strstart -= re, y.block_start -= re, ae = y.hash_size, ne = ae;
        do
          N = y.head[--ne], y.head[ne] = N >= re ? N - re : 0;
        while (--ae);
        ae = re, ne = ae;
        do
          N = y.prev[--ne], y.prev[ne] = N >= re ? N - re : 0;
        while (--ae);
        $e += re;
      }
      if (y.strm.avail_in === 0) break;
      if (ae = Ze(y.strm, y.window, y.strstart + y.lookahead, $e), y.lookahead += ae, y.lookahead + y.insert >= U) for (_e = y.strstart - y.insert, y.ins_h = y.window[_e], y.ins_h = ke(y, y.ins_h, y.window[_e + 1]); y.insert && (y.ins_h = ke(y, y.ins_h, y.window[_e + U - 1]), y.prev[_e & y.w_mask] = y.head[y.ins_h], y.head[y.ins_h] = _e, _e++, y.insert--, !(y.lookahead + y.insert < U)); ) ;
    } while (y.lookahead < K && y.strm.avail_in !== 0);
  }, j = (y, re) => {
    let ne = 65535;
    for (ne > y.pending_buf_size - 5 && (ne = y.pending_buf_size - 5); ; ) {
      if (y.lookahead <= 1) {
        if (D(y), y.lookahead === 0 && re === n) return ce;
        if (y.lookahead === 0) break;
      }
      y.strstart += y.lookahead, y.lookahead = 0;
      const ae = y.block_start + ne;
      if ((y.strstart === 0 || y.strstart >= ae) && (y.lookahead = y.strstart - ae, y.strstart = ae, Ue(y, false), y.strm.avail_out === 0) || y.strstart - y.block_start >= y.w_size - K && (Ue(y, false), y.strm.avail_out === 0)) return ce;
    }
    return y.insert = 0, re === c ? (Ue(y, true), y.strm.avail_out === 0 ? v : le) : (y.strstart > y.block_start && (Ue(y, false), y.strm.avail_out === 0), ce);
  }, Z = (y, re) => {
    let ne, ae;
    for (; ; ) {
      if (y.lookahead < K) {
        if (D(y), y.lookahead < K && re === n) return ce;
        if (y.lookahead === 0) break;
      }
      if (ne = 0, y.lookahead >= U && (y.ins_h = ke(y, y.ins_h, y.window[y.strstart + U - 1]), ne = y.prev[y.strstart & y.w_mask] = y.head[y.ins_h], y.head[y.ins_h] = y.strstart), ne !== 0 && y.strstart - ne <= y.w_size - K && (y.match_length = A(y, ne)), y.match_length >= U) if (ae = i(y, y.strstart - y.match_start, y.match_length - U), y.lookahead -= y.match_length, y.match_length <= y.max_lazy_match && y.lookahead >= U) {
        y.match_length--;
        do
          y.strstart++, y.ins_h = ke(y, y.ins_h, y.window[y.strstart + U - 1]), ne = y.prev[y.strstart & y.w_mask] = y.head[y.ins_h], y.head[y.ins_h] = y.strstart;
        while (--y.match_length !== 0);
        y.strstart++;
      } else y.strstart += y.match_length, y.match_length = 0, y.ins_h = y.window[y.strstart], y.ins_h = ke(y, y.ins_h, y.window[y.strstart + 1]);
      else ae = i(y, 0, y.window[y.strstart]), y.lookahead--, y.strstart++;
      if (ae && (Ue(y, false), y.strm.avail_out === 0)) return ce;
    }
    return y.insert = y.strstart < U - 1 ? y.strstart : U - 1, re === c ? (Ue(y, true), y.strm.avail_out === 0 ? v : le) : y.last_lit && (Ue(y, false), y.strm.avail_out === 0) ? ce : ye;
  }, P = (y, re) => {
    let ne, ae, N;
    for (; ; ) {
      if (y.lookahead < K) {
        if (D(y), y.lookahead < K && re === n) return ce;
        if (y.lookahead === 0) break;
      }
      if (ne = 0, y.lookahead >= U && (y.ins_h = ke(y, y.ins_h, y.window[y.strstart + U - 1]), ne = y.prev[y.strstart & y.w_mask] = y.head[y.ins_h], y.head[y.ins_h] = y.strstart), y.prev_length = y.match_length, y.prev_match = y.match_start, y.match_length = U - 1, ne !== 0 && y.prev_length < y.max_lazy_match && y.strstart - ne <= y.w_size - K && (y.match_length = A(y, ne), y.match_length <= 5 && (y.strategy === b || y.match_length === U && y.strstart - y.match_start > 4096) && (y.match_length = U - 1)), y.prev_length >= U && y.match_length <= y.prev_length) {
        N = y.strstart + y.lookahead - U, ae = i(y, y.strstart - 1 - y.prev_match, y.prev_length - U), y.lookahead -= y.prev_length - 1, y.prev_length -= 2;
        do
          ++y.strstart <= N && (y.ins_h = ke(y, y.ins_h, y.window[y.strstart + U - 1]), ne = y.prev[y.strstart & y.w_mask] = y.head[y.ins_h], y.head[y.ins_h] = y.strstart);
        while (--y.prev_length !== 0);
        if (y.match_available = 0, y.match_length = U - 1, y.strstart++, ae && (Ue(y, false), y.strm.avail_out === 0)) return ce;
      } else if (y.match_available) {
        if (ae = i(y, 0, y.window[y.strstart - 1]), ae && Ue(y, false), y.strstart++, y.lookahead--, y.strm.avail_out === 0) return ce;
      } else y.match_available = 1, y.strstart++, y.lookahead--;
    }
    return y.match_available && (ae = i(y, 0, y.window[y.strstart - 1]), y.match_available = 0), y.insert = y.strstart < U - 1 ? y.strstart : U - 1, re === c ? (Ue(y, true), y.strm.avail_out === 0 ? v : le) : y.last_lit && (Ue(y, false), y.strm.avail_out === 0) ? ce : ye;
  }, O = (y, re) => {
    let ne, ae, N, $e;
    const _e = y.window;
    for (; ; ) {
      if (y.lookahead <= V) {
        if (D(y), y.lookahead <= V && re === n) return ce;
        if (y.lookahead === 0) break;
      }
      if (y.match_length = 0, y.lookahead >= U && y.strstart > 0 && (N = y.strstart - 1, ae = _e[N], ae === _e[++N] && ae === _e[++N] && ae === _e[++N])) {
        $e = y.strstart + V;
        do
          ;
        while (ae === _e[++N] && ae === _e[++N] && ae === _e[++N] && ae === _e[++N] && ae === _e[++N] && ae === _e[++N] && ae === _e[++N] && ae === _e[++N] && N < $e);
        y.match_length = V - ($e - N), y.match_length > y.lookahead && (y.match_length = y.lookahead);
      }
      if (y.match_length >= U ? (ne = i(y, 1, y.match_length - U), y.lookahead -= y.match_length, y.strstart += y.match_length, y.match_length = 0) : (ne = i(y, 0, y.window[y.strstart]), y.lookahead--, y.strstart++), ne && (Ue(y, false), y.strm.avail_out === 0)) return ce;
    }
    return y.insert = 0, re === c ? (Ue(y, true), y.strm.avail_out === 0 ? v : le) : y.last_lit && (Ue(y, false), y.strm.avail_out === 0) ? ce : ye;
  }, z = (y, re) => {
    let ne;
    for (; ; ) {
      if (y.lookahead === 0 && (D(y), y.lookahead === 0)) {
        if (re === n) return ce;
        break;
      }
      if (y.match_length = 0, ne = i(y, 0, y.window[y.strstart]), y.lookahead--, y.strstart++, ne && (Ue(y, false), y.strm.avail_out === 0)) return ce;
    }
    return y.insert = 0, re === c ? (Ue(y, true), y.strm.avail_out === 0 ? v : le) : y.last_lit && (Ue(y, false), y.strm.avail_out === 0) ? ce : ye;
  };
  function J(y, re, ne, ae, N) {
    this.good_length = y, this.max_lazy = re, this.nice_length = ne, this.max_chain = ae, this.func = N;
  }
  const L = [new J(0, 0, 0, 0, j), new J(4, 4, 8, 4, Z), new J(4, 5, 16, 8, Z), new J(4, 6, 32, 32, Z), new J(4, 4, 16, 16, P), new J(8, 16, 32, 32, P), new J(8, 16, 128, 128, P), new J(8, 32, 128, 256, P), new J(32, 128, 258, 1024, P), new J(32, 258, 258, 4096, P)], X = (y) => {
    y.window_size = 2 * y.w_size, Me(y.head), y.max_lazy_match = L[y.level].max_lazy, y.good_match = L[y.level].good_length, y.nice_match = L[y.level].nice_length, y.max_chain_length = L[y.level].max_chain, y.strstart = 0, y.block_start = 0, y.lookahead = 0, y.insert = 0, y.match_length = y.prev_length = U - 1, y.match_available = 0, y.ins_h = 0;
  };
  function x() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = k, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(he * 2), this.dyn_dtree = new Uint16Array((2 * te + 1) * 2), this.bl_tree = new Uint16Array((2 * oe + 1) * 2), Me(this.dyn_ltree), Me(this.dyn_dtree), Me(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(H + 1), this.heap = new Uint16Array(2 * G + 1), Me(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * G + 1), Me(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  const ie = (y) => {
    if (!y || !y.state) return we(y, $);
    y.total_in = y.total_out = 0, y.data_type = T;
    const re = y.state;
    return re.pending = 0, re.pending_out = 0, re.wrap < 0 && (re.wrap = -re.wrap), re.status = re.wrap ? R : ge, y.adler = re.wrap === 2 ? 0 : 1, re.last_flush = n, t(re), _;
  }, me = (y) => {
    const re = ie(y);
    return re === _ && X(y.state), re;
  }, pe = (y, re) => !y || !y.state || y.state.wrap !== 2 ? $ : (y.state.gzhead = re, _), Ee = (y, re, ne, ae, N, $e) => {
    if (!y) return $;
    let _e = 1;
    if (re === I && (re = 6), ae < 0 ? (_e = 0, ae = -ae) : ae > 15 && (_e = 2, ae -= 16), N < 1 || N > B || ne !== k || ae < 8 || ae > 15 || re < 0 || re > 9 || $e < 0 || $e > w) return we(y, $);
    ae === 8 && (ae = 9);
    const Ie = new x();
    return y.state = Ie, Ie.strm = y, Ie.wrap = _e, Ie.gzhead = null, Ie.w_bits = ae, Ie.w_size = 1 << Ie.w_bits, Ie.w_mask = Ie.w_size - 1, Ie.hash_bits = N + 7, Ie.hash_size = 1 << Ie.hash_bits, Ie.hash_mask = Ie.hash_size - 1, Ie.hash_shift = ~~((Ie.hash_bits + U - 1) / U), Ie.window = new Uint8Array(Ie.w_size * 2), Ie.head = new Uint16Array(Ie.hash_size), Ie.prev = new Uint16Array(Ie.w_size), Ie.lit_bufsize = 1 << N + 6, Ie.pending_buf_size = Ie.lit_bufsize * 4, Ie.pending_buf = new Uint8Array(Ie.pending_buf_size), Ie.d_buf = 1 * Ie.lit_bufsize, Ie.l_buf = 3 * Ie.lit_bufsize, Ie.level = re, Ie.strategy = $e, Ie.method = ne, me(y);
  }, be = (y, re) => Ee(y, re, k, C, E, M), Pe = (y, re) => {
    let ne, ae;
    if (!y || !y.state || re > u || re < 0) return y ? we(y, $) : $;
    const N = y.state;
    if (!y.output || !y.input && y.avail_in !== 0 || N.status === ue && re !== c) return we(y, y.avail_out === 0 ? h : $);
    N.strm = y;
    const $e = N.last_flush;
    if (N.last_flush = re, N.status === R) if (N.wrap === 2) y.adler = 0, Ce(N, 31), Ce(N, 139), Ce(N, 8), N.gzhead ? (Ce(N, (N.gzhead.text ? 1 : 0) + (N.gzhead.hcrc ? 2 : 0) + (N.gzhead.extra ? 4 : 0) + (N.gzhead.name ? 8 : 0) + (N.gzhead.comment ? 16 : 0)), Ce(N, N.gzhead.time & 255), Ce(N, N.gzhead.time >> 8 & 255), Ce(N, N.gzhead.time >> 16 & 255), Ce(N, N.gzhead.time >> 24 & 255), Ce(N, N.level === 9 ? 2 : N.strategy >= f || N.level < 2 ? 4 : 0), Ce(N, N.gzhead.os & 255), N.gzhead.extra && N.gzhead.extra.length && (Ce(N, N.gzhead.extra.length & 255), Ce(N, N.gzhead.extra.length >> 8 & 255)), N.gzhead.hcrc && (y.adler = e(y.adler, N.pending_buf, N.pending, 0)), N.gzindex = 0, N.status = ee) : (Ce(N, 0), Ce(N, 0), Ce(N, 0), Ce(N, 0), Ce(N, 0), Ce(N, N.level === 9 ? 2 : N.strategy >= f || N.level < 2 ? 4 : 0), Ce(N, ve), N.status = ge);
    else {
      let _e = k + (N.w_bits - 8 << 4) << 8, Ie = -1;
      N.strategy >= f || N.level < 2 ? Ie = 0 : N.level < 6 ? Ie = 1 : N.level === 6 ? Ie = 2 : Ie = 3, _e |= Ie << 6, N.strstart !== 0 && (_e |= F), _e += 31 - _e % 31, N.status = ge, Se(N, _e), N.strstart !== 0 && (Se(N, y.adler >>> 16), Se(N, y.adler & 65535)), y.adler = 1;
    }
    if (N.status === ee) if (N.gzhead.extra) {
      for (ne = N.pending; N.gzindex < (N.gzhead.extra.length & 65535) && !(N.pending === N.pending_buf_size && (N.gzhead.hcrc && N.pending > ne && (y.adler = e(y.adler, N.pending_buf, N.pending - ne, ne)), qe(y), ne = N.pending, N.pending === N.pending_buf_size)); ) Ce(N, N.gzhead.extra[N.gzindex] & 255), N.gzindex++;
      N.gzhead.hcrc && N.pending > ne && (y.adler = e(y.adler, N.pending_buf, N.pending - ne, ne)), N.gzindex === N.gzhead.extra.length && (N.gzindex = 0, N.status = Y);
    } else N.status = Y;
    if (N.status === Y) if (N.gzhead.name) {
      ne = N.pending;
      do {
        if (N.pending === N.pending_buf_size && (N.gzhead.hcrc && N.pending > ne && (y.adler = e(y.adler, N.pending_buf, N.pending - ne, ne)), qe(y), ne = N.pending, N.pending === N.pending_buf_size)) {
          ae = 1;
          break;
        }
        N.gzindex < N.gzhead.name.length ? ae = N.gzhead.name.charCodeAt(N.gzindex++) & 255 : ae = 0, Ce(N, ae);
      } while (ae !== 0);
      N.gzhead.hcrc && N.pending > ne && (y.adler = e(y.adler, N.pending_buf, N.pending - ne, ne)), ae === 0 && (N.gzindex = 0, N.status = Q);
    } else N.status = Q;
    if (N.status === Q) if (N.gzhead.comment) {
      ne = N.pending;
      do {
        if (N.pending === N.pending_buf_size && (N.gzhead.hcrc && N.pending > ne && (y.adler = e(y.adler, N.pending_buf, N.pending - ne, ne)), qe(y), ne = N.pending, N.pending === N.pending_buf_size)) {
          ae = 1;
          break;
        }
        N.gzindex < N.gzhead.comment.length ? ae = N.gzhead.comment.charCodeAt(N.gzindex++) & 255 : ae = 0, Ce(N, ae);
      } while (ae !== 0);
      N.gzhead.hcrc && N.pending > ne && (y.adler = e(y.adler, N.pending_buf, N.pending - ne, ne)), ae === 0 && (N.status = se);
    } else N.status = se;
    if (N.status === se && (N.gzhead.hcrc ? (N.pending + 2 > N.pending_buf_size && qe(y), N.pending + 2 <= N.pending_buf_size && (Ce(N, y.adler & 255), Ce(N, y.adler >> 8 & 255), y.adler = 0, N.status = ge)) : N.status = ge), N.pending !== 0) {
      if (qe(y), y.avail_out === 0) return N.last_flush = -1, _;
    } else if (y.avail_in === 0 && De(re) <= De($e) && re !== c) return we(y, h);
    if (N.status === ue && y.avail_in !== 0) return we(y, h);
    if (y.avail_in !== 0 || N.lookahead !== 0 || re !== n && N.status !== ue) {
      let _e = N.strategy === f ? z(N, re) : N.strategy === p ? O(N, re) : L[N.level].func(N, re);
      if ((_e === v || _e === le) && (N.status = ue), _e === ce || _e === v) return y.avail_out === 0 && (N.last_flush = -1), _;
      if (_e === ye && (re === a ? l(N) : re !== u && (d(N, 0, 0, false), re === o && (Me(N.head), N.lookahead === 0 && (N.strstart = 0, N.block_start = 0, N.insert = 0))), qe(y), y.avail_out === 0)) return N.last_flush = -1, _;
    }
    return re !== c ? _ : N.wrap <= 0 ? S : (N.wrap === 2 ? (Ce(N, y.adler & 255), Ce(N, y.adler >> 8 & 255), Ce(N, y.adler >> 16 & 255), Ce(N, y.adler >> 24 & 255), Ce(N, y.total_in & 255), Ce(N, y.total_in >> 8 & 255), Ce(N, y.total_in >> 16 & 255), Ce(N, y.total_in >> 24 & 255)) : (Se(N, y.adler >>> 16), Se(N, y.adler & 65535)), qe(y), N.wrap > 0 && (N.wrap = -N.wrap), N.pending !== 0 ? _ : S);
  }, de = (y) => {
    if (!y || !y.state) return $;
    const re = y.state.status;
    return re !== R && re !== ee && re !== Y && re !== Q && re !== se && re !== ge && re !== ue ? we(y, $) : (y.state = null, re === ge ? we(y, m) : _);
  }, fe = (y, re) => {
    let ne = re.length;
    if (!y || !y.state) return $;
    const ae = y.state, N = ae.wrap;
    if (N === 2 || N === 1 && ae.status !== R || ae.lookahead) return $;
    if (N === 1 && (y.adler = r(y.adler, re, ne, 0)), ae.wrap = 0, ne >= ae.w_size) {
      N === 0 && (Me(ae.head), ae.strstart = 0, ae.block_start = 0, ae.insert = 0);
      let Fe = new Uint8Array(ae.w_size);
      Fe.set(re.subarray(ne - ae.w_size, ne), 0), re = Fe, ne = ae.w_size;
    }
    const $e = y.avail_in, _e = y.next_in, Ie = y.input;
    for (y.avail_in = ne, y.next_in = 0, y.input = re, D(ae); ae.lookahead >= U; ) {
      let Fe = ae.strstart, xe = ae.lookahead - (U - 1);
      do
        ae.ins_h = ke(ae, ae.ins_h, ae.window[Fe + U - 1]), ae.prev[Fe & ae.w_mask] = ae.head[ae.ins_h], ae.head[ae.ins_h] = Fe, Fe++;
      while (--xe);
      ae.strstart = Fe, ae.lookahead = U - 1, D(ae);
    }
    return ae.strstart += ae.lookahead, ae.block_start = ae.strstart, ae.insert = ae.lookahead, ae.lookahead = 0, ae.match_length = ae.prev_length = U - 1, ae.match_available = 0, y.next_in = _e, y.input = Ie, y.avail_in = $e, ae.wrap = N, _;
  };
  return It.deflateInit = be, It.deflateInit2 = Ee, It.deflateReset = me, It.deflateResetKeep = ie, It.deflateSetHeader = pe, It.deflate = Pe, It.deflateEnd = de, It.deflateSetDictionary = fe, It.deflateInfo = "pako deflate (from Nodeca project)", It;
}
var Rs = {}, ya;
function Ec() {
  if (ya) return Rs;
  ya = 1;
  const t = (d, g) => Object.prototype.hasOwnProperty.call(d, g);
  return Rs.assign = function(d) {
    const g = Array.prototype.slice.call(arguments, 1);
    for (; g.length; ) {
      const i = g.shift();
      if (i) {
        if (typeof i != "object") throw new TypeError(i + "must be non-object");
        for (const l in i) t(i, l) && (d[l] = i[l]);
      }
    }
    return d;
  }, Rs.flattenChunks = (d) => {
    let g = 0;
    for (let l = 0, r = d.length; l < r; l++) g += d[l].length;
    const i = new Uint8Array(g);
    for (let l = 0, r = 0, e = d.length; l < e; l++) {
      let s = d[l];
      i.set(s, r), r += s.length;
    }
    return i;
  }, Rs;
}
var Zn = {}, wa;
function Mc() {
  if (wa) return Zn;
  wa = 1;
  let t = true;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    t = false;
  }
  const d = new Uint8Array(256);
  for (let i = 0; i < 256; i++) d[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  d[254] = d[254] = 1, Zn.string2buf = (i) => {
    let l, r, e, s, n, a = i.length, o = 0;
    for (s = 0; s < a; s++) r = i.charCodeAt(s), (r & 64512) === 55296 && s + 1 < a && (e = i.charCodeAt(s + 1), (e & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (e - 56320), s++)), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
    for (l = new Uint8Array(o), n = 0, s = 0; n < o; s++) r = i.charCodeAt(s), (r & 64512) === 55296 && s + 1 < a && (e = i.charCodeAt(s + 1), (e & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (e - 56320), s++)), r < 128 ? l[n++] = r : r < 2048 ? (l[n++] = 192 | r >>> 6, l[n++] = 128 | r & 63) : r < 65536 ? (l[n++] = 224 | r >>> 12, l[n++] = 128 | r >>> 6 & 63, l[n++] = 128 | r & 63) : (l[n++] = 240 | r >>> 18, l[n++] = 128 | r >>> 12 & 63, l[n++] = 128 | r >>> 6 & 63, l[n++] = 128 | r & 63);
    return l;
  };
  const g = (i, l) => {
    if (l < 65534 && i.subarray && t) return String.fromCharCode.apply(null, i.length === l ? i : i.subarray(0, l));
    let r = "";
    for (let e = 0; e < l; e++) r += String.fromCharCode(i[e]);
    return r;
  };
  return Zn.buf2string = (i, l) => {
    let r, e;
    const s = l || i.length, n = new Array(s * 2);
    for (e = 0, r = 0; r < s; ) {
      let a = i[r++];
      if (a < 128) {
        n[e++] = a;
        continue;
      }
      let o = d[a];
      if (o > 4) {
        n[e++] = 65533, r += o - 1;
        continue;
      }
      for (a &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < s; ) a = a << 6 | i[r++] & 63, o--;
      if (o > 1) {
        n[e++] = 65533;
        continue;
      }
      a < 65536 ? n[e++] = a : (a -= 65536, n[e++] = 55296 | a >> 10 & 1023, n[e++] = 56320 | a & 1023);
    }
    return g(n, e);
  }, Zn.utf8border = (i, l) => {
    l = l || i.length, l > i.length && (l = i.length);
    let r = l - 1;
    for (; r >= 0 && (i[r] & 192) === 128; ) r--;
    return r < 0 || r === 0 ? l : r + d[i[r]] > l ? r : l;
  }, Zn;
}
var _i, Sa;
function $c() {
  if (Sa) return _i;
  Sa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return _i = t, _i;
}
var Ia;
function jCe() {
  if (Ia) return tn;
  Ia = 1;
  const t = FCe(), d = Ec(), g = Mc(), i = Gi(), l = $c(), r = Object.prototype.toString, { Z_NO_FLUSH: e, Z_SYNC_FLUSH: s, Z_FULL_FLUSH: n, Z_FINISH: a, Z_OK: o, Z_STREAM_END: c, Z_DEFAULT_COMPRESSION: u, Z_DEFAULT_STRATEGY: _, Z_DEFLATED: S } = bn();
  function $(b) {
    this.options = d.assign({ level: u, method: S, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: _ }, b || {});
    let f = this.options;
    f.raw && f.windowBits > 0 ? f.windowBits = -f.windowBits : f.gzip && f.windowBits > 0 && f.windowBits < 16 && (f.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new l(), this.strm.avail_out = 0;
    let p = t.deflateInit2(this.strm, f.level, f.method, f.windowBits, f.memLevel, f.strategy);
    if (p !== o) throw new Error(i[p]);
    if (f.header && t.deflateSetHeader(this.strm, f.header), f.dictionary) {
      let w;
      if (typeof f.dictionary == "string" ? w = g.string2buf(f.dictionary) : r.call(f.dictionary) === "[object ArrayBuffer]" ? w = new Uint8Array(f.dictionary) : w = f.dictionary, p = t.deflateSetDictionary(this.strm, w), p !== o) throw new Error(i[p]);
      this._dict_set = true;
    }
  }
  $.prototype.push = function(b, f) {
    const p = this.strm, w = this.options.chunkSize;
    let M, T;
    if (this.ended) return false;
    for (f === ~~f ? T = f : T = f === true ? a : e, typeof b == "string" ? p.input = g.string2buf(b) : r.call(b) === "[object ArrayBuffer]" ? p.input = new Uint8Array(b) : p.input = b, p.next_in = 0, p.avail_in = p.input.length; ; ) {
      if (p.avail_out === 0 && (p.output = new Uint8Array(w), p.next_out = 0, p.avail_out = w), (T === s || T === n) && p.avail_out <= 6) {
        this.onData(p.output.subarray(0, p.next_out)), p.avail_out = 0;
        continue;
      }
      if (M = t.deflate(p, T), M === c) return p.next_out > 0 && this.onData(p.output.subarray(0, p.next_out)), M = t.deflateEnd(this.strm), this.onEnd(M), this.ended = true, M === o;
      if (p.avail_out === 0) {
        this.onData(p.output);
        continue;
      }
      if (T > 0 && p.next_out > 0) {
        this.onData(p.output.subarray(0, p.next_out)), p.avail_out = 0;
        continue;
      }
      if (p.avail_in === 0) break;
    }
    return true;
  }, $.prototype.onData = function(b) {
    this.chunks.push(b);
  }, $.prototype.onEnd = function(b) {
    b === o && (this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = b, this.msg = this.strm.msg;
  };
  function m(b, f) {
    const p = new $(f);
    if (p.push(b, true), p.err) throw p.msg || i[p.err];
    return p.result;
  }
  function h(b, f) {
    return f = f || {}, f.raw = true, m(b, f);
  }
  function I(b, f) {
    return f = f || {}, f.gzip = true, m(b, f);
  }
  return tn.Deflate = $, tn.deflate = m, tn.deflateRaw = h, tn.gzip = I, tn.constants = bn(), tn;
}
var sn = {}, _t = {}, bi, Pa;
function GCe() {
  if (Pa) return bi;
  Pa = 1;
  const t = 30, d = 12;
  return bi = function(i, l) {
    let r, e, s, n, a, o, c, u, _, S, $, m, h, I, b, f, p, w, M, T, k, B, C, E;
    const q = i.state;
    r = i.next_in, C = i.input, e = r + (i.avail_in - 5), s = i.next_out, E = i.output, n = s - (l - i.avail_out), a = s + (i.avail_out - 257), o = q.dmax, c = q.wsize, u = q.whave, _ = q.wnext, S = q.window, $ = q.hold, m = q.bits, h = q.lencode, I = q.distcode, b = (1 << q.lenbits) - 1, f = (1 << q.distbits) - 1;
    e: do {
      m < 15 && ($ += C[r++] << m, m += 8, $ += C[r++] << m, m += 8), p = h[$ & b];
      t: for (; ; ) {
        if (w = p >>> 24, $ >>>= w, m -= w, w = p >>> 16 & 255, w === 0) E[s++] = p & 65535;
        else if (w & 16) {
          M = p & 65535, w &= 15, w && (m < w && ($ += C[r++] << m, m += 8), M += $ & (1 << w) - 1, $ >>>= w, m -= w), m < 15 && ($ += C[r++] << m, m += 8, $ += C[r++] << m, m += 8), p = I[$ & f];
          n: for (; ; ) {
            if (w = p >>> 24, $ >>>= w, m -= w, w = p >>> 16 & 255, w & 16) {
              if (T = p & 65535, w &= 15, m < w && ($ += C[r++] << m, m += 8, m < w && ($ += C[r++] << m, m += 8)), T += $ & (1 << w) - 1, T > o) {
                i.msg = "invalid distance too far back", q.mode = t;
                break e;
              }
              if ($ >>>= w, m -= w, w = s - n, T > w) {
                if (w = T - w, w > u && q.sane) {
                  i.msg = "invalid distance too far back", q.mode = t;
                  break e;
                }
                if (k = 0, B = S, _ === 0) {
                  if (k += c - w, w < M) {
                    M -= w;
                    do
                      E[s++] = S[k++];
                    while (--w);
                    k = s - T, B = E;
                  }
                } else if (_ < w) {
                  if (k += c + _ - w, w -= _, w < M) {
                    M -= w;
                    do
                      E[s++] = S[k++];
                    while (--w);
                    if (k = 0, _ < M) {
                      w = _, M -= w;
                      do
                        E[s++] = S[k++];
                      while (--w);
                      k = s - T, B = E;
                    }
                  }
                } else if (k += _ - w, w < M) {
                  M -= w;
                  do
                    E[s++] = S[k++];
                  while (--w);
                  k = s - T, B = E;
                }
                for (; M > 2; ) E[s++] = B[k++], E[s++] = B[k++], E[s++] = B[k++], M -= 3;
                M && (E[s++] = B[k++], M > 1 && (E[s++] = B[k++]));
              } else {
                k = s - T;
                do
                  E[s++] = E[k++], E[s++] = E[k++], E[s++] = E[k++], M -= 3;
                while (M > 2);
                M && (E[s++] = E[k++], M > 1 && (E[s++] = E[k++]));
              }
            } else if ((w & 64) === 0) {
              p = I[(p & 65535) + ($ & (1 << w) - 1)];
              continue n;
            } else {
              i.msg = "invalid distance code", q.mode = t;
              break e;
            }
            break;
          }
        } else if ((w & 64) === 0) {
          p = h[(p & 65535) + ($ & (1 << w) - 1)];
          continue t;
        } else if (w & 32) {
          q.mode = d;
          break e;
        } else {
          i.msg = "invalid literal/length code", q.mode = t;
          break e;
        }
        break;
      }
    } while (r < e && s < a);
    M = m >> 3, r -= M, m -= M << 3, $ &= (1 << m) - 1, i.next_in = r, i.next_out = s, i.avail_in = r < e ? 5 + (e - r) : 5 - (r - e), i.avail_out = s < a ? 257 + (a - s) : 257 - (s - a), q.hold = $, q.bits = m;
  }, bi;
}
var vi, Aa;
function HCe() {
  if (Aa) return vi;
  Aa = 1;
  const t = 15, d = 852, g = 592, i = 0, l = 1, r = 2, e = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]), s = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]), n = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]), a = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
  return vi = (c, u, _, S, $, m, h, I) => {
    const b = I.bits;
    let f = 0, p = 0, w = 0, M = 0, T = 0, k = 0, B = 0, C = 0, E = 0, q = 0, W, G, te, oe, he, H = null, U = 0, V;
    const K = new Uint16Array(t + 1), F = new Uint16Array(t + 1);
    let R = null, ee = 0, Y, Q, se;
    for (f = 0; f <= t; f++) K[f] = 0;
    for (p = 0; p < S; p++) K[u[_ + p]]++;
    for (T = b, M = t; M >= 1 && K[M] === 0; M--) ;
    if (T > M && (T = M), M === 0) return $[m++] = 1 << 24 | 64 << 16 | 0, $[m++] = 1 << 24 | 64 << 16 | 0, I.bits = 1, 0;
    for (w = 1; w < M && K[w] === 0; w++) ;
    for (T < w && (T = w), C = 1, f = 1; f <= t; f++) if (C <<= 1, C -= K[f], C < 0) return -1;
    if (C > 0 && (c === i || M !== 1)) return -1;
    for (F[1] = 0, f = 1; f < t; f++) F[f + 1] = F[f] + K[f];
    for (p = 0; p < S; p++) u[_ + p] !== 0 && (h[F[u[_ + p]]++] = p);
    if (c === i ? (H = R = h, V = 19) : c === l ? (H = e, U -= 257, R = s, ee -= 257, V = 256) : (H = n, R = a, V = -1), q = 0, p = 0, f = w, he = m, k = T, B = 0, te = -1, E = 1 << T, oe = E - 1, c === l && E > d || c === r && E > g) return 1;
    for (; ; ) {
      Y = f - B, h[p] < V ? (Q = 0, se = h[p]) : h[p] > V ? (Q = R[ee + h[p]], se = H[U + h[p]]) : (Q = 96, se = 0), W = 1 << f - B, G = 1 << k, w = G;
      do
        G -= W, $[he + (q >> B) + G] = Y << 24 | Q << 16 | se | 0;
      while (G !== 0);
      for (W = 1 << f - 1; q & W; ) W >>= 1;
      if (W !== 0 ? (q &= W - 1, q += W) : q = 0, p++, --K[f] === 0) {
        if (f === M) break;
        f = u[_ + h[p]];
      }
      if (f > T && (q & oe) !== te) {
        for (B === 0 && (B = T), he += w, k = f - B, C = 1 << k; k + B < M && (C -= K[k + B], !(C <= 0)); ) k++, C <<= 1;
        if (E += 1 << k, c === l && E > d || c === r && E > g) return 1;
        te = q & oe, $[te] = T << 24 | k << 16 | he - m | 0;
      }
    }
    return q !== 0 && ($[he + q] = f - B << 24 | 64 << 16 | 0), I.bits = T, 0;
  }, vi;
}
var Ca;
function zCe() {
  if (Ca) return _t;
  Ca = 1;
  const t = Cc(), d = xc(), g = GCe(), i = HCe(), l = 0, r = 1, e = 2, { Z_FINISH: s, Z_BLOCK: n, Z_TREES: a, Z_OK: o, Z_STREAM_END: c, Z_NEED_DICT: u, Z_STREAM_ERROR: _, Z_DATA_ERROR: S, Z_MEM_ERROR: $, Z_BUF_ERROR: m, Z_DEFLATED: h } = bn(), I = 1, b = 2, f = 3, p = 4, w = 5, M = 6, T = 7, k = 8, B = 9, C = 10, E = 11, q = 12, W = 13, G = 14, te = 15, oe = 16, he = 17, H = 18, U = 19, V = 20, K = 21, F = 22, R = 23, ee = 24, Y = 25, Q = 26, se = 27, ge = 28, ue = 29, ce = 30, ye = 31, v = 32, le = 852, ve = 592, De = 15, Me = (L) => (L >>> 24 & 255) + (L >>> 8 & 65280) + ((L & 65280) << 8) + ((L & 255) << 24);
  function Ve() {
    this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  const ke = (L) => {
    if (!L || !L.state) return _;
    const X = L.state;
    return L.total_in = L.total_out = X.total = 0, L.msg = "", X.wrap && (L.adler = X.wrap & 1), X.mode = I, X.last = 0, X.havedict = 0, X.dmax = 32768, X.head = null, X.hold = 0, X.bits = 0, X.lencode = X.lendyn = new Int32Array(le), X.distcode = X.distdyn = new Int32Array(ve), X.sane = 1, X.back = -1, o;
  }, qe = (L) => {
    if (!L || !L.state) return _;
    const X = L.state;
    return X.wsize = 0, X.whave = 0, X.wnext = 0, ke(L);
  }, Ue = (L, X) => {
    let x;
    if (!L || !L.state) return _;
    const ie = L.state;
    return X < 0 ? (x = 0, X = -X) : (x = (X >> 4) + 1, X < 48 && (X &= 15)), X && (X < 8 || X > 15) ? _ : (ie.window !== null && ie.wbits !== X && (ie.window = null), ie.wrap = x, ie.wbits = X, qe(L));
  }, Ce = (L, X) => {
    if (!L) return _;
    const x = new Ve();
    L.state = x, x.window = null;
    const ie = Ue(L, X);
    return ie !== o && (L.state = null), ie;
  }, Se = (L) => Ce(L, De);
  let Ze = true, A, D;
  const j = (L) => {
    if (Ze) {
      A = new Int32Array(512), D = new Int32Array(32);
      let X = 0;
      for (; X < 144; ) L.lens[X++] = 8;
      for (; X < 256; ) L.lens[X++] = 9;
      for (; X < 280; ) L.lens[X++] = 7;
      for (; X < 288; ) L.lens[X++] = 8;
      for (i(r, L.lens, 0, 288, A, 0, L.work, { bits: 9 }), X = 0; X < 32; ) L.lens[X++] = 5;
      i(e, L.lens, 0, 32, D, 0, L.work, { bits: 5 }), Ze = false;
    }
    L.lencode = A, L.lenbits = 9, L.distcode = D, L.distbits = 5;
  }, Z = (L, X, x, ie) => {
    let me;
    const pe = L.state;
    return pe.window === null && (pe.wsize = 1 << pe.wbits, pe.wnext = 0, pe.whave = 0, pe.window = new Uint8Array(pe.wsize)), ie >= pe.wsize ? (pe.window.set(X.subarray(x - pe.wsize, x), 0), pe.wnext = 0, pe.whave = pe.wsize) : (me = pe.wsize - pe.wnext, me > ie && (me = ie), pe.window.set(X.subarray(x - ie, x - ie + me), pe.wnext), ie -= me, ie ? (pe.window.set(X.subarray(x - ie, x), 0), pe.wnext = ie, pe.whave = pe.wsize) : (pe.wnext += me, pe.wnext === pe.wsize && (pe.wnext = 0), pe.whave < pe.wsize && (pe.whave += me))), 0;
  }, P = (L, X) => {
    let x, ie, me, pe, Ee, be, Pe, de, fe, y, re, ne, ae, N, $e = 0, _e, Ie, Fe, xe, vn, yn, je, rt;
    const We = new Uint8Array(4);
    let Dt, Mt;
    const Qi = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    if (!L || !L.state || !L.output || !L.input && L.avail_in !== 0) return _;
    x = L.state, x.mode === q && (x.mode = W), Ee = L.next_out, me = L.output, Pe = L.avail_out, pe = L.next_in, ie = L.input, be = L.avail_in, de = x.hold, fe = x.bits, y = be, re = Pe, rt = o;
    e: for (; ; ) switch (x.mode) {
      case I:
        if (x.wrap === 0) {
          x.mode = W;
          break;
        }
        for (; fe < 16; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        if (x.wrap & 2 && de === 35615) {
          x.check = 0, We[0] = de & 255, We[1] = de >>> 8 & 255, x.check = d(x.check, We, 2, 0), de = 0, fe = 0, x.mode = b;
          break;
        }
        if (x.flags = 0, x.head && (x.head.done = false), !(x.wrap & 1) || (((de & 255) << 8) + (de >> 8)) % 31) {
          L.msg = "incorrect header check", x.mode = ce;
          break;
        }
        if ((de & 15) !== h) {
          L.msg = "unknown compression method", x.mode = ce;
          break;
        }
        if (de >>>= 4, fe -= 4, je = (de & 15) + 8, x.wbits === 0) x.wbits = je;
        else if (je > x.wbits) {
          L.msg = "invalid window size", x.mode = ce;
          break;
        }
        x.dmax = 1 << x.wbits, L.adler = x.check = 1, x.mode = de & 512 ? C : q, de = 0, fe = 0;
        break;
      case b:
        for (; fe < 16; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        if (x.flags = de, (x.flags & 255) !== h) {
          L.msg = "unknown compression method", x.mode = ce;
          break;
        }
        if (x.flags & 57344) {
          L.msg = "unknown header flags set", x.mode = ce;
          break;
        }
        x.head && (x.head.text = de >> 8 & 1), x.flags & 512 && (We[0] = de & 255, We[1] = de >>> 8 & 255, x.check = d(x.check, We, 2, 0)), de = 0, fe = 0, x.mode = f;
      case f:
        for (; fe < 32; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        x.head && (x.head.time = de), x.flags & 512 && (We[0] = de & 255, We[1] = de >>> 8 & 255, We[2] = de >>> 16 & 255, We[3] = de >>> 24 & 255, x.check = d(x.check, We, 4, 0)), de = 0, fe = 0, x.mode = p;
      case p:
        for (; fe < 16; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        x.head && (x.head.xflags = de & 255, x.head.os = de >> 8), x.flags & 512 && (We[0] = de & 255, We[1] = de >>> 8 & 255, x.check = d(x.check, We, 2, 0)), de = 0, fe = 0, x.mode = w;
      case w:
        if (x.flags & 1024) {
          for (; fe < 16; ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          x.length = de, x.head && (x.head.extra_len = de), x.flags & 512 && (We[0] = de & 255, We[1] = de >>> 8 & 255, x.check = d(x.check, We, 2, 0)), de = 0, fe = 0;
        } else x.head && (x.head.extra = null);
        x.mode = M;
      case M:
        if (x.flags & 1024 && (ne = x.length, ne > be && (ne = be), ne && (x.head && (je = x.head.extra_len - x.length, x.head.extra || (x.head.extra = new Uint8Array(x.head.extra_len)), x.head.extra.set(ie.subarray(pe, pe + ne), je)), x.flags & 512 && (x.check = d(x.check, ie, ne, pe)), be -= ne, pe += ne, x.length -= ne), x.length)) break e;
        x.length = 0, x.mode = T;
      case T:
        if (x.flags & 2048) {
          if (be === 0) break e;
          ne = 0;
          do
            je = ie[pe + ne++], x.head && je && x.length < 65536 && (x.head.name += String.fromCharCode(je));
          while (je && ne < be);
          if (x.flags & 512 && (x.check = d(x.check, ie, ne, pe)), be -= ne, pe += ne, je) break e;
        } else x.head && (x.head.name = null);
        x.length = 0, x.mode = k;
      case k:
        if (x.flags & 4096) {
          if (be === 0) break e;
          ne = 0;
          do
            je = ie[pe + ne++], x.head && je && x.length < 65536 && (x.head.comment += String.fromCharCode(je));
          while (je && ne < be);
          if (x.flags & 512 && (x.check = d(x.check, ie, ne, pe)), be -= ne, pe += ne, je) break e;
        } else x.head && (x.head.comment = null);
        x.mode = B;
      case B:
        if (x.flags & 512) {
          for (; fe < 16; ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          if (de !== (x.check & 65535)) {
            L.msg = "header crc mismatch", x.mode = ce;
            break;
          }
          de = 0, fe = 0;
        }
        x.head && (x.head.hcrc = x.flags >> 9 & 1, x.head.done = true), L.adler = x.check = 0, x.mode = q;
        break;
      case C:
        for (; fe < 32; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        L.adler = x.check = Me(de), de = 0, fe = 0, x.mode = E;
      case E:
        if (x.havedict === 0) return L.next_out = Ee, L.avail_out = Pe, L.next_in = pe, L.avail_in = be, x.hold = de, x.bits = fe, u;
        L.adler = x.check = 1, x.mode = q;
      case q:
        if (X === n || X === a) break e;
      case W:
        if (x.last) {
          de >>>= fe & 7, fe -= fe & 7, x.mode = se;
          break;
        }
        for (; fe < 3; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        switch (x.last = de & 1, de >>>= 1, fe -= 1, de & 3) {
          case 0:
            x.mode = G;
            break;
          case 1:
            if (j(x), x.mode = V, X === a) {
              de >>>= 2, fe -= 2;
              break e;
            }
            break;
          case 2:
            x.mode = he;
            break;
          case 3:
            L.msg = "invalid block type", x.mode = ce;
        }
        de >>>= 2, fe -= 2;
        break;
      case G:
        for (de >>>= fe & 7, fe -= fe & 7; fe < 32; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        if ((de & 65535) !== (de >>> 16 ^ 65535)) {
          L.msg = "invalid stored block lengths", x.mode = ce;
          break;
        }
        if (x.length = de & 65535, de = 0, fe = 0, x.mode = te, X === a) break e;
      case te:
        x.mode = oe;
      case oe:
        if (ne = x.length, ne) {
          if (ne > be && (ne = be), ne > Pe && (ne = Pe), ne === 0) break e;
          me.set(ie.subarray(pe, pe + ne), Ee), be -= ne, pe += ne, Pe -= ne, Ee += ne, x.length -= ne;
          break;
        }
        x.mode = q;
        break;
      case he:
        for (; fe < 14; ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        if (x.nlen = (de & 31) + 257, de >>>= 5, fe -= 5, x.ndist = (de & 31) + 1, de >>>= 5, fe -= 5, x.ncode = (de & 15) + 4, de >>>= 4, fe -= 4, x.nlen > 286 || x.ndist > 30) {
          L.msg = "too many length or distance symbols", x.mode = ce;
          break;
        }
        x.have = 0, x.mode = H;
      case H:
        for (; x.have < x.ncode; ) {
          for (; fe < 3; ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          x.lens[Qi[x.have++]] = de & 7, de >>>= 3, fe -= 3;
        }
        for (; x.have < 19; ) x.lens[Qi[x.have++]] = 0;
        if (x.lencode = x.lendyn, x.lenbits = 7, Dt = { bits: x.lenbits }, rt = i(l, x.lens, 0, 19, x.lencode, 0, x.work, Dt), x.lenbits = Dt.bits, rt) {
          L.msg = "invalid code lengths set", x.mode = ce;
          break;
        }
        x.have = 0, x.mode = U;
      case U:
        for (; x.have < x.nlen + x.ndist; ) {
          for (; $e = x.lencode[de & (1 << x.lenbits) - 1], _e = $e >>> 24, Ie = $e >>> 16 & 255, Fe = $e & 65535, !(_e <= fe); ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          if (Fe < 16) de >>>= _e, fe -= _e, x.lens[x.have++] = Fe;
          else {
            if (Fe === 16) {
              for (Mt = _e + 2; fe < Mt; ) {
                if (be === 0) break e;
                be--, de += ie[pe++] << fe, fe += 8;
              }
              if (de >>>= _e, fe -= _e, x.have === 0) {
                L.msg = "invalid bit length repeat", x.mode = ce;
                break;
              }
              je = x.lens[x.have - 1], ne = 3 + (de & 3), de >>>= 2, fe -= 2;
            } else if (Fe === 17) {
              for (Mt = _e + 3; fe < Mt; ) {
                if (be === 0) break e;
                be--, de += ie[pe++] << fe, fe += 8;
              }
              de >>>= _e, fe -= _e, je = 0, ne = 3 + (de & 7), de >>>= 3, fe -= 3;
            } else {
              for (Mt = _e + 7; fe < Mt; ) {
                if (be === 0) break e;
                be--, de += ie[pe++] << fe, fe += 8;
              }
              de >>>= _e, fe -= _e, je = 0, ne = 11 + (de & 127), de >>>= 7, fe -= 7;
            }
            if (x.have + ne > x.nlen + x.ndist) {
              L.msg = "invalid bit length repeat", x.mode = ce;
              break;
            }
            for (; ne--; ) x.lens[x.have++] = je;
          }
        }
        if (x.mode === ce) break;
        if (x.lens[256] === 0) {
          L.msg = "invalid code -- missing end-of-block", x.mode = ce;
          break;
        }
        if (x.lenbits = 9, Dt = { bits: x.lenbits }, rt = i(r, x.lens, 0, x.nlen, x.lencode, 0, x.work, Dt), x.lenbits = Dt.bits, rt) {
          L.msg = "invalid literal/lengths set", x.mode = ce;
          break;
        }
        if (x.distbits = 6, x.distcode = x.distdyn, Dt = { bits: x.distbits }, rt = i(e, x.lens, x.nlen, x.ndist, x.distcode, 0, x.work, Dt), x.distbits = Dt.bits, rt) {
          L.msg = "invalid distances set", x.mode = ce;
          break;
        }
        if (x.mode = V, X === a) break e;
      case V:
        x.mode = K;
      case K:
        if (be >= 6 && Pe >= 258) {
          L.next_out = Ee, L.avail_out = Pe, L.next_in = pe, L.avail_in = be, x.hold = de, x.bits = fe, g(L, re), Ee = L.next_out, me = L.output, Pe = L.avail_out, pe = L.next_in, ie = L.input, be = L.avail_in, de = x.hold, fe = x.bits, x.mode === q && (x.back = -1);
          break;
        }
        for (x.back = 0; $e = x.lencode[de & (1 << x.lenbits) - 1], _e = $e >>> 24, Ie = $e >>> 16 & 255, Fe = $e & 65535, !(_e <= fe); ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        if (Ie && (Ie & 240) === 0) {
          for (xe = _e, vn = Ie, yn = Fe; $e = x.lencode[yn + ((de & (1 << xe + vn) - 1) >> xe)], _e = $e >>> 24, Ie = $e >>> 16 & 255, Fe = $e & 65535, !(xe + _e <= fe); ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          de >>>= xe, fe -= xe, x.back += xe;
        }
        if (de >>>= _e, fe -= _e, x.back += _e, x.length = Fe, Ie === 0) {
          x.mode = Q;
          break;
        }
        if (Ie & 32) {
          x.back = -1, x.mode = q;
          break;
        }
        if (Ie & 64) {
          L.msg = "invalid literal/length code", x.mode = ce;
          break;
        }
        x.extra = Ie & 15, x.mode = F;
      case F:
        if (x.extra) {
          for (Mt = x.extra; fe < Mt; ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          x.length += de & (1 << x.extra) - 1, de >>>= x.extra, fe -= x.extra, x.back += x.extra;
        }
        x.was = x.length, x.mode = R;
      case R:
        for (; $e = x.distcode[de & (1 << x.distbits) - 1], _e = $e >>> 24, Ie = $e >>> 16 & 255, Fe = $e & 65535, !(_e <= fe); ) {
          if (be === 0) break e;
          be--, de += ie[pe++] << fe, fe += 8;
        }
        if ((Ie & 240) === 0) {
          for (xe = _e, vn = Ie, yn = Fe; $e = x.distcode[yn + ((de & (1 << xe + vn) - 1) >> xe)], _e = $e >>> 24, Ie = $e >>> 16 & 255, Fe = $e & 65535, !(xe + _e <= fe); ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          de >>>= xe, fe -= xe, x.back += xe;
        }
        if (de >>>= _e, fe -= _e, x.back += _e, Ie & 64) {
          L.msg = "invalid distance code", x.mode = ce;
          break;
        }
        x.offset = Fe, x.extra = Ie & 15, x.mode = ee;
      case ee:
        if (x.extra) {
          for (Mt = x.extra; fe < Mt; ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          x.offset += de & (1 << x.extra) - 1, de >>>= x.extra, fe -= x.extra, x.back += x.extra;
        }
        if (x.offset > x.dmax) {
          L.msg = "invalid distance too far back", x.mode = ce;
          break;
        }
        x.mode = Y;
      case Y:
        if (Pe === 0) break e;
        if (ne = re - Pe, x.offset > ne) {
          if (ne = x.offset - ne, ne > x.whave && x.sane) {
            L.msg = "invalid distance too far back", x.mode = ce;
            break;
          }
          ne > x.wnext ? (ne -= x.wnext, ae = x.wsize - ne) : ae = x.wnext - ne, ne > x.length && (ne = x.length), N = x.window;
        } else N = me, ae = Ee - x.offset, ne = x.length;
        ne > Pe && (ne = Pe), Pe -= ne, x.length -= ne;
        do
          me[Ee++] = N[ae++];
        while (--ne);
        x.length === 0 && (x.mode = K);
        break;
      case Q:
        if (Pe === 0) break e;
        me[Ee++] = x.length, Pe--, x.mode = K;
        break;
      case se:
        if (x.wrap) {
          for (; fe < 32; ) {
            if (be === 0) break e;
            be--, de |= ie[pe++] << fe, fe += 8;
          }
          if (re -= Pe, L.total_out += re, x.total += re, re && (L.adler = x.check = x.flags ? d(x.check, me, re, Ee - re) : t(x.check, me, re, Ee - re)), re = Pe, (x.flags ? de : Me(de)) !== x.check) {
            L.msg = "incorrect data check", x.mode = ce;
            break;
          }
          de = 0, fe = 0;
        }
        x.mode = ge;
      case ge:
        if (x.wrap && x.flags) {
          for (; fe < 32; ) {
            if (be === 0) break e;
            be--, de += ie[pe++] << fe, fe += 8;
          }
          if (de !== (x.total & 4294967295)) {
            L.msg = "incorrect length check", x.mode = ce;
            break;
          }
          de = 0, fe = 0;
        }
        x.mode = ue;
      case ue:
        rt = c;
        break e;
      case ce:
        rt = S;
        break e;
      case ye:
        return $;
      case v:
      default:
        return _;
    }
    return L.next_out = Ee, L.avail_out = Pe, L.next_in = pe, L.avail_in = be, x.hold = de, x.bits = fe, (x.wsize || re !== L.avail_out && x.mode < ce && (x.mode < se || X !== s)) && Z(L, L.output, L.next_out, re - L.avail_out), y -= L.avail_in, re -= L.avail_out, L.total_in += y, L.total_out += re, x.total += re, x.wrap && re && (L.adler = x.check = x.flags ? d(x.check, me, re, L.next_out - re) : t(x.check, me, re, L.next_out - re)), L.data_type = x.bits + (x.last ? 64 : 0) + (x.mode === q ? 128 : 0) + (x.mode === V || x.mode === te ? 256 : 0), (y === 0 && re === 0 || X === s) && rt === o && (rt = m), rt;
  }, O = (L) => {
    if (!L || !L.state) return _;
    let X = L.state;
    return X.window && (X.window = null), L.state = null, o;
  }, z = (L, X) => {
    if (!L || !L.state) return _;
    const x = L.state;
    return (x.wrap & 2) === 0 ? _ : (x.head = X, X.done = false, o);
  }, J = (L, X) => {
    const x = X.length;
    let ie, me, pe;
    return !L || !L.state || (ie = L.state, ie.wrap !== 0 && ie.mode !== E) ? _ : ie.mode === E && (me = 1, me = t(me, X, x, 0), me !== ie.check) ? S : (pe = Z(L, X, x, x), pe ? (ie.mode = ye, $) : (ie.havedict = 1, o));
  };
  return _t.inflateReset = qe, _t.inflateReset2 = Ue, _t.inflateResetKeep = ke, _t.inflateInit = Se, _t.inflateInit2 = Ce, _t.inflate = P, _t.inflateEnd = O, _t.inflateGetHeader = z, _t.inflateSetDictionary = J, _t.inflateInfo = "pako inflate (from Nodeca project)", _t;
}
var yi, xa;
function KCe() {
  if (xa) return yi;
  xa = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
  }
  return yi = t, yi;
}
var Ea;
function WCe() {
  if (Ea) return sn;
  Ea = 1;
  const t = zCe(), d = Ec(), g = Mc(), i = Gi(), l = $c(), r = KCe(), e = Object.prototype.toString, { Z_NO_FLUSH: s, Z_FINISH: n, Z_OK: a, Z_STREAM_END: o, Z_NEED_DICT: c, Z_STREAM_ERROR: u, Z_DATA_ERROR: _, Z_MEM_ERROR: S } = bn();
  function $(I) {
    this.options = d.assign({ chunkSize: 1024 * 64, windowBits: 15, to: "" }, I || {});
    const b = this.options;
    b.raw && b.windowBits >= 0 && b.windowBits < 16 && (b.windowBits = -b.windowBits, b.windowBits === 0 && (b.windowBits = -15)), b.windowBits >= 0 && b.windowBits < 16 && !(I && I.windowBits) && (b.windowBits += 32), b.windowBits > 15 && b.windowBits < 48 && (b.windowBits & 15) === 0 && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new l(), this.strm.avail_out = 0;
    let f = t.inflateInit2(this.strm, b.windowBits);
    if (f !== a) throw new Error(i[f]);
    if (this.header = new r(), t.inflateGetHeader(this.strm, this.header), b.dictionary && (typeof b.dictionary == "string" ? b.dictionary = g.string2buf(b.dictionary) : e.call(b.dictionary) === "[object ArrayBuffer]" && (b.dictionary = new Uint8Array(b.dictionary)), b.raw && (f = t.inflateSetDictionary(this.strm, b.dictionary), f !== a))) throw new Error(i[f]);
  }
  $.prototype.push = function(I, b) {
    const f = this.strm, p = this.options.chunkSize, w = this.options.dictionary;
    let M, T, k;
    if (this.ended) return false;
    for (b === ~~b ? T = b : T = b === true ? n : s, e.call(I) === "[object ArrayBuffer]" ? f.input = new Uint8Array(I) : f.input = I, f.next_in = 0, f.avail_in = f.input.length; ; ) {
      for (f.avail_out === 0 && (f.output = new Uint8Array(p), f.next_out = 0, f.avail_out = p), M = t.inflate(f, T), M === c && w && (M = t.inflateSetDictionary(f, w), M === a ? M = t.inflate(f, T) : M === _ && (M = c)); f.avail_in > 0 && M === o && f.state.wrap > 0 && I[f.next_in] !== 0; ) t.inflateReset(f), M = t.inflate(f, T);
      switch (M) {
        case u:
        case _:
        case c:
        case S:
          return this.onEnd(M), this.ended = true, false;
      }
      if (k = f.avail_out, f.next_out && (f.avail_out === 0 || M === o)) if (this.options.to === "string") {
        let B = g.utf8border(f.output, f.next_out), C = f.next_out - B, E = g.buf2string(f.output, B);
        f.next_out = C, f.avail_out = p - C, C && f.output.set(f.output.subarray(B, B + C), 0), this.onData(E);
      } else this.onData(f.output.length === f.next_out ? f.output : f.output.subarray(0, f.next_out));
      if (!(M === a && k === 0)) {
        if (M === o) return M = t.inflateEnd(this.strm), this.onEnd(M), this.ended = true, true;
        if (f.avail_in === 0) break;
      }
    }
    return true;
  }, $.prototype.onData = function(I) {
    this.chunks.push(I);
  }, $.prototype.onEnd = function(I) {
    I === a && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = I, this.msg = this.strm.msg;
  };
  function m(I, b) {
    const f = new $(b);
    if (f.push(I), f.err) throw f.msg || i[f.err];
    return f.result;
  }
  function h(I, b) {
    return b = b || {}, b.raw = true, m(I, b);
  }
  return sn.Inflate = $, sn.inflate = m, sn.inflateRaw = h, sn.ungzip = m, sn.constants = bn(), sn;
}
var Ma;
function ZCe() {
  if (Ma) return St;
  Ma = 1;
  const { Deflate: t, deflate: d, deflateRaw: g, gzip: i } = jCe(), { Inflate: l, inflate: r, inflateRaw: e, ungzip: s } = WCe(), n = bn();
  return St.Deflate = t, St.deflate = d, St.deflateRaw = g, St.gzip = i, St.Inflate = l, St.inflate = r, St.inflateRaw = e, St.ungzip = s, St.constants = n, St;
}
var $a;
function JCe() {
  if ($a) return Wn;
  $a = 1;
  var t = Le().Buffer;
  Object.defineProperty(Wn, "__esModule", { value: true }), Wn.GZIPPacked = void 0;
  const d = Oe(), g = ZCe();
  let i = class Ft {
    constructor(r) {
      this.data = r, this.CONSTRUCTOR_ID = 812830625, this.classType = "constructor";
    }
    static async gzipIfSmaller(r, e) {
      if (r && e.length > 512) {
        const s = await new Ft(e).toBytes();
        if (s.length < e.length) return s;
      }
      return e;
    }
    static gzip(r) {
      return t.from(r);
    }
    static ungzip(r) {
      return t.from((0, g.inflate)(r));
    }
    async toBytes() {
      const r = t.alloc(4);
      return r.writeUInt32LE(Ft.CONSTRUCTOR_ID, 0), t.concat([r, (0, d.serializeBytes)(await Ft.gzip(this.data))]);
    }
    static async read(r) {
      if (r.readInt(false) !== Ft.CONSTRUCTOR_ID) throw new Error("not equal");
      return Ft.gzip(r.tgReadBytes());
    }
    static async fromReader(r) {
      const e = r.tgReadBytes();
      return new Ft(await Ft.ungzip(e));
    }
  };
  return Wn.GZIPPacked = i, i.CONSTRUCTOR_ID = 812830625, i.classType = "constructor", Wn;
}
var ka;
function kn() {
  return ka || (ka = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.GZIPPacked = t.MessageContainer = t.TLMessage = t.RPCResult = t.coreObjects = void 0;
    const d = Pc();
    Object.defineProperty(t, "TLMessage", { enumerable: true, get: function() {
      return d.TLMessage;
    } });
    const g = OCe();
    Object.defineProperty(t, "RPCResult", { enumerable: true, get: function() {
      return g.RPCResult;
    } });
    const i = VCe();
    Object.defineProperty(t, "MessageContainer", { enumerable: true, get: function() {
      return i.MessageContainer;
    } });
    const l = JCe();
    Object.defineProperty(t, "GZIPPacked", { enumerable: true, get: function() {
      return l.GZIPPacked;
    } }), t.coreObjects = /* @__PURE__ */ new Map([[g.RPCResult.CONSTRUCTOR_ID, g.RPCResult], [l.GZIPPacked.CONSTRUCTOR_ID, l.GZIPPacked], [i.MessageContainer.CONSTRUCTOR_ID, i.MessageContainer]]);
  })(fi)), fi;
}
var rn = {}, Ra;
function Hi() {
  if (Ra) return rn;
  Ra = 1, Object.defineProperty(rn, "__esModule", { value: true }), rn.tlobjects = rn.LAYER = void 0, rn.LAYER = 198;
  const t = Oe(), d = {};
  rn.tlobjects = d;
  for (const g of Object.values(t.Api)) if ("CONSTRUCTOR_ID" in g) d[g.CONSTRUCTOR_ID] = g;
  else for (const i of Object.values(g)) d[i.CONSTRUCTOR_ID] = i;
  return rn;
}
var Ta;
function QCe() {
  if (Ta) return Gn;
  Ta = 1, Le().Buffer, Object.defineProperty(Gn, "__esModule", { value: true }), Gn.BinaryReader = void 0;
  const t = Gt(), d = kn(), g = Hi(), i = Ae();
  let l = class {
    constructor(e) {
      this.stream = e, this._last = void 0, this.offset = 0;
    }
    readByte() {
      return this.read(1)[0];
    }
    readInt(e = true) {
      let s;
      return e ? s = this.stream.readInt32LE(this.offset) : s = this.stream.readUInt32LE(this.offset), this.offset += 4, s;
    }
    readLong(e = true) {
      return this.readLargeInt(64, e);
    }
    readFloat() {
      return this.read(4).readFloatLE(0);
    }
    readDouble() {
      return this.read(8).readDoubleLE(0);
    }
    readLargeInt(e, s = true) {
      const n = this.read(Math.floor(e / 8));
      return (0, i.readBigIntFromBuffer)(n, true, s);
    }
    read(e = -1, s = true) {
      e === -1 && (e = this.stream.length - this.offset);
      const n = this.stream.slice(this.offset, this.offset + e);
      if (this.offset += e, s && n.length !== e) throw Error(`No more data left to read (need ${e}, got ${n.length}: ${n}); last read ${this._last}`);
      return this._last = n, n;
    }
    getBuffer() {
      return this.stream;
    }
    tgReadBytes() {
      const e = this.readByte();
      let s, n;
      e === 254 ? (n = this.readByte() | this.readByte() << 8 | this.readByte() << 16, s = n % 4) : (n = e, s = (n + 1) % 4);
      const a = this.read(n);
      return s > 0 && (s = 4 - s, this.read(s)), a;
    }
    tgReadString() {
      return this.tgReadBytes().toString("utf-8");
    }
    tgReadBool() {
      const e = this.readInt(false);
      if (e === 2574415285) return true;
      if (e === 3162085175) return false;
      throw new Error(`Invalid boolean code ${e.toString(16)}`);
    }
    tgReadDate() {
      const e = this.readInt();
      return new Date(e * 1e3);
    }
    tgReadObject() {
      const e = this.readInt(false);
      let s = g.tlobjects[e];
      if (s === void 0) {
        const n = e;
        if (n === 2574415285) return true;
        if (n === 3162085175) return false;
        if (n === 481674261) {
          const a = [], o = this.readInt();
          for (let c = 0; c < o; c++) a.push(this.tgReadObject());
          return a;
        }
        if (s = d.coreObjects.get(e), s === void 0) {
          this.seek(-4);
          const a = this.tellPosition(), o = new t.TypeNotFoundError(e, this.read());
          throw this.setPosition(a), o;
        }
      }
      return s.fromReader(this);
    }
    tgReadVector() {
      if (this.readInt(false) !== 481674261) throw new Error("Invalid constructor code, vector was expected");
      const e = this.readInt(), s = [];
      for (let n = 0; n < e; n++) s.push(this.tgReadObject());
      return s;
    }
    tellPosition() {
      return this.offset;
    }
    setPosition(e) {
      this.offset = e;
    }
    seek(e) {
      this.offset += e;
    }
  };
  return Gn.BinaryReader = l, Gn;
}
var Jn = {}, wi, Ba;
function XCe() {
  if (Ba) return wi;
  Ba = 1;
  var t = function() {
    if (typeof self == "object" && self) return self;
    if (typeof window == "object" && window) return window;
    throw new Error("Unable to resolve global `this`");
  };
  return wi = (function() {
    if (this) return this;
    if (typeof globalThis == "object" && globalThis) return globalThis;
    try {
      Object.defineProperty(Object.prototype, "__global__", { get: function() {
        return this;
      }, configurable: true });
    } catch {
      return t();
    }
    try {
      return __global__ || t();
    } finally {
      delete Object.prototype.__global__;
    }
  })(), wi;
}
const YCe = "1.0.35", e2e = { version: YCe };
var Si, Da;
function t2e() {
  return Da || (Da = 1, Si = e2e.version), Si;
}
var Ii, qa;
function n2e() {
  if (qa) return Ii;
  qa = 1;
  var t;
  if (typeof globalThis == "object") t = globalThis;
  else try {
    t = XCe();
  } catch {
  } finally {
    if (!t && typeof window < "u" && (t = window), !t) throw new Error("Could not determine global this");
  }
  var d = t.WebSocket || t.MozWebSocket, g = t2e();
  function i(l, r) {
    var e;
    return r ? e = new d(l, r) : e = new d(l), e;
  }
  return d && ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(l) {
    Object.defineProperty(i, l, { get: function() {
      return d[l];
    } });
  }), Ii = { w3cwebsocket: d ? i : null, version: g }, Ii;
}
var Pi = {};
const Gs = Rn(ol);
var Ts = {}, Bs = {}, Ot = {}, Ua;
function Hs() {
  return Ua || (Ua = 1, Object.defineProperty(Ot, "__esModule", { value: true }), Ot.E_CANCELED = Ot.E_ALREADY_LOCKED = Ot.E_TIMEOUT = void 0, Ot.E_TIMEOUT = new Error("timeout while waiting for mutex to become available"), Ot.E_ALREADY_LOCKED = new Error("mutex already locked"), Ot.E_CANCELED = new Error("request for lock canceled")), Ot;
}
var La;
function kc() {
  if (La) return Bs;
  La = 1, Object.defineProperty(Bs, "__esModule", { value: true });
  var t = Gs, d = Hs(), g = (function() {
    function i(l, r) {
      if (r === void 0 && (r = d.E_CANCELED), this._maxConcurrency = l, this._cancelError = r, this._queue = [], this._waiters = [], l <= 0) throw new Error("semaphore must be initialized to a positive value");
      this._value = l;
    }
    return i.prototype.acquire = function() {
      var l = this, r = this.isLocked(), e = new Promise(function(s, n) {
        return l._queue.push({ resolve: s, reject: n });
      });
      return r || this._dispatch(), e;
    }, i.prototype.runExclusive = function(l) {
      return (0, t.__awaiter)(this, void 0, void 0, function() {
        var r, e, s;
        return (0, t.__generator)(this, function(n) {
          switch (n.label) {
            case 0:
              return [4, this.acquire()];
            case 1:
              r = n.sent(), e = r[0], s = r[1], n.label = 2;
            case 2:
              return n.trys.push([2, , 4, 5]), [4, l(e)];
            case 3:
              return [2, n.sent()];
            case 4:
              return s(), [7];
            case 5:
              return [2];
          }
        });
      });
    }, i.prototype.waitForUnlock = function() {
      return (0, t.__awaiter)(this, void 0, void 0, function() {
        var l, r = this;
        return (0, t.__generator)(this, function(e) {
          return this.isLocked() ? (l = new Promise(function(s) {
            return r._waiters.push({ resolve: s });
          }), [2, l]) : [2, Promise.resolve()];
        });
      });
    }, i.prototype.isLocked = function() {
      return this._value <= 0;
    }, i.prototype.release = function() {
      if (this._maxConcurrency > 1) throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
      if (this._currentReleaser) {
        var l = this._currentReleaser;
        this._currentReleaser = void 0, l();
      }
    }, i.prototype.cancel = function() {
      var l = this;
      this._queue.forEach(function(r) {
        return r.reject(l._cancelError);
      }), this._queue = [];
    }, i.prototype._dispatch = function() {
      var l = this, r = this._queue.shift();
      if (r) {
        var e = false;
        this._currentReleaser = function() {
          e || (e = true, l._value++, l._resolveWaiters(), l._dispatch());
        }, r.resolve([this._value--, this._currentReleaser]);
      }
    }, i.prototype._resolveWaiters = function() {
      this._waiters.forEach(function(l) {
        return l.resolve();
      }), this._waiters = [];
    }, i;
  })();
  return Bs.default = g, Bs;
}
var Oa;
function s2e() {
  if (Oa) return Ts;
  Oa = 1, Object.defineProperty(Ts, "__esModule", { value: true });
  var t = Gs, d = kc(), g = (function() {
    function i(l) {
      this._semaphore = new d.default(1, l);
    }
    return i.prototype.acquire = function() {
      return (0, t.__awaiter)(this, void 0, void 0, function() {
        var l, r;
        return (0, t.__generator)(this, function(e) {
          switch (e.label) {
            case 0:
              return [4, this._semaphore.acquire()];
            case 1:
              return l = e.sent(), r = l[1], [2, r];
          }
        });
      });
    }, i.prototype.runExclusive = function(l) {
      return this._semaphore.runExclusive(function() {
        return l();
      });
    }, i.prototype.isLocked = function() {
      return this._semaphore.isLocked();
    }, i.prototype.waitForUnlock = function() {
      return this._semaphore.waitForUnlock();
    }, i.prototype.release = function() {
      this._semaphore.release();
    }, i.prototype.cancel = function() {
      return this._semaphore.cancel();
    }, i;
  })();
  return Ts.default = g, Ts;
}
var Qn = {}, Va;
function Rc() {
  if (Va) return Qn;
  Va = 1, Object.defineProperty(Qn, "__esModule", { value: true }), Qn.withTimeout = void 0;
  var t = Gs, d = Hs();
  function g(i, l, r) {
    var e = this;
    return r === void 0 && (r = d.E_TIMEOUT), { acquire: function() {
      return new Promise(function(s, n) {
        return (0, t.__awaiter)(e, void 0, void 0, function() {
          var a, o, c, u, _;
          return (0, t.__generator)(this, function(S) {
            switch (S.label) {
              case 0:
                a = false, o = setTimeout(function() {
                  a = true, n(r);
                }, l), S.label = 1;
              case 1:
                return S.trys.push([1, 3, , 4]), [4, i.acquire()];
              case 2:
                return c = S.sent(), a ? (u = Array.isArray(c) ? c[1] : c, u()) : (clearTimeout(o), s(c)), [3, 4];
              case 3:
                return _ = S.sent(), a || (clearTimeout(o), n(_)), [3, 4];
              case 4:
                return [2];
            }
          });
        });
      });
    }, runExclusive: function(s) {
      return (0, t.__awaiter)(this, void 0, void 0, function() {
        var n, a;
        return (0, t.__generator)(this, function(o) {
          switch (o.label) {
            case 0:
              n = function() {
              }, o.label = 1;
            case 1:
              return o.trys.push([1, , 7, 8]), [4, this.acquire()];
            case 2:
              return a = o.sent(), Array.isArray(a) ? (n = a[1], [4, s(a[0])]) : [3, 4];
            case 3:
              return [2, o.sent()];
            case 4:
              return n = a, [4, s()];
            case 5:
              return [2, o.sent()];
            case 6:
              return [3, 8];
            case 7:
              return n(), [7];
            case 8:
              return [2];
          }
        });
      });
    }, release: function() {
      i.release();
    }, cancel: function() {
      return i.cancel();
    }, waitForUnlock: function() {
      return i.waitForUnlock();
    }, isLocked: function() {
      return i.isLocked();
    } };
  }
  return Qn.withTimeout = g, Qn;
}
var Xn = {}, Na;
function i2e() {
  if (Na) return Xn;
  Na = 1, Object.defineProperty(Xn, "__esModule", { value: true }), Xn.tryAcquire = void 0;
  var t = Hs(), d = Rc();
  function g(i, l) {
    return l === void 0 && (l = t.E_ALREADY_LOCKED), (0, d.withTimeout)(i, 0, l);
  }
  return Xn.tryAcquire = g, Xn;
}
var Fa;
function zs() {
  return Fa || (Fa = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.tryAcquire = t.withTimeout = t.Semaphore = t.Mutex = void 0;
    var d = Gs, g = s2e();
    Object.defineProperty(t, "Mutex", { enumerable: true, get: function() {
      return g.default;
    } });
    var i = kc();
    Object.defineProperty(t, "Semaphore", { enumerable: true, get: function() {
      return i.default;
    } });
    var l = Rc();
    Object.defineProperty(t, "withTimeout", { enumerable: true, get: function() {
      return l.withTimeout;
    } });
    var r = i2e();
    Object.defineProperty(t, "tryAcquire", { enumerable: true, get: function() {
      return r.tryAcquire;
    } }), (0, d.__exportStar)(Hs(), t);
  })(Pi)), Pi;
}
var ja;
function r2e() {
  if (ja) return Jn;
  ja = 1;
  var t = Le().Buffer;
  Object.defineProperty(Jn, "__esModule", { value: true }), Jn.PromisedWebSockets = void 0;
  const d = n2e(), g = zs(), i = Ps(), l = new g.Mutex(), r = new Error("WebSocket was closed");
  let e = class {
    constructor() {
      this.client = void 0, this.stream = t.alloc(0), this.closed = true;
    }
    async readExactly(n) {
      let a = t.alloc(0);
      for (; ; ) {
        const o = await this.read(n);
        if (a = t.concat([a, o]), n = n - o.length, !n) return a;
      }
    }
    async read(n) {
      if (this.closed || (await this.canRead, this.closed)) throw r;
      const a = this.stream.slice(0, n);
      return this.stream = this.stream.slice(n), this.stream.length === 0 && (this.canRead = new Promise((o) => {
        this.resolveRead = o;
      })), a;
    }
    async readAll() {
      if (this.closed || !await this.canRead) throw r;
      const n = this.stream;
      return this.stream = t.alloc(0), this.canRead = new Promise((a) => {
        this.resolveRead = a;
      }), n;
    }
    getWebSocketLink(n, a, o) {
      return a === 443 ? `wss://${n}:${a}/apiws${o ? "_test" : ""}` : `ws://${n}:${a}/apiws${o ? "_test" : ""}`;
    }
    async connect(n, a, o = false) {
      return this.stream = t.alloc(0), this.canRead = new Promise((c) => {
        this.resolveRead = c;
      }), this.closed = false, this.website = this.getWebSocketLink(a, n, o), this.client = new d.w3cwebsocket(this.website, "binary"), new Promise((c, u) => {
        this.client && (this.client.onopen = () => {
          this.receive(), c(this);
        }, this.client.onerror = (_) => {
          u(_);
        }, this.client.onclose = () => {
          this.resolveRead && this.resolveRead(false), this.closed = true;
        }, i.isBrowser && window.addEventListener("offline", async () => {
          await this.close(), this.resolveRead && this.resolveRead(false);
        }));
      });
    }
    write(n) {
      if (this.closed) throw r;
      this.client && this.client.send(n);
    }
    async close() {
      this.client && await this.client.close(), this.closed = true;
    }
    async receive() {
      this.client && (this.client.onmessage = async (n) => {
        const a = await l.acquire();
        try {
          let o;
          o = t.from(await new Response(n.data).arrayBuffer()), this.stream = t.concat([this.stream, o]), this.resolveRead && this.resolveRead(true);
        } finally {
          a();
        }
      });
    }
    toString() {
      return "PromisedWebSocket";
    }
  };
  return Jn.PromisedWebSockets = e, Jn;
}
var Pt = {};
module.exports = {};
const a2e = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), ws = Rn(a2e);
var Ga;
function o2e() {
  if (Ga) return Pt;
  Ga = 1;
  var t = Le().Buffer, d = Pt && Pt.__createBinding || (Object.create ? (function(o, c, u, _) {
    _ === void 0 && (_ = u);
    var S = Object.getOwnPropertyDescriptor(c, u);
    (!S || ("get" in S ? !c.__esModule : S.writable || S.configurable)) && (S = { enumerable: true, get: function() {
      return c[u];
    } }), Object.defineProperty(o, _, S);
  }) : (function(o, c, u, _) {
    _ === void 0 && (_ = u), o[_] = c[u];
  })), g = Pt && Pt.__setModuleDefault || (Object.create ? (function(o, c) {
    Object.defineProperty(o, "default", { enumerable: true, value: c });
  }) : function(o, c) {
    o.default = c;
  }), i = Pt && Pt.__importStar || function(o) {
    if (o && o.__esModule) return o;
    var c = {};
    if (o != null) for (var u in o) u !== "default" && Object.prototype.hasOwnProperty.call(o, u) && d(c, o, u);
    return g(c, o), c;
  };
  Object.defineProperty(Pt, "__esModule", { value: true }), Pt.PromisedNetSockets = void 0;
  const l = i(ws), r = ws, e = zs(), s = new e.Mutex(), n = new Error("NetSocket was closed");
  let a = class {
    constructor(c) {
      if (this.client = void 0, this.closed = true, this.stream = t.alloc(0), c && !("MTProxy" in c)) {
        if (!c.ip || !c.port || !c.socksType) throw new Error(`Invalid sockets params: ip=${c.ip}, port=${c.port}, socksType=${c.socksType}`);
        this.proxy = c;
      }
    }
    async readExactly(c) {
      let u = t.alloc(0);
      for (; ; ) {
        const _ = await this.read(c);
        if (u = t.concat([u, _]), c = c - _.length, !c || c === -437) return u;
      }
    }
    async read(c) {
      if (this.closed || (await this.canRead, this.closed)) throw n;
      const u = this.stream.slice(0, c);
      return this.stream = this.stream.slice(c), this.stream.length === 0 && (this.canRead = new Promise((_) => {
        this.resolveRead = _;
      })), u;
    }
    async readAll() {
      if (this.closed || !await this.canRead) throw n;
      const c = this.stream;
      return this.stream = t.alloc(0), this.canRead = new Promise((u) => {
        this.resolveRead = u;
      }), c;
    }
    async connect(c, u) {
      this.stream = t.alloc(0);
      let _ = false;
      if (this.proxy) {
        const S = await r.SocksClient.createConnection({ proxy: { host: this.proxy.ip, port: this.proxy.port, type: this.proxy.socksType, userId: this.proxy.username, password: this.proxy.password }, command: "connect", timeout: (this.proxy.timeout || 5) * 1e3, destination: { host: u, port: c } });
        this.client = S.socket, _ = true;
      } else this.client = new l.Socket();
      return this.canRead = new Promise((S) => {
        this.resolveRead = S;
      }), this.closed = false, new Promise((S, $) => {
        this.client && (_ ? (this.receive(), S(this)) : this.client.connect(c, u, () => {
          this.receive(), S(this);
        }), this.client.on("error", $), this.client.on("close", () => {
          this.client && this.client.destroyed && (this.resolveRead && this.resolveRead(false), this.closed = true);
        }));
      });
    }
    write(c) {
      if (this.closed) throw n;
      this.client && this.client.write(c);
    }
    async close() {
      this.client && (await this.client.destroy(), this.client.unref()), this.closed = true;
    }
    async receive() {
      this.client && this.client.on("data", async (c) => {
        const u = await s.acquire();
        try {
          let _;
          this.stream = t.concat([this.stream, c]), this.resolveRead && this.resolveRead(true);
        } finally {
          u();
        }
      });
    }
    toString() {
      return "PromisedNetSocket";
    }
  };
  return Pt.PromisedNetSockets = a, Pt;
}
var Yn = {}, Ha;
function c2e() {
  if (Ha) return Yn;
  Ha = 1;
  var t = Le().Buffer;
  Object.defineProperty(Yn, "__esModule", { value: true }), Yn.MessagePacker = void 0;
  const d = kn(), g = kn(), i = Sc(), l = /* @__PURE__ */ new Set(["messages.SendMessage", "messages.SendMedia", "messages.SendMultiMedia", "messages.ForwardMessages", "messages.SendInlineBotResult"]);
  let r = class {
    constructor(s, n) {
      this._state = s, this._queue = [], this._pendingStates = [], this._ready = new Promise((a) => {
        this.setReady = a;
      }), this._log = n;
    }
    values() {
      return this._queue;
    }
    append(s, n = true, a = false) {
      var o, c;
      if (s && l.has(s.request.className)) {
        if (a) {
          for (let u = 0; u < this._queue.length; u++) if (l.has((o = this._queue[u]) === null || o === void 0 ? void 0 : o.request.className)) {
            this._queue[u].after = s;
            break;
          }
        } else for (let u = this._queue.length - 1; u >= 0; u--) if (l.has((c = this._queue[u]) === null || c === void 0 ? void 0 : c.request.className)) {
          s.after = this._queue[u];
          break;
        }
      }
      a ? this._queue.unshift(s) : this._queue.push(s), n && this.setReady && this.setReady(true), s && s.request.CONSTRUCTOR_ID !== 1658238041 && (this._pendingStates.push(s), s.promise.catch((u) => {
      }).finally(() => {
        this._pendingStates = this._pendingStates.filter((u) => u !== s);
      }));
    }
    prepend(s) {
      s.reverse().forEach((n) => {
        this.append(n, false, true);
      }), this.setReady && this.setReady(true);
    }
    extend(s) {
      s.forEach((n) => {
        this.append(n, false);
      }), this.setReady && this.setReady(true);
    }
    clear() {
      this._queue = [], this.append(void 0);
    }
    async wait() {
      this._queue.length || (this._ready = new Promise((s) => {
        this.setReady = s;
      }), await this._ready);
    }
    async get() {
      if (!this._queue[this._queue.length - 1]) {
        this._queue = this._queue.filter(Boolean);
        return;
      }
      let s, n = new i.BinaryWriter(t.alloc(0));
      const a = [];
      let o = 0;
      for (; this._queue.length && a.length <= d.MessageContainer.MAXIMUM_LENGTH; ) {
        const c = this._queue.shift();
        if (c) {
          if (o += c.data.length + g.TLMessage.SIZE_OVERHEAD, o <= d.MessageContainer.MAXIMUM_SIZE) {
            let u;
            c.after && (u = c.after.msgId), c.after && (u = c.after.msgId), c.msgId = await this._state.writeDataAsMessage(n, c.data, c.request.classType === "request", u), this._log.debug(`Assigned msgId = ${c.msgId} to ${c.request.className || c.request.constructor.name}`), a.push(c);
            continue;
          }
          if (a.length) {
            this._queue.unshift(c);
            break;
          }
          this._log.warn(`Message payload for ${c.request.className || c.request.constructor.name} is too long ${c.data.length} and cannot be sent`), c.promise.reject("Request Payload is too big"), o = 0;
        }
      }
      if (!a.length) return null;
      if (a.length > 1) {
        const c = t.alloc(8);
        c.writeUInt32LE(d.MessageContainer.CONSTRUCTOR_ID, 0), c.writeInt32LE(a.length, 4), s = t.concat([c, n.getValue()]), n = new i.BinaryWriter(t.alloc(0));
        const u = await this._state.writeDataAsMessage(n, s, false);
        for (const _ of a) _.containerId = u;
      }
      return s = n.getValue(), { batch: a, data: s };
    }
  };
  return Yn.MessagePacker = r, Yn;
}
var es = {}, za;
function l2e() {
  if (za) return es;
  za = 1, Object.defineProperty(es, "__esModule", { value: true }), es.AsyncQueue = void 0;
  let t = class {
    constructor() {
      this._queue = [], this.canPush = true, this.resolvePush = (g) => {
      }, this.resolveGet = (g) => {
      }, this.canGet = new Promise((g) => {
        this.resolveGet = g;
      });
    }
    async push(g) {
      await this.canPush, this._queue.push(g), this.resolveGet(true), this.canPush = new Promise((i) => {
        this.resolvePush = i;
      });
    }
    async pop() {
      await this.canGet;
      const g = this._queue.pop();
      return this.resolvePush(true), this.canGet = new Promise((i) => {
        this.resolveGet = i;
      }), g;
    }
  };
  return es.AsyncQueue = t, es;
}
var Ka;
function Et() {
  return Ka || (Ka = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.AsyncQueue = t.MessagePacker = t.PromisedNetSockets = t.PromisedWebSockets = t.BinaryReader = t.BinaryWriter = t.Logger = void 0;
    var d = xt();
    Object.defineProperty(t, "Logger", { enumerable: true, get: function() {
      return d.Logger;
    } });
    var g = Sc();
    Object.defineProperty(t, "BinaryWriter", { enumerable: true, get: function() {
      return g.BinaryWriter;
    } });
    var i = QCe();
    Object.defineProperty(t, "BinaryReader", { enumerable: true, get: function() {
      return i.BinaryReader;
    } });
    var l = r2e();
    Object.defineProperty(t, "PromisedWebSockets", { enumerable: true, get: function() {
      return l.PromisedWebSockets;
    } });
    var r = o2e();
    Object.defineProperty(t, "PromisedNetSockets", { enumerable: true, get: function() {
      return r.PromisedNetSockets;
    } });
    var e = c2e();
    Object.defineProperty(t, "MessagePacker", { enumerable: true, get: function() {
      return e.MessagePacker;
    } });
    var s = l2e();
    Object.defineProperty(t, "AsyncQueue", { enumerable: true, get: function() {
      return s.AsyncQueue;
    } });
  })(di)), di;
}
var Wa;
function xs() {
  if (Wa) return Lt;
  Wa = 1, Object.defineProperty(Lt, "__esModule", { value: true }), Lt.ObfuscatedConnection = Lt.PacketCodec = Lt.Connection = void 0;
  const t = Et();
  let d = class {
    constructor({ ip: r, port: e, dcId: s, loggers: n, proxy: a, socket: o, testServers: c }) {
      this._ip = r, this._port = e, this._dcId = s, this._log = n, this._proxy = a, this._connected = false, this._sendTask = void 0, this._recvTask = void 0, this._codec = void 0, this._obfuscation = void 0, this._sendArray = new t.AsyncQueue(), this._recvArray = new t.AsyncQueue(), this.socket = new o(a), this._testServers = c;
    }
    async _connect() {
      this._log.debug("Connecting"), this._codec = new this.PacketCodecClass(this), await this.socket.connect(this._port, this._ip, this._testServers), this._log.debug("Finished connecting"), await this._initConn();
    }
    async connect() {
      await this._connect(), this._connected = true, this._sendTask || (this._sendTask = this._sendLoop()), this._recvTask = this._recvLoop();
    }
    async disconnect() {
      this._connected && (this._connected = false, this._recvArray.push(void 0), await this.socket.close());
    }
    async send(r) {
      if (!this._connected) throw new Error("Not connected");
      await this._sendArray.push(r);
    }
    async recv() {
      for (; this._connected; ) {
        const r = await this._recvArray.pop();
        if (r) return r;
      }
      throw new Error("Not connected");
    }
    async _sendLoop() {
      try {
        for (; this._connected; ) {
          const r = await this._sendArray.pop();
          if (!r) {
            this._sendTask = void 0;
            return;
          }
          await this._send(r);
        }
      } catch {
        this._log.info("The server closed the connection while sending");
      }
    }
    isConnected() {
      return this._connected;
    }
    async _recvLoop() {
      let r;
      for (; this._connected; ) {
        try {
          if (r = await this._recv(), !r) throw new Error("no data received");
        } catch {
          this._log.info("connection closed"), this.disconnect();
          return;
        }
        await this._recvArray.push(r);
      }
    }
    async _initConn() {
      this._codec.tag && await this.socket.write(this._codec.tag);
    }
    async _send(r) {
      const e = this._codec.encodePacket(r);
      this.socket.write(e);
    }
    async _recv() {
      return await this._codec.readPacket(this.socket);
    }
    toString() {
      return `${this._ip}:${this._port}/${this.constructor.name.replace("Connection", "")}`;
    }
  };
  Lt.Connection = d;
  class g extends d {
    constructor() {
      super(...arguments), this.ObfuscatedIO = void 0;
    }
    async _initConn() {
      this._obfuscation = new this.ObfuscatedIO(this), await this._obfuscation.initHeader(), this.socket.write(this._obfuscation.header);
    }
    async _send(r) {
      this._obfuscation.write(this._codec.encodePacket(r));
    }
    async _recv() {
      return await this._codec.readPacket(this._obfuscation);
    }
  }
  Lt.ObfuscatedConnection = g;
  class i {
    constructor(r) {
      this._conn = r;
    }
    encodePacket(r) {
      throw new Error("Not Implemented");
    }
    async readPacket(r) {
      throw new Error("Not Implemented");
    }
  }
  return Lt.PacketCodec = i, Lt;
}
var an = {}, Za;
function u2e() {
  if (Za) return an;
  Za = 1;
  var t = Le().Buffer;
  Object.defineProperty(an, "__esModule", { value: true }), an.ConnectionTCPFull = an.FullPacketCodec = void 0;
  const d = xs(), g = Ae(), i = Gt();
  class l extends d.PacketCodec {
    constructor(s) {
      super(s), this._sendCounter = 0;
    }
    encodePacket(s) {
      const n = s.length + 12, a = t.alloc(8);
      a.writeInt32LE(n, 0), a.writeInt32LE(this._sendCounter, 4), s = t.concat([a, s]);
      const o = t.alloc(4);
      return o.writeUInt32LE((0, g.crc32)(s), 0), this._sendCounter += 1, t.concat([s, o]);
    }
    async readPacket(s) {
      const n = await s.readExactly(8);
      if (n === void 0) return t.alloc(0);
      const a = n.readInt32LE(0);
      if (a < 0) {
        const _ = await s.readExactly(4);
        throw new i.InvalidBufferError(_);
      }
      let o = await s.readExactly(a - 8);
      const c = o.slice(-4).readUInt32LE(0);
      o = o.slice(0, -4);
      const u = (0, g.crc32)(t.concat([n, o]));
      if (u !== c) throw new i.InvalidChecksumError(c, u);
      return o;
    }
  }
  an.FullPacketCodec = l;
  class r extends d.Connection {
    constructor() {
      super(...arguments), this.PacketCodecClass = l;
    }
  }
  return an.ConnectionTCPFull = r, an;
}
var Vt = {}, Ja;
function zi() {
  if (Ja) return Vt;
  Ja = 1;
  var t = Le().Buffer, d = Vt && Vt.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(Vt, "__esModule", { value: true }), Vt.ConnectionTCPAbridged = Vt.AbridgedPacketCodec = void 0;
  const g = Ae(), i = xs(), l = d(Ke());
  class r extends i.PacketCodec {
    constructor(n) {
      super(n), this.tag = r.tag, this.obfuscateTag = r.obfuscateTag;
    }
    encodePacket(n) {
      let a = n.length >> 2, o;
      if (a < 127) {
        const c = t.alloc(1);
        c.writeUInt8(a, 0), o = c;
      } else o = t.concat([t.from("7f", "hex"), (0, g.readBufferFromBigInt)((0, l.default)(a), 3)]);
      return t.concat([o, n]);
    }
    async readPacket(n) {
      let o = (await n.read(1))[0];
      return o >= 127 && (o = t.concat([await n.read(3), t.alloc(1)]).readInt32LE(0)), n.read(o << 2);
    }
  }
  Vt.AbridgedPacketCodec = r, r.tag = t.from("ef", "hex"), r.obfuscateTag = t.from("efefefef", "hex");
  class e extends i.Connection {
    constructor() {
      super(...arguments), this.PacketCodecClass = r;
    }
  }
  return Vt.ConnectionTCPAbridged = e, Vt;
}
var ts = {}, At = {}, Qa;
function Tc() {
  if (Qa) return At;
  Qa = 1;
  var t = Le().Buffer, d = At && At.__createBinding || (Object.create ? (function(e, s, n, a) {
    a === void 0 && (a = n);
    var o = Object.getOwnPropertyDescriptor(s, n);
    (!o || ("get" in o ? !s.__esModule : o.writable || o.configurable)) && (o = { enumerable: true, get: function() {
      return s[n];
    } }), Object.defineProperty(e, a, o);
  }) : (function(e, s, n, a) {
    a === void 0 && (a = n), e[a] = s[n];
  })), g = At && At.__setModuleDefault || (Object.create ? (function(e, s) {
    Object.defineProperty(e, "default", { enumerable: true, value: s });
  }) : function(e, s) {
    e.default = s;
  }), i = At && At.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var s = {};
    if (e != null) for (var n in e) n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && d(s, e, n);
    return g(s, e), s;
  };
  Object.defineProperty(At, "__esModule", { value: true }), At.CTR = void 0;
  const l = i(ic());
  let r = class {
    constructor(s, n) {
      if (!t.isBuffer(s) || !t.isBuffer(n) || n.length !== 16) throw new Error("Key and iv need to be a buffer");
      this.cipher = l.createCipheriv("AES-256-CTR", s, n);
    }
    encrypt(s) {
      return t.from(this.cipher.update(s));
    }
  };
  return At.CTR = r, At;
}
var Xa;
function d2e() {
  if (Xa) return ts;
  Xa = 1;
  var t = Le().Buffer;
  Object.defineProperty(ts, "__esModule", { value: true }), ts.ConnectionTCPObfuscated = void 0;
  const d = Ae(), g = xs(), i = zi(), l = Tc();
  class r {
    constructor(n) {
      this.header = void 0, this.connection = n.socket, this._packetClass = n.PacketCodecClass;
    }
    async initHeader() {
      const n = [t.from("50567247", "hex"), t.from("474554", "hex"), t.from("504f5354", "hex"), t.from("eeeeeeee", "hex")];
      let a;
      for (; ; ) if (a = (0, d.generateRandomBytes)(64), a[0] !== 239 && !a.slice(4, 8).equals(t.alloc(4))) {
        let h = true;
        for (const I of n) if (I.equals(a.slice(0, 4))) {
          h = false;
          break;
        }
        if (h) break;
      }
      a = a.toJSON().data;
      const o = t.from(a.slice(8, 56)).reverse(), c = t.from(a.slice(8, 40)), u = t.from(a.slice(40, 56)), _ = t.from(o.slice(0, 32)), S = t.from(o.slice(32, 48)), $ = new l.CTR(c, u), m = new l.CTR(_, S);
      a = t.concat([t.from(a.slice(0, 56)), this._packetClass.obfuscateTag, t.from(a.slice(60))]), a = t.concat([t.from(a.slice(0, 56)), t.from($.encrypt(a).slice(56, 64)), t.from(a.slice(64))]), this.header = a, this._encrypt = $, this._decrypt = m;
    }
    async read(n) {
      const a = await this.connection.readExactly(n);
      return this._decrypt.encrypt(a);
    }
    write(n) {
      this.connection.write(this._encrypt.encrypt(n));
    }
  }
  class e extends g.ObfuscatedConnection {
    constructor() {
      super(...arguments), this.ObfuscatedIO = r, this.PacketCodecClass = i.AbridgedPacketCodec;
    }
  }
  return ts.ConnectionTCPObfuscated = e, ts;
}
var Ya;
function Bc() {
  return Ya || (Ya = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.ConnectionTCPObfuscated = t.ConnectionTCPAbridged = t.ConnectionTCPFull = t.Connection = void 0;
    var d = xs();
    Object.defineProperty(t, "Connection", { enumerable: true, get: function() {
      return d.Connection;
    } });
    var g = u2e();
    Object.defineProperty(t, "ConnectionTCPFull", { enumerable: true, get: function() {
      return g.ConnectionTCPFull;
    } });
    var i = zi();
    Object.defineProperty(t, "ConnectionTCPAbridged", { enumerable: true, get: function() {
      return i.ConnectionTCPAbridged;
    } });
    var l = d2e();
    Object.defineProperty(t, "ConnectionTCPObfuscated", { enumerable: true, get: function() {
      return l.ConnectionTCPObfuscated;
    } });
  })(ui)), ui;
}
var Ai = {}, on = {}, ns = {}, eo;
function Dc() {
  if (eo) return ns;
  eo = 1, Object.defineProperty(ns, "__esModule", { value: true }), ns.Session = void 0;
  class t {
  }
  return ns.Session = t, ns;
}
var to;
function Ki() {
  if (to) return on;
  to = 1;
  var t = on && on.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(on, "__esModule", { value: true }), on.MemorySession = void 0;
  const d = Dc(), g = Oe(), i = t(Ke()), l = Xe(), r = Ae(), e = Ye();
  class s extends d.Session {
    constructor() {
      super(), this._serverAddress = void 0, this._dcId = 0, this._port = void 0, this._takeoutId = void 0, this._entities = /* @__PURE__ */ new Set(), this._updateStates = {};
    }
    setDC(a, o, c) {
      this._dcId = a | 0, this._serverAddress = o, this._port = c;
    }
    get dcId() {
      return this._dcId;
    }
    get serverAddress() {
      return this._serverAddress;
    }
    get port() {
      return this._port;
    }
    get authKey() {
      return this._authKey;
    }
    set authKey(a) {
      this._authKey = a;
    }
    get takeoutId() {
      return this._takeoutId;
    }
    set takeoutId(a) {
      this._takeoutId = a;
    }
    getAuthKey(a) {
      if (!(a && a !== this.dcId)) return this.authKey;
    }
    setAuthKey(a, o) {
      o && o !== this.dcId || (this.authKey = a);
    }
    close() {
    }
    save() {
    }
    async load() {
    }
    delete() {
    }
    _entityValuesToRow(a, o, c, u, _) {
      return [a, o, c, u, _];
    }
    _entityToRow(a) {
      if (a.classType !== "constructor") return;
      let o, c;
      try {
        o = (0, l.getInputPeer)(a, false), c = (0, l.getPeerId)(o);
      } catch {
        return;
      }
      let u;
      if (o instanceof g.Api.InputPeerUser || o instanceof g.Api.InputPeerChannel) u = o.accessHash;
      else if (o instanceof g.Api.InputPeerChat) u = i.default.zero;
      else return;
      let _ = a.username;
      _ && (_ = _.toLowerCase());
      const S = a.phone, $ = (0, l.getDisplayName)(a);
      return this._entityValuesToRow(c, u, _, S, $);
    }
    _entitiesToRows(a) {
      let o = [];
      a.classType !== "constructor" && (0, r.isArrayLike)(a) ? o = a : typeof a == "object" && ("user" in a && o.push(a.user), "chat" in a && o.push(a.chat), "channel" in a && o.push(a.channel), "chats" in a && (0, r.isArrayLike)(a.chats) && (o = o.concat(a.chats)), "users" in a && (0, r.isArrayLike)(a.users) && (o = o.concat(a.users)));
      const c = [];
      for (const u of o) {
        const _ = this._entityToRow(u);
        _ && c.push(_);
      }
      return c;
    }
    processEntities(a) {
      const o = this._entitiesToRows(a);
      for (const c of o) this._entities.add(c);
    }
    getEntityRowsByPhone(a) {
      for (const o of this._entities) if (o[3] === a) return [o[0], o[1]];
    }
    getEntityRowsByUsername(a) {
      for (const o of this._entities) if (o[2] === a) return [o[0], o[1]];
    }
    getEntityRowsByName(a) {
      for (const o of this._entities) if (o[4] === a) return [o[0], o[1]];
    }
    getEntityRowsById(a, o = true) {
      if (o) {
        for (const c of this._entities) if (c[0] === a) return [c[0], c[1]];
      } else {
        const c = [e.utils.getPeerId(new g.Api.PeerUser({ userId: (0, r.returnBigInt)(a) })), e.utils.getPeerId(new g.Api.PeerChat({ chatId: (0, r.returnBigInt)(a) })), e.utils.getPeerId(new g.Api.PeerChannel({ channelId: (0, r.returnBigInt)(a) }))];
        for (const u of this._entities) if (c.includes(u[0])) return [u[0], u[1]];
      }
    }
    getInputEntity(a) {
      let o;
      if (typeof a == "object" && !i.default.isInstance(a) && a.SUBCLASS_OF_ID) return a.SUBCLASS_OF_ID == 3374092470 || a.SUBCLASS_OF_ID == 3865689926 || a.SUBCLASS_OF_ID == 1089602301 ? a : e.utils.getInputPeer(a);
      typeof a == "object" ? (a = e.utils.getPeerId(a), o = true) : o = false, (i.default.isInstance(a) || typeof a == "bigint" || typeof a == "number") && (a = a.toString());
      let c;
      if (typeof a == "string") {
        const u = e.utils.parsePhone(a);
        if (u) c = this.getEntityRowsByPhone(u);
        else {
          const { username: _, isInvite: S } = e.utils.parseUsername(a);
          _ && !S && (c = this.getEntityRowsByUsername(_));
        }
        if (!c) {
          const _ = e.utils.parseID(a);
          _ && (c = this.getEntityRowsById(_, o));
        }
        c || (c = this.getEntityRowsByName(a));
      }
      if (c) {
        let u = c[0];
        const _ = (0, i.default)(c[1]), S = e.utils.resolveId((0, r.returnBigInt)(u));
        u = S[0];
        const $ = S[1];
        if ($ === g.Api.PeerUser) return new g.Api.InputPeerUser({ userId: u, accessHash: _ });
        if ($ === g.Api.PeerChat) return new g.Api.InputPeerChat({ chatId: u });
        if ($ === g.Api.PeerChannel) return new g.Api.InputPeerChannel({ channelId: u, accessHash: _ });
      } else throw new Error("Could not find input entity with key " + a);
      throw new Error("Could not find input entity with key " + a);
    }
  }
  return on.MemorySession = s, on;
}
var ss = {}, is = {}, no;
function Ks() {
  if (no) return is;
  no = 1;
  var t = Le().Buffer;
  Object.defineProperty(is, "__esModule", { value: true }), is.AuthKey = void 0;
  const d = Ae(), g = Et(), i = Ae();
  let l = class qc {
    constructor(e, s) {
      if (!s || !e) return;
      this._key = e, this._hash = s;
      const n = new g.BinaryReader(s);
      this.auxHash = n.readLong(false), n.read(4), this.keyId = n.readLong(false);
    }
    async setKey(e) {
      if (!e) {
        this._key = this.auxHash = this.keyId = this._hash = void 0;
        return;
      }
      if (e instanceof qc) {
        this._key = e._key, this.auxHash = e.auxHash, this.keyId = e.keyId, this._hash = e._hash;
        return;
      }
      this._key = e, this._hash = await (0, d.sha1)(this._key);
      const s = new g.BinaryReader(this._hash);
      this.auxHash = s.readLong(false), s.read(4), this.keyId = s.readLong(false);
    }
    async waitForKey() {
      for (; !this.keyId; ) await (0, i.sleep)(20);
    }
    getKey() {
      return this._key;
    }
    async calcNewNonceHash(e, s) {
      if (this.auxHash) {
        const n = (0, d.toSignedLittleBuffer)(e, 32), a = t.alloc(1);
        a.writeUInt8(s, 0);
        const o = t.concat([n, t.concat([a, (0, d.readBufferFromBigInt)(this.auxHash, 8, true)])]), c = (await (0, d.sha1)(o)).slice(4, 20);
        return (0, d.readBigIntFromBuffer)(c, true, true);
      }
      throw new Error("Auth key not set");
    }
    equals(e) {
      var s;
      return e instanceof this.constructor && this._key && t.isBuffer(e.getKey()) && ((s = e.getKey()) === null || s === void 0 ? void 0 : s.equals(this._key));
    }
  };
  return is.AuthKey = l, is;
}
var so;
function f2e() {
  if (so) return ss;
  so = 1;
  var t = Le().Buffer;
  Object.defineProperty(ss, "__esModule", { value: true }), ss.StringSession = void 0;
  const d = Ki(), g = Et(), i = Ks(), l = "1";
  let r = class Oi extends d.MemorySession {
    constructor(s) {
      if (super(), s) {
        if (s[0] !== l) throw new Error("Not a valid string");
        s = s.slice(1);
        const n = Oi.decode(s), a = new g.BinaryReader(n);
        if (this._dcId = a.read(1).readUInt8(0), s.length == 352) {
          const o = a.read(4);
          this._serverAddress = o[0].toString() + "." + o[1].toString() + "." + o[2].toString() + "." + o[3].toString();
        } else {
          const o = a.read(2).readInt16BE(0);
          o > 100 ? (a.offset -= 2, this._serverAddress = a.read(16).toString("hex").match(/.{1,4}/g).map((c) => c.replace(/^0+/, "")).join(":").replace(/0000\:/g, ":").replace(/:{2,}/g, "::")) : this._serverAddress = a.read(o).toString();
        }
        this._port = a.read(2).readInt16BE(0), this._key = a.read(-1);
      }
    }
    static encode(s) {
      return s.toString("base64");
    }
    static decode(s) {
      return t.from(s, "base64");
    }
    async load() {
      this._key && (this._authKey = new i.AuthKey(), await this._authKey.setKey(this._key));
    }
    save() {
      if (!this.authKey || !this.serverAddress || !this.port) return "";
      const s = this.authKey.getKey();
      if (!s) return "";
      const n = t.from([this.dcId]), a = t.from(this.serverAddress), o = t.alloc(2);
      o.writeInt16BE(a.length, 0);
      const c = t.alloc(2);
      return c.writeInt16BE(this.port, 0), l + Oi.encode(t.concat([n, o, a, c, s]));
    }
  };
  return ss.StringSession = r, ss;
}
var cn = {}, Vs = { exports: {} };
var Ci = Vs.exports, io;
function p2e() {
  return io || (io = 1, (function(t) {
    (function(d, g) {
      var i = { version: "2.14.4", areas: {}, apis: {}, nsdelim: ".", inherit: function(r, e) {
        for (var s in r) e.hasOwnProperty(s) || Object.defineProperty(e, s, Object.getOwnPropertyDescriptor(r, s));
        return e;
      }, stringify: function(r, e) {
        return r === void 0 || typeof r == "function" ? r + "" : JSON.stringify(r, e || i.replace);
      }, parse: function(r, e) {
        try {
          return JSON.parse(r, e || i.revive);
        } catch {
          return r;
        }
      }, fn: function(r, e) {
        i.storeAPI[r] = e;
        for (var s in i.apis) i.apis[s][r] = e;
      }, get: function(r, e) {
        return r.getItem(e);
      }, set: function(r, e, s) {
        r.setItem(e, s);
      }, remove: function(r, e) {
        r.removeItem(e);
      }, key: function(r, e) {
        return r.key(e);
      }, length: function(r) {
        return r.length;
      }, clear: function(r) {
        r.clear();
      }, Store: function(r, e, s) {
        var n = i.inherit(i.storeAPI, function(o, c, u) {
          return arguments.length === 0 ? n.getAll() : typeof c == "function" ? n.transact(o, c, u) : c !== void 0 ? n.set(o, c, u) : typeof o == "string" || typeof o == "number" ? n.get(o) : typeof o == "function" ? n.each(o) : o ? n.setAll(o, c) : n.clear();
        });
        n._id = r;
        try {
          var a = "__store2_test";
          e.setItem(a, "ok"), n._area = e, e.removeItem(a);
        } catch {
          n._area = i.storage("fake");
        }
        return n._ns = s || "", i.areas[r] || (i.areas[r] = n._area), i.apis[n._ns + n._id] || (i.apis[n._ns + n._id] = n), n;
      }, storeAPI: { area: function(r, e) {
        var s = this[r];
        return (!s || !s.area) && (s = i.Store(r, e, this._ns), this[r] || (this[r] = s)), s;
      }, namespace: function(r, e, s) {
        if (s = s || this._delim || i.nsdelim, !r) return this._ns ? this._ns.substring(0, this._ns.length - s.length) : "";
        var n = r, a = this[n];
        if ((!a || !a.namespace) && (a = i.Store(this._id, this._area, this._ns + n + s), a._delim = s, this[n] || (this[n] = a), !e)) for (var o in i.areas) a.area(o, i.areas[o]);
        return a;
      }, isFake: function(r) {
        return r ? (this._real = this._area, this._area = i.storage("fake")) : r === false && (this._area = this._real || this._area), this._area.name === "fake";
      }, toString: function() {
        return "store" + (this._ns ? "." + this.namespace() : "") + "[" + this._id + "]";
      }, has: function(r) {
        return this._area.has ? this._area.has(this._in(r)) : this._in(r) in this._area;
      }, size: function() {
        return this.keys().length;
      }, each: function(r, e) {
        for (var s = 0, n = i.length(this._area); s < n; s++) {
          var a = this._out(i.key(this._area, s));
          if (a !== void 0 && r.call(this, a, this.get(a), e) === false) break;
          n > i.length(this._area) && (n--, s--);
        }
        return e || this;
      }, keys: function(r) {
        return this.each(function(e, s, n) {
          n.push(e);
        }, r || []);
      }, get: function(r, e) {
        var s = i.get(this._area, this._in(r)), n;
        return typeof e == "function" && (n = e, e = null), s !== null ? i.parse(s, n) : e ?? s;
      }, getAll: function(r) {
        return this.each(function(e, s, n) {
          n[e] = s;
        }, r || {});
      }, transact: function(r, e, s) {
        var n = this.get(r, s), a = e(n);
        return this.set(r, a === void 0 ? n : a), this;
      }, set: function(r, e, s) {
        var n = this.get(r), a;
        return n != null && s === false ? e : (typeof s == "function" && (a = s, s = void 0), i.set(this._area, this._in(r), i.stringify(e, a), s) || n);
      }, setAll: function(r, e) {
        var s, n;
        for (var a in r) n = r[a], this.set(a, n, e) !== n && (s = true);
        return s;
      }, add: function(r, e, s) {
        var n = this.get(r);
        if (n instanceof Array) e = n.concat(e);
        else if (n !== null) {
          var a = typeof n;
          if (a === typeof e && a === "object") {
            for (var o in e) n[o] = e[o];
            e = n;
          } else e = n + e;
        }
        return i.set(this._area, this._in(r), i.stringify(e, s)), e;
      }, remove: function(r, e) {
        var s = this.get(r, e);
        return i.remove(this._area, this._in(r)), s;
      }, clear: function() {
        return this._ns ? this.each(function(r) {
          i.remove(this._area, this._in(r));
        }, 1) : i.clear(this._area), this;
      }, clearAll: function() {
        var r = this._area;
        for (var e in i.areas) i.areas.hasOwnProperty(e) && (this._area = i.areas[e], this.clear());
        return this._area = r, this;
      }, _in: function(r) {
        return typeof r != "string" && (r = i.stringify(r)), this._ns ? this._ns + r : r;
      }, _out: function(r) {
        return this._ns ? r && r.indexOf(this._ns) === 0 ? r.substring(this._ns.length) : void 0 : r;
      } }, storage: function(r) {
        return i.inherit(i.storageAPI, { items: {}, name: r });
      }, storageAPI: { length: 0, has: function(r) {
        return this.items.hasOwnProperty(r);
      }, key: function(r) {
        var e = 0;
        for (var s in this.items) if (this.has(s) && r === e++) return s;
      }, setItem: function(r, e) {
        this.has(r) || this.length++, this.items[r] = e;
      }, removeItem: function(r) {
        this.has(r) && (delete this.items[r], this.length--);
      }, getItem: function(r) {
        return this.has(r) ? this.items[r] : null;
      }, clear: function() {
        for (var r in this.items) this.removeItem(r);
      } } }, l = i.Store("local", (function() {
        try {
          return localStorage;
        } catch {
        }
      })());
      l.local = l, l._ = i, l.area("session", (function() {
        try {
          return sessionStorage;
        } catch {
        }
      })()), l.area("page", i.storage("page")), typeof g == "function" && g.amd !== void 0 ? g("store2", [], function() {
        return l;
      }) : t.exports ? t.exports = l : (d.store && (i.conflict = d.store), d.store = l);
    })(Ci, Ci && Ci.define);
  })(Vs)), Vs.exports;
}
var rs = {}, An = {}, as = { exports: {} }, xi, ro;
function g2e() {
  if (ro) return xi;
  ro = 1;
  var t = {}, d = Bt, g = process.cwd, i = null, l = t.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return i || (i = g.call(process)), i;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var r = process.chdir;
    process.chdir = function(s) {
      i = null, r.call(process, s);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, r);
  }
  xi = e;
  function e(s) {
    d.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && n(s), s.lutimes || a(s), s.chown = u(s.chown), s.fchown = u(s.fchown), s.lchown = u(s.lchown), s.chmod = o(s.chmod), s.fchmod = o(s.fchmod), s.lchmod = o(s.lchmod), s.chownSync = _(s.chownSync), s.fchownSync = _(s.fchownSync), s.lchownSync = _(s.lchownSync), s.chmodSync = c(s.chmodSync), s.fchmodSync = c(s.fchmodSync), s.lchmodSync = c(s.lchmodSync), s.stat = S(s.stat), s.fstat = S(s.fstat), s.lstat = S(s.lstat), s.statSync = $(s.statSync), s.fstatSync = $(s.fstatSync), s.lstatSync = $(s.lstatSync), s.chmod && !s.lchmod && (s.lchmod = function(h, I, b) {
      b && process.nextTick(b);
    }, s.lchmodSync = function() {
    }), s.chown && !s.lchown && (s.lchown = function(h, I, b, f) {
      f && process.nextTick(f);
    }, s.lchownSync = function() {
    }), l === "win32" && (s.rename = typeof s.rename != "function" ? s.rename : (function(h) {
      function I(b, f, p) {
        var w = Date.now(), M = 0;
        h(b, f, function T(k) {
          if (k && (k.code === "EACCES" || k.code === "EPERM" || k.code === "EBUSY") && Date.now() - w < 6e4) {
            setTimeout(function() {
              s.stat(f, function(B, C) {
                B && B.code === "ENOENT" ? h(b, f, T) : p(k);
              });
            }, M), M < 100 && (M += 10);
            return;
          }
          p && p(k);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(I, h), I;
    })(s.rename)), s.read = typeof s.read != "function" ? s.read : (function(h) {
      function I(b, f, p, w, M, T) {
        var k;
        if (T && typeof T == "function") {
          var B = 0;
          k = function(C, E, q) {
            if (C && C.code === "EAGAIN" && B < 10) return B++, h.call(s, b, f, p, w, M, k);
            T.apply(this, arguments);
          };
        }
        return h.call(s, b, f, p, w, M, k);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(I, h), I;
    })(s.read), s.readSync = typeof s.readSync != "function" ? s.readSync : /* @__PURE__ */ (function(h) {
      return function(I, b, f, p, w) {
        for (var M = 0; ; ) try {
          return h.call(s, I, b, f, p, w);
        } catch (T) {
          if (T.code === "EAGAIN" && M < 10) {
            M++;
            continue;
          }
          throw T;
        }
      };
    })(s.readSync);
    function n(h) {
      h.lchmod = function(I, b, f) {
        h.open(I, d.O_WRONLY | d.O_SYMLINK, b, function(p, w) {
          if (p) {
            f && f(p);
            return;
          }
          h.fchmod(w, b, function(M) {
            h.close(w, function(T) {
              f && f(M || T);
            });
          });
        });
      }, h.lchmodSync = function(I, b) {
        var f = h.openSync(I, d.O_WRONLY | d.O_SYMLINK, b), p = true, w;
        try {
          w = h.fchmodSync(f, b), p = false;
        } finally {
          if (p) try {
            h.closeSync(f);
          } catch {
          }
          else h.closeSync(f);
        }
        return w;
      };
    }
    function a(h) {
      d.hasOwnProperty("O_SYMLINK") && h.futimes ? (h.lutimes = function(I, b, f, p) {
        h.open(I, d.O_SYMLINK, function(w, M) {
          if (w) {
            p && p(w);
            return;
          }
          h.futimes(M, b, f, function(T) {
            h.close(M, function(k) {
              p && p(T || k);
            });
          });
        });
      }, h.lutimesSync = function(I, b, f) {
        var p = h.openSync(I, d.O_SYMLINK), w, M = true;
        try {
          w = h.futimesSync(p, b, f), M = false;
        } finally {
          if (M) try {
            h.closeSync(p);
          } catch {
          }
          else h.closeSync(p);
        }
        return w;
      }) : h.futimes && (h.lutimes = function(I, b, f, p) {
        p && process.nextTick(p);
      }, h.lutimesSync = function() {
      });
    }
    function o(h) {
      return h && function(I, b, f) {
        return h.call(s, I, b, function(p) {
          m(p) && (p = null), f && f.apply(this, arguments);
        });
      };
    }
    function c(h) {
      return h && function(I, b) {
        try {
          return h.call(s, I, b);
        } catch (f) {
          if (!m(f)) throw f;
        }
      };
    }
    function u(h) {
      return h && function(I, b, f, p) {
        return h.call(s, I, b, f, function(w) {
          m(w) && (w = null), p && p.apply(this, arguments);
        });
      };
    }
    function _(h) {
      return h && function(I, b, f) {
        try {
          return h.call(s, I, b, f);
        } catch (p) {
          if (!m(p)) throw p;
        }
      };
    }
    function S(h) {
      return h && function(I, b, f) {
        typeof b == "function" && (f = b, b = null);
        function p(w, M) {
          M && (M.uid < 0 && (M.uid += 4294967296), M.gid < 0 && (M.gid += 4294967296)), f && f.apply(this, arguments);
        }
        return b ? h.call(s, I, b, p) : h.call(s, I, p);
      };
    }
    function $(h) {
      return h && function(I, b) {
        var f = b ? h.call(s, I, b) : h.call(s, I);
        return f && (f.uid < 0 && (f.uid += 4294967296), f.gid < 0 && (f.gid += 4294967296)), f;
      };
    }
    function m(h) {
      if (!h || h.code === "ENOSYS") return true;
      var I = !process.getuid || process.getuid() !== 0;
      return !!(I && (h.code === "EINVAL" || h.code === "EPERM"));
    }
  }
  return xi;
}
var Ei, ao;
function h2e() {
  if (ao) return Ei;
  ao = 1;
  var t = Bt.Stream;
  Ei = d;
  function d(g) {
    return { ReadStream: i, WriteStream: l };
    function i(r, e) {
      if (!(this instanceof i)) return new i(r, e);
      t.call(this);
      var s = this;
      this.path = r, this.fd = null, this.readable = true, this.paused = false, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, e = e || {};
      for (var n = Object.keys(e), a = 0, o = n.length; a < o; a++) {
        var c = n[a];
        this[c] = e[c];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number") throw TypeError("start must be a Number");
        if (this.end === void 0) this.end = 1 / 0;
        else if (typeof this.end != "number") throw TypeError("end must be a Number");
        if (this.start > this.end) throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          s._read();
        });
        return;
      }
      g.open(this.path, this.flags, this.mode, function(u, _) {
        if (u) {
          s.emit("error", u), s.readable = false;
          return;
        }
        s.fd = _, s.emit("open", _), s._read();
      });
    }
    function l(r, e) {
      if (!(this instanceof l)) return new l(r, e);
      t.call(this), this.path = r, this.fd = null, this.writable = true, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, e = e || {};
      for (var s = Object.keys(e), n = 0, a = s.length; n < a; n++) {
        var o = s[n];
        this[o] = e[o];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number") throw TypeError("start must be a Number");
        if (this.start < 0) throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = false, this._queue = [], this.fd === null && (this._open = g.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Ei;
}
var Mi, oo;
function m2e() {
  if (oo) return Mi;
  oo = 1, Mi = d;
  var t = Object.getPrototypeOf || function(g) {
    return g.__proto__;
  };
  function d(g) {
    if (g === null || typeof g != "object") return g;
    if (g instanceof Object) var i = { __proto__: t(g) };
    else var i = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(g).forEach(function(l) {
      Object.defineProperty(i, l, Object.getOwnPropertyDescriptor(g, l));
    }), i;
  }
  return Mi;
}
var Ds, co;
function _2e() {
  if (co) return Ds;
  co = 1;
  var t = {}, d = Bt, g = g2e(), i = h2e(), l = m2e(), r = Bt, e, s;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (e = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), s = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (e = "___graceful-fs.queue", s = "___graceful-fs.previous");
  function n() {
  }
  function a(h, I) {
    Object.defineProperty(h, e, { get: function() {
      return I;
    } });
  }
  var o = n;
  if (r.debuglog ? o = r.debuglog("gfs4") : /\bgfs4\b/i.test(t.NODE_DEBUG || "") && (o = function() {
    var h = r.format.apply(r, arguments);
    h = "GFS4: " + h.split(/\n/).join(`
GFS4: `), console.error(h);
  }), !d[e]) {
    var c = Zs[e] || [];
    a(d, c), d.close = (function(h) {
      function I(b, f) {
        return h.call(d, b, function(p) {
          p || $(), typeof f == "function" && f.apply(this, arguments);
        });
      }
      return Object.defineProperty(I, s, { value: h }), I;
    })(d.close), d.closeSync = (function(h) {
      function I(b) {
        h.apply(d, arguments), $();
      }
      return Object.defineProperty(I, s, { value: h }), I;
    })(d.closeSync), /\bgfs4\b/i.test(t.NODE_DEBUG || "") && process.on("exit", function() {
      o(d[e]), Bt.equal(d[e].length, 0);
    });
  }
  Zs[e] || a(Zs, d[e]), Ds = u(l(d)), t.TEST_GRACEFUL_FS_GLOBAL_PATCH && !d.__patched && (Ds = u(d), d.__patched = true);
  function u(h) {
    g(h), h.gracefulify = u, h.createReadStream = K, h.createWriteStream = F;
    var I = h.readFile;
    h.readFile = b;
    function b(Y, Q, se) {
      return typeof Q == "function" && (se = Q, Q = null), ge(Y, Q, se);
      function ge(ue, ce, ye, v) {
        return I(ue, ce, function(le) {
          le && (le.code === "EMFILE" || le.code === "ENFILE") ? _([ge, [ue, ce, ye], le, v || Date.now(), Date.now()]) : typeof ye == "function" && ye.apply(this, arguments);
        });
      }
    }
    var f = h.writeFile;
    h.writeFile = p;
    function p(Y, Q, se, ge) {
      return typeof se == "function" && (ge = se, se = null), ue(Y, Q, se, ge);
      function ue(ce, ye, v, le, ve) {
        return f(ce, ye, v, function(we) {
          we && (we.code === "EMFILE" || we.code === "ENFILE") ? _([ue, [ce, ye, v, le], we, ve || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var w = h.appendFile;
    w && (h.appendFile = M);
    function M(Y, Q, se, ge) {
      return typeof se == "function" && (ge = se, se = null), ue(Y, Q, se, ge);
      function ue(ce, ye, v, le, ve) {
        return w(ce, ye, v, function(we) {
          we && (we.code === "EMFILE" || we.code === "ENFILE") ? _([ue, [ce, ye, v, le], we, ve || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var T = h.copyFile;
    T && (h.copyFile = k);
    function k(Y, Q, se, ge) {
      return typeof se == "function" && (ge = se, se = 0), ue(Y, Q, se, ge);
      function ue(ce, ye, v, le, ve) {
        return T(ce, ye, v, function(we) {
          we && (we.code === "EMFILE" || we.code === "ENFILE") ? _([ue, [ce, ye, v, le], we, ve || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var B = h.readdir;
    h.readdir = E;
    var C = /^v[0-5]\./;
    function E(Y, Q, se) {
      typeof Q == "function" && (se = Q, Q = null);
      var ge = C.test(process.version) ? function(ye, v, le, ve) {
        return B(ye, ue(ye, v, le, ve));
      } : function(ye, v, le, ve) {
        return B(ye, v, ue(ye, v, le, ve));
      };
      return ge(Y, Q, se);
      function ue(ce, ye, v, le) {
        return function(ve, we) {
          ve && (ve.code === "EMFILE" || ve.code === "ENFILE") ? _([ge, [ce, ye, v], ve, le || Date.now(), Date.now()]) : (we && we.sort && we.sort(), typeof v == "function" && v.call(this, ve, we));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var q = i(h);
      he = q.ReadStream, U = q.WriteStream;
    }
    var W = h.ReadStream;
    W && (he.prototype = Object.create(W.prototype), he.prototype.open = H);
    var G = h.WriteStream;
    G && (U.prototype = Object.create(G.prototype), U.prototype.open = V), Object.defineProperty(h, "ReadStream", { get: function() {
      return he;
    }, set: function(Y) {
      he = Y;
    }, enumerable: true, configurable: true }), Object.defineProperty(h, "WriteStream", { get: function() {
      return U;
    }, set: function(Y) {
      U = Y;
    }, enumerable: true, configurable: true });
    var te = he;
    Object.defineProperty(h, "FileReadStream", { get: function() {
      return te;
    }, set: function(Y) {
      te = Y;
    }, enumerable: true, configurable: true });
    var oe = U;
    Object.defineProperty(h, "FileWriteStream", { get: function() {
      return oe;
    }, set: function(Y) {
      oe = Y;
    }, enumerable: true, configurable: true });
    function he(Y, Q) {
      return this instanceof he ? (W.apply(this, arguments), this) : he.apply(Object.create(he.prototype), arguments);
    }
    function H() {
      var Y = this;
      ee(Y.path, Y.flags, Y.mode, function(Q, se) {
        Q ? (Y.autoClose && Y.destroy(), Y.emit("error", Q)) : (Y.fd = se, Y.emit("open", se), Y.read());
      });
    }
    function U(Y, Q) {
      return this instanceof U ? (G.apply(this, arguments), this) : U.apply(Object.create(U.prototype), arguments);
    }
    function V() {
      var Y = this;
      ee(Y.path, Y.flags, Y.mode, function(Q, se) {
        Q ? (Y.destroy(), Y.emit("error", Q)) : (Y.fd = se, Y.emit("open", se));
      });
    }
    function K(Y, Q) {
      return new h.ReadStream(Y, Q);
    }
    function F(Y, Q) {
      return new h.WriteStream(Y, Q);
    }
    var R = h.open;
    h.open = ee;
    function ee(Y, Q, se, ge) {
      return typeof se == "function" && (ge = se, se = null), ue(Y, Q, se, ge);
      function ue(ce, ye, v, le, ve) {
        return R(ce, ye, v, function(we, De) {
          we && (we.code === "EMFILE" || we.code === "ENFILE") ? _([ue, [ce, ye, v, le], we, ve || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    return h;
  }
  function _(h) {
    o("ENQUEUE", h[0].name, h[1]), d[e].push(h), m();
  }
  var S;
  function $() {
    for (var h = Date.now(), I = 0; I < d[e].length; ++I) d[e][I].length > 2 && (d[e][I][3] = h, d[e][I][4] = h);
    m();
  }
  function m() {
    if (clearTimeout(S), S = void 0, d[e].length !== 0) {
      var h = d[e].shift(), I = h[0], b = h[1], f = h[2], p = h[3], w = h[4];
      if (p === void 0) o("RETRY", I.name, b), I.apply(null, b);
      else if (Date.now() - p >= 6e4) {
        o("TIMEOUT", I.name, b);
        var M = b.pop();
        typeof M == "function" && M.call(null, f);
      } else {
        var T = Date.now() - w, k = Math.max(w - p, 1), B = Math.min(k * 1.2, 100);
        T >= B ? (o("RETRY", I.name, b), I.apply(null, b.concat([p]))) : d[e].push(h);
      }
      S === void 0 && (S = setTimeout(m, 0));
    }
  }
  return Ds;
}
var os = {}, $i, lo;
function b2e() {
  if (lo) return $i;
  lo = 1, $i = t;
  function t() {
    var d = Array.prototype.slice.call(arguments), g = d.shift() || [], i = d.pop();
    if (typeof i != "function") throw new Error("No callback provided to asyncMap");
    if (!g) return i(null, []);
    Array.isArray(g) || (g = [g]);
    var l = d.length, r = [], e = null, s = g.length, n = s * l;
    if (!n) return i(null, []);
    function a(o) {
      o && !e && (e = o);
      for (var c = arguments.length, u = 1; u < c; u++) arguments[u] !== void 0 && (r[u - 1] = (r[u - 1] || []).concat(arguments[u]));
      if (g.length > s) {
        var _ = g.slice(s);
        n += (g.length - s) * l, s = g.length, process.nextTick(function() {
          _.forEach(function(S) {
            d.forEach(function($) {
              $(S, a);
            });
          });
        });
      }
      --n === 0 && i.apply(null, [e].concat(r));
    }
    g.forEach(function(o) {
      d.forEach(function(c) {
        c(o, a);
      });
    });
  }
  return $i;
}
var ki, uo;
function Uc() {
  if (uo) return ki;
  uo = 1, ki = t;
  function t() {
    var d = Array.prototype.slice.call(arguments), g = null, i;
    return typeof d[0] == "object" ? (g = d.shift(), i = d.shift(), typeof i == "string" && (i = g[i])) : i = d.shift(), function(l) {
      i.apply(g, d.concat(l));
    };
  }
  return ki;
}
var Ri, fo;
function v2e() {
  if (fo) return Ri;
  fo = 1, Ri = d;
  var t = Uc();
  d.first = {}, d.last = {};
  function d(g, i) {
    var l = [];
    (function r(e, s) {
      if (e >= s) return i(null, l);
      if (Array.isArray(g[e]) && (g[e] = t.apply(null, g[e].map(function(n) {
        return n === d.first ? l[0] : n === d.last ? l[l.length - 1] : n;
      }))), !g[e]) return r(e + 1, s);
      g[e](function(n, a) {
        if (n) return i(n, l);
        a !== void 0 && (l = l.concat(a)), r(e + 1, s);
      });
    })(0, g.length);
  }
  return Ri;
}
var po;
function y2e() {
  return po || (po = 1, os.asyncMap = b2e(), os.bindActor = Uc(), os.chain = v2e()), os;
}
var Ti = { exports: {} };
var go;
function w2e() {
  return go || (go = 1, (function(t) {
    (function() {
      var d;
      function g(i, l) {
        var r = this instanceof g ? this : d;
        if (r.reset(l), typeof i == "string" && i.length > 0 && r.hash(i), r !== this) return r;
      }
      g.prototype.hash = function(i) {
        var l, r, e, s, n;
        switch (n = i.length, this.len += n, r = this.k1, e = 0, this.rem) {
          case 0:
            r ^= n > e ? i.charCodeAt(e++) & 65535 : 0;
          case 1:
            r ^= n > e ? (i.charCodeAt(e++) & 65535) << 8 : 0;
          case 2:
            r ^= n > e ? (i.charCodeAt(e++) & 65535) << 16 : 0;
          case 3:
            r ^= n > e ? (i.charCodeAt(e) & 255) << 24 : 0, r ^= n > e ? (i.charCodeAt(e++) & 65280) >> 8 : 0;
        }
        if (this.rem = n + this.rem & 3, n -= this.rem, n > 0) {
          for (l = this.h1; r = r * 11601 + (r & 65535) * 3432906752 & 4294967295, r = r << 15 | r >>> 17, r = r * 13715 + (r & 65535) * 461832192 & 4294967295, l ^= r, l = l << 13 | l >>> 19, l = l * 5 + 3864292196 & 4294967295, !(e >= n); ) r = i.charCodeAt(e++) & 65535 ^ (i.charCodeAt(e++) & 65535) << 8 ^ (i.charCodeAt(e++) & 65535) << 16, s = i.charCodeAt(e++), r ^= (s & 255) << 24 ^ (s & 65280) >> 8;
          switch (r = 0, this.rem) {
            case 3:
              r ^= (i.charCodeAt(e + 2) & 65535) << 16;
            case 2:
              r ^= (i.charCodeAt(e + 1) & 65535) << 8;
            case 1:
              r ^= i.charCodeAt(e) & 65535;
          }
          this.h1 = l;
        }
        return this.k1 = r, this;
      }, g.prototype.result = function() {
        var i, l;
        return i = this.k1, l = this.h1, i > 0 && (i = i * 11601 + (i & 65535) * 3432906752 & 4294967295, i = i << 15 | i >>> 17, i = i * 13715 + (i & 65535) * 461832192 & 4294967295, l ^= i), l ^= this.len, l ^= l >>> 16, l = l * 51819 + (l & 65535) * 2246770688 & 4294967295, l ^= l >>> 13, l = l * 44597 + (l & 65535) * 3266445312 & 4294967295, l ^= l >>> 16, l >>> 0;
      }, g.prototype.reset = function(i) {
        return this.h1 = typeof i == "number" ? i : 0, this.rem = this.k1 = this.len = 0, this;
      }, d = new g(), t.exports = g;
    })();
  })(Ti)), Ti.exports;
}
var ho;
function S2e() {
  if (ho) return as.exports;
  ho = 1, as.exports = e, as.exports.sync = n, as.exports._getTmpname = r;
  var t = _2e(), d = y2e().chain, g = w2e(), i = Object.assign || Bt._extend, l = 0;
  function r(a) {
    return a + "." + g(__filename).hash(String(process.pid)).hash(String(++l)).result();
  }
  function e(a, o, c, u) {
    c instanceof Function && (u = c, c = null), c || (c = {}), t.realpath(a, function(_, S) {
      s(S || a, o, c, u);
    });
  }
  function s(a, o, c, u) {
    var _ = r(a);
    if (c.mode && c.chown) return S();
    return t.stat(a, function(m, h) {
      return m || !h || (c = i({}, c), c.mode || (c.mode = h.mode), !c.chown && process.getuid && (c.chown = { uid: h.uid, gid: h.gid })), S();
    });
    function S() {
      d([[$, _, o, c.mode, c.encoding || "utf8"], c.chown && [t, t.chown, _, c.chown.uid, c.chown.gid], c.mode && [t, t.chmod, _, c.mode], [t, t.rename, _, a]], function(m) {
        m ? t.unlink(_, function() {
          u(m);
        }) : u();
      });
    }
    function $(m, h, I, b, f) {
      t.open(m, "w", c.mode, function(p, w) {
        if (p) return f(p);
        if (Buffer.isBuffer(h)) return t.write(w, h, 0, h.length, 0, M);
        return h != null ? t.write(w, String(h), 0, String(b), M) : M();
        function M(T) {
          if (T) return f(T);
          t.fsync(w, function(k) {
            if (k) return f(k);
            t.close(w, f);
          });
        }
      });
    }
  }
  function n(a, o, c) {
    c || (c = {});
    try {
      a = t.realpathSync(a);
    } catch {
    }
    var u = r(a);
    try {
      if (!c.mode || !c.chown) try {
        var _ = t.statSync(a);
        c = i({}, c), c.mode || (c.mode = _.mode), !c.chown && process.getuid && (c.chown = { uid: _.uid, gid: _.gid });
      } catch {
      }
      var S = t.openSync(u, "w", c.mode);
      Buffer.isBuffer(o) ? t.writeSync(S, o, 0, o.length, 0) : o != null && t.writeSync(S, String(o), 0, String(c.encoding || "utf8")), t.fsyncSync(S), t.closeSync(S), c.chown && t.chownSync(u, c.chown.uid, c.chown.gid), c.mode && t.chmodSync(u, c.mode), t.renameSync(u, a);
    } catch ($) {
      try {
        t.unlinkSync(u);
      } catch {
      }
      throw $;
    }
  }
  return as.exports;
}
var mo;
function I2e() {
  return mo || (mo = 1, (function() {
    var t, d, g, i, l, r, e, s, n, a, o, c, u, _, S = function(m, h) {
      for (var I in h) $.call(h, I) && (m[I] = h[I]);
      function b() {
        this.constructor = m;
      }
      return b.prototype = h.prototype, m.prototype = new b(), m.__super__ = h.prototype, m;
    }, $ = {}.hasOwnProperty;
    u = Bt, c = Bt, o = Bt, _ = S2e().sync, d = "---.EMPTY_STRING.---", e = function(m) {
      var h, I, b, f, p;
      for (f = c.readdirSync(m), p = [], h = 0, I = f.length; h < I; h++) b = f[h], p.push(n(u.join(m, b)));
      return p;
    }, n = function(m) {
      return c.statSync(m).isDirectory() ? (e(m), c.rmdirSync(m)) : c.unlinkSync(m);
    }, s = function(m) {
      var h;
      return m === "" ? h = d : h = "" + m, h;
    }, l = (function(m) {
      S(h, m);
      function h(I) {
        this.message = I ?? "Unknown error.", h.__super__.constructor.call(this), Error.captureStackTrace != null && Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name;
      }
      return h.prototype.toString = function() {
        return this.name + ": " + this.message;
      }, h;
    })(Error), r = /* @__PURE__ */ (function() {
      function m(h, I, b, f, p) {
        this.key = h, this.oldValue = I, this.newValue = b, this.url = f, this.storageArea = p ?? "localStorage";
      }
      return m;
    })(), i = /* @__PURE__ */ (function() {
      function m(h, I) {
        if (this.key = h, this.index = I, !(this instanceof m)) return new m(this.key, this.index);
      }
      return m;
    })(), a = function() {
      var m;
      return m = function() {
      }, m.prototype = /* @__PURE__ */ Object.create(null), new m();
    }, g = (function(m) {
      var h;
      S(I, m), h = {};
      function I(b, f) {
        var p;
        return this._location = b, this.quota = f ?? 5 * 1024 * 1024, I.__super__.constructor.call(this), this instanceof I ? (this._location = u.resolve(this._location), h[this._location] != null ? h[this._location] : (this.length = 0, this._bytesInUse = 0, this._keys = [], this._metaKeyMap = a(), this._eventUrl = "pid:" + process.pid, this._init(), this._QUOTA_EXCEEDED_ERR = l, typeof Proxy < "u" && Proxy !== null ? (p = { set: /* @__PURE__ */ (function(w) {
          return function(M, T, k) {
            return w[T] != null ? w[T] = k : w.setItem(T, k);
          };
        })(this), get: /* @__PURE__ */ (function(w) {
          return function(M, T) {
            return w[T] != null ? w[T] : w.getItem(T);
          };
        })(this) }, h[this._location] = new Proxy(this, p), h[this._location]) : (h[this._location] = this, h[this._location]))) : new I(this._location, this.quota);
      }
      return I.prototype._init = function() {
        var b, f, p, w, M, T, k, B, C;
        try {
          if (C = c.statSync(this._location), C != null && !C.isDirectory()) throw new Error("A file exists at the location '" + this._location + "' when trying to create/open localStorage");
          for (this._bytesInUse = 0, this.length = 0, p = c.readdirSync(this._location), T = M = 0, B = p.length; M < B; T = ++M) k = p[T], f = decodeURIComponent(k), this._keys.push(f), b = new i(k, T), this._metaKeyMap[f] = b, C = this._getStat(k), (C == null ? void 0 : C.size) != null && (b.size = C.size, this._bytesInUse += C.size);
          this.length = p.length;
        } catch (E) {
          if (w = E, w.code !== "ENOENT") throw w;
          try {
            c.mkdirSync(this._location, { recursive: true });
          } catch (q) {
            if (w = q, w.code !== "EEXIST") throw w;
          }
        }
      }, I.prototype.setItem = function(b, f) {
        var p, w, M, T, k, B, C, E, q, W;
        if (k = this.listenerCount("storage"), E = null, k && (E = this.getItem(b)), b = s(b), p = encodeURIComponent(b).replace(/[!'()]/g, escape).replace(/\*/g, "%2A"), T = u.join(this._location, p), q = "" + f, W = q.length, B = this._metaKeyMap[b], M = !!B, M ? C = B.size : C = 0, this._bytesInUse - C + W > this.quota) throw new l();
        if (_(T, q, { encoding: "utf8" }), M || (B = new i(p, this._keys.push(b) - 1), B.size = W, this._metaKeyMap[b] = B, this.length += 1, this._bytesInUse += W), k) return w = new r(b, E, f, this._eventUrl), this.emit("storage", w);
      }, I.prototype.getItem = function(b) {
        var f, p;
        return b = s(b), p = this._metaKeyMap[b], p ? (f = u.join(this._location, p.key), c.readFileSync(f, "utf8")) : null;
      }, I.prototype._getStat = function(b) {
        var f;
        b = s(b), f = u.join(this._location, encodeURIComponent(b));
        try {
          return c.statSync(f);
        } catch {
          return null;
        }
      }, I.prototype.removeItem = function(b) {
        var f, p, w, M, T, k, B, C;
        if (b = s(b), k = this._metaKeyMap[b], k) {
          w = this.listenerCount("storage"), B = null, w && (B = this.getItem(b)), delete this._metaKeyMap[b], this.length -= 1, this._bytesInUse -= k.size, p = u.join(this._location, k.key), this._keys.splice(k.index, 1), C = this._metaKeyMap;
          for (M in C) C[M], T = this._metaKeyMap[M], T.index > k.index && (T.index -= 1);
          if (n(p), w) return f = new r(b, B, null, this._eventUrl), this.emit("storage", f);
        }
      }, I.prototype.key = function(b) {
        var f;
        return f = this._keys[b], f === d ? "" : f;
      }, I.prototype.clear = function() {
        var b;
        if (e(this._location), this._metaKeyMap = a(), this._keys = [], this.length = 0, this._bytesInUse = 0, this.listenerCount("storage")) return b = new r(null, null, null, this._eventUrl), this.emit("storage", b);
      }, I.prototype._getBytesInUse = function() {
        return this._bytesInUse;
      }, I.prototype._deleteLocation = function() {
        return delete h[this._location], n(this._location), this._metaKeyMap = {}, this._keys = [], this.length = 0, this._bytesInUse = 0;
      }, I;
    })(o.EventEmitter), t = (function(m) {
      S(h, m);
      function h() {
        return h.__super__.constructor.apply(this, arguments);
      }
      return h.prototype.setItem = function(I, b) {
        var f;
        return f = JSON.stringify(b), h.__super__.setItem.call(this, I, f);
      }, h.prototype.getItem = function(I) {
        return JSON.parse(h.__super__.getItem.call(this, I));
      }, h;
    })(g), An.LocalStorage = g, An.JSONStorage = t, An.QUOTA_EXCEEDED_ERR = l;
  }).call(An)), An;
}
var _o;
function P2e() {
  return _o || (_o = 1, Object.defineProperty(rs, "__esModule", { value: true }), rs.LocalStorage = void 0, rs.LocalStorage = I2e().LocalStorage), rs;
}
var bo;
function A2e() {
  if (bo) return cn;
  bo = 1;
  var t = Le().Buffer, d = cn && cn.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(cn, "__esModule", { value: true }), cn.StoreSession = void 0;
  const g = Ki(), i = d(p2e()), l = Ks();
  let r = class extends g.MemorySession {
    constructor(s, n = ":") {
      if (super(), s === "session") throw new Error("Session name can't be 'session'. Please use a different name.");
      if (typeof localStorage > "u" || localStorage === null) {
        const a = P2e().LocalStorage;
        this.store = i.default.area(s, new a("./" + s));
      } else this.store = i.default.area(s, localStorage);
      n == null && (n = ":"), this.sessionName = s + n;
    }
    async load() {
      let s = this.store.get(this.sessionName + "authKey");
      s && typeof s == "object" && (this._authKey = new l.AuthKey(), "data" in s && (s = t.from(s.data)), await this._authKey.setKey(s));
      const n = this.store.get(this.sessionName + "dcId");
      n && (this._dcId = n);
      const a = this.store.get(this.sessionName + "port");
      a && (this._port = a);
      const o = this.store.get(this.sessionName + "serverAddress");
      o && (this._serverAddress = o);
    }
    setDC(s, n, a) {
      this.store.set(this.sessionName + "dcId", s), this.store.set(this.sessionName + "port", a), this.store.set(this.sessionName + "serverAddress", n), super.setDC(s, n, a);
    }
    set authKey(s) {
      this._authKey = s, this.store.set(this.sessionName + "authKey", s == null ? void 0 : s.getKey());
    }
    get authKey() {
      return this._authKey;
    }
    processEntities(s) {
      const n = this._entitiesToRows(s);
      if (n) for (const a of n) a.push((/* @__PURE__ */ new Date()).getTime().toString()), this.store.set(this.sessionName + a[0], a);
    }
    getEntityRowsById(s, n = true) {
      return this.store.get(this.sessionName + s.toString());
    }
  };
  return cn.StoreSession = r, cn;
}
var vo;
function Wi() {
  return vo || (vo = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.Session = t.StoreSession = t.StringSession = t.MemorySession = void 0;
    var d = Ki();
    Object.defineProperty(t, "MemorySession", { enumerable: true, get: function() {
      return d.MemorySession;
    } });
    var g = f2e();
    Object.defineProperty(t, "StringSession", { enumerable: true, get: function() {
      return g.StringSession;
    } });
    var i = A2e();
    Object.defineProperty(t, "StoreSession", { enumerable: true, get: function() {
      return i.StoreSession;
    } });
    var l = Dc();
    Object.defineProperty(t, "Session", { enumerable: true, get: function() {
      return l.Session;
    } });
  })(Ai)), Ai;
}
module.exports = { type() {
  return "Tauri";
}, release() {
  return "1.0";
} };
const C2e = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" })), x2e = Rn(C2e);
var ln = {}, yo;
function E2e() {
  if (yo) return ln;
  yo = 1;
  var t = ln && ln.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(ln, "__esModule", { value: true }), ln.EntityCache = void 0;
  const d = Xe(), g = Ae(), i = Oe(), l = t(Ke());
  class r {
    constructor() {
      this.cacheMap = /* @__PURE__ */ new Map();
    }
    add(s) {
      const n = [];
      if (!(0, g.isArrayLike)(s)) if (s != null && typeof s == "object" && ("chats" in s && n.push(...s.chats), "users" in s && n.push(...s.users), "user" in s && n.push(s.user)), n.length) s = n;
      else return;
      for (const a of s) try {
        const o = (0, d.getPeerId)(a);
        this.cacheMap.has(o.toString()) || this.cacheMap.set(o.toString(), (0, d.getInputPeer)(a));
      } catch {
      }
    }
    get(s) {
      if (s == null) throw new Error("No cached entity for the given key");
      if (s = (0, g.returnBigInt)(s), s.lesser(l.default.zero)) {
        let n;
        try {
          if (n = this.cacheMap.get((0, d.getPeerId)(s).toString()), n) return n;
        } catch {
          throw new Error("Invalid key will not have entity");
        }
      }
      for (const n of [i.Api.PeerUser, i.Api.PeerChat, i.Api.PeerChannel]) {
        const a = this.cacheMap.get((0, d.getPeerId)(new n({ userId: s, chatId: s, channelId: s })).toString());
        if (a) return a;
      }
      throw new Error("No cached entity for the given key");
    }
  }
  return ln.EntityCache = r, ln;
}
var Bi = {}, un = {}, dn = {}, cs = {}, wo;
function Lc() {
  if (wo) return cs;
  wo = 1;
  var t = Le().Buffer;
  Object.defineProperty(cs, "__esModule", { value: true }), cs.IGE = void 0;
  const d = Ae(), { IGE: g } = sc;
  class i {
    constructor(r, e) {
      this.ige = new g(r, e);
    }
    decryptIge(r) {
      return d.convertToLittle(this.ige.decrypt(r));
    }
    encryptIge(r) {
      const e = r.length % 16;
      return e && (r = t.concat([r, d.generateRandomBytes(16 - e)])), d.convertToLittle(this.ige.encrypt(r));
    }
  }
  return cs.IGE = i, cs;
}
var So;
function Oc() {
  if (So) return dn;
  So = 1;
  var t = Le().Buffer, d = dn && dn.__importDefault || function(c) {
    return c && c.__esModule ? c : { default: c };
  };
  Object.defineProperty(dn, "__esModule", { value: true }), dn.MTProtoState = void 0;
  const g = d(Ke()), i = Ye(), l = Oe(), r = Ae(), e = kn(), s = Et(), n = Lc(), a = Gt();
  let o = class {
    constructor(u, _, S = true) {
      this.authKey = u, this._log = _, this.timeOffset = 0, this.salt = g.default.zero, this._sequence = 0, this.id = this._lastMsgId = g.default.zero, this.msgIds = [], this.securityChecks = S, this.reset();
    }
    reset() {
      this.id = i.helpers.generateRandomLong(true), this._sequence = 0, this._lastMsgId = g.default.zero, this.msgIds = [];
    }
    updateMessageId(u) {
      u.msgId = this._getNewMsgId();
    }
    async _calcKey(u, _, S) {
      const $ = S ? 0 : 8, [m, h] = await Promise.all([(0, r.sha256)(t.concat([_, u.slice($, $ + 36)])), (0, r.sha256)(t.concat([u.slice($ + 40, $ + 76), _]))]), I = t.concat([m.slice(0, 8), h.slice(8, 24), m.slice(24, 32)]), b = t.concat([h.slice(0, 8), m.slice(8, 24), h.slice(24, 32)]);
      return { key: I, iv: b };
    }
    async writeDataAsMessage(u, _, S, $) {
      const m = this._getNewMsgId(), h = this._getSeqNo(S);
      let I;
      $ ? I = await e.GZIPPacked.gzipIfSmaller(S, new l.Api.InvokeAfterMsg({ msgId: $, query: { getBytes() {
        return _;
      } } }).getBytes()) : I = await e.GZIPPacked.gzipIfSmaller(S, _);
      const b = t.alloc(4);
      b.writeInt32LE(h, 0);
      const f = t.alloc(4);
      f.writeInt32LE(I.length, 0);
      const p = (0, r.toSignedLittleBuffer)(m, 8);
      return u.write(t.concat([p, b, f])), u.write(I), m;
    }
    async encryptMessageData(u) {
      if (!this.authKey) throw new Error("Auth key unset");
      await this.authKey.waitForKey();
      const _ = this.authKey.getKey();
      if (!_) throw new Error("Auth key unset");
      if (!this.salt || !this.id || !_ || !this.authKey.keyId) throw new Error("Unset params");
      const S = (0, r.toSignedLittleBuffer)(this.salt, 8), $ = (0, r.toSignedLittleBuffer)(this.id, 8);
      u = t.concat([t.concat([S, $]), u]);
      const m = i.helpers.generateRandomBytes(i.helpers.mod(-(u.length + 12), 16) + 12), I = (await (0, r.sha256)(t.concat([_.slice(88, 120), u, m]))).slice(8, 24), { iv: b, key: f } = await this._calcKey(_, I, true), p = i.helpers.readBufferFromBigInt(this.authKey.keyId, 8);
      return t.concat([p, I, new n.IGE(f, b).encryptIge(t.concat([u, m]))]);
    }
    async decryptMessageData(u) {
      if (!this.authKey) throw new Error("Auth key unset");
      if (u.length < 8) throw new a.InvalidBufferError(u);
      const _ = i.helpers.readBigIntFromBuffer(u.slice(0, 8));
      if (!this.authKey.keyId || _.neq(this.authKey.keyId)) throw new a.SecurityError("Server replied with an invalid auth key");
      const S = this.authKey.getKey();
      if (!S) throw new a.SecurityError("Unset AuthKey");
      const $ = u.slice(8, 24), { iv: m, key: h } = await this._calcKey(S, $, false);
      u = new n.IGE(h, m).decryptIge(u.slice(24));
      const I = await (0, r.sha256)(t.concat([S.slice(96, 128), u]));
      if (!$.equals(I.slice(8, 24))) throw new a.SecurityError("Received msg_key doesn't match with expected one");
      const b = new s.BinaryReader(u);
      b.readLong(), b.readLong().neq(this.id);
      const p = b.readLong();
      if (this.msgIds.includes(p.toString()) && this.securityChecks) throw new a.SecurityError("Duplicate msgIds");
      this.msgIds.length > 500 && this.msgIds.shift(), this.msgIds.push(p.toString());
      const w = b.readInt();
      b.readInt();
      const M = b.tgReadObject();
      return new e.TLMessage(p, w, M);
    }
    _getNewMsgId() {
      const u = (/* @__PURE__ */ new Date()).getTime() / 1e3 + this.timeOffset, _ = Math.floor((u - Math.floor(u)) * 1e9);
      let S = (0, g.default)(Math.floor(u)).shiftLeft((0, g.default)(32)).or((0, g.default)(_).shiftLeft((0, g.default)(2)));
      return this._lastMsgId.greaterOrEquals(S) && (S = this._lastMsgId.add((0, g.default)(4))), this._lastMsgId = S, S;
    }
    updateTimeOffset(u) {
      const _ = this._getNewMsgId(), S = this.timeOffset, $ = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3), m = u.shiftRight((0, g.default)(32)).toJSNumber();
      return this.timeOffset = m - $, this.timeOffset !== S && (this._lastMsgId = g.default.zero, this._log.debug(`Updated time offset (old offset ${S}, bad ${_}, good ${u}, new ${this.timeOffset})`)), this.timeOffset;
    }
    _getSeqNo(u) {
      if (u) {
        const _ = this._sequence * 2 + 1;
        return this._sequence += 1, _;
      } else return this._sequence * 2;
    }
  };
  return dn.MTProtoState = o, dn;
}
var Io;
function Vc() {
  if (Io) return un;
  Io = 1;
  var t = Le().Buffer, d = un && un.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(un, "__esModule", { value: true }), un.MTProtoPlainSender = void 0;
  const g = d(Ke()), i = Oc(), l = Ae(), r = Gt(), e = Et();
  let s = class {
    constructor(a, o) {
      this._state = new i.MTProtoState(void 0, o), this._connection = a;
    }
    async send(a) {
      let o = a.getBytes(), c = this._state._getNewMsgId();
      const u = (0, l.toSignedLittleBuffer)(c, 8), _ = t.alloc(4);
      _.writeInt32LE(o.length, 0);
      const S = t.concat([t.concat([t.alloc(8), u, _]), o]);
      if (await this._connection.send(S), o = await this._connection.recv(), o.length < 8) throw new r.InvalidBufferError(o);
      const $ = new e.BinaryReader(o);
      if ($.readLong().neq((0, g.default)(0))) throw new Error("Bad authKeyId");
      if (c = $.readLong(), c.eq((0, g.default)(0))) throw new Error("Bad msgId");
      if ($.readInt() <= 0) throw new Error("Bad length");
      return $.tgReadObject();
    }
  };
  return un.MTProtoPlainSender = s, un;
}
var Cn = {}, fn = {}, Po;
function M2e() {
  if (Po) return fn;
  Po = 1;
  var t = fn && fn.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(fn, "__esModule", { value: true }), fn.Factorizator = void 0;
  const d = t(Ke()), g = Ae();
  let i = class Vi {
    static gcd(r, e) {
      for (; e.neq(d.default.zero); ) {
        const s = e;
        e = r.remainder(e), r = s;
      }
      return r;
    }
    static factorize(r) {
      if (r.remainder(2).equals(d.default.zero)) return { p: (0, d.default)(2), q: r.divide((0, d.default)(2)) };
      let e = d.default.randBetween((0, d.default)(1), r.minus(1));
      const s = d.default.randBetween((0, d.default)(1), r.minus(1)), n = d.default.randBetween((0, d.default)(1), r.minus(1));
      let a = d.default.one, o = d.default.one, c = d.default.one, u = d.default.zero, _ = d.default.zero, S;
      for (; a.eq(d.default.one); ) {
        u = e;
        for (let m = 0; (0, d.default)(m).lesser(o); m++) e = (0, g.modExp)(e, (0, d.default)(2), r).add(s).remainder(r);
        for (S = d.default.zero; S.lesser(o) && a.eq(d.default.one); ) {
          _ = e;
          const m = d.default.min(n, o.minus(S));
          for (let h = 0; (0, d.default)(h).lesser(m); h++) e = (0, g.modExp)(e, (0, d.default)(2), r).add(s).remainder(r), c = c.multiply(u.minus(e).abs()).remainder(r);
          a = Vi.gcd(c, r), S = S.add(n);
        }
        o = o.multiply(2);
      }
      if (a.eq(r)) for (; _ = (0, g.modExp)(_, (0, d.default)(2), r).add(s).remainder(r), a = Vi.gcd(u.minus(_).abs(), r), !a.greater(1); ) ;
      const $ = a;
      return c = r.divide(a), $ < c ? { p: $, q: c } : { p: c, q: $ };
    }
  };
  return fn.Factorizator = i, fn;
}
var pn = {}, Ao;
function $2e() {
  return Ao || (Ao = 1, (function(t) {
    var d = Le().Buffer, g = pn && pn.__rest || function(n, a) {
      var o = {};
      for (var c in n) Object.prototype.hasOwnProperty.call(n, c) && a.indexOf(c) < 0 && (o[c] = n[c]);
      if (n != null && typeof Object.getOwnPropertySymbols == "function") for (var u = 0, c = Object.getOwnPropertySymbols(n); u < c.length; u++) a.indexOf(c[u]) < 0 && Object.prototype.propertyIsEnumerable.call(n, c[u]) && (o[c[u]] = n[c[u]]);
      return o;
    }, i = pn && pn.__importDefault || function(n) {
      return n && n.__esModule ? n : { default: n };
    };
    Object.defineProperty(t, "__esModule", { value: true }), t._serverKeys = void 0, t.encrypt = s;
    const l = i(Ke()), r = Ae(), e = [{ fingerprint: (0, l.default)("-3414540481677951611"), n: (0, l.default)("29379598170669337022986177149456128565388431120058863768162556424047512191330847455146576344487764408661701890505066208632169112269581063774293102577308490531282748465986139880977280302242772832972539403531316010870401287642763009136156734339538042419388722777357134487746169093539093850251243897188928735903389451772730245253062963384108812842079887538976360465290946139638691491496062099570836476454855996319192747663615955633778034897140982517446405334423701359108810182097749467210509584293428076654573384828809574217079944388301239431309115013843331317877374435868468779972014486325557807783825502498215169806323"), e: 65537 }, { fingerprint: (0, l.default)("-5595554452916591101"), n: (0, l.default)("25342889448840415564971689590713473206898847759084779052582026594546022463853940585885215951168491965708222649399180603818074200620463776135424884632162512403163793083921641631564740959529419359595852941166848940585952337613333022396096584117954892216031229237302943701877588456738335398602461675225081791820393153757504952636234951323237820036543581047826906120927972487366805292115792231423684261262330394324750785450942589751755390156647751460719351439969059949569615302809050721500330239005077889855323917509948255722081644689442127297605422579707142646660768825302832201908302295573257427896031830742328565032949"), e: 65537 }];
    t._serverKeys = /* @__PURE__ */ new Map(), e.forEach((n) => {
      var { fingerprint: a } = n, o = g(n, ["fingerprint"]);
      t._serverKeys.set(a.toString(), o);
    });
    async function s(n, a) {
      const o = t._serverKeys.get(n.toString());
      if (!o) return;
      const c = (0, r.generateRandomBytes)(235 - a.length), u = d.concat([await (0, r.sha1)(a), a, c]), _ = (0, r.readBigIntFromBuffer)(u, false), S = (0, r.modExp)(_, (0, l.default)(o.e), o.n);
      return (0, r.readBufferFromBigInt)(S, 256, false);
    }
  })(pn)), pn;
}
var Co;
function Nc() {
  if (Co) return Cn;
  Co = 1;
  var t = Le().Buffer, d = Cn && Cn.__importDefault || function(_) {
    return _ && _.__esModule ? _ : { default: _ };
  };
  Object.defineProperty(Cn, "__esModule", { value: true }), Cn.doAuthentication = u;
  const g = Ae(), i = Oe(), l = Gt(), r = M2e(), e = $2e(), s = Lc(), n = d(Ke()), a = Et(), o = Ks(), c = 20;
  async function u(_, S) {
    let $ = (0, g.generateRandomBytes)(16);
    const m = (0, g.readBigIntFromBuffer)($, false, true), h = await _.send(new i.Api.ReqPqMulti({ nonce: m }));
    if (S.debug("Starting authKey generation step 1"), !(h instanceof i.Api.ResPQ)) throw new l.SecurityError(`Step 1 answer was ${h}`);
    if (h.nonce.neq(m)) throw new l.SecurityError("Step 1 invalid nonce from server");
    const I = (0, g.readBigIntFromBuffer)(h.pq, false, true);
    S.debug("Finished authKey generation step 1");
    const { p: b, q: f } = r.Factorizator.factorize(I), p = (0, g.getByteArray)(b), w = (0, g.getByteArray)(f);
    $ = (0, g.generateRandomBytes)(32);
    const M = (0, g.readBigIntFromBuffer)($, true, true), T = new i.Api.PQInnerData({ pq: (0, g.getByteArray)(I), p, q: w, nonce: h.nonce, serverNonce: h.serverNonce, newNonce: M }).getBytes();
    if (T.length > 144) throw new l.SecurityError("Step 1 invalid nonce from server");
    let k, B;
    for (const Ve of h.serverPublicKeyFingerprints) if (B = e._serverKeys.get(Ve.toString()), B !== void 0) {
      k = Ve;
      break;
    }
    if (k === void 0 || B === void 0) throw new l.SecurityError("Step 2 could not find a valid key for fingerprints");
    const C = (0, g.generateRandomBytes)(192 - T.length), E = t.concat([T, C]), q = t.from(E).reverse();
    let W;
    for (let Ve = 0; Ve < c; Ve++) {
      const ke = (0, g.generateRandomBytes)(32), qe = await (0, g.sha256)(t.concat([ke, E])), Ue = t.concat([q, qe]), Se = new s.IGE(ke, t.alloc(32)).encryptIge(Ue), Ze = (0, g.bufferXor)(ke, await (0, g.sha256)(Se)), A = t.concat([Ze, Se]), D = (0, g.readBigIntFromBuffer)(A, false, false);
      if (D.greaterOrEquals(B.n)) {
        S.debug("Aes key greater than RSA. retrying");
        continue;
      }
      const j = (0, g.modExp)(D, (0, n.default)(B.e), B.n);
      W = (0, g.readBufferFromBigInt)(j, 256, false, false);
      break;
    }
    if (W === void 0) throw new l.SecurityError("Step 2 could create a secure encrypted key");
    S.debug("Step 2 : Generated a secure aes encrypted data");
    const G = await _.send(new i.Api.ReqDHParams({ nonce: h.nonce, serverNonce: h.serverNonce, p, q: w, publicKeyFingerprint: k, encryptedData: W }));
    if (!(G instanceof i.Api.ServerDHParamsOk || G instanceof i.Api.ServerDHParamsFail)) throw new Error(`Step 2.1 answer was ${G}`);
    if (G.nonce.neq(h.nonce)) throw new l.SecurityError("Step 2 invalid nonce from server");
    if (G.serverNonce.neq(h.serverNonce)) throw new l.SecurityError("Step 2 invalid server nonce from server");
    if (G instanceof i.Api.ServerDHParamsFail) {
      const Ve = await (0, g.sha1)((0, g.toSignedLittleBuffer)(M, 32).slice(4, 20)), ke = (0, g.readBigIntFromBuffer)(Ve, true, true);
      if (G.newNonceHash.neq(ke)) throw new l.SecurityError("Step 2 invalid DH fail nonce from server");
    }
    if (!(G instanceof i.Api.ServerDHParamsOk)) throw new Error(`Step 2.2 answer was ${G}`);
    S.debug("Finished authKey generation step 2"), S.debug("Starting authKey generation step 3");
    const { key: te, iv: oe } = await (0, g.generateKeyDataFromNonce)(h.serverNonce, M);
    if (G.encryptedAnswer.length % 16 !== 0) throw new l.SecurityError("Step 3 AES block size mismatch");
    const he = new s.IGE(te, oe), H = he.decryptIge(G.encryptedAnswer), U = new a.BinaryReader(H);
    U.read(20);
    const V = U.tgReadObject();
    if (!(V instanceof i.Api.ServerDHInnerData)) throw new Error(`Step 3 answer was ${V}`);
    if (V.nonce.neq(h.nonce)) throw new l.SecurityError("Step 3 Invalid nonce in encrypted answer");
    if (V.serverNonce.neq(h.serverNonce)) throw new l.SecurityError("Step 3 Invalid server nonce in encrypted answer");
    const K = (0, g.readBigIntFromBuffer)(V.dhPrime, false, false), F = (0, g.readBigIntFromBuffer)(V.gA, false, false), R = V.serverTime - Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3), ee = (0, g.readBigIntFromBuffer)((0, g.generateRandomBytes)(256), false, false), Y = (0, g.modExp)((0, n.default)(V.g), ee, K), Q = (0, g.modExp)(F, ee, K), se = new i.Api.ClientDHInnerData({ nonce: h.nonce, serverNonce: h.serverNonce, retryId: n.default.zero, gB: (0, g.getByteArray)(Y, false) }).getBytes(), ge = t.concat([await (0, g.sha1)(se), se]), ue = he.encryptIge(ge), ce = await _.send(new i.Api.SetClientDHParams({ nonce: h.nonce, serverNonce: h.serverNonce, encryptedData: ue })), ye = [i.Api.DhGenOk, i.Api.DhGenRetry, i.Api.DhGenFail], v = ["DhGenOk", "DhGenRetry", "DhGenFail"];
    if (!(ce instanceof ye[0] || ce instanceof ye[1] || ce instanceof ye[2])) throw new Error(`Step 3.1 answer was ${ce}`);
    const { name: le } = ce.constructor;
    if (ce.nonce.neq(h.nonce)) throw new l.SecurityError(`Step 3 invalid ${le} nonce from server`);
    if (ce.serverNonce.neq(h.serverNonce)) throw new l.SecurityError(`Step 3 invalid ${le} server nonce from server`);
    const ve = new o.AuthKey();
    await ve.setKey((0, g.getByteArray)(Q));
    const we = 1 + v.indexOf(ce.className), De = await ve.calcNewNonceHash(M, we);
    if (ce[`newNonceHash${we}`].neq(De)) throw new l.SecurityError("Step 3 invalid new nonce hash");
    if (!(ce instanceof i.Api.DhGenOk)) throw new Error(`Step 3.2 answer was ${ce}`);
    return S.debug("Finished authKey generation step 3"), { authKey: ve, timeOffset: R };
  }
  return Cn;
}
var gn = {}, ls = {}, xo;
function k2e() {
  if (xo) return ls;
  xo = 1, Object.defineProperty(ls, "__esModule", { value: true }), ls.PendingState = void 0;
  let t = class {
    constructor() {
      this._pending = /* @__PURE__ */ new Map();
    }
    set(g, i) {
      this._pending.set(g.toString(), i);
    }
    get(g) {
      return this._pending.get(g.toString());
    }
    getAndDelete(g) {
      const i = this.get(g);
      return this.delete(g), i;
    }
    values() {
      return Array.from(this._pending.values());
    }
    delete(g) {
      this._pending.delete(g.toString());
    }
    clear() {
      this._pending.clear();
    }
  };
  return ls.PendingState = t, ls;
}
var Eo;
function R2e() {
  if (Eo) return gn;
  Eo = 1;
  var t = Le().Buffer, d = gn && gn.__importDefault || function(b) {
    return b && b.__esModule ? b : { default: b };
  };
  Object.defineProperty(gn, "__esModule", { value: true }), gn.MTProtoSender = void 0;
  const g = Ks(), i = Oc(), l = Et(), r = kn(), e = Oe(), s = d(Ke()), n = Ae(), a = vc(), o = Nc(), c = Vc(), u = Gt(), _ = Es(), S = xt(), $ = zs(), m = k2e();
  var h = e.Api.MsgsAck;
  let I = class Fc {
    constructor(f, p) {
      this._exportedSenderPromises = /* @__PURE__ */ new Map();
      const w = Object.assign(Object.assign({}, Fc.DEFAULT_OPTIONS), p);
      this._finishedConnecting = false, this._cancelSend = false, this._connection = void 0, this._log = w.logger, this._dcId = w.dcId, this._retries = w.retries, this._currentRetries = 0, this._reconnectRetries = w.reconnectRetries, this._delay = w.delay, this._autoReconnect = w.autoReconnect, this._connectTimeout = w.connectTimeout, this._authKeyCallback = w.authKeyCallback, this._updateCallback = w.updateCallback, this._autoReconnectCallback = w.autoReconnectCallback, this._isMainSender = w.isMainSender, this._senderCallback = w.senderCallback, this._client = w.client, this._onConnectionBreak = w.onConnectionBreak, this._securityChecks = w.securityChecks, this._connectMutex = new $.Mutex(), this._exportedSenderPromises = w._exportedSenderPromises, this.userDisconnected = false, this.isConnecting = false, this._authenticated = false, this._userConnected = false, this.isReconnecting = false, this._reconnecting = false, this._disconnected = true, this._sendLoopHandle = null, this._recvLoopHandle = null, this.authKey = f || new g.AuthKey(), this._state = new i.MTProtoState(this.authKey, this._log, this._securityChecks), this._sendQueue = new l.MessagePacker(this._state, this._log), this._pendingState = new m.PendingState(), this._pendingAck = /* @__PURE__ */ new Set(), this._lastAcks = [], this._handlers = { [r.RPCResult.CONSTRUCTOR_ID.toString()]: this._handleRPCResult.bind(this), [r.MessageContainer.CONSTRUCTOR_ID.toString()]: this._handleContainer.bind(this), [r.GZIPPacked.CONSTRUCTOR_ID.toString()]: this._handleGzipPacked.bind(this), [e.Api.Pong.CONSTRUCTOR_ID.toString()]: this._handlePong.bind(this), [e.Api.BadServerSalt.CONSTRUCTOR_ID.toString()]: this._handleBadServerSalt.bind(this), [e.Api.BadMsgNotification.CONSTRUCTOR_ID.toString()]: this._handleBadNotification.bind(this), [e.Api.MsgDetailedInfo.CONSTRUCTOR_ID.toString()]: this._handleDetailedInfo.bind(this), [e.Api.MsgNewDetailedInfo.CONSTRUCTOR_ID.toString()]: this._handleNewDetailedInfo.bind(this), [e.Api.NewSessionCreated.CONSTRUCTOR_ID.toString()]: this._handleNewSessionCreated.bind(this), [e.Api.MsgsAck.CONSTRUCTOR_ID.toString()]: this._handleAck.bind(this), [e.Api.FutureSalts.CONSTRUCTOR_ID.toString()]: this._handleFutureSalts.bind(this), [e.Api.MsgsStateReq.CONSTRUCTOR_ID.toString()]: this._handleStateForgotten.bind(this), [e.Api.MsgResendReq.CONSTRUCTOR_ID.toString()]: this._handleStateForgotten.bind(this), [e.Api.MsgsAllInfo.CONSTRUCTOR_ID.toString()]: this._handleMsgAll.bind(this) };
    }
    set dcId(f) {
      this._dcId = f;
    }
    get dcId() {
      return this._dcId;
    }
    async connect(f, p) {
      if (this.userDisconnected = false, this._userConnected && !p) return this._log.info("User is already connected!"), false;
      this.isConnecting = true, this._connection = f, this._finishedConnecting = false;
      for (let w = 0; w < this._retries; w++) try {
        await this._connect(), this._updateCallback && this._updateCallback(this._client, new _.UpdateConnectionState(_.UpdateConnectionState.connected)), this._finishedConnecting = true;
        break;
      } catch (M) {
        this._updateCallback && w === 0 && this._updateCallback(this._client, new _.UpdateConnectionState(_.UpdateConnectionState.disconnected)), this._log.error(`WebSocket connection failed attempt: ${w + 1}`), this._client._errorHandler && await this._client._errorHandler(M), this._log.canSend(S.LogLevel.ERROR) && console.error(M), await (0, n.sleep)(this._delay);
      }
      return this.isConnecting = false, this._finishedConnecting;
    }
    isConnected() {
      return this._userConnected;
    }
    _transportConnected() {
      return !this._reconnecting && this._connection && this._connection._connected;
    }
    async disconnect() {
      this.userDisconnected = true, this._log.warn("Disconnecting..."), await this._disconnect();
    }
    send(f) {
      const p = new a.RequestState(f);
      return this._log.debug(`Send ${f.className}`), this._sendQueue.append(p), p.promise;
    }
    addStateToQueue(f) {
      this._sendQueue.append(f);
    }
    async _connect() {
      const f = this._connection;
      if (f.isConnected() || (this._log.info("Connecting to {0}...".replace("{0}", f.toString())), await f.connect(), this._log.debug("Connection success!")), this.authKey.getKey()) this._authenticated = true, this._log.debug("Already have an auth key ...");
      else {
        const p = new c.MTProtoPlainSender(f, this._log);
        this._log.debug("New auth_key attempt ...");
        const w = await (0, o.doAuthentication)(p, this._log);
        this._log.debug("Generated new auth_key successfully"), await this.authKey.setKey(w.authKey), this._state.timeOffset = w.timeOffset, this._authKeyCallback && await this._authKeyCallback(this.authKey, this._dcId);
      }
      this._userConnected = true, this.isReconnecting = false, this._sendLoopHandle || (this._log.debug("Starting send loop"), this._sendLoopHandle = this._sendLoop()), this._recvLoopHandle || (this._log.debug("Starting receive loop"), this._recvLoopHandle = this._recvLoop()), this._log.info("Connection to %s complete!".replace("%s", f.toString()));
    }
    async _disconnect() {
      const f = this._connection;
      if (this._updateCallback && this._updateCallback(this._client, new _.UpdateConnectionState(_.UpdateConnectionState.disconnected)), f === void 0) {
        this._log.info("Not disconnecting (already have no connection)");
        return;
      }
      this._log.info("Disconnecting from %s...".replace("%s", f.toString())), this._userConnected = false, this._log.debug("Closing current connection..."), await f.disconnect();
    }
    _cancelLoops() {
      this._cancelSend = true, this.cancellableRecvLoopPromise.cancel();
    }
    async _sendLoop() {
      for (this._sendQueue.prepend(this._pendingState.values()), this._pendingState.clear(); this._userConnected && !this.isReconnecting; ) {
        const f = () => {
          if (this._pendingAck.size) {
            const T = new a.RequestState(new h({ msgIds: Array(...this._pendingAck) }));
            this._sendQueue.append(T), this._lastAcks.push(T), this._lastAcks.length >= 10 && this._lastAcks.shift(), this._pendingAck.clear();
          }
        };
        f(), this._log.debug(`Waiting for messages to send... ${this.isReconnecting}`), await this._sendQueue.wait(), f();
        const p = await this._sendQueue.get();
        if (this._log.debug(`Got ${p == null ? void 0 : p.batch.length} message(s) to send`), this.isReconnecting) {
          this._log.debug("Reconnecting"), this._sendLoopHandle = void 0;
          return;
        }
        if (!p) continue;
        let { data: w } = p;
        const { batch: M } = p;
        this._log.debug(`Encrypting ${M.length} message(s) in ${w.length} bytes for sending`), this._log.debug(`Sending   ${M.map((T) => T.request.className)}`), w = await this._state.encryptMessageData(w);
        for (const T of M) if (!Array.isArray(T)) T.request.classType === "request" && this._pendingState.set(T.msgId, T);
        else for (const k of T) k.request.classType === "request" && this._pendingState.set(k.msgId, k);
        try {
          await this._connection.send(w);
        } catch (T) {
          this.userDisconnected || (this._log.debug(`Connection closed while sending data ${T}`), this._log.canSend(S.LogLevel.DEBUG) && console.error(T), this.reconnect()), this._sendLoopHandle = void 0;
          return;
        }
        this._log.debug("Encrypted messages put in a queue to be sent");
      }
      this._sendLoopHandle = void 0;
    }
    async _recvLoop() {
      let f, p;
      for (; this._userConnected && !this.isReconnecting; ) {
        this._log.debug("Receiving items from the network...");
        try {
          f = await this._connection.recv();
        } catch (w) {
          if (this._currentRetries > this._reconnectRetries) {
            for (const M of this._pendingState.values()) M.reject("Maximum reconnection retries reached. Aborting!");
            this.userDisconnected = true;
            return;
          }
          this.userDisconnected || (this._log.warn("Connection closed while receiving data"), this._log.canSend(S.LogLevel.WARN) && console.error(w), this.reconnect()), this._recvLoopHandle = void 0;
          return;
        }
        try {
          p = await this._state.decryptMessageData(f);
        } catch (w) {
          if (this._log.debug(`Error while receiving items from the network ${w}`), w instanceof u.TypeNotFoundError) {
            this._log.info(`Type ${w.invalidConstructorId} not found, remaining data ${w.remaining}`);
            continue;
          } else if (w instanceof u.SecurityError) {
            this._log.warn(`Security error while unpacking a received message: ${w}`);
            continue;
          } else if (w instanceof u.InvalidBufferError) {
            w.code === 404 ? this._handleBadAuthKey() : (this._log.warn(`Invalid buffer ${w.code} for dc ${this._dcId}`), this.reconnect()), this._recvLoopHandle = void 0;
            return;
          } else {
            this._log.error("Unhandled error while receiving data"), this._client._errorHandler && await this._client._errorHandler(w), this._log.canSend(S.LogLevel.ERROR) && console.log(w), this.reconnect(), this._recvLoopHandle = void 0;
            return;
          }
        }
        try {
          await this._processMessage(p);
        } catch (w) {
          w instanceof u.RPCError ? (w.message === "AUTH_KEY_UNREGISTERED" || w.message === "SESSION_REVOKED") && this._handleBadAuthKey(true) : (this._log.error("Unhandled error while receiving data"), this._client._errorHandler && await this._client._errorHandler(w), this._log.canSend(S.LogLevel.ERROR) && console.log(w));
        }
        this._currentRetries = 0;
      }
      this._recvLoopHandle = void 0;
    }
    _handleBadAuthKey(f = false) {
      f && this._isMainSender || (this._log.warn(`Broken authorization key for dc ${this._dcId}, resetting...`), this._isMainSender && this._updateCallback ? this._updateCallback(this._client, new _.UpdateConnectionState(_.UpdateConnectionState.broken)) : !this._isMainSender && this._onConnectionBreak && this._onConnectionBreak(this._dcId));
    }
    async _processMessage(f) {
      this._pendingAck.add(f.msgId), f.obj = await f.obj;
      let p = this._handlers[f.obj.CONSTRUCTOR_ID.toString()];
      p || (p = this._handleUpdate.bind(this)), await p(f);
    }
    _popStates(f) {
      var p;
      const w = this._pendingState.getAndDelete(f);
      if (w) return [w];
      const M = [];
      for (const T of this._pendingState.values()) !((p = T.containerId) === null || p === void 0) && p.equals(f) && M.push(T.msgId);
      if (M.length) {
        const T = [];
        for (const k of M) T.push(this._pendingState.getAndDelete(k));
        return T;
      }
      for (const T of this._lastAcks) if (T.msgId === f) return [T];
      return [];
    }
    _handleRPCResult(f) {
      const p = f.obj, w = this._pendingState.getAndDelete(p.reqMsgId);
      if (this._log.debug(`Handling RPC result for message ${p.reqMsgId}`), !w) {
        try {
          if (!(new l.BinaryReader(p.body).tgReadObject() instanceof e.Api.upload.File)) throw new u.TypeNotFoundError(0, t.alloc(0));
        } catch (M) {
          if (M instanceof u.TypeNotFoundError) {
            this._log.info(`Received response without parent request: ${p.body}`);
            return;
          }
          throw M;
        }
        return;
      }
      if (p.error) {
        const M = (0, u.RPCMessageToError)(p.error, w.request);
        throw this._sendQueue.append(new a.RequestState(new h({ msgIds: [w.msgId] }))), w.reject(M), M;
      } else try {
        const M = new l.BinaryReader(p.body), T = w.request.readResult(M);
        this._log.debug(`Handling RPC result ${T == null ? void 0 : T.className}`), w.resolve(T);
      } catch (M) {
        throw w.reject(M), M;
      }
    }
    async _handleContainer(f) {
      this._log.debug("Handling container");
      for (const p of f.obj.messages) await this._processMessage(p);
    }
    async _handleGzipPacked(f) {
      this._log.debug("Handling gzipped data");
      const p = new l.BinaryReader(f.obj.data);
      f.obj = p.tgReadObject(), await this._processMessage(f);
    }
    async _handleUpdate(f) {
      if (f.obj.SUBCLASS_OF_ID !== 2331323052) {
        this._log.warn(`Note: ${f.obj.className} is not an update, not dispatching it`);
        return;
      }
      this._log.debug("Handling update " + f.obj.className), this._updateCallback && this._updateCallback(this._client, f.obj);
    }
    async _handlePong(f) {
      const p = f.obj;
      this._log.debug(`Handling pong for message ${p.msgId}`);
      const w = this._pendingState.get(p.msgId.toString());
      this._pendingState.delete(p.msgId.toString()), w && w.resolve(p);
    }
    async _handleBadServerSalt(f) {
      const p = f.obj;
      this._log.debug(`Handling bad salt for message ${p.badMsgId}`), this._state.salt = p.newServerSalt;
      const w = this._popStates(p.badMsgId);
      this._sendQueue.extend(w), this._log.debug(`${w.length} message(s) will be resent`);
    }
    async _handleBadNotification(f) {
      const p = f.obj, w = this._popStates(p.badMsgId);
      if (this._log.debug(`Handling bad msg ${JSON.stringify(p)}`), [16, 17].includes(p.errorCode)) {
        const M = this._state.updateTimeOffset((0, s.default)(f.msgId));
        this._log.info(`System clock is wrong, set time offset to ${M}s`);
      } else if (p.errorCode === 32) this._state._sequence += 64;
      else if (p.errorCode === 33) this._state._sequence -= 16;
      else {
        for (const M of w) M.reject(new u.BadMessageError(M.request, p.errorCode));
        return;
      }
      this._sendQueue.extend(w), this._log.debug(`${w.length} messages will be resent due to bad msg`);
    }
    async _handleDetailedInfo(f) {
      const p = f.obj.answerMsgId;
      this._log.debug(`Handling detailed info for message ${p}`), this._pendingAck.add(p);
    }
    async _handleNewDetailedInfo(f) {
      const p = f.obj.answerMsgId;
      this._log.debug(`Handling new detailed info for message ${p}`), this._pendingAck.add(p);
    }
    async _handleNewSessionCreated(f) {
      this._log.debug("Handling new session created"), this._state.salt = f.obj.serverSalt;
    }
    _handleAck() {
    }
    async _handleFutureSalts(f) {
      this._log.debug(`Handling future salts for message ${f.msgId}`);
      const p = this._pendingState.getAndDelete(f.msgId);
      p && p.resolve(f.obj);
    }
    async _handleStateForgotten(f) {
      this._sendQueue.append(new a.RequestState(new e.Api.MsgsStateInfo({ reqMsgId: f.msgId, info: "".repeat(f.obj.msgIds) })));
    }
    async _handleMsgAll(f) {
    }
    reconnect() {
      if (this._userConnected && !this.isReconnecting) {
        if (this.isReconnecting = true, this._currentRetries++, this._isMainSender) {
          this._log.debug("Reconnecting all senders");
          for (const f of this._exportedSenderPromises.values()) f.then((p) => {
            p && !p._isMainSender && p.reconnect();
          }).catch((p) => {
            this._log.warn("Error getting sender to reconnect to");
          });
        }
        (0, n.sleep)(1e3).then(() => {
          this._log.info("Started reconnecting"), this._reconnect();
        });
      }
    }
    async _reconnect() {
      try {
        this._log.warn("[Reconnect] Closing current connection..."), await this._disconnect();
      } catch (w) {
        this._log.warn("Error happened while disconnecting"), this._client._errorHandler && await this._client._errorHandler(w), this._log.canSend(S.LogLevel.ERROR) && console.error(w);
      }
      this._log.debug(`Adding ${this._sendQueue._pendingStates.length} old request to resend`);
      for (let w = 0; w < this._sendQueue._pendingStates.length; w++) this._sendQueue._pendingStates[w].msgId != null && this._pendingState.set(this._sendQueue._pendingStates[w].msgId, this._sendQueue._pendingStates[w]);
      this._sendQueue.clear(), this._state.reset();
      const f = this._connection, p = new f.constructor({ ip: f._ip, port: f._port, dcId: f._dcId, loggers: f._log, proxy: f._proxy, testServers: f._testServers, socket: this._client.networkSocket });
      await this.connect(p, true), this.isReconnecting = false, this._sendQueue.prepend(this._pendingState.values()), this._pendingState.clear(), this._autoReconnectCallback && await this._autoReconnectCallback();
    }
  };
  return gn.MTProtoSender = I, I.DEFAULT_OPTIONS = { logger: null, reconnectRetries: 1 / 0, retries: 1 / 0, delay: 2e3, autoReconnect: true, connectTimeout: null, authKeyCallback: null, updateCallback: null, autoReconnectCallback: null, isMainSender: null, senderCallback: null, onConnectionBreak: void 0, securityChecks: true }, gn;
}
var Mo;
function Es() {
  return Mo || (Mo = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.ConnectionTCPObfuscated = t.ConnectionTCPAbridged = t.ConnectionTCPFull = t.Connection = t.UpdateConnectionState = t.MTProtoSender = t.doAuthentication = t.MTProtoPlainSender = void 0;
    var d = Vc();
    Object.defineProperty(t, "MTProtoPlainSender", { enumerable: true, get: function() {
      return d.MTProtoPlainSender;
    } });
    var g = Nc();
    Object.defineProperty(t, "doAuthentication", { enumerable: true, get: function() {
      return g.doAuthentication;
    } });
    var i = R2e();
    Object.defineProperty(t, "MTProtoSender", { enumerable: true, get: function() {
      return i.MTProtoSender;
    } });
    class l {
      constructor(s) {
        this.state = s;
      }
    }
    t.UpdateConnectionState = l, l.disconnected = -1, l.connected = 1, l.broken = 0;
    var r = Bc();
    Object.defineProperty(t, "Connection", { enumerable: true, get: function() {
      return r.Connection;
    } }), Object.defineProperty(t, "ConnectionTCPFull", { enumerable: true, get: function() {
      return r.ConnectionTCPFull;
    } }), Object.defineProperty(t, "ConnectionTCPAbridged", { enumerable: true, get: function() {
      return r.ConnectionTCPAbridged;
    } }), Object.defineProperty(t, "ConnectionTCPObfuscated", { enumerable: true, get: function() {
      return r.ConnectionTCPObfuscated;
    } });
  })(Bi)), Bi;
}
var hn = {}, $o;
function T2e() {
  if ($o) return hn;
  $o = 1;
  var t = Le().Buffer;
  Object.defineProperty(hn, "__esModule", { value: true }), hn.ConnectionTCPMTProxyAbridged = hn.TCPMTProxy = void 0;
  const d = xs(), g = zi(), i = Ae(), l = Tc();
  class r {
    constructor(a) {
      this.header = void 0, this.connection = a.socket, this._packetClass = a.PacketCodecClass, this._secret = a._secret, this._dcId = a._dcId;
    }
    async initHeader() {
      let a = this._secret;
      if (a = a.length == 17 && a[0] == 221 ? a.slice(1) : a, a.length != 16) throw new Error("MTProxy secret must be a hex-string representing 16 bytes");
      const c = [t.from("50567247", "hex"), t.from("474554", "hex"), t.from("504f5354", "hex"), t.from("eeeeeeee", "hex")];
      let u;
      for (; ; ) if (u = (0, i.generateRandomBytes)(64), u[0] !== 239 && !u.slice(4, 8).equals(t.alloc(4))) {
        let p = true;
        for (const w of c) if (w.equals(u.slice(0, 4))) {
          p = false;
          break;
        }
        if (p) break;
      }
      u = u.toJSON().data;
      const _ = t.from(u.slice(8, 56)).reverse(), S = await (0, i.sha256)(t.concat([t.from(u.slice(8, 40)), a])), $ = t.from(u.slice(40, 56)), m = await (0, i.sha256)(t.concat([t.from(_.slice(0, 32)), a])), h = t.from(_.slice(32, 48)), I = new l.CTR(S, $), b = new l.CTR(m, h);
      u = t.concat([t.from(u.slice(0, 56)), this._packetClass.obfuscateTag, t.from(u.slice(60))]);
      const f = t.alloc(2);
      f.writeInt8(this._dcId, 0), u = t.concat([t.from(u.slice(0, 60)), f, t.from(u.slice(62))]), u = t.concat([t.from(u.slice(0, 56)), t.from(I.encrypt(u).slice(56, 64)), t.from(u.slice(64))]), this.header = u, this._encrypt = I, this._decrypt = b;
    }
    async read(a) {
      const o = await this.connection.readExactly(a);
      return this._decrypt.encrypt(o);
    }
    write(a) {
      this.connection.write(this._encrypt.encrypt(a));
    }
  }
  let e = class extends d.ObfuscatedConnection {
    constructor({ ip: a, port: o, dcId: c, loggers: u, proxy: _, socket: S, testServers: $ }) {
      if (super({ ip: _.ip, port: _.port, dcId: c, loggers: u, socket: S, proxy: _, testServers: $ }), this.ObfuscatedIO = r, !("MTProxy" in _)) throw new Error("This connection only supports MPTProxies");
      if (!_.secret) throw new Error("You need to provide the secret for the MTProxy");
      _.secret && _.secret.match(/^[0-9a-f]+$/i) ? this._secret = t.from(_.secret, "hex") : this._secret = t.from(_.secret, "base64");
    }
  };
  hn.TCPMTProxy = e;
  class s extends e {
    constructor() {
      super(...arguments), this.PacketCodecClass = g.AbridgedPacketCodec;
    }
  }
  return hn.ConnectionTCPMTProxyAbridged = s, hn;
}
var ko;
function jc() {
  if (ko) return Yt;
  ko = 1;
  var t = Yt && Yt.__importDefault || function(T) {
    return T && T.__esModule ? T : { default: T };
  };
  Object.defineProperty(Yt, "__esModule", { value: true }), Yt.TelegramBaseClient = void 0;
  const d = Ye(), g = Ae(), i = Bc(), l = Wi(), r = Et(), e = Oe(), s = t(x2e), n = E2e(), a = mc(), o = Es(), c = Hi(), u = T2e(), _ = zs(), S = xt(), $ = Ps(), m = t(bc()), h = 1e3, I = 3e4, b = 4, f = $.isNode ? "149.154.167.91" : "vesta.web.telegram.org", p = "2001:067c:04e8:f004:0000:0000:0000:000a", w = { connection: $.isNode ? i.ConnectionTCPFull : i.ConnectionTCPObfuscated, networkSocket: $.isNode ? r.PromisedNetSockets : r.PromisedWebSockets, useIPV6: false, timeout: 10, requestRetries: 5, connectionRetries: 1 / 0, retryDelay: 1e3, downloadRetries: 5, autoReconnect: true, sequentialUpdates: false, floodSleepThreshold: 60, deviceModel: "", systemVersion: "", appVersion: "", langCode: "en", systemLangCode: "en", _securityChecks: true, useWSS: $.isBrowser ? window.location.protocol == "https:" : false, testServers: false };
  class M {
    constructor(k, B, C, E) {
      if (this.__version__ = d.version, this._ALBUMS = /* @__PURE__ */ new Map(), this._exportedSenderPromises = /* @__PURE__ */ new Map(), this._exportedSenderReleaseTimeouts = /* @__PURE__ */ new Map(), E = Object.assign(Object.assign({}, w), E), !B || !C) throw new Error("Your API ID or Hash cannot be empty or undefined");
      if (E.baseLogger ? this._log = E.baseLogger : this._log = new r.Logger(), this._log.info("Running gramJS version " + d.version), k && typeof k == "string" && (k = new l.StoreSession(k)), !(k instanceof l.Session)) throw new Error("Only StringSession and StoreSessions are supported currently :( ");
      if (this._floodSleepThreshold = E.floodSleepThreshold, this.session = k, this.apiId = B, this.apiHash = C, this._useIPV6 = E.useIPV6, this._requestRetries = E.requestRetries, this._downloadRetries = E.downloadRetries, this._connectionRetries = E.connectionRetries, this._reconnectRetries = E.reconnectRetries, this._retryDelay = E.retryDelay || 0, this._timeout = E.timeout, this._autoReconnect = E.autoReconnect, this._proxy = E.proxy, this._semaphore = new _.Semaphore(E.maxConcurrentDownloads || 1), this.testServers = E.testServers || false, this.networkSocket = E.networkSocket || r.PromisedNetSockets, !(E.connection instanceof Function)) throw new Error("Connection should be a class not an instance");
      this._connection = E.connection;
      let q;
      if (this._proxy && "MTProxy" in this._proxy && (this._connection = u.ConnectionTCPMTProxyAbridged, q = new e.Api.InputClientProxy({ address: this._proxy.ip, port: this._proxy.port })), this._initRequest = new e.Api.InitConnection({ apiId: this.apiId, deviceModel: E.deviceModel || s.default.type().toString() || "Unknown", systemVersion: E.systemVersion || s.default.release().toString() || "1.0", appVersion: E.appVersion || "1.0", langCode: E.langCode, langPack: "", systemLangCode: E.systemLangCode, proxy: q }), this._eventBuilders = [], this._floodWaitedRequests = {}, this._borrowedSenderPromises = {}, this._bot = void 0, this._selfInputPeer = void 0, this.useWSS = E.useWSS, this._securityChecks = !!E.securityChecks, this.useWSS && this._proxy) throw new Error("Cannot use SSL with proxies. You need to disable the useWSS client param in TelegramClient");
      this._entityCache = new n.EntityCache(), this._config = void 0, this._loopStarted = false, this._reconnecting = false, this._destroyed = false, this._isSwitchingDc = false, this._connectedDeferred = new m.default(), this._parseMode = a.MarkdownParser;
    }
    get floodSleepThreshold() {
      return this._floodSleepThreshold;
    }
    set floodSleepThreshold(k) {
      this._floodSleepThreshold = Math.min(k || 0, 1440 * 60);
    }
    set maxConcurrentDownloads(k) {
      this._semaphore._value = k;
    }
    async _initSession() {
      await this.session.load(), this.session.serverAddress ? this._useIPV6 = this.session.serverAddress.includes(":") : this.session.setDC(b, this._useIPV6 ? p : f, this.useWSS ? 443 : 80);
    }
    get connected() {
      return this._sender && this._sender.isConnected();
    }
    async disconnect() {
      await this._disconnect(), await Promise.all(Object.values(this._exportedSenderPromises).map((k) => Object.values(k).map((B) => B && B.then((C) => {
        if (C) return C.disconnect();
      }))).flat()), Object.values(this._exportedSenderReleaseTimeouts).forEach((k) => {
        Object.values(k).forEach((B) => {
          clearTimeout(B);
        });
      }), this._exportedSenderPromises.clear();
    }
    get disconnected() {
      return !this._sender || this._sender._disconnected;
    }
    async _disconnect() {
      var k;
      await ((k = this._sender) === null || k === void 0 ? void 0 : k.disconnect());
    }
    async destroy() {
      this._destroyed = true, await Promise.all([this.disconnect(), ...Object.values(this._borrowedSenderPromises).map((k) => k.then((B) => B.disconnect()))]), this._eventBuilders = [];
    }
    async _authKeyCallback(k, B) {
      this.session.setAuthKey(k, B), await this.session.save();
    }
    async _cleanupExportedSender(k) {
      this.session.dcId !== k && this.session.setAuthKey(void 0, k);
      let B = await this._exportedSenderPromises.get(k);
      this._exportedSenderPromises.delete(k), await (B == null ? void 0 : B.disconnect());
    }
    async _connectSender(k, B) {
      const C = await this.getDC(B, !!k.authKey.getKey());
      for (; ; ) try {
        if (await k.connect(new this._connection({ ip: C.ipAddress, port: C.port, dcId: B, loggers: this._log, proxy: this._proxy, testServers: this.testServers, socket: this.networkSocket }), false), this.session.dcId !== B && !k._authenticated) {
          this._log.info(`Exporting authorization for data center ${C.ipAddress} with layer ${c.LAYER}`);
          const E = await this.invoke(new e.Api.auth.ExportAuthorization({ dcId: B }));
          this._initRequest.query = new e.Api.auth.ImportAuthorization({ id: E.id, bytes: E.bytes });
          const q = new e.Api.InvokeWithLayer({ layer: c.LAYER, query: this._initRequest });
          await k.send(q), k._authenticated = true;
        }
        return k.dcId = B, k.userDisconnected = false, k;
      } catch (E) {
        if (E.errorMessage === "DC_ID_INVALID") return k._authenticated = true, k.userDisconnected = false, k;
        this._errorHandler ? await this._errorHandler(E) : this._log.canSend(S.LogLevel.ERROR) && console.error(E), await (0, g.sleep)(1e3), await k.disconnect();
      }
    }
    async _borrowExportedSender(k, B, C) {
      (!this._exportedSenderPromises.get(k) || B) && this._exportedSenderPromises.set(k, this._connectSender(C || this._createExportedSender(k), k));
      let E;
      try {
        if (E = await this._exportedSenderPromises.get(k), !E.isConnected()) return E.isConnecting ? (await (0, g.sleep)(h), this._borrowExportedSender(k, false, E)) : this._borrowExportedSender(k, true, E);
      } catch (q) {
        return this._errorHandler && await this._errorHandler(q), this._log.canSend(S.LogLevel.ERROR) && console.error(q), this._borrowExportedSender(k, true);
      }
      return this._exportedSenderReleaseTimeouts.get(k) && (clearTimeout(this._exportedSenderReleaseTimeouts.get(k)), this._exportedSenderReleaseTimeouts.delete(k)), this._exportedSenderReleaseTimeouts.set(k, setTimeout(() => {
        this._exportedSenderReleaseTimeouts.delete(k), E._pendingState.values().length ? (console.log("sender already has some hanging states. reconnecting"), E._reconnect(), this._borrowExportedSender(k, false, E)) : E.disconnect();
      }, I)), E;
    }
    _createExportedSender(k) {
      return new o.MTProtoSender(this.session.getAuthKey(k), { logger: this._log, dcId: k, retries: this._connectionRetries, delay: this._retryDelay, autoReconnect: this._autoReconnect, connectTimeout: this._timeout, authKeyCallback: this._authKeyCallback.bind(this), isMainSender: k === this.session.dcId, onConnectionBreak: this._cleanupExportedSender.bind(this), client: this, securityChecks: this._securityChecks, _exportedSenderPromises: this._exportedSenderPromises, reconnectRetries: this._reconnectRetries });
    }
    getSender(k) {
      return k ? this._borrowExportedSender(k) : Promise.resolve(this._sender);
    }
    async getDC(k, B) {
      throw new Error("Cannot be called from here!");
    }
    invoke(k) {
      throw new Error("Cannot be called from here!");
    }
    setLogLevel(k) {
      this._log.setLevel(k);
    }
    get logger() {
      return this._log;
    }
    set onError(k) {
      this._errorHandler = async (B) => {
        try {
          await k(B);
        } catch (C) {
          this._log.canSend(S.LogLevel.ERROR) && (C.message = `Error ${C.message} thrown while handling top-level error: ${B.message}`, console.error(C));
        }
      };
    }
  }
  return Yt.TelegramBaseClient = M, Yt;
}
var st = {}, Ro;
function Gc() {
  if (Ro) return st;
  Ro = 1;
  var t = st && st.__createBinding || (Object.create ? (function(m, h, I, b) {
    b === void 0 && (b = I);
    var f = Object.getOwnPropertyDescriptor(h, I);
    (!f || ("get" in f ? !h.__esModule : f.writable || f.configurable)) && (f = { enumerable: true, get: function() {
      return h[I];
    } }), Object.defineProperty(m, b, f);
  }) : (function(m, h, I, b) {
    b === void 0 && (b = I), m[b] = h[I];
  })), d = st && st.__setModuleDefault || (Object.create ? (function(m, h) {
    Object.defineProperty(m, "default", { enumerable: true, value: h });
  }) : function(m, h) {
    m.default = h;
  }), g = st && st.__importStar || function(m) {
    if (m && m.__esModule) return m;
    var h = {};
    if (m != null) for (var I in m) I !== "default" && Object.prototype.hasOwnProperty.call(m, I) && t(h, m, I);
    return d(h, m), h;
  };
  Object.defineProperty(st, "__esModule", { value: true }), st.start = n, st.checkAuthorization = a, st.signInUser = o, st.signInUserWithQrCode = c, st.sendCode = u, st.signInWithPassword = _, st.signInBot = S, st._authFlow = $;
  const i = Oe(), l = g(Xe()), r = Ae(), e = js(), s = 3e4;
  async function n(m, h) {
    if (m.connected || await m.connect(), await m.checkAuthorization()) return;
    const I = { apiId: m.apiId, apiHash: m.apiHash };
    await $(m, I, h);
  }
  async function a(m) {
    try {
      return await m.invoke(new i.Api.updates.GetState()), true;
    } catch {
      return false;
    }
  }
  async function o(m, h, I) {
    let b, f, p = false;
    for (; ; ) try {
      if (typeof I.phoneNumber == "function") try {
        b = await I.phoneNumber();
      } catch (B) {
        if (B.errorMessage === "RESTART_AUTH_WITH_QR") return m.signInUserWithQrCode(h, I);
        throw B;
      }
      else b = I.phoneNumber;
      const k = await m.sendCode(h, b, I.forceSMS);
      if (f = k.phoneCodeHash, p = k.isCodeViaApp, typeof f != "string") throw new Error("Failed to retrieve phone code hash");
      break;
    } catch (k) {
      if (typeof I.phoneNumber != "function") throw k;
      if (await I.onError(k)) throw new Error("AUTH_USER_CANCEL");
    }
    let w, M = false, T;
    for (; ; ) try {
      try {
        w = await I.phoneCode(p);
      } catch (B) {
        if (B.errorMessage === "RESTART_AUTH") return m.signInUser(h, I);
      }
      if (!w) throw new Error("Code is empty");
      const k = await m.invoke(new i.Api.auth.SignIn({ phoneNumber: b, phoneCodeHash: f, phoneCode: w }));
      if (k instanceof i.Api.auth.AuthorizationSignUpRequired) {
        M = true, T = k.termsOfService;
        break;
      }
      return k.user;
    } catch (k) {
      if (k.errorMessage === "SESSION_PASSWORD_NEEDED") return m.signInWithPassword(h, I);
      if (await I.onError(k)) throw new Error("AUTH_USER_CANCEL");
    }
    if (M) for (; ; ) try {
      let k, B = "first name";
      if (I.firstAndLastNames) {
        const E = await I.firstAndLastNames();
        B = E[0], k = E[1];
      }
      if (!B) throw new Error("First name is required");
      const { user: C } = await m.invoke(new i.Api.auth.SignUp({ phoneNumber: b, phoneCodeHash: f, firstName: B, lastName: k }));
      return T && await m.invoke(new i.Api.help.AcceptTermsOfService({ id: T.id })), C;
    } catch (k) {
      if (await I.onError(k)) throw new Error("AUTH_USER_CANCEL");
    }
    return await I.onError(new Error("Auth failed")), m.signInUser(h, I);
  }
  async function c(m, h, I) {
    let b = false;
    if (I.qrCode == null) throw new Error("qrCode callback not defined");
    const f = (async () => {
      for (; !b; ) {
        const w = await m.invoke(new i.Api.auth.ExportLoginToken({ apiId: Number(h.apiId), apiHash: h.apiHash, exceptIds: [] }));
        if (!(w instanceof i.Api.auth.LoginToken)) throw new Error("Unexpected");
        const { token: M, expires: T } = w;
        await Promise.race([I.qrCode({ token: M, expires: T }), (0, r.sleep)(s)]), await (0, r.sleep)(s);
      }
    })(), p = new Promise((w) => {
      m.addEventHandler((M) => {
        M instanceof i.Api.UpdateLoginToken && w(void 0);
      });
    });
    try {
      await Promise.race([p, f]);
    } catch (w) {
      throw w;
    } finally {
      b = true;
    }
    try {
      const w = await m.invoke(new i.Api.auth.ExportLoginToken({ apiId: Number(h.apiId), apiHash: h.apiHash, exceptIds: [] }));
      if (w instanceof i.Api.auth.LoginTokenSuccess && w.authorization instanceof i.Api.auth.Authorization) return w.authorization.user;
      if (w instanceof i.Api.auth.LoginTokenMigrateTo) {
        await m._switchDC(w.dcId);
        const M = await m.invoke(new i.Api.auth.ImportLoginToken({ token: w.token }));
        if (M instanceof i.Api.auth.LoginTokenSuccess && M.authorization instanceof i.Api.auth.Authorization) return M.authorization.user;
        throw m._log.error(`Received unknown result while scanning QR ${w.className}`), new Error(`Received unknown result while scanning QR ${w.className}`);
      } else throw m._log.error(`Received unknown result while scanning QR ${w.className}`), new Error(`Received unknown result while scanning QR ${w.className}`);
    } catch (w) {
      if (w.errorMessage === "SESSION_PASSWORD_NEEDED") return m.signInWithPassword(h, I);
      throw w;
    }
    throw await I.onError(new Error("QR auth failed")), new Error("QR auth failed");
  }
  async function u(m, h, I, b = false) {
    try {
      const { apiId: f, apiHash: p } = h, w = await m.invoke(new i.Api.auth.SendCode({ phoneNumber: I, apiId: f, apiHash: p, settings: new i.Api.CodeSettings({}) }));
      if (w instanceof i.Api.auth.SentCodeSuccess) throw new Error("logged in right after sending the code");
      if (!b || w.type instanceof i.Api.auth.SentCodeTypeSms) return { phoneCodeHash: w.phoneCodeHash, isCodeViaApp: w.type instanceof i.Api.auth.SentCodeTypeApp };
      const M = await m.invoke(new i.Api.auth.ResendCode({ phoneNumber: I, phoneCodeHash: w.phoneCodeHash }));
      if (M instanceof i.Api.auth.SentCodeSuccess) throw new Error("logged in right after resending the code");
      return { phoneCodeHash: M.phoneCodeHash, isCodeViaApp: M.type instanceof i.Api.auth.SentCodeTypeApp };
    } catch (f) {
      if (f.errorMessage === "AUTH_RESTART") return m.sendCode(h, I, b);
      throw f;
    }
  }
  async function _(m, h, I) {
    let b = false;
    for (; ; ) try {
      const f = await m.invoke(new i.Api.account.GetPassword());
      if (!I.password) {
        b = true;
        break;
      }
      const p = await I.password(f.hint);
      if (!p) throw new Error("Password is empty");
      const w = await (0, e.computeCheck)(f, p), { user: M } = await m.invoke(new i.Api.auth.CheckPassword({ password: w }));
      return M;
    } catch (f) {
      if (await I.onError(f)) throw new Error("AUTH_USER_CANCEL");
    }
    if (b) throw new Error("Account has 2FA enabled.");
  }
  async function S(m, h, I) {
    const { apiId: b, apiHash: f } = h;
    let { botAuthToken: p } = I;
    if (!p) throw new Error("a valid BotToken is required");
    if (typeof p == "function") {
      let M;
      for (; ; ) if (M = await p(), M) {
        p = M;
        break;
      }
    }
    const { user: w } = await m.invoke(new i.Api.auth.ImportBotAuthorization({ apiId: b, apiHash: f, botAuthToken: p }));
    return w;
  }
  async function $(m, h, I) {
    const b = "phoneNumber" in I ? await m.signInUser(h, I) : await m.signInBot(h, I);
    m._log.info("Signed in successfully as " + l.getDisplayName(b));
  }
  return st;
}
var qs = {}, us = {}, ds = {}, To;
function B2e() {
  if (To) return ds;
  To = 1, Object.defineProperty(ds, "__esModule", { value: true }), ds.InlineResult = void 0;
  const t = ht(), d = Ae(), g = ft(), i = Xe();
  class l {
    [g.inspect.custom]() {
      return (0, d.betterConsoleLog)(this);
    }
    constructor(e, s, n, a) {
      this._ARTICLE = "article", this._PHOTO = "photo", this._GIF = "gif", this._VIDEO = "video", this._VIDEO_GIF = "mpeg4_gif", this._AUDIO = "audio", this._DOCUMENT = "document", this._LOCATION = "location", this._VENUE = "venue", this._CONTACT = "contact", this._GAME = "game", this._client = e, this.result = s, this._queryId = n, this._entity = a;
    }
    get type() {
      return this.result.type;
    }
    get message() {
      return this.result.sendMessage;
    }
    get description() {
      return this.result.description;
    }
    get url() {
      if (this.result instanceof t.Api.BotInlineResult) return this.result.url;
    }
    get photo() {
      return this.result instanceof t.Api.BotInlineResult ? this.result.thumb : this.result.photo;
    }
    get document() {
      return this.result instanceof t.Api.BotInlineResult ? this.result.content : this.result.document;
    }
    async click(e, s, n = false, a = false, o = false) {
      if (e) e = await this._client.getInputEntity(e);
      else if (this._entity) e = this._entity;
      else throw new Error("You must provide the entity where the result should be sent to");
      let c;
      s != null && (c = new t.Api.InputReplyToMessage({ replyToMsgId: (0, i.getMessageId)(s) }));
      const u = new t.Api.messages.SendInlineBotResult({ peer: e, queryId: this._queryId, id: this.result.id, silent: n, clearDraft: a, hideVia: o, replyTo: c });
      return await this._client.invoke(u);
    }
  }
  return ds.InlineResult = l, ds;
}
var Bo;
function D2e() {
  if (Bo) return us;
  Bo = 1, Object.defineProperty(us, "__esModule", { value: true }), us.InlineResults = void 0;
  const t = B2e(), d = Ae(), g = ft();
  class i extends Array {
    [g.inspect.custom]() {
      return (0, d.betterConsoleLog)(this);
    }
    constructor(r, e, s) {
      super(...e.results.map((n) => new t.InlineResult(r, n, e.queryId, s))), this.result = e, this.queryId = e.queryId, this.cacheTime = e.cacheTime, this._validUntil = (/* @__PURE__ */ new Date()).getTime() / 1e3 + this.cacheTime, this.users = e.users, this.gallery = !!e.gallery, this.nextOffset = e.nextOffset, this.switchPm = e.switchPm;
    }
    resultsValid() {
      return (/* @__PURE__ */ new Date()).getTime() / 1e3 < this._validUntil;
    }
  }
  return us.InlineResults = i, us;
}
var Do;
function Hc() {
  if (Do) return qs;
  Do = 1, Object.defineProperty(qs, "__esModule", { value: true }), qs.inlineQuery = i;
  const t = Oe(), d = D2e();
  var g = t.Api.messages.GetInlineBotResults;
  async function i(l, r, e, s, n, a) {
    r = await l.getInputEntity(r);
    let o = new t.Api.InputPeerSelf();
    s && (o = await l.getInputEntity(s));
    const c = await l.invoke(new g({ bot: r, peer: o, query: e, offset: n || "", geoPoint: a }));
    return new d.InlineResults(l, c, s ? o : void 0);
  }
  return qs;
}
var Us = {}, qo;
function zc() {
  if (qo) return Us;
  qo = 1, Object.defineProperty(Us, "__esModule", { value: true }), Us.buildReplyMarkup = l;
  const t = Oe(), d = yc(), g = wc(), i = Ae();
  function l(r, e = false) {
    if (r == null) return;
    if ("SUBCLASS_OF_ID" in r && r.SUBCLASS_OF_ID == 3806400242) return r;
    (0, i.isArrayLike)(r) ? (!r || !(0, i.isArrayLike)(r[0])) && (r = [r]) : r = [[r]];
    let s = false, n = false, a;
    const o = false, c = false, u = [];
    for (const _ of r) {
      const S = [];
      for (let $ of _) {
        $ instanceof d.Button ? ($.resize != null && (a = $.resize), $.singleUse != null && (a = $.singleUse), $.selective != null && (a = $.selective), $ = $.button) : $ instanceof g.MessageButton && ($ = $.button);
        const m = d.Button._isInline($);
        !s && m && (s = true), !n && m && (n = false), $.SUBCLASS_OF_ID == 195916963 && S.push($);
      }
      S && u.push(new t.Api.KeyboardButtonRow({ buttons: S }));
    }
    if (e && n) throw new Error("You cannot use non-inline buttons here");
    if (s === n && n) throw new Error("You cannot mix inline with normal buttons");
    return s ? new t.Api.ReplyInlineMarkup({ rows: u }) : new t.Api.ReplyKeyboardMarkup({ rows: u, resize: a, singleUse: o, selective: c });
  }
  return Us;
}
var Ne = {}, mn = {}, Uo;
function Ws() {
  if (Uo) return mn;
  Uo = 1;
  var t = mn && mn.__asyncValues || function(l) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var r = l[Symbol.asyncIterator], e;
    return r ? r.call(l) : (l = typeof __values == "function" ? __values(l) : l[Symbol.iterator](), e = {}, s("next"), s("throw"), s("return"), e[Symbol.asyncIterator] = function() {
      return this;
    }, e);
    function s(a) {
      e[a] = l[a] && function(o) {
        return new Promise(function(c, u) {
          o = l[a](o), n(c, u, o.done, o.value);
        });
      };
    }
    function n(a, o, c, u) {
      Promise.resolve(u).then(function(_) {
        a({ value: _, done: c });
      }, o);
    }
  };
  Object.defineProperty(mn, "__esModule", { value: true }), mn.RequestIter = void 0;
  const d = Ae(), g = Ye();
  class i {
    constructor(r, e, s = {}, n = {}) {
      this.client = r, this.reverse = s.reverse, this.waitTime = s.waitTime, this.limit = Math.max(e || Number.MAX_SAFE_INTEGER, 0), this.left = this.limit, this.buffer = void 0, this.kwargs = n, this.index = 0, this.total = void 0, this.lastLoad = 0;
    }
    async _init(r) {
    }
    [Symbol.asyncIterator]() {
      return this.buffer = void 0, this.index = 0, this.lastLoad = 0, this.left = this.limit, { next: async () => {
        if (this.buffer == null && (this.buffer = [], await this._init(this.kwargs) && (this.left = this.buffer.length)), this.left <= 0) return { value: void 0, done: true };
        if (this.index == this.buffer.length) {
          this.waitTime && await (0, d.sleep)(this.waitTime - ((/* @__PURE__ */ new Date()).getTime() / 1e3 - this.lastLoad)), this.lastLoad = (/* @__PURE__ */ new Date()).getTime() / 1e3, this.index = 0, this.buffer = [];
          const e = await this._loadNextChunk();
          if (e === false) return { value: void 0, done: true };
          e && (this.left = this.buffer.length);
        }
        if (!this.buffer || !this.buffer.length) return { value: void 0, done: true };
        const r = this.buffer[this.index];
        return this.left -= 1, this.index += 1, { value: r, done: false };
      } };
    }
    async collect() {
      var r, e, s, n;
      const a = new g.helpers.TotalList();
      try {
        for (var o = true, c = t(this), u; u = await c.next(), r = u.done, !r; o = true) {
          n = u.value, o = false;
          const _ = n;
          a.push(_);
        }
      } catch (_) {
        e = { error: _ };
      } finally {
        try {
          !o && !r && (s = c.return) && await s.call(c);
        } finally {
          if (e) throw e.error;
        }
      }
      return a.total = this.total, a;
    }
    async _loadNextChunk() {
      throw new Error("Not Implemented");
    }
  }
  return mn.RequestIter = i, mn;
}
var Di, Lo;
function Kc() {
  if (Lo) return Di;
  Lo = 1;
  function t(l) {
    if (typeof l != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(l));
  }
  function d(l, r) {
    for (var e = "", s = 0, n = -1, a = 0, o, c = 0; c <= l.length; ++c) {
      if (c < l.length) o = l.charCodeAt(c);
      else {
        if (o === 47) break;
        o = 47;
      }
      if (o === 47) {
        if (!(n === c - 1 || a === 1)) if (n !== c - 1 && a === 2) {
          if (e.length < 2 || s !== 2 || e.charCodeAt(e.length - 1) !== 46 || e.charCodeAt(e.length - 2) !== 46) {
            if (e.length > 2) {
              var u = e.lastIndexOf("/");
              if (u !== e.length - 1) {
                u === -1 ? (e = "", s = 0) : (e = e.slice(0, u), s = e.length - 1 - e.lastIndexOf("/")), n = c, a = 0;
                continue;
              }
            } else if (e.length === 2 || e.length === 1) {
              e = "", s = 0, n = c, a = 0;
              continue;
            }
          }
          r && (e.length > 0 ? e += "/.." : e = "..", s = 2);
        } else e.length > 0 ? e += "/" + l.slice(n + 1, c) : e = l.slice(n + 1, c), s = c - n - 1;
        n = c, a = 0;
      } else o === 46 && a !== -1 ? ++a : a = -1;
    }
    return e;
  }
  function g(l, r) {
    var e = r.dir || r.root, s = r.base || (r.name || "") + (r.ext || "");
    return e ? e === r.root ? e + s : e + l + s : s;
  }
  var i = { resolve: function() {
    for (var r = "", e = false, s, n = arguments.length - 1; n >= -1 && !e; n--) {
      var a;
      n >= 0 ? a = arguments[n] : (s === void 0 && (s = process.cwd()), a = s), t(a), a.length !== 0 && (r = a + "/" + r, e = a.charCodeAt(0) === 47);
    }
    return r = d(r, !e), e ? r.length > 0 ? "/" + r : "/" : r.length > 0 ? r : ".";
  }, normalize: function(r) {
    if (t(r), r.length === 0) return ".";
    var e = r.charCodeAt(0) === 47, s = r.charCodeAt(r.length - 1) === 47;
    return r = d(r, !e), r.length === 0 && !e && (r = "."), r.length > 0 && s && (r += "/"), e ? "/" + r : r;
  }, isAbsolute: function(r) {
    return t(r), r.length > 0 && r.charCodeAt(0) === 47;
  }, join: function() {
    if (arguments.length === 0) return ".";
    for (var r, e = 0; e < arguments.length; ++e) {
      var s = arguments[e];
      t(s), s.length > 0 && (r === void 0 ? r = s : r += "/" + s);
    }
    return r === void 0 ? "." : i.normalize(r);
  }, relative: function(r, e) {
    if (t(r), t(e), r === e || (r = i.resolve(r), e = i.resolve(e), r === e)) return "";
    for (var s = 1; s < r.length && r.charCodeAt(s) === 47; ++s) ;
    for (var n = r.length, a = n - s, o = 1; o < e.length && e.charCodeAt(o) === 47; ++o) ;
    for (var c = e.length, u = c - o, _ = a < u ? a : u, S = -1, $ = 0; $ <= _; ++$) {
      if ($ === _) {
        if (u > _) {
          if (e.charCodeAt(o + $) === 47) return e.slice(o + $ + 1);
          if ($ === 0) return e.slice(o + $);
        } else a > _ && (r.charCodeAt(s + $) === 47 ? S = $ : $ === 0 && (S = 0));
        break;
      }
      var m = r.charCodeAt(s + $), h = e.charCodeAt(o + $);
      if (m !== h) break;
      m === 47 && (S = $);
    }
    var I = "";
    for ($ = s + S + 1; $ <= n; ++$) ($ === n || r.charCodeAt($) === 47) && (I.length === 0 ? I += ".." : I += "/..");
    return I.length > 0 ? I + e.slice(o + S) : (o += S, e.charCodeAt(o) === 47 && ++o, e.slice(o));
  }, _makeLong: function(r) {
    return r;
  }, dirname: function(r) {
    if (t(r), r.length === 0) return ".";
    for (var e = r.charCodeAt(0), s = e === 47, n = -1, a = true, o = r.length - 1; o >= 1; --o) if (e = r.charCodeAt(o), e === 47) {
      if (!a) {
        n = o;
        break;
      }
    } else a = false;
    return n === -1 ? s ? "/" : "." : s && n === 1 ? "//" : r.slice(0, n);
  }, basename: function(r, e) {
    if (e !== void 0 && typeof e != "string") throw new TypeError('"ext" argument must be a string');
    t(r);
    var s = 0, n = -1, a = true, o;
    if (e !== void 0 && e.length > 0 && e.length <= r.length) {
      if (e.length === r.length && e === r) return "";
      var c = e.length - 1, u = -1;
      for (o = r.length - 1; o >= 0; --o) {
        var _ = r.charCodeAt(o);
        if (_ === 47) {
          if (!a) {
            s = o + 1;
            break;
          }
        } else u === -1 && (a = false, u = o + 1), c >= 0 && (_ === e.charCodeAt(c) ? --c === -1 && (n = o) : (c = -1, n = u));
      }
      return s === n ? n = u : n === -1 && (n = r.length), r.slice(s, n);
    } else {
      for (o = r.length - 1; o >= 0; --o) if (r.charCodeAt(o) === 47) {
        if (!a) {
          s = o + 1;
          break;
        }
      } else n === -1 && (a = false, n = o + 1);
      return n === -1 ? "" : r.slice(s, n);
    }
  }, extname: function(r) {
    t(r);
    for (var e = -1, s = 0, n = -1, a = true, o = 0, c = r.length - 1; c >= 0; --c) {
      var u = r.charCodeAt(c);
      if (u === 47) {
        if (!a) {
          s = c + 1;
          break;
        }
        continue;
      }
      n === -1 && (a = false, n = c + 1), u === 46 ? e === -1 ? e = c : o !== 1 && (o = 1) : e !== -1 && (o = -1);
    }
    return e === -1 || n === -1 || o === 0 || o === 1 && e === n - 1 && e === s + 1 ? "" : r.slice(e, n);
  }, format: function(r) {
    if (r === null || typeof r != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof r);
    return g("/", r);
  }, parse: function(r) {
    t(r);
    var e = { root: "", dir: "", base: "", ext: "", name: "" };
    if (r.length === 0) return e;
    var s = r.charCodeAt(0), n = s === 47, a;
    n ? (e.root = "/", a = 1) : a = 0;
    for (var o = -1, c = 0, u = -1, _ = true, S = r.length - 1, $ = 0; S >= a; --S) {
      if (s = r.charCodeAt(S), s === 47) {
        if (!_) {
          c = S + 1;
          break;
        }
        continue;
      }
      u === -1 && (_ = false, u = S + 1), s === 46 ? o === -1 ? o = S : $ !== 1 && ($ = 1) : o !== -1 && ($ = -1);
    }
    return o === -1 || u === -1 || $ === 0 || $ === 1 && o === u - 1 && o === c + 1 ? u !== -1 && (c === 0 && n ? e.base = e.name = r.slice(1, u) : e.base = e.name = r.slice(c, u)) : (c === 0 && n ? (e.name = r.slice(1, o), e.base = r.slice(1, u)) : (e.name = r.slice(c, o), e.base = r.slice(c, u)), e.ext = r.slice(o, u)), c > 0 ? e.dir = r.slice(0, c - 1) : n && (e.dir = "/"), e;
  }, sep: "/", delimiter: ":", win32: null, posix: null };
  return i.posix = i, Di = i, Di;
}
var Oo;
function Wc() {
  if (Oo) return Ne;
  Oo = 1;
  var t = Le().Buffer, d = Ne && Ne.__createBinding || (Object.create ? (function(U, V, K, F) {
    F === void 0 && (F = K);
    var R = Object.getOwnPropertyDescriptor(V, K);
    (!R || ("get" in R ? !V.__esModule : R.writable || R.configurable)) && (R = { enumerable: true, get: function() {
      return V[K];
    } }), Object.defineProperty(U, F, R);
  }) : (function(U, V, K, F) {
    F === void 0 && (F = K), U[F] = V[K];
  })), g = Ne && Ne.__setModuleDefault || (Object.create ? (function(U, V) {
    Object.defineProperty(U, "default", { enumerable: true, value: V });
  }) : function(U, V) {
    U.default = V;
  }), i = Ne && Ne.__importStar || function(U) {
    if (U && U.__esModule) return U;
    var V = {};
    if (U != null) for (var K in U) K !== "default" && Object.prototype.hasOwnProperty.call(U, K) && d(V, U, K);
    return g(V, U), V;
  }, l = Ne && Ne.__asyncValues || function(U) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var V = U[Symbol.asyncIterator], K;
    return V ? V.call(U) : (U = typeof __values == "function" ? __values(U) : U[Symbol.iterator](), K = {}, F("next"), F("throw"), F("return"), K[Symbol.asyncIterator] = function() {
      return this;
    }, K);
    function F(ee) {
      K[ee] = U[ee] && function(Y) {
        return new Promise(function(Q, se) {
          Y = U[ee](Y), R(Q, se, Y.done, Y.value);
        });
      };
    }
    function R(ee, Y, Q, se) {
      Promise.resolve(se).then(function(ge) {
        ee({ value: ge, done: Q });
      }, Y);
    }
  }, r = Ne && Ne.__importDefault || function(U) {
    return U && U.__esModule ? U : { default: U };
  };
  Object.defineProperty(Ne, "__esModule", { value: true }), Ne.GenericDownloadIter = Ne.DirectDownloadIter = void 0, Ne.iterDownload = w, Ne.downloadFileV2 = B, Ne.downloadMedia = C, Ne._downloadDocument = E, Ne._downloadContact = q, Ne._downloadWebDocument = W, Ne._downloadCachedPhotoSize = te, Ne._downloadPhoto = he, Ne.downloadProfilePhoto = H;
  const e = Oe(), s = Xe(), n = Ae(), a = Ye(), o = Ws(), c = Gt(), u = ws, _ = Et(), S = i(ws), $ = r(Kc()), m = r(Ke()), h = 4096, I = 1e3, b = 512 * 1024;
  class f extends o.RequestIter {
    constructor() {
      super(...arguments), this._timedOut = false;
    }
    async _init({ fileLocation: V, dcId: K, offset: F, stride: R, chunkSize: ee, requestSize: Y, fileSize: Q, msgData: se }) {
      this.request = new e.Api.upload.GetFile({ location: V, offset: F, limit: Y }), this.total = Q, this._stride = R, this._chunkSize = ee, this._lastPart = void 0, this._timedOut = false, this._sender = await this.client.getSender(K);
    }
    async _loadNextChunk() {
      const V = await this._request();
      if (this.buffer.push(V), V.length < this.request.limit) return this.left = this.buffer.length, await this.close(), true;
      this.request.offset = this.request.offset.add(this._stride);
    }
    async _request() {
      try {
        this._sender = await this.client.getSender(this._sender.dcId);
        const V = await this.client.invokeWithSender(this.request, this._sender);
        if (this._timedOut = false, V instanceof e.Api.upload.FileCdnRedirect) throw new Error("CDN Not supported. Please Add an issue in github");
        return V.bytes;
      } catch (V) {
        if (V.errorMessage == "TIMEOUT") {
          if (this._timedOut) throw this.client._log.warn("Got two timeouts in a row while downloading file"), V;
          return this._timedOut = true, this.client._log.info("Got timeout while downloading file, retrying once"), await (0, n.sleep)(I), await this._request();
        } else {
          if (V instanceof c.FileMigrateError) return this.client._log.info("File lives in another DC"), this._sender = await this.client.getSender(V.newDc), await this._request();
          throw V.errorMessage == "FILEREF_UPGRADE_NEEDED", V;
        }
      }
    }
    async close() {
      this.client._log.debug("Finished downloading file ...");
    }
    [Symbol.asyncIterator]() {
      return super[Symbol.asyncIterator]();
    }
  }
  Ne.DirectDownloadIter = f;
  class p extends f {
    async _loadNextChunk() {
      let V = t.alloc(0);
      const K = this.request.offset.mod(this.request.limit).toJSNumber(), F = this.request.offset;
      this.request.offset = this.request.offset.subtract(K);
      let R = false;
      for (; !R && V.length - K < this._chunkSize; ) {
        const ee = await this._request();
        this.request.offset = this.request.offset.add(this.request.limit), V = t.concat([V, ee]), R = ee.length < this.request.limit;
      }
      this.request.offset = F;
      for (let ee = K; ee < V.length; ee += this._stride) this.buffer.push(V.slice(ee, ee + this._chunkSize)), this.request.offset = this.request.offset.add(this._stride);
      if (R) {
        this.left = this.buffer.length, await this.close();
        return;
      }
      this.buffer[this.buffer.length - 1].length != this._chunkSize && (this._lastPart = this.buffer.pop(), this.request.offset = this.request.offset.subtract(this._stride));
    }
  }
  Ne.GenericDownloadIter = p;
  function w(U, { file: V, offset: K = m.default.zero, stride: F, limit: R, chunkSize: ee, requestSize: Y = b, fileSize: Q, dcId: se, msgData: ge }) {
    const ue = a.utils.getFileInfo(V);
    if (ue.dcId != null && (se = ue.dcId), Q == null && (Q = ue.size), V = ue.location, ee == null && (ee = Y), R == null && Q != null && (R = Math.floor(Q.add(ee).subtract(1).divide(ee).toJSNumber())), F == null) F = ee;
    else if (F < ee) throw new Error("Stride must be >= chunkSize");
    Y -= Y % h, Y < h ? Y = h : Y > b && (Y = b);
    let ce;
    return ee == Y && K.divide(b).eq(m.default.zero) && F % h == 0 && (R == null || K.divide(R).eq(m.default.zero)) ? (ce = f, U._log.info(`Starting direct file download in chunks of ${Y} at ${K}, stride ${F}`)) : (ce = p, U._log.info(`Starting indirect file download in chunks of ${Y} at ${K}, stride ${F}`)), new ce(U, R, {}, { fileLocation: V, dcId: se, offset: K, stride: F, chunkSize: ee, requestSize: Y, fileSize: Q, msgData: ge });
  }
  function M(U) {
    return !U || t.isBuffer(U) ? new _.BinaryWriter(t.alloc(0)) : typeof U == "string" ? (0, u.createWriteStream)(U) : U;
  }
  function T(U) {
    "close" in U && U.close && U.close();
  }
  function k(U) {
    if (U instanceof _.BinaryWriter) return U.getValue();
    if (U instanceof S.WriteStream) return typeof U.path == "string" ? $.default.resolve(U.path) : t.from(U.path);
  }
  async function B(U, V, { outputFile: K = void 0, partSizeKb: F = void 0, fileSize: R = void 0, progressCallback: ee = void 0, dcId: Y = void 0, msgData: Q = void 0 }) {
    var se, ge, ue, ce;
    F || (R ? F = a.utils.getAppropriatedPartSize(R) : F = 64);
    const ye = Math.floor(F * 1024);
    if (ye % h != 0) throw new Error("The part size must be evenly divisible by 4096");
    const v = M(K);
    let le = m.default.zero;
    try {
      try {
        for (var ve = true, we = l(w(U, { file: V, requestSize: ye, dcId: Y, msgData: Q })), De; De = await we.next(), se = De.done, !se; ve = true) {
          ce = De.value, ve = false;
          const Me = ce;
          await v.write(Me), le = le.add(Me.length), ee && await ee(le, (0, m.default)(R || m.default.zero));
        }
      } catch (Me) {
        ge = { error: Me };
      } finally {
        try {
          !ve && !se && (ue = we.return) && await ue.call(we);
        } finally {
          if (ge) throw ge.error;
        }
      }
      return k(v);
    } finally {
      T(v);
    }
  }
  async function C(U, V, K, F, R) {
    let ee, Y, Q;
    if (V instanceof e.Api.Message ? (Q = V.media, Y = V.date, ee = V.inputChat ? [V.inputChat, V.id] : void 0) : (Q = V, Y = Date.now()), typeof Q == "string") throw new Error("not implemented");
    return Q instanceof e.Api.MessageMediaWebPage && Q.webpage instanceof e.Api.WebPage && (Q = Q.webpage.document || Q.webpage.photo), Q instanceof e.Api.MessageMediaPhoto || Q instanceof e.Api.Photo ? he(U, Q, K, Y, F, R) : Q instanceof e.Api.MessageMediaDocument || Q instanceof e.Api.Document ? E(U, Q, K, Y, F, R, ee) : Q instanceof e.Api.MessageMediaContact ? q() : Q instanceof e.Api.WebDocument || Q instanceof e.Api.WebDocumentNoProxy ? W() : t.alloc(0);
  }
  async function E(U, V, K, F, R, ee, Y) {
    if (V instanceof e.Api.MessageMediaDocument) {
      if (!V.document) return t.alloc(0);
      V = V.document;
    }
    if (!(V instanceof e.Api.Document)) return t.alloc(0);
    let Q;
    if (R == null) K = oe(K, "document", "." + (a.utils.getExtension(V) || "bin"), F);
    else if (K = oe(K, "photo", ".jpg", F), Q = G(V.thumbs || [], R), Q instanceof e.Api.PhotoCachedSize || Q instanceof e.Api.PhotoStrippedSize) return te(Q, K);
    return await B(U, new e.Api.InputDocumentFileLocation({ id: V.id, accessHash: V.accessHash, fileReference: V.fileReference, thumbSize: Q && "type" in Q ? Q.type : "" }), { outputFile: K, fileSize: Q && "size" in Q ? (0, m.default)(Q.size) : V.size, progressCallback: ee, msgData: Y });
  }
  async function q(U, V, K) {
    throw new Error("not implemented");
  }
  async function W(U, V, K) {
    throw new Error("not implemented");
  }
  function G(U, V) {
    function K(R) {
      return R instanceof e.Api.PhotoStrippedSize || R instanceof e.Api.PhotoCachedSize ? R.bytes.length : R instanceof e.Api.PhotoSize ? R.size : R instanceof e.Api.PhotoSizeProgressive ? Math.max(...R.sizes) : R instanceof e.Api.VideoSize ? R.size : 0;
    }
    U = U.sort((R, ee) => K(R) - K(ee));
    const F = [];
    for (const R of U) R instanceof e.Api.PhotoPathSize || F.push(R);
    if (V == null) return F.pop();
    if (typeof V == "number") return F[V];
    if (typeof V == "string") {
      for (const R of F) if ("type" in R && R.type == V) return R;
    } else if (V instanceof e.Api.PhotoSize || V instanceof e.Api.PhotoCachedSize || V instanceof e.Api.PhotoStrippedSize || V instanceof e.Api.VideoSize) return V;
  }
  async function te(U, V) {
    let K;
    U instanceof e.Api.PhotoStrippedSize ? K = (0, s.strippedPhotoToJpg)(U.bytes) : K = U.bytes;
    const F = M(V);
    try {
      await F.write(K);
    } finally {
      T(F);
    }
    return k(F);
  }
  function oe(U, V, K, F) {
    if (!U || typeof U != "string") return U;
    if (S.existsSync(U) && S.lstatSync(U).isDirectory()) {
      let R = V + F + K;
      return $.default.join(U, R);
    }
    return U;
  }
  async function he(U, V, K, F, R, ee) {
    if (V instanceof e.Api.MessageMediaPhoto) {
      if (V.photo instanceof e.Api.PhotoEmpty || !V.photo) return t.alloc(0);
      V = V.photo;
    }
    if (!(V instanceof e.Api.Photo)) return t.alloc(0);
    const Y = [...V.sizes || [], ...V.videoSizes || []], Q = G(Y, R);
    if (!Q || Q instanceof e.Api.PhotoSizeEmpty) return t.alloc(0);
    if (F || (F = Date.now()), K = oe(K, "photo", ".jpg", F), Q instanceof e.Api.PhotoCachedSize || Q instanceof e.Api.PhotoStrippedSize) return te(Q, K);
    let se;
    return Q instanceof e.Api.PhotoSizeProgressive ? se = Math.max(...Q.sizes) : se = "size" in Q ? Q.size : 512, B(U, new e.Api.InputPhotoFileLocation({ id: V.id, accessHash: V.accessHash, fileReference: V.fileReference, thumbSize: "type" in Q ? Q.type : "" }), { outputFile: K, fileSize: (0, m.default)(se), progressCallback: ee, dcId: V.dcId });
  }
  async function H(U, V, K) {
    let F;
    if (typeof V == "object" && "photo" in V) F = V.photo;
    else if (V = await U.getEntity(V), "photo" in V) F = V.photo;
    else throw new Error(`Could not get photo from ${V ? V.className : void 0}`);
    let R, ee;
    if (F instanceof e.Api.UserProfilePhoto || F instanceof e.Api.ChatPhoto) R = F.dcId, ee = new e.Api.InputPeerPhotoFileLocation({ peer: a.utils.getInputPeer(V), photoId: F.photoId, big: K.isBig });
    else return t.alloc(0);
    return U.downloadFile(ee, { outputFile: K.outputFile, dcId: R });
  }
  return Ne;
}
var ze = {}, Ct = {}, Vo;
function Zi() {
  if (Vo) return Ct;
  Vo = 1;
  var t = Le().Buffer, d = Ct && Ct.__importDefault || function(M) {
    return M && M.__esModule ? M : { default: M };
  };
  Object.defineProperty(Ct, "__esModule", { value: true }), Ct.CustomFile = void 0, Ct.uploadFile = I, Ct._fileToMedia = b, Ct._sendAlbum = f, Ct.sendFile = p;
  const g = Oe(), i = Ae(), l = Xe(), r = d(Kc()), e = ws, s = Ye(), n = Cs(), a = Ji(), o = d(Ke());
  class c {
    constructor(T, k, B, C) {
      this.name = T, this.size = k, this.path = B, this.buffer = C;
    }
  }
  Ct.CustomFile = c;
  class u {
    constructor(T) {
      if (this.options = T, !T.buffer && !T.filePath) throw new Error("Either one of `buffer` or `filePath` should be specified");
    }
    async slice(T, k) {
      const { buffer: B, filePath: C } = this.options;
      if (B) return B.slice(T, k);
      if (C) {
        const E = k - T, q = t.alloc(E), W = await e.promises.open(C, "r");
        return await W.read(q, 0, E, T), await W.close(), t.from(q);
      }
      return t.alloc(0);
    }
  }
  const _ = 1024, S = 10 * 1024 * 1024, $ = 1e3, m = 20 * 1024 * 1024;
  async function h(M, T, k) {
    const B = {};
    return T > k && M instanceof c ? B.filePath = M.path : B.buffer = t.from(await w(M)), new u(B);
  }
  async function I(M, T) {
    const { file: k, onProgress: B } = T;
    let { workers: C } = T;
    const { name: E, size: q } = k, W = (0, i.readBigIntFromBuffer)((0, i.generateRandomBytes)(8), true, true), G = q > S, te = (0, l.getAppropriatedPartSize)((0, o.default)(q)) * _, oe = Math.floor((q + te - 1) / te), he = await h(k, q, T.maxBufferSize || m - 1);
    await M.getSender(M.session.dcId), (!C || !q) && (C = 1), C >= oe && (C = oe);
    let H = 0;
    B && B(H);
    for (let U = 0; U < oe; U += C) {
      const V = [];
      let K = U + C;
      K > oe && (K = oe);
      for (let F = U; F < K; F++) {
        let R = (F + 1) * te;
        if (R > q && (R = q), R == F * te) break;
        const ee = await he.slice(F * te, R);
        V.push((async (Y, Q) => {
          for (; ; ) {
            let se;
            try {
              se = await M.getSender(M.session.dcId), await se.send(G ? new g.Api.upload.SaveBigFilePart({ fileId: W, filePart: Y, fileTotalParts: oe, bytes: Q }) : new g.Api.upload.SaveFilePart({ fileId: W, filePart: Y, bytes: Q }));
            } catch (ge) {
              if (se && !se.isConnected()) {
                await (0, i.sleep)($);
                continue;
              } else if (ge instanceof s.errors.FloodWaitError) {
                await (0, i.sleep)(ge.seconds * 1e3);
                continue;
              }
              throw ge;
            }
            if (B) {
              if (B.isCanceled) throw new Error("USER_CANCELED");
              H += 1 / oe, B(H);
            }
            break;
          }
        })(F, ee));
      }
      await Promise.all(V);
    }
    return G ? new g.Api.InputFileBig({ id: W, parts: oe, name: E }) : new g.Api.InputFile({ id: W, parts: oe, name: E, md5Checksum: "" });
  }
  async function b(M, { file: T, forceDocument: k, fileSize: B, progressCallback: C, attributes: E, thumb: q, voiceNote: W = false, videoNote: G = false, supportsStreaming: te = false, mimeType: oe, asImage: he, workers: H = 1 }) {
    if (!T) return { fileHandle: void 0, media: void 0, image: void 0 };
    const U = s.utils.isImage(T);
    if (he == null && (he = U && !k), typeof T == "object" && !t.isBuffer(T) && !(T instanceof g.Api.InputFile) && !(T instanceof g.Api.InputFileBig) && !(T instanceof c) && !("read" in T)) try {
      return { fileHandle: void 0, media: s.utils.getInputMedia(T, { isPhoto: he, attributes: E, forceDocument: k, voiceNote: W, videoNote: G, supportsStreaming: te }), image: he };
    } catch {
      return { fileHandle: void 0, media: void 0, image: U };
    }
    let V, K, F;
    if (T instanceof g.Api.InputFile || T instanceof g.Api.InputFileBig) K = T;
    else if (typeof T == "string" && (T.startsWith("https://") || T.startsWith("http://"))) he ? V = new g.Api.InputMediaPhotoExternal({ url: T }) : V = new g.Api.InputMediaDocumentExternal({ url: T });
    else if (typeof T != "string" || (await e.promises.lstat(T)).isFile()) {
      if (typeof T == "string") F = new c(r.default.basename(T), (await e.promises.stat(T)).size, T);
      else if (typeof File < "u" && T instanceof File || T instanceof c) F = T;
      else {
        let R;
        "name" in T ? R = T.name : R = "unnamed", t.isBuffer(T) && (F = new c(R, T.length, "", T));
      }
      if (!F) throw new Error(`Could not create file from ${JSON.stringify(T)}`);
      K = await I(M, { file: F, onProgress: C, workers: H });
    } else throw new Error(`"Not a valid path nor a url ${T}`);
    if (V == null) {
      if (K == null) throw new Error(`Failed to convert ${T} to media. Not an existing file or an HTTP URL`);
      if (he) V = new g.Api.InputMediaUploadedPhoto({ file: K });
      else {
        let R = s.utils.getAttributes(T, { mimeType: oe, attributes: E, forceDocument: k && !U, voiceNote: W, videoNote: G, supportsStreaming: te, thumb: q });
        E = R.attrs, oe = R.mimeType;
        let ee;
        if (!q) ee = void 0;
        else {
          if (typeof q == "string") ee = new c(r.default.basename(q), (await e.promises.stat(q)).size, q);
          else if (typeof File < "u" && q instanceof File) ee = q;
          else {
            let Y;
            "name" in q ? Y = q.name : Y = "unnamed", t.isBuffer(q) && (ee = new c(Y, q.length, "", q));
          }
          if (!ee) throw new Error(`Could not create file from ${T}`);
          ee = await I(M, { file: ee, workers: 1 });
        }
        V = new g.Api.InputMediaUploadedDocument({ file: K, mimeType: oe, attributes: E, thumb: ee, forceFile: k && !U });
      }
    }
    return { fileHandle: K, media: V, image: he };
  }
  async function f(M, T, { file: k, caption: B, forceDocument: C = false, fileSize: E, clearDraft: q = false, progressCallback: W, replyTo: G, attributes: te, thumb: oe, parseMode: he, voiceNote: H = false, videoNote: U = false, silent: V, supportsStreaming: K = false, scheduleDate: F, workers: R = 1, noforwards: ee, commentTo: Y, topMsgId: Q }) {
    T = await M.getInputEntity(T);
    let se = [];
    Array.isArray(k) ? se = k : se = [k], Array.isArray(B) || (B || (B = ""), B = [B]);
    const ge = [];
    for (const ve of B) ge.push(await (0, n._parseMessageText)(M, ve, he));
    if (Y != null) {
      const ve = await (0, a.getCommentData)(M, T, Y);
      T = ve.entity, G = ve.replyTo;
    } else G = s.utils.getMessageId(G);
    te || (te = []);
    let ue = 0;
    const ce = [];
    for (const ve of se) {
      let { fileHandle: we, media: De, image: Me } = await b(M, { file: ve, forceDocument: C, fileSize: E, progressCallback: W, attributes: te[ue], thumb: oe, voiceNote: H, videoNote: U, supportsStreaming: K, workers: R });
      if (ue++, De instanceof g.Api.InputMediaUploadedPhoto || De instanceof g.Api.InputMediaPhotoExternal) {
        const qe = await M.invoke(new g.Api.messages.UploadMedia({ peer: T, media: De }));
        qe instanceof g.Api.MessageMediaPhoto && (De = (0, l.getInputMedia)(qe.photo));
      } else if (De instanceof g.Api.InputMediaUploadedDocument) {
        const qe = await M.invoke(new g.Api.messages.UploadMedia({ peer: T, media: De }));
        qe instanceof g.Api.MessageMediaDocument && (De = (0, l.getInputMedia)(qe.document));
      }
      let Ve = "", ke = [];
      ge.length && ([Ve, ke] = ge.shift()), ce.push(new g.Api.InputSingleMedia({ media: De, message: Ve, entities: ke }));
    }
    let ye;
    G != null && (ye = new g.Api.InputReplyToMessage({ replyToMsgId: (0, l.getMessageId)(G), topMsgId: (0, l.getMessageId)(Q) }));
    const v = await M.invoke(new g.Api.messages.SendMultiMedia({ peer: T, replyTo: ye, multiMedia: ce, silent: V, scheduleDate: F, clearDraft: q, noforwards: ee })), le = ce.map((ve) => ve.randomId);
    return M._getResponseMessage(le, v, T);
  }
  async function p(M, T, { file: k, caption: B, forceDocument: C = false, fileSize: E, clearDraft: q = false, progressCallback: W, replyTo: G, attributes: te, thumb: oe, parseMode: he, formattingEntities: H, voiceNote: U = false, videoNote: V = false, buttons: K, silent: F, supportsStreaming: R = false, scheduleDate: ee, workers: Y = 1, noforwards: Q, commentTo: se, topMsgId: ge }) {
    if (!k) throw new Error("You need to specify a file");
    if (B || (B = ""), T = await M.getInputEntity(T), se != null) {
      const Me = await (0, a.getCommentData)(M, T, se);
      T = Me.entity, G = Me.replyTo;
    } else G = s.utils.getMessageId(G);
    if (Array.isArray(k)) return await f(M, T, { file: k, caption: B, replyTo: G, parseMode: he, attributes: te, silent: F, scheduleDate: ee, supportsStreaming: R, clearDraft: q, forceDocument: C, noforwards: Q, topMsgId: ge });
    Array.isArray(B) && (B = B[0] || "");
    let ue;
    H != null ? ue = H : [B, ue] = await (0, n._parseMessageText)(M, B, he);
    const { fileHandle: ce, media: ye, image: v } = await b(M, { file: k, forceDocument: C, fileSize: E, progressCallback: W, attributes: te, thumb: oe, voiceNote: U, videoNote: V, supportsStreaming: R, workers: Y });
    if (ye == null) throw new Error(`Cannot use ${k} as file.`);
    const le = M.buildReplyMarkup(K);
    let ve;
    G != null && (ve = new g.Api.InputReplyToMessage({ replyToMsgId: (0, l.getMessageId)(G), topMsgId: (0, l.getMessageId)(ge) }));
    const we = new g.Api.messages.SendMedia({ peer: T, media: ye, replyTo: ve, message: B, entities: ue, replyMarkup: le, silent: F, scheduleDate: ee, clearDraft: q, noforwards: Q }), De = await M.invoke(we);
    return M._getResponseMessage(we, De, T);
  }
  function w(M) {
    if (typeof File < "u" && M instanceof File) return new Response(M).arrayBuffer();
    if (M instanceof c) return M.buffer != null ? M.buffer : e.promises.readFile(M.path);
    throw new Error("Could not create buffer from file " + M);
  }
  return Ct;
}
var No;
function Ji() {
  if (No) return ze;
  No = 1;
  var t = ze && ze.__asyncValues || function(B) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var C = B[Symbol.asyncIterator], E;
    return C ? C.call(B) : (B = typeof __values == "function" ? __values(B) : B[Symbol.iterator](), E = {}, q("next"), q("throw"), q("return"), E[Symbol.asyncIterator] = function() {
      return this;
    }, E);
    function q(G) {
      E[G] = B[G] && function(te) {
        return new Promise(function(oe, he) {
          te = B[G](te), W(oe, he, te.done, te.value);
        });
      };
    }
    function W(G, te, oe, he) {
      Promise.resolve(he).then(function(H) {
        G({ value: H, done: oe });
      }, te);
    }
  }, d = ze && ze.__importDefault || function(B) {
    return B && B.__esModule ? B : { default: B };
  };
  Object.defineProperty(ze, "__esModule", { value: true }), ze._IDsIter = ze._MessagesIter = void 0, ze.iterMessages = $, ze.getMessages = m, ze.sendMessage = h, ze.forwardMessages = I, ze.editMessage = b, ze.deleteMessages = f, ze.pinMessage = p, ze.unpinMessage = w, ze._pin = M, ze.markAsRead = T, ze.getCommentData = k;
  const g = Oe(), i = Ws(), l = Ae(), r = Xe(), e = Ye(), s = Cs(), n = Fs(), a = d(Ke()), o = Zi(), c = 100;
  class u extends i.RequestIter {
    async _init({ entity: C, offsetId: E, minId: q, maxId: W, fromUser: G, offsetDate: te, addOffset: oe, filter: he, search: H, replyTo: U }) {
      var V, K, F, R;
      if (C) this.entity = await this.client.getInputEntity(C);
      else if (this.entity = void 0, this.reverse) throw new Error("Cannot reverse global search");
      if (this.reverse) {
        if (E = Math.max(E, q), E && W && W - E <= 1) return false;
        W || (W = Number.MAX_SAFE_INTEGER);
      } else if (E = Math.max(E, W), E && q && E - q <= 1) return false;
      if (this.reverse && (E ? E += 1 : te || (E = 1)), G && (G = await this.client.getInputEntity(G)), !this.entity && G && (this.entity = new g.Api.InputPeerEmpty()), he || (he = new g.Api.InputMessagesFilterEmpty()), !this.entity) this.request = new g.Api.messages.SearchGlobal({ q: H || "", filter: he, minDate: void 0, maxDate: te, offsetRate: void 0, offsetPeer: new g.Api.InputPeerEmpty(), offsetId: E, limit: 1 });
      else if (U !== void 0) this.request = new g.Api.messages.GetReplies({ peer: this.entity, msgId: U, offsetId: E, offsetDate: te, addOffset: oe, limit: 0, maxId: 0, minId: 0, hash: a.default.zero });
      else if (H !== void 0 || !(he instanceof g.Api.InputMessagesFilterEmpty) || G !== void 0) {
        if (this.request = new g.Api.messages.Search({ peer: this.entity, q: H || "", filter: typeof he == "function" ? new he() : he, minDate: void 0, maxDate: te, offsetId: E, addOffset: oe, limit: 0, maxId: 0, minId: 0, hash: (0, l.generateRandomBigInt)(), fromId: G }), !(he instanceof g.Api.InputMessagesFilterEmpty) && te && !H && !E) try {
          for (var ee = true, Y = t(this.client.iterMessages(this.entity, { limit: 1, offsetDate: te })), Q; Q = await Y.next(), V = Q.done, !V; ee = true) {
            R = Q.value, ee = false;
            const se = R;
            this.request.offsetId = se.id + 1;
          }
        } catch (se) {
          K = { error: se };
        } finally {
          try {
            !ee && !V && (F = Y.return) && await F.call(Y);
          } finally {
            if (K) throw K.error;
          }
        }
      } else this.request = new g.Api.messages.GetHistory({ peer: this.entity, limit: 1, offsetDate: te, offsetId: E, minId: 0, maxId: 0, addOffset: oe, hash: a.default.zero });
      if (this.limit <= 0) {
        const se = await this.client.invoke(this.request);
        return se instanceof g.Api.messages.MessagesNotModified ? this.total = se.count : "count" in se ? this.total = se.count : this.total = se.messages.length, false;
      }
      this.waitTime || (this.waitTime = this.limit > 3e3 ? 1 : 0), this.reverse && !(this.request instanceof g.Api.messages.SearchGlobal) && (this.request.addOffset -= c), this.addOffset = oe, this.maxId = W, this.minId = q, this.lastId = this.reverse ? 0 : Number.MAX_SAFE_INTEGER;
    }
    async _loadNextChunk() {
      var C;
      if (!this.request) throw new Error("Request not set yet");
      this.request.limit = Math.min(this.left, c), this.reverse && this.request.limit != c && (this.request instanceof g.Api.messages.SearchGlobal || (this.request.addOffset = this.addOffset - this.request.limit));
      const E = await this.client.invoke(this.request);
      if (E instanceof g.Api.messages.MessagesNotModified) return true;
      "count" in E ? this.total = E.count : this.total = E.messages.length;
      const q = /* @__PURE__ */ new Map();
      for (const G of [...E.users, ...E.chats]) q.set((0, r.getPeerId)(G), G);
      const W = this.reverse ? E.messages.reverse() : E.messages;
      for (const G of W) {
        if (!this._messageInRange(G)) return true;
        this.lastId = G.id;
        try {
          G._finishInit(this.client, q, this.entity);
        } catch {
        }
        G._entities = q, (C = this.buffer) === null || C === void 0 || C.push(G);
      }
      if (E.messages.length < this.request.limit) return true;
      if (this.buffer) this._updateOffset(this.buffer[this.buffer.length - 1], E);
      else return true;
    }
    _messageInRange(C) {
      if (this.entity) {
        if (this.reverse) {
          if (C.id <= this.lastId || C.id >= this.maxId) return false;
        } else if (C.id >= this.lastId || C.id <= this.minId) return false;
      }
      return true;
    }
    [Symbol.asyncIterator]() {
      return super[Symbol.asyncIterator]();
    }
    _updateOffset(C, E) {
      if (!this.request) throw new Error("Request not set yet");
      this.request.offsetId = Number(C.id), this.reverse && (this.request.offsetId += 1), this.request instanceof g.Api.messages.Search ? this.request.maxDate = -1 : this.request instanceof g.Api.messages.SearchGlobal || (this.request.offsetDate = C.date), this.request instanceof g.Api.messages.SearchGlobal && (C.inputChat ? this.request.offsetPeer = C.inputChat : this.request.offsetPeer = new g.Api.InputPeerEmpty(), this.request.offsetRate = E.nextRate);
    }
  }
  ze._MessagesIter = u;
  class _ extends i.RequestIter {
    async _init({ entity: C, ids: E }) {
      this.total = E.length, this._ids = this.reverse ? E.reverse() : E, this._offset = 0, this._entity = C ? await this.client.getInputEntity(C) : void 0, this._ty = this._entity ? (0, l._entityType)(this._entity) : void 0, this.waitTime || (this.waitTime = this.limit > 300 ? 10 : 0);
    }
    [Symbol.asyncIterator]() {
      return super[Symbol.asyncIterator]();
    }
    async _loadNextChunk() {
      var C, E, q;
      const W = this._ids.slice(this._offset, this._offset + c);
      if (!W.length) return false;
      this._offset += c;
      let G, te;
      if (this._ty == l._EntityType.CHANNEL) try {
        te = await this.client.invoke(new g.Api.channels.GetMessages({ channel: this._entity, id: W }));
      } catch (H) {
        if (H.errorMessage == "MESSAGE_IDS_EMPTY") te = new g.Api.messages.MessagesNotModified({ count: W.length });
        else throw H;
      }
      else te = await this.client.invoke(new g.Api.messages.GetMessages({ id: W })), this._entity && (G = await (0, n._getPeer)(this.client, this._entity));
      if (te instanceof g.Api.messages.MessagesNotModified) {
        (C = this.buffer) === null || C === void 0 || C.push(...Array(W.length));
        return;
      }
      const oe = /* @__PURE__ */ new Map();
      for (const H of [...te.users, ...te.chats]) oe.set(e.utils.getPeerId(H), H);
      let he;
      for (he of te.messages) if (he instanceof g.Api.MessageEmpty || G && e.utils.getPeerId(he.peerId) != e.utils.getPeerId(G)) (E = this.buffer) === null || E === void 0 || E.push(void 0);
      else {
        const H = he;
        H._finishInit(this.client, oe, this._entity), H._entities = oe, (q = this.buffer) === null || q === void 0 || q.push(H);
      }
    }
  }
  ze._IDsIter = _;
  const S = { limit: void 0, offsetDate: void 0, offsetId: 0, maxId: 0, minId: 0, addOffset: 0, search: void 0, filter: void 0, fromUser: void 0, waitTime: void 0, ids: void 0, reverse: false, replyTo: void 0, scheduled: false };
  function $(B, C, E) {
    const { limit: q, offsetDate: W, offsetId: G, maxId: te, minId: oe, addOffset: he, search: H, filter: U, fromUser: V, waitTime: K, ids: F, reverse: R, replyTo: ee } = Object.assign(Object.assign({}, S), E);
    if (F) {
      let Y;
      return (0, l.isArrayLike)(F) ? Y = F : Y = [F], new _(B, Y.length, { reverse: R, waitTime: K }, { entity: C, ids: Y });
    }
    return new u(B, q, { waitTime: K, reverse: R }, { entity: C, offsetId: G, minId: oe, maxId: te, fromUser: V, offsetDate: W, addOffset: he, filter: U, search: H, replyTo: ee });
  }
  async function m(B, C, E) {
    var q, W, G, te;
    Object.keys(E).length == 1 && E.limit === void 0 && (E.minId === void 0 && E.maxId === void 0 ? E.limit = void 0 : E.limit = 1);
    const oe = B.iterMessages(C, E), he = E.ids;
    if (he && !(0, l.isArrayLike)(he)) {
      try {
        for (var H = true, U = t(oe), V; V = await U.next(), q = V.done, !q; H = true) return te = V.value, H = false, [te];
      } catch (K) {
        W = { error: K };
      } finally {
        try {
          !H && !q && (G = U.return) && await G.call(U);
        } finally {
          if (W) throw W.error;
        }
      }
      return [];
    }
    return await oe.collect();
  }
  async function h(B, C, { message: E, replyTo: q, attributes: W, parseMode: G, formattingEntities: te, linkPreview: oe = true, file: he, thumb: H, forceDocument: U, clearDraft: V, buttons: K, silent: F, supportStreaming: R, schedule: ee, noforwards: Y, commentTo: Q, topMsgId: se } = {}) {
    if (he) return B.sendFile(C, { file: he, caption: E ? typeof E == "string" ? E : E.message : "", forceDocument: U, clearDraft: V, replyTo: q, attributes: W, thumb: H, supportsStreaming: R, parseMode: G, formattingEntities: te, silent: F, scheduleDate: ee, buttons: K, noforwards: Y, commentTo: Q, topMsgId: se });
    if (C = await B.getInputEntity(C), Q != null) {
      const v = await k(B, C, Q);
      C = v.entity, q = v.replyTo;
    }
    let ge, ue, ce;
    if (q != null && (ce = new g.Api.InputReplyToMessage({ replyToMsgId: (0, r.getMessageId)(q), topMsgId: (0, r.getMessageId)(se) })), E && E instanceof g.Api.Message) {
      if (K == null ? ge = E.replyMarkup : ge = B.buildReplyMarkup(K), F == null && (F = E.silent), E.media && !(E.media instanceof g.Api.MessageMediaWebPage)) return B.sendFile(C, { file: E.media, caption: E.message, silent: F, replyTo: q, buttons: ge, formattingEntities: E.entities, scheduleDate: ee });
      ue = new g.Api.messages.SendMessage({ peer: C, message: E.message || "", silent: F, replyTo: ce, replyMarkup: ge, entities: E.entities, clearDraft: V, noWebpage: !(E.media instanceof g.Api.MessageMediaWebPage), scheduleDate: ee, noforwards: Y }), E = E.message;
    } else {
      if (te == null && ([E, te] = await (0, s._parseMessageText)(B, E || "", G)), !E) throw new Error("The message cannot be empty unless a file is provided");
      ue = new g.Api.messages.SendMessage({ peer: C, message: E.toString(), entities: te, noWebpage: !oe, replyTo: ce, clearDraft: V, silent: F, replyMarkup: B.buildReplyMarkup(K), scheduleDate: ee, noforwards: Y });
    }
    const ye = await B.invoke(ue);
    if (ye instanceof g.Api.UpdateShortSentMessage) {
      const v = new g.Api.Message({ id: ye.id, peerId: await (0, n._getPeer)(B, C), message: E, date: ye.date, out: ye.out, media: ye.media, entities: ye.entities, replyMarkup: ue.replyMarkup, ttlPeriod: ye.ttlPeriod });
      return v._finishInit(B, /* @__PURE__ */ new Map(), C), v;
    }
    return B._getResponseMessage(ue, ye, C);
  }
  async function I(B, C, { messages: E, fromPeer: q, silent: W, schedule: G, noforwards: te, dropAuthor: oe }) {
    (0, l.isArrayLike)(E) || (E = [E]), C = await B.getInputEntity(C);
    let he;
    q && (q = await B.getInputEntity(q), he = await B.getPeerId(q));
    const H = (V) => {
      if (V instanceof g.Api.Message) return V.chatId;
      if ((0, r.parseID)(V)) {
        if (he !== void 0) return he;
        throw new Error("fromPeer must be given if integer IDs are used");
      } else throw new Error(`Cannot forward ${V}`);
    }, U = [];
    for (let [V, K] of (0, l.groupBy)(E, H)) {
      let F, R = [];
      typeof K[0] == "number" ? (F = q, R = K) : (F = await K[0].getInputChat(), R = K.map((Q) => Q.id)), K.push();
      const ee = new g.Api.messages.ForwardMessages({ fromPeer: F, id: R, toPeer: C, silent: W, scheduleDate: G, noforwards: te, dropAuthor: oe }), Y = await B.invoke(ee);
      U.push(B._getResponseMessage(ee, Y, C));
    }
    return U;
  }
  async function b(B, C, { message: E, text: q, parseMode: W, formattingEntities: G, linkPreview: te = true, file: oe, forceDocument: he, buttons: H, schedule: U }) {
    if (typeof E == "number" && typeof q > "u" && !oe && !U) throw Error("You have to provide either file or text or schedule property.");
    C = await B.getInputEntity(C);
    let V, K, F, R;
    if (oe) {
      const { fileHandle: Q, media: se, image: ge } = await (0, o._fileToMedia)(B, { file: oe, forceDocument: he });
      R = se;
    }
    if (E instanceof g.Api.Message) V = (0, r.getMessageId)(E), q = E.message, F = E.entities, H == null ? K = E.replyMarkup : K = B.buildReplyMarkup(H), E.media && (R = (0, r.getInputMedia)(E.media, { forceDocument: he }));
    else {
      if (typeof E != "number") throw Error("editMessageParams.message must be either a number or a Api.Message type");
      V = E, G == null ? [q, F] = await (0, s._parseMessageText)(B, q || "", W) : F = G, K = B.buildReplyMarkup(H);
    }
    const ee = new g.Api.messages.EditMessage({ peer: C, id: V, message: q, noWebpage: !te, entities: F, media: R, replyMarkup: K, scheduleDate: U }), Y = await B.invoke(ee);
    return B._getResponseMessage(ee, Y, C);
  }
  async function f(B, C, E, { revoke: q = false }) {
    let W = l._EntityType.USER;
    C && (C = await B.getInputEntity(C), W = (0, l._entityType)(C));
    const G = [];
    for (const oe of E) if (oe instanceof g.Api.Message || oe instanceof g.Api.MessageService || oe instanceof g.Api.MessageEmpty) G.push(oe.id);
    else if (typeof oe == "number") G.push(oe);
    else throw new Error(`Cannot convert ${oe} to an integer`);
    const te = [];
    if (W == l._EntityType.CHANNEL) for (const oe of e.utils.chunks(G)) te.push(B.invoke(new g.Api.channels.DeleteMessages({ channel: C, id: oe })));
    else for (const oe of e.utils.chunks(G)) te.push(B.invoke(new g.Api.messages.DeleteMessages({ id: oe, revoke: q })));
    return Promise.all(te);
  }
  async function p(B, C, E, q) {
    return await M(B, C, E, false, q == null ? void 0 : q.notify, q == null ? void 0 : q.pmOneSide);
  }
  async function w(B, C, E, q) {
    return await M(B, C, E, true, q == null ? void 0 : q.notify, q == null ? void 0 : q.pmOneSide);
  }
  async function M(B, C, E, q, W = false, G = false) {
    if (E = e.utils.getMessageId(E) || 0, E === 0) return await B.invoke(new g.Api.messages.UnpinAllMessages({ peer: C }));
    C = await B.getInputEntity(C);
    const te = new g.Api.messages.UpdatePinnedMessage({ silent: !W, unpin: q, pmOneside: G, peer: C, id: E }), oe = await B.invoke(te);
    if (!(q || !("updates" in oe) || "updates" in oe && !oe.updates)) return B._getResponseMessage(te, oe, C);
  }
  async function T(B, C, E, q) {
    let W = (q == null ? void 0 : q.maxId) || 0;
    const G = (q == null ? void 0 : q.maxId) === void 0;
    return G && E && (Array.isArray(E) ? W = Math.max(...E.map((te) => e.utils.getMessageId(te))) : W = e.utils.getMessageId(E)), C = await B.getInputEntity(C), q && !q.clearMentions && (await B.invoke(new g.Api.messages.ReadMentions({ peer: C })), G && E === void 0) ? true : (0, l._entityType)(C) === l._EntityType.CHANNEL ? await B.invoke(new g.Api.channels.ReadHistory({ channel: C, maxId: W })) : (await B.invoke(new g.Api.messages.ReadHistory({ peer: C, maxId: W })), true);
  }
  async function k(B, C, E) {
    const q = await B.invoke(new g.Api.messages.GetDiscussionMessage({ peer: C, msgId: e.utils.getMessageId(E) })), W = q.messages.reduce((te, oe) => te && te.id < oe.id ? te : oe);
    let G;
    for (const te of q.chats) if (W.peerId instanceof g.Api.PeerChannel && te.id.eq(W.peerId.channelId)) {
      G = te;
      break;
    }
    return { entity: e.utils.getInputPeer(G), replyTo: W.id };
  }
  return ze;
}
var ut = {}, fs = {}, bt = {}, qi = {}, Fo;
function q2e() {
  return Fo || (Fo = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.ChatGetter = void 0;
    var d = Ns();
    Object.defineProperty(t, "ChatGetter", { enumerable: true, get: function() {
      return d.ChatGetter;
    } });
  })(qi)), qi;
}
var jo;
function Zc() {
  if (jo) return bt;
  jo = 1;
  var t = bt && bt.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(bt, "__esModule", { value: true }), bt.EventCommonSender = bt.EventCommon = bt.EventBuilder = void 0, bt._intoIdSet = n;
  const d = Oe(), g = q2e(), i = Ae(), l = Ye(), r = ji(), e = t(Ke()), s = Xe();
  async function n(u, _) {
    if (_ == null) return;
    (0, i.isArrayLike)(_) || (_ = [_]);
    const S = /* @__PURE__ */ new Set();
    for (let $ of _) typeof $ == "number" || typeof $ == "bigint" || typeof $ == "string" && (0, s.parseID)($) || e.default.isInstance($) ? ($ = (0, i.returnBigInt)($), $.lesser(0) ? S.add($.toString()) : (S.add(l.utils.getPeerId(new d.Api.PeerUser({ userId: $ }))), S.add(l.utils.getPeerId(new d.Api.PeerChat({ chatId: $ }))), S.add(l.utils.getPeerId(new d.Api.PeerChannel({ channelId: $ }))))) : (typeof $ == "object" && $.SUBCLASS_OF_ID == 47470215 || ($ = await u.getInputEntity($), $ instanceof d.Api.InputPeerSelf && ($ = await u.getMe(true))), S.add(l.utils.getPeerId($)));
    return Array.from(S);
  }
  class a {
    constructor(_) {
      var S;
      this.chats = (S = _.chats) === null || S === void 0 ? void 0 : S.map(($) => $.toString()), this.blacklistChats = _.blacklistChats || false, this.resolved = false, this.func = _.func;
    }
    build(_, S, $) {
      if (_) return _;
    }
    async resolve(_) {
      this.resolved || (await this._resolve(_), this.resolved = true);
    }
    async _resolve(_) {
      this.chats = await n(_, this.chats);
    }
    filter(_) {
      if (this.resolved && !(this.chats != null && (_.chatId == null || this.chats.includes(_.chatId.toString()) == this.blacklistChats)) && !(this.func && !this.func(_))) return _;
    }
  }
  bt.EventBuilder = a;
  class o extends g.ChatGetter {
    constructor({ chatPeer: _ = void 0, msgId: S = void 0, broadcast: $ = void 0 }) {
      super(), this._eventName = "Event", g.ChatGetter.initChatClass(this, { chatPeer: _, broadcast: $ }), this._entities = /* @__PURE__ */ new Map(), this._client = void 0, this._messageId = S;
    }
    _setClient(_) {
      this._client = _;
    }
    get client() {
      return this._client;
    }
  }
  bt.EventCommon = o;
  class c extends r.SenderGetter {
    constructor({ chatPeer: _ = void 0, msgId: S = void 0, broadcast: $ = void 0 }) {
      super(), this._eventName = "Event", g.ChatGetter.initChatClass(this, { chatPeer: _, broadcast: $ }), r.SenderGetter.initChatClass(this, { chatPeer: _, broadcast: $ }), this._entities = /* @__PURE__ */ new Map(), this._client = void 0, this._messageId = S;
    }
    _setClient(_) {
      this._client = _;
    }
    get client() {
      return this._client;
    }
  }
  return bt.EventCommonSender = c, bt;
}
var Go;
function Jc() {
  if (Go) return fs;
  Go = 1, Object.defineProperty(fs, "__esModule", { value: true }), fs.Raw = void 0;
  const t = Zc();
  let d = class extends t.EventBuilder {
    constructor(i) {
      super({ func: i.func }), this.types = i.types;
    }
    async resolve(i) {
      this.resolved = true;
    }
    build(i) {
      return i;
    }
    filter(i) {
      if (this.types) {
        let l = false;
        for (const r of this.types) if (i instanceof r) {
          l = true;
          break;
        }
        if (!l) return;
      }
      return super.filter(i);
    }
  };
  return fs.Raw = d, fs;
}
var Ho;
function Ni() {
  if (Ho) return ut;
  Ho = 1, Object.defineProperty(ut, "__esModule", { value: true }), ut.StopPropagation = void 0, ut.on = S, ut.addEventHandler = $, ut.removeEventHandler = m, ut.listEventHandlers = h, ut.catchUp = I, ut._handleUpdate = b, ut._processUpdate = f, ut._dispatchUpdate = p, ut._updateLoop = w;
  const t = Oe(), d = Es(), g = Ye(), i = Ae(), l = xt(), r = 9e3, e = 1e4, s = 3, n = 100, a = 6e4, o = 5e3, c = 3e3, u = 1e3;
  class _ extends Error {
  }
  ut.StopPropagation = _;
  function S(k, B) {
    return (C) => (k.addEventHandler(C, B), C);
  }
  function $(k, B, C) {
    if (C == null) {
      const E = Jc().Raw;
      C = new E({});
    }
    C.client = k, k._eventBuilders.push([C, B]);
  }
  function m(k, B, C) {
    k._eventBuilders = k._eventBuilders.filter(function(E) {
      return E[0] !== C && E[1] !== B;
    });
  }
  function h(k) {
    return k._eventBuilders;
  }
  function I() {
  }
  function b(k, B) {
    if (typeof B == "number" && [-1, 0, 1].includes(B)) {
      p(k, { update: new d.UpdateConnectionState(B) });
      return;
    }
    if (k._entityCache.add(B), k.session.processEntities(B), B instanceof t.Api.Updates || B instanceof t.Api.UpdatesCombined) {
      const C = /* @__PURE__ */ new Map();
      for (const E of [...B.users, ...B.chats]) C.set(g.utils.getPeerId(E), E);
      for (const E of B.updates) f(k, E, B.updates, C);
    } else B instanceof t.Api.UpdateShort ? f(k, B.update) : f(k, B);
  }
  function f(k, B, C, E) {
    B._entities = E || /* @__PURE__ */ new Map(), p(k, { update: B });
  }
  async function p(k, B) {
    for (const [C, E] of k._eventBuilders) {
      if (!C || !E) continue;
      C.resolved || await C.resolve(k);
      let q = B.update;
      if (q) {
        if (!k._selfInputPeer) try {
          await k.getMe(true);
        } catch {
        }
        if (q instanceof d.UpdateConnectionState, q = C.build(q, E, k._selfInputPeer ? (0, i.returnBigInt)(k._selfInputPeer.userId) : void 0), q) {
          if (q._client = k, "_eventName" in q && (q._setClient(k), q.originalUpdate = B.update, q._entities = B.update._entities), !await C.filter(q)) continue;
          try {
            await E(q);
          } catch (G) {
            if (G instanceof _) break;
            k._errorHandler && await k._errorHandler(G), k._log.canSend(l.LogLevel.ERROR) && console.error(G);
          }
        }
      }
    }
  }
  async function w(k) {
    let B;
    for (; !k._destroyed && (await (0, i.sleep)(r, true), !k._destroyed); ) {
      if (k._sender.isReconnecting || k._isSwitchingDc) {
        B = void 0;
        continue;
      }
      try {
        const C = () => k._sender.send(new t.Api.PingDelayDisconnect({ pingId: (0, i.returnBigInt)((0, i.getRandomInt)(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)), disconnectDelay: a })), E = Date.now(), q = B ? E - B : void 0;
        if (!q || q < o) await M(() => T(C, e), s, n);
        else {
          let W = setTimeout(() => {
            b(k, d.UpdateConnectionState.disconnected), W = void 0;
          }, u);
          await T(C, c), W && (clearTimeout(W), W = void 0), b(k, d.UpdateConnectionState.connected);
        }
        B = Date.now();
      } catch (C) {
        if (k._errorHandler && await k._errorHandler(C), k._log.canSend(l.LogLevel.ERROR) && console.error(C), B = void 0, k._sender.isReconnecting || k._isSwitchingDc) continue;
        k._sender.reconnect();
      }
      if (Date.now() - (k._lastRequest || 0) > 1800 * 1e3) {
        try {
          await k.invoke(new t.Api.updates.GetState());
        } catch {
        }
        B = void 0;
      }
    }
    await k.disconnect();
  }
  async function M(k, B, C) {
    for (let E = 0; E < B; E++) try {
      return await k();
    } catch (q) {
      if (E === B - 1) throw q;
      await (0, i.sleep)(C);
    }
  }
  function T(k, B) {
    let C = false;
    return Promise.race([k(), (0, i.sleep)(B).then(() => C ? void 0 : Promise.reject(new Error("TIMEOUT")))]).finally(() => {
      C = true;
    });
  }
  return ut;
}
var Rt = {}, zo;
function Qc() {
  if (zo) return Rt;
  zo = 1;
  var t = Rt && Rt.__importDefault || function(m) {
    return m && m.__esModule ? m : { default: m };
  };
  Object.defineProperty(Rt, "__esModule", { value: true }), Rt._ParticipantsIter = void 0, Rt.iterParticipants = _, Rt.getParticipants = S, Rt.kickParticipant = $;
  const d = Ae(), g = Ws(), i = Ye(), l = Oe(), r = t(Ke()), e = ft(), s = Xe(), n = 200, a = 100;
  class o {
    [e.inspect.custom]() {
      return (0, d.betterConsoleLog)(this);
    }
    constructor(h, I, b, f = { delay: 4, autoCancel: true }) {
      this._client = h, this._chat = I, this._action = b, this._delay = f.delay, this.autoCancel = f.autoCancel, this._request = void 0, this._task = null, this._running = false;
    }
    async start() {
      this._request = new l.Api.messages.SetTyping({ peer: this._chat, action: this._action }), this._running = true, this._update();
    }
    async stop() {
      this._running = false, this.autoCancel && await this._client.invoke(new l.Api.messages.SetTyping({ peer: this._chat, action: new l.Api.SendMessageCancelAction() }));
    }
    async _update() {
      for (; this._running; ) this._request != null && await this._client.invoke(this._request), await (0, d.sleep)(this._delay * 1e3);
    }
    progress(h, I) {
      "progress" in this._action && (this._action.progress = 100 * Math.round(h / I));
    }
  }
  o._str_mapping = { typing: new l.Api.SendMessageTypingAction(), contact: new l.Api.SendMessageChooseContactAction(), game: new l.Api.SendMessageGamePlayAction(), location: new l.Api.SendMessageGeoLocationAction(), "record-audio": new l.Api.SendMessageRecordAudioAction(), "record-voice": new l.Api.SendMessageRecordAudioAction(), "record-round": new l.Api.SendMessageRecordRoundAction(), "record-video": new l.Api.SendMessageRecordVideoAction(), audio: new l.Api.SendMessageUploadAudioAction({ progress: 1 }), voice: new l.Api.SendMessageUploadAudioAction({ progress: 1 }), song: new l.Api.SendMessageUploadAudioAction({ progress: 1 }), round: new l.Api.SendMessageUploadRoundAction({ progress: 1 }), video: new l.Api.SendMessageUploadVideoAction({ progress: 1 }), photo: new l.Api.SendMessageUploadPhotoAction({ progress: 1 }), document: new l.Api.SendMessageUploadDocumentAction({ progress: 1 }), file: new l.Api.SendMessageUploadDocumentAction({ progress: 1 }), cancel: new l.Api.SendMessageCancelAction() };
  class c extends g.RequestIter {
    [e.inspect.custom]() {
      return (0, d.betterConsoleLog)(this);
    }
    async _init({ entity: h, filter: I, offset: b, search: f, showTotal: p }) {
      var w, M;
      b || (b = 0), I && I.constructor === Function && ([l.Api.ChannelParticipantsBanned, l.Api.ChannelParticipantsKicked, l.Api.ChannelParticipantsSearch, l.Api.ChannelParticipantsContacts].includes(I) ? I = new I({ q: "" }) : I = new I()), h = await this.client.getInputEntity(h);
      const T = i.helpers._entityType(h);
      if (f && (I || T != i.helpers._EntityType.CHANNEL) ? (f = f.toLowerCase(), this.filterEntity = (k) => i.utils.getDisplayName(k).toLowerCase().includes(f) || ("username" in k && k.username || "").toLowerCase().includes(f)) : this.filterEntity = (k) => true, this.requests = [], T == i.helpers._EntityType.CHANNEL) {
        if (p) {
          const k = await this.client.invoke(new l.Api.channels.GetFullChannel({ channel: h }));
          k.fullChat instanceof l.Api.ChatFull || (this.total = k.fullChat.participantsCount);
        }
        if (this.total && this.total <= 0) return false;
        this.requests.push(new l.Api.channels.GetParticipants({ channel: h, filter: I || new l.Api.ChannelParticipantsSearch({ q: f || "" }), offset: b, limit: n, hash: r.default.zero }));
      } else if (T == i.helpers._EntityType.CHAT) {
        if (!("chatId" in h)) throw new Error("Found chat without id " + JSON.stringify(h));
        const k = await this.client.invoke(new l.Api.messages.GetFullChat({ chatId: h.chatId }));
        if (k.fullChat instanceof l.Api.ChatFull) {
          if (!(k.fullChat.participants instanceof l.Api.ChatParticipantsForbidden)) this.total = k.fullChat.participants.participants.length;
          else return this.total = 0, false;
          const B = /* @__PURE__ */ new Map();
          for (const C of k.users) B.set(C.id.toString(), C);
          for (const C of k.fullChat.participants.participants) {
            const E = B.get(C.userId.toString());
            this.filterEntity(E) && (E.participant = C, (w = this.buffer) === null || w === void 0 || w.push(E));
          }
          return true;
        }
      } else {
        if (this.total = 1, this.limit != 0) {
          const k = await this.client.getEntity(h);
          this.filterEntity(k) && (k.participant = void 0, (M = this.buffer) === null || M === void 0 || M.push(k));
        }
        return true;
      }
    }
    async _loadNextChunk() {
      var h, I;
      if (!(!((h = this.requests) === null || h === void 0) && h.length)) return true;
      this.requests[0].limit = Math.min(this.limit - this.requests[0].offset, n);
      const b = [];
      for (const f of this.requests) b.push(await this.client.invoke(f));
      for (let f = this.requests.length - 1; f >= 0; f--) {
        const p = b[f];
        if (p instanceof l.Api.channels.ChannelParticipantsNotModified || !p.users.length) {
          this.requests.splice(f, 1);
          continue;
        }
        this.requests[f].offset += p.participants.length;
        const w = /* @__PURE__ */ new Map();
        for (const M of p.users) w.set(M.id.toString(), M);
        for (const M of p.participants) {
          if (!("userId" in M)) continue;
          const T = w.get(M.userId.toString());
          this.filterEntity && !this.filterEntity(T) || (T.participant = M, (I = this.buffer) === null || I === void 0 || I.push(T));
        }
      }
    }
    [Symbol.asyncIterator]() {
      return super[Symbol.asyncIterator]();
    }
  }
  Rt._ParticipantsIter = c;
  class u extends g.RequestIter {
    [e.inspect.custom]() {
      return (0, d.betterConsoleLog)(this);
    }
    async _init(h, I, b) {
      let f;
      b && Object.values(b).find((w) => w === true) && (f = new l.Api.ChannelAdminLogEventsFilter(Object.assign({}, b))), this.entity = await this.client.getInputEntity(h);
      const p = [];
      if (I && I.admins) for (const w of I.admins) p.push(await this.client.getInputEntity(w));
      this.request = new l.Api.channels.GetAdminLog({ channel: this.entity, q: (I == null ? void 0 : I.search) || "", minId: I == null ? void 0 : I.minId, maxId: I == null ? void 0 : I.maxId, limit: 0, eventsFilter: f, admins: p || void 0 });
    }
    async _loadNextChunk() {
      if (!this.request) return true;
      this.request.limit = Math.min(this.left, a);
      const h = await this.client.invoke(this.request), I = /* @__PURE__ */ new Map();
      for (const f of [...h.users, ...h.chats]) I.set(i.utils.getPeerId(f), f);
      const b = [];
      for (const f of h.events) b.push(f.id);
      this.request.maxId = (0, d.getMinBigInt)([r.default.zero, ...b]);
      for (const f of h.events) f.action instanceof l.Api.ChannelAdminLogEventActionEditMessage;
    }
  }
  function _(m, h, { limit: I, offset: b, search: f, filter: p, showTotal: w = true }) {
    return new c(m, I ?? Number.MAX_SAFE_INTEGER, {}, { entity: h, filter: p, offset: b ?? 0, search: f, showTotal: w });
  }
  async function S(m, h, I) {
    return await m.iterParticipants(h, I).collect();
  }
  async function $(m, h, I) {
    const b = await m.getInputEntity(h), f = await m.getInputEntity(I);
    let p, w;
    const M = i.helpers._entityType(b);
    if (M === i.helpers._EntityType.CHAT) w = new l.Api.messages.DeleteChatUser({ chatId: (0, d.returnBigInt)((0, s.getPeerId)(h)), userId: (0, d.returnBigInt)((0, s.getPeerId)(I)) }), p = await m.invoke(w);
    else if (M === i.helpers._EntityType.CHANNEL) f instanceof l.Api.InputPeerSelf ? (w = new l.Api.channels.LeaveChannel({ channel: b }), p = await m.invoke(w)) : (w = new l.Api.channels.EditBanned({ channel: b, participant: f, bannedRights: new l.Api.ChatBannedRights({ untilDate: 0, viewMessages: true }) }), p = await m.invoke(w), await (0, d.sleep)(500), await m.invoke(new l.Api.channels.EditBanned({ channel: b, participant: f, bannedRights: new l.Api.ChatBannedRights({ untilDate: 0 }) })));
    else throw new Error("You must pass either a channel or a chat");
    return m._getResponseMessage(w, p, h);
  }
  return Rt;
}
var Nt = {}, ps = {}, gs = {}, Ko;
function U2e() {
  if (Ko) return gs;
  Ko = 1, Object.defineProperty(gs, "__esModule", { value: true }), gs.Draft = void 0;
  const t = Xe(), d = ht(), g = Ae(), i = ft();
  class l {
    [i.inspect.custom]() {
      return (0, g.betterConsoleLog)(this);
    }
    constructor(e, s, n) {
      if (this._client = e, this._peer = (0, t.getPeer)(s), this._entity = s, this._inputEntity = s ? (0, t.getInputPeer)(s) : void 0, (!n || !(n instanceof d.Api.DraftMessage)) && (n = new d.Api.DraftMessage({ message: "", date: -1 })), !(n instanceof d.Api.DraftMessageEmpty)) {
        this.linkPreview = !n.noWebpage, this._text = e.parseMode ? e.parseMode.unparse(n.message, n.entities || []) : n.message, this._rawText = n.message, this.date = n.date;
        const a = n.replyTo;
        a != null && "replyToMsgId" in a && (this.replyToMsgId = a.replyToMsgId);
      }
    }
    get entity() {
      return this._entity;
    }
    get inputEntity() {
      return this._inputEntity || (this._inputEntity = this._client._entityCache.get(this._peer)), this._inputEntity;
    }
  }
  return gs.Draft = l, gs;
}
var Wo;
function L2e() {
  if (Wo) return ps;
  Wo = 1, Object.defineProperty(ps, "__esModule", { value: true }), ps.Dialog = void 0;
  const t = ht(), d = Xe(), g = U2e(), i = Ae(), l = ft();
  class r {
    [l.inspect.custom]() {
      return (0, i.betterConsoleLog)(this);
    }
    constructor(s, n, a, o) {
      if (this._client = s, this.dialog = n, this.pinned = !!n.pinned, this.folderId = n.folderId, this.archived = n.folderId != null, this.message = o, this.date = this.message.date, this.entity = a.get((0, d.getPeerId)(n.peer)), this.inputEntity = (0, d.getInputPeer)(this.entity), this.entity && (this.id = (0, i.returnBigInt)((0, d.getPeerId)(this.entity)), this.name = this.title = (0, d.getDisplayName)(this.entity)), this.unreadCount = n.unreadCount, this.unreadMentionsCount = n.unreadMentionsCount, !this.entity) throw new Error("Entity not found for dialog");
      this.draft = new g.Draft(s, this.entity, this.dialog.draft), this.isUser = this.entity instanceof t.Api.User, this.isGroup = !!(this.entity instanceof t.Api.Chat || this.entity instanceof t.Api.ChatForbidden || this.entity instanceof t.Api.Channel && this.entity.megagroup), this.isChannel = this.entity instanceof t.Api.Channel;
    }
  }
  return ps.Dialog = r, ps;
}
var Zo;
function Xc() {
  if (Zo) return Nt;
  Zo = 1;
  var t = Nt && Nt.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(Nt, "__esModule", { value: true }), Nt._DialogsIter = void 0, Nt.iterDialogs = o, Nt.getDialogs = c;
  const d = Oe(), g = Ws(), i = Ye(), l = L2e(), r = t(Ke()), e = xt(), s = 100;
  function n(u, _) {
    return "" + [u instanceof d.Api.PeerChannel ? u.channelId : void 0, _];
  }
  class a extends g.RequestIter {
    async _init({ offsetDate: _, offsetId: S, offsetPeer: $, ignorePinned: m, ignoreMigrated: h, folder: I }) {
      if (this.request = new d.Api.messages.GetDialogs({ offsetDate: _, offsetId: S, offsetPeer: $, limit: 1, hash: r.default.zero, excludePinned: m, folderId: I }), this.limit <= 0) {
        const b = await this.client.invoke(this.request);
        return "count" in b ? this.total = b.count : this.total = b.dialogs.length, true;
      }
      this.seen = /* @__PURE__ */ new Set(), this.offsetDate = _, this.ignoreMigrated = h;
    }
    [Symbol.asyncIterator]() {
      return super[Symbol.asyncIterator]();
    }
    async _loadNextChunk() {
      var _;
      if (!this.request || !this.seen || !this.buffer) return;
      this.request.limit = Math.min(this.left, s);
      const S = await this.client.invoke(this.request);
      if (S instanceof d.Api.messages.DialogsNotModified) return;
      "count" in S ? this.total = S.count : this.total = S.dialogs.length;
      const $ = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
      for (const I of [...S.users, ...S.chats]) I instanceof d.Api.UserEmpty || I instanceof d.Api.ChatEmpty || $.set(i.utils.getPeerId(I), I);
      for (const I of S.messages) {
        let b = I;
        try {
          b && "_finishInit" in b && b._finishInit(this.client, $, void 0);
        } catch (f) {
          console.log("msg", b), this.client._log.error("Got error while trying to finish init message with id " + I.id), this.client._log.canSend(e.LogLevel.ERROR) && console.error(f), this.client._errorHandler && await this.client._errorHandler(f);
        }
        m.set(n(b.peerId, b.id), b);
      }
      for (const I of S.dialogs) {
        if (I instanceof d.Api.DialogFolder) continue;
        const b = m.get(n(I.peer, I.topMessage));
        if (this.offsetDate != null) {
          const p = b == null ? void 0 : b.date;
          if (p == null || p > this.offsetDate) continue;
        }
        const f = i.utils.getPeerId(I.peer);
        if (!this.seen.has(f)) {
          if (this.seen.add(f), !$.has(f)) continue;
          const p = new l.Dialog(this.client, I, $, b);
          (!this.ignoreMigrated || p.entity != null && "migratedTo" in p.entity) && this.buffer.push(p);
        }
      }
      if (S.dialogs.length < this.request.limit || !(S instanceof d.Api.messages.DialogsSlice)) return true;
      let h;
      for (let I of S.dialogs.reverse()) if (h = m.get(n(I.peer, I.topMessage)), h) break;
      this.request.excludePinned = true, this.request.offsetId = h ? h.id : 0, this.request.offsetDate = h ? h.date : 0, this.request.offsetPeer = (_ = this.buffer[this.buffer.length - 1]) === null || _ === void 0 ? void 0 : _.inputEntity;
    }
  }
  Nt._DialogsIter = a;
  function o(u, { limit: _ = void 0, offsetDate: S = void 0, offsetId: $ = 0, offsetPeer: m = new d.Api.InputPeerEmpty(), ignorePinned: h = false, ignoreMigrated: I = false, folder: b = void 0, archived: f = void 0 }) {
    return f != null && (b = f ? 1 : 0), new a(u, _, {}, { offsetDate: S, offsetId: $, offsetPeer: m, ignorePinned: h, ignoreMigrated: I, folder: b });
  }
  async function c(u, _) {
    return await u.iterDialogs(_).collect();
  }
  return Nt;
}
var Ls = {}, Jo;
function Yc() {
  if (Jo) return Ls;
  Jo = 1;
  var t = Le().Buffer;
  Object.defineProperty(Ls, "__esModule", { value: true }), Ls.updateTwoFaSettings = r;
  const d = Ae(), g = js(), i = Oe(), l = Ye();
  async function r(e, { isCheckPassword: s, currentPassword: n, newPassword: a, hint: o = "", email: c, emailCodeCallback: u, onEmailCodeError: _ }) {
    if (!a && !n) throw new Error("Neither `currentPassword` nor `newPassword` is present");
    if (c && !(u && _)) throw new Error("`email` present without `emailCodeCallback` and `onEmailCodeError`");
    const S = await e.invoke(new i.Api.account.GetPassword());
    S.newAlgo instanceof i.Api.PasswordKdfAlgoUnknown || (S.newAlgo.salt1 = t.concat([S.newAlgo.salt1, (0, d.generateRandomBytes)(32)])), !S.hasPassword && n && (n = void 0);
    const $ = n ? await (0, g.computeCheck)(S, n) : new i.Api.InputCheckPasswordEmpty();
    if (s) {
      await e.invoke(new i.Api.auth.CheckPassword({ password: $ }));
      return;
    }
    if (S.newAlgo instanceof i.Api.PasswordKdfAlgoUnknown) throw new Error("Unknown password encryption method");
    try {
      await e.invoke(new i.Api.account.UpdatePasswordSettings({ password: $, newSettings: new i.Api.account.PasswordInputSettings({ newAlgo: S.newAlgo, newPasswordHash: a ? await (0, g.computeDigest)(S.newAlgo, a) : t.alloc(0), hint: o, email: c, newSecureSettings: void 0 }) }));
    } catch (m) {
      if (m instanceof l.errors.EmailUnconfirmedError) for (; ; ) try {
        const h = await u(m.codeLength);
        if (!h) throw new Error("Code is empty");
        await e.invoke(new i.Api.account.ConfirmPasswordEmail({ code: h }));
        break;
      } catch (h) {
        _(h);
      }
      else throw m;
    }
  }
  return Ls;
}
var Ui = {}, _n = {}, Qo;
function O2e() {
  if (Qo) return _n;
  Qo = 1, Object.defineProperty(_n, "__esModule", { value: true }), _n.NewMessageEvent = _n.NewMessage = void 0;
  const t = Zc(), d = Oe(), g = xt();
  let i = class extends t.EventBuilder {
    constructor(e = {}) {
      let { chats: s, func: n, incoming: a, outgoing: o, fromUsers: c, forwards: u, pattern: _, blacklistChats: S = false } = e;
      if (a && o) a = o = void 0;
      else if (a != null && o == null) o = !a;
      else if (o != null && a == null) a = !o;
      else if (o == false && a == false) throw new Error("Don't create an event handler if you don't want neither incoming nor outgoing!");
      super({ chats: s, blacklistChats: S, func: n }), this.incoming = a, this.outgoing = o, this.fromUsers = c, this.forwards = u, this.pattern = _, this._noCheck = [a, o, s, _, c, u, n].every(($) => $ == null);
    }
    async _resolve(e) {
      await super._resolve(e), this.fromUsers = await (0, t._intoIdSet)(e, this.fromUsers);
    }
    build(e, s, n) {
      if (e instanceof d.Api.UpdateNewMessage || e instanceof d.Api.UpdateNewChannelMessage) {
        if (!(e.message instanceof d.Api.Message)) return;
        const a = new l(e.message, e);
        return this.addAttributes(a), a;
      } else {
        if (e instanceof d.Api.UpdateShortMessage) return new l(new d.Api.Message({ out: e.out, mentioned: e.mentioned, mediaUnread: e.mediaUnread, silent: e.silent, id: e.id, peerId: new d.Api.PeerUser({ userId: e.userId }), fromId: new d.Api.PeerUser({ userId: e.out ? n : e.userId }), message: e.message, date: e.date, fwdFrom: e.fwdFrom, viaBotId: e.viaBotId, replyTo: e.replyTo, entities: e.entities, ttlPeriod: e.ttlPeriod }), e);
        if (e instanceof d.Api.UpdateShortChatMessage) return new l(new d.Api.Message({ out: e.out, mentioned: e.mentioned, mediaUnread: e.mediaUnread, silent: e.silent, id: e.id, peerId: new d.Api.PeerChat({ chatId: e.chatId }), fromId: new d.Api.PeerUser({ userId: e.out ? n : e.fromId }), message: e.message, date: e.date, fwdFrom: e.fwdFrom, viaBotId: e.viaBotId, replyTo: e.replyTo, entities: e.entities, ttlPeriod: e.ttlPeriod }), e);
      }
    }
    filter(e) {
      var s;
      if (this._noCheck) return e;
      if (!(this.incoming && e.message.out) && !(this.outgoing && !e.message.out) && !(this.forwards != null && this.forwards != !!e.message.fwdFrom) && !(this.fromUsers != null && (!e.message.senderId || !this.fromUsers.includes(e.message.senderId.toString())))) {
        if (this.pattern) {
          const n = (s = e.message.message) === null || s === void 0 ? void 0 : s.match(this.pattern);
          if (!n) return;
          e.message.patternMatch = n;
        }
        return super.filter(e);
      }
    }
    addAttributes(e) {
    }
  };
  _n.NewMessage = i;
  class l extends t.EventCommon {
    constructor(e, s) {
      super({ msgId: e.id, chatPeer: e.peerId, broadcast: e.post }), this.originalUpdate = s, this.message = e;
    }
    _setClient(e) {
      super._setClient(e);
      const s = this.message;
      try {
        s._finishInit(e, this.originalUpdate._entities || /* @__PURE__ */ new Map(), void 0);
      } catch (n) {
        e._log.error("Got error while trying to finish init message with id " + s.id), e._errorHandler && e._errorHandler(n), e._log.canSend(g.LogLevel.ERROR) && console.error(n);
      }
    }
  }
  return _n.NewMessageEvent = l, _n;
}
var Xo;
function el() {
  return Xo || (Xo = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: true }), t.NewMessageEvent = t.NewMessage = t.Raw = void 0;
    var d = Jc();
    Object.defineProperty(t, "Raw", { enumerable: true, get: function() {
      return d.Raw;
    } });
    var g = O2e();
    Object.defineProperty(t, "NewMessage", { enumerable: true, get: function() {
      return g.NewMessage;
    } }), Object.defineProperty(t, "NewMessageEvent", { enumerable: true, get: function() {
      return g.NewMessageEvent;
    } });
  })(Ui)), Ui;
}
var Yo;
function tl() {
  if (Yo) return wt;
  Yo = 1, Le().Buffer;
  var t = wt && wt.__createBinding || (Object.create ? (function(B, C, E, q) {
    q === void 0 && (q = E);
    var W = Object.getOwnPropertyDescriptor(C, E);
    (!W || ("get" in W ? !C.__esModule : W.writable || W.configurable)) && (W = { enumerable: true, get: function() {
      return C[E];
    } }), Object.defineProperty(B, q, W);
  }) : (function(B, C, E, q) {
    q === void 0 && (q = E), B[q] = C[E];
  })), d = wt && wt.__setModuleDefault || (Object.create ? (function(B, C) {
    Object.defineProperty(B, "default", { enumerable: true, value: C });
  }) : function(B, C) {
    B.default = C;
  }), g = wt && wt.__importStar || function(B) {
    if (B && B.__esModule) return B;
    var C = {};
    if (B != null) for (var E in B) E !== "default" && Object.prototype.hasOwnProperty.call(B, E) && t(C, B, E);
    return d(C, B), C;
  };
  Object.defineProperty(wt, "__esModule", { value: true }), wt.TelegramClient = void 0;
  const i = jc(), l = g(Gc()), r = g(Hc()), e = g(zc()), s = g(Wc()), n = g(Cs()), a = g(Ji()), o = g(Ni()), c = g(Zi()), u = g(Fs()), _ = g(Qc()), S = g(Xc()), $ = g(Yc()), m = Oe(), h = Xe(), I = Es(), b = Hi(), f = Ae(), p = Ni(), w = xt(), M = ft(), T = Ps();
  let k = class extends i.TelegramBaseClient {
    constructor(C, E, q, W) {
      super(C, E, q, W);
    }
    start(C) {
      return l.start(this, C);
    }
    checkAuthorization() {
      return l.checkAuthorization(this);
    }
    signInUser(C, E) {
      return l.signInUser(this, C, E);
    }
    signInUserWithQrCode(C, E) {
      return l.signInUserWithQrCode(this, C, E);
    }
    sendCode(C, E, q = false) {
      return l.sendCode(this, C, E, q);
    }
    signInWithPassword(C, E) {
      return l.signInWithPassword(this, C, E);
    }
    signInBot(C, E) {
      return l.signInBot(this, C, E);
    }
    async updateTwoFaSettings({ isCheckPassword: C, currentPassword: E, newPassword: q, hint: W = "", email: G, emailCodeCallback: te, onEmailCodeError: oe }) {
      return $.updateTwoFaSettings(this, { isCheckPassword: C, currentPassword: E, newPassword: q, hint: W, email: G, emailCodeCallback: te, onEmailCodeError: oe });
    }
    inlineQuery(C, E, q, W, G) {
      return r.inlineQuery(this, C, E, q, W, G);
    }
    buildReplyMarkup(C, E = false) {
      return e.buildReplyMarkup(C, E);
    }
    downloadFile(C, E = {}) {
      return s.downloadFileV2(this, C, E);
    }
    iterDownload(C) {
      return s.iterDownload(this, C);
    }
    downloadProfilePhoto(C, E = { isBig: false }) {
      return s.downloadProfilePhoto(this, C, E);
    }
    downloadMedia(C, E) {
      return s.downloadMedia(this, C, E == null ? void 0 : E.outputFile, E == null ? void 0 : E.thumb, E == null ? void 0 : E.progressCallback);
    }
    get parseMode() {
      return this._parseMode;
    }
    setParseMode(C) {
      C ? this._parseMode = (0, h.sanitizeParseMode)(C) : this._parseMode = void 0;
    }
    iterMessages(C, E = {}) {
      return a.iterMessages(this, C, E);
    }
    getMessages(C, E = {}) {
      return a.getMessages(this, C, E);
    }
    sendMessage(C, E = {}) {
      return a.sendMessage(this, C, E);
    }
    forwardMessages(C, E) {
      return a.forwardMessages(this, C, E);
    }
    editMessage(C, E) {
      return a.editMessage(this, C, E);
    }
    deleteMessages(C, E, { revoke: q = true }) {
      return a.deleteMessages(this, C, E, { revoke: q });
    }
    pinMessage(C, E, q) {
      return a.pinMessage(this, C, E, q);
    }
    unpinMessage(C, E, q) {
      return a.unpinMessage(this, C, E, q);
    }
    markAsRead(C, E, q) {
      return a.markAsRead(this, C, E, q);
    }
    iterDialogs(C = {}) {
      return S.iterDialogs(this, C);
    }
    getDialogs(C = {}) {
      return S.getDialogs(this, C);
    }
    iterParticipants(C, E = {}) {
      return _.iterParticipants(this, C, E);
    }
    getParticipants(C, E = {}) {
      return _.getParticipants(this, C, E);
    }
    kickParticipant(C, E) {
      return _.kickParticipant(this, C, E);
    }
    on(C) {
      return o.on(this, C);
    }
    addEventHandler(C, E) {
      return o.addEventHandler(this, C, E);
    }
    removeEventHandler(C, E) {
      return o.removeEventHandler(this, C, E);
    }
    listEventHandlers() {
      return o.listEventHandlers(this);
    }
    uploadFile(C) {
      return c.uploadFile(this, C);
    }
    sendFile(C, E) {
      return c.sendFile(this, C, E);
    }
    invoke(C, E) {
      return u.invoke(this, C, E);
    }
    invokeWithSender(C, E) {
      return u.invoke(this, C, void 0, E);
    }
    getMe(C = false) {
      return u.getMe(this, C);
    }
    isBot() {
      return u.isBot(this);
    }
    isUserAuthorized() {
      return u.isUserAuthorized(this);
    }
    getEntity(C) {
      return u.getEntity(this, C);
    }
    getInputEntity(C) {
      return u.getInputEntity(this, C);
    }
    getPeerId(C, E = true) {
      return u.getPeerId(this, C, E);
    }
    _getInputDialog(C) {
      return u._getInputDialog(this, C);
    }
    _getInputNotify(C) {
      return u._getInputNotify(this, C);
    }
    async _handleReconnect() {
      this._log.info("Handling reconnect!");
      try {
        const C = await this.getMe();
      } catch (C) {
        this._log.error("Error while trying to reconnect"), this._errorHandler && await this._errorHandler(C), this._log.canSend(w.LogLevel.ERROR) && console.error(C);
      }
    }
    async connect() {
      await this._initSession(), this._sender === void 0 && (this._sender = new I.MTProtoSender(this.session.getAuthKey(), { logger: this._log, dcId: this.session.dcId || 4, retries: this._connectionRetries, delay: this._retryDelay, autoReconnect: this._autoReconnect, connectTimeout: this._timeout, authKeyCallback: this._authKeyCallback.bind(this), updateCallback: p._handleUpdate.bind(this), isMainSender: true, client: this, securityChecks: this._securityChecks, autoReconnectCallback: this._handleReconnect.bind(this), _exportedSenderPromises: this._exportedSenderPromises, reconnectRetries: this._reconnectRetries }));
      const C = new this._connection({ ip: this.session.serverAddress, port: this.useWSS ? 443 : 80, dcId: this.session.dcId, loggers: this._log, proxy: this._proxy, socket: this.networkSocket, testServers: this.testServers });
      return await this._sender.connect(C, false) ? (this.session.setAuthKey(this._sender.authKey), this.session.save(), this._initRequest.query = new m.Api.help.GetConfig(), this._log.info(`Using LAYER ${b.LAYER} for initial connect`), await this._sender.send(new m.Api.InvokeWithLayer({ layer: b.LAYER, query: this._initRequest })), this._loopStarted || ((0, p._updateLoop)(this), this._loopStarted = true), this._connectedDeferred.resolve(), this._isSwitchingDc = false, true) : (this._loopStarted || ((0, p._updateLoop)(this), this._loopStarted = true), false);
    }
    async _switchDC(C) {
      this._log.info(`Reconnecting to new data center ${C}`);
      const E = await this.getDC(C);
      return this.session.setDC(C, E.ipAddress, E.port), await this._sender.authKey.setKey(void 0), this.session.setAuthKey(void 0), this.session.save(), this._isSwitchingDc = true, await this._disconnect(), this._sender = void 0, await this.connect();
    }
    async getDC(C, E = false, q = false) {
      if (this._log.debug(`Getting DC ${C}`), !T.isNode || q) switch (C) {
        case 1:
          return { id: 1, ipAddress: `pluto${E ? "-1" : ""}.web.telegram.org`, port: 443 };
        case 2:
          return { id: 2, ipAddress: `venus${E ? "-1" : ""}.web.telegram.org`, port: 443 };
        case 3:
          return { id: 3, ipAddress: `aurora${E ? "-1" : ""}.web.telegram.org`, port: 443 };
        case 4:
          return { id: 4, ipAddress: `vesta${E ? "-1" : ""}.web.telegram.org`, port: 443 };
        case 5:
          return { id: 5, ipAddress: `flora${E ? "-1" : ""}.web.telegram.org`, port: 443 };
        default:
          throw new Error(`Cannot find the DC with the ID of ${C}`);
      }
      this._config || (this._config = await this.invoke(new m.Api.help.GetConfig()));
      for (const W of this._config.dcOptions) if (W.id === C && !!W.ipv6 === this._useIPV6) return { id: W.id, ipAddress: W.ipAddress, port: 443 };
      throw new Error(`Cannot find the DC with the ID of ${C}`);
    }
    _removeSender(C) {
      delete this._borrowedSenderPromises[C];
    }
    _getResponseMessage(C, E, q) {
      return n._getResponseMessage(this, C, E, q);
    }
    [M.inspect.custom]() {
      return (0, f.betterConsoleLog)(this);
    }
    static get events() {
      return el();
    }
  };
  return wt.TelegramClient = k, wt;
}
var hs = {}, ec;
function V2e() {
  return ec || (ec = 1, Object.defineProperty(hs, "__esModule", { value: true }), hs.version = void 0, hs.version = "2.26.21"), hs;
}
var Te = {}, tc;
function N2e() {
  if (tc) return Te;
  tc = 1;
  var t = Te && Te.__createBinding || (Object.create ? (function(h, I, b, f) {
    f === void 0 && (f = b);
    var p = Object.getOwnPropertyDescriptor(I, b);
    (!p || ("get" in p ? !I.__esModule : p.writable || p.configurable)) && (p = { enumerable: true, get: function() {
      return I[b];
    } }), Object.defineProperty(h, f, p);
  }) : (function(h, I, b, f) {
    f === void 0 && (f = b), h[f] = I[b];
  })), d = Te && Te.__setModuleDefault || (Object.create ? (function(h, I) {
    Object.defineProperty(h, "default", { enumerable: true, value: I });
  }) : function(h, I) {
    h.default = I;
  }), g = Te && Te.__importStar || function(h) {
    if (h && h.__esModule) return h;
    var I = {};
    if (h != null) for (var b in h) b !== "default" && Object.prototype.hasOwnProperty.call(h, b) && t(I, h, b);
    return d(I, h), I;
  };
  Object.defineProperty(Te, "__esModule", { value: true }), Te.users = Te.uploads = Te.updates = Te.tgClient = Te.telegramBaseClient = Te.message = Te.messageParse = Te.downloads = Te.dialogs = Te.chats = Te.buttons = Te.bots = Te.auth = Te.twoFA = void 0;
  const i = g(Yc());
  Te.twoFA = i;
  const l = g(Gc());
  Te.auth = l;
  const r = g(Hc());
  Te.bots = r;
  const e = g(zc());
  Te.buttons = e;
  const s = g(Qc());
  Te.chats = s;
  const n = g(Xc());
  Te.dialogs = n;
  const a = g(Wc());
  Te.downloads = a;
  const o = g(Cs());
  Te.messageParse = o;
  const c = g(Ji());
  Te.message = c;
  const u = g(jc());
  Te.telegramBaseClient = u;
  const _ = g(tl());
  Te.tgClient = _;
  const S = g(Ni());
  Te.updates = S;
  const $ = g(Zi());
  Te.uploads = $;
  const m = g(Fs());
  return Te.users = m, Te;
}
var nc;
function Ye() {
  return nc || (nc = 1, (function(t) {
    var d = qt && qt.__createBinding || (Object.create ? (function(h, I, b, f) {
      f === void 0 && (f = b);
      var p = Object.getOwnPropertyDescriptor(I, b);
      (!p || ("get" in p ? !I.__esModule : p.writable || p.configurable)) && (p = { enumerable: true, get: function() {
        return I[b];
      } }), Object.defineProperty(h, f, p);
    }) : (function(h, I, b, f) {
      f === void 0 && (f = b), h[f] = I[b];
    })), g = qt && qt.__setModuleDefault || (Object.create ? (function(h, I) {
      Object.defineProperty(h, "default", { enumerable: true, value: I });
    }) : function(h, I) {
      h.default = I;
    }), i = qt && qt.__importStar || function(h) {
      if (h && h.__esModule) return h;
      var I = {};
      if (h != null) for (var b in h) b !== "default" && Object.prototype.hasOwnProperty.call(h, b) && d(I, h, b);
      return g(I, h), I;
    };
    Object.defineProperty(t, "__esModule", { value: true }), t.client = t.password = t.tl = t.helpers = t.extensions = t.sessions = t.errors = t.utils = t.Logger = t.version = t.Connection = t.TelegramClient = t.Api = void 0;
    var l = Oe();
    Object.defineProperty(t, "Api", { enumerable: true, get: function() {
      return l.Api;
    } });
    const r = i(Oe());
    t.tl = r;
    var e = tl();
    Object.defineProperty(t, "TelegramClient", { enumerable: true, get: function() {
      return e.TelegramClient;
    } });
    var s = Es();
    Object.defineProperty(t, "Connection", { enumerable: true, get: function() {
      return s.Connection;
    } });
    var n = V2e();
    Object.defineProperty(t, "version", { enumerable: true, get: function() {
      return n.version;
    } });
    var a = xt();
    Object.defineProperty(t, "Logger", { enumerable: true, get: function() {
      return a.Logger;
    } });
    const o = i(Xe());
    t.utils = o;
    const c = i(Gt());
    t.errors = c;
    const u = i(Wi());
    t.sessions = u;
    const _ = i(Et());
    t.extensions = _;
    const S = i(Ae());
    t.helpers = S;
    const $ = i(N2e());
    t.client = $;
    const m = i(js());
    t.password = m;
  })(qt)), qt;
}
var nl = Ye();
const F2e = Ss(nl), gxe = Is({ __proto__: null, default: F2e }, [nl]);
var sl = Wi();
const j2e = Ss(sl), hxe = Is({ __proto__: null, default: j2e }, [sl]);
var il = Et();
const G2e = Ss(il), mxe = Is({ __proto__: null, default: G2e }, [il]);
var rl = xt();
const H2e = Ss(rl), _xe = Is({ __proto__: null, default: H2e }, [rl]);
var al = el();
const z2e = Ss(al), bxe = Is({ __proto__: null, default: z2e }, [al]);
export {
  _xe as L,
  hxe as a,
  mxe as b,
  bxe as c,
  gxe as i
};
