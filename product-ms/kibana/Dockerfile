from kibana:8.11.3
ARG TOKEN
RUN echo "elasticsearch.serviceAccountToken: \"$TOKEN\"" >> /usr/share/kibana/config/kibana.yml
CMD ["/usr/local/bin/kibana-docker"]
