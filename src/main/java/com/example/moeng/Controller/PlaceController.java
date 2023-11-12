package com.example.moeng.Controller;

import com.example.moeng.DTO.PlaceDTO;
import com.example.moeng.Entity.Member;
import com.example.moeng.Entity.Place;
import com.example.moeng.Repository.MemberRepository;
import com.example.moeng.Repository.PlaceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.PropertyEditorRegistrar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/moeng")
public class PlaceController {
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    MemberRepository memberRepository;
    @PostMapping("/place")
    public String placeRegister(PlaceDTO placeDTO) {
        Place place = placeDTO.toEntity();
        log.info("place" + place.toString());
        // 이미 동일한 이름이 있으면 redirect
        log.info(place.getName());
        log.info(placeRepository.findById(place.getName()).toString());

        Member owner = memberRepository.findById(place.getOwnerName()).orElse(null);
        log.info("owner" + owner.toString());
        owner.setRegisteredPlaceId(place.getName());
        memberRepository.save(owner);
        placeRepository.save(place);

        return "/place/createAfter";
    }

    @ResponseBody
    @GetMapping("/main")
    public ResponseEntity<List<Place>> getAllPlaces() {
        log.info("working");
        List<Place> places = (List<Place>) placeRepository.findAll();
        log.info(places.toString());
        return ResponseEntity.ok().body(places);
    }
}
