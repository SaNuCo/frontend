<template>
  <div>
    <div ref="contentRef">
      <slot />
    </div>
  </div>
</template>

<script>
  import { Marker, Point, Map } from "maplibre-gl"
  
  const propsConfig = {
    map: {
        type: Map,
        required: true
    },
    zIndex: {
        type: Number,
        default: 0
    },
    lngLat: {
      type: Array,
      required: true,
    },
    element: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      default: null,
    },
    offset: {
      type: [Point, Array],
      default: null,
    },
    anchor: {
      type: String,
      default: 'center',
    },
    color: {
      type: String,
      default: null,
    },
    scale: {
      type: Number,
      default: 1,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    rotation: {
      type: Number,
      default: 0,
    },
    pitchAlignment: {
      type: String,
      default: 'auto',
    },
    rotationAlignment: {
      type: String,
      default: 'auto',
    },
  };
  
  const events = ['dragstart', 'drag', 'dragend'];
</script>

<script setup>
  import { computed, ref, onMounted, onUnmounted, useSlots, watch } from 'vue';
  import { useMap, useEventsBinding, usePropsBinding } from './composables';
  const props = defineProps(propsConfig);
  const emit = defineEmits();
  const slots = useSlots();
  const marker = ref();
  const contentRef = ref();
  
  const options = computed(() => {
    const { lngLat, ...options } = props;
    // Use current component's element if container is not set
    if (slots.default) {
      options.element = contentRef.value;
    }
    return options;
  });
  usePropsBinding(props, marker, propsConfig);
  useEventsBinding(emit, marker, events);
  onMounted(() => {
    marker.value = new Marker(options.value).setLngLat(props.lngLat).addTo(props.map);
  });
  onUnmounted(() => {
    if (marker.value) {
      marker.value.remove();
    }
  });
  watch(() => props.zIndex, (oldValue, newValue) => {
    contentRef.value.style.setProperty("z-index", newValue);
  });
</script>