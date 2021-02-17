package co.airy.model.message.dto;

import co.airy.avro.communication.Message;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static co.airy.date.format.DateFormat.isoFromMillis;
import static co.airy.model.message.MessageRepository.resolveContent;
import static co.airy.model.metadata.MetadataObjectMapper.getMetadataPayload;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponsePayload {
    private String id;
    private Object content;
    private String senderType;
    private String sentAt;
    private String deliveryState;
    private String source;
    private JsonNode metadata;

    public static MessageResponsePayload fromMessageContainer(MessageContainer messageContainer) {
        final Message message = messageContainer.getMessage();
        return MessageResponsePayload.builder()
                .content(resolveContent(message, messageContainer.getMetadataMap()))
                .senderType(message.getSenderType().toString().toLowerCase())
                .deliveryState(message.getDeliveryState().toString().toLowerCase())
                .id(message.getId())
                .sentAt(isoFromMillis(message.getSentAt()))
                .source(message.getSource())
                .metadata(getMetadataPayload(messageContainer.getMetadataMap()))
                .build();
    }

    public static MessageResponsePayload fromMessage(Message message) {
        return MessageResponsePayload.builder()
                .content(resolveContent(message))
                .senderType(message.getSenderType().toString().toLowerCase())
                .deliveryState(message.getDeliveryState().toString().toLowerCase())
                .id(message.getId())
                .sentAt(isoFromMillis(message.getSentAt()))
                .source(message.getSource())
                .metadata(JsonNodeFactory.instance.objectNode())
                .build();
    }

}