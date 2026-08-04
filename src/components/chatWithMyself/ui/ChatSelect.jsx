import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';
import ChatGroupAvatar from '@/components/chatWithMyself/ui/ChatGroupAvatar';
import { ADD_GROUP_VALUE } from '@/utils/chatWithMyself';
import {
  chatSelectContentClass,
  chatSelectItemClass,
  chatSelectTriggerClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

/**
 * Radix Select for Chat with Myself.
 * @param {{
 *   value: string,
 *   onValueChange: (v: string) => void,
 *   options: Array<{ value: string, label: string, iconPath?: string }>,
 *   id?: string,
 *   ariaLabel?: string,
 *   className?: string,
 *   triggerClassName?: string,
 *   disabled?: boolean,
 *   showGroupAvatars?: boolean,
 *   getPresignedUrl?: ((path: string) => Promise<string|null|undefined>)|null,
 * }} props
 */
export default function ChatSelect({
  value,
  onValueChange,
  options = [],
  id,
  ariaLabel = '선택',
  className = '',
  triggerClassName = '',
  disabled = false,
  showGroupAvatars = false,
  getPresignedUrl = null,
}) {
  const selected = options.find((o) => o.value === value);
  const showSelectedAvatar =
    showGroupAvatars && selected && selected.value !== ADD_GROUP_VALUE;

  return (
    <div className={className}>
      <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <Select.Trigger
          id={id}
          aria-label={ariaLabel}
          className={`${chatSelectTriggerClass} ${triggerClassName}`}
        >
          {showSelectedAvatar ? (
            <span className="flex min-w-0 items-center gap-1.5">
              <ChatGroupAvatar
                name={selected.label}
                colorKey={selected.value}
                size="sm"
                iconPath={selected.iconPath}
                getPresignedUrl={getPresignedUrl}
              />
              <Select.Value />
            </span>
          ) : (
            <Select.Value />
          )}
          <Select.Icon className="text-gray-500">
            <ChevronDown size={14} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={chatSelectContentClass}
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport className="p-1">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={chatSelectItemClass}
                >
                  <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                    <Check size={12} />
                  </Select.ItemIndicator>
                  {showGroupAvatars && opt.value !== ADD_GROUP_VALUE ? (
                    <span className="flex items-center gap-2 pl-5">
                      <ChatGroupAvatar
                        name={opt.label}
                        colorKey={opt.value}
                        size="sm"
                        iconPath={opt.iconPath}
                        getPresignedUrl={getPresignedUrl}
                      />
                      <Select.ItemText>{opt.label}</Select.ItemText>
                    </span>
                  ) : (
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  )}
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
