/**
 * 넷퍼넬 APM 클라이언트 플러그인 이벤트 제어 관련 스크립트
 */
// 담당자에게 https 사용문의함.
jQuery(document).ready(function(){
	jQuery('a').on('click', function(event){
		var nfl_host = window.location.hostname;
		if(nfl_host.indexOf('www.jne.go.kr') > -1){	//특정 도메인 에서만 동작
			//a 태그 이벤트 중지 하고 넷퍼넬 함수 호출
			var nfl_href_val = jQuery(this).attr('href');
			if(nfl_href_val.indexOf('/main/main.do') > -1){	//메인페이지
				event.preventDefault();		//핸들링 중지
				NetFunnel_Action({}, nfl_href_val);
			}else if(nfl_href_val.indexOf('/main/intro.do') > -1){	//인트로페이지(분할홈)
				event.preventDefault();		//핸들링 중지
				NetFunnel_Action({action_id:'act_2'}, nfl_href_val);
			}else if(nfl_href_val.indexOf('/main/ad/ex/exam/view/selectExamTgqList.do') > -1){	//합격자조회 (검정고시성적조회)
				event.preventDefault();		//핸들링 중지
				NetFunnel_Action({action_id:'act_3'}, nfl_href_val);
			}else if(nfl_href_val.indexOf('/main/na/ntt/selectNttList.do') > -1 
				&& nfl_href_val.indexOf('mi=273') > -1 && nfl_href_val.indexOf('bbsId=123') > -1){	//인사발령
				event.preventDefault();		//핸들링 중지
				NetFunnel_Action({action_id:'act_4'}, nfl_href_val);
			}else if(nfl_href_val.indexOf('/main/na/ntt/selectNttList.do') > -1 
					&& nfl_href_val.indexOf('mi=265') > -1 && nfl_href_val.indexOf('bbsId=117') > -1){	//임용고시(채용정보)
				if(nfl_href_val.indexOf('searchCate1=2') > -1){	//합격자발표
					event.preventDefault();		//핸들링 중지
					NetFunnel_Action({action_id:'act_6'}, nfl_href_val);
				}else{	//안내
					event.preventDefault();		//핸들링 중지
					NetFunnel_Action({action_id:'act_5'}, nfl_href_val);
				}
			}
		}
	});
});