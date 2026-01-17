type DaumPostcodeData = {
  roadAddress: string;
  jibunAddress: string;
};

type DaumPostcode = {
  Postcode: new (options: {
    oncomplete: (data: DaumPostcodeData) => void;
  }) => {
    open: () => void;
  };
};


export function openDaumPostcode(
  onComplete: (data: DaumPostcodeData) => void
) {
  const daum = (window as unknown as { daum?: DaumPostcode }).daum;

  if (!daum?.Postcode) {
    console.error("Daum Postcode script not loaded");
    return;
  }

  new daum.Postcode({
    oncomplete: onComplete,
  }).open();
}
