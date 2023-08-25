import './index.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from '../../components/Item';
import { usePosts } from '../../hooks/useFilters';
import Input from '../../components/UI/Input';
import Select from '../../components/Select';

function Photos() {
    const [posts, setPosts] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    useEffect(() => {
        if (fetching) {
            setIsLoading(true);
            axios
                .get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
                .then((response) => {
                    setPosts([...posts, ...response.data]);
                    setCurrentPage((prevState) => prevState + 1);
                    setTotalCount(response.headers['x-total-count']);
                    setIsLoading(false);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e: any) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                10 &&
            posts.length <= totalCount
        ) {
            setFetching(true);
        }
    };

    return (
        <div className="Photos">
            <div className="Photos__header-sort">
                <Input
                    value={filter.query}
                    onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                    placeholder="Поиск в названии"
                />
                <Select
                    value={filter.sort}
                    onChange={(selectedSort: any) => setFilter({ ...filter, sort: selectedSort })}
                    defaultValue="Сортировка"
                    options={[
                        { value: '', name: 'По порядку' },
                        { value: 'title', name: 'По названию' },
                        { value: 'url', name: 'По описанию' },
                    ]}
                />
            </div>

            <div className="Photos__header-content">
                {sortedAndSearchedPosts.map((post: { id: number; title: string; url: string }) => (
                    <div key={post.id}>
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : (
                            <Item img={post.url} title={post.title} id={post.id} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Photos;
