$(function(){
//var
	var ua = navigator.userAgent;
	var $w = $(window);
	const $header = $('#header');
	const $wrapper = $('#wrapper');
//function
	/*.hoverを追加する関数*/
	function addHover(element) {
		element.on('touchstart mouseenter', function(){
		  $(this).addClass( 'hover' );
		}).on('touchend mouseleave click', function(){
		  $(this).removeClass( 'hover' );
		});
	}
	/*
		hoverArr = [] の [] に.hoverをつけたい要素を$('.aaa')の形でいれてください
	*/
	var hoverArr = [ $('a') ]
	for ( var i=0; i < hoverArr.length; i++ ) {
		addHover(hoverArr[i]);
	}
//effects
	//固定ヘッダーがある場合のページ内アンカー
	//a[href^="#"]:not(".bbb")と書けば.bbbのクラスを持つものは除外されます。
	$(document).on('click', 'a[href^="#"]',function(){
        var $this = $(this);
        var target = $($this.attr('href')).offset().top;
    	if ( window.innerWidth <= 768 ) {
    		$('html,body').animate({ scrollTop:target - 60 },400);
    	} else {
			$('html,body').animate({ scrollTop:target -112 },400);
    	}
        return false;
    });
    //固定ヘッダーがある場合のページ内アンカー（ロード時）
    $(window).on('load',function(){
		if ( location.hash ) {
			var hashTarget = location.hash;
			var target = $(hashTarget).offset().top;
			if ( window.innerWidth <= 768 ) {
				$('html,body').animate({ scrollTop: target - 60 },100);
			} else {
				$('html,body').animate({ scrollTop: target },100);
			}
		}
		return false;
	});
	if ( $('.all_accordion_item').length ) {
		$('.all_accordion_item').each(function(i){
			var $this = $(this);
			var $accHead = $this.find('._head');
			var $accBody = $this.find('._body');
			$accHead.on('click',function(){
				if ($this.hasClass('open')) {
					$this.removeClass('open');
					$accBody.stop().slideUp();
				} else {
					$this.addClass('open');
					$accBody.stop().slideDown();
				}
				setTimeout(function(){
					ScrollTrigger.refresh();
				},400);
			});
		});
	}
	if ( $('.all_switching_sec').length ) {
		$('.all_switching_sec').each(function(i){
			var $this = $(this);
			var $swichBtn = $this.find('._switching_list a');
			var $swichItem = $this.find('._switching_item');
			$swichBtn.on('click',function(){
				var $thisBtn = $(this);
				var target = $thisBtn.attr('href');
				$swichBtn.removeClass('current');
				$thisBtn.addClass('current')
				$swichItem.removeClass('active')
				$(target).addClass('active')
				ScrollTrigger.refresh();
				if ($this.hasClass('top_feature_method')) {
					$('.top_feature_conpare_table thead th').removeClass('_focus');
					$('.top_feature_conpare_table thead th[data-focus="'+ target +'"]').addClass('_focus');
				}
				return false;
			});
		});
	}
	// モーダル
	if ( $('.all_modal_button').length ) {
		var $modalBtn = $('.all_modal_button');
		var $modalClose = $('.all_modal ._bg, .all_modal ._close');
		$modalBtn.on('click',function(){
			var $this = $(this);
			var $target = $($this.attr('href'));
			$target.addClass('active');
            $('html').css('overflow','hidden').on('touchmove.noScroll', function(e) {
	            e.preventDefault();
	        });
			$modalClose.on('click',function(){
				$target.removeClass('active');
	            $('html').css('overflow','').off('.noScroll');
			});
			return false;
		});

		// レイアウト
		$('.all_modal ._list li').matchHeight();
		$('.all_modal ._list_title').matchHeight();
	}
	// all_swipe_item
	// data-swipeに切り替える画面幅を入力
	if ( $('.all_swipe_item').length ) {
		var $swipe = $('.all_swipe_item');
		$swipe.each(function(){
			var $this = $(this);
			var swipePoint = $this.attr('data-swipe');
			$(window).on('load resize',function(){
				var wW = $w.innerWidth();
				if( wW <= swipePoint) {
					$this.addClass('swipe_active');
				} else {
					$this.removeClass('swipe_active');
				}
			});
			$w.on('load scroll',function(){
			if ($this.hasClass('swipe_active')) {
					if ( $w.scrollTop() > $this.offset().top - $w.height() + 100 ) {
						$this.addClass('on');
						setTimeout(function(){
							$this.addClass('none');
						},2600)
					} else {
							$this.removeClass('on none');
					}
				}
			});
		});
	}
	// header

	var scrollFlag = 0;
	$w.on('load scroll',function(){
		if ( $w.scrollTop() <= 30 ) {
			$header.addClass('scroll_0');
		} else {
			$header.removeClass('scroll_0');
		}

		if ( $w.scrollTop() > scrollFlag ) {
			$header.removeClass('scroll');
		} else {
			$header.addClass('scroll');
		}
		scrollFlag = $w.scrollTop();


		var mvH = $w.innerHeight()*0.5 - $header.innerHeight()*0.5;
		var winSc = $w.scrollTop();
		if (winSc > mvH) {
			$wrapper.addClass('mv_scroll');
		} else {
			$wrapper.removeClass('mv_scroll');
		}
	});
    $('.header_nav_btn').on('click',function(){
        if ( !($wrapper.hasClass('open')) ) {
            $wrapper.addClass('open')
        } else {
            $wrapper.removeClass('open')
        }
    });
    $('.header_list a').on('click',function(){
        $wrapper.removeClass('open')
    });

	if ( $('.top').length ) {
		$('.top_contact_sec ._column ._text').matchHeight();
		$w.on('load', function(){
			$('.top_mv').addClass('anime');
			setTimeout(function(){
				$('.top_mv_item').each(function(i){
					var $this = $(this);
					setTimeout(function(){
						$this.addClass('anime')
					},i*200);
				});
			},200);
			setTimeout(function(){
				$('.top_mv').addClass('anime2')
			},1400);
		});

		// SPでvh消す
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
			var wH = $w.innerHeight();
			var wH10 = $w.innerHeight()*0.1
			$('.top_mv').css('height',wH)
			$('.top_intro').css('margin-top',wH10)
		} else {
			$('.top_mv').css('height','')
			$('.top_intro').css('margin-top','')

		}

		// TopMV SPスライダー
		var TopMVSwiper;
	 	$(window).on('load resize',function(){
	 		var wW = window.innerWidth;
			if( wW <= 600){
				$('.top_mv_sp_slider').removeClass('no_swiper')
				if (TopMVSwiper) {
	                return;
	            } else {
	            	TopMVSwiper = new Swiper('.top_mv_sp_slider', {
				        speed: 800,
				        slidesPerView: 1,
				        spaceBetween: 60,
				        loop: true,
				        loopedSlides: $('.top_mv_sp_slider .swiper-slide').length,
				        navigation: {
				        	prevEl: '.top_mv_sp_slider ._prev',
				            nextEl: '.top_mv_sp_slider ._next',
				        },
				        pagination: {
							el: '.top_mv_sp_slider_pagination',
							type: 'bullets',
							clickable: true,
							renderBullet: function (index, className) {
								//中に数字を表示
								return '<span class="' + className + '">0' + (index + 1) + '</span>';
							}
						}
				    });
				    TopMVSwiper.on('slideChangeTransitionStart', function () {
						var currentNum = Number($('.facility_sp_slider .swiper-slide-active').index()) + 1;
						$('.facility_sp_slider_current_num').text('0' + currentNum);
					});
		        }
		        // クリックで自動スライド
				var slideTimer;
				slideTimer = setInterval(function() {
			        $('.top_mv_sp_slider ._next').trigger('click')
			    }, 5000);
				// スライドが切り替わったとき
				TopMVSwiper.on('slideChange', function () {
					window.clearInterval(slideTimer);
					slideTimer = setInterval(function() {
				        $('.top_mv_sp_slider ._next').trigger('click')
				    }, 5000);
				});
			} else {
				$('.top_mv_sp_slider').addClass('no_swiper')
			  if (TopMVSwiper) {
	                TopMVSwiper.destroy();
	                TopMVSwiper = undefined;
	            }
			}
	 	});
	 	// 背景の丸
		gsap.to('.top_mv .all_circle', {
			y:-100+'%',
		  scrollTrigger: {
		    trigger: '.top_mv',
		    start:'top top',
		    end: 'top -100%',
		    scrub: true,
		  },
		});
		gsap.to('.top_intro .all_circle', {
			y:-200+'%',
		  scrollTrigger: {
		    trigger: '.top_intro',
		    start:'top bottom',
		    end: 'bottom top',
		    scrub: true,
		  },
		});
		gsap.to('.top_feature .all_circle', {
			y:-500+'%',
		  scrollTrigger: {
		    trigger: '.top_feature',
		    start:'top bottom',
		    end: 'bottom top',
		    scrub: true,
		  },
		});
		$(window).on('load',function(){
			var wW = $w.innerWidth();
			var circleH;
			if (wW <= 768) {
				circleH = 4
			} else {
				circleH = 10;
			}
			gsap.to('.top_content_wrap .top_circle', {
				height: circleH + 'vh',
			  scrollTrigger: {
			    trigger: '.top_mv',
			    start:'top top',
			    end: '75% top',
			    scrub: true,
			    // markers:true,
			  },
			});
			gsap.to('.top_contact_sec .top_circle', {
				height: circleH + 'vh',
			  scrollTrigger: {
			    trigger: '.top_contact_sec',
			    start:'top bottom',
			    end: 'top 25% ',
			    scrub: true,
			    // markers:true,
			  },
			});
		});
		gsap.set('.top_content_wrap,.top_feature_content>._bg', {
			background: "#1c6a9a",
		});
		gsap.to('.top_content_wrap,.top_feature_content>._bg', {
			background: "#1C439A",
		  scrollTrigger: {
		    trigger: '.top_feature',
		    start:'top bottom',
		    end: 'bottom bottom',
		    scrub: true,
		    // markers:true,
		  },
		});
		// 特長スライドイン
		gsap.to('.top_feature_content >._bg', {
			x:100+'%',
			repert:-1,
			duration: 1.8,
			ease: "expo.out",
		  scrollTrigger: {
			toggleActions: 'play none none reverse',
		    trigger: '.top_feature',//アニメーションが始まるトリガーとなる要素。この要素が固定される
		    start: 'top 10%', //アニメーションが始まる位置
		    // markers: true,
		  },
		});
		// サイドナビ固定
		gsap.to('.top_feature', {
		  scrollTrigger: {
		    trigger: '.top_side_nav',//アニメーションが始まるトリガーとなる要素。この要素が固定される
		    start: 'top top', //アニメーションが始まる位置
		    endTrigger: ".top_feature",
		    end: 'bottom bottom',
		    pin: true, //トリガー要素を固定する
		  }
		});

		var wH = $w.innerHeight();
		var $navLink = $('.top_feature_side_nav_list > li > a');
		$w.on('load scroll', function(){
			var winSc = $w.scrollTop();
	    	$navLink.each(function(i){
	    		var $this = $(this);
	    		var $img = $('.top_side_nav ._img_item');
	    		var currentNum = i+1;
	    		var $imgTarget = $('.top_side_nav ._img_item:nth-of-type('+ currentNum +')');
	    		var $target = $($this.attr('href'));
	    		var target = $target.offset().top - wH * 0.5;
	    		if ( i == 0 ) {
	    			if ( winSc > 0 && winSc < target + $target.outerHeight() ) {
	    				$navLink.removeClass('current')
	    				$this.addClass('current on')
	    				$img.addClass('off');
	    				$imgTarget.removeClass('off');
	    				$img.removeClass('on');
	    				$imgTarget.addClass('on');
	    			} else if(winSc <= target) {
	    				$this.removeClass('on')
	    			}
	    		} else {
	    			if(winSc <= target) {
	    				$this.removeClass('on')
	    			} else if ( winSc > target && winSc < target + $target.outerHeight() ) {
	    				$navLink.removeClass('current')
	    				$this.addClass('current on')
	    				$img.addClass('off');
	    				$imgTarget.removeClass('off');
	    				$img.removeClass('on');
	    				$imgTarget.addClass('on');
	    			} else {
	    				$this.addClass('on')
	    			}
	    		}
	    	});
		});
		$('.top_feature_side_nav_list > li > a').each(function(i){
			var $this = $(this);
    		var target = $this.attr('href');
			var currentNum = i + 1;
			var thisBar = '.top_feature_side_nav_list > li:nth-of-type('+currentNum+') ._bar'
			gsap.to( thisBar , {
				height:41,
				scrollTrigger: {
					trigger: target,
					start:'-112 top',
					end: 'bottom top',
					scrub: true,
				},
			});
		});
		if ( $('.all_modal').length ) {
			$('.all_modal ._list a').on('click',function(){
				var $this = $(this);
				var target = $this.attr('href');
				var $target = $(target)
				$('.top_feature_method_content ._item').removeClass('active');
				$target.addClass('active')
				$('.top_feature_method_list li a').removeClass('current');
				$('.top_feature_method_list li a[href='+target+']').addClass('current');
				$('.top_feature_conpare_table thead th').removeClass('_focus');
				$('.top_feature_conpare_table thead th[data-focus="'+ target +'"]').addClass('_focus');

				$('.all_modal').removeClass('active');
	            $('html').css('overflow','').off('.noScroll');
		        var scTarget = $('#sec_02').offset().top;
				$('html,body').animate({ scrollTop:scTarget -40 },400);
				return false;
			});
		}
	}
});
