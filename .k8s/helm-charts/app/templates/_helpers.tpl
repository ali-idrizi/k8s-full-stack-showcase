{{/*
Return the proper image name
*/}}
{{- define "main.image" -}}
{{- .Values.image.name -}}
{{- end -}}

{{/*
Return the proper Docker Image Registry Secret Names
*/}}
{{- define "main.imagePullSecrets" -}}
{{- include "common.images.pullSecrets" (dict "images" (list .Values.image) "global" .Values.global) -}}
{{- end -}}

{{/*
Return the content of the secret with the database connection credentials
*/}}
{{- define "main.secret.content" -}}
type: Opaque
data:
  DB_HOST: {{ .Values.db.host | b64enc | quote }}
  DB_PORT: {{ .Values.db.port | toString | b64enc | quote }}
  DB_USER: {{ .Values.db.username | b64enc | quote }}
  DB_PASSWORD: {{ .Values.db.password | b64enc | quote }}
  DB_DATABASE: {{ .Values.db.database | b64enc | quote }}
{{- end -}}
