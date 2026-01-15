import { FaAngleRight, FaCheckCircle, FaEye, FaGithub } from "react-icons/fa";
import { FaCircleUser, FaEyeSlash } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { BiSolidDonateHeart } from "react-icons/bi";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdImage } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

export const Icons ={
  home: GoHomeFill,
  github: FaGithub,
  profile: FaCircleUser,
  donate: BiSolidDonateHeart,
  menu: IoMenu,
  search: IoSearch,
  feed: MdImage,
  rightArrow: FaAngleRight,
  check: FaCheckCircle,
  eye: FaEye,
  eyeSlash: FaEyeSlash,
  warn: RiErrorWarningFill,
}

export const DonateIcons = {
  all: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/all.png",
    alt: "전체",
  },
  kid: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/kid.png",
    alt: "청소년",
  },
  old: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/old.png",
    alt: "노인"
  },
  animal: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/animal.png",
    alt: "동물"
  },
  earth: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/earth.png",
    alt: "지구"
  },
  area: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/area.png",
    alt: "환경"
  },
  needy: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/needy.png",
    alt: "장애인"
  },
  social: {
    src: "https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/icon/social.png",
    alt: "사회"
  },
}
