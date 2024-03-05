/**
 * Variables de entorno del proyecto.
 */
export const environment = {
  /**
   * Indica si estoy en producción o no.
   */
  production: false,

  /**
   * Slug del entorno.
   */
  name: "",

  /**
   * Endpoints privados
   */
  urlBackAuth: "http://localhost:8080/auth/api",
  urlBackHV: "http://localhost:8080/hojadevida/api",
  urlBackCore: "http://localhost:8080/core/api",
  urlBackAdmonPersonal: "http://localhost:8080/admonpersonal/api",
  urlBackAdmonPagos: "http://localhost:8080/admonpagos/api",
  urlBackIntegration: "http://localhost:8080/integration/api",
  urlBackSettingsDgth: "http://localhost:8080/confdgth/api",
  urlBackSivieApoyo: "http://localhost:8080/apoyo/api",
  urlBackSivieInvestigacion: "http://localhost:8080/investigacion/api",
  urlBackPdfTests: "http://localhost:3000/pdf-tests",
  urlBackPracticasYPasantias: "http://localhost:8080/practicasypasantias/api",
  urlBackAdmonAdmisiones: "http://localhost:8080/admonadmisiones/api",
  urlBackResolucionesYActas: "http://localhost:8080/resolucionesyactas/api",
  urlBackAuxiliaturas: "http://localhost:8080/auxiliaturas/api",
  urlBackRegistration: "http://localhost:8080/registration/api",
  urlBackSiviePortafolio: "http://localhost:8080/portafolio/api",
  urlBackCreditosCondonables: "http://localhost:8080/creditoscondonables/api",
  urlBackPlaneacion: "http://localhost:8080/planeacion/api",
  urlBackSgdea: "http://localhost:8080/sgdea/api",
  urlBackSivieConfig: "http://localhost:8080/confvie/api",
  urlBackPresupuesto: "http://localhost:8080/presupuesto/api",
  urlBackProgramacionPresupuestal:
    "http://localhost:8080/programacionpresupuestal/api",
  urlBackInbox: "http://localhost:8080/inbox/api",
  urlBackSituacionesAdm: "http://localhost:8080/situacionesadm/api",
  urlBackHVMinterior: "http://localhost:8080/hojadevida/api",
  urlBackContabilidad: "http://localhost:8080/contabilidad/api",
  urlBackInventarios: "http://localhost:8080/inventarios/api",
  urlBackNotificaciones: "http://localhost:8080/notificaciones/api",
  urlBackPlanAdquisiciones: "http://localhost:8080/planadquisiciones/api",
  urlBackLiquidador: "http://localhost:8080/liquidador/api",
  urlBackMetaDatos: "http://localhost:3000/metadatos/api",
  urlBackProveedores: "http://localhost:8080/proveedores/api",
  urlBackPropuestas: "http://localhost:8080/extensionpropuestas/api",

  /**
   * Endpoints públicos
   */
  urlBackAuthPublic: "http://localhost:8080/auth/public/api",
  urlBackHVPublic: "http://localhost:8080/hojadevida/public/api",
  urlBackCorePublic: "http://localhost:8080/core/public/api",
  urlBackAdmonPersonalPublic: "http://localhost:8080/admonpersonal/public/api",
  urlBackAdmonPagosPublic: "http://localhost:8080/admonpagos/public/api",
  urlBackIntegrationPublic: "http://localhost:8080/integration/public/api",
  urlBackSettingsDgthPublic: "http://localhost:8080/confdgth/public/api",
  urlBackSivieApoyoPublic: "http://localhost:8080/apoyo/public/api",
  urlBackSivieInvestigacionPublic:
    "http://localhost:8080/investigacion/public/api",
  urlBackPracticasYPasantiasPublic:
    "http://localhost:8080/practicasypasantias/public/api",
  urlBackAdmonAdmisionesPublic:
    "http://localhost:8080/admonadmisiones/public/api",
  urlBackResolucionesYActasPublic:
    "http://localhost:8080/resolucionesyactas/public/api",
  urlBackAuxiliaturasPublic: "http://localhost:8080/auxiliaturas/public/api",
  urlBackRegistrationPublic: "http://localhost:8080/registration/public/api",
  urlBackSiviePortafolioPublic: "http://localhost:8080/portafolio/public/api",
  urlBackCreditosCondonablesPublic:
    "http://localhost:8080/creditoscondonables/public/api",
  urlBackPlaneacionPublic: "http://localhost:8080/planeacion/public/api",
  urlBackSgdeaPublic: "http://localhost:8080/sgdea/public/api",
  urlBackDirectorioPublic: "http://localhost:8080/directoriouis/public/api",
  urlBackPresupuestoPublic: "http://localhost:8080/presupuesto/public/api",
  urlBackProgramacionPresupuestalPublic:
    "http://localhost:8080/programacionpresupuestal/public/api",
  urlBackInboxPublic: "http://localhost:8080/inbox/public/api",
  urlBackSituacionesAdmPublic:
    "http://localhost:8080/situacionesadm/public/api",
  urlBackPlanAdquisicionesPublic:
    "http://localhost:8080/planadquisiciones/public/api",
  urlBackLiquidadorPublic: "http://localhost:8080/liquidador/public/api",
  urlBackMetaDatosPublic: "http://localhost:3000/metadatos/api",
  urlBackProveedoresPublic: "http://localhost:8080/proveedores/public/api",

  /**
   * Urls de los microfrontends
   */
  urlMFAuth: "http://localhost:4200/",
  urlMFHV: "http://localhost:4202/",
  urlMFCore: "http://localhost:4203/",
  urlMFAdmonPagos: "http://localhost:4204/",
  urlMFDirectorio: "http://localhost:4200/",
  urlMFInbox: "http://localhost:4205/",
  urlMFSiviePortafolio: "http://localhost:4206/",
  urlMFSivieApoyo: "http://localhost:4207/",
  urlMFSivieInvestigacion: "http://localhost:4208/",
  urlMFAdmonpersonal: "http://localhost:4209/",
  urlMFProgramacionPresupuestal: "http://localhost:4210/",
  urlMFPresupuesto: "http://localhost:4211/",
  urlMFComedores: "http://localhost:4212",
  urlMFSituAdm: "http://localhost:4213",
  urlMFSgdea: "http://localhost:4214",
  urlMFContabilidad: "http://localhost:4215",
  urlMFAuxiliaturas: "http://localhost:4216",
  urlMFCondonables: "http://localhost:4217",
  urlMFPracticasYPasantias: "http://localhost:4218",
  urlMFConfiguracionPyp: "http://localhost:4219",
  urlMFAdmonPlanta: "http://localhost:4220",
  urlMFInventarios: "http://localhost:4221/",
  urlMFBackPlanAdquisiciones: "http://localhost:4222",
  urlMFLiquidador: "http://localhost:4223",

  /**
   * Sitekey del captcha
   */
  recaptcha: {
    siteKey: "6LcaFaQfAAAAAAbXC8Vclo9AXaDUvpUtFdiiGkEm",
  },
};
