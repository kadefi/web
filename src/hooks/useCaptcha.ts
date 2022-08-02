import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const useCaptcha = (action: string, ip: string) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(true);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha(action);

    const result = await axios.get("/api/captcha", {
      params: {
        ip,
        token,
      },
    });

    setIsCaptchaVerified(result.data.success);
  }, [action, executeRecaptcha, ip]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return { isCaptchaVerified, handleReCaptchaVerify };
};

export default useCaptcha;
