declare const enum SALRegistrationError {
  NotEligible = 0,

  Failed = 1,
}

interface SALResellerAccount {
  _reserved: interop.Pointer | interop.Reference<any>;
}
declare var SALResellerAccount: interop.StructType<SALResellerAccount>;

declare var ServicesAccountLinkingVersionNumber: number;

declare var ServicesAccountLinkingVersionString: interop.Reference<number>;
