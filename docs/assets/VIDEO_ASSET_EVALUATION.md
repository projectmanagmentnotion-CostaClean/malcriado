# Video asset evaluation

Los dos originales oficiales ya son accesibles para inventario, pero no se integran.

Motivos:

- 126–187 MB por original;
- sin versiones desktop/movil optimizadas;
- sin poster final ni WebM;
- falta validar duracion, encuadre estable, audio y zona segura;
- un primer viewport en video empeoraria LCP y consumo movil.

Decision: **NO-GO de integracion** en este PR. Reabrir solo con H.264/WebM, poster AVIF/WebP, carga diferida, `muted`, `playsinline`, alternativa estatica y reduced motion.
