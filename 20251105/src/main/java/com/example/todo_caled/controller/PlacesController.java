package com.example.todo_caled.controller;

import com.example.todo_caled.service.KakaoLocalService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "http://localhost:5173") // React 개발 서버
public class PlacesController {

    private final KakaoLocalService kakaoLocalService;

    public PlacesController(KakaoLocalService kakaoLocalService) {
        this.kakaoLocalService = kakaoLocalService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchPlaces(@RequestParam("query") String query,
                               @RequestParam(value = "page", defaultValue = "1") int page,
                               @RequestParam(value = "size", defaultValue = "10") int size) {
        return kakaoLocalService.searchKeyword(query, page, size);
    }
}
