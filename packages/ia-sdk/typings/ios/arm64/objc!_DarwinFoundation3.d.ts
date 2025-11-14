
declare function _Exit(p1: number): void;

declare function _ExitFunction(p1: number): void;

interface __arm_legacy_debug_state {
	__bvr: interop.Reference<number>;
	__bcr: interop.Reference<number>;
	__wvr: interop.Reference<number>;
	__wcr: interop.Reference<number>;
}
declare var __arm_legacy_debug_state: interop.StructType<__arm_legacy_debug_state>;

interface __arm_pagein_state {
	__pagein_error: number;
}
declare var __arm_pagein_state: interop.StructType<__arm_pagein_state>;

interface __darwin_arm_cpmu_state64 {
	__ctrs: interop.Reference<number>;
}
declare var __darwin_arm_cpmu_state64: interop.StructType<__darwin_arm_cpmu_state64>;

interface __darwin_arm_debug_state32 {
	__bvr: interop.Reference<number>;
	__bcr: interop.Reference<number>;
	__wvr: interop.Reference<number>;
	__wcr: interop.Reference<number>;
	__mdscr_el1: number;
}
declare var __darwin_arm_debug_state32: interop.StructType<__darwin_arm_debug_state32>;

interface __darwin_arm_debug_state64 {
	__bvr: interop.Reference<number>;
	__bcr: interop.Reference<number>;
	__wvr: interop.Reference<number>;
	__wcr: interop.Reference<number>;
	__mdscr_el1: number;
}
declare var __darwin_arm_debug_state64: interop.StructType<__darwin_arm_debug_state64>;

interface __darwin_arm_exception_state {
	__exception: number;
	__fsr: number;
	__far: number;
}
declare var __darwin_arm_exception_state: interop.StructType<__darwin_arm_exception_state>;

interface __darwin_arm_exception_state64 {
	__far: number;
	__esr: number;
	__exception: number;
}
declare var __darwin_arm_exception_state64: interop.StructType<__darwin_arm_exception_state64>;

interface __darwin_arm_exception_state64_v2 {
	__far: number;
	__esr: number;
}
declare var __darwin_arm_exception_state64_v2: interop.StructType<__darwin_arm_exception_state64_v2>;

interface __darwin_arm_sme2_state {
	__zt0: interop.Reference<number>;
}
declare var __darwin_arm_sme2_state: interop.StructType<__darwin_arm_sme2_state>;

interface __darwin_arm_sme_state {
	__svcr: number;
	__tpidr2_el0: number;
	__svl_b: number;
}
declare var __darwin_arm_sme_state: interop.StructType<__darwin_arm_sme_state>;

interface __darwin_arm_sme_za_state {
	__za: interop.Reference<number>;
}
declare var __darwin_arm_sme_za_state: interop.StructType<__darwin_arm_sme_za_state>;

interface __darwin_arm_sve_p_state {
	__p: interop.Reference<interop.Reference<number>>;
}
declare var __darwin_arm_sve_p_state: interop.StructType<__darwin_arm_sve_p_state>;

interface __darwin_arm_sve_z_state {
	__z: interop.Reference<interop.Reference<number>>;
}
declare var __darwin_arm_sve_z_state: interop.StructType<__darwin_arm_sve_z_state>;

interface __darwin_arm_thread_state {
	__r: interop.Reference<number>;
	__sp: number;
	__lr: number;
	__pc: number;
	__cpsr: number;
}
declare var __darwin_arm_thread_state: interop.StructType<__darwin_arm_thread_state>;

interface __darwin_arm_thread_state64 {
	__x: interop.Reference<number>;
	__fp: number;
	__lr: number;
	__sp: number;
	__pc: number;
	__cpsr: number;
	__pad: number;
}
declare var __darwin_arm_thread_state64: interop.StructType<__darwin_arm_thread_state64>;

interface __darwin_arm_vfp_state {
	__r: interop.Reference<number>;
	__fpscr: number;
}
declare var __darwin_arm_vfp_state: interop.StructType<__darwin_arm_vfp_state>;

interface __darwin_mcontext32 {
	__es: __darwin_arm_exception_state;
	__ss: __darwin_arm_thread_state;
	__fs: __darwin_arm_vfp_state;
}
declare var __darwin_mcontext32: interop.StructType<__darwin_mcontext32>;

interface __darwin_sigaltstack {
	ss_sp: interop.Pointer | interop.Reference<any>;
	ss_size: number;
	ss_flags: number;
}
declare var __darwin_sigaltstack: interop.StructType<__darwin_sigaltstack>;

declare var __mb_cur_max: number;

declare function _exit(p1: number): void;

