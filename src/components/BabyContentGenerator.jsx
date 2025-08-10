import React, { useState, useCallback } from 'react';
import { Shuffle, Copy, Play, Image, RotateCcw, CheckCircle, RefreshCw, Music } from 'lucide-react';

const BabyContentGenerator = () => {
  const [currentImageCombination, setCurrentImageCombination] = useState(null);
  const [currentVideoCombination, setCurrentVideoCombination] = useState(null);
  const [currentAudioCombination, setCurrentAudioCombination] = useState(null);
  const [currentYoutubeCombination, setCurrentYoutubeCombination] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isGeneratingYoutube, setIsGeneratingYoutube] = useState(false);
  const [copiedState, setCopiedState] = useState({ image: false, video: false, audio: false, youtube: false });
  const [animalMode, setAnimalMode] = useState('random'); // 'random' or 'specific'
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const animals = [
    "Kittens", "Puppies", "Bunnies", "Hamsters", "Guinea pigs",
    "Baby pandas", "Red pandas", "Koalas", "Fox kits", "Bear cubs",
    "Raccoon babies", "Dolphin calves", "Baby seals", "Otter pups",
    "Baby whales", "Sugar gliders", "Chinchillas", "Hedgehogs",
    "Sloths", "Meerkats", "Piglets", "Lambs", "Baby goats",
    "Chicks", "Ducklings"
  ];

  const imageVariations = {
    "ANIMALS": animals,
    "JUMLAH BAYI": [
      "Single baby", "Twins", "Triplets", "Quadruplets", "Quintuplets"
    ],
    "POSES/POSITIONING": [
      "Wrestling playfully but intensely", "Fighting for dominant position",
      "Competing for optimal space", "Aggressively exploring boundaries",
      "Pushing each other around", "Territorial positioning against siblings",
      "Forcefully claiming comfort spots", "Actively investigating surroundings",
      "Boldly reaching for new areas", "Assertively establishing dominance",
      "Energetically kicking and pushing", "Determinedly exploring limits"
    ],
    "LIGHTING VARIATIONS": [
      "Warm pink/rose", "Soft orange/amber", "Cool blue/teal",
      "Golden hour warm", "Dramatic rim lighting", "Soft diffused glow",
      "Ethereal white light", "Deep red/crimson", "Purple/violet tones",
      "Multi-color gradient"
    ],
    "CAMERA ANGLES": [
      "Extreme close-up (faces only)", "Close-up (upper body)",
      "Medium shot (full babies)", "Wide shot (babies + environment)",
      "Top-down view", "Side profile", "Slight angle/3-quarter view",
      "Looking up from below", "Circular/spherical perspective"
    ],
    "WOMB ENVIRONMENT TYPES": [
      "Organic flesh texture (red/pink)", "Translucent bubble/sphere",
      "Flowing fabric-like membrane", "Geometric structured chamber",
      "Medical anatomical accuracy", "Ethereal light environment",
      "Liquid-filled space", "Soft tissue folds", "Crystalline/glass-like",
      "Abstract artistic space"
    ],
    "TEXTURE DETAILS": [
      "Hyper-realistic medical", "Soft artistic rendering",
      "Painterly smooth", "High contrast detailed", "Dreamy soft-focus",
      "Sharp photographic", "Illustration style"
    ],
    "EMOTIONAL MOOD": [
      "Competitive/determined", "Mischievous/cunning", "Intense/focused",
      "Curious/investigative", "Playfully aggressive", "Boldly exploring",
      "Assertively territorial"
    ]
  };

  const videoVariations = {
    "DYNAMIC ACTIONS": [
      "Vigorous kicking and pushing movements",
      "Forceful limb stretching and positioning",
      "Aggressive exploring and investigating",
      "Competitive reaching and grabbing motions",
      "Bold territorial claiming movements",
      "Intense wrestling and play fighting",
      "Determined boundary testing actions"
    ],
    "RIVALRY DYNAMICS": [
      "Sibling competition for prime comfort spots",
      "Playful but aggressive space claiming",
      "Territory defending and positioning",
      "Dominance establishing interactions",
      "Competitive pushing and nudging",
      "Assertive positioning against siblings",
      "Strategic maneuvering for advantage"
    ],
    "ENVIRONMENTAL MOTION": [
      "Soft floating in amniotic fluid",
      "Gentle womb pulsing with maternal heartbeat",
      "Subtle lighting changes mimicking circulation",
      "Flowing organic textures and membranes",
      "Rhythmic fluid movements around babies",
      "Umbilical cord gentle swaying",
      "Soft tissue contractions and expansions"
    ],
    "INTENSE EXPRESSIONS": [
      "Mischievous cunning looks and scheming faces",
      "Determined focused expressions with intensity",
      "Alert competitive eyes scanning surroundings",
      "Bold curiosity with wide investigating eyes",
      "Assertive confident facial expressions",
      "Playfully aggressive expressions with attitude",
      "Cunning strategic thinking faces"
    ],
    "TRANSITION STYLE": [
      "smooth and seamless", "naturally flowing", "organically progressive",
      "gently evolving", "fluidly transitioning", "softly morphing",
      "elegantly shifting"
    ],
    "MOTION QUALITY": [
      "hyperrealistic and lifelike", "cinematically smooth",
      "naturally organic", "photorealistically fluid",
      "documentarily authentic", "medically accurate yet artistic",
      "National Geographic quality"
    ]
  };

  const audioVariations = {
    "MOOD/ENERGY": [
      "Playful competitive energy",
      "Dramatic rivalry tension", 
      "Mischievous adventure mood",
      "Energetic exploration vibe"
    ],
    "INSTRUMENTS": [
      "Orchestral strings with intensity",
      "Piano melodies with playful notes",
      "Cinematic brass for drama",
      "Music box for cute moments"
    ],
    "SOUND EFFECTS": [
      "Maternal heartbeat rhythm",
      "Womb ambience layers",
      "Fluid movement sounds",
      "Organic tissue resonance"
    ],
    "MUSIC STYLE": [
      "Cinematic documentary grade",
      "Children's adventure score",
      "Epic orchestral composition", 
      "Modern lullaby arrangement"
    ]
  };

  const youtubeVariations = {
    "TARGET AUDIENCE": [
      "Animal lovers and pet enthusiasts",
      "Educational content seekers", 
      "Family-friendly viewers",
      "Wildlife documentary fans",
      "Viral content consumers"
    ],
    "VIRAL TRIGGERS": [
      "Shocking and unbelievable facts",
      "Emotional heartwarming moments", 
      "Educational discovery angles",
      "Competitive drama elements",
      "Cute overload factors"
    ],
    "TITLE STYLES": [
      "Question-based clickbait hooks",
      "Numbered list formats", 
      "Emotional reaction triggers",
      "Educational fact reveals",
      "Before/during birth mysteries"
    ],
    "DESCRIPTION ELEMENTS": [
      "Educational background information",
      "Engagement question prompts",
      "Channel subscription CTAs", 
      "Related video suggestions",
      "Timestamp breakdown sections"
    ],
    "TAG CATEGORIES": [
      "Broad animal keywords",
      "Specific species hashtags",
      "Educational content tags", 
      "Family-friendly indicators",
      "Viral trending topics"
    ]
  };

  const animalSounds = {
    "Kittens": "soft kitten mewing and purring",
    "Puppies": "playful puppy yaps and gentle whimpers",
    "Bunnies": "soft bunny nose twitching and gentle squeaks",
    "Hamsters": "tiny hamster chirping and wheel spinning sounds",
    "Guinea pigs": "guinea pig squeaking and popcorning sounds",
    "Baby pandas": "gentle panda cub squeaks and bamboo munching",
    "Red pandas": "soft red panda chirping and climbing sounds", 
    "Koalas": "eucalyptus munching and soft koala grunts",
    "Fox kits": "playful fox kit yipping and den rustling",
    "Bear cubs": "gentle bear cub grunting and honey sounds",
    "Raccoon babies": "curious raccoon chittering and water splashing",
    "Dolphin calves": "dolphin clicks and underwater echoes",
    "Baby seals": "seal pup barking and wave sounds",
    "Otter pups": "otter chirping and water splashing",
    "Baby whales": "whale song harmonies and ocean depths",
    "Sugar gliders": "gliding sounds and tiny squeaks",
    "Chinchillas": "dust bath sounds and soft chirping",
    "Hedgehogs": "hedgehog snuffling and tiny footsteps",
    "Sloths": "slow movement sounds and leaf rustling",
    "Meerkats": "meerkat chattering and burrow sounds",
    "Piglets": "piglet oinking and farm ambience",
    "Lambs": "lamb bleating and meadow sounds",
    "Baby goats": "goat kid bleating and hopping sounds",
    "Chicks": "chick peeping and eggshell cracking",
    "Ducklings": "duckling peeping and water paddling"
  };

  const generateRandomCombination = useCallback((variations, isAudio = false, isYoutube = false) => {
    const combination = {};
    Object.keys(variations).forEach(category => {
      if (category === 'ANIMALS' && animalMode === 'specific' && selectedAnimal) {
        // Use selected animal instead of random
        combination[category] = selectedAnimal;
      } else {
        // Use random selection
        const options = variations[category];
        const randomIndex = Math.floor(Math.random() * options.length);
        combination[category] = options[randomIndex];
      }
    });
    
    // For audio generation, add animal sound based on current animal
    if (isAudio) {
      let animalType;
      if (currentImageCombination && currentImageCombination['ANIMALS']) {
        animalType = currentImageCombination['ANIMALS'];
      } else if (animalMode === 'specific' && selectedAnimal) {
        animalType = selectedAnimal;
      } else {
        // Random animal if no image combo exists
        const randomAnimalIndex = Math.floor(Math.random() * animals.length);
        animalType = animals[randomAnimalIndex];
      }
      combination['ANIMAL SOUNDS'] = animalSounds[animalType] || "gentle baby animal sounds";
    }

    // For YouTube generation, determine animal type for the prompt
    if (isYoutube) {
      let animalType;
      if (currentImageCombination && currentImageCombination['ANIMALS']) {
        animalType = currentImageCombination['ANIMALS'];
      } else if (animalMode === 'specific' && selectedAnimal) {
        animalType = selectedAnimal;
      } else {
        // Random animal if no image combo exists
        const randomAnimalIndex = Math.floor(Math.random() * animals.length);
        animalType = animals[randomAnimalIndex];
      }
      combination['ANIMAL_TYPE'] = animalType;
    }
    
    return combination;
  }, [animalMode, selectedAnimal, currentImageCombination, animals, animalSounds]);

  const generateImageCombination = useCallback(async () => {
    if (animalMode === 'specific' && !selectedAnimal) {
      alert('Pilih hewan dulu yaa! 🐾');
      return;
    }

    setIsGeneratingImage(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const combination = generateRandomCombination(imageVariations);
    setCurrentImageCombination(combination);
    
    setIsGeneratingImage(false);
  }, [generateRandomCombination, animalMode, selectedAnimal]);

  const generateVideoCombination = useCallback(async () => {
    setIsGeneratingVideo(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const combination = generateRandomCombination(videoVariations, false);
    setCurrentVideoCombination(combination);
    
    setIsGeneratingVideo(false);
  }, [generateRandomCombination]);

  const generateAudioCombination = useCallback(async () => {
    setIsGeneratingAudio(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const combination = generateRandomCombination(audioVariations, true);
    setCurrentAudioCombination(combination);
    
    setIsGeneratingAudio(false);
  }, [generateRandomCombination]);

  const generateYoutubeCombination = useCallback(async () => {
    setIsGeneratingYoutube(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const combination = generateRandomCombination(youtubeVariations, false, true);
    setCurrentYoutubeCombination(combination);
    
    setIsGeneratingYoutube(false);
  }, [generateRandomCombination]);

  const resetAll = useCallback(() => {
    setCurrentImageCombination(null);
    setCurrentVideoCombination(null);
    setCurrentAudioCombination(null);
    setCurrentYoutubeCombination(null);
    setCopiedState({ image: false, video: false, audio: false, youtube: false });
    setAnimalMode('random');
    setSelectedAnimal('');
  }, []);

  const copyToClipboard = useCallback(async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedState(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const formatImagePrompt = useCallback((combo) => {
    return `"Create a hyperrealistic cross-section view of ${combo["ANIMALS"]} ${combo["JUMLAH BAYI"]} babies developing inside the mother's womb. Show anatomically accurate uterine environment with visible blood vessels, arterial networks, uterine wall textures, and organic tissue structures surrounding the babies. The ${combo["JUMLAH BAYI"]} ${combo["ANIMALS"]} fetuses are ${combo["POSES/POSITIONING"]}, connected by umbilical cords, floating in amniotic fluid within the anatomically detailed reproductive cavity.

Style: medical illustration combined with artistic beauty
Lighting: ${combo["LIGHTING VARIATIONS"]}, highlighting anatomical structures
Camera: ${combo["CAMERA ANGLES"]} showing both babies and surrounding anatomy
Environment: detailed cross-section of maternal reproductive anatomy
Quality: 8K resolution, National Geographic documentary grade
Ratio Aspect: 9:16"`;
  }, []);

  const formatVideoPrompt = useCallback((combo) => {
    return `"Animate this image with ${combo["DYNAMIC ACTIONS"]}. Include ${combo["RIVALRY DYNAMICS"]} while maintaining ${combo["MOTION QUALITY"]} quality. Add ${combo["ENVIRONMENTAL MOTION"]} and ${combo["INTENSE EXPRESSIONS"]} for enhanced realism. Ensure ${combo["TRANSITION STYLE"]} motion throughout. Keep all movements natural yet intense and competitive while maintaining the energetic, engaging mood of baby animals in action."`;
  }, []);

  const formatAudioPrompt = useCallback((combo) => {
    return `"Create a musical score with ${combo["MOOD/ENERGY"]} and ${combo["INSTRUMENTS"]}. Include ${combo["SOUND EFFECTS"]} and ${combo["ANIMAL SOUNDS"]} while maintaining ${combo["MUSIC STYLE"]} quality. Perfect for baby animal content with competitive/mischievous energy."`;
  }, []);

  const formatYoutubePrompt = useCallback((combo) => {
    return `"Create YouTube SEO package (Title, Description, Tags) for ${combo["TARGET AUDIENCE"]} using ${combo["VIRAL TRIGGERS"]} with ${combo["TITLE STYLES"]}. Include ${combo["DESCRIPTION ELEMENTS"]} and ${combo["TAG CATEGORIES"]}. Focus on ${combo["ANIMAL_TYPE"]} baby animals competitive/mischievous womb content for maximum engagement and discoverability."`;
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-6 bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen relative overflow-hidden">
      {/* Cute Baby Animal Background Animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{minHeight: '100vh'}}>
        {/* Floating baby animals - distributed throughout the page */}
        <div className="absolute animate-bounce" style={{top: '100px', left: '10%', animationDelay: '0s', animationDuration: '3s', opacity: '0.25'}}>
          <span className="text-4xl">🐱</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '200px', right: '15%', animationDelay: '1s', animationDuration: '4s', opacity: '0.2'}}>
          <span className="text-3xl">🐶</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '300px', left: '25%', animationDelay: '2s', animationDuration: '5s', opacity: '0.15'}}>
          <span className="text-2xl">🐰</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '400px', right: '30%', animationDelay: '0.5s', animationDuration: '3.5s', opacity: '0.25'}}>
          <span className="text-4xl">🐼</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '150px', left: '50%', animationDelay: '1.5s', animationDuration: '4.5s', opacity: '0.2'}}>
          <span className="text-3xl">🦊</span>
        </div>
        
        {/* Middle section animals */}
        <div className="absolute animate-bounce" style={{top: '500px', left: '20%', animationDelay: '2.5s', animationDuration: '3.8s', opacity: '0.15'}}>
          <span className="text-2xl">🐹</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '600px', right: '10%', animationDelay: '0.8s', animationDuration: '4.2s', opacity: '0.2'}}>
          <span className="text-4xl">🐨</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '700px', left: '15%', animationDelay: '1.3s', animationDuration: '3.6s', opacity: '0.25'}}>
          <span className="text-3xl">🐣</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '800px', right: '25%', animationDelay: '2.1s', animationDuration: '4.1s', opacity: '0.15'}}>
          <span className="text-2xl">🦆</span>
        </div>
        
        {/* More middle section animals */}
        <div className="absolute animate-bounce" style={{top: '900px', left: '20%', animationDelay: '0.3s', animationDuration: '5.1s', opacity: '0.2'}}>
          <span className="text-4xl">🐺</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1000px', right: '15%', animationDelay: '1.7s', animationDuration: '3.9s', opacity: '0.25'}}>
          <span className="text-3xl">🐻</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1100px', left: '30%', animationDelay: '2.4s', animationDuration: '4.6s', opacity: '0.15'}}>
          <span className="text-2xl">🦔</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1200px', right: '30%', animationDelay: '0.9s', animationDuration: '3.4s', opacity: '0.2'}}>
          <span className="text-4xl">🐸</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1300px', left: '10%', animationDelay: '1.6s', animationDuration: '4.8s', opacity: '0.25'}}>
          <span className="text-3xl">🐧</span>
        </div>

        {/* Extended bottom section animals for Step 4 */}
        <div className="absolute animate-bounce" style={{top: '1400px', right: '20%', animationDelay: '2.8s', animationDuration: '3.2s', opacity: '0.2'}}>
          <span className="text-4xl">🦝</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1500px', left: '25%', animationDelay: '1.1s', animationDuration: '4.7s', opacity: '0.15'}}>
          <span className="text-2xl">🐿️</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1600px', right: '35%', animationDelay: '0.4s', animationDuration: '5.2s', opacity: '0.25'}}>
          <span className="text-3xl">🦦</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1700px', left: '15%', animationDelay: '2.2s', animationDuration: '3.7s', opacity: '0.2'}}>
          <span className="text-4xl">🐳</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1800px', right: '10%', animationDelay: '1.9s', animationDuration: '4.4s', opacity: '0.15'}}>
          <span className="text-2xl">🐬</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1900px', left: '40%', animationDelay: '0.7s', animationDuration: '3.9s', opacity: '0.25'}}>
          <span className="text-3xl">🐙</span>
        </div>
        
        {/* Floating hearts and sparkles - spread throughout and extended */}
        <div className="absolute animate-ping" style={{top: '250px', left: '33%', animationDelay: '1s', animationDuration: '2s', opacity: '0.25'}}>
          <span className="text-2xl">💕</span>
        </div>
        <div className="absolute animate-ping" style={{top: '350px', right: '10%', animationDelay: '2s', animationDuration: '2.5s', opacity: '0.2'}}>
          <span className="text-lg">✨</span>
        </div>
        <div className="absolute animate-ping" style={{top: '550px', left: '5%', animationDelay: '0s', animationDuration: '3s', opacity: '0.15'}}>
          <span className="text-2xl">💖</span>
        </div>
        <div className="absolute animate-ping" style={{top: '750px', right: '5%', animationDelay: '1.8s', animationDuration: '2.2s', opacity: '0.25'}}>
          <span className="text-lg">⭐</span>
        </div>
        <div className="absolute animate-ping" style={{top: '950px', left: '45%', animationDelay: '0.3s', animationDuration: '2.8s', opacity: '0.2'}}>
          <span className="text-2xl">🌟</span>
        </div>
        <div className="absolute animate-ping" style={{top: '1150px', right: '45%', animationDelay: '1.4s', animationDuration: '2.3s', opacity: '0.15'}}>
          <span className="text-lg">✨</span>
        </div>
        <div className="absolute animate-ping" style={{top: '1350px', left: '35%', animationDelay: '2.1s', animationDuration: '2.7s', opacity: '0.25'}}>
          <span className="text-2xl">💖</span>
        </div>
        <div className="absolute animate-ping" style={{top: '1550px', right: '25%', animationDelay: '0.8s', animationDuration: '3.1s', opacity: '0.2'}}>
          <span className="text-lg">⭐</span>
        </div>
        <div className="absolute animate-ping" style={{top: '1750px', left: '20%', animationDelay: '1.6s', animationDuration: '2.4s', opacity: '0.15'}}>
          <span className="text-2xl">🌟</span>
        </div>
        
        {/* Baby items floating around - throughout the page and extended */}
        <div className="absolute animate-bounce" style={{top: '320px', left: '20%', animationDelay: '1.2s', animationDuration: '5.5s', opacity: '0.15'}}>
          <span className="text-3xl">🍼</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '120px', right: '20%', animationDelay: '2.2s', animationDuration: '4.8s', opacity: '0.2'}}>
          <span className="text-2xl">🧸</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '650px', left: '40%', animationDelay: '0.7s', animationDuration: '3.3s', opacity: '0.25'}}>
          <span className="text-lg">👶</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '850px', right: '40%', animationDelay: '1.9s', animationDuration: '4.3s', opacity: '0.2'}}>
          <span className="text-3xl">🍼</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1050px', left: '50%', animationDelay: '0.6s', animationDuration: '5.3s', opacity: '0.15'}}>
          <span className="text-2xl">🧸</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1450px', right: '50%', animationDelay: '2.5s', animationDuration: '4.1s', opacity: '0.25'}}>
          <span className="text-3xl">🍼</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1650px', left: '55%', animationDelay: '1.3s', animationDuration: '3.8s', opacity: '0.2'}}>
          <span className="text-2xl">🧸</span>
        </div>
        <div className="absolute animate-bounce" style={{top: '1850px', right: '45%', animationDelay: '0.9s', animationDuration: '5.1s', opacity: '0.15'}}>
          <span className="text-lg">👶</span>
        </div>
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-10">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-3">
          🍼 Baby Content Maker 🍼
        </h1>
        <p className="text-gray-600 text-base md:text-lg font-medium">
          Bikin konten baby animals yang gemesin! 💕
        </p>
        
        {/* Reset Button */}
        {(currentImageCombination || currentVideoCombination || currentAudioCombination || currentYoutubeCombination) && (
          <div className="mt-4 md:mt-6">
            <button 
              onClick={resetAll}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 md:px-6 rounded-full text-sm md:text-base shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              🔄 Reset All
            </button>
          </div>
        )}
      </div>

      {/* Animal Selection Mode */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border-2 border-pink-200">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center">
          🐾 Pilih Mode Hewan
        </h3>
        
        {/* Mode Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <label className="flex items-center cursor-pointer bg-pink-50 p-3 rounded-xl border-2 border-pink-200 hover:bg-pink-100 transition-colors">
            <input
              type="radio"
              name="animalMode"
              value="random"
              checked={animalMode === 'random'}
              onChange={(e) => setAnimalMode(e.target.value)}
              className="mr-3 text-pink-500"
            />
            <div>
              <div className="font-semibold text-gray-800">🎲 Random Mode</div>
              <div className="text-sm text-gray-600">Semua hewan random</div>
            </div>
          </label>
          
          <label className="flex items-center cursor-pointer bg-blue-50 p-3 rounded-xl border-2 border-blue-200 hover:bg-blue-100 transition-colors">
            <input
              type="radio"
              name="animalMode"
              value="specific"
              checked={animalMode === 'specific'}
              onChange={(e) => setAnimalMode(e.target.value)}
              className="mr-3 text-blue-500"
            />
            <div>
              <div className="font-semibold text-gray-800">🐾 Pilih Hewan</div>
              <div className="text-sm text-gray-600">Tentukan hewan tertentu</div>
            </div>
          </label>
        </div>

        {/* Animal Dropdown */}
        {animalMode === 'specific' && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Hewan Favorit:
            </label>
            <select
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              className="w-full p-3 border-2 border-blue-200 rounded-xl bg-blue-50 focus:border-blue-400 focus:outline-none text-gray-800"
            >
              <option value="">-- Pilih Hewan --</option>
              {animals.map((animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="flex items-center justify-center my-6 md:my-8">
        <div className="flex-1 border-t-2 border-pink-200"></div>
        <div className="mx-3 md:mx-4 px-4 md:px-6 py-2 md:py-3 bg-pink-400 text-white font-bold rounded-full text-xs md:text-base text-center shadow-lg">
          ⬇️ STEP 1: GENERATE YOUR IMAGE ⬇️
        </div>
        <div className="flex-1 border-t-2 border-pink-200"></div>
      </div>

      {/* TEXT-TO-IMAGE SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8 border-2 border-pink-200">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-pink-600 mb-2 flex items-center justify-center gap-2">
            <Image className="w-5 h-5 md:w-8 md:h-8" />
            ✨ TEXT-TO-IMAGE GENERATOR
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Generate gambar baby animals yang unyu! 🐾</p>
        </div>

        <div className="text-center mb-4 md:mb-6">
          <button 
            onClick={generateImageCombination}
            disabled={isGeneratingImage}
            className="bg-pink-400 hover:bg-pink-500 disabled:bg-pink-300 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            {isGeneratingImage ? (
              <>
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                Generating Magic... ✨
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5 md:w-6 md:h-6" />
                🎲 GENERATE IMAGE PROMPT
              </>
            )}
          </button>
        </div>

        {currentImageCombination && (
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                🎲 Current Combination
              </h3>
              <button 
                onClick={() => copyToClipboard(formatImagePrompt(currentImageCombination), 'image')}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm md:text-base shadow-lg transform hover:scale-105"
              >
                {copiedState.image ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    ✅ Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    📋 Copy Prompt
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              {Object.entries(currentImageCombination).map(([category, value]) => (
                <div key={category} className="bg-pink-50 p-3 md:p-4 rounded-xl border border-pink-200">
                  <div className="font-semibold text-xs md:text-sm text-pink-600 mb-1">{category}</div>
                  <div className="text-gray-800 font-medium text-xs md:text-sm leading-relaxed">{value}</div>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 p-4 md:p-6 rounded-xl border border-purple-200">
              <div className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                <Image className="w-4 h-4 md:w-5 md:h-5" />
                🎨 Generated Image Prompt:
              </div>
              <div className="text-xs md:text-sm text-gray-800 font-mono bg-white p-3 md:p-4 rounded-lg border border-gray-200 whitespace-pre-line leading-relaxed">
                {formatImagePrompt(currentImageCombination)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="flex items-center justify-center my-6 md:my-8">
        <div className="flex-1 border-t-2 border-blue-200"></div>
        <div className="mx-3 md:mx-4 px-4 md:px-6 py-2 md:py-3 bg-blue-400 text-white font-bold rounded-full text-xs md:text-base text-center shadow-lg">
          ⬇️ STEP 2: ANIMATE YOUR IMAGE ⬇️
        </div>
        <div className="flex-1 border-t-2 border-blue-200"></div>
      </div>

      {/* IMAGE-TO-VIDEO SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8 border-2 border-blue-200">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-2">
            <Play className="w-5 h-5 md:w-8 md:h-8" />
            🎬 IMAGE-TO-VIDEO GENERATOR
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Bikin video baby animals yang bergerak lucu! 🎥</p>
        </div>

        <div className="text-center mb-4 md:mb-6">
          <button 
            onClick={generateVideoCombination}
            disabled={isGeneratingVideo}
            className="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            {isGeneratingVideo ? (
              <>
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                Creating Animation... 🎬
              </>
            ) : (
              <>
                <Play className="w-5 h-5 md:w-6 md:h-6" />
                🎥 GENERATE VIDEO PROMPT
              </>
            )}
          </button>
        </div>

        {currentVideoCombination && (
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                🎥 Current Animation
              </h3>
              <button 
                onClick={() => copyToClipboard(formatVideoPrompt(currentVideoCombination), 'video')}
                className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm md:text-base shadow-lg transform hover:scale-105"
              >
                {copiedState.video ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    ✅ Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    📋 Copy Prompt
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              {Object.entries(currentVideoCombination).map(([category, value]) => (
                <div key={category} className="bg-blue-50 p-3 md:p-4 rounded-xl border border-blue-200">
                  <div className="font-semibold text-xs md:text-sm text-blue-600 mb-1">{category}</div>
                  <div className="text-gray-800 font-medium text-xs md:text-sm leading-relaxed">{value}</div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 md:p-6 rounded-xl border border-green-200">
              <div className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                🎬 Generated Video Prompt:
              </div>
              <div className="text-xs md:text-sm text-gray-800 font-mono bg-white p-3 md:p-4 rounded-lg border border-gray-200 whitespace-pre-line leading-relaxed">
                {formatVideoPrompt(currentVideoCombination)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="flex items-center justify-center my-6 md:my-8">
        <div className="flex-1 border-t-2 border-orange-200"></div>
        <div className="mx-3 md:mx-4 px-4 md:px-6 py-2 md:py-3 bg-orange-400 text-white font-bold rounded-full text-xs md:text-base text-center shadow-lg">
          ⬇️ STEP 3: ADD MUSIC TO YOUR VIDEO ⬇️
        </div>
        <div className="flex-1 border-t-2 border-orange-200"></div>
      </div>

      {/* AUDIO/MUSIC SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8 border-2 border-orange-200">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-2">
            <Music className="w-5 h-5 md:w-8 md:h-8" />
            🎵 AUDIO/MUSIC GENERATOR
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Bikin musik baby animals yang epic! 🎶</p>
        </div>

        <div className="text-center mb-4 md:mb-6">
          <button 
            onClick={generateAudioCombination}
            disabled={isGeneratingAudio}
            className="bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            {isGeneratingAudio ? (
              <>
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                Composing Music... 🎵
              </>
            ) : (
              <>
                <Music className="w-5 h-5 md:w-6 md:h-6" />
                🎶 GENERATE AUDIO PROMPT
              </>
            )}
          </button>
        </div>

        {currentAudioCombination && (
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                🎵 Current Composition
              </h3>
              <button 
                onClick={() => copyToClipboard(formatAudioPrompt(currentAudioCombination), 'audio')}
                className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm md:text-base shadow-lg transform hover:scale-105"
              >
                {copiedState.audio ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    ✅ Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    📋 Copy Prompt
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              {Object.entries(currentAudioCombination).map(([category, value]) => (
                <div key={category} className="bg-orange-50 p-3 md:p-4 rounded-xl border border-orange-200">
                  <div className="font-semibold text-xs md:text-sm text-orange-600 mb-1">{category}</div>
                  <div className="text-gray-800 font-medium text-xs md:text-sm leading-relaxed">{value}</div>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 p-4 md:p-6 rounded-xl border border-purple-200">
              <div className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                <Music className="w-4 h-4 md:w-5 md:h-5" />
                🎶 Generated Audio Prompt:
              </div>
              <div className="text-xs md:text-sm text-gray-800 font-mono bg-white p-3 md:p-4 rounded-lg border border-gray-200 whitespace-pre-line leading-relaxed">
                {formatAudioPrompt(currentAudioCombination)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="flex items-center justify-center my-6 md:my-8">
        <div className="flex-1 border-t-2 border-purple-200"></div>
        <div className="mx-3 md:mx-4 px-4 md:px-6 py-2 md:py-3 bg-purple-400 text-white font-bold rounded-full text-xs md:text-base text-center shadow-lg">
          ⬇️ STEP 4: YOUTUBE SEO PACKAGE ⬇️
        </div>
        <div className="flex-1 border-t-2 border-purple-200"></div>
      </div>

      {/* YOUTUBE SEO SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8 border-2 border-purple-200">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
            <Play className="w-5 h-5 md:w-8 md:h-8" />
            📋 YOUTUBE SEO PACKAGE GENERATOR
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Bikin title, description & tags yang viral! 🚀</p>
        </div>

        <div className="text-center mb-4 md:mb-6">
          <button 
            onClick={generateYoutubeCombination}
            disabled={isGeneratingYoutube}
            className="bg-purple-400 hover:bg-purple-500 disabled:bg-purple-300 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            {isGeneratingYoutube ? (
              <>
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                Creating SEO Package... 📋
              </>
            ) : (
              <>
                <Play className="w-5 h-5 md:w-6 md:h-6" />
                🚀 GENERATE YOUTUBE SEO
              </>
            )}
          </button>
        </div>

        {currentYoutubeCombination && (
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                📋 Current SEO Package
              </h3>
              <button 
                onClick={() => copyToClipboard(formatYoutubePrompt(currentYoutubeCombination), 'youtube')}
                className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm md:text-base shadow-lg transform hover:scale-105"
              >
                {copiedState.youtube ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    ✅ Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    📋 Copy Prompt
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              {Object.entries(currentYoutubeCombination).map(([category, value]) => {
                // Skip ANIMAL_TYPE from display as it's internal
                if (category === 'ANIMAL_TYPE') return null;
                return (
                  <div key={category} className="bg-purple-50 p-3 md:p-4 rounded-xl border border-purple-200">
                    <div className="font-semibold text-xs md:text-sm text-purple-600 mb-1">{category}</div>
                    <div className="text-gray-800 font-medium text-xs md:text-sm leading-relaxed">{value}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-pink-50 p-4 md:p-6 rounded-xl border border-pink-200">
              <div className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm md:text-base">
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                🚀 Generated YouTube SEO Prompt:
              </div>
              <div className="text-xs md:text-sm text-gray-800 font-mono bg-white p-3 md:p-4 rounded-lg border border-gray-200 whitespace-pre-line leading-relaxed">
                {formatYoutubePrompt(currentYoutubeCombination)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Gaming Style Footer */}
      <div className="text-center py-8 md:py-12">
        <div className="inline-block relative">
          {/* Outer glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl blur-md opacity-75 animate-pulse"></div>
          
          {/* Main credit box */}
          <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-transparent bg-clip-text font-black text-lg md:text-xl tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-yellow-400 shadow-2xl backdrop-blur-sm">
            <div className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
              CREATED BY CALDER0910
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BabyContentGenerator;
