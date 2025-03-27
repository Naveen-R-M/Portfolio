// components/story-highlights.tsx
import React from 'react';
import { Button, Modal, ModalContent, ModalBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@heroui/use-theme';
import { useTranslation } from 'react-i18next';
import { storyHighlights } from '../data/portfolio-data';

export const StoryHighlights = () => {
  const { theme } = useTheme();
  const [selectedStory, setSelectedStory] = React.useState<number | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false); // State for pause/play
  const progressInterval = React.useRef<number | null>(null);
  const { t } = useTranslation();

  const getContentColor = () => {
    switch (theme) {
      case 'dark':
        return 'text-white';
      case 'purple':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const getBackgroundGradient = () => {
    switch (theme) {
      case 'dark':
        return 'from-black/90 to-black/50';
      case 'purple':
        return 'from-purple-900/90 to-purple-900/50';
      default:
        return 'from-gray-900/90 to-gray-900/50';
    }
  };

  const handleStoryClick = (index: number) => {
    setSelectedStory(index);
    setCurrentItemIndex(0);
    setIsPaused(false); // Reset to playing when opening a new story
  };

  const handleClose = () => {
    setSelectedStory(null);
    setCurrentItemIndex(0);
    setIsPaused(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const handleStoryContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Toggle pause/play on any click within the content area
    setIsPaused((prev) => !prev);
  };

  React.useEffect(() => {
    if (selectedStory !== null && !isPaused) {
      const highlight = storyHighlights[selectedStory];

      // Clear any existing interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progressInterval.current = window.setInterval(() => {
        setCurrentItemIndex((prev) => {
          if (prev < highlight.items.length - 1) {
            return prev + 1;
          } else if (selectedStory < storyHighlights.length - 1) {
            setSelectedStory((prevStory) => (prevStory !== null ? prevStory + 1 : null));
            return 0;
          } else {
            handleClose();
            return prev;
          }
        });
      }, 3000);
    } else if (isPaused && progressInterval.current) {
      // Pause the interval when isPaused is true
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    // Cleanup on unmount or when selectedStory/isPaused changes
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [selectedStory, isPaused]); // Dependencies include isPaused

  return (
    <>
      <div className="flex gap-4 overflow-x-auto py-6 px-4 bg-content1 rounded-lg mt-6 scrollbar-hide">
        {storyHighlights.map((highlight, index) => (
          <Button
            key={highlight.id}
            isIconOnly
            className="relative w-20 h-20 min-w-[5rem] group"
            variant="light"
            onPress={() => handleStoryClick(index)}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#833ab4] via-[#c13584] to-[#f77737] rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[2px] bg-content1 rounded-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Icon icon={highlight.icon} className="text-2xl mb-1 text-[#c13584]" />
                <span className="text-tiny font-medium">
                  {t(`stories.${highlight.id}.title`)}
                </span>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <Modal
        isOpen={selectedStory !== null}
        onClose={handleClose}
        size="2xl"
        hideCloseButton
        classNames={{
          base: 'bg-black',
          closeButton: 'hidden',
        }}
      >
        <ModalContent>
          {() => (
            <ModalBody className="p-0">
              {selectedStory !== null && (
                <div
                  className="relative"
                  onClick={handleStoryContentClick} // Toggle pause/play on click
                >
                  {/* Timeline Progress */}
                  <div className="flex gap-1 absolute top-0 left-0 right-0 p-2 z-10">
                    {storyHighlights[selectedStory].items.map((_, index) => (
                      <div
                        key={index}
                        className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
                      >
                        <div
                          className={`h-full bg-white transition-all ${
                            index < currentItemIndex
                              ? 'w-full'
                              : index === currentItemIndex && !isPaused
                              ? 'w-full transition-all duration-3000 ease-linear'
                              : 'w-0'
                          }`}
                          style={{
                            transitionDuration: isPaused ? '0ms' : '3000ms', // Stop animation when paused
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pause/Play Indicator */}
                  {isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Icon icon="lucide:play" className="text-white text-4xl opacity-80" />
                    </div>
                  )}

                  {/* Story Content */}
                  <div className={`pt-12 pb-6 px-6 bg-gradient-to-b ${getBackgroundGradient()}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <Icon
                        icon={storyHighlights[selectedStory].icon}
                        className="text-3xl text-white"
                      />
                      <h3 className="text-2xl font-bold font-sans text-white">
                        {t(`stories.${storyHighlights[selectedStory].id}.title`)}
                      </h3>
                    </div>
                    <div
                      className={`text-lg font-sans leading-relaxed whitespace-pre-line ${getContentColor()}`}
                    >
                      {t(`stories.${storyHighlights[selectedStory].id}.items.${currentItemIndex}`)}
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};