interface IAvatar {
  imgSrc: string | undefined;
}

export default function Avatar({ imgSrc }: IAvatar) {
  return (
    <div>
      <img src={imgSrc} className={`w-8 h-8 rounded-full shadow`}></img>
    </div>
  );
}
