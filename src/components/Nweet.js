import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  //느윗 텍스트 내용 수정을 위함
  const [editing, setEditing] = useState(false);
  const [nweNweet, setNewNweet] = useState(nweetObj.text);

  //느윗 텍스트 삭제를 위함
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    } else {
      //no delete
    }
  };

  //느윗 텍스트 수정 토글 버튼
  const toggleEditing = () => setEditing((prev) => !prev);

  // 제출 버튼 클릭시
  const onSubmit = async (event) => {
    event.preventDefault(); //새로고침 방지
    //업데이트
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: nweNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type={"text"}
                  placeholder="Edit Your Nweet"
                  value={nweNweet}
                  required
                  onChange={onChange}
                />
                <input type={"submit"} value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
