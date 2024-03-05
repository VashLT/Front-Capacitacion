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
  name: "preprod",

  /**
   * Endpoints privados
   */
  urlBackAuth: "https://rsi.uis.edu.co/preprod/auth/api",
  urlBackHV: "https://rsi.uis.edu.co/preprod/hojadevida/api",
  urlBackCore: "https://rsi.uis.edu.co/preprod/core/api",
  urlBackAdmonPersonal: "https://rsi.uis.edu.co/preprod/admonpersonal/api",
  urlBackAdmonPagos: "https://rsi.uis.edu.co/preprod/admonpagos/api",
  urlBackIntegration: "https://rsi.uis.edu.co/preprod/integration/api",
  urlBackSettingsDgth: "https://rsi.uis.edu.co/preprod/confdgth/api",
  urlBackSivieApoyo: "https://rsi.uis.edu.co/preprod/apoyo/api",
  urlBackSivieInvestigacion: "https://rsi.uis.edu.co/preprod/investigacion/api",
  urlBackPdfTests: "https://rsi.uis.edu.co/preprod/report/api/pdf-tests",
  urlBackPracticasYPasantias:
    "https://rsi.uis.edu.co/preprod/practicasypasantias/api",
  urlBackAdmonAdmisiones: "https://rsi.uis.edu.co/preprod/admonadmisiones/api",
  urlBackResolucionesYActas:
    "https://rsi.uis.edu.co/preprod/resolucionesyactas/api",
  urlBackAuxiliaturas: "https://rsi.uis.edu.co/preprod/auxiliaturas/api",
  urlBackRegistration: "https://rsi.uis.edu.co/preprod/registration/api",
  urlBackSiviePortafolio: "https://rsi.uis.edu.co/preprod/portafolio/api",
  urlBackCreditosCondonables:
    "https://rsi.uis.edu.co/preprod/creditoscondonables/api",
  urlBackPlaneacion: "https://rsi.uis.edu.co/preprod/planeacion/api",
  urlBackSgdea: "https://rsi.uis.edu.co/preprod/sgdea/api",
  urlBackSivieConfig: "https://rsi.uis.edu.co/preprod/confvie/api",
  urlBackPresupuesto: "https://rsi.uis.edu.co/preprod/presupuesto/api",
  urlBackProgramacionPresupuestal:
    "https://rsi.uis.edu.co/preprod/programacionpresupuestal/api",
  urlBackInbox: "https://rsi.uis.edu.co/preprod/inbox/api",
  urlBackSituacionesAdm: "https://rsi.uis.edu.co/preprod/situacionesadm/api",
  urlBackHVMinterior: "https://extdev.uis.edu.co/preprod/hojadevida/api",
  urlBackContabilidad: "https://rsi.uis.edu.co/preprod/contabilidad/api",
  urlBackProveedores: "https://rsi.uis.edu.co/preprod/proveedores/api",
  urlBackInventarios: "https://rsi.uis.edu.co/preprod/inventarios/api",
  urlBackNotificaciones: "https://rsi.uis.edu.co/preprod/notificaciones/api",
  urlBackPlanAdquisiciones:
    "https://rsi.uis.edu.co/preprod/planadquisiciones/api",
  urlBackLiquidador: "https://rsi.uis.edu.co/preprod/liquidador/api",
  urlBackMetaDatos: "https://rsi.uis.edu.co/preprod/metadatos/api",
  urlBackPropuestas: "https://rsi.uis.edu.co/preprod/extensionpropuestas/api",

  /**
   * Endpoints públicos
   */
  urlBackAuthPublic: "https://rsi.uis.edu.co/preprod/auth/public/api",
  urlBackHVPublic: "https://rsi.uis.edu.co/preprod/hojadevida/public/api",
  urlBackCorePublic: "https://rsi.uis.edu.co/preprod/core/public/api",
  urlBackAdmonPersonalPublic:
    "https://rsi.uis.edu.co/preprod/admonpersonal/public/api",
  urlBackAdmonPagosPublic:
    "https://rsi.uis.edu.co/preprod/admonpagos/public/api",
  urlBackIntegrationPublic:
    "https://rsi.uis.edu.co/preprod/integration/public/api",
  urlBackSettingsDgthPublic:
    "https://rsi.uis.edu.co/preprod/confdgth/public/api",
  urlBackSivieApoyoPublic: "https://rsi.uis.edu.co/preprod/apoyo/public/api",
  urlBackSivieInvestigacionPublic:
    "https://rsi.uis.edu.co/preprod/investigacion/public/api",
  urlBackPracticasYPasantiasPublic:
    "https://rsi.uis.edu.co/preprod/practicasypasantias/public/api",
  urlBackAdmonAdmisionesPublic:
    "https://rsi.uis.edu.co/preprod/admonadmisiones/public/api",
  urlBackResolucionesYActasPublic:
    "https://rsi.uis.edu.co/preprod/resolucionesyactas/public/api",
  urlBackAuxiliaturasPublic:
    "https://rsi.uis.edu.co/preprod/auxiliaturas/public/api",
  urlBackRegistrationPublic:
    "https://rsi.uis.edu.co/preprod/registration/public/api",
  urlBackSiviePortafolioPublic:
    "https://rsi.uis.edu.co/preprod/portafolio/public/api",
  urlBackCreditosCondonablesPublic:
    "https://rsi.uis.edu.co/preprod/creditoscondonables/public/api",
  urlBackPlaneacionPublic:
    "https://rsi.uis.edu.co/preprod/planeacion/public/api",
  urlBackSgdeaPublic: "https://rsi.uis.edu.co/preprod/sgdea/public/api",
  urlBackDirectorioPublic:
    "https://rsi.uis.edu.co/preprod/directoriouis/public/api",
  urlBackPresupuestoPublic:
    "https://rsi.uis.edu.co/preprod/presupuesto/public/api",
  urlBackProgramacionPresupuestalPublic:
    "https://rsi.uis.edu.co/preprod/programacionpresupuestal/public/api",
  urlBackInboxPublic: "https://rsi.uis.edu.co/preprod/inbox/public/api",
  urlBackSituacionesAdmPublic:
    "https://rsi.uis.edu.co/preprod/situacionesadm/public/api",
  urlBackProveedoresPublic:
    "https://rsi.uis.edu.co/preprod/proveedores/public/api",
  urlBackPlanAdquisicionesPublic:
    "https://rsi.uis.edu.co/preprod/planadquisiciones/public/api",
  urlBackLiquidadorPublic:
    "https://rsi.uis.edu.co/preprod/liquidador/public/api",
  urlBackMetaDatosPublic: "https://rsi.uis.edu.co/preprod/metadatos/public/api",

  /**
   * Urls de los microfrontends
   */
  urlMFAuth: "https://rsi.uis.edu.co/preprod/authmf/",
  urlMFHV: "https://rsi.uis.edu.co/preprod/hojadevidamf/",
  urlMFCore: "https://rsi.uis.edu.co/preprod/coremf/",
  urlMFAdmonPagos: "https://rsi.uis.edu.co/preprod/admonpagosmf/",
  urlMFDirectorio: "https://rsi.uis.edu.co/preprod/directoriomf/",
  urlMFInbox: "https://rsi.uis.edu.co/preprod/inboxmf/",
  urlMFSivieApoyo: "https://rsi.uis.edu.co/preprod/apoyomf/",
  urlMFSivieInvestigacion: "https://rsi.uis.edu.co/preprod/investigacionmf/",
  urlMFSiviePortafolio: "https://rsi.uis.edu.co/preprod/portafoliomf/",
  urlMFAdmonpersonal: "https://rsi.uis.edu.co/preprod/admonpersonalmf/",
  urlMFProgramacionPresupuestal:
    "https://rsi.uis.edu.co/preprod/programacionpresupuestalmf/",
  urlMFPresupuesto: "https://rsi.uis.edu.co/preprod/presupuestomf/",
  urlMFComedores: "https://rsi.uis.edu.co/preprod/comedoresmf/",
  urlMFSituAdm: "https://rsi.uis.edu.co/preprod/situacionesadmmf/",
  urlMFSgdea: "https://rsi.uis.edu.co/preprod/sgdeamf/",
  urlMFContabilidad: "https://rsi.uis.edu.co/preprod/contabilidadmf/",
  urlMFAuxiliaturas: "https://rsi.uis.edu.co/preprod/auxiliaturasmf/",
  urlMFCondonables: "https://rsi.uis.edu.co/preprod/creditoscondonablesmf/",
  urlMFPracticasYPasantias:
    "https://rsi.uis.edu.co/preprod/practicasypasantiasmf/",
  urlMFConfiguracionPyp: "https://rsi.uis.edu.co/preprod/pconfiguracionmf/",
  urlMFAdmonPlanta: "https://rsi.uis.edu.co/preprod/admonplantamf/",
  urlMFInventarios: "https://rsi.uis.edu.co/preprod/inventariosmf/",
  urlMFBackPlanAdquisiciones:
    "https://rsi.uis.edu.co/preprod/planadquisicionesmf/",
  urlMFLiquidador: "https://rsi.uis.edu.co/preprod/liquidadormf/",

  /**
   * Sitekey del captcha
   */
  recaptcha: {
    siteKey: "6LcaFaQfAAAAAAbXC8Vclo9AXaDUvpUtFdiiGkEm",
  },
};
