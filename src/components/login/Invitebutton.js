import React from "react";
import "./invitebutton.css";
import { getUserInfo } from "../../api/getUserInfo";

const InviteButton = () => {
  const handleInvite = async () => {
    const user = await getUserInfo();

    const inviteLink = `https://okku-web.vercel.app?recomend=${user.id}`;

    // Check if the browser supports the Web Share API (for mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "옷 구매는 오꾸",
          text: "옷 리뷰 분석 서비스",
          url: inviteLink,
        });
      } catch (error) {
        alert("Error sharing the link:", error);
      }
    } else {
      // Fallback for PC: copy the link to the clipboard
      try {
        await navigator.clipboard.writeText(inviteLink);
        alert("링크가 복사되었습니다.");
      } catch (error) {
        alert("Failed to copy the link:", error);
      }
    }
  };

  return (
    <button className="invite-button" onClick={handleInvite}>
      <img src="assets/invite.png" alt="Invite" />
      초대하고 무한으로 사용하기!
    </button>
  );
};

export default InviteButton;
