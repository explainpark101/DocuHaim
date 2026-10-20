/* @ts-self-types="./haim_line_diff.d.ts" */
import * as wasm from "./haim_line_diff_bg.wasm";
import { __wbg_set_wasm } from "./haim_line_diff_bg.js";

__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    diff_line_hunks
} from "./haim_line_diff_bg.js";
