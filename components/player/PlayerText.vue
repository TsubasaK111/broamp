<template>
    <div class="debug-box">
      <h2>peers:</h2>
      <div>{{ $store.state.peers }}</div>
      <h2>audio url:</h2>
      <div>{{ $store.state.audioSrc || 'n/a' }}</div>
      <h2>status:</h2>
      <div class="progress-output">{{ $store.state.log }}</div>
    </div>
</template>
