import React, { useState, useRef, useEffect } from 'react';
import { AddFilled, Save } from '@carbon/icons-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IconButton from '../IconButton';
import { Action, DataState } from '@/app/models';
import { addAction, selectActions, updateAction } from '@/app/features/automationSlice';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

interface Recipient {
    id: string;
    name: string;
    email: string;
}

interface EmailFormProps { }

const EmailForm: React.FC<EmailFormProps> = () => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [subject, setSubject] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [allRecipients, setAllRecipients] = useState<Recipient[]>([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
        { id: '4', name: 'Alice Williams', email: 'alice@example.com' },
        { id: '5', name: 'Charlie Brown', email: 'charlie@example.com' },
    ]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleRecipient = (recipient: Recipient) => {
        setRecipients(prev =>
            prev.some(r => r.id === recipient.id)
                ? prev.filter(r => r.id !== recipient.id)
                : [...prev, recipient]
        );
    };

    const filteredRecipients = allRecipients.filter(recipient =>
        recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(true);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchTerm.includes('@')) {
            e.preventDefault();
            const newRecipient: Recipient = {
                id: Date.now().toString(),
                name: searchTerm.split('@')[0],
                email: searchTerm,
            };
            setAllRecipients(prev => [...prev, newRecipient]);
            setRecipients(prev => [...prev, newRecipient]);
            setSearchTerm('');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'font': [] }], ,
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
    const dispatch = useDispatch<AppDispatch>();

    const { action } = useSelector((state: RootState) => state.automation);
    const actions = useSelector(selectActions);
    const alen: number = actions.length - 1
    const handleUpdateAction = (index: number, newAction: Action) => {
        dispatch(updateAction({
            index,
            updatedAction: newAction,
        }));
    };


    function saveEmailData() {
        const emails: string[] = [];

        recipients.map((option) => {
            emails.push(option.email);
        });

        const newEmailData = [
            { name: 'Send To', type: 'email', value: emails },
            { name: 'Subject', type: 'text', value: subject },
            { name: 'Attachment', type: 'file', value: selectedFile?.name },
            { name: 'body', type: 'html', value: value }
        ];
        const newAction = {
            id: actions[alen].id,
            name: actions[alen].name,
            operation: actions[alen].operation,
            setup: actions[alen].setup,
            data: newEmailData
        }
        handleUpdateAction(alen, newAction);
    }




    return (
        <div className="w-full text-white p-32 rounded-lg mx-auto">
            <div className='text-xl text-[#848694] my-4'>Action Settings</div>
            <div className='text-3xl text-white my-2'>Send an Email</div>

            <div className="mb-4">
                <label htmlFor="sendTo" className="block text-sm font-medium mb-1">Send To</label>
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="w-full border border-[#848694] rounded-md py-2 px-3 flex flex-wrap gap-1 cursor-text min-h-[40px]"
                        onClick={() => setIsOpen(true)}
                    >
                        {recipients.map(recipient => (
                            <span key={recipient.id} className="text-[#F29900] bg-[#F29900] bg-opacity-25 px-2 py-1 rounded text-sm flex items-center">
                                {recipient.name}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleRecipient(recipient);
                                    }}
                                    className="ml-1 text-xs"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-grow bg-transparent outline-none"
                            placeholder={recipients.length ? '' : 'Search or add new recipient...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={handleInputClick}
                            onKeyDown={handleKeyDown}
                        />
                        <AddFilled className="h-5 w-5 text-[#848694]" />
                    </div>
                    {isOpen && (
                        <div className="absolute bg-[#242428] z-10 w-full mt-1 border border-[#848694] rounded-md shadow-lg max-h-60 overflow-auto">
                            {filteredRecipients.length > 0 ? (
                                filteredRecipients.map(recipient => (
                                    <div id='customCheckbox'
                                        key={recipient.id}

                                        className="px-3 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                                        onClick={() => toggleRecipient(recipient)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={recipients.some(r => r.id === recipient.id)}
                                            onChange={() => { }}
                                            className="mr-2"
                                        />
                                        <span>{recipient.name} ({recipient.email})</span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-gray-500">No matching recipients</div>
                            )}
                            {searchTerm.includes('@') && !filteredRecipients.some(r => r.email === searchTerm) && (
                                <div
                                    className="px-3 py-2 text-blue-400 cursor-pointer hover:bg-gray-700"
                                    onClick={() => {
                                        const newRecipient: Recipient = {
                                            id: Date.now().toString(),
                                            name: searchTerm.split('@')[0],
                                            email: searchTerm,
                                        };
                                        setAllRecipients(prev => [...prev, newRecipient]);
                                        setRecipients(prev => [...prev, newRecipient]);
                                        setSearchTerm('');
                                    }}
                                >
                                    + Add new recipient: {searchTerm}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* <div className='my-4'>
                <IconButton label="More Options" Icon={AddFilled} onClick={() => {}} />
            </div> */}

            <div className="my-4">
                <label htmlFor="subject" className="block text-xl py-6 mb-1">Email Notification</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    autoComplete="off"
                    className="w-full placeholder-[#848694]  border bg-transparent border-[#848694] rounded-md py-2 px-3 focus:outline-none "
                />
            </div>

            <div className="my-4">
                <div className="relative">
                    <input
                        type="file"
                        id="fileInput"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="sr-only"
                    />
                    <button
                        onClick={handleFileButtonClick}
                        className="w-full border border-[#848694] rounded-md py-2 px-3 focus:outline-none flex justify-between items-center"
                    >
                        <span className="text-[#848694] text-sm py-1">
                            {selectedFile ? selectedFile.name : 'Attach Your File'}
                        </span>
                        <AddFilled className="h-5 w-5 text-[#848694]" />
                    </button>
                </div>
                {selectedFile && (
                    <p className="mt-2 text-sm text-[#848694]">Selected file: {selectedFile.name}</p>
                )}
            </div>

            <div className="mb-4 text-white">
                <ReactQuill className="bg-transparent" theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />
            </div>
            <div className='mt-4'>
                <IconButton label="Save" Icon={Save} onClick={() => saveEmailData()} />
            </div>
        </div>
    );
};

export default EmailForm;