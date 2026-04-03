"use client";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  CancelCallButton,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function Call() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const setupCall = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const callId = urlParams.get("callid");
      const userid = urlParams.get("userid");
      const username = urlParams.get("username");

      if (!callId || !userid || !username) {
        console.error("Missing URL parameters for call");
        return;
      }

      const user = {
        id: userid,
        name: username,
        image: `https://getstream.io/random_svg/?id=oliver&name=${username}`,
      };

      const resp = await axios.get(`${process.env.NEXT_PUBLIC_URL}/token`, {
        params: { id: userid },
      });
      const token = resp.data.token;

      const videoClient = new StreamVideoClient({ apiKey, user, token });
      const callInstance = videoClient.call("default", callId);
      await callInstance.join({ create: true });

      setClient(videoClient);
      setCall(callInstance);
    };

    setupCall();
  return ()=>{
   call.leave();
  }
  
  }, []);

  if (!client || !call) {
    return <div>Setting up call...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="left" />
      <CallControls />
    </StreamTheme>
  );
};
