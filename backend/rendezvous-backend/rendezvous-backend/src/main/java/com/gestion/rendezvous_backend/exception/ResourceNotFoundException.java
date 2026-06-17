package com.gestion.rendezvous_backend.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " introuvable avec l'ID : " + id);
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
