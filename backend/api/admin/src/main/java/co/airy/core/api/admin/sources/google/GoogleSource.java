package co.airy.core.api.admin.sources.google;

import co.airy.core.api.admin.Source;
import co.airy.core.api.admin.SourceApiException;
import co.airy.core.api.admin.dto.ChannelMetadata;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoogleSource implements Source {
    @Override
    public String getIdentifier() {
        return "google";
    }

    @Override
    public List<ChannelMetadata> getAvailableChannels(String token) throws SourceApiException {
        return List.of();
    }

    @Override
    public ChannelMetadata connectChannel(String token, String sourceChannelId) throws SourceApiException {
        return new ChannelMetadata();
    }

    @Override
    public void disconnectChannel(String token, String sourceChannelId) throws SourceApiException {
    }
}
