import { Seconds } from "../type/Units";
import { Emitter } from "../util/Emitter";
import { AnyAudioContext } from "./AudioContext";

type Draw = import("../util/Draw").Draw;
type Destination = import("./Destination").Destination;
type Transport = import("../clock/Transport").Transport;
type BaseAudioContextSubset = import("./Context").BaseAudioContextSubset;

export type ContextLatencyHint = AudioContextLatencyCategory | "fastest";

export abstract class BaseContext extends Emitter<"statechange" | "tick"> implements BaseAudioContextSubset {

	//---------------------------
	// BASE AUDIO CONTEXT METHODS
	//---------------------------
	abstract createAnalyser(): AnalyserNode

	abstract createOscillator(): OscillatorNode

	abstract createBufferSource(): AudioBufferSourceNode

	abstract createBiquadFilter(): BiquadFilterNode

	abstract createBuffer(_numberOfChannels: number, _length: number, _sampleRate: number): AudioBuffer

	abstract createChannelMerger(_numberOfInputs?: number | undefined): ChannelMergerNode

	abstract createChannelSplitter(_numberOfOutputs?: number | undefined): ChannelSplitterNode

	abstract createConstantSource(): ConstantSourceNode

	abstract createConvolver(): ConvolverNode

	abstract createDelay(_maxDelayTime?: number | undefined): DelayNode

	abstract createDynamicsCompressor(): DynamicsCompressorNode

	abstract createGain(): GainNode

	abstract createIIRFilter(_feedForward: number[] | Float32Array, _feedback: number[] | Float32Array): IIRFilterNode

	abstract createPanner(): PannerNode

	abstract createPeriodicWave(
		_real: number[] | Float32Array,
		_imag: number[] | Float32Array,
		_constraints?: PeriodicWaveConstraints | undefined,
	): PeriodicWave

	abstract createStereoPanner(): StereoPannerNode

	abstract createWaveShaper(): WaveShaperNode

	abstract createMediaStreamSource(_stream: MediaStream): MediaStreamAudioSourceNode

	abstract decodeAudioData(_audioData: ArrayBuffer): Promise<AudioBuffer>

	//---------------------------
	// TONE AUDIO CONTEXT METHODS
	//---------------------------

	abstract createAudioWorkletNode(
		_name: string, 
		_options?: Partial<AudioWorkletNodeOptions>
	): AudioWorkletNode

	abstract get rawContext(): AnyAudioContext

	abstract async addAudioWorkletModule(_url: string, _name: string): Promise<void>

	abstract lookAhead: number;

	abstract latencyHint: ContextLatencyHint | Seconds;

	abstract resume(): Promise<void>

	abstract setTimeout(_fn: (...args: any[]) => void, _timeout: Seconds): number

	abstract clearTimeout(_id: number): this

	abstract setInterval(_fn: (...args: any[]) => void, _interval: Seconds): number

	abstract clearInterval(_id: number): this

	abstract getConstant(_val: number): AudioBufferSourceNode

	abstract get currentTime(): Seconds

	abstract get state(): AudioContextState

	abstract get sampleRate(): number

	abstract get listener(): AudioListener

	abstract get transport(): Transport

	abstract get draw(): Draw

	abstract get destination(): Destination

	abstract now(): Seconds

	abstract immediate(): Seconds

	readonly isOffline: boolean = false;
}