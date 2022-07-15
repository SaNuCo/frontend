<template>
    <div>
        <div ref="contentRef">
            <div class="component" @click.prevent="$emit('markerClicked')">
                <svg :viewBox="calculateViewBox()" xmlns="http://www.w3.org/2000/svg" ref="marker">
                    <defs>
                        <mask :id="`my-mask-${identifier}`" class="content-mask" maskUnits="userSpaceOnUse"
                            :x="viewBoxX" :y="viewBoxY" :width="viewBoxWidth" :height="viewBoxHeight">
                            <path :d="initialPath" style="fill:#ffffff;">
                                <animate id="toBig" attributeType="XML" attributeName="d" :from="calculatePath(0, 0)"
                                    :to="calculatePath(contentWidth, contentHeight)" :dur="animationDuration"
                                    begin="indefinite" fill="freeze" />
                                <animate id="toBig" attributeType="XML" attributeName="d" :to="calculatePath(0, 0)"
                                    :from="calculatePath(contentWidth, contentHeight)" :dur="animationDuration"
                                    begin="indefinite" fill="freeze" />
                            </path>
                        </mask>
                    </defs>
                    <g class="svg-content">
                        <path :d="initialPath" class="marker-path"
                            :style="`fill:${markerFill};stroke:${markerStroke};`">
                            <animate id="toBig" attributeType="XML" attributeName="d" :from="calculatePath(0, 0)"
                                :to="calculatePath(contentWidth, contentHeight)" :dur="animationDuration"
                                begin="indefinite" fill="freeze" />
                            <animate id="toBig" attributeType="XML" attributeName="d" :to="calculatePath(0, 0)"
                                :from="calculatePath(contentWidth, contentHeight)" :dur="animationDuration"
                                begin="indefinite" fill="freeze" />
                        </path>
                        <foreignObject :x="-contentWidth / 2" :y="-50 - contentHeight" :width="contentWidth"
                            :height="contentHeight" :mask="`url(#my-mask-${identifier})`" :class="{
                                'content-visible': isContentVisible,
                                'content-invisible': !isContentVisible
                            }" :style="`transition-duration:${animationDuration}`">
                            <slot name="content" />
                        </foreignObject>
                        <foreignObject x="-16" y="-57" width="32" height="32" :class="{
                            'icon-visible': !isContentVisible,
                            'icon-invisible': isContentVisible
                        }" :style="`transition-duration:${animationDuration}`">
                            <slot name="icon" />
                        </foreignObject>
                        <foreignObject :x="-contentWidth / 2" :y="-80" :width="contentWidth" height="20" class="label-foreign-element" :class="{
                            'icon-visible': !isContentVisible,
                            'icon-invisible': isContentVisible
                        }" :style="`transition-duration:${animationDuration}`">
                            <div class="text-center text-subtitle-1">
                                Test df gs dg asd f adsf gsf gh fsdg sdf g dsf g sdf gfs dg fs gs fdg sdf g dfsg dfs g dfsg dfsg sdf g dfsg dsf gd s gdfs 
                            </div>
                        </foreignObject>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Marker, MarkerOptions, Map } from "maplibre-gl"

@Options({})
export default class MarkerComponent extends Vue {
    declare $refs: {
        marker: SVGElement,
        contentRef: any
    }

    @Prop()
    contentWidth!: number

    @Prop()
    contentHeight!: number

    @Prop({ default: false })
    isContentVisible!: boolean

    @Prop({ default: "0.3s" })
    animationDuration!: string

    @Prop({ default: "#ff4646" })
    markerFill!: string

    @Prop({ default: "#d73534" })
    markerStroke!: string

    @Prop({ default: "" })
    identifier!: any

    @Prop()
    map!: Map

    @Prop({ default: 0 })
    zIndex!: number

    @Prop()
    lngLat!: [number, number]

    initialPath = ""

    marker!: Marker

