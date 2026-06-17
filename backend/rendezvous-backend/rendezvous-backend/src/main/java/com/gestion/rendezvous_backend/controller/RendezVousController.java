package com.gestion.rendezvous_backend.controller;

import com.gestion.rendezvous_backend.dto.RendezVousRequest;
import com.gestion.rendezvous_backend.dto.RendezVousResponse;
import com.gestion.rendezvous_backend.service.RendezVousService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rendezvous")
@RequiredArgsConstructor
public class RendezVousController {

    private final RendezVousService service;

    @GetMapping
    public ResponseEntity<Page<RendezVousResponse>> getAll(
            @RequestParam(required = false) String nomClient,
            @RequestParam(required = false) String statut,
            @PageableDefault(size = 10, sort = "dateRendezVous", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(service.getAllRendezVous(nomClient, statut, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RendezVousResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRendezVousById(id));
    }

    @PostMapping
    public ResponseEntity<RendezVousResponse> create(@Valid @RequestBody RendezVousRequest request) {
        RendezVousResponse response = service.createRendezVous(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezVousResponse> update(@PathVariable Long id,
                                                     @Valid @RequestBody RendezVousRequest request) {
        return ResponseEntity.ok(service.updateRendezVous(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteRendezVous(id);
        return ResponseEntity.noContent().build();
    }
}