declare function a64l(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function abort(): void;

declare function abs(p1: number): number;

declare function access(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

interface accessx_descriptor {
	ad_name_offset: number;
	ad_flags: number;
	ad_pad: interop.Reference<number>;
}
declare var accessx_descriptor: interop.StructType<accessx_descriptor>;

declare function accessx_np(p1: interop.Pointer | interop.Reference<accessx_descriptor>, __sz: number, p3: interop.Pointer | interop.Reference<number>, p4: number): number;

declare function acct(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function add_profil(p1: string | interop.Pointer | interop.Reference<any>, __bufsiz: number, p3: number, p4: number): number;

declare function alarm(p1: number): number;

/**
 * @since 13.0
 */
declare function aligned_alloc(__alignment: number, __size: number): interop.Pointer | interop.Reference<any>;

declare function arc4random(): number;

/**
 * @deprecated 10.0
 */
declare function arc4random_addrandom(p1: string | interop.Pointer | interop.Reference<any>, __datlen: number): void;

/**
 * @since 4.3
 */
declare function arc4random_buf(__buf: interop.Pointer | interop.Reference<any>, __nbytes: number): void;

declare function arc4random_stir(): void;

/**
 * @since 4.3
 */
declare function arc4random_uniform(__upper_bound: number): number;

declare function at_quick_exit(p1: interop.FunctionReference<() => void>): number;

declare function atexit(p1: interop.FunctionReference<() => void>): number;

/**
 * @since 3.2
 */
declare function atexit_b(p1: () => void): number;

declare function atof(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function atof_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>): number;

declare function atoi(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function atoi_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>): number;

declare function atol(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function atol_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>): number;

declare function atoll(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function atoll_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>): number;

declare function brk(p1: interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function bsd_signal(p1: number, p2: interop.FunctionReference<(p1: number) => void>): interop.FunctionReference<(p1: number) => void>;

declare function bsearch(__key: interop.Pointer | interop.Reference<any>, __base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number>): interop.Pointer | interop.Reference<any>;

/**
 * @since 3.2
 */
declare function bsearch_b(__key: interop.Pointer | interop.Reference<any>, __base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: (p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number): interop.Pointer | interop.Reference<any>;

declare function btowc(p1: number): number;

declare function btowc_l(p1: number, p2: interop.Pointer | interop.Reference<any>): number;

declare function calloc(__count: number, __size: number): interop.Pointer | interop.Reference<any>;

declare function cgetcap(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>, p3: number): interop.Pointer | interop.Reference<any>;

declare function cgetclose(): number;

declare function cgetent(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: string | interop.Pointer | interop.Reference<any>): number;

declare function cgetfirst(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function cgetmatch(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>): number;

declare function cgetnext(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function cgetnum(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<number>): number;

declare function cgetset(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function cgetstr(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function cgetustr(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function chdir(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function chown(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: number): number;

declare function chroot(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function close(p1: number): number;

declare function confstr(p1: number, p2: string | interop.Pointer | interop.Reference<any>, __len: number): number;

declare function crypt(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

/**
 * @since 2.0
 * @deprecated 2.0
 */
declare function daemon(p1: number, p2: number): number;

declare function devname(p1: number, p2: number): interop.Pointer | interop.Reference<any>;

declare function devname_r(p1: number, p2: number, buf: string | interop.Pointer | interop.Reference<any>, len: number): interop.Pointer | interop.Reference<any>;

declare function div(p1: number, p2: number): div_t;

interface div_t {
	quot: number;
	rem: number;
}
declare var div_t: interop.StructType<div_t>;

declare function drand48(): number;

declare function dup(p1: number): number;

declare function dup2(p1: number, p2: number): number;

declare function ecvt(p1: number, p2: number, p3: interop.Pointer | interop.Reference<number>, p4: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<any>;

declare function encrypt(p1: string | interop.Pointer | interop.Reference<any>, p2: number): void;

declare function endusershell(): void;

declare function erand48(p1: interop.Reference<number>): number;

declare function exchangedata(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>, p3: number): number;

declare function execv(__path: string | interop.Pointer | interop.Reference<any>, __argv: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function execvP(__file: string | interop.Pointer | interop.Reference<any>, __searchpath: string | interop.Pointer | interop.Reference<any>, __argv: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function execve(__file: string | interop.Pointer | interop.Reference<any>, __argv: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __envp: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function execvp(__file: string | interop.Pointer | interop.Reference<any>, __argv: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function exit(p1: number): void;

/**
 * @since 8.0
 */
declare function faccessat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: number, p4: number): number;

declare function fchdir(p1: number): number;

declare function fchown(p1: number, p2: number, p3: number): number;

/**
 * @since 8.0
 */
declare function fchownat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: number, p4: number, p5: number): number;

declare function fcvt(p1: number, p2: number, p3: interop.Pointer | interop.Reference<number>, p4: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<any>;

declare function fflagstostr(p1: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 3.0
 */
declare function ffsctl(p1: number, p2: number, p3: interop.Pointer | interop.Reference<any>, p4: number): number;

/**
 * @since 3.0
 */
declare function fgetattrlist(p1: number, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, __attrBufSize: number, p5: number): number;

declare function fgetwc(p1: interop.Pointer | interop.Reference<FILE>): number;

declare function fgetwc_l(p1: interop.Pointer | interop.Reference<FILE>, p2: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 4.3
 */
declare function fgetwln(p1: interop.Pointer | interop.Reference<FILE>, __len: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

/**
 * @since 4.3
 */
declare function fgetwln_l(p1: interop.Pointer | interop.Reference<FILE>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<number>;

declare function fgetws(p1: interop.Pointer | interop.Reference<number>, __n: number, p3: interop.Pointer | interop.Reference<FILE>): interop.Pointer | interop.Reference<number>;

declare function fgetws_l(p1: interop.Pointer | interop.Reference<number>, __n: number, p3: interop.Pointer | interop.Reference<FILE>, p4: interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<number>;

declare function fork(): number;

declare function fpathconf(p1: number, p2: number): number;

declare function fputwc(p1: number, p2: interop.Pointer | interop.Reference<FILE>): number;

declare function fputwc_l(p1: number, p2: interop.Pointer | interop.Reference<FILE>, p3: interop.Pointer | interop.Reference<any>): number;

declare function fputws(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<FILE>): number;

declare function fputws_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<FILE>, p3: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 16.0
 */
declare function freadlink(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: number): number;

declare function free(p1: interop.Pointer | interop.Reference<any>): void;

declare function fsctl(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: interop.Pointer | interop.Reference<any>, p4: number): number;

/**
 * @since 3.0
 */
declare function fsetattrlist(p1: number, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, __attrBufSize: number, p5: number): number;

declare function fsync(p1: number): number;

/**
 * @since 6.0
 */
declare function fsync_volume_np(p1: number, p2: number): number;

declare function ftruncate(p1: number, p2: number): number;

declare function fwide(p1: interop.Pointer | interop.Reference<FILE>, p2: number): number;

declare function gcvt(p1: number, p2: number, p3: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function getattrlist(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, __attrBufSize: number, p5: number): number;

/**
 * @since 8.0
 */
declare function getattrlistat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, p4: interop.Pointer | interop.Reference<any>, p5: number, p6: number): number;

/**
 * @since 8.0
 */
declare function getattrlistbulk(p1: number, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, p4: number, p5: number): number;

declare function getbsize(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<any>;

declare function getcwd(p1: string | interop.Pointer | interop.Reference<any>, __size: number): interop.Pointer | interop.Reference<any>;

declare function getdirentriesattr(p1: number, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, __attrBufSize: number, p5: interop.Pointer | interop.Reference<number>, p6: interop.Pointer | interop.Reference<number>, p7: interop.Pointer | interop.Reference<number>, p8: number): number;

declare function getdomainname(p1: string | interop.Pointer | interop.Reference<any>, __namelen: number): number;

declare function getdtablesize(): number;

declare function getegid(): number;

declare function getenv(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function geteuid(): number;

declare function getgid(): number;

declare function getgrouplist(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: interop.Pointer | interop.Reference<number>, __ngroups: interop.Pointer | interop.Reference<number>): number;

declare function getgroups(__gidsetsize: number, p2: interop.Reference<number>): number;

declare function gethostid(): number;

declare function gethostname(p1: string | interop.Pointer | interop.Reference<any>, __namelen: number): number;

/**
 * @since 2.0
 */
declare function getiopolicy_np(p1: number, p2: number): number;

declare function getloadavg(p1: interop.Reference<number>, __nelem: number): number;

declare function getlogin(): interop.Pointer | interop.Reference<any>;

declare function getlogin_r(p1: string | interop.Pointer | interop.Reference<any>, __namelen: number): number;

declare function getmode(p1: interop.Pointer | interop.Reference<any>, p2: number): number;

declare function getopt(__argc: number, p2: interop.Reference<interop.Pointer | interop.Reference<any>>, p3: string | interop.Pointer | interop.Reference<any>): number;

declare function getpagesize(): number;

declare function getpass(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function getpeereid(p1: number, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<number>): number;

declare function getpgid(p1: number): number;

declare function getpgrp(): number;

declare function getpid(): number;

declare function getppid(): number;

declare function getpriority(p1: number, p2: number): number;

declare function getprogname(): interop.Pointer | interop.Reference<any>;

declare function getrlimit(p1: number, p2: interop.Pointer | interop.Reference<rlimit>): number;

declare function getrusage(p1: number, p2: interop.Pointer | interop.Reference<rusage>): number;

declare function getsgroups_np(p1: interop.Pointer | interop.Reference<number>, p2: interop.Reference<number>): number;

declare function getsid(p1: number): number;

declare function getsubopt(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function getsuboptFunction(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function getuid(): number;

declare function getusershell(): interop.Pointer | interop.Reference<any>;

declare function getwc(p1: interop.Pointer | interop.Reference<FILE>): number;

declare function getwc_l(p1: interop.Pointer | interop.Reference<FILE>, p2: interop.Pointer | interop.Reference<any>): number;

declare function getwchar(): number;

declare function getwchar_l(p1: interop.Pointer | interop.Reference<any>): number;

declare function getwd(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function getwgroups_np(p1: interop.Pointer | interop.Reference<number>, p2: interop.Reference<number>): number;

declare function grantpt(p1: number): number;

declare function heapsort(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number>): number;

/**
 * @since 3.2
 */
declare function heapsort_b(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: (p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number): number;

declare const enum idtype_t {

	P_ALL = 0,

	P_PID = 1,

	P_PGID = 2
}

/**
 * @since 2.0
 */
declare function imaxabs(j: number): number;

/**
 * @since 2.0
 */
declare function imaxdiv(__numer: number, __denom: number): imaxdiv_t;

interface imaxdiv_t {
	quot: number;
	rem: number;
}
declare var imaxdiv_t: interop.StructType<imaxdiv_t>;

declare function initgroups(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

declare function initstate(p1: number, p2: string | interop.Pointer | interop.Reference<any>, __size: number): interop.Pointer | interop.Reference<any>;

declare function iruserok(p1: number, p2: number, p3: string | interop.Pointer | interop.Reference<any>, p4: string | interop.Pointer | interop.Reference<any>): number;

declare function iruserok_sa(p1: interop.Pointer | interop.Reference<any>, p2: number, p3: number, p4: string | interop.Pointer | interop.Reference<any>, p5: string | interop.Pointer | interop.Reference<any>): number;

declare function isatty(p1: number): number;

declare function issetugid(): number;

declare function jrand48(p1: interop.Reference<number>): number;

declare function kill(p1: number, p2: number): number;

declare function killpg(p1: number, p2: number): number;

declare function l64a(p1: number): interop.Pointer | interop.Reference<any>;

declare function labs(p1: number): number;

declare function lchown(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: number): number;

declare function lcong48(p1: interop.Reference<number>): void;

declare function ldiv(p1: number, p2: number): ldiv_t;

interface ldiv_t {
	quot: number;
	rem: number;
}
declare var ldiv_t: interop.StructType<ldiv_t>;

declare function link(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>): number;

/**
 * @since 8.0
 */
declare function linkat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: number, p4: string | interop.Pointer | interop.Reference<any>, p5: number): number;

declare function llabs(p1: number): number;

declare function lldiv(p1: number, p2: number): lldiv_t;

interface lldiv_t {
	quot: number;
	rem: number;
}
declare var lldiv_t: interop.StructType<lldiv_t>;

declare function lockf(p1: number, p2: number, p3: number): number;

declare function lrand48(): number;

declare function lseek(p1: number, p2: number, p3: number): number;

declare function malloc(__size: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_aligned_alloc(alignment: number, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_calloc(count: number, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_free(ptr: interop.Pointer | interop.Reference<any>, type_id: number): void;

/**
 * @since 17.0
 */
declare function malloc_type_malloc(size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_posix_memalign(memptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, alignment: number, size: number, type_id: number): number;

/**
 * @since 17.0
 */
declare function malloc_type_realloc(ptr: interop.Pointer | interop.Reference<any>, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_valloc(size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_zone_calloc(zone: interop.Pointer | interop.Reference<malloc_zone_t>, count: number, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_zone_free(zone: interop.Pointer | interop.Reference<malloc_zone_t>, ptr: interop.Pointer | interop.Reference<any>, type_id: number): void;

/**
 * @since 17.0
 */
declare function malloc_type_zone_malloc(zone: interop.Pointer | interop.Reference<malloc_zone_t>, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_zone_memalign(zone: interop.Pointer | interop.Reference<malloc_zone_t>, alignment: number, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_zone_realloc(zone: interop.Pointer | interop.Reference<malloc_zone_t>, ptr: interop.Pointer | interop.Reference<any>, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 17.0
 */
declare function malloc_type_zone_valloc(zone: interop.Pointer | interop.Reference<malloc_zone_t>, size: number, type_id: number): interop.Pointer | interop.Reference<any>;

declare function mblen(__s: string | interop.Pointer | interop.Reference<any>, __n: number): number;

declare function mblen_l(p1: string | interop.Pointer | interop.Reference<any>, __n: number, p3: interop.Pointer | interop.Reference<any>): number;

declare function mbstowcs(p1: interop.Pointer | interop.Reference<number>, p2: string | interop.Pointer | interop.Reference<any>, __n: number): number;

declare function mbstowcs_l(p1: interop.Pointer | interop.Reference<number>, p2: string | interop.Pointer | interop.Reference<any>, __n: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function mbtowc(p1: interop.Pointer | interop.Reference<number>, p2: string | interop.Pointer | interop.Reference<any>, __n: number): number;

declare function mbtowc_l(p1: interop.Pointer | interop.Reference<number>, p2: string | interop.Pointer | interop.Reference<any>, __n: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function mergesort(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number>): number;

/**
 * @since 3.2
 */
declare function mergesort_b(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: (p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number): number;

declare function mkdtemp(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

/**
 * @since 11.0
 */
declare function mkdtempat_np(dfd: number, path: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function mknod(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: number): number;

/**
 * @since 10.0
 */
declare function mkostemp(path: string | interop.Pointer | interop.Reference<any>, oflags: number): number;

/**
 * @since 10.0
 */
declare function mkostemps(path: string | interop.Pointer | interop.Reference<any>, slen: number, oflags: number): number;

/**
 * @since 11.0
 */
declare function mkostempsat_np(dfd: number, path: string | interop.Pointer | interop.Reference<any>, slen: number, oflags: number): number;

/**
 * @since 5.0
 */
declare function mkpath_np(path: string | interop.Pointer | interop.Reference<any>, omode: number): number;

/**
 * @since 10.0
 */
declare function mkpathat_np(dfd: number, path: string | interop.Pointer | interop.Reference<any>, omode: number): number;

declare function mkstemp(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function mkstempFunction(p1: string | interop.Pointer | interop.Reference<any>): number;

/**
 * @since 10.0
 */
declare function mkstemp_dprotected_np(path: string | interop.Pointer | interop.Reference<any>, dpclass: number, dpflags: number): number;

declare function mkstemps(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

/**
 * @since 11.0
 */
declare function mkstempsat_np(dfd: number, path: string | interop.Pointer | interop.Reference<any>, slen: number): number;

declare function mktemp(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function mktempFunction(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function mrand48(): number;

declare function nextwctype(p1: number, p2: number): number;

declare function nextwctype_l(p1: number, p2: number, p3: interop.Pointer | interop.Reference<any>): number;

declare function nfssvc(p1: number, p2: interop.Pointer | interop.Reference<any>): number;

declare function nice(p1: number): number;

declare function nrand48(p1: interop.Reference<number>): number;

/**
 * @since 11.0
 */
declare function open_wmemstream(__bufp: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, __sizep: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<FILE>;

declare var optarg: interop.Pointer | interop.Reference<any>;

declare var opterr: number;

declare var optind: number;

declare var optopt: number;

declare var optreset: number;

declare function pathconf(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

declare function pause(): number;

declare function pipe(p1: interop.Reference<number>): number;

/**
 * @since 3.0
 */
declare function posix_memalign(__memptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __alignment: number, __size: number): number;

declare function posix_openpt(p1: number): number;

declare function pread(__fd: number, __buf: interop.Pointer | interop.Reference<any>, __nbyte: number, __offset: number): number;

interface proc_rlimit_control_wakeupmon {
	wm_flags: number;
	wm_rate: number;
}
declare var proc_rlimit_control_wakeupmon: interop.StructType<proc_rlimit_control_wakeupmon>;

declare function profil(p1: string | interop.Pointer | interop.Reference<any>, __bufsiz: number, p3: number, p4: number): number;

declare function pselect(p1: number, p2: interop.Pointer | interop.Reference<fd_set>, p3: interop.Pointer | interop.Reference<fd_set>, p4: interop.Pointer | interop.Reference<fd_set>, p5: interop.Pointer | interop.Reference<timespec>, p6: interop.Pointer | interop.Reference<number>): number;

declare function psignal(p1: number, p2: string | interop.Pointer | interop.Reference<any>): void;

/**
 * @since 3.2
 */
declare function psort(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number>): void;

/**
 * @since 3.2
 */
declare function psort_b(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: (p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number): void;

/**
 * @since 3.2
 */
declare function psort_r(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, p4: interop.Pointer | interop.Reference<any>, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>) => number>): void;

/**
 * @since 2.0
 */
declare function pthread_atfork(p1: interop.FunctionReference<() => void>, p2: interop.FunctionReference<() => void>, p3: interop.FunctionReference<() => void>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>): number;

/**
 * @since 8.0
 */
declare function pthread_attr_get_qos_class_np(__attr: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, __qos_class: interop.Pointer | interop.Reference<qos_class_t>, __relative_priority: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getdetachstate(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getguardsize(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getinheritsched(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getschedparam(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<sched_param>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getschedpolicy(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getscope(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getstack(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getstackaddr(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_getstacksize(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>): number;

/**
 * @since 8.0
 */
declare function pthread_attr_set_qos_class_np(__attr: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, __qos_class: qos_class_t, __relative_priority: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setdetachstate(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setguardsize(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setinheritsched(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setschedparam(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<sched_param>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setschedpolicy(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setscope(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setstack(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<any>, p3: number): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setstackaddr(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function pthread_attr_setstacksize(p1: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_cancel(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_broadcast(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_condattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_signal(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_signal_thread_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_t>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_timedwait(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>, p3: interop.Pointer | interop.Reference<timespec>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_timedwait_relative_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>, p3: interop.Pointer | interop.Reference<timespec>): number;

/**
 * @since 2.0
 */
declare function pthread_cond_wait(p1: interop.Pointer | interop.Reference<_opaque_pthread_cond_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>): number;

/**
 * @since 2.0
 */
declare function pthread_condattr_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_condattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_condattr_getpshared(p1: interop.Pointer | interop.Reference<_opaque_pthread_condattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_condattr_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_condattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_condattr_setpshared(p1: interop.Pointer | interop.Reference<_opaque_pthread_condattr_t>, p2: number): number;

/**
 * @since 14.2
 */
declare function pthread_cpu_number_np(cpu_number_out: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_create(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<_opaque_pthread_t>>, p2: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p3: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>) => interop.Pointer | interop.Reference<any>>, p4: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function pthread_create_suspended_np(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<_opaque_pthread_t>>, p2: interop.Pointer | interop.Reference<_opaque_pthread_attr_t>, p3: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>) => interop.Pointer | interop.Reference<any>>, p4: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function pthread_detach(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>): number;

/**
 * @since 2.0
 */
declare function pthread_equal(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_t>): number;

/**
 * @since 2.0
 */
declare function pthread_exit(p1: interop.Pointer | interop.Reference<any>): void;

/**
 * @since 2.0
 */
declare function pthread_from_mach_thread_np(p1: number): interop.Pointer | interop.Reference<_opaque_pthread_t>;

/**
 * @since 8.0
 */
declare function pthread_get_qos_class_np(__pthread: interop.Pointer | interop.Reference<_opaque_pthread_t>, __qos_class: interop.Pointer | interop.Reference<qos_class_t>, __relative_priority: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_get_stackaddr_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>): interop.Pointer | interop.Reference<any>;

/**
 * @since 2.0
 */
declare function pthread_get_stacksize_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>): number;

/**
 * @since 2.0
 */
declare function pthread_getconcurrency(): number;

/**
 * @since 3.2
 */
declare function pthread_getname_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: string | interop.Pointer | interop.Reference<any>, p3: number): number;

/**
 * @since 2.0
 */
declare function pthread_getschedparam(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<sched_param>): number;

/**
 * @since 2.0
 */
declare function pthread_getspecific(p1: number): interop.Pointer | interop.Reference<any>;

declare function pthread_getugid_np(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_is_threaded_np(): number;

/**
 * @since 17.4
 */
declare function pthread_jit_write_freeze_callbacks_np(): void;

/**
 * @since 17.4
 */
declare function pthread_jit_write_protect_supported_np(): number;

/**
 * @since 17.4
 */
declare function pthread_jit_write_with_callback_np(callback: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>) => number>, ctx: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function pthread_join(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

/**
 * @since 2.0
 */
declare function pthread_key_create(p1: interop.Pointer | interop.Reference<number>, p2: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>) => void>): number;

/**
 * @since 2.0
 */
declare function pthread_key_delete(p1: number): number;

declare function pthread_kill(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_killFunction(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_mach_thread_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>): number;

/**
 * @since 2.0
 */
declare function pthread_main_np(): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_getprioceiling(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_lock(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_setprioceiling(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>, p2: number, p3: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_trylock(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>): number;

/**
 * @since 2.0
 */
declare function pthread_mutex_unlock(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutex_t>): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>): number;

/**
 * @since 11.3
 */
declare function pthread_mutexattr_getpolicy_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_getprioceiling(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_getprotocol(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_getpshared(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_gettype(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>): number;

/**
 * @since 5.0
 */
declare function pthread_mutexattr_setpolicy_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_setprioceiling(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_setprotocol(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_setpshared(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_mutexattr_settype(p1: interop.Pointer | interop.Reference<_opaque_pthread_mutexattr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_once(p1: interop.Pointer | interop.Reference<_opaque_pthread_once_t>, p2: interop.FunctionReference<() => void>): number;

/**
 * @since 8.0
 */
declare function pthread_override_qos_class_end_np(__override: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 8.0
 */
declare function pthread_override_qos_class_start_np(__pthread: interop.Pointer | interop.Reference<_opaque_pthread_t>, __qos_class: qos_class_t, __relative_priority: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 2.0
 */
declare function pthread_rwlock_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlock_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>, p2: interop.Pointer | interop.Reference<_opaque_pthread_rwlockattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlock_rdlock(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlock_tryrdlock(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlock_trywrlock(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlock_unlock(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlock_wrlock(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlock_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlockattr_destroy(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlockattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlockattr_getpshared(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlockattr_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlockattr_init(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlockattr_t>): number;

/**
 * @since 2.0
 */
declare function pthread_rwlockattr_setpshared(p1: interop.Pointer | interop.Reference<_opaque_pthread_rwlockattr_t>, p2: number): number;

/**
 * @since 2.0
 */
declare function pthread_self(): interop.Pointer | interop.Reference<_opaque_pthread_t>;

/**
 * @since 8.0
 */
declare function pthread_set_qos_class_self_np(__qos_class: qos_class_t, __relative_priority: number): number;

/**
 * @since 2.0
 */
declare function pthread_setcancelstate(p1: number, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_setcanceltype(p1: number, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_setconcurrency(p1: number): number;

/**
 * @since 3.2
 */
declare function pthread_setname_np(p1: string | interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function pthread_setschedparam(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: number, p3: interop.Pointer | interop.Reference<sched_param>): number;

/**
 * @since 2.0
 */
declare function pthread_setspecific(p1: number, p2: interop.Pointer | interop.Reference<any>): number;

declare function pthread_setugid_np(p1: number, p2: number): number;

declare function pthread_sigmask(p1: number, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_sigmaskFunction(p1: number, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_testcancel(): void;

/**
 * @since 3.2
 */
declare function pthread_threadid_np(p1: interop.Pointer | interop.Reference<_opaque_pthread_t>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function pthread_yield_np(): void;

declare function ptsname(p1: number): interop.Pointer | interop.Reference<any>;

/**
 * @since 11.3
 */
declare function ptsname_r(fildes: number, buffer: string | interop.Pointer | interop.Reference<any>, buflen: number): number;

declare function putenv(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function putwc(p1: number, p2: interop.Pointer | interop.Reference<FILE>): number;

declare function putwc_l(p1: number, p2: interop.Pointer | interop.Reference<FILE>, p3: interop.Pointer | interop.Reference<any>): number;

declare function putwchar(p1: number): number;

declare function putwchar_l(p1: number, p2: interop.Pointer | interop.Reference<any>): number;

declare function pwrite(__fd: number, __buf: interop.Pointer | interop.Reference<any>, __nbyte: number, __offset: number): number;

declare function qsort(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number>): void;

/**
 * @since 3.2
 */
declare function qsort_b(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, __compar: (p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>) => number): void;

declare function qsort_r(__base: interop.Pointer | interop.Reference<any>, __nel: number, __width: number, p4: interop.Pointer | interop.Reference<any>, __compar: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>) => number>): void;

declare function quick_exit(p1: number): void;

declare function radixsort(__base: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __nel: number, __table: string | interop.Pointer | interop.Reference<any>, __endbyte: number): number;

declare function raise(p1: number): number;

declare function rand(): number;

declare function rand_r(p1: interop.Pointer | interop.Reference<number>): number;

declare function random(): number;

declare function rcmd(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: number, p3: string | interop.Pointer | interop.Reference<any>, p4: string | interop.Pointer | interop.Reference<any>, p5: string | interop.Pointer | interop.Reference<any>, p6: interop.Pointer | interop.Reference<number>): number;

declare function rcmd_af(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: number, p3: string | interop.Pointer | interop.Reference<any>, p4: string | interop.Pointer | interop.Reference<any>, p5: string | interop.Pointer | interop.Reference<any>, p6: interop.Pointer | interop.Reference<number>, p7: number): number;

declare function read(p1: number, p2: interop.Pointer | interop.Reference<any>, __nbyte: number): number;

declare function readlink(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>, __bufsize: number): number;

/**
 * @since 8.0
 */
declare function readlinkat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: string | interop.Pointer | interop.Reference<any>, p4: number): number;

declare function realloc(__ptr: interop.Pointer | interop.Reference<any>, __size: number): interop.Pointer | interop.Reference<any>;

declare function reallocf(__ptr: interop.Pointer | interop.Reference<any>, __size: number): interop.Pointer | interop.Reference<any>;

declare function realpath(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function reboot(p1: number): number;

declare function revoke(p1: string | interop.Pointer | interop.Reference<any>): number;

interface rlimit {
	rlim_cur: number;
	rlim_max: number;
}
declare var rlimit: interop.StructType<rlimit>;

declare function rmdir(p1: string | interop.Pointer | interop.Reference<any>): number;

/**
 * @since 13.0
 */
declare function rpmatch(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function rresvport(p1: interop.Pointer | interop.Reference<number>): number;

declare function rresvport_af(p1: interop.Pointer | interop.Reference<number>, p2: number): number;

interface rusage {
	ru_utime: timeval;
	ru_stime: timeval;
	ru_maxrss: number;
	ru_ixrss: number;
	ru_idrss: number;
	ru_isrss: number;
	ru_minflt: number;
	ru_majflt: number;
	ru_nswap: number;
	ru_inblock: number;
	ru_oublock: number;
	ru_msgsnd: number;
	ru_msgrcv: number;
	ru_nsignals: number;
	ru_nvcsw: number;
	ru_nivcsw: number;
}
declare var rusage: interop.StructType<rusage>;

interface rusage_info_v0 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
}
declare var rusage_info_v0: interop.StructType<rusage_info_v0>;

interface rusage_info_v1 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
	ri_child_user_time: number;
	ri_child_system_time: number;
	ri_child_pkg_idle_wkups: number;
	ri_child_interrupt_wkups: number;
	ri_child_pageins: number;
	ri_child_elapsed_abstime: number;
}
declare var rusage_info_v1: interop.StructType<rusage_info_v1>;

interface rusage_info_v2 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
	ri_child_user_time: number;
	ri_child_system_time: number;
	ri_child_pkg_idle_wkups: number;
	ri_child_interrupt_wkups: number;
	ri_child_pageins: number;
	ri_child_elapsed_abstime: number;
	ri_diskio_bytesread: number;
	ri_diskio_byteswritten: number;
}
declare var rusage_info_v2: interop.StructType<rusage_info_v2>;

interface rusage_info_v3 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
	ri_child_user_time: number;
	ri_child_system_time: number;
	ri_child_pkg_idle_wkups: number;
	ri_child_interrupt_wkups: number;
	ri_child_pageins: number;
	ri_child_elapsed_abstime: number;
	ri_diskio_bytesread: number;
	ri_diskio_byteswritten: number;
	ri_cpu_time_qos_default: number;
	ri_cpu_time_qos_maintenance: number;
	ri_cpu_time_qos_background: number;
	ri_cpu_time_qos_utility: number;
	ri_cpu_time_qos_legacy: number;
	ri_cpu_time_qos_user_initiated: number;
	ri_cpu_time_qos_user_interactive: number;
	ri_billed_system_time: number;
	ri_serviced_system_time: number;
}
declare var rusage_info_v3: interop.StructType<rusage_info_v3>;

interface rusage_info_v4 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
	ri_child_user_time: number;
	ri_child_system_time: number;
	ri_child_pkg_idle_wkups: number;
	ri_child_interrupt_wkups: number;
	ri_child_pageins: number;
	ri_child_elapsed_abstime: number;
	ri_diskio_bytesread: number;
	ri_diskio_byteswritten: number;
	ri_cpu_time_qos_default: number;
	ri_cpu_time_qos_maintenance: number;
	ri_cpu_time_qos_background: number;
	ri_cpu_time_qos_utility: number;
	ri_cpu_time_qos_legacy: number;
	ri_cpu_time_qos_user_initiated: number;
	ri_cpu_time_qos_user_interactive: number;
	ri_billed_system_time: number;
	ri_serviced_system_time: number;
	ri_logical_writes: number;
	ri_lifetime_max_phys_footprint: number;
	ri_instructions: number;
	ri_cycles: number;
	ri_billed_energy: number;
	ri_serviced_energy: number;
	ri_interval_max_phys_footprint: number;
	ri_runnable_time: number;
}
declare var rusage_info_v4: interop.StructType<rusage_info_v4>;

interface rusage_info_v5 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
	ri_child_user_time: number;
	ri_child_system_time: number;
	ri_child_pkg_idle_wkups: number;
	ri_child_interrupt_wkups: number;
	ri_child_pageins: number;
	ri_child_elapsed_abstime: number;
	ri_diskio_bytesread: number;
	ri_diskio_byteswritten: number;
	ri_cpu_time_qos_default: number;
	ri_cpu_time_qos_maintenance: number;
	ri_cpu_time_qos_background: number;
	ri_cpu_time_qos_utility: number;
	ri_cpu_time_qos_legacy: number;
	ri_cpu_time_qos_user_initiated: number;
	ri_cpu_time_qos_user_interactive: number;
	ri_billed_system_time: number;
	ri_serviced_system_time: number;
	ri_logical_writes: number;
	ri_lifetime_max_phys_footprint: number;
	ri_instructions: number;
	ri_cycles: number;
	ri_billed_energy: number;
	ri_serviced_energy: number;
	ri_interval_max_phys_footprint: number;
	ri_runnable_time: number;
	ri_flags: number;
}
declare var rusage_info_v5: interop.StructType<rusage_info_v5>;

interface rusage_info_v6 {
	ri_uuid: interop.Reference<number>;
	ri_user_time: number;
	ri_system_time: number;
	ri_pkg_idle_wkups: number;
	ri_interrupt_wkups: number;
	ri_pageins: number;
	ri_wired_size: number;
	ri_resident_size: number;
	ri_phys_footprint: number;
	ri_proc_start_abstime: number;
	ri_proc_exit_abstime: number;
	ri_child_user_time: number;
	ri_child_system_time: number;
	ri_child_pkg_idle_wkups: number;
	ri_child_interrupt_wkups: number;
	ri_child_pageins: number;
	ri_child_elapsed_abstime: number;
	ri_diskio_bytesread: number;
	ri_diskio_byteswritten: number;
	ri_cpu_time_qos_default: number;
	ri_cpu_time_qos_maintenance: number;
	ri_cpu_time_qos_background: number;
	ri_cpu_time_qos_utility: number;
	ri_cpu_time_qos_legacy: number;
	ri_cpu_time_qos_user_initiated: number;
	ri_cpu_time_qos_user_interactive: number;
	ri_billed_system_time: number;
	ri_serviced_system_time: number;
	ri_logical_writes: number;
	ri_lifetime_max_phys_footprint: number;
	ri_instructions: number;
	ri_cycles: number;
	ri_billed_energy: number;
	ri_serviced_energy: number;
	ri_interval_max_phys_footprint: number;
	ri_runnable_time: number;
	ri_flags: number;
	ri_user_ptime: number;
	ri_system_ptime: number;
	ri_pinstructions: number;
	ri_pcycles: number;
	ri_energy_nj: number;
	ri_penergy_nj: number;
	ri_secure_time_in_system: number;
	ri_secure_ptime_in_system: number;
	ri_neural_footprint: number;
	ri_lifetime_max_neural_footprint: number;
	ri_interval_max_neural_footprint: number;
	ri_reserved: interop.Reference<number>;
}
declare var rusage_info_v6: interop.StructType<rusage_info_v6>;

declare function ruserok(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: string | interop.Pointer | interop.Reference<any>, p4: string | interop.Pointer | interop.Reference<any>): number;

declare function sbrk(p1: number): interop.Pointer | interop.Reference<any>;

declare function sched_get_priority_max(p1: number): number;

declare function sched_get_priority_min(p1: number): number;

interface sched_param {
	sched_priority: number;
	__opaque: interop.Reference<number>;
}
declare var sched_param: interop.StructType<sched_param>;

declare function sched_yield(): number;

declare function searchfs(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<fssearchblock>, p3: interop.Pointer | interop.Reference<number>, p4: number, p5: number, p6: interop.Pointer | interop.Reference<searchstate>): number;

declare function seed48(p1: interop.Reference<number>): interop.Pointer | interop.Reference<number>;

declare function select(p1: number, p2: interop.Pointer | interop.Reference<fd_set>, p3: interop.Pointer | interop.Reference<fd_set>, p4: interop.Pointer | interop.Reference<fd_set>, p5: interop.Pointer | interop.Reference<timeval>): number;

declare function setattrlist(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, __attrBufSize: number, p5: number): number;

/**
 * @since 11.0
 */
declare function setattrlistat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>, p4: interop.Pointer | interop.Reference<any>, p5: number, p6: number): number;

declare function setdomainname(p1: string | interop.Pointer | interop.Reference<any>, __namelen: number): number;

declare function setegid(p1: number): number;

declare function setenv(__name: string | interop.Pointer | interop.Reference<any>, __value: string | interop.Pointer | interop.Reference<any>, __overwrite: number): number;

declare function seteuid(p1: number): number;

declare function setgid(p1: number): number;

declare function setgroups(p1: number, p2: interop.Pointer | interop.Reference<number>): number;

declare function sethostid(p1: number): void;

declare function sethostname(p1: string | interop.Pointer | interop.Reference<any>, __namelen: number): number;

/**
 * @since 2.0
 */
declare function setiopolicy_np(p1: number, p2: number, p3: number): number;

declare function setkey(p1: string | interop.Pointer | interop.Reference<any>): void;

declare function setkeyFunction(p1: string | interop.Pointer | interop.Reference<any>): void;

declare function setlogin(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function setmode(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function setpgid(p1: number, p2: number): number;

declare function setpgrp(): number;

declare function setpriority(p1: number, p2: number, p3: number): number;

declare function setprogname(p1: string | interop.Pointer | interop.Reference<any>): void;

declare function setregid(p1: number, p2: number): number;

declare function setreuid(p1: number, p2: number): number;

declare function setrgid(p1: number): number;

declare function setrlimit(p1: number, p2: interop.Pointer | interop.Reference<rlimit>): number;

declare function setruid(p1: number): number;

declare function setsgroups_np(p1: number, p2: interop.Reference<number>): number;

declare function setsid(): number;

declare function setstate(p1: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<any>;

declare function setuid(p1: number): number;

declare function setusershell(): void;

declare function setwgroups_np(p1: number, p2: interop.Reference<number>): number;

declare function sigaddset(p1: interop.Pointer | interop.Reference<number>, p2: number): number;

declare function sigaltstack(p1: interop.Pointer | interop.Reference<__darwin_sigaltstack>, p2: interop.Pointer | interop.Reference<__darwin_sigaltstack>): number;

declare function sigblock(p1: number): number;

declare function sigdelset(p1: interop.Pointer | interop.Reference<number>, p2: number): number;

declare function sigemptyset(p1: interop.Pointer | interop.Reference<number>): number;

declare function sigfillset(p1: interop.Pointer | interop.Reference<number>): number;

declare function sighold(p1: number): number;

declare function sigignore(p1: number): number;

declare function siginterrupt(p1: number, p2: number): number;

declare function sigismember(p1: interop.Pointer | interop.Reference<number>, p2: number): number;

declare function signal(p1: number, p2: interop.FunctionReference<(p1: number) => void>): interop.FunctionReference<(p1: number) => void>;

declare function sigpause(p1: number): number;

declare function sigpending(p1: interop.Pointer | interop.Reference<number>): number;

declare function sigprocmask(p1: number, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<number>): number;

declare function sigrelse(p1: number): number;

declare function sigset(p1: number, p2: interop.FunctionReference<(p1: number) => void>): interop.FunctionReference<(p1: number) => void>;

declare function sigsetmask(p1: number): number;

interface sigstack {
	ss_sp: interop.Pointer | interop.Reference<any>;
	ss_onstack: number;
}
declare var sigstack: interop.StructType<sigstack>;

declare function sigsuspend(p1: interop.Pointer | interop.Reference<number>): number;

declare function sigvec(p1: number, p2: interop.Pointer | interop.Reference<sigvecStruct>, p3: interop.Pointer | interop.Reference<sigvecStruct>): number;

interface sigvecStruct {
	sv_handler: interop.FunctionReference<(p1: number) => void>;
	sv_mask: number;
	sv_flags: number;
}
declare var sigvecStruct: interop.StructType<sigvecStruct>;

declare function sigwait(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

declare function sleep(p1: number): number;

declare function sradixsort(__base: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __nel: number, __table: string | interop.Pointer | interop.Reference<any>, __endbyte: number): number;

declare function srand(p1: number): void;

declare function srand48(p1: number): void;

declare function sranddev(): void;

declare function srandom(p1: number): void;

declare function srandomdev(): void;

declare function strtod(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function strtod_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: interop.Pointer | interop.Reference<any>): number;

declare function strtof(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function strtof_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: interop.Pointer | interop.Reference<any>): number;

declare function strtofflags(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 2.0
 */
declare function strtoimax(__nptr: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtoimax_l(nptr: string | interop.Pointer | interop.Reference<any>, endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, base: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function strtol(__str: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtol_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function strtold(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function strtold_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: interop.Pointer | interop.Reference<any>): number;

declare function strtoll(__str: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtoll_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 14.0
 */
declare function strtonum(__numstr: string | interop.Pointer | interop.Reference<any>, __minval: number, __maxval: number, __errstrp: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function strtoq(__str: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtoq_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function strtoul(__str: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtoul_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function strtoull(__str: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtoull_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function strtoumax(__nptr: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtoumax_l(nptr: string | interop.Pointer | interop.Reference<any>, endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, base: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function strtouq(__str: string | interop.Pointer | interop.Reference<any>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, __base: number): number;

declare function strtouq_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare var suboptarg: interop.Pointer | interop.Reference<any>;

declare var suboptargVar: interop.Pointer | interop.Reference<any>;

declare function swab(p1: interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>, __nbytes: number): void;

declare function swapon(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function symlink(p1: string | interop.Pointer | interop.Reference<any>, p2: string | interop.Pointer | interop.Reference<any>): number;

/**
 * @since 8.0
 */
declare function symlinkat(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: string | interop.Pointer | interop.Reference<any>): number;

declare function sync(): void;

/**
 * @since 6.0
 */
declare function sync_volume_np(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

declare var sys_siglist: interop.Reference<interop.Pointer | interop.Reference<any>>;

declare var sys_signame: interop.Reference<interop.Pointer | interop.Reference<any>>;

declare function sysconf(p1: number): number;

declare function tcgetpgrp(p1: number): number;

declare function tcsetpgrp(p1: number, p2: number): number;

declare function towctrans(p1: number, p2: number): number;

declare function towctrans_l(p1: number, p2: number, p3: interop.Pointer | interop.Reference<any>): number;

declare function truncate(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

declare function ttyname(p1: number): interop.Pointer | interop.Reference<any>;

declare function ttyname_r(p1: number, p2: string | interop.Pointer | interop.Reference<any>, __len: number): number;

declare function ttyslot(): number;

declare function ualarm(p1: number, p2: number): number;

declare function undelete(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function ungetwc(p1: number, p2: interop.Pointer | interop.Reference<FILE>): number;

declare function ungetwc_l(p1: number, p2: interop.Pointer | interop.Reference<FILE>, p3: interop.Pointer | interop.Reference<any>): number;

declare function unlink(p1: string | interop.Pointer | interop.Reference<any>): number;

/**
 * @since 8.0
 */
declare function unlinkat(p1: number, p2: string | interop.Pointer | interop.Reference<any>, p3: number): number;

declare function unlockpt(p1: number): number;

declare function unsetenv(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function unwhiteout(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function usleep(p1: number): number;

declare function valloc(__size: number): interop.Pointer | interop.Reference<any>;

declare function vallocFunction(__size: number): interop.Pointer | interop.Reference<any>;

declare function vfork(): number;

declare function wait(p1: interop.Pointer | interop.Reference<number>): number;

declare function wait3(p1: interop.Pointer | interop.Reference<number>, p2: number, p3: interop.Pointer | interop.Reference<rusage>): number;

declare function wait4(p1: number, p2: interop.Pointer | interop.Reference<number>, p3: number, p4: interop.Pointer | interop.Reference<rusage>): number;

declare function waitpid(p1: number, p2: interop.Pointer | interop.Reference<number>, p3: number): number;

/**
 * @since 4.3
 */
declare function wcpcpy(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

/**
 * @since 4.3
 */
declare function wcpncpy(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): interop.Pointer | interop.Reference<number>;

/**
 * @since 4.3
 */
declare function wcscasecmp(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 4.3
 */
declare function wcscasecmp_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<any>): number;

declare function wcscat(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

declare function wcschr(p1: interop.Pointer | interop.Reference<number>, p2: number): interop.Pointer | interop.Reference<number>;

declare function wcscmp(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

declare function wcscoll(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

declare function wcscoll_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<any>): number;

declare function wcscpy(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

declare function wcscspn(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 4.3
 */
declare function wcsdup(p1: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

declare function wcsftime(p1: interop.Pointer | interop.Reference<number>, __maxlen: number, p3: interop.Pointer | interop.Reference<number>, p4: interop.Pointer | interop.Reference<tm>): number;

declare function wcsftime_l(p1: interop.Pointer | interop.Reference<number>, __n: number, p3: interop.Pointer | interop.Reference<number>, p4: interop.Pointer | interop.Reference<tm>, p5: interop.Pointer | interop.Reference<any>): number;

declare function wcslcat(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __len: number): number;

declare function wcslcpy(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __len: number): number;

declare function wcslen(p1: interop.Pointer | interop.Reference<number>): number;

/**
 * @since 4.3
 */
declare function wcsncasecmp(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, n: number): number;

/**
 * @since 4.3
 */
declare function wcsncasecmp_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, n: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcsncat(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): interop.Pointer | interop.Reference<number>;

declare function wcsncmp(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, p3: number): number;

declare function wcsncpy(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): interop.Pointer | interop.Reference<number>;

/**
 * @since 4.3
 */
declare function wcsnlen(p1: interop.Pointer | interop.Reference<number>, __n: number): number;

declare function wcspbrk(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

declare function wcsrchr(p1: interop.Pointer | interop.Reference<number>, p2: number): interop.Pointer | interop.Reference<number>;

declare function wcsspn(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): number;

declare function wcsstr(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<number>;

declare function wcstod(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>): number;

declare function wcstod_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: interop.Pointer | interop.Reference<any>): number;

declare function wcstof(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>): number;

declare function wcstof_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function wcstoimax(__nptr: interop.Pointer | interop.Reference<number>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, __base: number): number;

declare function wcstoimax_l(nptr: interop.Pointer | interop.Reference<number>, endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, base: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcstok(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>): interop.Pointer | interop.Reference<number>;

declare function wcstol(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number): number;

declare function wcstol_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcstold(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>): number;

declare function wcstold_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: interop.Pointer | interop.Reference<any>): number;

declare function wcstoll(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number): number;

declare function wcstoll_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcstombs(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<number>, __n: number): number;

declare function wcstombs_l(__restric: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<number>, __n: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcstoul(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number): number;

declare function wcstoul_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcstoull(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number): number;

declare function wcstoull_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, p3: number, p4: interop.Pointer | interop.Reference<any>): number;

/**
 * @since 2.0
 */
declare function wcstoumax(__nptr: interop.Pointer | interop.Reference<number>, __endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, __base: number): number;

declare function wcstoumax_l(nptr: interop.Pointer | interop.Reference<number>, endptr: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<number>>, base: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wcswidth(p1: interop.Pointer | interop.Reference<number>, __n: number): number;

declare function wcswidth_l(p1: interop.Pointer | interop.Reference<number>, __n: number, p3: interop.Pointer | interop.Reference<any>): number;

declare function wcsxfrm(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): number;

declare function wcsxfrm_l(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number, p4: interop.Pointer | interop.Reference<any>): number;

declare function wctob(p1: number): number;

declare function wctob_l(p1: number, p2: interop.Pointer | interop.Reference<any>): number;

declare function wctomb(p1: string | interop.Pointer | interop.Reference<any>, p2: number): number;

declare function wctomb_l(p1: string | interop.Pointer | interop.Reference<any>, p2: number, p3: interop.Pointer | interop.Reference<any>): number;

declare function wctrans(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function wctrans_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>): number;

declare function wctype(p1: string | interop.Pointer | interop.Reference<any>): number;

declare function wctype_l(p1: string | interop.Pointer | interop.Reference<any>, p2: interop.Pointer | interop.Reference<any>): number;

declare function wcwidth(p1: number): number;

declare function wcwidth_l(p1: number, p2: interop.Pointer | interop.Reference<any>): number;

declare function wmemchr(p1: interop.Pointer | interop.Reference<number>, p2: number, __n: number): interop.Pointer | interop.Reference<number>;

declare function wmemcmp(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): number;

declare function wmemcpy(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): interop.Pointer | interop.Reference<number>;

declare function wmemmove(p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, __n: number): interop.Pointer | interop.Reference<number>;

declare function wmemset(p1: interop.Pointer | interop.Reference<number>, p2: number, __n: number): interop.Pointer | interop.Reference<number>;

declare function write(__fd: number, __buf: interop.Pointer | interop.Reference<any>, __nbyte: number): number;
