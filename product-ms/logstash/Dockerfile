FROM logstash:8.11.3

WORKDIR /usr/share/logstash

# # copy the mysql jdbc driver to the external library folder of logstash
COPY ./bin/mysql.jar /usr/share/logstash/logstash-core/lib/jars/

# # copy  pipelines.yml 
COPY ./config/ config/

COPY ./pipeline/ pipeline/

CMD ["logstash"]