    mounted() {
        if (this.isContentVisible) {
            this.initialPath = this.calculatePath(this.contentWidth, this.contentHeight);
        } else {
            this.initialPath = this.calculatePath(0, 0);
        }
        const options: MarkerOptions = {
            anchor: "bottom",
            element: this.$refs.contentRef
        }
        this.marker = new Marker(options).setLngLat(this.lngLat).addTo(this.map);
    }

    unmounted() {
        this.marker.remove();
    }

    @Watch("isContentVisible")
    isContentVisibleChanged() {
        let elementToAnimate
        let maskToAnimate
        if (this.isContentVisible) {
            elementToAnimate = this.$refs.marker.querySelector(".marker-path animate:first-child") as SVGAnimateElement
            maskToAnimate = this.$refs.marker.querySelector(".content-mask animate:first-child") as SVGAnimateElement
        } else {
            elementToAnimate = this.$refs.marker.querySelector(".marker-path animate:last-child") as SVGAnimateElement
            maskToAnimate = this.$refs.marker.querySelector(".content-mask animate:last-child") as SVGAnimateElement
        }
        elementToAnimate.beginElement()
        maskToAnimate.beginElement()
    }

    @Watch("zIndex")
    zIndexChanged() {
        this.$refs.contentRef.style.setProperty("z-index", this.zIndex);
    }

    calculatePath(dx: number, dy: number): string {
        if (dx == 0 && dy == 0) {
            return `m 0 0
                c 1 0 1 -1 2 -5
                c 1 -5 3 -10 5 -15
                c 6 -11 9 -13 9 -21
                c 0 0 0 0 0 0
                l 0 0
                c 0 -4 -1 -7 -4 -10
                c -3 -3 -7 -5 -12 -5
                l 0 0
                c -5 0 -9 2 -12 5
                c -3 3 -4 6 -4 10
                l 0 0
                c 0 0 0 0 0 0
                c 0 8 3 10 9 21
                c 2 5 4 10 5 15
                c 1 4 1 5 2 5
                z`.replaceAll(/\s+/g, " ")
        } else {
            dx = dx / 2
            return `m 0 0
                c 1 0 1 -1 2 -5
                c 1 -5 3 -10 5 -15
                c 6 -11 9 -13 ${dx - 12} -21
                c 15 0 15 -4 15 -15
                l 0 ${-dy + 12}
                c 0 -4 -1 -7 -4 -10
                c -3 -3 -7 -5 -12 -5
                l ${-2 * dx + 12} 0
                c -5 0 -9 2 -12 5
                c -3 3 -4 6 -4 10
                l 0 ${dy - 12}
                c 0 11 0 15 15 15
                c ${dx - 21} 8 ${-18 + dx} 10 ${dx - 12} 21
                c 2 5 4 10 5 15
                c 1 4 1 5 2 5
                z`.replaceAll(/\s+/g, " ")
        }
    }

    calculateViewBox() {
        return `${this.viewBoxX} ${this.viewBoxY} ${this.viewBoxWidth} ${this.viewBoxHeight}`
    }
    get viewBoxX(): number {
        return -this.contentWidth / 2 - 17
    }
    get viewBoxY(): number {
        return -this.contentHeight - 73
    }
    get viewBoxWidth(): number {
        return this.contentWidth + 34
    }
    get viewBoxHeight(): number {
        return this.contentHeight + 75
    }
}
</script>

<style scoped>
.component {
    width: 200px;
}

.marker-path {
    stroke-width: 2.5;
}

.icon-visible,
.content-visible {
    visibility: visible;
}

.icon-invisible,
.content-invisible {
    visibility: hidden;
}

.icon-visible {
    transition-property: opacity;
    opacity: 1;
}

.icon-invisible {
    transition-property: opacity, visibility;
    opacity: 0;
}

.content-visible {
    transition-property: visibility;
}

.svg-content {
    pointer-events: visiblePainted;
}
</style>>