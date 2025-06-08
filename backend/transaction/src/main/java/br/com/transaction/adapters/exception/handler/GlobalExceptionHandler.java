package br.com.transaction.adapters.exception.handler;

import br.com.transaction.adapters.exception.models.DuplicateResourceException;
import br.com.transaction.adapters.exception.models.EntityNotFoundException;
import br.com.transaction.adapters.exception.models.StandardError;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<StandardError> duplicateResourceExceptionHandler(HttpServletRequest req,
                                                                           DuplicateResourceException duplicateResourceException) {

        StandardError standardError = StandardError.builder()
                .localDateTime(LocalDateTime.now().toString())
                .status(409)
                .error(duplicateResourceException.getMessage())
                .path(req.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.CONFLICT).body(standardError);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<StandardError> entityNotFoundExceptionHandler(HttpServletRequest req,
                                                                        EntityNotFoundException entityNotFoundException) {

        StandardError standardError = StandardError.builder()
                .localDateTime(LocalDateTime.now().toString())
                .status(404)
                .error(entityNotFoundException.getMessage())
                .path(req.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(standardError);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardError> genericExceptionHandler(HttpServletRequest req,
                                                                 Exception ex) {

        StandardError standardError = StandardError.builder()
                .localDateTime(LocalDateTime.now().toString())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(ex.getMessage())
                .path(req.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(standardError);
    }

    @Nonnull
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}