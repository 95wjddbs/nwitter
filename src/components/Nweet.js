import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  //느윗 텍스트 내용 수정을 위함
  const [editing, setEditing] = useState(false);
  const [nweNweet, setNewNweet] = useState(nweetObj.text);

  //느윗 텍스트 삭제를 위함
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
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
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type={"text"}
                  placeholder="Edit Your Nweet"
                  value={nweNweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input
                  type={"submit"}
                  value="Update Nweet"
                  className="formBtn"
                />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
