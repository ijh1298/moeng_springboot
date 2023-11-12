package com.example.moeng.Controller;

import com.example.moeng.DTO.MemberDTO;
import com.example.moeng.Entity.Member;
import com.example.moeng.Entity.Place;
import com.example.moeng.Repository.MemberRepository;
import com.example.moeng.Repository.PlaceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;

@Slf4j
@Controller
@RequestMapping("/moeng")
public class MemberController {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PlaceRepository placeRepository;

    @GetMapping("/signup")
    public String signupMember() {
        return "/member/signup";
    }

    @PostMapping("/createMember")
    public String createMember(MemberDTO memberDTO) {
        Member member = memberDTO.toEntity();
        log.info(member.toString());
        memberRepository.save(member);

        return "redirect:/moeng/signin";
    }

    @GetMapping("/signin")
    public String signin() {
        return "/member/signin";
    }

    @PostMapping("main")
    public String signinRouter(MemberDTO memberDTO, Model model) {
        Member tryLogIn = memberDTO.toEntity();
        Member original = memberRepository.findById(tryLogIn.getId()).orElse(null);
        log.info(tryLogIn.getId());
        // DB에 없는 ID인 경우
        if (original == null) {
            log.info(tryLogIn.getId() + "does not exist.");
            return "redirect:/moeng/signin";
        }

        model.addAttribute("id", original.getId());
        // 로그인 성공 시
        if (tryLogIn.getPassword().equals(original.getPassword())) {
            // 장소 제공자인 경우
            if (original.getPurpose() == 1) {
                if (original.getRegisteredPlaceId() == null) {
                    // 등록된 장소가 없는 경우
                    return "/place/createBefore";
                } else {
                    // 등록된 장소가 있는 경우
                    return "/place/createAfter";
                }
                // 이용자인 경우
            } else if (original.getPurpose() == 0) {
                if (original.getRegisteredPlaceId() == null) {
                    log.info(((Collection<Place>) placeRepository.findAll()).toString());
                    model.addAllAttributes((Collection<Place>) placeRepository.findAll());
                    // 등록된 장소가 없는 사용자인 경우
                    return "/member/select1";
                } else {
                    // 등록된 장소가 있는 사용자인 경우
                    return "/member/topic";
                }
            }
        }
        return "redirect:/moeng/signin";
    }

    @GetMapping("/test")
    public String test() {
        return "/member/select2";
    }

}
