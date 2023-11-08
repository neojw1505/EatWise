<template>
  <div class="cooking-container ">
    <div class="pan-area" style="width: 100px; height: 100px">
      <div class="sides">
        <div class="pan"></div>
        <div class="handle"></div>
      </div>
      <div class="pancake-area">
        <div class="pastry"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookingAnimation",
};
</script>

<style scoped lang="scss">
$anim_time: 2.1; // main pan/pancake animation (in seconds)
$flatten_deg: 85; // how round will the pancake be at the top/peak (in deg), affecting general animation though so not really adjustable
$angle: 27; // max pan's angle while flipping (in deg)
$peak: 40%; // pancake's highest level, obviously ;)
$color_back: #e6ecf7; // background
$color: #333; // the rest

.cooking-text {
  position: relative;
  margin: 0 auto;
  top: 25px;
  width: 100px;
  text-align: center;
  font-family: "Amatic SC";
  font-size: 10px;
  color: $color;
  opacity: 0.75;
  animation: pulse 2.5s linear infinite;
}

.cooking-container {
  background-color: $color_back;
  height: 200px;
  width: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bubble {
  position: absolute;
  border-radius: 100%;
  box-shadow: 0 0 0.25px lighten($color, 10%);
  opacity: 0;
}

.bubble:nth-child(1) {
  margin-top: 2.5px;
  left: 58%;
  width: 2.5px;
  height: 2.5px;
  background-color: lighten($color, 7%);
  animation: bubble 2s cubic-bezier(0.53, 0.16, 0.39, 0.96) infinite;
}

.bubble:nth-child(2) {
  margin-top: 3px;
  left: 52%;
  width: 2px;
  height: 2px;
  background-color: lighten($color, 4%);
  animation: bubble 2s ease-in-out 0.35s infinite;
}

.bubble:nth-child(3) {
  margin-top: 1.8px;
  left: 50%;
  width: 1.5px;
  height: 1.5px;
  background-color: $color;
  animation: bubble 1.5s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.55s infinite;
}

.bubble:nth-child(4) {
  margin-top: 2.7px;
  left: 56%;
  width: 1.2px;
  height: 1.2px;
  background-color: darken($color, 3%);
  animation: bubble 1.8s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.9s infinite;
}

.bubble:nth-child(5) {
  margin-top: 2.7px;
  left: 63%;
  width: 1.1px;
  height: 1.1px;
  background-color: darken($color, 6%);
  animation: bubble 1.6s ease-in-out 1s infinite;
}

.pan-area {
  position: relative;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 50%;
  background-color: transparent;
  transform-origin: 15% 60%;
  animation: flip #{$anim_time}s ease-in-out infinite;

  .sides {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 15% 60%;
    animation: switchSide #{$anim_time}s ease-in-out infinite;

    .handle {
      position: absolute;
      bottom: 18%;
      right: 80%;
      width: 35%;
      height: 20%;
      background-color: transparent;
      border-top: 1px solid $color;
      border-left: 1px solid transparent;
      border-radius: 100%;
      transform: rotate(20deg) rotateX(0deg) scale(1.3, 0.9);
    }

    .pan {
      position: absolute;
      bottom: 20%;
      right: 30%;
      width: 50%;
      height: 8%;
      background-color: $color;
      border-radius: 0 0 1.4em 1.4em;
      transform-origin: -15% 0;
    }
  }

  .pancake-area {
    position: absolute;
    top: 24%;
    width: 100%;
    height: 100%;
    transform: rotateX(85deg);
    animation: jump #{$anim_time}s ease-in-out infinite;

    .pastry {
      position: absolute;
      bottom: 26%;
      right: 37%;
      width: 40%;
      height: 45%;
      background-color: $color;
      box-shadow: 0 0 3px 0 $color;
      border-radius: 100%;
      transform-origin: -20% 0;
      animation: fly #{$anim_time}s ease-in-out infinite;
    }
  }
}

@keyframes jump {
  0% {
    top: 24%;
    transform: rotateX(#{$flatten_deg}deg);
  }
  25% {
    top: 10%;
    transform: rotateX(0deg);
  }
  50% {
    top: 30%;
    transform: rotateX(#{$flatten_deg}deg);
  }
  75% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(#{$flatten_deg}deg);
  }
}

@keyframes flip {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(-#{$angle}deg);
  }
  30%,
  50% {
    transform: rotate(0deg);
  }
  55% {
    transform: rotate(#{$angle}deg);
  }
  83.3% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes switchSide {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

@keyframes fly {
  0% {
    bottom: 26%;
    transform: rotate(0deg);
  }
  10% {
    bottom: $peak;
  }
  50% {
    bottom: 26%;
    transform: rotate(-190deg);
  }
  80% {
    bottom: $peak;
  }
  100% {
    bottom: 26%;
    transform: rotate(0deg);
  }
}

@keyframes bubble {
  0% {
    transform: scale(0.15, 0.15);
    top: 80%;
    opacity: 0;
  }
  50% {
    transform: scale(1.1, 1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.33, 0.33);
    top: 60%;
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1, 1);
    opacity: 0.25;
  }
  50% {
    transform: scale(1.2, 1);
    opacity: 1;
  }
  100% {
    transform: scale(1, 1);
    opacity: 0.25;
  }
}
</style>
