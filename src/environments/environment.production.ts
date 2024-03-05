/**
 * Variables de entorno del proyecto.
 */
export const environment = {
  /**
   * Indica si estoy en producción o no.
   */
  production: true,

  /**
   * Slug del entorno.
   */
  name: "",

  /**
   * Endpoints privados
   */
  urlBackAuth: "https://gestion.uis.edu.co/auth/api",
  urlBackHV: "https://gestion.uis.edu.co/hojadevida/api",
  urlBackCore: "https://gestion.uis.edu.co/core/api",
  urlBackAdmonPersonal: "https://gestion.uis.edu.co/admonpersonal/api",
  urlBackAdmonPagos: "https://gestion.uis.edu.co/admonpagos/api",
  urlBackIntegration: "https://gestion.uis.edu.co/integration/api",
  urlBackSettingsDgth: "https://gestion.uis.edu.co/confdgth/api",
  urlBackSivieApoyo: "https://gestion.uis.edu.co/apoyo/api",
  urlBackSivieInvestigacion: "https://gestion.uis.edu.co/investigacion/api",
  urlBackPdfTests: "https://gestion.uis.edu.co/report/api/pdf-tests",
  urlBackPracticasYPasantias:
    "https://gestion.uis.edu.co/practicasypasantias/api",
  urlBackAdmonAdmisiones: "https://gestion.uis.edu.co/admonadmisiones/api",
  urlBackResolucionesYActas:
    "https://gestion.uis.edu.co/resolucionesyactas/api",
  urlBackAuxiliaturas: "https://gestion.uis.edu.co/auxiliaturas/api",
  urlBackRegistration: "https://gestion.uis.edu.co/registration/api",
  urlBackSiviePortafolio: "https://gestion.uis.edu.co/portafolio/api",
  urlBackCreditosCondonables:
    "https://gestion.uis.edu.co/creditoscondonables/api",
  urlBackPlaneacion: "https://gestion.uis.edu.co/planeacion/api",
  urlBackSgdea: "https://gestion.uis.edu.co/sgdea/api",
  urlBackSivieConfig: "https://gestion.uis.edu.co/confvie/api",
  urlBackPresupuesto: "https://gestion.uis.edu.co/presupuesto/api",
  urlBackProgramacionPresupuestal:
    "https://gestion.uis.edu.co/programacionpresupuestal/api",
  urlBackInbox: "https://gestion.uis.edu.co/inbox/api",
  urlBackSituacionesAdm: "https://gestion.uis.edu.co/situacionesadm/api",
  urlBackHVMinterior: "https://minterior.uis.edu.co/hojadevida/api",
  urlBackContabilidad: "https://gestion.uis.edu.co/contabilidad/api",
  urlBackInventarios: "https://gestion.uis.edu.co/inventarios/api",
  urlBackNotificaciones: "https://gestion.uis.edu.co/notificaciones/api",
  urlBackPlanAdquisiciones: "https://gestion.uis.edu.co/planadquisiciones/api",
  urlBackLiquidador: "https://gestion.uis.edu.co/liquidador/api",
  urlBackMetaDatos: "https://gestion.uis.edu.co/metadatos/api",
  urlBackProveedores: "https://gestion.uis.edu.co/proveedores/api",
  urlBackPropuestas: "https://gestion.uis.edu.co/extensionpropuestas/api",

  /**
   * Endpoints públicos
   */
  urlBackAuthPublic: "https://gestion.uis.edu.co/auth/public/api",
  urlBackHVPublic: "https://gestion.uis.edu.co/hojadevida/public/api",
  urlBackCorePublic: "https://gestion.uis.edu.co/core/public/api",
  urlBackAdmonPersonalPublic:
    "https://gestion.uis.edu.co/admonpersonal/public/api",
  urlBackAdmonPagosPublic: "https://gestion.uis.edu.co/admonpagos/public/api",
  urlBackSettingsDgthPublic: "https://gestion.uis.edu.co/confdgth/public/api",
  urlBackSivieApoyoPublic: "https://gestion.uis.edu.co/apoyo/public/api",
  urlBackSivieInvestigacionPublic:
    "https://gestion.uis.edu.co/investigacion/public/api",
  urlBackPracticasYPasantiasPublic:
    "https://gestion.uis.edu.co/practicasypasantias/public/api",
  urlBackAdmonAdmisionesPublic:
    "https://gestion.uis.edu.co/admonadmisiones/public/api",
  urlBackResolucionesYActasPublic:
    "https://gestion.uis.edu.co/resolucionesyactas/public/api",
  urlBackAuxiliaturasPublic:
    "https://gestion.uis.edu.co/auxiliaturas/public/api",
  urlBackRegistrationPublic:
    "https://gestion.uis.edu.co/registration/public/api",
  urlBackSiviePortafolioPublic:
    "https://gestion.uis.edu.co/portafolio/public/api",
  urlBackCreditosCondonablesPublic:
    "https://gestion.uis.edu.co/creditoscondonables/public/api",
  urlBackSgdeaPublic: "https://gestion.uis.edu.co/sgdea/public/api",
  urlBackIntegrationPublic: "https://gestion.uis.edu.co/integration/public/api",
  urlBackDirectorioPublic:
    "https://gestion.uis.edu.co/directoriouis/public/api",
  urlBackPresupuestoPublic: "https://gestion.uis.edu.co/presupuesto/public/api",
  urlBackProgramacionPresupuestalPublic:
    "https://gestion.uis.edu.co/programacionpresupuestal/public/api",
  urlBackInboxPublic: "https://gestion.uis.edu.co/inbox/public/api",
  urlBackSituacionesAdmPublic:
    "https://gestion.uis.edu.co/situacionesadm/public/api",
  urlBackPlanAdquisicionesPublic:
    "https://gestion.uis.edu.co/planadquisiciones/public/api",
  urlBackLiquidadorPublic: "https://gestion.uis.edu.co/liquidador/public/api",
  urlBackMetaDatosPublic: "https:/gestion.uis.edu.co/metadatos/public/api",
  urlBackProveedoresPublic: "https://gestion.uis.edu.co/proveedores/public/api",

  /**
   * Urls de los microfrontends
   */
  urlMFAuth: "https://gestion.uis.edu.co/authmf/",
  urlMFHV: "https://gestion.uis.edu.co/hojadevidamf/",
  urlMFCore: "https://gestion.uis.edu.co/coremf/",
  urlMFAdmonPagos: "https://gestion.uis.edu.co/admonpagosmf/",
  urlMFDirectorio: "https://gestion.uis.edu.co/directoriomf/",
  urlMFInbox: "https://gestion.uis.edu.co/inboxmf/",
  urlMFSivieApoyo: "https://gestion.uis.edu.co/apoyomf/",
  urlMFSivieInvestigacion: "https://gestion.uis.edu.co/investigacionmf/",
  urlMFSiviePortafolio: "https://gestion.uis.edu.co/portafoliomf/",
  urlMFAdmonpersonal: "https://gestion.uis.edu.co/admonpersonalmf/",
  urlMFProgramacionPresupuestal:
    "https://gestion.uis.edu.co/programacionpresupuestalmf/",
  urlMFPresupuesto: "https://gestion.uis.edu.co/presupuestomf/",
  urlMFComedores: "https://gestion.uis.edu.co/comedoresmf/",
  urlMFSituAdm: "https://gestion.uis.edu.co/situacionesadmmf/",
  urlMFSgdea: "https://gestion.uis.edu.co/sgdeamf/",
  urlMFContabilidad: "https://gestion.uis.edu.co/contabilidadmf/",
  urlMFAuxiliaturas: "https://gestion.uis.edu.co/auxiliaturasmf/",
  urlMFCondonables: "https://gestion.uis.edu.co/creditoscondonablesmf/",
  urlMFPracticasYPasantias: "https://gestion.uis.edu.co/practicasypasantiasmf/",
  urlMFConfiguracionPyp: "https://gestion.uis.edu.co/pconfiguracionmf/",
  urlMFAdmonPlanta: "https://gestion.uis.edu.co/admonplantamf/",
  urlMFInventarios: "https://gestion.uis.edu.co/inventariosmf/",
  urlMFBackPlanAdquisiciones: "https://gestion.uis.edu.co/planadquisicionesmf/",
  urlMFLiquidador: "https://gestion.uis.edu.co/liquidadormf/",

  /**
   */
  recaptcha: {
    siteKey: "6LcaFaQfAAAAAAbXC8Vclo9AXaDUvpUtFdiiGkEm",
  },
};
