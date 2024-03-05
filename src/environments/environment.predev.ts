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
  name: "predev",

  /**
   * Endpoints privados
   */
  urlBackAuth: "https://rsi.uis.edu.co/predev/auth/api",
  urlBackHV: "https://rsi.uis.edu.co/predev/hojadevida/api",
  urlBackCore: "https://rsi.uis.edu.co/predev/core/api",
  urlBackAdmonPersonal: "https://rsi.uis.edu.co/predev/admonpersonal/api",
  urlBackAdmonPagos: "https://rsi.uis.edu.co/predev/admonpagos/api",
  urlBackIntegration: "https://rsi.uis.edu.co/predev/integration/api",
  urlBackSettingsDgth: "https://rsi.uis.edu.co/predev/confdgth/api",
  urlBackSivieApoyo: "https://rsi.uis.edu.co/predev/apoyo/api",
  urlBackSivieInvestigacion: "https://rsi.uis.edu.co/predev/investigacion/api",
  urlBackPdfTests: "https://rsi.uis.edu.co/predev/report/api/pdf-tests",
  urlBackPracticasYPasantias:
    "https://rsi.uis.edu.co/predev/practicasypasantias/api",
  urlBackAdmonAdmisiones: "https://rsi.uis.edu.co/predev/admonadmisiones/api",
  urlBackResolucionesYActas:
    "https://rsi.uis.edu.co/predev/resolucionesyactas/api",
  urlBackAuxiliaturas: "https://rsi.uis.edu.co/predev/auxiliaturas/api",
  urlBackRegistration: "https://rsi.uis.edu.co/predev/registration/api",
  urlBackSiviePortafolio: "https://rsi.uis.edu.co/predev/portafolio/api",
  urlBackCreditosCondonables:
    "https://rsi.uis.edu.co/predev/creditoscondonables/api",
  urlBackPlaneacion: "https://rsi.uis.edu.co/predev/planeacion/api",
  urlBackSgdea: "https://rsi.uis.edu.co/predev/sgdea/api",
  urlBackSivieConfig: "https://rsi.uis.edu.co/predev/confvie/api",
  urlBackPresupuesto: "https://rsi.uis.edu.co/predev/presupuesto/api",
  urlBackProgramacionPresupuestal:
    "https://rsi.uis.edu.co/predev/programacionpresupuestal/api",
  urlBackInbox: "https://rsi.uis.edu.co/predev/inbox/api",
  urlBackSituacionesAdm: "https://rsi.uis.edu.co/predev/situacionesadm/api",
  urlBackHVMinterior: "https://extdev.uis.edu.co/predev/hojadevida/api",
  urlBackContabilidad: "https://rsi.uis.edu.co/predev/contabilidad/api",
  urlBackInventarios: "https://rsi.uis.edu.co/predev/inventarios/api",
  urlBackNotificaciones: "https://rsi.uis.edu.co/predev/notificaciones/api",
  urlBackPlanAdquisiciones:
    "https://rsi.uis.edu.co/predev/planadquisiciones/api",
  urlBackLiquidador: "https://rsi.uis.edu.co/predev/liquidador/api",
  urlBackMetaDatos: "https://rsi.uis.edu.co/predev/metadatos/api",
  urlBackProveedores: "https://rsi.uis.edu.co/predev/proveedores/api",
  urlBackPropuestas: "https://rsi.uis.edu.co/predev/extensionpropuestas/api",

  /**
   * Endpoints públicos
   */
  urlBackAuthPublic: "https://rsi.uis.edu.co/predev/auth/public/api",
  urlBackHVPublic: "https://rsi.uis.edu.co/predev/hojadevida/public/api",
  urlBackCorePublic: "https://rsi.uis.edu.co/predev/core/public/api",
  urlBackAdmonPersonalPublic:
    "https://rsi.uis.edu.co/predev/admonpersonal/public/api",
  urlBackAdmonPagosPublic:
    "https://rsi.uis.edu.co/predev/admonpagos/public/api",
  urlBackIntegrationPublic:
    "https://rsi.uis.edu.co/predev/integration/public/api",
  urlBackSettingsDgthPublic:
    "https://rsi.uis.edu.co/predev/confdgth/public/api",
  urlBackSivieApoyoPublic: "https://rsi.uis.edu.co/predev/apoyo/public/api",
  urlBackSivieInvestigacionPublic:
    "https://rsi.uis.edu.co/predev/investigacion/public/api",
  urlBackPracticasYPasantiasPublic:
    "https://rsi.uis.edu.co/predev/practicasypasantias/public/api",
  urlBackAdmonAdmisionesPublic:
    "https://rsi.uis.edu.co/predev/admonadmisiones/public/api",
  urlBackResolucionesYActasPublic:
    "https://rsi.uis.edu.co/predev/resolucionesyactas/public/api",
  urlBackAuxiliaturasPublic:
    "https://rsi.uis.edu.co/predev/auxiliaturas/public/api",
  urlBackRegistrationPublic:
    "https://rsi.uis.edu.co/predev/registration/public/api",
  urlBackSiviePortafolioPublic:
    "https://rsi.uis.edu.co/predev/portafolio/public/api",
  urlBackCreditosCondonablesPublic:
    "https://rsi.uis.edu.co/predev/creditoscondonables/public/api",
  urlBackPlaneacionPublic:
    "https://rsi.uis.edu.co/predev/planeacion/public/api",
  urlBackSgdeaPublic: "https://rsi.uis.edu.co/predev/sgdea/public/api",
  urlBackDirectorioPublic:
    "https://rsi.uis.edu.co/predev/directoriouis/public/api",
  urlBackPresupuestoPublic:
    "https://rsi.uis.edu.co/predev/presupuesto/public/api",
  urlBackProgramacionPresupuestalPublic:
    "https://rsi.uis.edu.co/predev/programacionpresupuestal/public/api",
  urlBackInboxPublic: "https://rsi.uis.edu.co/predev/inbox/public/api",
  urlBackSituacionesAdmPublic:
    "https://rsi.uis.edu.co/predev/situacionesadm/public/api",
  urlBackPlanAdquisicionesPublic:
    "https://rsi.uis.edu.co/predev/planadquisiciones/public/api",
  urlBackLiquidadorPublic:
    "https://rsi.uis.edu.co/predev/liquidador/public/api",
  urlBackMetaDatosPublic: "https://rsi.uis.edu.co/predev/metadatos/public/api",
  urlBackProveedoresPublic:
    "https://rsi.uis.edu.co/predev/proveedores/public/api",

  /**
   * Urls de los microfrontends
   */
  urlMFAuth: "https://rsi.uis.edu.co/predev/authmf/",
  urlMFHV: "https://rsi.uis.edu.co/predev/hojadevidamf/",
  urlMFCore: "https://rsi.uis.edu.co/predev/coremf/",
  urlMFAdmonPagos: "https://rsi.uis.edu.co/predev/admonpagosmf/",
  urlMFDirectorio: "https://rsi.uis.edu.co/predev/directoriomf/",
  urlMFInbox: "https://rsi.uis.edu.co/predev/inboxmf/",
  urlMFSivieApoyo: "https://rsi.uis.edu.co/predev/apoyomf/",
  urlMFSivieInvestigacion: "https://rsi.uis.edu.co/predev/investigacionmf/",
  urlMFSiviePortafolio: "https://rsi.uis.edu.co/predev/portafoliomf/",
  urlMFAdmonpersonal: "https://rsi.uis.edu.co/predev/admonpersonalmf/",
  urlMFProgramacionPresupuestal:
    "https://rsi.uis.edu.co/predev/programacionpresupuestalmf/",
  urlMFPresupuesto: "https://rsi.uis.edu.co/predev/presupuestomf/",
  urlMFComedores: "https://rsi.uis.edu.co/predev/comedoresmf/",
  urlMFSituAdm: "https://rsi.uis.edu.co/predev/situacionesadmmf/",
  urlMFSgdea: "https://rsi.uis.edu.co/predev/sgdeamf/",
  urlMFContabilidad: "https://rsi.uis.edu.co/predev/contabilidadmf/",
  urlMFAuxiliaturas: "https://rsi.uis.edu.co/predev/auxiliaturasmf/",
  urlMFCondonables: "https://rsi.uis.edu.co/predev/creditoscondonablesmf/",
  urlMFPracticasYPasantias:
    "https://rsi.uis.edu.co/predev/practicasypasantiasmf/",
  urlMFConfiguracionPyp: "https://rsi.uis.edu.co/predev/pconfiguracionmf/",
  urlMFAdmonPlanta: "https://rsi.uis.edu.co/predev/admonplantamf/",
  urlMFInventarios: "https://rsi.uis.edu.co/predev/inventariosmf/",
  urlMFBackPlanAdquisiciones:
    "https://rsi.uis.edu.co/predev/planadquisicionesmf/",
  urlMFLiquidador: "https://rsi.uis.edu.co/predev/liquidadormf/",

  /**
   * Sitekey del captcha
   */
  recaptcha: {
    siteKey: "6LcaFaQfAAAAAAbXC8Vclo9AXaDUvpUtFdiiGkEm",
  },
};
