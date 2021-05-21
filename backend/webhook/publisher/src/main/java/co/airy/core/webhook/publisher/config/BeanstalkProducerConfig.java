package co.airy.core.webhook.publisher.config;

import com.dinstone.beanstalkc.BeanstalkClientFactory;
import com.dinstone.beanstalkc.JobProducer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanstalkProducerConfig {

    @Bean
    public JobProducer beanstalkJobProducer(@Value("${beanstalk.hostname}") String hostName, @Value("${beanstalk.port}") int port) {
        com.dinstone.beanstalkc.Configuration config = new com.dinstone.beanstalkc.Configuration();
        config.setServiceHost(hostName);
        config.setServicePort(port);
        config.setConnectTimeout(2000);
        config.setReadTimeout(3000);
        BeanstalkClientFactory beanstalkClientFactory = new BeanstalkClientFactory(config);
        return beanstalkClientFactory.createJobProducer("default");
    }
}
