// script.js
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.hover-image, .gallery-image'); // 모든 hover-image와 gallery-image 클래스를 선택

    images.forEach(image => {
        image.addEventListener('mouseover', function() {
            images.forEach(img => img.style.zIndex = 1); // 모든 이미지의 z-index를 1로 초기화
            this.style.zIndex = 9; // 현재 호버된 이미지의 z-index를 9로 설정
        });
        image.addEventListener('dragstart', function(event) {
            event.preventDefault(); // 드래그 앤 드롭 방지
        });
    });

    // 마우스 휠로 이미지 좌우 이동 (Commercial 페이지)
    const gallery = document.querySelector('.gallery-inner'); // gallery-inner 클래스를 선택
    const isCommercialPage = document.body.classList.contains('commercial-page'); // 현재 페이지가 Commercial 페이지인지 확인

    if (isCommercialPage) {
        let scrollPosition = 0; // 초기 스크롤 위치
        const images = document.querySelectorAll('.gallery-image'); // 모든 갤러리 이미지 선택
        const imageWidth = images[0].clientWidth; // 첫 번째 이미지의 너비
        const galleryWidth = images.length * (imageWidth + 20); // 갤러리 너비 계산 (20은 이미지 간격)

        // 이미지 복제를 두 번만 수행하여 이미지들이 두 번씩 반복되지 않도록 설정
        const clonedImages = [];
        images.forEach(image => {
            const clone = image.cloneNode(true);
            clonedImages.push(clone);
        });
        clonedImages.forEach(clone => {
            gallery.appendChild(clone);
        });

        // 무한 스크롤을 위한 마우스 휠 이벤트 처리
        document.addEventListener('wheel', function(event) {
            if (event.deltaY !== 0) {
                event.preventDefault(); // 기본 스크롤 동작 방지
                scrollPosition += event.deltaY; // 스크롤 위치 업데이트

                // 스크롤 위치가 전체 갤러리 너비를 넘어가면 스크롤 위치를 초기화
                if (scrollPosition >= galleryWidth) {
                    scrollPosition = 0;
                }

                gallery.style.transform = `translateX(-${scrollPosition}px)`; // 갤러리 위치 이동
            }
        });
    }
});
