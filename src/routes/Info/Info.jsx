import React, { useEffect, useState } from "react";
import styles from "./info.css";
import { getFinStat } from "../../lib/apis/infoApi";



// 숫자를 천 단위마다 쉼표를 넣은 형식으로 변환하는 함수
function formatNumber(number) {
  if (isNaN(number)) return "0"; // number가 NaN이면 "0" 반환
  // 소수점 이하 자리수를 버리고 정수부에 쉼표를 넣음
  return parseFloat(number).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 소수점 두 자리까지 포맷하고 '%'를 더하는 함수
function formatPercentage(number) {
  if (isNaN(number)) return "0%"; // number가 NaN이면 "0%" 반환
  return (parseFloat(number) * 100).toFixed(2) + "%";
}

// Info 컴포넌트
export default function Info() {
  const [financialInfo, setFinancialInfo] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getFinStat();
        setFinancialInfo(data);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    fetchInfo();
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.layout}>
      <br />
      <div className="fin" style={{ overflow: "auto" }}>
        <h3 style={{ margin: "0rem 1.5rem" }}> 재무 </h3>
        <p style={{ fontSize: "0.7rem", float: "right", margin: "0 1rem" }}> 2023년 기준[연간]</p>
      </div>
      <p style={{ fontSize: "0.7rem", float: "right", margin: "0.2rem 1rem", color: "#A0A0A0" }}> 단위: 억원</p>
      <br />

      <div className="box">
        <div className="take" style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem", marginRight: "2rem" }}>
          <p>매출액</p>
          <p>{formatNumber(financialInfo?.sale_account)}</p>
        </div>
        <div className="take" style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem", marginRight: "2rem" }}>
          <p>영업이익</p>
          <p>{formatNumber(financialInfo?.bsop_prti)}</p>
        </div>
        <div className="take" style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem", marginRight: "2rem" }}>
          <p>순이익</p>
          <p>{formatNumber(financialInfo?.thtr_ntin)}</p>
        </div>
      </div>
      <br />

      <div className="others">
        <div className="firstbox">
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("영업이익률이란❓\n\n기업이 영업활동으로 인한 이익을 말하며, 영업이익을 매출액으로 나눈 비율을 의미합니다. 일반적으로 영업이익률이 높을수록 기업의 경영 성과가 좋다고 평가됩니다.")}>영업이익률</p>
            <p style={{ fontWeight: "bold", whiteSpace: 'pre-wrap' }}>
              {formatPercentage((financialInfo?.bsop_prti) / (financialInfo?.sale_account) * 100)}
            </p>
          </div>

          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("ROE란❓\n\nReturn on Equity의 약자로서 순이익을 자본으로 나눈 값인 자본수익률을 의미합니다. 기업이 주주에게 제공하는 이익의 수준을 나타내는 중요한 재무 지표 중 하나입니다.\n\n높은 ROE는 기업이 효율적으로 자본을 운용하고 이익을 창출하고 있다는 것을 나타내며, 주주에게 높은 수준의 이익을 제공할 가능성이 높다는 것을 시사합니다. 하지만 ROE가 높다고 해서 항상 좋은 것은 아니며, 다른 재무 지표와 함께 고려되어야 합니다.")}>ROE</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.roe_val)}%</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("EPS란❓\n\n주당 순이익(Earnings Per Share)의 약자로서, 기업의 주당 이익을 나타내는 재무 지표입니다. 주당 순이익은 기업이 발행한 주식 수를 기준으로 한 주당 이익을 의미합니다.\n\nEPS는 주가에도 영향을 미치므로 투자자들은 기업의 EPS 변화를 주의 깊게 살펴보고 이를 분석하여 투자 결정을 내립니다.")}>EPS</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.eps)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("BPS란❓\n\n주당 순자산 가치(Book Value Per Share)의 약어입니다. 주당 순자산 가치는 기업의 순자산을 발행된 주식 수로 나눈 값으로, 각 주식이 기업의 순자산에서 차지하는 가치를 나타냅니다.\n\n주가와 비교하여 BPS가 높으면 주식이 저평가되었거나 가치투자 기회가 있을 수 있습니다.")}>BPS</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.bps)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("유보율이란❓\n\n기업이 미래에 대비하기 위해 이익 중 일부를 유보하여 재무 안정성을 확보하는 데 사용하는 지표입니다.  이는 기업이 이익을 모두 배당하지 않고 일부를 유보하여 운영자금으로 활용하는 정책을 의미합니다.\n\n유보율이 높을수록 기업은 미래에 대비하여 자금을 보유하고 있으며, 재무적 안정성이 높다고 해석될 수 있습니다. 이는 기업이 미래의 불확실한 경영 상황에 대비하여 필요한 자금을 확보할 수 있다는 것을 시사합니다. 그러나 유보율이 너무 높으면 이익을 주주들에게 환원하는 데 소극적이거나 투자 기회를 놓치고 있는 것으로 해석될 수 있습니다. 따라서 적절한 유보율은 기업의 특성과 산업 규모 등을 고려하여 결정되어야 합니다.")}>유보율</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.rsrv_rate)}%</p>
          </div>

        </div>

        <div className="secondbox">
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("순이익률이란❓\n\n기업의 순이익이 매출에 대한 비율을 나타내는 재무 지표입니다. 순이익률은 기업이 매출을 실제 이익으로 얼마나 잘 전환하는지를 나타냅니다. 일반적으로 순이익률이 높을수록 기업의 수익성이 높다고 판단됩니다.")}>순이익률</p>
            <p style={{ fontWeight: "bold" }}>{formatPercentage((financialInfo?.thtr_ntin) / (financialInfo?.sale_account) * 100)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("EV/EBITDA란❓\n\n기업의 전체 가치를 기업의 운영 수익에 대한 비율로 나타냅니다. EV/EBITDA가 낮을수록 기업이 상대적으로 저렴하게 거래되고 있는 것으로 해석될 수 있으며, 높은 EV/EBITDA는 상대적으로 고평가되어 있다는 것을 시사할 수 있습니다.")}>EV/EBITDA</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.ev_ebitda)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("PER이란❓\n\n주가 수익비율(Price-to-Earnings Ratio)의 약어로, 기업의 주식 가격을 주당 순이익에 대한 비율로 표현한 지표입니다. PER은 투자자들이 기업의 주식을 구매할 때 주당 이익 대비 주식의 가격을 측정하는 데 사용됩니다.\n\n높은 PER은 투자자들이 해당 기업의 주식에 대해 높은 가격을 지불하고 있다는 것을 나타냅니다. 일반적으로 높은 PER은 향후 주가가 상승할 것으로 예상되거나 기업의 성장 가능성이 높다는 것을 시사할 수 있습니다. 하지만 PER이 너무 높으면 고평가된 기업으로 판단될 수 있으며, 이에 대한 주의가 필요합니다.")}>PER</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.per)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("PBR이란❓\n\n주가순자산비율(Price-to-Book Ratio)의 약어로, 기업의 주식 가격을 주당 순자산 가치에 대한 비율로 표현한 지표입니다. PBR은 주식 시장에서 기업의 가치를 평가하는 데 사용됩니다.\n\nPBR은 주식 시장에서 기업의 가치가 회계상의 자산 가치에 비해 얼마나 높은지를 나타냅니다. 일반적으로 PBR이 1보다 낮으면 기업의 주가가 순자산 가치에 비해 저평가되었다고 판단되며, 주가가 순자산 가치에 비해 높으면 고평가된 것으로 간주될 수 있습니다.")}>PBR</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.pbr)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => openModal("부채비율이란❓\n\n기업의 부채 수준을 나타내는 지표 중 하나입니다. 기업의 부채비율은 총 부채를 총 자본으로 나눈 비율로, 기업이 부채로 얼마나 자금을 조달했는지를 보여줍니다.")}>부채비율</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.lblt_rate)}%</p>
          </div>
        </div>
      </div>
      <br />

      <div id="myModal" className="modal">
        <div className="modal-content" style={{ whiteSpace: 'pre-wrap' }}>
          <span className="close" onClick={closeModal}>&times;</span>
          <p>{modalContent}</p>
        </div>
      </div>


    </div >
  );
}

