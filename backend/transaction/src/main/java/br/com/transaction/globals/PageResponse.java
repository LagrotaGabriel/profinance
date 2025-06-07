package br.com.transaction.globals;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class PageResponse<T> {

    private List<T> content;
    private Boolean empty;
    private Boolean first;
    private Boolean last;
    private Integer number;
    private Integer numberOfElements;
    private Integer pageNumber;
    private Integer pageSize;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;

    public PageResponse(Page page, List<T> content) {

        if (page == null) throw new IllegalArgumentException("Page cannot be null");

        this.content = content;
        this.empty = page.isEmpty();
        this.first = page.isFirst();
        this.last = page.isLast();
        this.number = page.getNumber();
        this.numberOfElements = page.getNumberOfElements();
        this.pageNumber = page.getNumber();
        this.pageSize = page.getSize();
        this.size = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
    }
}